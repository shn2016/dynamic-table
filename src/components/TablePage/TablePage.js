import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Pagination from '../Pagination';
import Table from '../Table';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import getData from '../../services/getData';
import processData from '../../helper/processData';
import Search from '../Search';
import Option from '../Option';

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // filter incldues searchInput, dateRange and option
      data: [],
      isLoading: true,
      pagination: {},
      filter: {},
      option: {},
    };

    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const { type } = this.props;
    const { filter, pagination } = this.state;
    getData(type, filter, pagination)
      .then(({data}) => {
        console.log(data);

        this.setState({
          data: processData(type, data[type]),
          pagination: data.pagination,
          option: data.option,
          isLoading: false,
        })
      });
  }

  onStateChange(key) {
    this.setState({
      key,
      isLoading: true,
    }, () => {
      this.updateState();
    });
  }

  render() {
    const { 
      tableName,
      columns,
      searchDateRange,
      searchAttributes,
      filterOptions
    } = this.props;

    const {
      data,
      isLoading,
      pagination,
      filter,
      option
    } = this.state;
    return (
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
                filter={filter}
                attributes={searchAttributes}
                onPropsChange={this.onStateChange}
                dateRangeName={searchDateRange}
              />
              <Option
                filter={filter}
                option={option}
                onPropsChange={this.onStateChange}
                filterOptions={filterOptions}
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
                onPropsChange={this.onStateChange}
              />
            </CardContent>
        </Card>
      </div>
    )
  };
}
export default TablePage;
