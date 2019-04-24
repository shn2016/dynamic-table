import React from 'react';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import getInnerObjectValues from '../../helper/getInnerObjectValues';
import checkFilterOption from '../../helper/checkFilterOption';
import handleFilterOption from '../../helper/handleFilterOption';

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

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
      display: false
    }
  }

  handleCheckbox(subObjects, checkboxLabel) {
    const { filter, pageType } = this.props;
    return checkFilterOption(subObjects, checkboxLabel, filter, pageType);
  }

  onOptionChange(subObjects, checkboxLabel) {
    const { onPropsChange, filter, pageType } = this.props;
    handleFilterOption(subObjects, checkboxLabel, filter, pageType);
    onPropsChange(filter);
  }

  displayOption(display) {
    this.setState({
      display: !display,
    })
  }

  render() {
    const { option, filterOptions } = this.props;
    const { display } = this.state;
    return (
      <div>
        <Tooltip title="Filter list">
        <Button 
          aria-label="Filter list" 
          className="filterButton"
          onClick={() => this.displayOption(display)}
        >
          <FilterListIcon />
        </Button>
        </Tooltip>
        { display &&
          (<FormControl component="fieldset">
          {filterOptions.map(filterOption => {
            const subObjects = filterOption.split('.');
            const checkboxLabels = getInnerObjectValues(subObjects, option);
            return (
              <Group key={subObjects[0]}>
                <FormLabel component="legend" className="form-label">{subObjects[0]}</FormLabel>
                  {checkboxLabels.map(checkboxLabel => (
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={this.handleCheckbox(subObjects, checkboxLabel)} 
                          onChange={()=> this.onOptionChange(subObjects, checkboxLabel)} 
                          value={checkboxLabel} 
                        />
                      }
                      label={checkboxLabel}
                      key={checkboxLabel}
                    />
                  ))}
              </Group>
          )})}
          </FormControl>)
        }
      </div>
    )
  }
}

export default Option;