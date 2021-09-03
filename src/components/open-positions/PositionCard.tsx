import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/RootReducer';
import { UserDetailsI } from '../../redux/actions/Authorization';
import { SAVE_FORM_DATA } from '../../redux/constants/FormConstant';

function PositionCard({department, position}:any) {

  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state: AppState) => state.auth);
  const userDetails: UserDetailsI = JSON.parse(user);

  return (
  <>
    <div className='d-flex w-100 justify-between align-items-center mb-2'>
    <div className="openings-category-header d-flex  align-items-center">
   {department}
    </div>
      <div className='center-line' />
    </div>

    {position.map((positionDetail:any)=>{
      return <div className="opening-card-wrapper active"
                  data-department="oc-design" data-location="bengaluru">
        <div className="opening-card box">
          <h3 className="card-position text-dark-blue">{positionDetail.name}</h3>

          <div className="card-loc mt-1 mt-md-0">{positionDetail.location}</div>

          <NavLink to={`/dashboard/open-positions/add-new-role`} onClick={()=>dispatch({type:SAVE_FORM_DATA,payload:positionDetail})} className="btn btn-link btn-thumb mt-md-0 text-accent">
            {
              isAdmin?'Create Rule' : 'Refer here'
            }
            <span className="hevo-web-icon hevo-right ml-2"></span>
          </NavLink>

        </div>
      </div>
    })}



  </>
  );
}

export default PositionCard;
