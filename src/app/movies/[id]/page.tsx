"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Star, Calendar, Clock } from "lucide-react";

import { getMovieDetails } from "@/modules/movies/services/movies.api";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  function goBackToMovies() {
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
        return;
      }
    } catch {}
    const last =
      typeof window !== "undefined"
        ? sessionStorage.getItem("movies:lastSearch")
        : null;
    router.push(last ? `/movies?s=${encodeURIComponent(last)}` : "/movies");
  }

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-80 h-[480px] rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Button onClick={goBackToMovies} variant="default">
          Back to Movies
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          onClick={goBackToMovies}
          variant="outline"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300"
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
            {movie.Genre && <InfoBlock label="Genre" value={movie.Genre} />}
            {movie.Director && (
              <InfoBlock label="Director" value={movie.Director} />
            )}
            {movie.Writer && <InfoBlock label="Writer" value={movie.Writer} />}
            {movie.Actors && <InfoBlock label="Actors" value={movie.Actors} />}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// ✅ Reusable InfoBlock component for clean design
function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40 backdrop-blur-sm"
    >
      <h3 className="font-semibold mb-1 text-zinc-800 dark:text-zinc-200">
        {label}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">{value}</p>
    </motion.div>
  );
}
