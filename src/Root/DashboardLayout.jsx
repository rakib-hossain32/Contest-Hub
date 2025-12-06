import React, { useState } from "react";
import {
 
  ShoppingCart,
 
  Menu,

  Users,
  DollarSign,
  Activity,
} from "lucide-react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Header } from "../components/Dashboard/Header";
import { Outlet, useLocation } from "react-router";

export default function DashboardLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("Dashboard");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
    //   };
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const location = useLocation();

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    // console.log(isSidebarOpen)

      // Helper to get title based on path
      const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes("participated")) return "My Participated Contests";
        if (path.includes("winning")) return "My Winning Contests";
        if (path.includes("profile")) return "My Profile";
        return "Dashboard Overview";
      };

    return (
      <div className="min-h-screen bg-[#f7f6f9]">
        {/* Main Container - Centered with max-width */}
        <div className="flex items-start min-h-screen mx-auto overflow-hidden bg-white shadow-2xl max-w-7xl">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Mobile Toggle Button (Visible only on mobile) */}
          {isSidebarOpen || (
            <button
              onClick={toggleSidebar}
              className="fixed left-4 top-4 z-100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#00b074] shadow-lg outline-0 transition-all duration-300 hover:bg-[#009e68] lg:hidden text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Main Content Area */}
          <section className="flex flex-col flex-1 min-w-0 min-h-screen transition-all duration-300">
            <Header />

            <main className="flex-1 p-6 sm:p-8 bg-[#f7f6f9] overflow-y-auto">
              {/* Dynamic Content Title Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">
                  {getPageTitle()}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your activities and update your information.
                </p>
              </div>

              {/* Page Content Rendered Here */}
              <div className="animate-fade-in-up">
                <Outlet />
              </div>
            </main>
          </section>
        </div>
      </div>
      // <div className="min-h-screen bg-[#f7f6f9]">
      //   <div className="flex items-start min-h-screen mx-auto max-w-7xl">
      //     {/* Sidebar Component */}
      //     <Sidebar
      //       isOpen={isSidebarOpen}
      //       activeMenu={activeMenu}
      //       setActiveMenu={setActiveMenu}
      //       toggleSidebar={toggleSidebar}
      //     />

      //     {/* Mobile Toggle Button Overlay */}
      //     {isSidebarOpen && (
      //       <div
      //         onClick={() => setIsSidebarOpen(false)}
      //         className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      //       />
      //     )}

      //     {/* Mobile Toggle Button (Visible only on mobile) */}
      //     <button
      //       onClick={toggleSidebar}
      //       className="fixed left-4 top-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#007bff] shadow-lg outline-0 transition-all duration-300 hover:bg-blue-600 lg:hidden"
      //     >
      //       <Menu className="w-5 h-5 text-white" />
      //     </button>

      //     {/* Main Content Area */}
      //     {/* 2. এখানে lg:ml-[250px] বাদ দিয়েছি কারণ সাইডবার এখন ফ্লেক্স কন্টেইনারের অংশ */}
      //     <section className="flex flex-col flex-1 min-w-0 transition-all duration-300">
      //       <Header />

      //       <main className="flex-1 p-8 bg-[#f7f6f9]">
      //         {/* Dynamic Content Title */}
      //         <div className="mb-6">
      //           <h1 className="text-2xl font-bold text-slate-800">
      //             {activeMenu}
      //           </h1>
      //           <p className="mt-1 text-sm text-slate-500">
      //             Welcome back to your control panel.
      //           </p>
      //         </div>
      //         <div className="">
      //           <Outlet />
      //         </div>
      //       </main>
      //     </section>
      //   </div>
      // </div>
    );
}

/* --- Placeholder Content (To fill the page) --- */
function DashboardContent() {
  const stats = [
    {
      title: "Total Sales",
      value: "$24,500",
      change: "+4.5%",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "New Orders",
      value: "340",
      change: "+12.2%",
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
    {
      title: "Total Users",
      value: "1,250",
      change: "-2.1%",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Activity",
      value: "85%",
      change: "+5.4%",
      icon: Activity,
      color: "bg-[#00b074]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                {stat.value}
              </h3>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${
                  stat.change.startsWith("+")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stat.change} from last month
              </span>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg ${stat.color}`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Placeholder */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-slate-800">Recent Orders</h3>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-500 uppercase border-b border-gray-100">
                  <th className="py-3 font-semibold">Order ID</th>
                  <th className="py-3 font-semibold">Product</th>
                  <th className="py-3 font-semibold">Customer</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {[1, 2, 3, 4].map((i) => (
                  <tr
                    key={i}
                    className="transition-colors border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="py-4">#ORD-00{i}</td>
                    <td className="py-4 font-medium">
                      Premium Wireless Headset
                    </td>
                    <td className="py-4">Michael Jordan</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                        Completed
                      </span>
                    </td>
                    <td className="py-4 font-bold text-right">$129.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
