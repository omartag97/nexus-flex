"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔹 Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/EG-en-20250929-TRIFECTA-perspective_ea9e81ae-3622-4bff-af55-38e170b0bccc_large.jpg"
          alt="Cinematic background"
          fill
          priority
          quality={90}
          className="object-cover"
        />

        {/* 🔹 Overlay gradient for dark tone like Netflix */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      </div>

      {/* 🔹 Hero Content */}
      <div className="text-center text-white px-4 space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
          nexus<span className="text-blue-500">movies</span>
        </h1>

        <p className="text-lg md:text-2xl text-zinc-200">
          Discover and explore movies with advanced search and filtering
        </p>

        <Link href="/movies">
          <Button
            size="lg"
            className="text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Browse Movies
          </Button>
        </Link>
      </div>

      {/* 🔹 Bottom fade to blend with next sections */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}
