import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Star,
  MessageCircle,
  Wallet,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Mail,
  ChevronRight,
  User,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";
import { HeaderIcon } from "./HeaderIcon";
import { DropdownItem } from "./DropdownItem";
export const Header = () => {
  return (
    <header className="z-40 bg-[#f7f6f9]/80 backdrop-blur-md sticky top-0 px-8 py-4 border-b border-gray-200/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-200 rounded-full shadow-sm px-4 py-2.5 transition-shadow focus-within:shadow-md focus-within:border-blue-300">
          <Search className="w-4 h-4 mr-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full text-sm bg-transparent outline-0 placeholder:text-gray-400 text-slate-700"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center justify-end gap-4 ml-auto sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Icons with badges */}
            <HeaderIcon icon={Mail} badge={21} color="blue" />
            <HeaderIcon icon={Bell} badge={4} color="indigo" />
            <HeaderIcon icon={LogOut} badge={3} color="red" />
          </div>

          <div className="hidden w-1 h-8 bg-gray-300 sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-3 p-1 pr-3 transition-all rounded-full cursor-pointer hover:bg-white hover:shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
                className="object-cover border-2 border-white rounded-full shadow-sm w-9 h-9"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold leading-tight text-slate-700">
                  John Doe
                </p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>

            {/* Dropdown Content */}
            <div className="absolute right-0 z-50 invisible w-56 mt-2 overflow-hidden transition-all duration-200 origin-top-right transform bg-white border border-gray-100 shadow-xl opacity-0 top-full rounded-xl group-hover:opacity-100 group-hover:visible">
              <div className="p-2 space-y-1">
                <DropdownItem icon={User} text="My Profile" />
                <DropdownItem icon={Settings} text="Settings" />
                <div className="h-1 bg-gray-100 my-1 mx-2"></div>
                <DropdownItem icon={LogOut} text="Logout" isDestructive />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
