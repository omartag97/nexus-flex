"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("s") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies?s=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="text-center max-w-2xl mx-auto mb-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">
        nexus<span className="text-blue-500">movies</span>
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        Discover and explore movies with advanced search and filtering
      </p>
      <form
        onSubmit={handleSearch}
        className="relative w-full max-w-lg mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies, series, genres..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </form>
    </section>
  );
}
