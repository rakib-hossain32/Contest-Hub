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
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests", "approved", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/all-users?status=Confirmed");
      return res.data;
    },
  });

  // console.log(contests);

  // Mock Auth (Replace with Context)
  // const isLoggedIn = false;

  // Filter Logic
  // const filteredContests = contests.filter((contest) => {
  //   const matchesCategory = activeTab === "All" || contest.type === activeTab;
  //   const matchesSearch = contest.name
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });
  // Filter Logic
  // Filter Logic
  const filteredContests = contests.filter((contest) => {
    // Make sure contest.type exists and is a string
    const contestType = contest.type ? contest.type.toLowerCase() : "";

    const matchesCategory =
      activeTab === "All" || contestType.includes(activeTab.toLowerCase());

    const matchesSearch = contest.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // const handleDetailsClick = (id) => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     navigate(`/contest/${id}`);
  //   }
  // };

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pb-20">
      {/* --- Header Section --- */}
      <div className="bg-[#111827] text-white pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Abstract Background */}
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
        <div className="p-4 mb-10 border shadow-xl bg-base-100 border-base-300 rounded-2xl md:p-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center w-full gap-2 md:justify-start md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeTab === cat
                      ? "bg-primary text-primary-content border-primary shadow-md shadow-primary/20"
                      : "bg-base-200 text-base-content border-base-300 hover:bg-base-300 hover:border-base-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                className="absolute -translate-y-1/2 text-base-content/60 left-3 top-1/2"
                size={18}
              />

              <input
                type="text"
                placeholder="Search contests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-base-300 
                   bg-base-100 text-base-content
                   focus:border-primary focus:ring-2 focus:ring-primary/20
                   outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* --- Contest Grid --- */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredContests.length > 0 ? (
              filteredContests.map((contest) => (
                <ContestCard
                  key={contest._id}
                  contest={contest}
                  // onDetails={() => handleDetailsClick(contest.id)}
                />
              ))
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center col-span-full"
              >
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-neutral text-base-100">
                  <Filter size={32} />
                </div>
                <h3 className="text-xl font-semibold ">
                  No contests found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters or search query.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
