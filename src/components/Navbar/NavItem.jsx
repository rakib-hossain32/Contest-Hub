import React from "react";
import { NavLink } from "react-router";

const NavItem = ({ label, to, className }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${className} px-4 py-2 transition rounded-md hover:bg-accent/20 ${
            isActive
              ? "decoration-accent underline-offset-6 underline rounded-md decoration-2"
              : ""
          }`
        }
      >
        <span>{label}</span>
      </NavLink>
    );
};

export default NavItem;
