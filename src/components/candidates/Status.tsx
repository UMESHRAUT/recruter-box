import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Avatar } from '@material-ui/core';
import profile_image_default
  from '../../assets/images/profile-image-default.svg';
import ToolTip from '../tooltip/Tooltip';

interface StatusI {
  open:boolean,
  onClose:()=>void
}
function Status({open, onClose}:StatusI) {

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='dialog-body' style={{width:'280px', height:'70vh'}}>

        <div className='d-flex align-items-center border-bottom pb-2'>
          <div className="top-bar__user-avatar-container">
            <Avatar src={profile_image_default} />
          </div>

          <div className="top-bar__user-name-email-wrapper ml-2">
            <div className="center-flex-row ">
              <div className="top-bar__user-name text-medium">
                <ToolTip>User</ToolTip>
              </div>
            </div>

            <div className="top-bar__user-email text-secondary">
              <ToolTip>title</ToolTip>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default Status;
