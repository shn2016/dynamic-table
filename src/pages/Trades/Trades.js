import React from 'react';
import TablePage from '../../components/TablePage';

const columns = ['uuid', 'update at', 'volumn', 'price', 'side', 'symbol'];

const searchAttributes = ['uuid', 'volume', 'price'];

const searchDateRange = 'updatedAt';

const filterOptions = ['tradingPair.symbol', 'side'];
   
const Trades = () => (
  <TablePage 
    tableName="Trades Table"
    type="trades"
    columns={columns}
    searchAttributes={searchAttributes}
    searchDateRange={searchDateRange}
    filterOptions={filterOptions}
  />
);

export default Trades;
  
