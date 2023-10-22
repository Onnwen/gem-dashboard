import { Metric, Subtitle, Card } from '@tremor/react';
import NationsTable from './nations-table';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function NationsPage() {

  // const nations = await prisma.nations.findMany()
  const nations = []
  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>Paesi</Metric>
      <Subtitle className={'mt-1'}>Lista delle nazioni archiviate in GEM.</Subtitle>
      <Card className='mt-6'>
        <NationsTable nations={nations}/>
      </Card>
    </main>
  );
}