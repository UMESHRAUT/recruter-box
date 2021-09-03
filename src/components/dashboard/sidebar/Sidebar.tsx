import React from 'react';
import hevoAlfredWhiteLogo from '../../../assets/images/brand-image.png';
import SidebarItem from './SidebarItem';

function Sidebar() {

  return (
    <div className="sidebar">
      <ul className="tab-nav tab-nav-wrapper tab-nav-vertical text-transform-none expanded appbar">
        <span className="brand-name">
          <div className="inline-items">
            <img
              className="appbar__brand-image m-1"
              alt="Hevo Alfred"
              src={hevoAlfredWhiteLogo}
            />
          </div>
        </span>

        <SidebarItem
          icon="hevo-plan"
          title="Open Positions"
          path="open-positions"
        />

        <SidebarItem
          icon="hevo-add-user"
          title="candidates"
          path="candidates"
        />

      </ul>
    </div>
  );
}

export default Sidebar;
