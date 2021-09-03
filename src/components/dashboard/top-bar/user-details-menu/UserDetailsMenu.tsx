import { Avatar } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import profile_image_default from '../../../../assets/images/profile-image-default.svg';
import { AppState } from '../../../../redux/reducers/RootReducer';
import HdMenu, { useMenuState } from '../../../menu/Menu';
import HdMenuItem from '../../../menu/MenuItem';
import ToolTip from '../../../tooltip/Tooltip';
import { logOut, UserDetailsI } from '../../../../redux/actions/Authorization';

export default function UserDetailsMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);
  const userDetails: UserDetailsI = JSON.parse(user);

  const { anchorEl, handleClick, handleClose } = useMenuState();

  return (
    <>
      <button
        type="button"
        className="top-bar__user-details"
        onClick={handleClick}
      >
        <div className="top-bar__user-avatar-container">
          <Avatar src={profile_image_default} />
        </div>

        <div className="top-bar__user-name-email-wrapper">
          <div className="center-flex-row">
            <div className="top-bar__user-name">
              <ToolTip>{userDetails.name}</ToolTip>
            </div>

            <span className="hevo-dropdown-arrow hevo-icon icon-size-1 ml-1" />
          </div>

          <div className="top-bar__user-email">
            <ToolTip>{userDetails.email}</ToolTip>
          </div>
        </div>
      </button>

      <HdMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*<NavLink to="/dashboard/alfred-members">*/}
        {/*  <HdMenuItem*/}
        {/*    onClick={(e) => {*/}
        {/*      handleClose();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <span className="menu-icon hevo-icon hevo-team" />*/}
        {/*    Team*/}
        {/*  </HdMenuItem>*/}
        {/*</NavLink>*/}

        <NavLink to="/login">
          <HdMenuItem
            className="error has-separator"
            onClick={(e) => {
              handleClose();
              dispatch(logOut());
            }}
          >
            <span className="menu-icon hevo-icon hevo-logout" />
            Log out
          </HdMenuItem>
        </NavLink>
      </HdMenu>
    </>
  );
}
