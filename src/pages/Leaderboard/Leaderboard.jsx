import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Trophy,
  Crown,
  TrendingUp,
  UserCheck,
  Shield,
  Medal,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader/Loader";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["leader-board", "all-users-rank"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/leaderboard");
      return res.data;
    },
  });

  useEffect(() => {
    if (allUsers.length > 0) {
      const winningUsers = allUsers.filter(
        (user) => user.role === "user" && (user.winCount || 0) > 0
      );

      const sortedData = [...winningUsers].sort(
        (a, b) => (b.winCount || 0) - (a.winCount || 0)
      );

      const rankedData = sortedData.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      setUsers(rankedData);
    }
  }, [allUsers]);

  // --- Search Filter ---
  const filteredUsers = users.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredUsers.slice(0, 3);
  const restUsers = filteredUsers.slice(3);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-base-100">
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
              Contest Leaderboard
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Celebrating our top winners. Only users with at least one win are
              shown here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container relative z-20 px-4 mx-auto -mt-20 md:px-6">
        {users.length === 0 ? (
          // --- Empty State ---
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white border shadow-xl rounded-2xl border-base-200">
            <Trophy size={64} className="mb-4 text-base-300" />
            <h3 className="text-xl font-bold text-neutral">No Winners Yet!</h3>
            <p className="text-gray-500">
              Be the first one to win a contest and appear on the leaderboard.
            </p>
          </div>
        ) : (
          <>
            {/* Podium Section (Top 3) */}
            {filteredUsers.length >= 3 && !searchQuery && (
              <div className="flex flex-col items-center justify-center gap-6 mb-16 md:flex-row">
                <PodiumCard user={topThree[1]} place={2} delay={0.2} />
                <PodiumCard user={topThree[0]} place={1} delay={0} />
                <PodiumCard user={topThree[2]} place={3} delay={0.4} />
              </div>
            )}

            {/* Controls (Search) */}
            <div className="flex flex-col items-center justify-between max-w-5xl gap-4 p-4 mx-auto mb-8 border shadow-xl border-base-300 rounded-2xl md:flex-row bg-base-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-neutral">
                <TrendingUp size={20} className="text-[#1D4ED8]" />
                All Rankings
              </h3>

              <div className="relative w-full md:w-80 ">
                <Search
                  className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search winner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-neutral bg-base-100 border border-base-300 rounded-xl focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* List Section (Rest of Users) */}
            <div className="max-w-5xl mx-auto overflow-hidden border shadow-sm border-base-300 rounded-2xl bg-base-100">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-5 text-sm font-semibold tracking-wider uppercase border-b border-base-300 text-neutral">
                <div className="col-span-2 text-center md:col-span-1">Rank</div>
                <div className="col-span-6 md:col-span-5">User</div>
                <div className="col-span-2 text-center md:col-span-3">Wins</div>
                <div className="col-span-2 pr-4 text-right md:col-span-3">
                  Role
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-base-300">
                {searchQuery
                  ? filteredUsers.map((user) => (
                      <LeaderboardRow key={user._id} user={user} />
                    ))
                  : restUsers.map((user) => (
                      <LeaderboardRow key={user._id} user={user} />
                    ))}

                {filteredUsers.length === 0 && (
                  <div className="p-10 text-center text-gray-500">
                    No users found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Sub-Component: Top 3 Podium Card ---
function PodiumCard({ user, place, delay }) {
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
      className={`relative w-full max-w-[280px] bg-base-100 rounded-2xl p-6 flex flex-col items-center justify-end ${
        currentStyle.height
      } shadow-2xl ${currentStyle.shadow} border-t-4 ${
        currentStyle.border
      } z-10 order-${place === 1 ? 2 : place === 2 ? 1 : 3}`}
    >
      {currentStyle.crown && (
        <div className="absolute p-2 -translate-x-1/2 bg-yellow-400 rounded-full shadow-lg -top-6 left-1/2 animate-bounce">
          <Crown className="text-white" size={24} fill="currentColor" />
        </div>
      )}

      <div className="relative mb-4">
        <div
          className={`w-24 h-24 rounded-full p-1 border-4 ${currentStyle.border}`}
        >
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-base-100 flex items-center justify-center font-bold text-sm shadow-md border-2 ${currentStyle.border}`}
        >
          {place}
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-xl font-bold text-center text-neutral line-clamp-1">
          {user.displayName}
        </h3>
        <p className="w-full px-2 mb-4 text-xs font-semibold text-center text-gray-500 truncate">
          {user.email}
        </p>
      </div>

      <div className="flex items-center justify-between w-full p-3 bg-base-200 rounded-xl">
        <div className="flex flex-col items-center flex-1 border-r border-gray-300">
          <Trophy size={16} className={`${currentStyle.iconColor} mb-1`} />
          <span className="font-bold text-neutral">{user.winCount || 0}</span>
          <span className="text-[10px] text-gray-500 uppercase">Wins</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <UserCheck size={16} className="mb-1 text-blue-500" />
          <span className="font-bold capitalize text-neutral">{user.role}</span>
          <span className="text-[10px] text-gray-500 uppercase">Role</span>
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
      className="grid items-center grid-cols-12 gap-4 p-4 transition-colors duration-200 bg-base-100 hover:bg-base-200 group"
    >
      <div className="col-span-2 md:col-span-1 text-center font-bold text-neutral group-hover:text-[#1D4ED8]">
        #{user.rank}
      </div>

      <div className="flex items-center col-span-6 gap-3 md:col-span-5 md:gap-4">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="object-cover w-10 h-10 border border-gray-200 rounded-full shadow-sm md:w-12 md:h-12"
        />
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold truncate text-neutral md:text-base">
            {user.displayName}
          </h4>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="col-span-2 text-center md:col-span-3">
        <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
          <Trophy size={14} className="text-yellow-600" />
          <span className="text-sm font-bold text-neutral">
            {user.winCount || 0}
          </span>
        </div>
      </div>

      <div className="col-span-2 pr-4 text-right md:col-span-3">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 capitalize bg-blue-100 rounded-md">
          {user.role}
        </span>
      </div>
    </motion.div>
  );
}
