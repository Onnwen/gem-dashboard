import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const electionId = parseInt(req.query.id as string) ?? -1;

    let election = await prisma.$queryRaw`SELECT n.name         as nation_name,
                                                 n.italian_name as italian_nation_name,
                                                 elections.in_progress,
                                                 elections.only_national,
                                                 elections.start_date,
                                                 elections.last_update,
                                                 elections.end_date,
                                                 elections.name as election_name,
                                                 elections.source,
                                                 elections.turnout,
                                                 elections.bare,
                                                 elections.total_votes as election_total_votes
                                          FROM elections
                                                   INNER JOIN nations n on elections.nation_id = n.id
                                                   INNER JOIN party_elections pe on elections.id = pe.election_id
                                                   INNER JOIN parties p on pe.party_id = p.id
                                                   INNER JOIN votes v on p.id = v.party_id
                                          WHERE elections.id = ${electionId}
                                          LIMIT 1;`;

    if (new Date().getTime() - new Date(election[0].last_update).getTime() > 10000) {
      console.log("Sending update request");
      axios.post(`/api/elections/${electionId}/update`)
    }

    const votes = await prisma.$queryRaw`SELECT p.name       as party_name,
                                                p.italian_name,
                                                SUM(v.total_votes) as total_votes,
                                                r.last_name  as candidate_last_name,
                                                p.color      as party_color,
                                                p.color_name as party_color_name
                                         FROM elections
                                                  INNER JOIN nations n on elections.nation_id = n.id
                                                  INNER JOIN party_elections pe on elections.id = pe.election_id
                                                  INNER JOIN parties p on pe.party_id = p.id
                                                  INNER JOIN votes v on p.id = v.party_id
                                                  INNER JOIN representatives r on pe.representative_id = r.id
                                         WHERE v.election_id = ${electionId}
                                         GROUP BY p.id
                                         ORDER BY SUM(v.total_votes) DESC;`;

    const candidates = await prisma.$queryRaw`SELECT representatives.first_name  as candidate_first_name,
                                                     representatives.last_name   as candidate_last_name,
                                                     representatives.image_url   as candidate_image_url,
                                                     representatives.description as candidate_description,
                                                     p.name                      as party_name,
                                                     p.italian_name              as party_italian_name,
                                                     p.color                     as party_color,
                                                     p.image_url                 as party_image_url,
                                                     p.description               as party_description,
                                                     p.color_name                as party_color_name
                                              FROM representatives
                                                       INNER JOIN party_elections pe on representatives.id = pe.representative_id
                                                       INNER JOIN parties p on pe.party_id = p.id
                                                       INNER JOIN elections e on pe.election_id = e.id
                                              WHERE e.id = ${electionId}`;

    const mapData = await prisma.$queryRaw`SELECT map_scale,
                                                  map_translate_y,
                                                  map_translate_x,
                                                  map_property_name,
                                                  map_url
                                           FROM nations
                                                    INNER JOIN elections e on nations.id = e.nation_id
                                           WHERE e.id = ${electionId}`;

    const mapVotes = await prisma.$queryRaw`SELECT v.total_votes as votes,
                                                   r.full_name,
                                                   r.name,
                                                   p2.italian_name,
                                                   p2.color
                                            FROM (
                                                     SELECT MAX(total_votes) as total_votes, region_id
                                                     FROM votes
                                                     WHERE election_id = ${electionId}
                                                     GROUP BY region_id
                                                 ) as max_votes
                                                     INNER JOIN votes v on max_votes.total_votes = v.total_votes and max_votes.region_id = v.region_id
                                                     INNER JOIN elections e on v.election_id = e.id
                                                     INNER JOIN regions r on v.region_id = r.id
                                                     INNER JOIN parties p2 on v.party_id = p2.id
                                            GROUP BY r.id`;

    let result = election[0];
    result['votes'] = votes;
    result['candidates'] = candidates;
    result['map'] = mapData[0];
    result['map']['map'] = mapVotes;
    res.status(200).json(result);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
}