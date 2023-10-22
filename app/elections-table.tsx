import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react';
import Election from '../interfaces/election';

export default async function ElectionsTable({ elections }: { elections: Election[] }, { showNation }: { showNation: Boolean }) {
  return (
  <Table className="mt-5">
    <TableHead>
      <TableRow>
        {showNation ? <TableHeaderCell>Nazione</TableHeaderCell> : null}
        <TableHeaderCell>Nome</TableHeaderCell>
        <TableHeaderCell>Data</TableHeaderCell>
        <TableHeaderCell>Tipologia</TableHeaderCell>
        <TableHeaderCell>Fonte</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {elections.map((election) => (
        <TableRow key={election.name}>
          {showNation ? <TableCell>{election.nation}</TableCell> : null}
          <TableCell>{election.name}</TableCell>
          <TableCell>
            <Text>{election.date}</Text>
          </TableCell>
          <TableCell>
            <Text>{election.type}</Text>
          </TableCell>
          <TableCell>
            <Text>{election.origin}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  );
}