import React, { useEffect, useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import OpenPositionFilter from './OpenPositionFilter';

interface TeamOpeningFilterI {
  teams:any[]
}
function TeamOpeningFilter({teams}:TeamOpeningFilterI) {

  const [teamsArray, setTeamsArray] = useState<any>([]);

  useEffect(() => {
    const newArray:any=[];
    teams && Object.entries(teams).map(([key,value])=>{
      const otherDetails:any = value;
      console.log(otherDetails);
      newArray.push({name:key,url:key.toLocaleLowerCase().replaceAll(' ','-'), location:otherDetails.location})
    });
    console.log(newArray);
    setTeamsArray([{name:'All Teams', url:'all-teams', location:['bengaluru', 'GuruGram', 'World Wide']},...newArray]);

  }, [teams]);

  // const teams = [
  //   {name:'All Teams', url:'all-teams', location:['bengaluru', 'GuruGram', 'World Wide']},
  //   {name:'Design', url:'design'},
  //   {name:'Engineering', url:'engineering'},
  //   {name:'Finance', url:'finance'},
  //   {name:'Human Resource', url:'human-resource'},
  //   {name:'Marketing', url:'marketing'},
  //   {name:'Product Management', url:'product-management'},
  //   {name:'Sales', url:'sales'},
  //   {name:'Talent Acquisition', url:'talent-acquisition'},
  //   {name:'Technical Writing', url:'technical-writing'},
  //   {name:'Others', url:'others'},
  // ];
  return (
    <div className='d-flex flex-col overflow-hidden'>
      <div
        className="category-list-v-header mt-4 mb-4 d-md-block">
        Teams
      </div>

      <ul className="category-list category-list-v  d-md-block overflow-auto">
        {teamsArray.map((teamDetails:any) =>
          <OpenPositionFilter
            to={`/dashboard/open-positions/${teamDetails.url}`}
            title={teamDetails.name}
          />)}

      </ul>
    </div>
  );
}

export default TeamOpeningFilter;
