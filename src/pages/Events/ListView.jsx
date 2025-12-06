
import { motion, AnimatePresence } from "framer-motion";
import {

  Clock,
  ArrowRight,

} from "lucide-react";

export const ListView = ({ events, getCategoryColor, onDetails }) => {
  // Sort by date (Upcoming first)
  const sortedEvents = [...events].sort((a, b) => a.date - b.date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      {sortedEvents.map((event) => {
        const isPast = event.status === "past";
        return (
          <div
            key={event.id}
            className={`flex flex-col md:flex-row items-center bg-white p-5 rounded-xl shadow-sm border ${
              isPast
                ? "border-gray-100 bg-gray-50"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            } transition-all gap-6 group`}
          >
            {/* Date Box */}
            <div
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg ${
                isPast
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-50 text-[#1D4ED8]"
              }`}
            >
              <span className="text-xs font-bold uppercase">
                {event.date.toLocaleString("default", { month: "short" })}
              </span>
              <span className="text-xl font-bold">{event.date.getDate()}</span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center gap-2 mb-1 md:justify-start">
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category}
                </span>
                {isPast && (
                  <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                    Ended
                  </span>
                )}
              </div>
              <h3
                className={`text-lg font-bold ${
                  isPast ? "text-gray-500" : "text-[#111827]"
                }`}
              >
                {event.title}
              </h3>
              <p className="flex items-center justify-center gap-1 mt-1 text-sm text-gray-500 md:justify-start">
                <Clock size={14} /> 10:00 AM - 6:00 PM
              </p>
            </div>

            {/* Action */}
            <button
              onClick={() => onDetails(event.id)}
              disabled={isPast}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                isPast
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-2 border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white"
              }`}
            >
              {isPast ? "View Winners" : "View Details"}{" "}
              <ArrowRight size={16} />
            </button>
          </div>
        );
      })}
    </motion.div>
  );
};
