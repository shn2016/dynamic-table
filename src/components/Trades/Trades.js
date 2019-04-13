import React from 'react';
import DataTable from '../DataTable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Filter from '../Filter';
import getTrades from '../../services/getTrades';
import Pagination from '../Pagination';
import TableAppBar from '../TableAppBar';


export default class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: [],
      option: {},
      pagination: {},
      trades: [],
      search: ['uuid', 'volume', 'price'],
      searcgByRange: 'updatedAt',
      query: '',
      optionDirty: false,
    }
    // onStateChange(col, option, pagination, query, optionDirty);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    const { query } = this.state;
    this.updateStates(query);
  }

  updateQuery() {
    const { option } = this.state;
    const { side, tradingPair } = option;

    let newQuery = '';
    side.forEach(obj => {
      if (Object.values(obj)[0]) {
        newQuery += `&&filter[side][inq]=${Object.keys(obj)[0]}`;
      }
    });
    tradingPair.forEach(obj => {
      if (Object.values(obj)[0]) {
      newQuery += `&&filter[tradingPair][symbol][inq]=${Object.keys(obj)[0]}`;
      }
    })

    this.updateStates(newQuery);
    this.setState({
      query: newQuery,
    })
  }

  updateStates(query) {
    getTrades(query)
    .then(({data: {trades, pagination, option}}) => {
      const { optionDirty } = this.state;
      if (optionDirty) {
        this.setState({
          trades,
          pagination,
        });
        return;
      };

      const newCol = (trades) ? Object.keys(trades[0]) : [];
      const newOption = {
        side: option.side.map(value =>  { const obj = {}; obj[value] = false; return obj;}),
        tradingPair: option.tradingPair.symbol.map(value =>  { const obj = {}; obj[value] = false; return obj;}),
      };

      this.setState({
        pagination,
        trades,
        option: newOption,
        col: newCol,
      });
    })
  }

  // lift below three functions;
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
    const { col, trades , option, pagination} = this.state;

    return (
      <div>
        <TableAppBar tableName="Trades" />
        <Card >
          <Filter 
            option={option}
            onFilterChange={this.onFilterChange}
          />
        </Card>
        <Card >
          <CardContent>
            <DataTable 
              col={col}
              data={trades}
              option={option}
              pagination={pagination}
            />
          </CardContent>
          <Pagination 
              pagination={pagination}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Card>
      </div>
    )
  }
}