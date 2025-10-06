"use client";

import { motion } from "framer-motion";

import { useScrollDirection } from "@/shared/hooks/useScrollDirection";

import { Logo } from "./Logo";

import { NAVBAR_ANIMATION } from "@/constants/navbar";

import { ModeToggle } from "../system/ModeToggle";

export default function Navbar() {
  const scrollDirection = useScrollDirection();

  return (
    <motion.header
      initial={NAVBAR_ANIMATION.initial}
      animate={{
        y:
          scrollDirection === "down"
            ? NAVBAR_ANIMATION.animate.down.y
            : NAVBAR_ANIMATION.animate.up.y,
        opacity:
          scrollDirection === "down"
            ? NAVBAR_ANIMATION.animate.down.opacity
            : NAVBAR_ANIMATION.animate.up.opacity,
      }}
      transition={NAVBAR_ANIMATION.transition}
      className="
        fixed inset-x-0 top-0 py-3 z-30 w-full max-w-3xl mx-auto
        flex justify-center md:top-6 my-2 shadow-sm rounded-2xl 
        backdrop-blur-sm
        bg-white/30 border border-white/20
        dark:bg-black/30 dark:border-white/10
        transition-colors duration-300
      "
    >
      <nav className="w-full px-4 relative" aria-label="Main navigation">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto">
            <Logo />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden md:block md:w-1/3" />

          <div className="flex items-center justify-end gap-3 md:w-1/3">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
