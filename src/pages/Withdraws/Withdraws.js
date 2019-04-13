import React from 'react';
import getWithdraws from '../../services/getWithdraws';
import TablePage from '../../components/TablePage';

export default class Withdraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: [],
      option: {},
      pagination: {},
      withdraws: [],
      search: ['uuid', 'amount', 'bankReferenceNumber'],
      searcgByRange: 'createdAt',
    }

    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    getWithdraws()
      .then(({data: {withdraws, pagination, option}}) => {
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

  updateQuery() {
    const { option, pagination } = this.state;
    const { status } = option;

    let query = '';
    status.forEach(obj => {
      if (Object.values(obj)[0]) {
        query += `&&filter[status]=${Object.keys(obj)[0]}`;
      };
    });
    query += `&&pagination[number]=${pagination.number}&&pagination[size]=${pagination.size}`;
    
    this.updateState(query);
  }

  updateState(query) {
    getWithdraws(query)
      .then(({data: { withdraws, pagination }}) => {
        this.setState({
          withdraws,
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
    const { col, withdraws , option, pagination} = this.state;

    return (
      <TablePage 
        tableName="Withdraws Table"
        col={col}
        data={withdraws}
        option={option}
        pagination={pagination}
        onPropsChange={this.onStateChange}
      />
    )
  }
}