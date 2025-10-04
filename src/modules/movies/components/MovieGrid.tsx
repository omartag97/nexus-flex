"use client";

import { useSearchParams } from "next/navigation";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { MovieSearchItem } from "@/interface/movie.interface";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s") || "batman";
  const { data, isLoading, isError, error } = useMovies(searchQuery);

  // 🌀 Loading state
  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // ⚠️ Error state
  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Failed to load movies. Please try again later.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-left max-w-3xl mx-auto text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error instanceof Error ? error.message : JSON.stringify(error)}
          </pre>
        )}
      </div>
    );
  }

  // 🧩 Normalize + deduplicate movie data
  const rawResults: MovieSearchItem[] = Array.isArray(data)
    ? data
    : data?.Search ?? [];

  const uniqueResults: MovieSearchItem[] = Array.from(
    new Map(rawResults.map((m) => [m.imdbID, m])).values()
  );

  // 📭 Empty state
  if (uniqueResults.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500 dark:text-zinc-400">
          No movies found. Try searching for something else.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-left max-w-3xl mx-auto text-xs bg-white/5 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  // 🎬 Movie list
  return (
    <section>
      <div className="mb-4 text-sm text-zinc-500 text-center">
        Results:{" "}
        <strong className="text-zinc-800 dark:text-zinc-200">
          {uniqueResults.length}
        </strong>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {uniqueResults.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="col-span-full mt-6 text-left max-w-5xl mx-auto text-xs bg-white/5 p-4 rounded">
          <details>
            <summary className="cursor-pointer">
              Raw API response (click to expand)
            </summary>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </section>
  );
}
