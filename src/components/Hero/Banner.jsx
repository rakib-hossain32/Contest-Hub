import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import { Link } from "react-router";

export default function Banner({ onSearch }) {
  const axiosSecure = useAxiosSecure();

  
  const [query, setQuery] = useState("");

 
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [query]);


  const { data: findContests = [], isLoading } = useQuery({
   
    queryKey: ["search-contests", debouncedQuery],
    queryFn: async () => {
     
      if (!debouncedQuery) return [];

      const res = await axiosSecure.get(
        `/contests/all-users/search?searchText=${debouncedQuery}`
      );
      return res.data;
    },
    
    enabled: !!debouncedQuery,
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setShowDropdown(false); 
  };

 
  const handleTagClick = (tag) => {
    setQuery(tag); 
    setDebouncedQuery(tag); 
    setShowDropdown(true);
  };

  
  const blobVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.05, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[550px] flex items-center justify-center bg-[#0f172a] z-20">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-[#1D4ED8] via-[#0f172a] to-[#8B5CF6] opacity-95"></div>
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
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-[#0f172a]/80"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="container relative z-50 flex flex-col items-center px-4 mx-auto mt-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group cursor-default flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <Sparkles size={14} className="text-[#10B981] animate-pulse" />
          <span className="text-xs font-medium text-white/90">
            Join 10k+ Creators Today
          </span>
        </motion.div>

        <h1 className="mb-5 text-4xl font-extrabold text-white md:text-6xl">
          Unleash Your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#10B981] via-[#34D399] to-[#1D4ED8]">
            Creative Potential
          </span>
        </h1>

        <p className="max-w-xl mx-auto mb-8 text-gray-300">
          Explore thousands of design, coding, and writing contests.
        </p>

        {/* --- Search Bar Container --- */}
        <motion.div className="relative w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className={`
              relative flex items-center p-1.5 rounded-full transition-all duration-300 z-50
              ${
                isFocused || (findContests.length > 0 && showDropdown)
                  ? "bg-[#0f172a] shadow-[0_0_30px_rgba(16,185,129,0.15)] border-[#10B981]/40 scale-[1.01]"
                  : "bg-white/5 shadow-xl border-white/10 hover:border-white/20"
              }
              backdrop-blur-xl border
            `}
          >
            <div className="pl-5 text-gray-400">
              {isLoading ? (
                <Loader2 size={20} className="animate-spin text-[#10B981]" />
              ) : (
                <Search size={20} />
              )}
            </div>

            <input
              type="text"
              placeholder="Find your next challenge..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => {
                setIsFocused(true);
                setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="flex-1 px-4 py-3 text-base font-medium text-white bg-transparent outline-none"
            />

            <button
              type="submit"
              className="hidden md:flex items-center px-6 py-2.5 bg-[#10B981] text-white rounded-full hover:bg-[#059669] transition-all"
            >
              Search
            </button>
          </form>

          {/* --- Results Dropdown --- */}
          <AnimatePresence>
        
            {showDropdown && findContests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-60 text-left mt-2 max-h-[300px] overflow-y-auto custom-scrollbar"
              >
                <ul>
                  {findContests.map((contest) => (
                    <Link
                      to={`/contest/${contest._id}`}
                      key={contest._id} 
                      onClick={() => {
                        setQuery(contest.name); 
                        setShowDropdown(false);
                       
                      }}
                      className="flex flex-wrap items-center w-full p-4 transition-colors border-b shadow-sm cursor-pointer bg-base-100 hover:bg-white/10 border-white/5 last:border-none"
                    >
                      <img
                        
                        src={
                          contest.image ||
                          "https://readymadeui.com/profile_3.webp"
                        }
                        alt="contest"
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 ml-4">
                        <p className="text-sm font-semibold text-gray-200">
                          
                          {contest.name}
                        </p>
                        <div className="flex gap-4">
                          <p className="mt-0.5 text-xs text-gray-400">
                            
                            {contest.type}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            
                            {contest.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Tags */}
          <div className="relative z-40 flex flex-wrap items-center justify-center mt-5 gap-x-4 gap-y-2">
            <span className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-400 uppercase">
              <TrendingUp size={12} /> Trending:
            </span>

            {["Photography", "Programming", "Business", "Design"].map((tag) => (
              <button
                key={tag}
                type="button" 
                onClick={() => handleTagClick(tag)}
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
