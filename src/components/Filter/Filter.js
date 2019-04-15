import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';


const Button = styled(IconButton)`
  position: absolute !important;
  color: white !important;
  right: 3rem;
  top: 2.5rem;
  display: block;
`;

const Group = styled(FormGroup)`
  flex-direction: row !important;
  padding: 0 0 8px;
  & > .form-label {
    padding: 1rem !important;
  }
`;

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      gte: '',
      lte: '',
    }
  }

  onFilterChange(filter, group, index) {
    const { onPropsChange } = this.props;
    const key = Object.keys(filter[group][index])[0];
    const value = Object.values(filter[group][index])[0];
    filter[group][index][key] = (!value) ? true : false;
    
    onPropsChange(filter);
  }

  displayFilter(display) {
    this.setState({
      display: !display,
    })
  }

  render() {
    const { options } = this.props;
    const { display } = this.state;
    const groups = Object.keys(options);

    return (
      <div>
        <Tooltip title="Filter list">
        <Button 
          aria-label="Filter list" 
          className="filterButton"
          onClick={() => this.displayFilter(display)}
        >
          <FilterListIcon />
        </Button>
        </Tooltip>
        { display &&
          (<FormControl component="fieldset">
          {groups.map(group => (
            <Group key={group}>
              <FormLabel component="legend" className="form-label">{group}</FormLabel>
                {options[group].map((label, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox checked={Object.values(label)[0]} onChange={()=> this.onFilterChange(options, group, index)} value="gilad" />
                    }
                    label={Object.keys(label)[0]}
                    key={Object.keys(label)[0]}
                  />
                ))}
            </Group>
          ))}
          </FormControl>)
        }
      </div>
    )
  }
}

export default Filter;