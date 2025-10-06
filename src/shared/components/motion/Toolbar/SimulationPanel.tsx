"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, X } from "lucide-react";
import { SimulationContent } from "./SimulationContent";

export default function SimulationPanel() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="w-[300px] bg-primary-foreground rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  <SimulationContent onClose={() => setOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            aria-label={
              open ? "Close simulation panel" : "Open simulation panel"
            }
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-200 hover:scale-105 transition-transform shadow-md mt-3 mx-auto"
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
