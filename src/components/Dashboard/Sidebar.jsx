import {
  Trophy,
  ListOrdered,
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Users,
  Menu,
  Search,
  Bell,
  Mail,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  Calendar as CalendarIcon,
  DollarSign,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import useRole from "../../hooks/useRole";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { role } = useRole();
  console.log(role);

  const menuItems =
    role === "user"
      ? [
          {
            name: "My Participated Contests",
            icon: ListOrdered,
            path: "/dashboard/participated",
          },
          {
            name: "My Winning Contests",
            icon: Trophy,
            path: "/dashboard/winning",
          },
          {
            name: "My Profile",
            icon: User,
            path: "/dashboard/profile",
          },
        ]
      : role === "creator"
      ? [
          {
            name: "Creator Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
          },
          {
            name: "Add Contest",
            icon: PlusCircle,
            path: "/dashboard/add-contest",
          },
          {
            name: "My Created Contests",
            icon: ListOrdered,
            path: "/dashboard/my-contests",
          },
        ]
      : [
          { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
          { name: "Manage Users", icon: Users, path: "/dashboard/users" },
          {
            name: "Manage Contests",
            icon: Trophy,
            path: "/dashboard/contests",
          },
        ];

  const isActive = (path) => {
    // Exact match for root dashboard, startsWith for sub-routes
    if (path === "/dashboard" && location.pathname === "/dashboard")
      return true;
    if (path !== "/dashboard" && location.pathname.startsWith(path))
      return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          z-50 bg-white shadow-xl transition-all duration-300 shrink-0
          fixed inset-y-0 left-0 w-[260px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:block lg:h-screen lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-100
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-8">
            <Link to="/" className="flex items-center gap-2 outline-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00b074] text-xl font-bold text-white shadow-md shadow-green-200">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Contest Hub
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="transition-colors lg:hidden text-slate-500 hover:text-red-500"
            >
              <LogOut className="w-5 h-5 rotate-180" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-4 pb-6 space-y-1">
            {menuItems?.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={`flex w-full items-center rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 group relative overflow-hidden ${
                    active
                      ? "bg-[#e5f8f0] text-[#00b074]"
                      : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#00b074] rounded-r-full" />
                  )}

                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      active
                        ? "text-[#00b074]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-red-600 transition-colors border border-red-100 rounded-xl bg-red-50 hover:bg-red-100 hover:text-red-700">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
