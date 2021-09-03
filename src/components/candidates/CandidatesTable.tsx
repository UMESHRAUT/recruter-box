import React from 'react';
import CandidateDetails from './CandidateDetails';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/RootReducer';

function CandidatesTable({candidates}:any) {
  const { user, isAdmin } = useSelector((state: AppState) => state.auth);

  return (
    <div className='flex-1 d-flex flex-col'>
    <div className='box__header '>
      <h3>Candidates</h3>
    </div>
      <div className='bg-surface-alternate d-flex flex-col overflow-hidden h-100'>
        <div className='d-flex justify-between p-5 position-sticky bg-surface-alternate mx-5' style={{top:0}}>
          <div className='d-flex w-100' style={{width:'170%'}}>
            <span>Name</span>
          </div>

          <div className='d-flex w-100'>
            <span>Position</span>
          </div>

          <div className='d-flex w-100'>
          <span>Department</span>
          </div>

          {isAdmin ?
            <div className='d-flex' style={{width:'200%'}}>
              <span>Status</span>
            </div>:
          <div className='d-flex w-100'>
            <span>Status</span>
          </div>
          }

          <div className='d-flex w-100'>
          <span>Last Updated</span>
          </div>

          {isAdmin &&
          <div className='d-flex w-100'>
            <span>Referred By</span>
          </div>
          }

        </div>
        <div className='px-5 flex-1 overflow-auto pt-1'>
          {candidates.map((candidateDetails:any)=><CandidateDetails candidateDetails={candidateDetails}/>)}
        </div>
      </div>
    </div>
  );
}

export default CandidatesTable;
