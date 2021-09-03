import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import HdTextField from '../input/TextField';

function CreateTextField({createField, cancel }:any) {
  const [placeholder, setPlaceholder] = useState('');

  const addField = () =>{
    createField({placeholder});
  };

  const discard = () =>{
    cancel()
  };

  return (
    <div className='w-100'>
      <HdTextField label='Placeholder  (optional)' className='w-100' onChange={(e)=>setPlaceholder(e.target.value)}/>
      <div className='w-100 d-flex justify-end mt-5'>
        <button className='btn btn-secondary mr-5' onClick={discard}>cancle</button>
        <button className='btn btn-primary' onClick={addField}>Add</button>
      </div>
    </div>
  );
}

export default CreateTextField;
