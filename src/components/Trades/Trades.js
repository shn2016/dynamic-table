import React from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import DataTable from '../DataTable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      col: [],
      option: {},
      pagination: {},
      trades: [],
    }
  }

  componentDidMount() {
    axios.get('https://dynamic-table-server.herokuapp.com/trades.json')
    .then(({data: {trades, pagination, option}}) => {
      const newCol = (trades) ? Object.keys(trades[0]) : [];
      this.setState({
        pagination,
        trades,
        option,
        col: newCol,
      });
    })
}

  render() {
    const { col, trades , option, pagination} = this.state

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Trades
            </Typography>
          </Toolbar>
        </AppBar>
        <Card >
          <CardContent>
            <DataTable 
              col={col}
              data={trades}
              option={option}
              pagination={pagination}
            />
          </CardContent>
        </Card>
      </div>
    )
  }
}