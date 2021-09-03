import React, { useEffect, useState } from 'react';
import {storage} from '../../firebase/index';
import '../form-helper/FileUpload.scss';

function FileInput({onChange}:any) {
  const [placeholder, setPlaceholder] = useState('');
  const [files, setFile] = useState<any>(null);

  const uploadFile = () =>{
    let bucketName ='resumes';
    let file = files[0];
    let storageRef =storage.ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
      snapshot=>{},
      error=>{
        console.log(error);
      },
      ()=>{
storage.ref('resumes')
  .child(file.name)
  .getDownloadURL()
  .then(url=>{
    onChange(url);
  })
    })
  };

  useEffect(() => {
    files && uploadFile();
  }, [files]);


  const discard = () =>{
    setFile(null);
  };

  return (
    <div className='d-flex align-items-center w-100 mb-5'>
      <span className='pre-whitespace text-primary mr-5'>Upload Resume:</span>
      <input type='file' className='upload-file' onChange={(e:any)=>setFile(e.target.files)} />
    </div>
  );
}

export default FileInput;
