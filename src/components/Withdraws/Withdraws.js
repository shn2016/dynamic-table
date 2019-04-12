import React from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DataTable from '../DataTable';
import Pagination from '../Pagination';

export default class Withdraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: [],
      option: {},
      pagination: {},
      trades: [],
    }
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentDidMount() {
    axios.get('https://dynamic-table-server.herokuapp.com/withdraws.json')
      .then(({data: {withdraws, pagination, option}}) => {
        const newCol = (withdraws) ? Object.keys(withdraws[0]) : [];
        console.log(pagination)
        this.setState({
          pagination,
          withdraws,
          option,
          col: newCol,
        });
      })
}

handleChangePage = (event, page) => {
  const { pagination } = this.state;
  pagination.number = page + 1;
  this.setState({ pagination });
};

handleChangeRowsPerPage = event => {
  this.setState({ size: event.target.value });
};

  render() {
    const { col, withdraws, option, pagination} = this.state
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Withdraws
            </Typography>
          </Toolbar>
        </AppBar>
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