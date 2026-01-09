import {
  Trophy,
  ListOrdered,
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Users,
  MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import useRole from "../../hooks/useRole";
import logo from "../../../public/logo3.png";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { role } = useRole();
  const { logOutUser } = useAuth();

  const handleLoginOut = () => {
    logOutUser()

      .catch((err) => {
        toast.error(err.message);
      });
  };
  // console.log(role);

  const menuItems =
    role === "user"
      ? [
        {
          name: "User Dashboard",
          icon: Users,
          path: "/dashboard",
        },
        {
          name: "My Participated Contests",
          icon: ListOrdered,
          path: "/dashboard/participated-contests",
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
          {
            name: "Admin Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
          },

          {
            name: "Manage Users",
            icon: Users,
            path: "/dashboard/users",
          },
          {
            name: "Manage Contests",
            icon: Trophy,
            path: "/dashboard/contests",
          },
          {
            name: "Manage Reviews",
            icon: MessageSquare,
            path: "/dashboard/reviews",
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
          z-50 bg-base-100 shadow-xl transition-all duration-300 shrink-0
          fixed inset-y-0 left-0 w-[260px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:block lg:h-screen lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none lg:border-r  lg:border-secondary/20
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-8">
            {/* <Link to="/" className="flex items-center gap-2 outline-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00b074] text-xl font-bold text-white shadow-md shadow-green-200">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral">
                Contest Hub
              </span>
            </Link> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center h-10 w-13 ">
                {/* <span className="text-xl font-bold text-white">C</span> */}
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>

              <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-neutral to-gray-400">
                ContestHub
              </span>
            </motion.div>
            <button
              onClick={toggleSidebar}
              className="transition-colors lg:hidden text-neutral hover:text-red-500"
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
                  className={`flex w-full items-center rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 group relative overflow-hidden ${active
                      ? "bg-secondary/15 text-secondary"
                      : "text-secondary hover:bg-secondary/15 hover:text-secondary"
                    }`}
                >
                  {/* Active Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 w-1 h-8 -translate-y-1/2 rounded-r-full top-1/2 bg-secondary" />
                  )}

                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${active
                        ? "text-secondary"
                        : "text-secondary group-hover:text-secondary"
                      }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-secondary/20">
            <button
              onClick={handleLoginOut}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-red-600 transition-colors border border-red-100 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
