"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/components/ui/Button";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/EG-en-20250929-TRIFECTA-perspective_ea9e81ae-3622-4bff-af55-38e170b0bccc_large.jpg"
          alt="Cinematic background"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 max-w-2xl flex flex-col items-center space-y-4 sm:space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight"
        >
          nexus
          <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
            Flex
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-200 max-w-lg"
        >
          Discover and explore movies with advanced search
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="/movies" passHref>
            <Button
              size="lg"
              className="text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Browse Movies
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}
