import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

function Filters() {
  return (
    <div style={{ width:'280px' }} className=' border-right h-100 d-flex flex-col'>

      <div className='box__header '>
        <h3>Filters</h3>
      </div>
      <div className='careers-filters-container flex-1 overflow-auto'>
        <div className='careers-filters-container flex-1 flex-col overflow-auto px-3'>
          <FormControlLabel control={<Checkbox name="checkedC" onChange={(e,v)=>console.log(e.target.name)} />} label="Referred" onChange={console.log} />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Shortlisted" />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="In Process" />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Offered" />
          <FormControlLabel control={<Checkbox name="checkedC" />} label="Onboarded" />
        </div>
      </div>

    </div>
  );
}

export default Filters;
