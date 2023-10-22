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

  const regions = await prisma.$queryRaw`SELECT regions.*
                                         FROM regions
                                                  INNER JOIN votes v on regions.id = v.region_id
                                                  INNER JOIN elections e on v.election_id = e.id
                                         WHERE e.nation_id = ${nationId}
                                         GROUP BY regions.id;`;

  res.status(200).json(regions);
}