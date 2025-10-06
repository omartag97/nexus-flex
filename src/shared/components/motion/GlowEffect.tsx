"use client";

import * as React from "react";
import { motion, Transition, TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";

export type GlowEffectProps = {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?:
    | "rotate"
    | "pulse"
    | "breathe"
    | "colorShift"
    | "flowHorizontal"
    | "static";
  blur?:
    | number
    | "softest"
    | "soft"
    | "medium"
    | "strong"
    | "stronger"
    | "strongest"
    | "none";
  transition?: Transition;
  scale?: number;
  duration?: number;
};

export function GlowEffect({
  className,
  style,
  colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
  mode = "rotate",
  blur = "medium",
  transition,
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const BASE_TRANSITION: Transition = {
    repeat: Infinity,
    duration,
    ease: "linear",
  };

  const animations: Record<
    NonNullable<GlowEffectProps["mode"]>,
    TargetAndTransition
  > = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
      ],
      transition: transition ?? BASE_TRANSITION,
    },
    pulse: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: transition ?? { ...BASE_TRANSITION, repeatType: "mirror" },
    },
    breathe: {
      background: colors.map(
        (color) =>
          `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
      ),
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: transition ?? { ...BASE_TRANSITION, repeatType: "mirror" },
    },
    colorShift: {
      background: colors.map((color, i) => {
        const next = colors[(i + 1) % colors.length];
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${next} 50%, ${color} 100%)`;
      }),
      transition: transition ?? { ...BASE_TRANSITION, repeatType: "mirror" },
    },
    flowHorizontal: {
      background: colors.map((color, i) => {
        const next = colors[(i + 1) % colors.length];
        return `linear-gradient(to right, ${color}, ${next})`;
      }),
      transition: transition ?? { ...BASE_TRANSITION, repeatType: "mirror" },
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(", ")})`,
    },
  };

  const getBlurClass = (blurValue: GlowEffectProps["blur"]) => {
    if (typeof blurValue === "number") return `blur-[${blurValue}px]`;

    const presets = {
      softest: "blur-[2px]",
      soft: "blur-sm",
      medium: "blur-md",
      strong: "blur-lg",
      stronger: "blur-xl",
      strongest: "blur-2xl",
      none: "blur-none",
    };
    return presets[blurValue as keyof typeof presets];
  };

  return (
    <motion.div
      style={
        {
          ...style,
          "--scale": scale,
          willChange: "transform",
          backfaceVisibility: "hidden",
        } as React.CSSProperties
      }
      animate={animations[mode]}
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full",
        "scale-[var(--scale)] transform-gpu rounded-full opacity-40",
        getBlurClass(blur),
        className
      )}
    />
  );
}
