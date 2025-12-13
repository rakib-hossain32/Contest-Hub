import React from "react";
import { motion } from "framer-motion";
import { Lock, Home, ArrowLeft, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router"; // Ensure react-router-dom

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden font-sans bg-base-100">
      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dynamic Glow: Blends Error (Red) with Primary (Navy/Blue) */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-error/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"></div>

        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-linear(currentColor 1px, transparent 1px), linear-linear(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            color: "var(--fallback-bc,oklch(var(--nc)))", // Uses theme neutral color
          }}
        ></div>

        {/* Noise Texture for Professional Finish */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* --- Main Glass Card --- */}
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg p-10 mx-auto border shadow-2xl bg-base-200/40 backdrop-blur-xl rounded-3xl border-base-content/5"
        >
          {/* Animated Lock Icon */}
          <div className="relative flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 p-6 border rounded-full shadow-lg bg-base-100/80 border-error/20 shadow-error/10"
            >
              <Lock size={64} className="text-error drop-shadow-md" />
              {/* Small accent badge */}
              <div className="absolute top-0 right-0 p-2 border-2 border-white rounded-full bg-accent animate-pulse"></div>
            </motion.div>

            {/* Pulsing Rings */}
            <div className="absolute w-32 h-32 delay-75 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-error/5 animate-ping"></div>
            <div className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-primary/5 animate-ping"></div>
          </div>

          {/* Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-black tracking-tighter text-transparent text-8xl bg-clip-text bg-linear-to-b from-neutral to-neutral/50"
          >
            403
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-2"
          >
            <ShieldAlert className="text-warning" size={24} />
            <h2 className="text-2xl font-bold tracking-wide text-neutral">
              Access Restricted
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-base leading-relaxed text-neutral/70"
          >
            You don't have permission to access this area.{" "}
            <br className="hidden sm:block" />
            Please check your credentials or contact support.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all border rounded-full cursor-pointer text-neutral bg-base-100 hover:bg-base-200 border-base-300 hover:border-primary/50 group"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all rounded-full shadow-lg cursor-pointer bg-linear-to-r from-primary to-secondary hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <Home size={18} />
              Back to Home
            </button>
          </motion.div>
        </motion.div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 font-mono text-xs text-neutral/40"
        >
          Error Code: 403_FORBIDDEN | ContestHub Security
        </motion.p>
      </div>
    </div>
  );
}
