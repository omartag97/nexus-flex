"use client";

import HeroSection from "@/features/movies/components/HeroSection";
import MovieGrid from "@/features/movies/components/MovieGrid";

export default function MoviesPage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <HeroSection />
      <MovieGrid />
    </main>
  );
}
