
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,

} from "lucide-react";

export const CalendarView = ({
  currentDate,
  events,
  onPrev,
  onNext,
  getCategoryColor,
  onEventClick,
}) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Generate calendar grid
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null); // Empty slots
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-[#111827]">{monthName}</h2>
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="py-3 text-xs font-semibold tracking-wide text-center text-gray-400 uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-[120px] divide-x divide-y divide-gray-100">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="bg-gray-50/30"></div>;

          const dateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const dayEvents = events.filter(
            (e) => e.date.toDateString() === dateObj.toDateString()
          );

          return (
            <div
              key={idx}
              className="relative p-2 transition-colors hover:bg-blue-50/30 group"
            >
              <span
                className={`text-sm font-medium ${
                  dayEvents.length > 0 ? "text-[#1D4ED8]" : "text-gray-500"
                }`}
              >
                {day}
              </span>

              <div className="mt-2 space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className={`text-[10px] px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 border ${getCategoryColor(
                      event.category
                    )} ${
                      event.status === "past" ? "opacity-50 grayscale" : ""
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
