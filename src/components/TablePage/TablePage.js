import React from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import getData from '../../services/getData';
import processData from '../../helper/processData';
import parseStringToNumber from '../../helper/parseStringToNumber';
import Search from '../Search';
import Option from '../Option';
import Table from '../Table';
import Pagination from '../Pagination';

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      pagination: {},
      filter: {},
      option: {},
    };

    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const params = qs.parse(location.search.slice(1));
    const newPagination = (!params.pagination) ? {} : parseStringToNumber(params.pagination);
    const newFilter = (!params.filter) ? {} : params.filter;

    this.setState({
      pagination: newPagination,
      filter: newFilter,
    }, () => this.updateState());
  }

  updateHistory() {
    const { type, history } = this.props;
    const { filter, pagination } = this.state;
    const params = { filter, pagination };
    
    history.push(`/${type}?${qs.stringify(params)}`);
  }

  updateState() {
    const { type } = this.props;
    const { filter, pagination } = this.state;

    getData(type, filter, pagination)
      .then(({data}) => {
        this.setState({
          data: processData(type, data[type]),
          pagination: data.pagination,
          option: data.option,
          isLoading: false,
        }, () => this.updateHistory());
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
      type,
      columns,
      searchDateRange,
      searchAttributes,
      filterOptions,
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
            <Typography variant="h6" color="inherit" >
              {`${type} Table`}
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
                pageType={type}
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
export default withRouter(TablePage);
