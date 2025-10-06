"use client";

import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieCardSkeletonList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
