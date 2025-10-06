"use client";

import HeroSection from "@/features/movies/components/HeroSection";
import MovieGrid from "@/features/movies/components/MovieGrid";

export default function MoviesPage() {
  return (
    <div className="space-y-21 mt-26">
      <HeroSection />
      <MovieGrid />
    </div>
  );
}
