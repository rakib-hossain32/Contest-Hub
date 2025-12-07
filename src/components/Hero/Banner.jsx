import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

export default function Banner({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const blobVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.05, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* --- 1. Premium Background Layer --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Deep linear Base */}
        <div className="absolute inset-0 bg-linear-to-br from-[#1D4ED8] via-[#0f172a] to-[#8B5CF6] opacity-95"></div>

        {/* Animated Orbs */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/40 rounded-full mix-blend-screen filter blur-[80px]"
        ></motion.div>

        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 3 }}
          className="absolute bottom-[-20%] right-[-5%] w-[400px] h-[400px] bg-[#10B981]/30 rounded-full mix-blend-screen filter blur-[80px]"
        ></motion.div>

        {/* --- Fixed Noise Texture (Base64) --- */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* --- Fixed Grid Pattern (CSS linear) --- */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-linear(#ffffff 1px, transparent 1px), linear-linear(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Radial Vignette to focus center */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-[#0f172a]/80 pointer-events-none"></div>
      </div>

      {/* --- 2. Main Content --- */}
      <div className="container relative z-10 flex flex-col items-center px-4 mx-auto mt-8 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group cursor-default flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-[#10B981]/30 transition-colors mb-6"
        >
          <Sparkles size={14} className="text-[#10B981] animate-pulse" />
          <span className="text-xs font-medium tracking-wide md:text-sm text-white/90">
            Join 10k+ Creators Today
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          Unleash Your <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#10B981] via-[#34D399] to-[#1D4ED8]">
            Creative Potential
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto mt-5 text-base font-light leading-relaxed text-gray-300 md:text-lg"
        >
          Explore thousands of design, coding, and writing contests. Compete
          with the best and showcase your talent to the world.
        </motion.p>

        {/* --- 3. Premium Search Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-2xl mt-8"
        >
          <form
            onSubmit={handleSubmit}
            className={`
              relative flex items-center p-1.5 rounded-full transition-all duration-300
              ${
                isFocused
                  ? "bg-white/10 shadow-[0_0_30px_rgba(16,185,129,0.15)] border-[#10B981]/40 scale-[1.01]"
                  : "bg-white/5 shadow-xl border-white/10 hover:border-white/20"
              }
              backdrop-blur-xl border
            `}
          >
            <div className="pl-5 text-gray-400">
              <Search size={20} />
            </div>

            <input
              type="text"
              placeholder="Find your next challenge..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 px-4 py-3 text-base font-medium text-white placeholder-gray-400 bg-transparent outline-none md:text-lg"
            />

            <button
              type="submit"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-[#10B981]/40 active:scale-95"
            >
              Search
            </button>

            {/* Mobile Button */}
            <button
              type="submit"
              className="md:hidden p-2.5 bg-[#10B981] text-white rounded-full mx-1"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Trending Tags */}
          <div className="flex flex-wrap items-center justify-center mt-5 gap-x-4 gap-y-2">
            <span className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-400 uppercase">
              <TrendingUp size={12} /> Trending:
            </span>

            {["UI Design", "Python", "Copywriting", "Logo"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  if (onSearch) onSearch(tag);
                }}
                className="text-xs md:text-sm text-gray-300 hover:text-white hover:underline decoration-[#10B981] underline-offset-4 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
