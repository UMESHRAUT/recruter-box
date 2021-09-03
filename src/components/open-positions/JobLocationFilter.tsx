import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@material-ui/core';
import HdRadio from '../radio/Radio';

interface JobLocationFilterI {
  locationChnage:(location:string)=>void;
}

function JobLocationFilter({locationChnage}:JobLocationFilterI) {
  const [location, setLocation] = useState('');
  const handleFilterChange = ()=>{
    locationChnage(location)
  }

  useEffect(() => {
    handleFilterChange();
  }, [location]);

  return (
    <div className=" d-md-block">
      <div className="category-list-v-header mb-4">
        Job Location
      </div>

      <RadioGroup
        aria-label="tier"
        name="tier"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >

        <div className="center-flex-row mr-8 mb-4" key="bengaluru">
          <HdRadio value="Bangalore" />

          <span className="custom-control-label co-location d-inline-block ml-2">
            Bengaluru, India
          </span>
        </div>


        <div className="center-flex-row mr-8 mb-4" key="gurugram">
          <HdRadio value="Gurugram" />

          <span className="custom-control-label co-location d-inline-block ml-2">
            Gurugram, India
          </span>
        </div>

        <div className="center-flex-row mr-8 mb-4" key="bengaluru">
          <HdRadio value="-1" />

          <span className="custom-control-label co-location d-inline-block ml-2">
            World Wide
          </span>
        </div>

      </RadioGroup>

    </div>

  );
}

export default JobLocationFilter;
