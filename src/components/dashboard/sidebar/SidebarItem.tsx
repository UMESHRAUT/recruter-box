import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

type NavItem = {
  icon: string;
  title: string;
  path: string;
};

function SidebarItem({
  title,
  icon,
  path: goto,
}: NavItem) {

  return (
    <li>
      <NavLink
        /* eslint-disable no-nested-ternary */
        to={`/dashboard/${goto}`}
        className="tab-nav-link"
        activeClassName="active"
        about={title}
      >
        <div className={` tab-nav-link-icon hevo-icon  ${icon}`} />
      </NavLink>
    </li>
  );
}

export default SidebarItem;
