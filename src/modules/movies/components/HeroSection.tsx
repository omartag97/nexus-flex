"use client";

import { useState } from "react";

import { Search } from "lucide-react";

import { useQueryState, parseAsString } from "nuqs";

import { motion } from "framer-motion";

import { useDebouncedEffect } from "@/shared/hooks/useDebouncedEffect";

import { GlowEffect } from "@/shared/components/motion/GlowEffect";

export default function HeroSection() {
  const [searchParam, setSearchParam] = useQueryState(
    "s",
    parseAsString.withOptions({ history: "replace" }).withDefault("")
  );

  const [searchQuery, setSearchQuery] = useState(searchParam);

  useDebouncedEffect(
    () => {
      if (searchQuery.trim() !== searchParam) {
        setSearchParam(searchQuery.trim());
      }
    },
    [searchQuery],
    400
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParam(searchQuery.trim());
    }
  };

  return (
    <section className="relative text-center max-w-2xl mx-auto mt-32 mb-12 px-4">
      <GlowEffect
        colors={["#6366F1", "#EC4899", "#06B6D4", "#F59E0B"]}
        mode="colorShift"
        blur="strong"
        duration={3.5}
        scale={1.1}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-4xl sm:text-5xl font-bold mb-6 text-zinc-900 dark:text-white"
      >
        Discover Your Next Movie
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 text-zinc-500 dark:text-zinc-400 mb-8"
      >
        Search for movies, series, or genres across thousands of titles.
      </motion.p>

      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <motion.input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies, series, genres..."
            whileFocus={{ scale: 1.02 }}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </motion.form>
    </section>
  );
}
