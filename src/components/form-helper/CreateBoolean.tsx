import React, { useState } from 'react';
import HdTextField from '../input/TextField';

function CreateBoolean({createField, cancel }:any) {
  const [description, setDescription] = useState('');

  const addField = () =>{
    createField({description});
  };

  const discard = () =>{
    cancel()
  };

  return (
    <>
      <HdTextField label='description  (optional)' onChange={(e)=>setDescription(e.target.value)}/>
      <div className='w-100 d-flex justify-end mt-5'>
        <button className='btn btn-secondary mr-5' onClick={discard}>cancle</button>
        <button className='btn btn-primary' onClick={addField}>Add</button>
      </div>
    </>  );
}

export default CreateBoolean;
