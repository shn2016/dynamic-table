import React from 'react';
import getWithdraws from '../../services/getWithdraws';
import TablePage from '../../components/TablePage';
import processData from '../../helper/processData';

export default class Withdraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      filter: {},
      pagination: {},
      withdraws: [],
      search: {
        uuid: '',
        amount: '',
        bankReferenceNumber: '',
      },
      createdAt: {},
      isLoading: true,
    }

    this.onStateChange = this.onStateChange.bind(this);
  }

  componentDidMount() {
    getWithdraws()
      .then(({data: {withdraws, pagination, option}}) => {
        const newColumns = Object.keys(withdraws[0]);
        const filter = {
          status: option.status.map(value => { return { [value]: false, }}),
        };
        processData(withdraws, 'createdAt');
        this.setState({
          pagination,
          withdraws,
          filter,
          columns: newColumns,
          isLoading: false,
        });
      })
  }

  updateQuery() {
    const { filter, pagination, search, createdAt } = this.state;
    const { status } = filter;

    let query = '';

    query += (createdAt.gte) ? `&&filter[createdAt][gte]=${createdAt.gte}` : '';
    query += (createdAt.lte) ? `&&filter[createdAt][lte]=${createdAt.lte}` : '';

    query += (search.uuid) ? `&&filter[uuid]=${search.uuid}` : '';
    query += (search.amount) ? `&&filter[amount]=${search.amount}` : '';
    query += (search.bankReferenceNumber) ? `&&filter[bankReferenceNumber]=${search.bankReferenceNumber}` : '';

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
        processData(withdraws, 'createdAt');
        this.setState({
          withdraws,
          pagination,
          isLoading: false,
        });
      });
  }

  onStateChange(key) {
    this.setState({
      ...key,
      isLoading: true,
    }, () => this.updateQuery())
  }

  render() {
    const { columns, withdraws , filter, pagination, search, createdAt, isLoading } = this.state;

    return (
      <TablePage 
        tableName="Withdraws Table"
        columns={columns}
        data={withdraws}
        filter={filter}
        pagination={pagination}
        onPropsChange={this.onStateChange}
        search={search}
        rangeOption={createdAt}
        isLoading={isLoading}
      />
    )
  }
}