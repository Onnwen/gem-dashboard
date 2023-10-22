'use client';

import { Card, Legend, Metric, Title, Button, Flex } from '@tremor/react';
import { redirect } from 'next/navigation';
import NationPartiesTable from '../../nations/[id]/nation-parties-table';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import Image from 'next/image';
import {
  ArchiveBoxArrowDownIcon,
  ArrowsPointingOutIcon,
  PencilSquareIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import ElectionResume from '../election-resume';

export default function NationPage({ params }: { params: { id: string } }) {
  const electionId = parseInt(params.id) ?? -1;

  if (electionId == -1) {
    redirect('/elections');
  }

  const [election, setElection] = useState(null);
  useEffect(() => {
    fetch(`/api/elections/${electionId}/`)
      .then((res) => res.json())
      .then((data) => {
        setElection(data);
      });

    const interval = setInterval(() => {
      fetch(`/api/elections/${electionId}/`)
        .then((res) => res.json())
        .then((data) => {
          setElection(data);
        });
    }, 60000);

    return () => clearInterval(interval);
  }, [electionId]);

  if (election == null) {
    return (
      <Loading />
    );
  }

  if (election.only_national) {
    return (
      <main className='p-4 md:p-10 mx-auto max-w-7xl'>
        <Metric>{election.name}</Metric>
        <Card className={'mt-6'}>
          <Title>Risultati</Title>
          <NationPartiesTable parties={election.parties}></NationPartiesTable>
        </Card>
        <Button
          icon={ArchiveBoxArrowDownIcon}
          className='mt-4 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
          onClick={event => window.location.href = '/your-href'}
        >
          Incorpora elezione
        </Button>
      </main>
    );
  }
  else {
    return (
      <main className='mx-auto'>
        <ElectionResume className={'mt-6'} electionData={election}>
        </ElectionResume>
      </main>
    );
  }
}