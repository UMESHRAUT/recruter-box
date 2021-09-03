import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import profile_image_default
  from '../../assets/images/profile-image-default.svg';
import ToolTip from '../tooltip/Tooltip';
import { calendarFormat } from '../core/utils/date';
import Status from './Status';
import HdSelectInput from '../input/SelectInput';
import useApiHook from '../core/UseApiHook';
import { RequestAuthType } from '../core/request';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/RootReducer';
import Popup from '../popup/Popup';
import { dismissToaster, notify, SUCCESS } from '../toaster/Toaster';

const USER_STAGE_LIST = ['REFERRED','SHORTLISTED','IN_PROCESS','OFFERED','REJECTED','ACCEPTED','DECLINED','ONBOARDED'];
function CandidateDetails({candidateDetails}:any) {
  const { user, isAdmin } = useSelector((state: AppState) => state.auth);
  const [details, setDetails] = useState<any | null>(null);
  const [refferealState, setRefferealState] = useState();

  useEffect(() => {
    console.log(candidateDetails);
    candidateDetails && setRefferealState(candidateDetails.status);
    candidateDetails && setDetails(candidateDetails);
  }, [candidateDetails]);

  const {loading, putApi} = useApiHook(RequestAuthType.BASIC);
  const [open, setOpen] = useState(false);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if((refferealState != candidateDetails.status)){
      setChanged(true)
    }else{
      setChanged(false)
    }
  }, [refferealState]);

  const handleChangeStage = ()=>{
    setChanged(false);
    putApi(`/api/v1.0/referrals/update?referral_id=${candidateDetails.referral_id}&referral_status=${refferealState}`);
    notify({
      message:'Status updated',
      progress_bar: true,
      type:SUCCESS,
      closeInTime: 5000,
    });
    setTimeout(()=>{
      dismissToaster()
    },3000)
  }

  const handleCancel = ()=>{
    setDetails(candidateDetails);
    setRefferealState(candidateDetails.status);
    setChanged(false);
  };

  return (
    <div className='box w-100 p-5 mb-5 d-flex justify-between align-items-center'>
      <div className='d-flex align-items-center w-100' style={{width:'170%'}}>
      <div className="top-bar__user-avatar-container">
        <Avatar src={profile_image_default} />
      </div>

        <div className="top-bar__user-name-email-wrapper ml-2">
          <div className="center-flex-row">
            <div className="top-bar__user-name">
              <ToolTip>{candidateDetails?.candidate_name}</ToolTip>
            </div>
          </div>

          <div className="top-bar__user-email">
            <ToolTip>{candidateDetails?.candidate_email}</ToolTip>
          </div>
        </div>
    </div>

      <div className='w-100'>
          SDE 2
      </div>

      <div className='w-100'>
          ENGINEERING
      </div>

        {isAdmin ?
          <div className='d-flex align-items-center' style={{width:'200%'}}>
          <HdSelectInput
            size="small"
            style={{ width: 150 }}
            options={USER_STAGE_LIST}
            disableClearable
            getOptionLabel={(option: any) => option}
            value={refferealState}
            onChange={(event: any, newValue: any) =>setRefferealState(newValue)}
          />
            {changed && <div className='d-flex pl-2'>
            <div className='btn btn-primary hevo-icon hevo-checked-tick p-2 mr-2' onClick={handleChangeStage} />
            <div className='btn btn-error hevo-icon hevo-close p-2' onClick={handleCancel}/>
          </div>}
          </div>
          :
          <div className='d-flex' style={{width:'100%'}}>
          <div className='hd-key-label text-accent'>{candidateDetails.status}</div>
           {
            // <Popup
            //   title={<span className="text-medium text-capitalize"></span>}>
            //   <span className="hevo-icon hevo-info info-icon info-icon-sm mb-1" />
            // </Popup>
}
          </div>
        }
      <div className='w-100'>

        {new Date(candidateDetails?.updated_ts).toLocaleDateString()}
      </div>

      {
        isAdmin &&
        <div className='d-flex align-items-center w-100'>
          <div className="top-bar__user-avatar-container">
            <Avatar src={profile_image_default} />
          </div>

          <div className="top-bar__user-name-email-wrapper">
            <div className="center-flex-row">
              <div className="top-bar__user-name ml-2 text-medium">
                <ToolTip>{candidateDetails.user_name}</ToolTip>
              </div>
            </div>
          </div>
        </div>
      }

      <Status open={open} onClose={()=>setOpen(false)}/>

    </div>
  );
}

export default CandidateDetails;
