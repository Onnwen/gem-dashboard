import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text, Title
} from '@tremor/react';

interface Election {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  in_progress: boolean;
  origin: string;
}

export default async function NationElectionsTable({ elections }: { elections: Election[] }) {
  return (
    <>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Fonte</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elections.map((election) => (
            <TableRow key={election.name}>
              <TableCell>{election.name}</TableCell>
              <TableCell>
                {election.start_date.toTimeString() == election.end_date.toTimeString() ?
                  <Text>{election.start_date.toLocaleDateString()}</Text> :
                  <Text>{election.start_date.toLocaleDateString()} &rarr; {election.end_date.toLocaleDateString()}</Text>}
              </TableCell>
              <TableCell>
                <Text>{election.origin}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}