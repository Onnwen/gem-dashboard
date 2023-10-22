import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { MapStateData } from '../../../../../interfaces/map-state-data';
const prisma = new PrismaClient();

function blendColors(colorA: string, colorB: string, amount: number) {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
  return '#' + r + g + b;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const nationId = parseInt(req.query.id as string) ?? -1;

  if (nationId == -1) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const winsCount: [] = await prisma.$queryRaw`SELECT region_id,
                                                      party_id,
                                                      r.name   as region_name,
                                                      p.name   as party_name,
                                                      p.color  as party_color,
                                                      COUNT(*) AS elections_won
                                               FROM votes
                                                        INNER JOIN regions r on votes.region_id = r.id
                                                        INNER JOIN parties p on votes.party_id = p.id
                                                        INNER JOIN elections e on votes.election_id = e.id
                                               WHERE total_votes = (SELECT MAX(total_votes)
                                                                    FROM votes AS er2
                                                                    WHERE er2.region_id = votes.region_id
                                                                      AND er2.election_id = votes.election_id)
                                                 AND
                                                   e.nation_id = ${nationId}
                                               GROUP BY region_id, party_id, region_name, party_name, party_color;`;

  const geoUrl: [] = await prisma.$queryRaw`SELECT map_url, map_property_name, map_scale, map_translate_x, map_translate_y FROM nations WHERE id = ${nationId};`;

  let mapData: MapStateData[] = [];

  winsCount.forEach((result) => {
    if (!mapData[result.region_name]) {
      mapData[result.region_name] = { id: result.region_id, name: result.region_name, parties: [] };
    }
    mapData[result.region_name]['parties'].push({
      id: result.party_id,
      elections_won: Number(result.elections_won),
      name: result.party_name,
      color: result.party_color
    });
  });

  for (const region in mapData) {
    let max = 0;
    let maxParty = null;
    let totalElections = 0;
    mapData[region]['parties'].forEach((party) => {
      if (party['elections_won'] > max) {
        max = party['elections_won'];
        maxParty = party;
      }
      totalElections += party['elections_won'];
    });
    mapData[region]['most_wins'] = maxParty;
    mapData[region]['color'] = blendColors('#ffffff', maxParty['color'], max / totalElections);
  }

  let data = {
    nation_id: nationId,
    map: Object.values(mapData),
    geo_url: geoUrl[0]['map_url'],
    property_name: geoUrl[0]['map_property_name'],
    scale: geoUrl[0]['map_scale'],
    translate_x: geoUrl[0]['map_translate_x'],
    translate_y: geoUrl[0]['map_translate_y']
  }
  res.status(200).json(data);
}