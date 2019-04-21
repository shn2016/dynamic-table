import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  color: white !important;
  right: 6rem;
  top: 2.5rem;
  display: block;
`;

const Form = styled.form`
  padding: 2px 0 !important;
  & > div {
    margin: 0 20px;
  }
  & > Button {
    margin: 13px;
  }
`

class Search extends React.Component {
  constructor(props) {
    super(props);

    const { filter, dateRangeName } = this.props;
    const lte =  (filter && filter[dateRangeName] && filter[dateRangeName].lte) 
      ? filter[dateRangeName].lte 
      : '';
    const gte =  (filter && filter[dateRangeName] && filter[dateRangeName].gte) 
      ? filter[dateRangeName].gte 
      : '';

    this.state = {
      display: false,
      lte, 
      gte,
      inputs: {},
    }
  }

  onDateChange(dateType, date) {
    this.setState({
      [dateType]: date,
    })
  }

  onInputChange(event, inputs, attribute) {
    inputs[attribute] = event.target.value;
    this.setState({
      inputs,
    })
  }

  clearSearch() {
    const search = {};
    this.setState({
      inputs: {},
      lte: '',
      gte: '',
    }, () => {
      this.updateFilter(search);
    });
  }

  onSearchClick() {
    const { dateRangeName } = this.props;
    const { gte, lte, inputs } = this.state;
    const search =Object.assign({[dateRangeName]: {lte, gte}}, inputs);
    
    this.updateFilter(search);
  }

  updateFilter(search) {
    const { filter, onPropsChange } = this.props;
    for(let key in filter) delete filter[key];
    const newFilter = Object.assign(filter, search);
    onPropsChange(newFilter);
  }

  displaySearch(display) {
    this.setState({
      display: !display,
    });
  }

  render() {
    const { attributes } = this.props;
    const { lte, gte, display, inputs } = this.state;
    return (
      <div>
        <Tooltip title="Search list">
          <StyledIconButton 
            aria-label="Search list" 
            className="searchButton"
            onClick={() => this.displaySearch(display)}
          >
            <SearchIcon />
          </StyledIconButton>
        </Tooltip>
        {display 
          && (
          <Form>
            {attributes.map(attribute=> {
              return (
                <TextField
                  label={attribute}
                  placeholder={attribute}
                  key={attribute}
                  margin="normal"
                  type="search"
                  value={inputs[attribute] || ""}
                  onChange={(event) => this.onInputChange(event, inputs, attribute)}
                />
              )
            })}
          </Form>)}
          { display 
          && (
          <Form noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              value = {gte}
              onChange={(event) => this.onDateChange('gte', event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              value = {lte}
              onChange={(event) => this.onDateChange('lte', event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Tooltip title="Clear Search">
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => this.onSearchClick()}
              >
                Search
              </Button>
            </Tooltip>
            <Tooltip title="Clear Search">
              <Button 
                variant="contained" 
                onClick={() => this.clearSearch()}
              >
                Clear
              </Button>
            </Tooltip>
          </Form>
          )}
      </div>
    )
  }
}  

export default Search;