import React, { useEffect, useState } from 'react';
import IntegerTextField from '../input/IntegerTextField';
import HdTextField from '../input/TextField';

function CreateAutoComplete({createField, cancel }:any) {
  const [number, setNumber] = useState(2);
const optionsArray:string[]=[];
 const createAutocompletye = ()=>{
   createField({list:optionsArray})
 };

  return (
    <div>
      <div style={{width:'200px'}}>
        <IntegerTextField
        required={true}
        label="Number of Options"
        onChange={(e) => {
          console.log(e); setNumber(e)}}
        disabled={false}
        defaultValue={number} />
      </div>

      <div className='d-flex flex-col' style={{width:'200px'}}>
      {[...Array(number)].map((item, keys)=><HdTextField
        className='mt-5'
        label={`option ${keys +1}`}
        placeholder={`option ${keys +1}`}
        onChange={(e)=>optionsArray[keys]=e.target.value}
      />)}
      </div>

      <div className='w-100 d-flex justify-end mt-5'>
        <button className='btn btn-secondary mr-5' onClick={cancel}>cancle</button>
        <button className='btn btn-primary' onClick={createAutocompletye}>Add</button>
      </div>
    </div>
  );
}

export default CreateAutoComplete;
