import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { WinnerCard } from "./WinnerCard";

// --- Mock Data ---
const winnersData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "Mobile App Redesign 2024",
    prize: "$2,500",
    quote:
      "This platform changed my career. The exposure I got was incredible!",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Content Writer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "Creative Storytelling Challenge",
    prize: "$1,200",
    quote: "Winning gave me the confidence to start my own agency.",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Frontend Dev",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "React Performance Hackathon",
    prize: "$3,000",
    quote: "The competition was tough, but the reward was totally worth it.",
  },
];

const stats = [
  {
    label: "Total Prize Distributed",
    value: "$150k+",
    icon: DollarSign,
    color: "text-[#10B981]",
  },
  {
    label: "Talented Winners",
    value: "1,200+",
    icon: Trophy,
    color: "text-[#F59E0B]",
  },
  {
    label: "Completed Contests",
    value: "350+",
    icon: Star,
    color: "text-[#8B5CF6]",
  },
];

export default function WinnerAdvertisement() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-24 bg-[#111827] overflow-hidden">
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-[#1D4ED8] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        {/* Confetti/Sparkles Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        {/* --- Header Section --- */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-medium text-sm mb-6"
          >
            <Trophy size={16} /> Hall of Fame
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Join the League of <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
              Champions & Creators
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400"
          >
            Every day, creators like you are winning big. Showcase your talent,
            earn recognition, and take home the prize money you deserve.
          </motion.p>
        </div>

        {/* --- Stats Row --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 transition-colors border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl hover:bg-white/10"
            >
              <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- Winners Grid --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {winnersData.map((winner, index) => (
            <WinnerCard key={winner.id} winner={winner} index={index} />
          ))}
        </div>

        {/* --- Bottom CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-linear-to-r from-[#10B981] to-[#1D4ED8] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <button
              onClick={() => navigate("/all-contests")}
              className="relative px-10 py-4 bg-white text-[#111827] text-lg font-bold rounded-full flex items-center gap-3 hover:scale-105 transition-transform"
            >
              Start Competing Now <ArrowRight size={20} />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Join 10,000+ creators today. No credit card required for signup.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
