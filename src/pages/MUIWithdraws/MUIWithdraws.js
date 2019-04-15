import React from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import processData from '../../helper/processData';


export default class MUIWithdraws extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      withdraws: [],
      columns: [
        {
          name: "uuid",
          options: {
            filter: false,
          }
        }, {
          name: "createdAt", 
          options: {
            filter: false,
          }
        }, {
          name: "amount", 
          options: {
            filter: false,
          }
        }, {
          name: "status", 
          options: {
            filter: true,
          },
        }, {
          name: "bankReferenceNumber", 
          options: {
            filter: false,
          },
        }
      ]
    }
  }

  componentDidMount() {
    axios.get('https://dynamic-table-server.herokuapp.com/withdraws.json?pagination[number]=1&&pagination[size]=+Infinity')
    .then(({data: { withdraws }}) => {
      processData(withdraws, 'createdAt');
      this.setState({
        withdraws,
      });
    })
}

  render() {
    const { withdraws, columns } = this.state
    const options = {
      filterType: 'checkbox',
      selectableRows: false,
    };
    
    const data = withdraws.map(row => {
      return Object.values(row);
    })
    return (
      <MUIDataTable
        title={"Material UI - Withdraws"}
        data={data}
        columns={columns}
        options={options}
      />
    )
  }
}