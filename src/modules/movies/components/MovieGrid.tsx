"use client";

import { useSearchParams } from "next/navigation";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { MovieSearchItem } from "@/interface/movie.interface";
import NoMoviesFound from "@/shared/components/ui/NoMoviesFound";
import { motion } from "framer-motion";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s") || "";
  const { data, isLoading, isError, error } = useMovies(searchQuery);

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Failed to load movies or series. Please try again later.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-left max-w-3xl mx-auto text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        )}
      </div>
    );
  }

  const rawResults: MovieSearchItem[] = Array.isArray(data)
    ? data
    : data?.Search ?? [];

  const uniqueResults: MovieSearchItem[] = Array.from(
    new Map(rawResults.map((m) => [m.imdbID, m])).values()
  );

  if (uniqueResults.length === 0) {
    return (
      <div className="text-center py-24">
        <NoMoviesFound isSearchEmpty={!searchQuery} searchName={searchQuery} />
      </div>
    );
  }

  return (
    <section>
      <motion.div
        className="mb-8 flex flex-col items-center justify-center space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg text-lg sm:text-xl font-semibold tracking-wide inline-flex items-center gap-2">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            🎬
          </motion.span>
          <span>
            Found {uniqueResults.length} title
            {uniqueResults.length > 1 ? "s" : ""}{" "}
            {searchQuery ? `for "${searchQuery}"` : ""}
          </span>
        </div>

        <motion.p
          className="text-sm text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Browse your favorite movies or series, or explore something new!
        </motion.p>
      </motion.div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {uniqueResults.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>
    </section>
  );
}
