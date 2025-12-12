import React from "react";
import { NavLink } from "react-router"; // react-router-dom ব্যবহার করা ভালো
import { motion } from "framer-motion";

const NavItem = ({ label, to, className, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${className} relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group ${
          isActive
            ? "text-primary bg-primary/10" // Active state
            : "text-neutral/70 hover:text-primary hover:bg-base-200/50" // Inactive state
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10">{label}</span>
          {/* Active Indicator Dot (Optional Premium Touch) */}
          {isActive && (
            <motion.span
              layoutId="nav-dot"
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
