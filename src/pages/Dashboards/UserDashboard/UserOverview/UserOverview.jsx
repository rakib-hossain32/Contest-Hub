import React from "react";
import {
  TrendingUp,
  Trophy,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Components ---

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  colorClass,
  bgClass,
}) => (
  <div className=" p-6 rounded-2xl border border-secondary/30 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div>
        <p className="mb-1 text-sm font-medium ">{title}</p>
        <h3 className="text-2xl font-bold  group-hover:text-[#00b074] transition-colors">
          {value}
        </h3>
      </div>
      <div
        className={`p-3 rounded-xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <div
        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}
      >
        {isPositive ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {change}
      </div>
      <span className="text-xs text-slate-400">vs last month</span>
    </div>
  </div>
);

const data = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 55 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 75 },
];

const ActivityGraph = () => {
  return (
    <div className="flex flex-col h-full p-6 border shadow-sm rounded-2xl border-secondary/30">
      <div className="flex items-center justify-between mb-6">
        {/* Header same as before */}
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b074" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00b074" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              cursor={{
                stroke: "#00b074",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00b074"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorActivity)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#00b074" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RecentContestsTable = () => {
  const contests = [
    {
      id: 1,
      name: "Minimalist Logo Design",
      deadline: "2 days left",
      status: "Submitted",
      fee: "$50",
      icon: Zap,
    },
    {
      id: 2,
      name: "Summer Photography",
      deadline: "Ended",
      status: "Won",
      fee: "$20",
      icon: Target,
    },
    {
      id: 3,
      name: "Tech Blog Writing",
      deadline: "5 days left",
      status: "Pending",
      fee: "$15",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden border shadow-sm rounded-2xl border-secondary/20">
      <div className="flex items-center justify-between p-6 border-b border-secondary/50">
        <h3 className="text-lg font-bold ">Recent Contests</h3>
        <button className="text-slate-400 hover:text-[#00b074] transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left ">
          <tbody className="divide-y divide-secondary/50">
            {contests.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-secondary/10 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#00b074] group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold ">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Entry Fee: {item.fee}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 w-fit px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" /> {item.deadline}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      item.status === "Won"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : item.status === "Submitted"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 text-center border-t border-slate-50">
        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All Participation
        </button>
      </div>
    </div>
  );
};

// --- Main Overview Page ---

const UserOverview = () => {
  return (
    <div className="mt-3 space-y-8 animate-fade-in-up">
      {/* 1. Welcome Banner */}
      <div className="relative p-8 overflow-hidden text-white shadow-xl rounded-3xl bg-linear-to-r from-slate-900 to-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 -mt-10 -mr-10 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-[#00b074]/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Welcome back, John! 👋</h1>
            <p className="max-w-lg text-slate-300">
              You have{" "}
              <span className="text-[#00b074] font-bold">
                3 active contests
              </span>{" "}
              reaching their deadline soon. Don't miss the chance to win big
              this week!
            </p>
            <div className="flex gap-3 mt-6">
              <button className="bg-[#00b074] hover:bg-[#009e68] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#00b074]/30 transition-all hover:-translate-y-0.5">
                Browse Contests
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold backdrop-blur-sm transition-all">
                View Profile
              </button>
            </div>
          </div>
          {/* Abstract 3D Illustration Placeholder */}
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-linear-to-tr from-[#00b074] to-blue-500 rounded-full blur-sm opacity-80 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Earnings"
          value="$12,450"
          change="12.5%"
          isPositive={true}
          icon={DollarSign}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-100"
        />
        <StatCard
          title="Contests Won"
          value="18"
          change="2 New"
          isPositive={true}
          icon={Trophy}
          colorClass="text-yellow-600"
          bgClass="bg-yellow-100"
        />
        <StatCard
          title="Participated"
          value="42"
          change="5.2%"
          isPositive={false}
          icon={Target}
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
        />
        <StatCard
          title="Win Rate"
          value="42.8%"
          change="1.2%"
          isPositive={true}
          icon={TrendingUp}
          colorClass="text-purple-600"
          bgClass="bg-purple-100"
        />
      </div>

      {/* 3. Graph & Recent Activity Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 h-[400px]">
          <ActivityGraph />
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <RecentContestsTable />
        </div>
      </div>

      {/* 4. Upcoming Deadlines (Horizontal List) */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 " />
          <h3 className="text-lg font-bold ">
            Approaching Deadlines
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 transition-colors border border-red-100 cursor-pointer bg-red-50/50 rounded-xl hover:bg-red-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-xs font-bold text-red-500 bg-white rounded-lg shadow-sm">
                  DEC
                  <br />2{i}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Logo Design Challenge
                  </p>
                  <p className="text-xs font-medium text-red-500">
                    Ends in {i * 2} hours
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
