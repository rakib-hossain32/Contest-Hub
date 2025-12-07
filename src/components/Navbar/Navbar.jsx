// AnimatedNavbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router"; // React Router use korle
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../Loader/Loader";
import NavItem from "./NavItem";
import logo from '../../assets/logo2.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [profileOpen, setProfileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { user, loading, logOutUser } = useAuth();

  // console.log(u);\

  const handleLogout = () => {
    // console.log("first");
    logOutUser()
      .then(() => setShowDropdown(false))
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <nav className="sticky z-30 px-2 mx-auto rounded-lg shadow top-2 md:px-6 lg:px-8 backdrop-blur-2xl backdrop-saturate-200 bg-base-100/80 max-w-7xl">
      <div className="relative flex items-center justify-between h-16">
        {/* Mobile Menu Button */}
        <div className="flex items-center ">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-neutral hover:bg-primary hover:text-base-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center justify-center flex-1 md:justify-start">
            <NavLink to="/" className="">
              {/* <span className="text-xl font-bold text-primary">ContestHub</span> */}
              <img className="" width={130} src={logo} alt="" />
            </NavLink>
          </div>
        </div>

        {/* Logo */}
        <div className="">
          {/* Desktop Menu */}
          <div className="hidden space-x-1 font-medium md:flex text-neutral">
            {/* <NavLink
              className="px-4 py-2 transition rounded-md hover:bg-base-200"
              
            >
              Home
            </NavLink> */}
            <NavItem to="/" label="Home" />
            <NavItem to="/all-contests" label="All Contests" />
            <NavItem to="/events" label="Events" />
            <NavItem to="/success-stories" label="Success Stories" />

            {/* <NavLink
              className="px-4 py-2 transition rounded-md hover:bg-base-200"
              to="/services"
            >
              Services
            </NavLink>
            <NavLink
              className="px-4 py-2 transition rounded-md hover:bg-base-200"
              to="/blogs"
            >
              Blogs
            </NavLink>
            <NavLink
              className="px-4 py-2 transition rounded-md hover:bg-base-200"
              to="/portfolios"
            >
              Portfolio
            </NavLink>
            <NavLink
              className="px-4 py-2 transition rounded-md hover:bg-base-200"
              to="/live-work"
            >
              Live Work
            </NavLink> */}
          </div>
        </div>
        <div className="">
          {/* User Profile */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-base-100"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      referrerPolicy="no-referrer"
                      className="object-cover w-10 h-10 border-2 rounded-full shadow-md border-primary-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/100x100/3b82f6/ffffff?text=U";
                      }}
                    />
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Glass Dropdown */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-xl border backdrop-blur-md overflow-hidden bg-base-100  border-gray-200
                        `}
                      >
                        {/* Top Section */}
                        <div
                          className={`p-4 border-b 
                            
                              "border-white/10 text-white"
                            "border-gray-200 text-gray-800"
                          `}
                        >
                          <p className="text-sm font-semibold">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs truncate opacity-70">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Links */}
                        <div className="p-2">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => {
                              navigate("/dashboard");
                              setShowDropdown(false);
                            }}
                            className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10 cursor-pointer    
                            `}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => {
                              navigate("/");
                              setShowDropdown(false);
                            }}
                            className={`flex items-center w-full gap-2 px-3 py-2 text-sm transition rounded-lg hover:bg-rose-500/10   
                            `}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={handleLogout}
                            className="flex items-center w-full gap-2 px-3 py-2 mt-2 text-sm font-medium text-white rounded-lg cursor-pointer bg-linear-to-br from-rose-500 to-rose-700 hover:opacity-90"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              // <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
              //   <button
              //     onClick={() => setProfileOpen(!profileOpen)}
              //     className="relative p-1 rounded-full bg-accent text-base-100 hover:text-base-100 focus:outline-none focus:ring-2 focus:ring-base-100 focus:ring-offset-2 focus:ring-offset-base-100"
              //   >
              //     <span className="sr-only">Open profile menu</span>
              //     <img
              //       className="w-10 h-10 rounded-full"
              //       src={user.photoURL || "/default-avatar.png"}
              //       alt="User"
              //     />
              //   </button>

              //   <AnimatePresence>
              //     {profileOpen && (
              //       <motion.div
              //         initial={{ opacity: 0, y: -10 }}
              //         animate={{ opacity: 1, y: 0 }}
              //         exit={{ opacity: 0, y: -10 }}
              //         transition={{ duration: 0.3 }}
              //         className="absolute right-0 w-48 py-2 mt-12 rounded-md shadow-lg bg-base-100"
              //       >
              //         <p className="px-4 py-2 font-semibold text-neutral">
              //           {user.name}
              //         </p>
              //         <NavLink
              //           to="/dashboard"
              //           className="block px-4 py-2 hover:bg-base-200"
              //         >
              //           Dashboard
              //         </NavLink>
              //         <button className="w-full px-4 py-2 text-left hover:bg-base-200">
              //           Logout
              //         </button>
              //       </motion.div>
              //     )}
              //   </AnimatePresence>
              // </div>
              <div className="hidden gap-2 md:flex">
                <NavLink
                  to="/auth/login"
                  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium duration-500 rounded-md cursor-pointer group bg-neutral text-base-100"
                >
                  <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                    Login
                  </div>
                  <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </NavLink>
                <NavLink to="/auth/register">
                  <button className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium duration-500 rounded-md cursor-pointer btn btn-outline btn-primary group ">
                    <div className="translate-x-0 transition group-hover:-translate-x-[150%]">
                      Register
                    </div>
                    <div className="absolute translate-x-[150%] transition group-hover:translate-x-0">
                      Register
                    </div>
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-5 space-y-2 overflow-hidden rounded-md md:hidden"
          >
            <NavItem className="block" to="/" label="Home" />
            <NavItem
              className="block"
              to="/all-contests"
              label="All Contests"
            />
            {/* <NavLink className="block px-4 py-3 hover:bg-base-200" to="/">
              Home
            </NavLink>
            <NavLink
              className="block px-4 py-3 hover:bg-base-200"
              to="/services"
            >
              Services
            </NavLink>
            <NavLink className="block px-4 py-3 hover:bg-base-200" to="/blogs">
              Blogs
            </NavLink>
            <NavLink
              className="block px-4 py-3 hover:bg-base-200"
              to="/portfolios"
            >
              Portfolio
            </NavLink>
            <NavLink
              className="block px-4 py-3 hover:bg-base-200 rounded-2xl"
              to="/live-work"
            >
              Live Work
            </NavLink> */}
            {!user ? (
              <div className="space-y-3">
                {/* Login Button */}
                <NavLink
                  to="/auth/login"
                  className="relative inline-flex items-center justify-center w-full px-6 py-2 overflow-hidden font-medium duration-500 rounded-md cursor-pointer group bg-neutral text-base-100"
                >
                  <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                    Login
                  </div>
                  <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </NavLink>

                {/* Register Button */}
                <NavLink to="/auth/register">
                  <button className="relative inline-flex items-center justify-center w-full px-6 py-2 overflow-hidden font-medium duration-500 rounded-md cursor-pointer btn btn-outline btn-primary group">
                    <div className="translate-x-0 transition group-hover:-translate-x-[650%]">
                      Register
                    </div>
                    <div className="absolute translate-x-[650%] transition group-hover:translate-x-0">
                      Register
                    </div>
                  </button>
                </NavLink>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
