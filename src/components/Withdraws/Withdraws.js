import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DataTable from '../DataTable';
import Pagination from '../Pagination';
import getWithdraws from '../../services/getWithdraws';
import TableAppBar from '../TableAppBar';
import Filter from '../Filter';

export default class Withdraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: [],
      option: {},
      pagination: {},
      trades: [],
      search: ['uuid', 'amount', 'bankReferenceNumber'],
      searcgByRange: 'createdAt',
      filter: ['status'],
      optionDirty: false,
      query: '',
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.updateStates();
  }

  updateQuery() {
    const { option } = this.state;
    const { status } = option;

    let newQuery = '';
    status.forEach(obj => {
      if (Object.values(obj)[0]) {
        newQuery += `&&filter[status]=${Object.keys(obj)[0]}`;
      };
    });
    console.log(newQuery);
    this.updateStates(newQuery);
    this.setState({
      query: newQuery,
    })
  }

  updateStates(query) {
    getWithdraws(query)
    .then(({data: {withdraws, pagination, option}}) => {
      const { optionDirty } = this.state;
      if (optionDirty) {
        this.setState({
          withdraws,
          pagination,
        });
        return;
      };

      const newCol = (withdraws) ? Object.keys(withdraws[0]) : [];
      const newOption = {
        status: option.status.map(value =>  { const obj = {}; obj[value] = false; return obj;}),
      };
      this.setState({
        pagination,
        withdraws,
        option: newOption,
        col: newCol,
      });
    })
  }

  handleChangePage = (event, page) => {
    const { pagination, query } = this.state;
    const newQuery = query + `&&pagination[number]=${page+1}&&pagination[size]=${pagination.size}`;
    this.updateStates(newQuery);
  };

  handleChangeRowsPerPage = event => {
    const size = event.target.value;
    const { query } = this.state;
    const newQuery = query + `&&pagination[number]=1&&pagination[size]=${size}`;

    this.updateStates(newQuery);
  };

  onFilterChange(option, group, index) {
    const key = Object.keys(option[group][index])[0];
    const value = Object.values(option[group][index])[0];
    option[group][index][key] = (!value) ? true : false;

    this.setState({
      option,
      optionDirty: true,
    });

    this.updateQuery();
  }

  render() {
    const { col, withdraws, option, pagination} = this.state
    return (
      <div>
        <TableAppBar tableName="Withdraws" />
        <Filter 
            option={option}
            onFilterChange={this.onFilterChange}
        />
        <Card >
          <CardContent>
            <DataTable 
              col={col}
              data={withdraws}
              option={option}
            />
            <Pagination 
              pagination={pagination}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}