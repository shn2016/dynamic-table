import React from 'react';
import { HashRouter} from 'react-router-dom';
import styled from 'styled-components';

const App = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;
  background: #eee;
`;


const Layout = ({ Sidebar, children}) => (
  <HashRouter>
    <App>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </App>
  </HashRouter>
);

export default Layout;