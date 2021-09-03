import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import JobLocationFilter from './JobLocationFilter';
import TeamOpeningFilter from './TeamOpeningFilter';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PositionCard from './PositionCard';
import { Switch, useRouteMatch } from 'react-router';
import useApiHook from '../core/UseApiHook';
import { RequestAuthType } from '../core/request';
import { useDispatch } from 'react-redux';
import { ALL_POSITIONS } from '../../redux/constants/FormConstant';

function AllPositions() {
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    setLocationFilter('-1')
  }, []);

  const {team}= useParams<any>();
  console.log(team);
 const {loading,data,getApi} = useApiHook(RequestAuthType.BEARER);
  const history = useHistory();
  console.log(history);
  console.log(path);

  const [filteredList, setFilteredList] = useState<any[]>([]);

  useEffect(() => {
    getApi('/api/v1.0/referrals/position');
  }, []);

  const handleFilterChange = ()=>{
    console.log(locationFilter);
    if(data && team!=='all-teams') {
      const newList: any[] = Object.entries(data).filter(([key, value]) =>{
        const newVal:any = value;
        return((locationFilter!='-1') ?((key.toLocaleLowerCase().replaceAll(" ", '-') == team)&& newVal.location == locationFilter): (key.toLocaleLowerCase().replaceAll(" ", '-') == team))
      });
      const teamName= newList[0][0];
      const details = newList[0][1];
      const newState:any = {[teamName]:details};
      setFilteredList(newState);
    }else{
      if(locationFilter != '-1' && data){
        const newList: any[] = Object.entries(data).filter(([key, value]) =>{
          const newVal:any = value;
          return(newVal.filter((item:any)=>item.location == locationFilter))
        });
        setFilteredList(newList)
      }else{
        setFilteredList(data);
      }

    }
  };

  useEffect(() => {

    dispatch({type:ALL_POSITIONS,payload:data});
    if(team =='all-teams'){
      setFilteredList(data);
    }else if(data){
      handleFilterChange();
    }
  }, [data]);

  useEffect(() => {
    handleFilterChange();
  }, [team]);

  return (
    <div className="career-openings-container">
      <div className="body-container">

        <div className="page-body">
          <div className="page-body-left">
            <div className="careers-filters-container d-flex flex-col" style={{ height:'80vh' }}>
              <div className="schema-search-container pb-5 pr-5">
                <div className='searcharea'>
                  <div className="hevo-search hevo-icon mr-2" />
                  <input
                    type="text"
                    className="search-box"
                    placeholder='Search Job'
                    name="search"
                  />

                  <IconButton edge="end" className="clear-search">
                    <div className="hevo-icon hevo-close" />
                  </IconButton>
                </div>
              </div>
              <div>

                <JobLocationFilter locationChnage={setLocationFilter} />

                <hr />

              </div>
              <TeamOpeningFilter teams={data} />
            </div>
          </div>

          <div className="page-body-right p-5  overflow-auto" style={{ height:'90vh'}}>
            {filteredList && Object.entries(filteredList).map(([key,value])=>
              <PositionCard department={key} position={value} />
              )}
           </div>
        </div>

      </div>
    </div>

  );
}

export default AllPositions;
