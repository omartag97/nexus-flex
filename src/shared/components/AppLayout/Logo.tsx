"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/movies" className="inline-block">
      <h1 className="text-lg md:text-xl font-bold select-none">
        <span className="text-slate-900 dark:text-white">Nexus</span>
        <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-300">
          Flex
        </span>
      </h1>
    </Link>
  );
}
