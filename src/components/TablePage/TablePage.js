import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Filter from '../Filter';
import Pagination from '../Pagination';
import Table from '../Table';
import Search from '../Search';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const TablePage = ({ 
  tableName,
  columns,
  data,
  filter,
  pagination,
  search,
  onPropsChange,
  rangeOption,
  isLoading,
}) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {tableName}
        </Typography>
      </Toolbar>
    </AppBar>
    <Card >
        <CardContent>
          <Search
            options={search}
            onPropsChange={onPropsChange}
            rangeOption={rangeOption}
          />
          <Filter
            options={filter}
            onPropsChange={onPropsChange}
          />
          {(isLoading)
            ?
            (<ProgressWrapper>
              <CircularProgress position="center"/>
            </ProgressWrapper>)
            :
            <Table
              columns={columns}
              data={data}
            />
          }
          <Pagination 
            pagination={pagination}
            onPropsChange={onPropsChange}
          />
        </CardContent>
      
    </Card>
  </div>
);

  export default TablePage;
