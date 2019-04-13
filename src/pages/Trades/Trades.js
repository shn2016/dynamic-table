import React from 'react';
import getTrades from '../../services/getTrades';
import TablePage from '../../components/TablePage';

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
    }

    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    getTrades()
      .then(({data: {trades, pagination, option}}) => {
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

  updateQuery() {
    const { option, pagination } = this.state;
    const { side, tradingPair } = option;

    let query = '';
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
        this.setState({
          trades,
          pagination,
        });
      })
  }

  onStateChange(key) {
    //option, search, searchByRange changes;
    this.setState({
      key,
    }, () => this.updateQuery())
  }

  render() {
    const { col, trades , option, pagination} = this.state;

    return (
      <TablePage 
        tableName="Trades Table"
        col={col}
        data={trades}
        option={option}
        pagination={pagination}
        onPropsChange={this.onStateChange}
      />
    )
  }
}