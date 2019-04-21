import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import Trades from './pages/Trades';
import Withdraws from './pages/Withdraws';
import Sidebar from './components/Sidebar';
import Error from './pages/Error';
import Home from './pages/Home';

const DynamicTables = () => (
  <Layout Sidebar={Sidebar}>
    <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/trades"
          component={Trades}
        />
        <Route
          exact
          path="/withdraws"
          component={Withdraws}
        />
        <Route
          component={Error}
        />
      </Switch>
  </Layout>
);

export default DynamicTables;