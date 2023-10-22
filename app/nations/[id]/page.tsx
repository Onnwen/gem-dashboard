'use client';

import { Card, Legend, Metric, Title, Button, Flex } from '@tremor/react';
import { redirect } from 'next/navigation';
import NationElectionsTable from './nation-elections-table';
import NationMap from './nation-map';
import NationPartiesTable from './nation-parties-table';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import Image from 'next/image';
import {
  ArchiveBoxArrowDownIcon,
  ArrowsPointingOutIcon,
  PencilSquareIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';


export default function NationPage({ params }: { params: { id: string } }) {
  const nationId = parseInt(params.id) ?? -1;

  if (nationId == -1) {
    redirect('/nations');
  }

  const [nation, setNation] = useState({ italian_name: '', utf_icon: '' });
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations/${nationId}`)
      .then((res) => res.json())
      .then((data) => {
        if (nation == null) {
          redirect('/nations');
        }
        setNation(data);
      });
  }, [nationId]);

  const [elections, setElections] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations/${nationId}/elections`)
      .then((res) => res.json())
      .then((data) => {
        setElections(data);
      });
  }, [nationId]);

  const [parties, setParties] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations/${nationId}/parties`)
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }, [nationId]);

  const [regions, setRegions] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations/${nationId}/regions`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
      });
  }, [nationId]);

  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations/${nationId}/maps/trend`)
      .then((res) => res.json())
      .then((data) => {
        setMapData(data);
      });
  }, [nationId]);

  if (nation.italian_name == '') {
    return (
      <Loading />
    );
  }

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>{nation.italian_name} {nation.utf_icon}</Metric>
      <Card className={'mt-6'}>
        <Title>Cartina</Title>
        <NationMap mapData={mapData}></NationMap>
        <div className='flex mt-3 justify-center'>
          <Legend
            className='justify-center'
            categories={parties.map(a => a.italian_name)}
            colors={parties.map(a => a.color_name)}
          />
          <div className='max-w-sm space-y-6'>
            {/*<Select>*/}
            {/*  <SelectItem value='1' icon={CpuChipIcon}>*/}
            {/*    GaraSense*/}
            {/*  </SelectItem>*/}
            {/*  <SelectItem value='2' icon={CalendarIcon}>*/}
            {/*    Ultimi 20 anni*/}
            {/*  </SelectItem>*/}
            {/*  <SelectItem value='3' icon={CalendarIcon}>*/}
            {/*    Ultimi 50 anni*/}
            {/*  </SelectItem>*/}
            {/*  <SelectItem value='4' icon={CalendarIcon}>*/}
            {/*    Ultimo secolo*/}
            {/*  </SelectItem>*/}
            {/*</Select>*/}
          </div>
        </div>
      </Card>
      <Card className={'mt-6'}>
        <Title>Partiti</Title>
        <NationPartiesTable parties={parties}></NationPartiesTable>
      </Card>
      <Card className={'mt-6'}>
        <Title>Elezioni</Title>
        <NationElectionsTable elections={elections}></NationElectionsTable>
        {elections.length > 5 ?
          <Button
            icon={ArrowsPointingOutIcon}
            className='mt-4 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
            onClick={event => window.location.href = '/your-href'}
          >
            Mostra di più
          </Button>
          :
          null
        }
      </Card>
      <Flex className={'mt-6 gap-6'}>
        <Card>
          <Title>Impostazioni relativi a {nation.italian_name}</Title>
          <Button
            icon={PencilSquareIcon}
            className='mt-4 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
            onClick={event => window.location.href = '/your-href'}
          >
            Modifica
          </Button>
          <Button
            icon={ArchiveBoxArrowDownIcon}
            className='mt-4 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
            onClick={event => window.location.href = '/your-href'}
          >
            Importa elezione
          </Button>
          <Button
            icon={PuzzlePieceIcon}
            className='mt-4 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
            onClick={event => window.location.href = '/your-href'}
          >
            Incorpora
          </Button>
        </Card>
      </Flex>
    </main>
  );
}