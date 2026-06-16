import React from "react";
import { NavLink } from "react-router"; // react-router-dom ব্যবহার করা ভালো
import { motion } from "framer-motion";

const NavItem = ({ label, to, scrolled, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => {
        const baseClasses = "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group";
        if (scrolled) {
          return `${baseClasses} ${
            isActive
              ? "text-primary bg-primary/10" // Active state when scrolled
              : "text-neutral/70 hover:text-primary hover:bg-base-200/50" // Inactive state when scrolled
          }`;
        } else {
          return `${baseClasses} ${
            isActive
              ? "text-white bg-white/20" // Active state when transparent/hero background
              : "text-white/70 hover:text-white hover:bg-white/10" // Inactive state when transparent/hero background
          }`;
        }
      }}
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10">{label}</span>
          {/* Active Indicator Dot (Optional Premium Touch) */}
          {isActive && (
            <motion.span
              layoutId="nav-dot"
              className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                scrolled ? "bg-primary" : "bg-white"
              }`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
