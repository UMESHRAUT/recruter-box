import React from 'react';
import CreateIntegerField from './CreateIntegerField';
import CreateTextField from './CreateTextField';
import { DataType } from '../input/AutoFieldInput';
import CreateAutoComplete from './CreateAutocomplete';
import CreateBoolean from './CreateBoolean';
import FileInput from '../input/FileInput';
import CreateFileUpload from './CreateFileUpload';

interface FormCreaterI {
  fieldType:string,
  createField:(e:any)=>void,
  cancel:()=>void
}
function FormCreater({fieldType,createField, cancel}:FormCreaterI) {

  return (
    <div className='mt-5'>
      {fieldType === DataType.STRING && <CreateTextField  createField={createField} cancel={cancel} /> }

      {fieldType === DataType.INT && <CreateIntegerField createField={createField} cancel={cancel} /> }

      {fieldType === DataType.LIST && <CreateAutoComplete createField={createField} cancel={cancel} /> }

      {fieldType === DataType.BOOLEAN && <CreateBoolean createField={createField} cancel={cancel} /> }

      {fieldType === DataType.FILE && <CreateFileUpload createField={createField} cancel={cancel} /> }

    </div>
  );
}

export default FormCreater;
