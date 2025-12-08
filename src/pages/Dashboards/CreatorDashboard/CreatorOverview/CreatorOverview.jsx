import React from "react";
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Briefcase,
  Eye,
  ArrowUpRight,
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

// 1. Premium Stat Card
const CreatorStatCard = ({ title, value, subtext, icon: Icon, colorTheme }) => {
  const themes = {
    green: "bg-[#00b074]/10 text-[#00b074] border-[#00b074]/20",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className=" p-6 rounded-2xl border border-secondary/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3.5 rounded-xl border ${themes[colorTheme]} transition-transform group-hover:scale-110`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full text-slate-400 bg-slate-50">
          <TrendingUp className="w-3 h-3" /> +4.5%
        </span>
      </div>
      <div>
        <h3 className="mb-1 text-3xl font-bold ">{value}</h3>
        <p className="text-sm font-medium text-neutral/80">{title}</p>
        <p className="mt-2 text-xs text-slate-400">{subtext}</p>
      </div>
    </div>
  );
};

// 2. Action Center (Important for Creators)
const ActionCenter = () => {
  const actions = [
    {
      id: 1,
      title: "Declare Winner",
      desc: "Summer Photography Contest ended yesterday.",
      type: "urgent",
    },
    {
      id: 2,
      title: "Review Submissions",
      desc: "5 new entries in Logo Design Challenge.",
      type: "normal",
    },
    {
      id: 3,
      title: "Update Payment Info",
      desc: "Verify your bank account for payouts.",
      type: "warning",
    },
  ];

  return (
    <div className="flex flex-col h-full border shadow-sm rounded-2xl border-secondary/30">
      <div className="flex items-center justify-between p-6 border-b border-slate-50">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold ">
            <AlertCircle className="w-5 h-5 text-orange-500" /> Action Required
          </h3>
        </div>
        <span className="px-2 py-1 text-xs font-bold text-center text-orange-700 bg-orange-100 rounded-full">
          3 Pending
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-3 p-4 overflow-auto">
        {actions.map((action) => (
          <div
            key={action.id}
            className="p-4 transition-all border cursor-pointer border-secondary/30 rounded-xl hover:bg-secondary/10 hover:border-slate-200 hover:shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold transition-colors group-hover:text-blue-600">
                  {action.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500">{action.desc}</p>
              </div>
              {action.type === "urgent" && (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </div>
            <div className="flex justify-end mt-3">
              <button className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-neutral">
                Take Action <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Analytics Chart (Visual)
const RevenueAnalytics = () => {
  const data = [
    { name: "Jan", revenue: 2250 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 1750 },
    { name: "Apr", revenue: 3500 },
    { name: "May", revenue: 2750 },
    { name: "Jun", revenue: 4000 },
  ];

  return (
    <div className=" border border-secondary/30 text-white p-6 rounded-2xl shadow-xl overflow-hidden h-[400px] flex flex-col relative">
      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full pointer-events-none bg-blue-500/10 blur-3xl"></div>
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold">Revenue Analytics</h3>
          <p className="text-sm text-slate-400">Monthly earnings</p>
        </div>
        <select className="bg-slate-700 text-xs border-none rounded-lg px-3 py-1.5 outline-none text-slate-300">
          <option>This Year</option>
        </select>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "none",
                color: "#0f172a",
              }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[6, 6, 0, 0]}
              barSize={32}
              background={{
                fill: "rgba(51, 65, 85, 0.5)",
                radius: [6, 6, 0, 0],
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 4. Top Performing Contests Table
const TopContests = () => {
  const contests = [
    {
      name: "Minimalist Logo Design",
      participants: 145,
      views: "2.5k",
      status: "Active",
    },
    {
      name: "Tech Blog Writing",
      participants: 89,
      views: "1.2k",
      status: "Ended",
    },
    {
      name: "Summer Photo Challenge",
      participants: 230,
      views: "5.1k",
      status: "Active",
    },
  ];

  return (
    <div className="border shadow-sm rounded-2xl border-secondary/30">
      <div className="flex items-center justify-between p-6 border-b border-slate-50">
        <h3 className="text-lg font-bold ">
          Top Performing Contests
        </h3>
        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="font-medium text-neutral">
          <tr>
            <th className="px-6 py-4">Contest Name</th>
            <th className="px-6 py-4">Participants</th>
            <th className="px-6 py-4">Views</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {contests.map((c, idx) => (
            <tr key={idx} className="transition-colors hover:bg-secondary/10">
              <td className="px-6 py-4 font-semibold ">
                {c.name}
              </td>
              <td className="flex items-center gap-2 px-6 py-4">
                <Users className="w-4 h-4 text-slate-400" /> {c.participants}
              </td>
              <td className="px-6 py-4 text-slate-500">
                <div className="flex items-center gap-1 text-neutral">
                  <Eye className="w-3.5 h-3.5" /> {c.views}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    c.status === "Active"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main Page Component ---

const CreatorOverview = () => {
  return (
    <div className="pb-10 space-y-8 animate-fade-in-up">
      {/* 1. Page Header with Quick Action */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold ">Creator Studio</h1>
          <p className="text-slate-500">
            Track your contests, revenue, and audience growth.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/dashboard/add-contest"
            className="flex items-center gap-2 bg-primary hover:bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <Briefcase className="w-4 h-4" /> Create Contest
          </Link>
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium shadow-sm transition-all">
            Download Report
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CreatorStatCard
          title="Total Revenue"
          value="$45,230"
          subtext="+$1,200 this week"
          icon={DollarSign}
          colorTheme="green"
        />
        <CreatorStatCard
          title="Total Participants"
          value="1,402"
          subtext="Across all contests"
          icon={Users}
          colorTheme="blue"
        />
        <CreatorStatCard
          title="Active Contests"
          value="03"
          subtext="Ending in 4 days"
          icon={Briefcase}
          colorTheme="purple"
        />
        <CreatorStatCard
          title="Contest Views"
          value="89.5k"
          subtext="Total Impressions"
          icon={Eye}
          colorTheme="orange"
        />
      </div>

      {/* 3. Analytics & Action Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 ">
        {/* Revenue Chart (Takes 2 columns) */}
        <div className=" lg:col-span-2">
          <RevenueAnalytics />
        </div>

        {/* Action Center (Takes 1 column) */}
        <div className=" lg:col-span-1">
          <ActionCenter />
        </div>
      </div>

      {/* 4. Detailed Table */}
      <div className="grid grid-cols-1">
        <TopContests />
      </div>
    </div>
  );
};

export default CreatorOverview;
