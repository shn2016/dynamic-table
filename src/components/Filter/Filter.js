import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

const Group = styled(FormGroup)`
  flex-direction: row !important;

  & > .form-label {
    padding: 1rem !important;
  }
`;

const Filter = ({ option, onFilterChange }) => {
  const groups = Object.keys(option);
  return (
    <FormControl component="fieldset">
      {groups.map(group => (
        <Group key={group}>
          <FormLabel component="legend" className="form-label">{group}</FormLabel>
            {option[group].map((label, index) => (
              <FormControlLabel
                control={
                  <Checkbox checked={Object.values(label)[0]} onChange={()=> onFilterChange(option, group, index)} value="gilad" />
                }
                label={Object.keys(label)[0]}
                key={Object.keys(label)[0]}
              />
            ))}
        </Group>
      ))}
    </FormControl>
  )
};

export default Filter;