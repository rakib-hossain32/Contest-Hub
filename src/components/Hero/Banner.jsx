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

  // Slower, more organic animation for premium feel
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
    <section className="relative w-full h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-neutral">
      {/* --- 1. Premium Background Layer --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Deep linear Base */}
        <div className="absolute inset-0 bg-linear-to-br from-primary via-[#0f172a] to-secondary opacity-95"></div>

        {/* Animated Orbs (Slightly smaller for compact height) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/40 rounded-full mix-blend-screen filter blur-[80px]"
        ></motion.div>

        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 3 }}
          className="absolute bottom-[-20%] right-[-5%] w-[400px] h-[400px] bg-accent/30 rounded-full mix-blend-screen filter blur-[80px]"
        ></motion.div>

        {/* Cyberpunk/Tech Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-linear(#ffffff 1px, transparent 1px), linear-linear(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Radial Vignette to focus center */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral via-transparent to-neutral/80"></div>
      </div>

      {/* --- 2. Main Content --- */}
      <div className="container relative z-10 flex flex-col items-center px-4 mx-auto mt-8 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group cursor-default flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-accent/30 transition-colors mb-6"
        >
          <Sparkles size={14} className="text-accent animate-pulse" />
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
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-success to-primary animate-linear-x">
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
                  ? "bg-white/10 shadow-[0_0_30px_rgba(16,185,129,0.15)] border-accent/40 scale-[1.01]"
                  : "bg-white/5 shadow-xl border-white/10 hover:border-white/20"
              }
              backdrop-blur-xl border
            `}
          >
            <div className="pl-5 text-base-100">
              <Search size={20} />
            </div>

            <input
              type="text"
              placeholder="Find your next challenge..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 px-4 py-3 text-base font-medium text-white bg-transparent outline-none placeholder-base-100 md:text-lg"
            />

            <button
              type="submit"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-success text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-accent/40 active:scale-95"
            >
              Search
            </button>

            {/* Mobile Button */}
            <button
              type="submit"
              className="md:hidden p-2.5 bg-accent text-white rounded-full mx-1"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Trending Tags (Simplified) */}
          <div className="flex flex-wrap items-center justify-center mt-5 gap-x-4 gap-y-2">
            <span className="flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-base-100">
              <TrendingUp size={12} /> Trending:
            </span>

            {["UI Design", "Python", "Copywriting", "Logo"].map((tag, idx) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  if (onSearch) onSearch(tag);
                }}
                className="text-xs transition-all text-base-100 md:text-sm hover:text-white hover:underline decoration-accent underline-offset-4"
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
