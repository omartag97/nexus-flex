"use client";

import HeroSection from "@/app/feature/components/HeroSection";
import MovieGrid from "@/app/feature/components/MovieGrid";

export default function MoviesPage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <HeroSection />
      <MovieGrid />
    </main>
  );
}
