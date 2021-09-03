import React from 'react';
import { NavLink } from 'react-router-dom';

function OpenPositionFilter({title, to}:any) {
  return (
    <li>
      <NavLink activeClassName="active hevo-icon hevo-right-arrow" to={to} >
        {title}
      </NavLink>
    </li>

  );
}

export default OpenPositionFilter;
