import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Side = styled.div`
  --padding: 1rem 2rem;
  /* background: #001529; */
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const Brand = styled.div`
  display: flex;
  /* background: #002140; */
  padding: var(--padding);
`;

const Menu = styled.div`
  display: grid;
`;

const H1 = styled.h3`
  color: rgba(0, 0, 0, 0.87);;
  font-size: 1.25rem;
`;

const Link = styled(NavLink).attrs({
  exact:true,
  activeClassName: 'active',
})`
  color: rgba(0, 0, 0, 0.87);;
  padding: var(--padding);
  text-decoration: none;
  opacity: 0.8;
  &.active {
    color: #2196f3;
    font: large lighter bolder;
    opacity: 1;
  }
`;

const ListItem = styled.div`
  padding: 0.5rem 0;
  :hover {
    background-color: #eeeeee;
    border: 1px solid #dadde9;
  }
`
const Sidebar = () => (
  <Side>
    <Brand>
      <H1>Dynamic Table</H1>
    </Brand>
    <hr/>
    <Menu>
      <ListItem><Link to="/">Home</Link></ListItem>
      <ListItem><Link to="/trades">Trade</Link></ListItem>
      <ListItem><Link to="/withdraws">Withdraw</Link></ListItem>
    </Menu>
  </Side>
)

export default Sidebar;