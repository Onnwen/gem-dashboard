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

interface Nation {
  id: number;
  name: string;
  utf_icon: string;
}

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
          <a href={'/nation/' + item.id} key={item.id}>
            <TableRow>
              <TableCell>{item.name} {item.utf_icon}</TableCell>
            </TableRow>
          </a>
        ))}
      </TableBody>
    </Table>
  );
}