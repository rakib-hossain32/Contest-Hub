import React from "react";
import { Calendar, Trophy, Award, ArrowRight, TrendingUp } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export const WinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winnings = [] } = useQuery({
    queryKey: ["winner-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/winner/contests?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="font-sans text-base-content">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="flex items-center gap-3 text-3xl font-extrabold text-primary">
          <Trophy className="text-accent" size={32} /> Winning History
        </h2>
        <p className="mt-1 text-base-content/60">
          Celebrate your victories and track your rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {winnings.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item._id}
            className="relative overflow-hidden transition-all duration-300 border shadow-xl group bg-base-100 rounded-4xl hover:shadow-2xl hover:shadow-accent/10 border-base-200"
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/20 to-transparent"></div>

              {/* Category Badge */}
              <div className="absolute px-3 py-1 text-xs font-bold rounded-full shadow-sm top-4 left-4 bg-base-100/90 backdrop-blur-md text-primary">
                {item.type}
              </div>

              {/* Winner Floating Icon */}
              <div className="absolute z-10 flex items-center justify-center text-white transition-all duration-300 rotate-0 shadow-lg bottom-4 right-6 w-14 h-14 bg-success rounded-2xl shadow-success/40 group-hover:rotate-12">
                <Trophy size={28} fill="currentColor" />
              </div>
            </div>

            {/* Content Body */}
            <div className="px-6 pt-8 pb-6">
              {/* Title */}
              <h3 className="mb-2 text-xl font-bold leading-tight transition-colors text-base-content line-clamp-2 group-hover:text-primary">
                {item.name}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 mb-6 text-sm text-base-content/60">
                <Calendar size={14} className="text-secondary" />
                <span>
                  Won on{" "}
                  {new Date(item.winner?.winningDate).toLocaleDateString()}
                </span>
              </div>

              {/* Stats / Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-base-200">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wider uppercase text-base-content/40">
                    Prize Won
                  </p>
                  <p className="text-2xl font-black text-success drop-shadow-sm">
                    ${item.prizeMoney}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <p className="mb-1 text-xs font-bold tracking-wider uppercase text-base-content/40">
                    Rank
                  </p>
                  <div className="flex items-center gap-1 px-2 py-1 font-bold rounded-lg text-primary bg-primary/5">
                    <Award size={14} /> #1
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 transition-colors duration-300 border-2 border-transparent pointer-events-none group-hover:border-accent/20 rounded-4xl"></div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {winnings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-base-200/30 rounded-[2.5rem] border border-dashed border-base-300">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-base-200">
            <Trophy className="w-8 h-8 text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/60">
            No winnings yet
          </h3>
          <p className="mt-1 text-base-content/40">
            Participate in contests to earn rewards!
          </p>
        </div>
      )}
    </div>
  );
};
