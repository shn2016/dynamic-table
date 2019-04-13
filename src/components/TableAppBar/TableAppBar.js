import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Button = styled(IconButton)`
  color: white !important;
  position: absolute !important;
  display: block;
  &.filterButton {
    right: 1rem;
  }
  &.searchButton {
    right: 4rem;
  }
`
const TableAppBar = ({ tableName}) => (
  <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" color="inherit">
      {tableName}
    </Typography>
    <Tooltip title="Filter list">
      <Button aria-label="Filter list" className="filterButton">
        <FilterListIcon />
      </Button>
    </Tooltip>
      <Tooltip title="Filter list">
      <Button aria-label="Filter list" className="searchButton">
        <SearchIcon />
      </Button>
    </Tooltip>
  </Toolbar>
</AppBar>
)

export default TableAppBar;