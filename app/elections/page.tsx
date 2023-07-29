'use client';

import { Card, Metric, Text, Title, BarList, Flex, Grid, Button } from '@tremor/react';
import { PlusIcon } from "@heroicons/react/24/solid";
import { redirect } from 'next/navigation';

const usa2016 = [
  { name: 'Democratici', value: 51.7, color: 'blue' },
  { name: 'Repubblicani', value: 48.3, color: 'red' }
];

const spain2023 = [
  { name: 'Partido Popular', value: 33.05, color: 'blue' },
  { name: 'Partido Socialista Obrero Español', value: 31.70, color: 'red' },
  { name: 'Vox', value: 12.39, color: 'green' },
  { name: 'Sumar', value: 12.31, color: 'purple' },
  { name: 'Altri', value: 10.67, color: 'gray' }
];

const italy2022 = [
  { name: 'Fratelli d\'Italia', value: 26, color: 'blue' },
  { name: 'Partito Democratico', value: 19, color: 'red' },
  { name: 'Movimento 5 Stelle', value: 15.6, color: 'yellow' },
  { name: 'Lega', value: 8.9, color: 'indigo' },
  { name: 'Altri', value: 32.3, color: 'gray' }
];

const data = [
  {
    date: 'Novembre 2016',
    nation: 'Stati Uniti',
    data: usa2016,
    percentageScrutinized: 100,
  },
  {
    date: 'Luglio 2023',
    nation: 'Spagna',
    data: spain2023,
    percentageScrutinized: 63.4
  },
  {
    date: 'Settembre 2022',
    nation: 'Italia',
    data: italy2022,
    percentageScrutinized: 100,
  }
];

export default function ElectionsPage() {
  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Grid numItemsSm={2} numItemsLg={3} className='gap-6'>
        {data.map((item) => (
          <Card key={item.date} decoration="top" decorationColor={item.percentageScrutinized == 100 ? "gray" : "green"}>
            <Title>{item.date}</Title>
            <Flex
              justifyContent='start'
              alignItems='baseline'
              className='space-x-2'
            >
              <Metric>{item.nation}</Metric>
              {item.percentageScrutinized == 100 ? <Text>Concluse</Text> : <Text>Scrutinio al {item.percentageScrutinized}%</Text>}
            </Flex>
            <Flex className='mt-6'>
              <Text>Partito</Text>
              <Text className='text-right'>%</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
            <Button size='md' className={'mt-5 w-full self-end'}>Gestisci</Button>
          </Card>
        ))}

        <Card key='new'>
          <Title>Nuova elezione</Title>
          <Text>Gestisci i dati di una nuova elezione.</Text>
          <Button icon={PlusIcon} size='md' className={'mt-5 w-full'} onClick={redirect('/elections/new')}>Aggiungi</Button>
        </Card>
      </Grid>
    </main>
  );
}
