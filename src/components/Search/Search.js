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

    this.state = {
      display: false,
      gte: '',
      lte: '',
    }
  }

  onDateChange(dateType, date) {
    this.setState({
      [dateType]: date,
    })
  }

  onTextChange(event, search, label) {
    const { onPropsChange } = this.props;
    search[label] = event.target.value;

    onPropsChange(search)
  }

  clearSearch(search) {
    const { onPropsChange, rangeOption } = this.props;
    Object.keys(search).forEach(label => search[label]='');
    for(let object in rangeOption) { delete rangeOption[object]};
    this.setState({
      gte: '',
      lte: '',
    }, () => onPropsChange([ search, rangeOption ]))
  }

  onSearchRangeClick() {
    const { onPropsChange, rangeOption } = this.props;
    const { gte, lte } = this.state;
    rangeOption.gte = gte;
    rangeOption.lte = lte;

    onPropsChange(rangeOption);
  }

  displaySearch(display) {
    this.setState({
      display: !display,
    })
  }
  render() {
    const { options } = this.props;
    const { gte, lte, display } = this.state;
    const labels = Object.keys(options);

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
            {labels.map(label=> {
              return (
                <TextField
                  label={label}
                  placeholder={label}
                  key={label}
                  margin="normal"
                  type="search"
                  value={options[label]}
                  onChange={(event) => this.onTextChange(event, options, label)}
                />
              )
            })}
            <Tooltip title="Clear Search">
              <Button 
                variant="contained" 
                onClick={() => this.clearSearch(options)}
              >
                Clear
              </Button>
            </Tooltip>
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
                onClick={() => this.onSearchRangeClick()}
              >
                Search Date Range
              </Button>
            </Tooltip>
          </Form>
          )}
      </div>
    )
  }
}  

export default Search;