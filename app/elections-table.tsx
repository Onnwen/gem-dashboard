import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react';

interface Election {
  id: number;
  name: string;
  nation: string;
  date: string;
  type: string;
  origin: string;
}

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
      {elections.map((item) => (
        <TableRow key={item.name}>
          {showNation ? <TableCell>{item.nation}</TableCell> : null}
          <TableCell>{item.name}</TableCell>
          <TableCell>
            <Text>{item.date}</Text>
          </TableCell>
          <TableCell>
            <Text>{item.type}</Text>
          </TableCell>
          <TableCell>
            <Text>{item.origin}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  );
}