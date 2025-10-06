"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import { useMovies } from "@/services/movies.api";
import { MovieSearchItem } from "@/interface/movie.interface";

import Loading from "@/app/movies/loading";

import MovieCard from "./MovieCard";

import NoMoviesFound from "@/shared/components/ui/NoMoviesFound";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("s")?.trim() || "";

  const [effectiveQuery, setEffectiveQuery] = useState(urlQuery);

  useEffect(() => {
    const lastSearch = urlQuery || "";
    setEffectiveQuery(lastSearch);
  }, [urlQuery]);

  const { data, isLoading, isError, error } = useMovies(effectiveQuery);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
        <p className="text-lg font-medium text-red-600 dark:text-red-400">
          Failed to load movies or series.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Please try again later.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-left max-w-3xl mx-auto text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        )}
      </div>
    );
  }

  const results: MovieSearchItem[] = Array.isArray(data) ? data : [];
  const uniqueResults = Array.from(
    new Map(results.map((m) => [m.imdbID, m])).values()
  );

  if (uniqueResults.length === 0) {
    return (
      <div className="text-center py-24">
        <NoMoviesFound
          isSearchEmpty={!effectiveQuery}
          searchName={effectiveQuery}
        />
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
          Found {uniqueResults.length} title
          {uniqueResults.length > 1 ? "s" : ""}{" "}
          {effectiveQuery ? `for "${effectiveQuery}"` : ""}
        </div>

        <motion.p
          className="text-center max-w-md px-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          Browse your favorite movies or series, or explore something new!
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {uniqueResults.map((movie) => (
          <motion.div
            key={movie.imdbID}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard {...movie} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
