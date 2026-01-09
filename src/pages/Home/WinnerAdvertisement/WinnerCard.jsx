
import { motion } from "framer-motion";
import {  DollarSign, Sparkles } from "lucide-react";


export const WinnerCard = ({ winner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="relative p-1 overflow-hidden border bg-linear-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl border-white/10 group"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#1D4ED8]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative border bg-white/5 border-primary/10 rounded-[22px] p-6 h-full flex flex-col items-center text-center">
        {/* Crown Icon */}
        <div className="absolute text-yellow-400 top-4 right-4 animate-bounce-slow">
          <Sparkles size={20} />
        </div>

        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-24 h-24 p-1 rounded-full bg-linear-to-r from-yellow-400 via-orange-500 to-red-500">
            <img
              src={winner.image}
              alt={winner.name}
              className="w-full h-full object-cover rounded-full border-4 border-[#1f2937]"
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <DollarSign size={10} /> {winner.prize} Won
          </div>
        </div>

        {/* Content */}
        <h3 className="mb-1 text-xl font-bold text-white">{winner.name}</h3>
        <p className="text-[#8B5CF6] text-sm font-medium mb-4">{winner.role}</p>

        <div className="w-full h-px mb-4 bg-gray-700"></div>

        <p className="mb-4 text-sm italic text-gray-400 grow">
          "{winner.quote}"
        </p>

        <div className="w-full px-4 py-2 mt-auto rounded-lg bg-base-300/50">
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            Winner of
          </p>
          <p className="text-sm font-semibold text-neutral truncate">
            {winner.contest}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
