"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60",
        "bg-zinc-50/40 dark:bg-zinc-900/40 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center gap-2 mb-1 text-zinc-800 dark:text-zinc-200 font-semibold">
        {icon && <span>{icon}</span>}
        {label}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{value}</p>
    </motion.div>
  );
}
