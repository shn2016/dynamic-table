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
  overflow-x: 'auto';
`;

const StyledTable = styled(Table)`
  min-width: 700px;
  width: auto;
`;

const EnhancedTable = ({ columns=[], data=[]}) => {
  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map(cell => (
              <TableCell key={cell}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {(data.length===0) 
          ?
          (<TableBody>
            <TableRow >
              <TableCell colSpan={6} key="noData" align="center">Sorry, there is no data available</TableCell>
            </TableRow>
          </TableBody>)
          :
          <TableBody>
            {data.map(row => {
              return (
              <TableRow key={row.uuid}>
                {Object.values(row).map(cell => {
                  return <TableCell key={cell}>{`${cell}`}</TableCell>
                })}
              </TableRow>
            )})}
          </TableBody>
        }
      </StyledTable>
    </StyledPaper>
  );
};


export default EnhancedTable;


