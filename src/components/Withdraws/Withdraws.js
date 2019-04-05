import React from 'react';
import DataTable from '../DataTable';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Withdraws extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            <DataTable />
          </CardContent>
        </Card>
      </div>
    )
  }
}