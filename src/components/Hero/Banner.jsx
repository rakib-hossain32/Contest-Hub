import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, ArrowRight } from "lucide-react";

export default function BannerSection({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const blobVariants = {
    animate: {
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full bg-neutral">
        {/* linear using DaisyUI theme colors */}
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/80 to-secondary opacity-90"></div>

        {/* Floating blobs */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute top-[-10%] left-[-1%] w-[600px] h-[600px] bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
        ></motion.div>

        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-[-10%] right-[1%] w-[500px] h-[500px] bg-accent rounded-full mix-blend-multiply filter blur-[100px] opacity-30"
        ></motion.div>

        {/* Grain texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative w-full min-h-[85vh] flex items-center justify-center">
        <div className="container relative z-10 flex flex-col items-center px-4 mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full shadow-lg bg-base-100/10 backdrop-blur-md border-base-100/20"
          >
            <span className="flex w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-base-100/90">
              New Creative Contests Live
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold leading-tight tracking-tight text-base-100 md:text-7xl"
          >
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-success">
              Creative Potential
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed md:text-xl text-base-100/80"
          >
            Join a community of innovators. Participate in design, writing, and
            tech challenges. Show your skills and win prizes.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl mt-10"
          >
            <form
              onSubmit={handleSubmit}
              className={`
                relative flex items-center p-2 rounded-2xl transition-all duration-300
                ${
                  isFocused
                    ? "bg-base-100/20 shadow-[0_0_40px_-10px_rgba(29,78,216,0.5)] border-base-100/30"
                    : "bg-base-100/10 shadow-xl border-base-100/10"
                }
                backdrop-blur-xl border
              `}
            >
              <div className="pl-4 text-base-100/60">
                <Search size={24} />
              </div>

              <input
                type="text"
                placeholder="Search contests... (e.g. Logo Design)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 px-4 py-3 text-lg bg-transparent outline-none text-base-100 placeholder-base-100/50"
              />

              <button
                type="submit"
                className="items-center hidden gap-2 px-8 py-3 font-semibold text-white transition-all shadow-lg md:flex bg-accent hover:bg-success rounded-xl hover:shadow-success/30"
              >
                Search
                <ArrowRight size={18} />
              </button>

              <button
                type="submit"
                className="p-3 md:hidden bg-accent text-base-100 rounded-xl"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Trending Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="flex items-center gap-1 text-sm text-base-100/70">
                <TrendingUp size={14} /> Trending:
              </span>

              {["UI/UX Design", "Copywriting", "3D Art", "React JS"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      if (onSearch) onSearch(tag);
                    }}
                    className="px-3 py-1 text-xs font-medium transition-colors border rounded-full md:text-sm bg-base-100/5 hover:bg-base-100/20 text-base-100/80 hover:text-base-100 border-base-100/10"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-neutral to-transparent"></div>
    </section>
  );
}
