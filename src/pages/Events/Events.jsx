import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  List,
  Search,
  Filter,
  Clock,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router";
import { CalendarView } from "./CalendarView";
import { ListView } from "./ListView";

// --- Mock Data ---
const eventsData = [
  {
    id: 1,
    title: "Global UI Challenge",
    date: new Date(2025, 11, 15), // Dec 15, 2025
    category: "Design",
    type: "online",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Speed Coding Round",
    date: new Date(2025, 11, 20),
    category: "Development",
    type: "online",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Sci-Fi Story Writing",
    date: new Date(2025, 11, 10),
    category: "Writing",
    type: "online",
    status: "past", // Past event
  },
  {
    id: 4,
    title: "Logo Design War",
    date: new Date(2025, 11, 25),
    category: "Design",
    type: "online",
    status: "upcoming",
  },
];

const categories = ["All", "Design", "Development", "Writing"];

export default function Events() {
  const navigate = useNavigate();
  const [view, setView] = useState("calendar"); // 'calendar' | 'list'
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Default to Dec 2025 for demo
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedIn = false; // Mock Auth

  // --- Helpers ---
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Design":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "Development":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Writing":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDetails = (id) => {
    if (!isLoggedIn) navigate("/login");
    else navigate(`/contest/${id}`);
  };

  // Filter Logic
  const filteredEvents = eventsData.filter((event) => {
    const matchCat =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* --- Header & Controls --- */}
      <div className="px-4 pt-24 pb-8 border-b border-gray-200 bg-base-100 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 mb-8 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-neutral">
                Contest Calendar
              </h1>
              <p className="mt-1 text-gray-500">
                Plan ahead and never miss a challenge.
              </p>
            </div>

            {/* View Toggles */}
            <div className="flex p-1 rounded-lg bg-base-100">
              <button
                onClick={() => setView("calendar")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                  view === "calendar"
                    ? "bg-white shadow text-[#1D4ED8]"
                    : "text-gray-500"
                }`}
              >
                <Calendar size={16} /> Calendar
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                  view === "list"
                    ? "bg-white shadow text-[#1D4ED8]"
                    : "text-gray-500"
                }`}
              >
                <List size={16} /> List View
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col items-center gap-4 bg-base-100 md:flex-row">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
                size={18}
              />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1D4ED8] outline-none"
              />
            </div>

            <div className="flex w-full gap-2 pb-2 overflow-x-auto md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container px-4 py-8 mx-auto md:px-6">
        <AnimatePresence mode="wait">
          {view === "calendar" ? (
            <CalendarView
              key="calendar"
              currentDate={currentDate}
              events={filteredEvents}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
              getCategoryColor={getCategoryColor}
              onEventClick={handleDetails}
            />
          ) : (
            <ListView
              key="list"
              events={filteredEvents}
              getCategoryColor={getCategoryColor}
              onDetails={handleDetails}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
