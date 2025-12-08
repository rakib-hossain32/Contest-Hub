import React, { useState } from "react";
import { Menu } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Outlet, useLocation } from "react-router";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Header } from "../components/Dashboard/Header";
import useRole from "../hooks/useRole";
import UserOverview from "../pages/Dashboards/UserDashboard/UserOverview/UserOverview";
import AdminOverview from "../pages/Dashboards/AdminDashboard/AdminOverview/AdminOverview ";
import CreatorOverview from "../pages/Dashboards/CreatorDashboard/CreatorOverview/CreatorOverview";


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { user } = useAuth()
  const {role}=useRole()
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // check if current URL is exactly "/dashboard"
  const isRootDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex items-start min-h-screen mx-auto overflow-hidden bg-base-100 max-w-7xl">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Mobile Sidebar Toggle */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed left-4 top-4 z-100 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#00b074] shadow-lg outline-0 transition-all duration-300 hover:bg-[#009e68] lg:hidden text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Main Content */}
        <section className="flex flex-col flex-1 min-w-0 min-h-screen transition-all duration-300">
          <Header />

          <main className="flex-1 pl-6 pr-1 overflow-y-auto bg-base-100">
            <div className="mt-3 animate-fade-in-up">
              {/* ===================================== */}
              {/* ROLE BASED DEFAULT OVERVIEW RENDERING */}
              {/* ===================================== */}
              {isRootDashboard ? (
                <>
                  {role === "user" && <UserOverview />}
                  {role === "creator" && <CreatorOverview />}
                  {role === "admin" && <AdminOverview />}
                </>
              ) : (
                <Outlet /> // child route content
              )}
            </div>
          </main>
        </section>
      </div>
    </div>
  );
};
export default DashboardLayout
