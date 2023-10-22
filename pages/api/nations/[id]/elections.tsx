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

  const elections = await prisma.elections.findMany({
    where: {
      nation_id: nationId
    }
  });

  res.status(200).json(elections);
}