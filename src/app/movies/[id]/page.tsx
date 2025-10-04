"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/modules/movies/services/movies.api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function MovieDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-64 h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="space-y-2">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Link href="/movies">
          <Button>Back to Movies</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/movies" className="inline-flex items-center gap-2 mb-8 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Movies
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={400}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-zinc-400">No Image</span>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              {movie.imdbRating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{movie.imdbRating}</span>
                </div>
              )}
              {movie.Year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>
              )}
              {movie.Runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.Runtime}</span>
                </div>
              )}
            </div>
          </div>

          {movie.Plot && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{movie.Plot}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {movie.Genre && (
              <div>
                <h3 className="font-semibold mb-1">Genre</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{movie.Genre}</p>
              </div>
            )}
            {movie.Director && (
              <div>
                <h3 className="font-semibold mb-1">Director</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{movie.Director}</p>
              </div>
            )}
            {movie.Writer && (
              <div>
                <h3 className="font-semibold mb-1">Writer</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{movie.Writer}</p>
              </div>
            )}
            {movie.Actors && (
              <div>
                <h3 className="font-semibold mb-1">Actors</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{movie.Actors}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
