import React from 'react';
import TablePage from '../../components/TablePage';

const columns = ['uuid', 'create at', 'amount', 'status', 'bank reference Number'];

const searchAttributes = ['uuid', 'amount', 'bankReferenceNumber'];

const searchDateRange = 'createAt';

const filterOptions = ['status'];

const Withdraws = () => (
  <TablePage 
    tableName="Withdraws Table"
    type="withdraws"
    columns={columns}
    searchAttributes={searchAttributes}
    searchDateRange={searchDateRange}
    filterOptions={filterOptions}
  />
);

export default Withdraws;
  
