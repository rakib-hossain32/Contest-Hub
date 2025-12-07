
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  LogOut,
  Menu,
  Search,
  Bell,
  Mail,
  MoreVertical,
  CheckCircle,
  XCircle,
  Trash2,
  AlertCircle,
  Shield,
  UserCog,
} from "lucide-react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router";

// --- Mock Data ---

const INITIAL_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "Active",
  },
  {
    id: 2,
    name: "Alice Creator",
    email: "alice@example.com",
    role: "creator",
    status: "Active",
  },
  {
    id: 3,
    name: "Super Admin",
    email: "admin@example.com",
    role: "admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    status: "Banned",
  },
];

const INITIAL_CONTESTS = [
  {
    id: 101,
    title: "Summer Photography",
    creator: "Alice Creator",
    fee: 50,
    prize: 500,
    status: "pending",
  },
  {
    id: 102,
    title: "Tech Logo Design",
    creator: "Creative Studio",
    fee: 100,
    prize: 1000,
    status: "confirmed",
  },
  {
    id: 103,
    title: "Short Story Writing",
    creator: "Book Worms",
    fee: 20,
    prize: 150,
    status: "pending",
  },
  {
    id: 104,
    title: "Spam Contest 101",
    creator: "Unknown",
    fee: 0,
    prize: 0,
    status: "rejected",
  },
];

const ManageUsers = () => {

    const [users, setUsers] = useState(INITIAL_USERS);

    const handleRoleChange = (userId, newRole) => {
      // In a real app, API call here
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      alert(`User ID ${userId} role changed to ${newRole}`);
    };

    const getRoleBadgeColor = (role) => {
      switch (role) {
        case "admin":
          return "bg-purple-100 text-purple-700 border-purple-200";
        case "creator":
          return "bg-blue-100 text-blue-700 border-blue-200";
        default:
          return "bg-gray-100 text-gray-700 border-gray-200";
      }
    };
     return (
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-2xl font-bold text-slate-800">Manage Users</h2>
             <p className="text-sm text-slate-500">
               View all users and manage their system roles.
             </p>
           </div>
           <div className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm text-slate-600">
             Total Users: {users.length}
           </div>
         </div>

         <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-slate-700">
               <thead className="text-xs font-semibold uppercase bg-slate-50 text-slate-500">
                 <tr>
                   <th className="px-6 py-4">User Name</th>
                   <th className="px-6 py-4">Email</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Current Role</th>
                   <th className="px-6 py-4">Change Role</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {users.map((user) => (
                   <tr
                     key={user.id}
                     className="transition-colors hover:bg-gray-50/50"
                   >
                     <td className="flex items-center gap-3 px-6 py-4 font-medium text-slate-800">
                       <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-slate-200 text-slate-500">
                         {user.name.charAt(0)}
                       </div>
                       {user.name}
                     </td>
                     <td className="px-6 py-4 text-slate-500">{user.email}</td>
                     <td className="px-6 py-4">
                       <span
                         className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                           user.status === "Active"
                             ? "bg-green-50 text-green-700 border-green-200"
                             : "bg-red-50 text-red-700 border-red-200"
                         }`}
                       >
                         {user.status}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <span
                         className={`px-2.5 py-1 rounded-full text-xs font-medium border uppercase ${getRoleBadgeColor(
                           user.role
                         )}`}
                       >
                         {user.role}
                       </span>
                     </td>
                     <td className="px-6 py-4">
                       <div className="relative inline-block w-40">
                         <select
                           value={user.role}
                           onChange={(e) =>
                             handleRoleChange(user.id, e.target.value)
                           }
                           className="block w-full py-2 pl-3 pr-8 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                         >
                           <option value="user">User</option>
                           <option value="creator">Creator</option>
                           <option value="admin">Admin</option>
                         </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pointer-events-none">
                           <UserCog className="w-4 h-4" />
                         </div>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     );
};

export default ManageUsers;