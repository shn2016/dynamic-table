import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Trades from './pages/Trades';
import Withdraws from './pages/Withdraws';
import MUITrades from './pages/MUITrades';
import MUIWithdraws from './pages/MUIWithdraws';

const App = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const Content = styled.div`
  padding: 2rem 2rem 2rem 4rem;
  background: #eee;
`;

const DynamicTables = () => (
  <BrowserRouter>
    <App>
      <Sidebar />
      <Content>
        <Switch>
          <Route
            exact
            path="/"
            component={Trades}
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
            exact
            path="/muitrades"
            component={MUITrades}
          />
          <Route
            exact
            path="/muiwithdraws"
            component={MUIWithdraws}
          />
          <Route
            render = {() => (
            <div> Error 404: Page not found</div>
            )}
          />
        </Switch>
      </Content>
    </App>
  </BrowserRouter>
);

export default DynamicTables;