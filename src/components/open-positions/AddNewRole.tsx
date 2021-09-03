import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import HdMenu, { useMenuState } from '../menu/Menu';
import HdTextField from '../input/TextField';
import HdAutocomplete from '../input/Autocomplete';
import AutoFieldInput, { DataType } from '../input/AutoFieldInput';
import FormCreater from '../form-helper/FormCreater';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/RootReducer';
import { UserDetailsI } from '../../redux/actions/Authorization';
import useApiHook from '../core/UseApiHook';
import { SAVE_FORM_DATA } from '../../redux/constants/FormConstant';

enum Constraints {
  "L"='L',
  'G'='G',
  'E'='E',
  'NE'='NE',
  T='true',
  F='false'
}

function AddNewRole() {
  const [dataToSend, setDataToSend] = useState<any>({});
  const { anchorEl, handleClick, handleClose } = useMenuState();
  const [confirm, setConfirm] = useState(false);
  const [ValidForm, setValidForm] = useState(true);
  const dispatch =useDispatch();
  const { user, isAdmin } = useSelector((state: AppState) => state.auth);
  const { data } = useSelector((state: AppState) => state.form);
  console.log(data);
  const userDetails: UserDetailsI = JSON.parse(user);
  const {postApi} = useApiHook();

  const {data:newData,putApi} =useApiHook();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>([]);
  const [fieldName, setFieldName] = useState('');
  const [fieldDetails, setFieldDetails] = useState<any | null>(null);
  const [fieldType, setFieldType] = useState('');

  const history = useHistory();

  const elements = [
    {name:'TextField',dataType:DataType.STRING},
    {name:'Integer TextField',dataType:DataType.INT},
    {name:'Boolean',dataType:DataType.BOOLEAN},
    {name:'Drop down',dataType:DataType.LIST},
    {name:'File',dataType:DataType.FILE},
    ];

  //
  // useEffect(() => {
  //   newData && dispatch({type:SAVE_FORM_DATA,payload:formData})
  // }, [newData]);

  const addNewPosition = () =>{
    history.push(`/dashboard/open-positions`)
  };

  const
    handleFieldCreation = () =>{
    setFormData((prev:any[])=>([...prev, {name:fieldName, dataType:fieldType, ...fieldDetails}]));
    setFieldName('');
    setFieldDetails(null);
    setFieldType('');
  };

  useEffect(() => {

    let defaultFormData = [
      {
      "name": "Name",
      "dataType": "String",
        "constraint":"NE" ,
        "constraintValue":'',
    },
      {
        "name": "Email",
        "dataType": "String",
        "constraint":"NE" ,
        "constraintValue":'',
      },
      {
        "name": "Previous Company",
        "dataType": "String",
        "constraint":"NE" ,
        "constraintValue":'',
      },
      {
        "name": "resume",
        "dataType": "File",
      },
      {
        "name": "Notice period",
        "dataType": "Long",
        "constraint": "L",
        "constraintValue":'60',
        'description':'should be less than 60'
      },
    ];


    const newData = JSON.parse(data.requirements);
    newData.forEach((item:any)=>{
      if(item.dataType === DataType.BOOLEAN) item.value=false;
      if(item.dataType === DataType.STRING) item.value='';
      if(item.dataType === DataType.LIST) item.value=[];
    });
    setFormData([
      ...defaultFormData,
      ...newData
    ]);

  }, [data]);

  useEffect(() => {
    console.log(formData);
    console.log(dataToSend);
  }, [formData, dataToSend]);

  useEffect(() => {
    fieldDetails && handleFieldCreation();
  }, [fieldDetails]);

  const handleCreateForm = () =>{
    setConfirm(true);
    const newSet:any=[];
    formData.map((item:any,index:number)=>{
      const constrain:'T'|'L'|'E'|'NE'|'F' = item.constraint;
        switch (item.dataType) {

          case DataType.BOOLEAN:
            if(item.value.toString() == Constraints[constrain]){
              newSet.push({...item, error:false})
              setValidForm(true);
              return null;
            }else{
              setValidForm(false);
              newSet.push({...item,error:true, message:`${item.name} should be ${Constraints[constrain]}`})
            }
            return null;

          case DataType.LIST:
            if(item.value == Constraints[constrain]){
              newSet.push(item);
              setValidForm(false);
              return null;
            }else{
              newSet.push({...item,error:true})
            }
            return null;

          case DataType.STRING:
            if(item.value != ''){
              newSet.push({...item, error:false});
              setValidForm(false);
              return null;
            }else{
              newSet.push({...item,error:true})
            }
            return null;

          case DataType.INT:
            if(item.constraint == Constraints.G){
              if(item.value > parseInt(item.constraintValue)){
                setValidForm(true);
                newSet.push(item);
              }else{
                setValidForm(false);
                newSet.push({...item,error:true,message:`${item.name} must be Greater than ${item.constraintValue}`})
              }
              return null;
            }else if(item.constraint == Constraints.L){
              if(item.value < parseInt(item.constraintValue)) {
                setValidForm(true);
                newSet.push({...item,error:false,message:``});
              }else{
                setValidForm(false);
                newSet.push({...item,error:true,message:`${item.name} must be smaller than ${item.constraintValue}`})
              }
              return null;
            }
            return null;

          default: {
            setValidForm(true);
            newSet.push(item);
            return null;
            }
        }
    });
    setFormData(newSet);

  };

  const addReferral = ()=>{
    handleCreateForm();
    postApi('/api/v1.0/referrals',{
      ...dataToSend,
      user_id:userDetails.user_id,
      user_name:userDetails.name,
      position_id:data.position_id,
      position_name:data.name,
    })
  };

  return (
    <div className="body-container h-100 overflow-auto">
      <NavLink to={`/dashboard/open-positions`}>
        <button className='btn btn-primary  hevo-icon hevo-left-arrow'/>
      </NavLink>

      {!isAdmin ?
        <div className='box mt-5'>
          <div className='box__header box__title'>
            Create Rule for {data.name}
          </div>

          <div className="configurablefields-wrapper mt-5 ml-5 border-radius-md"
               style={{ width: '400px' }}>
            {formData
              .map((config: any, index: number) => (
                <div className='d-flex align-items-center error'>
                  <AutoFieldInput
                    key={index}
                    withDescription={true}
                    data={config}
                    updateSetting={(newValue) => {
                      const newList = formData.filter((item: any) => (item.name != config.name));
                      newList.splice(index,0,newValue);
                      // debugger;
                      if(newValue.name == 'Name'){
                        setDataToSend((prev:any)=>({...prev,candidate_name:newValue.value}))
                      }
                      if(newValue.name == 'Email'){
                        setDataToSend((prev:any)=>({...prev,candidate_email:newValue.value}))
                      }
                      if(newValue.name == 'resume'){
                        setDataToSend((prev:any)=>({...prev,resume:newValue.value}))
                      }
                      if(newValue.name == 'Previous Company'){
                        setDataToSend((prev:any)=>({...prev,previous_company:newValue.value}))
                      }
                      setFormData(newList);
                    }}
                  />
                </div>
              ))}
            {<div className='w-100 d-flex my-5'>
              <button className='btn btn-secondary mr-5'
                      onClick={addNewPosition}>cancle
              </button>
              <button className='btn btn-primary' onClick={()=>
                {confirm? (addReferral()) : handleCreateForm() }
              }
                      disabled={formData.length <= 0}>
                {confirm? (!ValidForm ? 'Submit Referral Anyway':'Submit Referral') : 'Submit Referral' }
              </button>
            </div>}
          </div>

        </div> :
        <div className='box mt-5'>
          <div className='box__header box__title'>
            Create Rule for {data.name}
          </div>

          <div className="configurablefields-wrapper mt-5 ml-5 border-radius-md" style={{ width: '400px' }}>
            {formData
              .map((config: any, index: number) => (
                <div className='d-flex align-items-center error'>
                  <AutoFieldInput
                    key={index}
                    withDescription={true}
                    data={config}
                    updateSetting={(newValue) => {
                      const newList = formData.filter((item: any) => (item.name != config.name));
                      newList.splice(index,0,newValue);
                      setFormData(newList);
                    }}
                  />
                  <div
                    className='btn-flat hevo-icon hevo-delete icon-size-3 text-error p-2 m-3'
                    onClick={() => {
                      const newList = formData.filter((item: any) => item.name != config.name);
                      setFormData(newList);
                    }} />
                </div>
              ))}
          </div>

          <div className='box__body' style={{ width: '50%' }}>
            <div>
              <button className='btn-flat hevo-icon hevo-plus icon-size-4' onClick={handleClick} />
              <HdMenu
                className='MenuContainer'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                  handleClose();
                  setFieldName('');
                  setFieldDetails(null);
                }}
              >
                <div className='body-container'>
                  <div className='d-flex align-items-center'>
                    <HdTextField
                      fullWidth label='Field Name'
                       onChange={(e: any) => {
                       console.log(e.target.value);
                       setFieldName(e.target.value);
                     }} />

                    <div className='m-5'
                         style={{ fontSize: '20px', top: '-10px' }}>is
                    </div>
                    <HdAutocomplete
                      fullWidth
                      onChange={(e, selectedOption) => {
                        setFieldType(selectedOption.dataType)
                      }}
                      options={elements}
                      renderInput={(params) => (
                        <HdTextField {...params} label="Type" />
                      )}
                      getOptionLabel={(opt) => opt.name}
                      renderOption={(option) => <span
                        className='text-secondary'>{option.name}</span>}
                    />
                  </div>

                  {fieldType && fieldName && <FormCreater
                    fieldType={fieldType}
                    createField={(e: any) => {
                      console.log(e);
                      handleClose();
                      setFieldDetails(e)
                    }
                    }
                    cancel={() => {
                      handleClose();
                      setFieldType('');
                      setFieldName('');
                      setFieldDetails(null);
                    }}
                  />}
                </div>
              </HdMenu>
            </div>
          </div>

          {<div className='w-100 d-flex m-5'>
            <button className='btn btn-secondary mr-5' onClick={addNewPosition}>
Cancel            </button>

            <button className='btn btn-primary' onClick={()=>{console.log(formData);
            putApi(`/api/v1.0/referrals/position?position_id=${data.position_id}`,{requirements:formData})
            }} disabled={formData.length <= 0}>
              Create
            </button>
          </div>}
        </div>
      }
    </div>
  );
}

export default AddNewRole;
