import React, { useEffect, useState } from 'react';
import HdTextField from '../input/TextField';
import IntegerTextField from '../input/IntegerTextField';
import HdAutocomplete from '../input/Autocomplete';
import HdSelectInput from '../input/SelectInput';

function CreateIntegerField({createField, cancel }:any) {
  const [constrain, setConstrain] = useState<any>({name:'Minimum',value:'G'});
  const [constraintValue, setConstraintValue] = useState(null);


  useEffect(() => {
    setConstrain({ name:'Minimum',value:'G' });
  }, []);

  const addField = ()=>{
    createField({
      constraint:constrain.value,
      constraintValue,
    })
  };

  return (
    <div className='d-flex flex-col'>
      <span className='text-secondary mb-3'>Credentials</span>
      <div className='d-flex'>
        <HdSelectInput
          style={{ width: 150 }}
          options={[{name:'Minimum',value:'G'},{name:'Maximum',value:'L'},{name:'Equal to',value:'E'},{name:'Not Equal',value:'NE'}]}
          disableClearable
          getOptionLabel={(option: any) => option.name}
          value={constrain}
          onChange={(event: any, newValue: any) =>
            // postApi('',{});
            setConstrain(newValue)
          }
          />

      <IntegerTextField  label={constrain.name} onChange={setConstraintValue} disabled={false} />
      </div>

      <div className='w-100 d-flex justify-end mt-5'>
        <button className='btn btn-secondary mr-5' onClick={cancel}>cancle</button>
        <button className='btn btn-primary' onClick={addField}>Add</button>
      </div>

    </div>
  );
}

export default CreateIntegerField;
