"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react"; // modern icon

interface NoMoviesFoundProps {
  isSearchEmpty?: boolean;
  searchName?: string;
}

export default function NoMoviesFound({
  isSearchEmpty,
  searchName,
}: NoMoviesFoundProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-24">
      {/* Animated arrow pointing upward when search is empty */}
      {isSearchEmpty && (
        <motion.div
          className="absolute -top-16"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 15l-7-7-7 7"
            />
          </svg>
        </motion.div>
      )}

      {/* Animated icon depending on state */}
      <motion.div
        className="mb-4 text-zinc-700 dark:text-zinc-300"
        animate={{
          scale: [0.9, 1.1, 1],
          rotate: isSearchEmpty ? [0, 0, 0] : [-10, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        {isSearchEmpty ? (
          <Film size={64} className="text-indigo-500" />
        ) : (
          <span className="text-6xl">❌</span>
        )}
      </motion.div>

      {/* Animated message */}
      <motion.p
        className="text-center text-xl font-semibold text-zinc-700 dark:text-zinc-300 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {isSearchEmpty
          ? "🎬 Lights, camera… start your search above!"
          : `No movies or series found for “${searchName}”.`}
      </motion.p>
    </div>
  );
}
