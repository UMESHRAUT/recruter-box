import React, { useState } from 'react';
import {storage} from '../../firebase/index';
import '../form-helper/FileUpload.scss';

function CreateFileUpload({createField, cancel }:any) {

  return (
    <div className='d-flex align-items-center w-100 mb-5'>
      <div className='d-flex ml-5'>
        <button className='btn btn-secondary mr-5' onClick={cancel}>cancle</button>
        <button className='btn btn-primary' onClick={createField}>upload</button>
      </div>
    </div>
  );
}

export default CreateFileUpload;
