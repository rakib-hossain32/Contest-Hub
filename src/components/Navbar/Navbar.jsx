import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
  LogIn,
  Crown,
  Sparkles,
  Calendar,
  Trophy,
  Home,
  Zap,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router"; // Ensure react-router-dom is installed
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../Loader/Loader";
import NavItem from "./NavItem";
import logo from "../../assets/logo2.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  
  const { user, loading, logOutUser } = useAuth();

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logOutUser()
      .then(() => setShowDropdown(false))
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (loading) {
    return <Loader />;
  }

 
  const navTextColor = scrolled
    ? "text-neutral hover:text-primary"
    : "text-white/90 hover:text-white";
  const glassButtonStyle = scrolled
    ? "text-neutral border-neutral/20 hover:border-primary hover:text-primary hover:bg-primary/5"
    : "text-white border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-500 ease-in-out ${
        scrolled
          ? "w-[95%] max-w-7xl top-4 rounded-2xl bg-base-100/90 shadow-xl border border-base-200/50 backdrop-blur-xl"
          : "w-full max-w-7xl top-0 bg-transparent border-b border-white/5"
      }`}
    >
      <div className="relative flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`inline-flex items-center justify-center p-2 rounded-full transition-colors md:hidden ${
              scrolled
                ? "text-neutral hover:bg-base-200"
                : "text-white hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <NavLink to="/" className="flex items-center gap-2">
            <img
              className="transition-transform w-28 md:w-32 hover:scale-105"
              src={logo}
              alt="ContestHub"
            />
          </NavLink>
        </div>

        <div
          className={`hidden md:flex items-center justify-center space-x-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-base-200/50 backdrop-blur-md"
              : "bg-white/5 border border-white/10 backdrop-blur-sm"
          }`}
        >
          <NavItem to="/" label="Home" className={navTextColor} />
          <NavItem
            to="/all-contests"
            label="All Contests"
            className={navTextColor}
          />
          <NavItem to="/events" label="Events" className={navTextColor} />
          <NavItem
            to="/success-stories"
            label="Stories"
            className={navTextColor}
          />
          <NavItem
            to="/leader-board"
            label="Leaderboard"
            className={navTextColor}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className={`${scrolled ? "text-neutral" : "text-white"}`}>
            <ThemeToggle />
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 p-1 pr-2 rounded-full border transition-all ${
                  scrolled
                    ? "border-transparent hover:bg-base-200"
                    : "border-transparent hover:bg-white/10"
                }`}
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                  className="object-cover border-2 rounded-full shadow-sm w-9 h-9 border-primary"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/100x100/3b82f6/ffffff?text=U";
                  }}
                />
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  } ${scrolled ? "text-neutral" : "text-white"}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 overflow-hidden origin-top-right border shadow-2xl w-60 rounded-2xl border-base-200 bg-base-100/95 backdrop-blur-md ring-1 ring-black/5"
                  >
                    <div className="p-4 border-b bg-base-200/50 border-base-200">
                      <p className="text-sm font-bold truncate text-neutral">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-neutral/70 truncate font-mono mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 space-y-1">
                      <DropdownLink
                        to="/dashboard"
                        icon={<LayoutDashboard size={16} />}
                        label="Dashboard"
                        onClick={() => setShowDropdown(false)}
                      />
                      <DropdownLink
                        to="/profile"
                        icon={<User size={16} />}
                        label="Profile"
                        onClick={() => setShowDropdown(false)}
                      />
                      <DropdownLink
                        to="/settings"
                        icon={<Settings size={16} />}
                        label="Settings"
                        onClick={() => setShowDropdown(false)}
                      />
                    </div>

                    <div className="p-2 border-t border-base-200">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg text-error hover:bg-error/10"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // --- Guest User (Login/Register) ---
            <div className="items-center hidden gap-3 md:flex">
              <NavLink to="/auth/login">
                <button
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${glassButtonStyle}`}
                >
                  Log In
                </button>
              </NavLink>

              <NavLink to="/auth/register">
                <button className="relative px-6 py-2.5 text-sm font-bold text-white rounded-full overflow-hidden group shadow-lg shadow-primary/30 transition-transform active:scale-95 cursor-pointer">
                  <div className="absolute inset-0 transition-all duration-300 bg-linear-to-r from-primary to-secondary group-hover:scale-110"></div>
                  <span className="relative flex items-center gap-2">
                    Join Now <LogIn size={16} />
                  </span>
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* --- PREMIUM MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 z-40 mx-2 mt-2 overflow-hidden border-t shadow-2xl md:hidden bg-base-100/95 backdrop-blur-xl border-base-200 rounded-b-3xl top-16"
          >
            <div className="flex flex-col gap-2 p-6">
              <MobileNavItem
                to="/"
                icon={<Home size={20} />}
                label="Home"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavItem
                to="/all-contests"
                icon={<Trophy size={20} />}
                label="All Contests"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavItem
                to="/events"
                icon={<Calendar size={20} />}
                label="Events"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavItem
                to="/success-stories"
                icon={<Sparkles size={20} />}
                label="Stories"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavItem
                to="/leader-board"
                icon={<Crown size={20} />}
                label="Leaderboard"
                onClick={() => setMobileOpen(false)}
              />

              {!user && (
                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-base-200">
                  <NavLink
                    to="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center py-3.5 text-sm font-bold text-neutral bg-base-200/80 hover:bg-base-300 rounded-2xl transition-all"
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-linear-to-r from-primary to-secondary rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
                  >
                    Join Now <Zap size={16} fill="currentColor" />
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// --- Helper Component for Dropdown ---
const DropdownLink = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all rounded-lg text-neutral/80 hover:bg-base-200 hover:text-primary"
  >
    {icon} {label}
  </NavLink>
);

// --- Premium Mobile Nav Item ---
const MobileNavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
        isActive 
        ? "bg-primary/10 text-primary font-bold shadow-sm" 
        : "text-neutral/70 hover:bg-base-200 hover:text-neutral"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span className={`p-2 rounded-full ${isActive ? 'bg-primary text-white' : 'bg-base-200 text-neutral/60'}`}>
          {icon}
        </span>
        <span className="text-base">{label}</span>
        {isActive && <ChevronDown className="ml-auto -rotate-90 text-primary" size={16} />}
      </>
    )}
  </NavLink>
)