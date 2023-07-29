import { Card, Title, Text, Button, Metric, Subtitle } from '@tremor/react';
import { queryBuilder } from '../../../lib/planetscale';
import Search from '../../search';
import UsersTable from '../../table';
import ElectionsTable from '../../elections-table';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';



export default async function SearchElectionPage({
                                                   searchParams
                                                 }: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const elections = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();

  const elections = [];

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>Cerca</Metric>
      <Subtitle className={'mt-1'}>Ricerca elezioni negli archivi governativi.</Subtitle>
      <Search />
        {elections.length === 0 && search != '' ?
          <Card className='mt-6'>
            <div>
              <Text className={'mb-5'}>Non è stata trovata nessuna elezione per i criteri di ricerca inseriti.</Text>
              <a
                className='contents underline text-blue-600'
                href={'/elections/new'}
              >
                Crea nuova elezione &rarr;
              </a>
            </div>
          </Card>
            :
          elections.length === 0 ?
            null
            :
            <>
              <Card className='mt-6'>
                <Title>{elections.length} {elections.length == 1 ? "Elezione trovata" : "Elezioni trovate"}</Title>
                <ElectionsTable elections={elections}></ElectionsTable>
              </Card>
              <Card className='mt-6'>
                <div>
                  <Text className={'mb-5'}>Non è presente in lista l'elezione che cercavi?</Text>
                  <a
                    className='contents underline text-blue-600'
                    href={'/elections/new'}
                  >
                    Crea nuova elezione &rarr;
                  </a>
                </div>
              </Card>
            </>
        }
    </main>
  );
}
