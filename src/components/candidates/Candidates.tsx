import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import CandidatesTable from './CandidatesTable';
import useApiHook from '../core/UseApiHook';

function Candidates() {
  const {data,getApi} = useApiHook();

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getApi('/api/v1.0/referrals');
  }, []);

  useEffect(() => {
    setCandidates(data)
  }, [data]);

  return (
    <div className='body-container  h-100 w-100'>
      <div className='box d-flex h-100'>
      <Filters/>
        {candidates && <CandidatesTable candidates={candidates}/>}
      </div>
    </div>
  );
}

export default Candidates;
