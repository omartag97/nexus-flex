"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useMovies } from "@/hooks/useMovies";

import { motion } from "framer-motion";

import Autoplay from "embla-carousel-autoplay";

import { MovieSearchItem } from "@/interface/movie.interface";

import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

import NoMoviesFound from "@/shared/components/ui/NoMoviesFound";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/Carousel";

import { AlertTriangle } from "lucide-react";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("s")?.trim() || "";

  const [effectiveQuery, setEffectiveQuery] = useState(urlQuery);

  useEffect(() => {
    const lastSearch =
      urlQuery || sessionStorage.getItem("movies:lastSearch") || "";
    setEffectiveQuery(lastSearch);

    if (lastSearch) {
      sessionStorage.setItem("movies:lastSearch", lastSearch);
    }
  }, [urlQuery]);

  const { data, isLoading, isError, error } = useMovies(effectiveQuery);

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
          className="text-sm text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Browse your favorite movies or series, or explore something new!
        </motion.p>
      </motion.div>

      <Carousel
        className="relative w-full max-w-6xl mx-auto"
        plugins={[Autoplay({ delay: 2500 })]}
      >
        <CarouselContent className="gap-4">
          {uniqueResults.map((movie) => (
            <CarouselItem key={movie.imdbID} className="flex-[0_0_25%]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieCard {...movie} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
