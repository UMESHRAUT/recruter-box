import React, { useEffect, useState } from 'react';
import HdTextField from './TextField';
import HdSwitch from './Switch';
import HdChipInput from './HdChipInput';
import IntegerTextField from './IntegerTextField';
import HdAutocomplete from './Autocomplete';
import FileInput from './FileInput';

export enum DataType {
  MULTISELECT_LIST='MULTISELECT_LIST',
  BOOLEAN = 'Boolean',
  STRING = 'String',
  INT = 'Long',
  SHORT = 'SHORT',
  LONG = 'LONG',
  DOUBLE = 'DOUBLE',
  LIST = 'LIST',
  CLASS = 'CLASS',
  PASSWORD = 'PASSWORD',
  FILE = 'File',
}

interface Props {
  withDescription: boolean;
  updateSetting: ({ name, value }: any) => void;
  data: any;
  key?: any;
  className?:string
  error?:boolean
}

export function AutoFieldInput(props: Props) {
  const [newSetting, setNewSetting] = useState<any>(props.data);


  useEffect(() => {
    setNewSetting(props.data);
  }, [props.data]);

  const handleChange = (value: any) => {
    setNewSetting((prev: any) => ({ ...prev, value }));
    props.updateSetting({ ...newSetting, name: newSetting.name, value });
  };

  switch (newSetting.dataType) {
    case DataType.STRING:
      return (
        <div  className='mb-5 w-100'>
        <HdTextField
          error={props.error ||newSetting.error}
          className={`${props.className} w-100`}
          key={props.key}
          label={newSetting.name}
          placeholder={newSetting.placeholder}
          name={newSetting.name}
          defaultValue={newSetting.value}
          onChange={(e:any) => handleChange(e.target.value)}
          helperText={newSetting.description || (newSetting.error && newSetting.message)}
        />
        </div>
      );

    case DataType.BOOLEAN:
      return (
        <div className="text-medium mb-5">
          {props.withDescription ? (
            <div className='text-primary text-medium'>
              <div className="text-medium">{newSetting.name}</div>

              <div className="text-secondary mt-1">
                {newSetting.description}
              </div>
            </div>
          ) : (
            <div className="">{newSetting?.value?.toString()}</div>
          )}
          <div className='mt-3'>
          <span className='mr-2'>False</span>
          <HdSwitch
            checked={newSetting?.value}
            onChange={() => handleChange(!newSetting?.value)}
          />
          <span className='ml-2'>True</span>

            {newSetting.error && <div className='text-error'>{newSetting.message}</div>}
          </div>
        </div>
      );

    case DataType.MULTISELECT_LIST:
      if (typeof newSetting?.value[0] !== 'string') return null; // checking if list contains only string
      // todo: find a way to show array of object as editable field

      return (
        <HdChipInput
          error={props.error}
          fullWidth
          className="mb-7"
          label={newSetting.name}
          helperText={newSetting.description}
          defaultValue={newSetting?.value}
          onChange={handleChange}
        />
      );

    case DataType.FILE:
      return (
        <FileInput
          error={props.error}
          fullWidth
          className="mb-7"
          label={newSetting.name}
          helperText={newSetting.description}
          defaultValue={newSetting?.value}
          onChange={(url:any)=>{handleChange(url)}}
        />
      );

    case DataType.LIST:
      // if (typeof newSetting?.value[0] !== 'string') return null; // checking if list contains only string
      // // todo: find a way to show array of object as editable field

      return (
        <HdAutocomplete
          fullWidth
          onChange={(e, selectedOption)=> {
            handleChange(selectedOption)}}
          options={newSetting.list}
          renderInput={(params) => (
            <HdTextField {...params} error={props.error} label={newSetting.name} helperText={newSetting.description} />
          )}
          getOptionLabel={(opt)=>opt}
          renderOption={(option) =><span className='text-secondary' >{option}</span>}
          className="mb-7"
          defaultValue={newSetting?.value}
        />
      );

    case DataType.INT:
    case DataType.SHORT:
    case DataType.LONG:
    case DataType.DOUBLE:
      return (
        <IntegerTextField
          error={newSetting.error}
          message={newSetting.message}
          className='mb-5'
          minimum={newSetting.minimum}
          maximum={newSetting.maximum}
          label={newSetting.name}
          defaultValue={newSetting?.value}
          disabled={false}
          onChange={handleChange}
          helperText={newSetting.description}
        />
      );

    default:
      return (
        <HdTextField
          error={props.error}
          className='mb-5'
          fullWidth
          label={newSetting.name}
          defaultValue={newSetting?.value}
          onChange={(e:any) => handleChange(e.target.value)}
          helperText={newSetting.description}
        />
      );
  }
}

export default AutoFieldInput;

AutoFieldInput.defaultProps = {
  key: '',
  error:false
};
