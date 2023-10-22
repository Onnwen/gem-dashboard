'use client';

import {
  TextInput,
  Text,
  Metric,
  Subtitle,
  Flex,
  Button,
  Card,
  Title,
  DateRangePicker,
  Select,
  SelectItem, List, ListItem
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { CheckIcon, ClipboardDocumentIcon, PuzzlePieceIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Modal } from 'flowbite-react';
import NewElectionModal from './new-election-modal';

export default function AddElectionPage() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const manualModal = { openModal, setOpenModal };

  const [nations, setNations] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/nations`)
      .then((res) => res.json())
      .then((data) => {
        setNations(data);
      });
  }, []);

  const [regions, setRegions] = useState([]);
  const [parties, setParties] = useState([]);
  const [removeParties, setRemoveParties] = useState([]);

  function selectedNationChange(nationId: number) {
    fetch(`http://localhost:3000/api/nations/${nationId}/regions`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
      });
    fetch(`http://localhost:3000/api/nations/${nationId}/parties`)
      .then((res) => res.json())
      .then((data) => {
        setParties(data);
      });
  }

  function partyRemove(partyId: number) {
    if (removeParties.includes(partyId)) {
      setRemoveParties(removeParties.filter(id => id != partyId));
    } else {
      setRemoveParties([...removeParties, partyId]);
    }
  }

  const [statesVotes, setStatesVotes] = useState([]);

  async function readJSON() {
    const data = JSON.parse(await navigator.clipboard.readText());
    if (data['votes'] != undefined) {
      let addedParties = [];
      for (const [state_name, votes] of Object.entries(data['votes'])) {
        if (votes['popular'] != undefined) {
          let parties = [];
          for (const [party_name, count] of Object.entries(votes['popular'])) {
            parties.push({ party_name: party_name, count: count });
            if (!addedParties.includes(party_name)) {
              addedParties.push(party_name);
              setParties(parties => [...parties, { name: party_name, rappresentativeName: data['candidates'][party_name]}]);
            }
          }
          let states = statesVotes;
          states.push({ state_name: state_name, parties: parties });
          setStatesVotes(states);
        }
      }
    }
    console.log(statesVotes);
    manualModal.setOpenModal('default');
  }

  function saveElection() {
    fetch('http://localhost:3000/api/elections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        electionData: {
          name: "1988 Presidential Election",
          start_date: '1988-11-08',
          end_date: '1988-11-08',
          source: "Federal Election Commission USA"
        },
        parties: parties,
        votes: statesVotes
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // manualModal.setOpenModal(undefined)
      });
  }

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Metric>Aggiungi elezione</Metric>
      <Subtitle className={'mt-1'}>Importa i dati di un&apos;elezione passata.</Subtitle>
      <Flex className={'mt-6 gap-6'}>
        <Card>
          <Title>
            Da un file JSON
          </Title>
          <Subtitle>
            Importa i dati di un&apos;elezione passata a partire da un file JSON.
          </Subtitle>
          <Button
            icon={ClipboardDocumentIcon}
            className='w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 mt-6'
            onClick={event => readJSON()}
          >
            Incolla JSON
          </Button>
        </Card>

        <Card>
          <Title>
            Manualmente
          </Title>
          <Subtitle className={'mt-1'}>
            Inserisci manualmente i dati di un&apos;elezione passata.
          </Subtitle>
          <Button
            icon={PlusIcon}
            onClick={() => manualModal.setOpenModal('default')}
            className='w-full bg-blue-500 border-gray-200 text-white hover:bg-gray-50 hover:bg-blue-500 mt-6'
          >
            Crea
          </Button>
        </Card>
      </Flex>
      {statesVotes.length > 0 ?
        <Modal show={manualModal.openModal === 'default'} size={'7xl'}
               onClose={() => manualModal.setOpenModal(undefined)}>
          <Modal.Header>Importazione</Modal.Header>
          <Modal.Body className={'h-full'}>
            <Flex className={'h-full gap-10'}>
              <div className='w-1/2 space-y-4 content-start h-96'>
                <Title>Dati generali</Title>
                <TextInput placeholder='Nome' />
                <Flex className={'gap-6'}>
                  <DateRangePicker enableSelect={false} placeholder={'Data'} />
                  <TextInput placeholder='Fonte' />
                </Flex>
                <Title>Partiti</Title>
                <List>
                  {parties.map((party) => (
                    <ListItem key={party.name} className={'flex items-start'}>
                      <Flex>
                        <Text>{party.name}</Text>
                        <Text>{party.rappresentativeName}</Text>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className={'w-1/2 space-y-4 content-start h-96'}>
                <Title>Voti</Title>
                <List>
                  {statesVotes.map((stateVote) => (
                    <ListItem key={stateVote.state_name} className={'flex items-start'}>
                      <Flex>
                        <Text>{stateVote.state_name}</Text>
                        <div className={'space-y-2 my-2'}>
                          {stateVote.parties.map((party) => (
                            <Text key={party.name}>{party.party_name}: {party.count}</Text>
                          ))}
                        </div>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Flex>
          </Modal.Body>
          <Modal.Footer className={'flex justify-end'}>
            <Button icon={XMarkIcon} color='gray' onClick={() => manualModal.setOpenModal(undefined)}>Annulla</Button>
            <Button icon={CheckIcon} onClick={() => saveElection()}>Aggiungi</Button>
          </Modal.Footer>
        </Modal>


        : // Manual modal


        <Modal show={manualModal.openModal === 'default'} size={'7xl'}
               onClose={() => manualModal.setOpenModal(undefined)}>
          <Modal.Header>Nuova elezione</Modal.Header>
          <Modal.Body className={'h-full'}>
            <Flex className={'h-full gap-10'}>
              <div className='w-1/2 space-y-4 content-start h-96'>
                <Title>Dati generali</Title>
                <TextInput placeholder='Nome' />
                <Flex className={'gap-6'}>
                  <DateRangePicker enableSelect={false} placeholder={'Data'} />
                  <TextInput placeholder='Fonte' />
                </Flex>
                <Select disabled={nations.length < 1} placeholder={nations.length < 1 ? 'Carico nazioni...' : 'Nazione'}
                        onValueChange={e => selectedNationChange(e)}>
                  {nations.length > 0 ?
                    nations.map((nation) => (
                      <SelectItem key={nation.id} value={nation.id}>{nation.italian_name}</SelectItem>
                    ))
                    :
                    <SelectItem value={'loading'}>Carico nazioni...</SelectItem>
                  }
                </Select>
                {regions.length > 0 ?
                  <>
                    <Title className={'mt-3'}>Partiti</Title>
                    <List>
                      {parties.length > 0 ?
                        parties.map((party) => (
                          <ListItem key={party.id} className={'flex items-start'}>
                            <Flex>
                              <Text>{party.name}</Text>
                              {removeParties.includes(party.id) ?
                                <Button size={'xs'} color={'gray'} icon={PlusIcon}
                                        onClick={() => partyRemove(party.id)}>Ripristina</Button>
                                :
                                <Button size={'xs'} color={'red'} icon={TrashIcon}
                                        onClick={() => partyRemove(party.id)}>Rimuovi</Button>
                              }
                            </Flex>
                          </ListItem>
                        ))
                        :
                        <ListItem>Carico partiti...</ListItem>
                      }
                    </List>
                  </>
                  :
                  null
                }
                {regions.length > 0 ?
                  <Button icon={PlusIcon} className={'w-full'}>Aggiungi partito</Button>
                  :
                  null
                }
              </div>
              <div className={'w-1/2 space-y-4 content-start h-96'}>
                <Title>Voti</Title>
                <List>
                  {regions.length > 0 ?
                    regions.map((region) => (
                      <ListItem key={region.id} className={'flex items-start'}>
                        <div className={'space-y-2'}>
                          <Title>{region.name}</Title>
                          <Text>{region.full_name}</Text>
                        </div>
                        <div className={'space-y-2 my-2'}>
                          {parties.length > 0 ?
                            parties.map((party) => (
                              <div key={party.id} className={'flex items-start'}>
                                {removeParties.includes(party.id) ?
                                  null
                                  :
                                  <TextInput placeholder={party.name} />
                                }
                              </div>
                            ))
                            :
                            <Text>Carico partiti...</Text>
                          }
                        </div>
                      </ListItem>
                    ))
                    :
                    <ListItem>Seleziona una nazione.</ListItem>
                  }
                </List>
              </div>
            </Flex>
          </Modal.Body>
          <Modal.Footer className={'flex justify-end'}>
            <Button icon={XMarkIcon} color='gray' onClick={() => manualModal.setOpenModal(undefined)}>Annulla</Button>
            <Button icon={CheckIcon} onClick={() => manualModal.setOpenModal(undefined)}>Aggiungi</Button>
          </Modal.Footer>
        </Modal>
      }
    </main>
  );
}