import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const nations = await prisma.nations.findMany();

    res.status(200).json(nations);
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
}