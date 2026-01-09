import React from "react";
import {
  Users,
  Trophy,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  ShieldAlert,
  MoreVertical,
  Server,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../../components/Loader/Loader";

// 1. Professional Stat Card
const AdminStatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  colorClass,
  bgClass,
}) => (
  <div className="p-6 transition-all duration-300 border shadow-sm rounded-4xl border-secondary/30 hover:shadow-xl hover:-translate-y-1 bg-base-100 group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-base-content/40">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-black text-primary ">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${bgClass} ${colorClass} transition-transform group-hover:scale-110`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <span
        className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
      >
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {change}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">vs last month</span>
    </div>
  </div>
);

// 2. Platform Analytics Chart (Dynamic)
const PlatformAnalytics = ({ revenueData }) => {
  return (
    <div className="flex flex-col p-8 border shadow-sm rounded-[2.5rem] border-secondary/30 h-[450px] bg-base-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-primary">Platform Growth</h3>
          <p className="text-sm font-medium text-slate-400">Monthly Revenue & User Acquisition</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/20"></div>
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/20"></div>
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Users</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 900 }}
              dy={15}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
            <Tooltip
              cursor={{ fill: "rgba(28, 59, 108, 0.03)" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                border: "none",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                padding: "16px"
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase" }}
              labelStyle={{ color: "#1c3b6c", marginBottom: "8px", fontSize: "12px", fontWeight: "900" }}
            />
            <Bar dataKey="revenue" fill="#1c3b6c" radius={[6, 6, 0, 0]} barSize={20} />
            <Bar dataKey="users" fill="#1a7a77" radius={[6, 6, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 3. Pending Approvals List
const PendingRequests = ({ pendingContests }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden border shadow-sm rounded-[2.5rem] border-secondary/30 bg-base-100">
      <div className="flex items-center justify-between p-8 border-b border-secondary/10 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-primary">Pending Queue</h3>
        </div>
        <span className="px-3 py-1 text-[10px] font-black text-white bg-primary rounded-full shadow-lg">
          {pendingContests?.length || 0} NEW
        </span>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {pendingContests?.slice(0, 6).map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between p-4 transition-all border border-transparent hover:border-secondary/10 hover:bg-secondary/5 rounded-2xl group"
          >
            <div className="min-w-0 flex-1 mr-4">
              <h4 className="text-sm font-bold text-neutral truncate">
                {req.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {req.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-black text-primary/60 uppercase">
                  ${req.price}
                </span>
              </div>
            </div>
            <Link
              to="/dashboard/contests"
              className="p-2 bg-base-200 text-neutral rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <MoreVertical className="w-4 h-4" />
            </Link>
          </div>
        ))}
        {(!pendingContests || pendingContests.length === 0) && (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <Activity className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Queue is clear</p>
          </div>
        )}
      </div>
      <Link
        to="/dashboard/contests"
        className="block p-5 text-[10px] font-black text-center transition-all bg-secondary/5 text-primary hover:bg-primary hover:text-white uppercase tracking-widest"
      >
        Manage All Requests
      </Link>
    </div>
  );
};

// --- Main Admin Overview Component ---

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: pendingContests = [] } = useQuery({
    queryKey: ["pending-queue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/all-users?status=Pending");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="pb-10 space-y-8 animate-fade-in-up">
      {/* 1. Header Card */}
      <div className="relative overflow-hidden p-8 shadow-sm rounded-[2.5rem] bg-base-100 border border-secondary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Command Center</h1>
            <p className="text-sm font-bold text-slate-400 mt-1">
              Global platform metrics and operational insights.
            </p>
          </div>
          <div className="flex items-center gap-8 bg-secondary/5 p-4 rounded-3xl border border-secondary/10">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Status</p>
                <p className="text-xs font-black text-green-600 uppercase">Live</p>
              </div>
            </div>
            <div className="w-px h-8 bg-secondary/20"></div>
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Environment</p>
                <p className="text-xs font-black text-primary uppercase">Production</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stat Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Gross Revenue"
          value={`$${(stats.revenue || 0).toLocaleString()}`}
          change="12.4%"
          isPositive={true}
          icon={DollarSign}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-100"
        />
        <AdminStatCard
          title="Total Users"
          value={(stats.users || 0).toLocaleString()}
          change="8.2%"
          isPositive={true}
          icon={Users}
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
        />
        <AdminStatCard
          title="Platform Contests"
          value={(stats.contests || 0).toLocaleString()}
          change="2.1%"
          isPositive={true}
          icon={Trophy}
          colorClass="text-purple-600"
          bgClass="bg-purple-100"
        />
        <AdminStatCard
          title="Pending Queue"
          value={(pendingContests.length || 0).toLocaleString()}
          change="REALTIME"
          isPositive={true}
          icon={TrendingUp}
          colorClass="text-orange-600"
          bgClass="bg-orange-100"
        />
      </div>

      {/* 3. Analytics & Queue */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PlatformAnalytics revenueData={stats.revenueChart} />
        </div>
        <div className="lg:col-span-1">
          <PendingRequests pendingContests={pendingContests} />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
