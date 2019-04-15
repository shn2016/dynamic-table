import React from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import processData from '../../helper/processData';

export default class MUITrades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trades: [],
    }
  }

  componentDidMount() {
    axios.get('https://dynamic-table-server.herokuapp.com/trades.json?pagination[number]=1&&pagination[size]=+Infinity')
    .then(({data: { trades }}) => {
      processData(trades, 'updatedAt');
      this.setState({
        trades,
      });
    })
}

  render() {
    const { trades } = this.state
    const options = {
      filterType: 'checkbox',
      selectableRows: false,
    };
    const columns = [
      {
        name: "uuid",
        options: {
          filter: false,
        }
      }, {
        name: "updatedAt", 
        options: {
          filter: false,
        }
      }, {
        name: "volume", 
        options: {
          filter: false,
        }
      }, {
        name: "price", 
        options: {
          filter: false,
        },
      }, {
        name: "side", 
        options: {
          filter: true,
        },
      }, {
        name: "tradingPair", 
        options: {
          filter: true,
        },
      },
    ]
    const data = trades.map(row => {
      const set = Object.values(row);
      set[5] = set[5].symbol;
      return set;
    })
    return (
      <MUIDataTable
        title={"Material UI - Trades"}
        data={data}
        columns={columns}
        options={options}
      />
    )
  }
}