import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  try {
    const parties: [] = await prisma.$queryRaw`SELECT parties.id,
                                                      parties.name,
                                                      parties.italian_name,
                                                      parties.color_name,
                                                      parties.color
                                               FROM parties
                                                        INNER JOIN votes v on parties.id = v.party_id
                                                        INNER JOIN elections e on v.election_id = e.id
                                               WHERE e.nation_id = ${nationId}
                                               GROUP BY parties.id`;


    res.status(200).json(parties);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err });
    return;
  }
}