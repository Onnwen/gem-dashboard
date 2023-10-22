import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text, Title
} from '@tremor/react';
import Election from '../../../interfaces/election';


export default async function NationElectionsTable({ elections }: { elections: Election[] }, { isLoading }: { isLoading: boolean }) {
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
                {new Date(election.start_date).toTimeString() == new Date(election.end_date).toTimeString() ?
                  <Text>{new Date(election.start_date).toLocaleDateString()}</Text> :
                  <Text>{new Date(election.start_date).toLocaleDateString()} &rarr; {new Date(election.end_date).toLocaleDateString()}</Text>}
              </TableCell>
              <TableCell>
                <Text>{election.source}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}