"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent = false,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  // ✅ Initialize at screen center
  useEffect(() => {
    if (typeof window !== "undefined") {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
  }, [cursorX, cursorY]);

  // ✅ Update position + system cursor state
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", updatePosition);
    document.body.style.cursor = attachToParent ? "auto" : "none";

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.body.style.cursor = "auto"; // restore on unmount
    };
  }, [cursorX, cursorY, onPositionChange, attachToParent]);

  const cursorXSpring = useSpring(cursorX, springConfig ?? { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig ?? { duration: 0 });

  // ✅ Attach to parent element if requested
  useEffect(() => {
    if (!attachToParent || !cursorRef.current) return;

    const parent = cursorRef.current.parentElement;
    if (!parent) return;

    const onEnter = () => {
      parent.style.cursor = "none";
      setIsVisible(true);
    };
    const onLeave = () => {
      parent.style.cursor = "auto";
      setIsVisible(false);
    };

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [attachToParent]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
