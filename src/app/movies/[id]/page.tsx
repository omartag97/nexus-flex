"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  Award,
  Globe2,
  DollarSign,
  Languages,
  Gauge,
} from "lucide-react";
import { getMovieDetails } from "@/services/movies.api";
import { InfoCard } from "@/features/movies/components/InfoCard";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/badge";

interface MovieRating {
  Source: string;
  Value: string;
}

interface Movie {
  Title: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: MovieRating[];
  Metascore?: string;
  imdbRating?: string;
  BoxOffice?: string;
}

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("s")?.trim() || "";

  function goBackToMovies() {
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
        return;
      }
    } catch {}
    const last = typeof window !== "undefined" ? urlQuery : null;
    router.push(last ? `/movies?s=${encodeURIComponent(last)}` : "/movies");
  }

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex flex-col md:flex-row gap-8 pt-16">
        <Skeleton className="w-full md:w-80 h-[480px] rounded-xl" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );

  if (error || !movie)
    return (
      <div className="text-center pt-16">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Button onClick={goBackToMovies}>Back to Movies</Button>
      </div>
    );

  return (
    <main className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-start"
      >
        <Button
          onClick={goBackToMovies}
          variant="outline"
          className="group flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
                     border border-indigo-500/30 hover:from-indigo-500/20 
                     hover:to-purple-500/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-500 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-indigo-600 dark:text-indigo-300 font-medium">
            Back to Movies
          </span>
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {movie.Poster && movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={400}
              height={600}
              priority
              className="w-full h-auto rounded-lg object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <Skeleton className="w-full h-[600px]" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-8 md:col-span-2"
        >
          <div>
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              {movie.imdbRating && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                >
                  <Star className="w-4 h-4 fill-yellow-500" />
                  {movie.imdbRating}
                </Badge>
              )}
              {movie.Year && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {movie.Year}
                </Badge>
              )}
              {movie.Runtime && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {movie.Runtime}
                </Badge>
              )}
              {movie.Metascore && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-green-500/30 text-green-600 dark:text-green-400"
                >
                  <Gauge className="w-4 h-4" /> Metascore: {movie.Metascore}
                </Badge>
              )}
            </div>
          </div>

          {movie.Plot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {movie.Plot}
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {movie.Genre && <InfoCard label="Genre" value={movie.Genre} />}
            {movie.Director && (
              <InfoCard label="Director" value={movie.Director} />
            )}
            {movie.Writer && <InfoCard label="Writer" value={movie.Writer} />}
            {movie.Actors && <InfoCard label="Actors" value={movie.Actors} />}
            {movie.Language && (
              <InfoCard
                label="Language"
                value={movie.Language}
                icon={<Languages className="w-4 h-4 text-blue-500" />}
              />
            )}
            {movie.Country && (
              <InfoCard
                label="Country"
                value={movie.Country}
                icon={<Globe2 className="w-4 h-4 text-teal-500" />}
              />
            )}
            {movie.Awards && (
              <InfoCard
                label="Awards"
                value={movie.Awards}
                icon={<Award className="w-4 h-4 text-yellow-500" />}
              />
            )}
            {movie.BoxOffice && (
              <InfoCard
                label="Box Office"
                value={movie.BoxOffice}
                icon={<DollarSign className="w-4 h-4 text-green-500" />}
              />
            )}
          </div>

          {Array.isArray(movie.Ratings) && movie.Ratings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6"
            >
              <h2 className="text-xl font-semibold mb-3">Ratings</h2>
              <div className="flex flex-wrap gap-3">
                {movie.Ratings.map((r: MovieRating) => (
                  <Badge
                    key={r.Source}
                    variant="secondary"
                    className="bg-zinc-100 dark:bg-zinc-800 text-sm px-3 py-1"
                  >
                    {r.Source}:{" "}
                    <span className="font-medium ml-1">{r.Value}</span>
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
