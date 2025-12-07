
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

const AdminOverview  = () => {
     return (
       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
         <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
           <div>
             <p className="text-sm font-medium text-gray-500">Total Users</p>
             <h3 className="text-2xl font-bold text-slate-800">1,234</h3>
           </div>
           <div className="p-3 text-blue-600 bg-blue-50 rounded-xl">
             <Users className="w-6 h-6" />
           </div>
         </div>
         <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
           <div>
             <p className="text-sm font-medium text-gray-500">
               Pending Contests
             </p>
             <h3 className="text-2xl font-bold text-orange-500">5</h3>
           </div>
           <div className="p-3 text-orange-600 bg-orange-50 rounded-xl">
             <AlertCircle className="w-6 h-6" />
           </div>
         </div>
         <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
           <div>
             <p className="text-sm font-medium text-gray-500">Total Revenue</p>
             <h3 className="text-2xl font-bold text-green-600">$45,200</h3>
           </div>
           <div className="p-3 text-green-600 bg-green-50 rounded-xl">
             <Trophy className="w-6 h-6" />
           </div>
         </div>
       </div>
     );
};

export default AdminOverview ;