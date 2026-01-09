import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, Filter, Search, Lock } from "lucide-react";
import ContestCard from "../../components/ContestCard/ContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader/Loader";

// --- Mock Data (Admin Approved Contests) ---
// const allContestsData = [
//   {
//     id: 101,
//     name: "Minimalist Logo Creation",
//     category: "Design",
//     image:
//       "https://images.unsplash.com/photo-1626785774573-4b799314348d?auto=format&fit=crop&w=800&q=80",
//     participants: 120,
//     description:
//       "Design a clean, memorable logo for a FinTech startup focusing on security.",
//     deadline: "2 Days left",
//   },
//   {
//     id: 102,
//     name: "Sci-Fi Short Story",
//     category: "Writing",
//     image:
//       "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
//     participants: 85,
//     description:
//       "Write a 2000-word story set in a post-apocalyptic world where plants rule.",
//     deadline: "5 Days left",
//   },
//   {
//     id: 103,
//     name: "SaaS Dashboard UI",
//     category: "Design",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
//     participants: 230,
//     description: "Create a dark-mode dashboard for a data analytics platform.",
//     deadline: "1 Week left",
//   },
//   {
//     id: 104,
//     name: "React Native App Challenge",
//     category: "Development",
//     image:
//       "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
//     participants: 150,
//     description:
//       "Build a fitness tracking app with geolocation features using React Native.",
//     deadline: "3 Days left",
//   },
//   {
//     id: 105,
//     name: "Portrait Photography",
//     category: "Photography",
//     image:
//       "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
//     participants: 95,
//     description:
//       "Capture raw emotions in black and white portrait photography.",
//     deadline: "12 Hours left",
//   },
//   {
//     id: 106,
//     name: "Python AI Chatbot",
//     category: "Development",
//     image:
//       "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
//     participants: 310,
//     description:
//       "Develop a customer support chatbot using Python and OpenAI API.",
//     deadline: "4 Days left",
//   },
//   {
//     id: 107,
//     name: "Travel Blog Writing",
//     category: "Writing",
//     image:
//       "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80",
//     participants: 60,
//     description: "Share your best travel experience in a hidden gem location.",
//     deadline: "6 Days left",
//   },
// ];

const categories = [
  "All",
  "Photography",
  "DataScience",
  "Video",
  "Marketing",
  "AI",
  "Programming",
  "Article",
  "Gaming",
  "Design",
  "Medical",
  "Business",
];

export default function AllContests() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [priceRange, setPriceRange] = useState(5000); // Max prize money
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests", "approved", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/all-users?status=Confirmed");
      return res.data;
    },
  });

  // Filter & Sort Logic
  const processedContests = contests
    .filter((contest) => {
      const contestType = contest.type ? contest.type.toLowerCase() : "";
      const matchesCategory =
        activeTab === "All" || contestType.includes(activeTab.toLowerCase());
      const matchesSearch = contest.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice = (contest.prizeMoney || 0) <= priceRange;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "prize-high") return b.prizeMoney - a.prizeMoney;
      if (sortBy === "prize-low") return a.prizeMoney - b.prizeMoney;
      if (sortBy === "deadline-soon")
        return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(processedContests.length / itemsPerPage);
  const paginatedContests = processedContests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading || isLoading) {
    return (
      <div className="container px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="flex flex-col gap-4 p-4 border h-80 bg-base-100 rounded-2xl border-base-200"
            >
              <div className="w-full h-40 rounded-xl bg-base-200 animate-pulse"></div>
              <div className="w-3/4 h-6 rounded-lg bg-base-200 animate-pulse"></div>
              <div className="w-full h-4 rounded-lg bg-base-200 animate-pulse"></div>
              <div className="w-1/2 h-10 mt-auto rounded-lg bg-base-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-base-100">
      {/* --- Header Section --- */}
      <div className="bg-[#111827] text-white pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D4ED8] opacity-20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B5CF6] opacity-20 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="container relative z-10 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Explore All Contests
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Discover challenges that match your skills. Filter by category,
            participate, and win exciting prizes.
          </p>
        </div>
      </div>

      {/* --- Filter & Content Section --- */}
      <div className="container relative z-20 px-4 mx-auto -mt-8 md:px-6">
        {/* Controls Container */}
        <div className="p-6 mb-10 border shadow-xl bg-base-100 border-base-300 rounded-3xl">
          <div className="flex flex-col gap-8">
            {/* Top Row: Search & Sort */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute -translate-y-1/2 text-base-content/60 left-4 top-1/2"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by contest name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-base-300 bg-base-100 text-base-content focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              </div>

              <div className="flex items-center w-full gap-3 md:w-auto">
                <Filter size={18} className="text-primary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:w-60 px-4 py-3 rounded-2xl border border-base-300 bg-base-100 text-base-content outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="prize-high">Prize: High to Low</option>
                  <option value="prize-low">Prize: Low to High</option>
                  <option value="deadline-soon">Deadline: Soonest</option>
                </select>
              </div>
            </div>

            {/* Bottom Row: Tabs & Price Range */}
            <div className="flex flex-col gap-6 lg:items-end lg:flex-row">
              <div className="flex flex-wrap flex-1 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${activeTab === cat
                      ? "bg-primary text-primary-content border-primary shadow-lg shadow-primary/20"
                      : "bg-base-200 text-base-content border-transparent hover:bg-base-300"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full p-4 border lg:w-72 bg-base-200/50 rounded-2xl border-base-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-base-content/60">
                    Max Prize: ${priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg cursor-pointer accent-primary bg-base-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Contest Grid --- */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {paginatedContests.length > 0 ? (
              paginatedContests.map((contest) => (
                <ContestCard key={contest._id} contest={contest} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center col-span-full border-2 border-dashed border-base-300 rounded-3xl bg-base-200/30"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-base-100 text-base-content/20">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-base-content">
                  No matching contests found
                </h3>
                <p className="mt-2 text-base-content/60">
                  Try adjusting your filters or searching for something else.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery("");
                    setPriceRange(5000);
                  }}
                  className="mt-6 font-bold text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 font-bold transition border rounded-xl border-base-300 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                    : "border border-base-300 hover:bg-base-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 font-bold transition border rounded-xl border-base-300 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
