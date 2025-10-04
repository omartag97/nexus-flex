"use client";

import {
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
} from "@/shared/components/ui/MorphingDialog";
import { memo } from "react";

export const MovieCardDialog = memo(function MovieCardDialog() {
  return (
    <MorphingDialogContainer>
      <MorphingDialogContent
        style={{ borderRadius: "24px" }}
        className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
      >
        {/* Close Button */}
        <MorphingDialogClose className="absolute right-2 top-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors" />

        {/* Placeholder for dynamic content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Movie Details
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Replace this with movie information (title, overview, release date,
            etc).
          </p>
        </div>
      </MorphingDialogContent>
    </MorphingDialogContainer>
  );
});
