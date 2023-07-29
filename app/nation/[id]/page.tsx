import { Card, Metric, Subtitle, Title } from '@tremor/react';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client'
import NationElectionsTable from './nation-elections-table';
import NationMap from './nation-map';
const prisma = new PrismaClient()

export default async function NationPage({ params }: { params: { id: string } }) {
  const nationId = parseInt(params.id) ?? -1;

  if (nationId == -1) {
    redirect('/nations');
  }

  const nation = await prisma.nations.findUnique({
    where: {
      id: nationId,
    },
  })

  if (nation == null) {
    redirect('/nations');
  }

  const elections = await prisma.elections.findMany({
    where: {
      nation_id: nationId,
    },
  })

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>{nation.italian_name} {nation.utf_icon}</Metric>
      <Card className={'mt-6'}>
        <Title>Cartina</Title>
        <NationMap></NationMap>
      </Card>
      <Card className={'mt-6'}>
        <Title>Elezioni</Title>
        <NationElectionsTable elections={elections}></NationElectionsTable>
      </Card>
    </main>
  );
}