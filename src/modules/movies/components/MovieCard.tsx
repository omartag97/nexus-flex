"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MovieSearchItem } from "@/interface/movie.interface";
import { Skeleton } from "@/shared/components/ui/Skeleton";

const MovieCard = memo(function MovieCard(movie: MovieSearchItem) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${movie.imdbID}`);
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow">
        <div className="aspect-[2/3] relative">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 mb-1">
            {movie.Title}
          </h3>
          <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
            <span>{movie.Year}</span>
            <span className="capitalize">{movie.Type}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default MovieCard;
