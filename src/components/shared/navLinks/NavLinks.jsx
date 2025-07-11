import React from "react";
import { NavLink } from "react-router";

const NavLinks = ({ path, name }) => {
  return (
    <div>
      <li>
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive ? "text-accent text-lg font-semibold underline" : "text-textSecondary"
          }>
          {name}
        </NavLink>
      </li>
    </div>
  );
};

export default NavLinks;
