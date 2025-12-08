import React from "react";
import {
  Users,
  Trophy,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  ShieldAlert,
  MoreVertical,
  Server,
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
  Legend,
} from "recharts";

// --- Components ---

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
  <div className="p-6 transition-all duration-300 border shadow-sm rounded-2xl border-secondary/30 hover:shadow-md">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold tracking-wide uppercase ">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-bold ">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <span
        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${
          isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {change}
      </span>
      <span className="text-xs text-slate-400">vs last month</span>
    </div>
  </div>
);

// 2. Platform Analytics Chart (Visual Representation)
const PlatformAnalytics = () => {
  // Mock Data mimicking your original array values
  const data = [
    { name: "Jan", revenue: 4000, users: 2400 },
    { name: "Feb", revenue: 6500, users: 3900 },
    { name: "Mar", revenue: 4500, users: 2700 },
    { name: "Apr", revenue: 8000, users: 4800 },
    { name: "May", revenue: 5500, users: 3300 },
    { name: "Jun", revenue: 9000, users: 5400 },
    { name: "Jul", revenue: 7000, users: 4200 },
    { name: "Aug", revenue: 9500, users: 5700 },
  ];
  return (
    <div className="flex flex-col p-6 border shadow-sm rounded-2xl border-secondary/30 h-[400px] ">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold ">Platform Growth</h3>
          <p className="text-sm text-slate-400">Revenue & User Acquisition</p>
        </div>
        {/* Legend/Info (Recharts Legend can also replace this) */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="text-xs font-medium text-slate-500">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="text-xs font-medium text-slate-500">Users</span>
          </div>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20, // Adjust to fit Y-axis labels better
              bottom: 0,
            }}
            barGap={4} // Gap between bars in a group
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              labelStyle={{
                color: "#64748b",
                marginBottom: "4px",
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="revenue"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              barSize={18}
              animationDuration={1500}
            />
            <Bar
              dataKey="users"
              fill="#cbd5e1"
              radius={[4, 4, 0, 0]}
              barSize={18}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 3. Pending Approvals List (Critical for Admins)
const PendingRequests = () => {
  const requests = [
    {
      id: 1,
      contest: "Cybersecurity Challenge",
      creator: "TechCorp",
      date: "2 mins ago",
    },
    {
      id: 2,
      contest: "Modern Art Exhibit",
      creator: "Artisan",
      date: "1 hour ago",
    },
    {
      id: 3,
      contest: "Health Blog Writing",
      creator: "MediLife",
      date: "3 hours ago",
    },
    {
      id: 4,
      contest: "Code Hackathon",
      creator: "DevHub",
      date: "5 hours ago",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden border shadow-sm rounded-2xl border-secondary/30">
      <div className="flex items-center justify-between p-6 border-b border-secondary/50 bg-orange-900/20">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold ">Pending Approvals</h3>
        </div>
        <span className="px-2 py-1 text-xs font-bold text-center text-orange-700 bg-orange-100 rounded-full ">
          4 New
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between p-4 transition-colors border-b border-secondary/30 hover:bg-secondary/10 group hover:text-neutral"
          >
            <div>
              <h4 className="text-sm font-semibold ">
                {req.contest}
              </h4>
              <p className="text-xs text-slate-500">
                by <span className="text-blue-600">{req.creator}</span> •{" "}
                {req.date}
              </p>
            </div>
            <div className="flex gap-2 transition-opacity opacity-0 group-hover:opacity-100">
              <button
                className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 cursor-pointer"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 cursor-pointer"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/contests"
        className="block p-3 text-xs font-bold text-center transition-colors border-t text-neutral hover:text-neutral border-slate-50 hover:bg-secondary/50"
      >
        View All Requests
      </Link>
    </div>
  );
};

// 4. Top Creators List
const TopCreators = () => {
  return (
    <div className="p-6 border shadow-sm rounded-2xl border-secondary/30">
      <h3 className="mb-4 text-lg font-bold text-neutral">Top Creators</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={`https://randomuser.me/api/portraits/men/${i * 10}.jpg`}
                alt="User"
                className="w-10 h-10 border rounded-full border-slate-200"
              />
              <div>
                <p className="text-sm font-bold ">Alex Johnson</p>
                <p className="text-xs text-slate-500">12 Contests Hosted</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">$4,200</p>
              <p className="text-[10px] text-slate-400">Revenue Generated</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Admin Overview Component ---

const AdminOverview = () => {
  return (
    <div className="pb-10 space-y-8 animate-fade-in-up">
      {/* 1. System Health Header */}
      <div className="flex flex-col items-start justify-between gap-4 p-6 shadow-lg md:flex-row md:items-center bg-base-100 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold">Admin Command Center</h1>
          <p className="text-sm text-slate-400">
            System performance and overview.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div className="relative w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                System Status
              </p>
              <p className="text-sm font-bold">Operational</p>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Server Load
              </p>
              <p className="text-sm font-bold">12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Total Revenue"
          value="$128,450"
          change="8.2%"
          isPositive={true}
          icon={DollarSign}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-100"
        />
        <AdminStatCard
          title="Total Users"
          value="45,231"
          change="12.5%"
          isPositive={true}
          icon={Users}
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
        />
        <AdminStatCard
          title="Active Contests"
          value="342"
          change="2.1%"
          isPositive={false}
          icon={Trophy}
          colorClass="text-purple-600"
          bgClass="bg-purple-100"
        />
        <AdminStatCard
          title="Pending Requests"
          value="15"
          change="5 New"
          isPositive={true}
          icon={Activity}
          colorClass="text-orange-600"
          bgClass="bg-orange-100"
        />
      </div>

      {/* 3. Main Analytics & Task Section */}
      <div className="grid h-auto grid-cols-1 gap-8 lg:grid-cols-3 ">
        <div className="h-full lg:col-span-2">
          <PlatformAnalytics />
        </div>
        <div className="h-full lg:col-span-1">
          <PendingRequests />
        </div>
      </div>

      {/* 4. Secondary Info Grid */}
      <div className="">
        <TopCreators />
      </div>
    </div>
  );
};

export default AdminOverview;
