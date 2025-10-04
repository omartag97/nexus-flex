"use client";

import { motion } from "framer-motion";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import { BackButton } from "./BackButton";
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
        bg-white border border-zinc-200
        dark:bg-[hsl(217.2,32.6%,10%)] dark:border-[hsl(217.2,32.6%,13%)]
        transition-colors duration-300
      "
    >
      <nav className="w-full px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0 w-9 lg:w-18 relative">
            <BackButton />
          </div>
          <div className="md:flex md:items-center md:justify-center md:gap-5">
            <Logo />
          </div>
          <div className="flex items-center justify-end gap-3">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
