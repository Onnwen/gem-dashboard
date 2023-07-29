'use client';

import { TextInput, Text, Metric, Subtitle, Flex, Button } from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Breadcrumb from '../../breadcrumb';
export default function AddElectionPage() {
  function search() {
    return [];
  }

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>Nuova elezione</Metric>
      <Subtitle className={'mt-1'}>Cerca o crea una nuova elezione.</Subtitle>
      <Flex className={'mt-5'}>
        <TextInput icon={MagnifyingGlassIcon} placeholder="Cerca un'elezione..." className={'mr-5'} />
        <Button>Cerca</Button>
      </Flex>
    </main>
  );
}