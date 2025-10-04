import MovieCardSkeleton from "@/modules/movies/components/MovieCardSkeletonList.tsx/MovieCardSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
