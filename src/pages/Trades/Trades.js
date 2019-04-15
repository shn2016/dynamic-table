import React from 'react';
import getTrades from '../../services/getTrades';
import TablePage from '../../components/TablePage';
import processData from '../../helper/processData';

export default class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      filter: {},
      pagination: {},
      trades: [],
      search: {
        uuid: '',
        volume: '',
        price: '',
      },
      updatedAt: {},
      isLoading: true,
    }
    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    getTrades()
      .then(({data: {trades, pagination, option}}) => {
        const newColumns =Object.keys(trades[0]);
        const filter = {
          side: option.side.map(value =>  { return { [value]: false, }}),
          tradingPair: option.tradingPair.symbol.map(value =>  { return { [value]: false, }}),
        };
        processData(trades, 'updatedAt');

        this.setState({
          pagination,
          trades,
          filter,
          columns: newColumns,
          isLoading: false,
        });
      })
  }

  updateQuery() {
    const { filter, pagination, search, updatedAt } = this.state;
    const { side, tradingPair } = filter;

    let query = '';

    query += (updatedAt.gte) ? `&&filter[updatedAt][gte]=${updatedAt.gte}` : '';
    query += (updatedAt.lte) ? `&&filter[updatedAt][lte]=${updatedAt.lte}` : '';

    query += (search.uuid) ? `&&filter[uuid]=${search.uuid}` : '';
    query += (search.volume) ? `&&filter[volume]=${search.volume}` : '';
    query += (search.price) ? `&&filter[price]=${search.price}` : '';

    side.forEach(obj => {
      if (Object.values(obj)[0]) {
        query += `&&filter[side][inq]=${Object.keys(obj)[0]}`;
      }
    });
    tradingPair.forEach(obj => {
      if (Object.values(obj)[0]) {
        query += `&&filter[tradingPair][symbol][inq]=${Object.keys(obj)[0]}`;
      }
    })
    query += `&&pagination[number]=${pagination.number}&&pagination[size]=${pagination.size}`;
    
    this.updateState(query)
  }

  updateState(query) {
    getTrades(query)
      .then(({data: {trades, pagination}}) => {
        processData(trades, 'updatedAt');
        this.setState({
          trades,
          pagination,
          isLoading: false,
        });
      })
  }

  onStateChange(key) {
    this.setState({
      ...key,
      isLoading: true,
    }, () => this.updateQuery())
  }

  render() {
    const { columns, trades , filter, pagination, search, updatedAt, isLoading } = this.state;
    return (
      <TablePage 
        tableName="Trades Table"
        columns={columns}
        data={trades}
        filter={filter}
        pagination={pagination}
        onPropsChange={this.onStateChange}
        search={search}
        rangeOption={updatedAt}
        isLoading={isLoading}
      />
    )
  }
}