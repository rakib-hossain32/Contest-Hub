import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Star,
  Filter,
} from "lucide-react";

// --- Mock Data (Sorted by Wins) ---
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Alex Johnson",
    username: "@alex_design",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
    wins: 42,
    points: 12500,
    badges: ["Top Designer", "Elite"],
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Smith",
    username: "@sarah_writes",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    wins: 38,
    points: 11200,
    badges: ["Storyteller"],
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Chen",
    username: "@mike_code",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
    wins: 31,
    points: 9800,
    badges: ["Bug Hunter"],
  },
  {
    id: 4,
    rank: 4,
    name: "Emily Davis",
    username: "@emily_art",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    wins: 25,
    points: 8400,
    badges: ["Rising Star"],
  },
  {
    id: 5,
    rank: 5,
    name: "David Wilson",
    username: "@dave_dev",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    wins: 22,
    points: 7900,
    badges: [],
  },
  {
    id: 6,
    rank: 6,
    name: "Lisa Anderson",
    username: "@lisa_ux",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    wins: 19,
    points: 7200,
    badges: [],
  },
  {
    id: 7,
    rank: 7,
    name: "James Martin",
    username: "@james_py",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    wins: 15,
    points: 6500,
    badges: [],
  },
];

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Search Logic
  const filteredUsers = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split Top 3 and Rest
  const topThree = filteredUsers.slice(0, 3);
  const restUsers = filteredUsers.slice(3);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 overflow-x-hidden font-sans">
      {/* --- Header Section --- */}
      <section className="relative bg-[#111827] pt-24 pb-32 px-4 md:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-[#1D4ED8] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
          <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          {/* Noise Texture */}
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-yellow-400 border rounded-full bg-yellow-500/10 border-yellow-500/20">
              <Crown size={16} /> Hall of Fame
            </span>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Global Leaderboard
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Celebrating the top creative minds. Compete, win contests, and
              climb the ranks to earn your spot at the top.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container relative z-20 px-4 mx-auto -mt-20 md:px-6">
        {/* Podium Section (Top 3) */}
        {filteredUsers.length >= 3 && !searchQuery && (
          <div className="flex flex-col items-end justify-center gap-6 mb-16 md:flex-row">
            <PodiumCard user={topThree[1]} place={2} delay={0.2} />
            <PodiumCard user={topThree[0]} place={1} delay={0} />
            <PodiumCard user={topThree[2]} place={3} delay={0.4} />
          </div>
        )}

        {/* Controls (Search) */}
        <div className="flex flex-col items-center justify-between max-w-5xl gap-4 p-4 mx-auto mb-8 bg-white border border-gray-100 shadow-xl rounded-2xl md:flex-row">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <TrendingUp size={20} className="text-[#1D4ED8]" />
            All Rankings
          </h3>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              size={18}
            />
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* List Section (Rest of Users) */}
        <div className="max-w-5xl mx-auto overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-5 text-sm font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-100 bg-gray-50">
            <div className="col-span-2 text-center md:col-span-1">Rank</div>
            <div className="col-span-6 md:col-span-5">User</div>
            <div className="col-span-2 text-center md:col-span-3">
              Contests Won
            </div>
            <div className="col-span-2 pr-4 text-right md:col-span-3">
              Points
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {searchQuery
              ? // If searching, show all matches
                filteredUsers.map((user) => (
                  <LeaderboardRow key={user.id} user={user} />
                ))
              : // If not searching, show rest users (4+)
                restUsers.map((user) => (
                  <LeaderboardRow key={user.id} user={user} />
                ))}

            {filteredUsers.length === 0 && (
              <div className="p-10 text-center text-gray-500">
                No users found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component: Top 3 Podium Card ---
function PodiumCard({ user, place, delay }) {
  // Styles based on rank
  const styles = {
    1: {
      height: "h-[320px]",
      border: "border-yellow-400",
      shadow: "shadow-yellow-500/30",
      iconColor: "text-yellow-400",
      crown: true,
    },
    2: {
      height: "h-[280px]",
      border: "border-slate-300",
      shadow: "shadow-slate-400/30",
      iconColor: "text-slate-400",
      crown: false,
    },
    3: {
      height: "h-[260px]",
      border: "border-amber-600",
      shadow: "shadow-amber-600/30",
      iconColor: "text-amber-600",
      crown: false,
    },
  };

  const currentStyle = styles[place];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative w-full max-w-[280px] bg-white rounded-2xl p-6 flex flex-col items-center justify-end ${
        currentStyle.height
      } shadow-2xl ${currentStyle.shadow} border-t-4 ${
        currentStyle.border
      } z-10 order-${place === 1 ? 2 : place === 2 ? 1 : 3}`}
    >
      {/* Crown for #1 */}
      {currentStyle.crown && (
        <div className="absolute p-2 -translate-x-1/2 bg-yellow-400 rounded-full shadow-lg -top-6 left-1/2 animate-bounce">
          <Crown className="text-white" size={24} fill="currentColor" />
        </div>
      )}

      {/* Avatar */}
      <div className="relative mb-4">
        <div
          className={`w-24 h-24 rounded-full p-1 border-4 ${currentStyle.border}`}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-sm shadow-md border-2 ${currentStyle.border}`}
        >
          {place}
        </div>
      </div>

      {/* Details */}
      <h3 className="text-xl font-bold text-center text-gray-800 line-clamp-1">
        {user.name}
      </h3>
      <p className="mb-4 text-sm text-gray-400">{user.username}</p>

      <div className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-xl">
        <div className="flex flex-col items-center flex-1 border-r border-gray-200">
          <Trophy size={16} className={`${currentStyle.iconColor} mb-1`} />
          <span className="font-bold text-gray-700">{user.wins}</span>
          <span className="text-[10px] text-gray-400 uppercase">Wins</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <Star size={16} className="mb-1 text-blue-500" />
          <span className="font-bold text-gray-700">
            {user.points.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">Points</span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Sub-Component: Leaderboard Row (Rank 4+) ---
function LeaderboardRow({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="grid items-center grid-cols-12 gap-4 p-4 transition-colors duration-200 hover:bg-blue-50/50 group"
    >
      {/* Rank */}
      <div className="col-span-2 md:col-span-1 text-center font-bold text-gray-400 group-hover:text-[#1D4ED8]">
        #{user.rank}
      </div>

      {/* User Info */}
      <div className="flex items-center col-span-6 gap-3 md:col-span-5 md:gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="object-cover w-10 h-10 rounded-full shadow-sm md:w-12 md:h-12"
        />
        <div>
          <h4 className="text-sm font-bold text-gray-800 md:text-base">
            {user.name}
          </h4>
          <p className="text-xs text-gray-400">{user.username}</p>
          {/* Badges (Desktop Only) */}
          <div className="hidden gap-1 mt-1 md:flex">
            {user.badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wins */}
      <div className="col-span-2 text-center md:col-span-3">
        <div className="inline-flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
          <Trophy size={14} className="text-yellow-500" />
          <span className="text-sm font-bold text-gray-700">{user.wins}</span>
        </div>
      </div>

      {/* Points */}
      <div className="col-span-2 pr-4 font-mono font-semibold text-right text-gray-600 md:col-span-3">
        {user.points.toLocaleString()}
      </div>
    </motion.div>
  );
}
