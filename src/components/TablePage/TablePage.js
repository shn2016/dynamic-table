import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Filter from '../../components/Filter';
import Pagination from '../../components/Pagination';
import AppBar from '../../components/AppBar';
import Table from '../../components/Table';

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  handleChangePage = (event, page) => {
    const { pagination, onPropsChange } = this.props;
    pagination.number = page+1;

    onPropsChange(pagination)
  }

  handleChangeRowsPerPage = event => {
    const size = event.target.value;
    const { pagination, onPropsChange } = this.props;
    pagination.size = size;
    pagination.number = 1;

    onPropsChange(pagination)
  }

  onFilterChange(option, group, index) {
    const key = Object.keys(option[group][index])[0];
    const value = Object.values(option[group][index])[0];
    option[group][index][key] = (!value) ? true : false;
    const {onPropsChange } = this.props;

    onPropsChange(option)
  }

  render() {
    const { 
      tableName,
      col,
      data,
      option,
      pagination
    } = this.props;

    return (
      <div>
        <AppBar tableName={tableName} />
        <Card >
          <CardContent>
            <Filter 
              option={option}
              onFilterChange={this.onFilterChange}
            />
            <Table 
              col={col}
              data={data}
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