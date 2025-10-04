"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BACK_BUTTON_ANIMATION } from "@/constants/navbar";
import Typography from "../ui/Typography";

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Detect if nested route (e.g., /movies/123)
  const isNestedRoute = pathname.split("/").filter(Boolean).length > 1;

  return (
    <AnimatePresence initial={false}>
      {isNestedRoute && (
        <motion.div key={pathname} {...BACK_BUTTON_ANIMATION}>
          <div
            onClick={() => router.back()}
            className="transition-colors cursor-pointer flex items-center hover:text-red-500"
          >
            <ChevronLeft size={15} />
            <Typography variant="body2" color="accent-foreground">
              Back
            </Typography>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
