'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text, Button
} from '@tremor/react';
import { redirect } from 'next/navigation';

export default function NationsTable({ nations }: { nations: Nation[] }) {
  return (
    <Table className='mt-5'>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nome</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {nations.map((item) => (
          <TableRow key={item.id}>
            <a href={'/nations/' + item.id}>
              <TableCell>{item.name} {item.utf_icon}</TableCell>
            </a>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}