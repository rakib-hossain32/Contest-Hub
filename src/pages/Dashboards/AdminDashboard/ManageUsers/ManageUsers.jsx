import { UserCog, ChevronLeft, ChevronRight, Mail, Shield, User } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Loader } from "../../../../components/Loader/Loader";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const size = 10;
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading, isFetching } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${currentPage}&size=${size}`);
      return res.data;
    },
    // keepPreviousData: true, // For TanStack Query v4
    // placeholderData: (previousData) => previousData, // For TanStack Query v5
  });

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    const userRole = { role: newRole };

    axiosSecure
      .patch(`/users/${userId}`, userRole)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `Role updated to ${newRole}`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      })
      .catch((e) => {
        toast.error("Failed to update role");
      });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "creator":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Explicit handlers for pagination
  const goToNextPage = () => {
    if (users.length === size) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-base-100 rounded-[2rem] border border-secondary/10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <UserCog size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-primary">User Management</h2>
            <p className="text-sm font-bold text-slate-400">
              Manage permissions and roles for {users.length * (currentPage + 1)}+ users.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Showing</span>
          <span className="text-sm font-black text-primary">{users.length} Users</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden border shadow-xl border-secondary/30 rounded-[2.5rem] bg-base-100 relative">
        {/* Overlay Loader for Fetching */}
        {isFetching && !isLoading && (
          <div className="absolute inset-x-0 top-0 h-1 bg-primary/20 overflow-hidden z-10">
            <div className="h-full bg-primary animate-progress origin-left"></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-secondary/10 bg-secondary/5">
                <th className="px-8 py-6">User Profile</th>
                <th className="px-8 py-6">Email Address</th>
                <th className="px-8 py-6 text-center">Current Role</th>
                <th className="px-8 py-6 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/5">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <User size={48} className="text-slate-200" />
                      <p className="font-black text-slate-400 uppercase text-xs tracking-widest">No users found on this page</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="transition-all hover:bg-secondary/5 group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={u?.photoURL}
                            alt=""
                            className="object-cover w-12 h-12 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all shadow-sm"
                          />
                          {u.role === 'admin' && (
                            <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-lg shadow-lg">
                              <Shield size={10} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-neutral group-hover:text-primary transition-colors">
                            {u.displayName}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">ID: {u._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <Mail size={14} className="text-slate-300" />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border shadow-sm ${getRoleBadgeColor(
                          u.role
                        )}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className="select select-bordered select-sm rounded-xl text-xs font-black bg-base-100 focus:ring-0 border-secondary/20 hover:border-primary transition-colors cursor-pointer"
                        >
                          <option value="user">USER</option>
                          <option value="creator">CREATOR</option>
                          <option value="admin">ADMIN</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12 bg-base-100 p-6 rounded-[2rem] border border-secondary/10 shadow-sm">
        <button
          disabled={currentPage === 0}
          onClick={goToPrevPage}
          className="group flex items-center gap-3 px-8 py-3 bg-base-100 border border-secondary/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Previous
        </button>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Page</span>
            <div className="h-12 w-12 flex items-center justify-center bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 ring-4 ring-primary/5">
              {currentPage + 1}
            </div>
          </div>
        </div>

        <button
          disabled={users.length < size}
          onClick={goToNextPage}
          className="group flex items-center gap-3 px-8 py-3 bg-base-100 border border-secondary/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
        >
          Next
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Bar Animation Styles */}
      <style>{`
          @keyframes progress {
              0% { transform: scaleX(0); }
              50% { transform: scaleX(0.5); }
              100% { transform: scaleX(1); }
          }
          .animate-progress {
              animation: progress 1s infinite linear;
          }
      `}</style>
    </div>
  );
};

export default ManageUsers;
