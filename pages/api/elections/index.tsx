import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const electionData = req.body.electionData;

    const electionId = await prisma.elections.create({
      data: {
        nation_id: 1,
        name: electionData.name,
        start_date: new Date(electionData.start_date),
        end_date: new Date(electionData.end_date),
        source: electionData.source
      },
      select: {
        id: true
      }
    });

    const parties = req.body.parties;

    for (const party of parties) {
      const representativeId = await prisma.representatives.create({
        data: {
          last_name: party.rappresentativeName,
        },
        select: {
          id: true
        }
      });

      const partyId = await prisma.parties.findMany({
        where: {
          name: party.name
        },
        select: {
          id: true
        }
      });

      console.log(partyId)

      await prisma.party_elections.create({
        data: {
          party_id: partyId[0].id,
          election_id: electionId.id,
          representative_id: representativeId.id
        }
      });
    }

    const votes = req.body.votes;

    for (const state of votes) {
      const regionId = await prisma.regions.findMany({
        select: {
          id: true
        },
        where: {
          name: state.state_name
        }
      });

      for (const vote of state.parties) {
        const partyId = await prisma.parties.findMany({
          select: {
            id: true
          },
          where: {
            name: vote.party_name
          }
        });

        await prisma.votes.create({
          data: {
            party_id: partyId[0].id,
            election_id: electionId.id,
            total_votes: vote.count,
            region_id: regionId[0].id
          }
        });
      }
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
}