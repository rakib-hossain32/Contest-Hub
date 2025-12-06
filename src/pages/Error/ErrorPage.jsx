

import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden bg-base-100 text-neutral">
      {/* 404 Number */}
      <motion.h1
        className="mb-4 font-extrabold text-9xl text-primary"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        404
      </motion.h1>

      {/* Heading */}
      <motion.h2
        className="mb-2 text-3xl font-bold md:text-4xl text-secondary"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! Page not found
      </motion.h2>

      {/* Description */}
      <motion.p
        className="max-w-lg mb-6 text-lg text-center md:text-xl text-neutral/70 text-"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block px-6 py-3 font-semibold transition-all duration-300 rounded-lg shadow-lg bg-accent text-base-100 hover:shadow-xl hover:-translate-y-1"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Decorative Animated Blobs */}
      <motion.div
        className="absolute w-40 h-40 rounded-full -bottom-10 -left-10 bg-primary/20"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
      ></motion.div>

      <motion.div
        className="absolute rounded-full -top-20 -right-20 w-72 h-72 bg-secondary/20"
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
      ></motion.div>
    </div>
  );
}
