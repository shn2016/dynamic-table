import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  width: '100%';
  /* margin-top: 50px; */
  overflow-x: 'auto';
`;

const StyledTable = styled(Table)`
  min-width: 700px;
  width: auto;
`;
const DataTable = ({ col=[], data=[]}) => {
  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            {col.map(cell => (
              <TableCell key={cell}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
            <TableRow key={row.uuid}>
              {Object.values(row).map(cell => {
                const value = (typeof(cell) === 'object') ? cell.symbol : cell;
                return <TableCell key={cell}>{`${value}`}</TableCell>
              })}
            </TableRow>
          )})}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}


export default DataTable;


