import { motion,  } from "framer-motion";
export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer Ring */}
        <motion.span
          className="absolute w-full h-full border-4 border-t-[#1D4ED8] border-r-[#8B5CF6] border-b-[#10B981] border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.span>

        {/* Inner Ring (Reverse) */}
        <motion.span
          className="absolute w-16 h-16 border-4 border-t-[#8B5CF6] border-r-[#10B981] border-b-transparent border-l-[#1D4ED8] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        ></motion.span>

        {/* Center Glow */}
        <motion.div
          className="w-4 h-4 bg-linear-to-tr from-blue-600 to-purple-600 rounded-full shadow-[0_0_15px_rgba(29,78,216,0.8)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        ></motion.div>
      </div>
    </div>
  );
}
