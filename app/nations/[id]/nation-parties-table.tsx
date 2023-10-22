"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge
} from '@tremor/react';
import { FlagIcon } from '@heroicons/react/24/solid';
import Party from '../../../interfaces/party';

export default async function NationPartiesTable({ parties }: { parties: Party[] }) {
  return (
    <>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parties.map((party) => (
            <TableRow key={party.id}>
              <TableCell>
                <Badge color={party.color_name} size={'lg'}>{party.italian_name}</Badge>
              </TableCell>
              {party.total_votes != null ? (
                <TableCell>
                  <Text>{party.total_votes} voti</Text>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}