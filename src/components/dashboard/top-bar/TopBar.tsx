import React from 'react';
import './TopBar.scss';
import UserDetailsMenu from './user-details-menu/UserDetailsMenu';

function TopBar() {

  return (
    <div className="top-bar">
      <div className="h-100 ml-auto">
        <UserDetailsMenu />
      </div>
    </div>
  );
}

export default TopBar;
