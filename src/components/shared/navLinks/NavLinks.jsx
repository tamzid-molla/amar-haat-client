import React from "react";
import { NavLink } from "react-router";

const NavLinks = ({ path, name,icon:Icon }) => {
  return (
    <div>
      <li>
        <NavLink
          to={path}
          className={({ isActive }) =>`
          ${Icon && 'flex items-center gap-1'}
          ${isActive ? "text-accent text-lg font-semibold underline" : "text-textSecondary"}`
          }>
          {Icon && <Icon></Icon>} {name}
        </NavLink>
      </li>
    </div>
  );
};

export default NavLinks;
