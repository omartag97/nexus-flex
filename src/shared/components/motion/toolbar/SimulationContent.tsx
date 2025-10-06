"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SimulationContentProps {
  onClose: () => void;
}

type SimulationType = "success" | "failure";

export function SimulationContent({ onClose }: SimulationContentProps) {
  const [loading, setLoading] = useState<SimulationType | null>(null);

  const simulate = async (type: SimulationType) => {
    setLoading(type);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (type === "success") {
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" /> Operation completed successfully
          </div>,
          { position: "top-center" }
        );
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" /> Simulated server error
          </div>,
          { position: "top-center" }
        );
      }
    } catch {
      toast.error("Unexpected error occurred", { position: "top-center" });
    } finally {
      setLoading(null);
      onClose();
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [10, 0, 5] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center w-full"
      >
        <Typography
          variant="body2"
          color="accent-foreground"
          className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-medium tracking-wide leading-relaxed"
        >
          Test success or failure responses for error handling.
        </Typography>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="h-[2px] w-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-1"
        />
      </motion.div>

      <Button
        variant="secondary"
        className="relative overflow-hidden text-white bg-gradient-to-r from-green-500 to-emerald-600 
          hover:from-green-600 hover:to-emerald-700 
          disabled:opacity-70 disabled:cursor-not-allowed 
          transition-all duration-300 ease-out transform hover:scale-[1.03] active:scale-95 
          shadow-md hover:shadow-lg"
        onClick={() => simulate("success")}
        disabled={loading === "success"}
      >
        {loading === "success" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Simulate Success
          </span>
        )}
      </Button>

      <Button
        variant="destructive"
        className="relative overflow-hidden text-white bg-gradient-to-r from-red-500 to-rose-600 
          hover:from-red-600 hover:to-rose-700 
          disabled:opacity-70 disabled:cursor-not-allowed 
          transition-all duration-300 ease-out transform hover:scale-[1.03] active:scale-95 
          shadow-md hover:shadow-lg"
        onClick={() => simulate("failure")}
        disabled={loading === "failure"}
      >
        {loading === "failure" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Simulate Failure
          </span>
        )}
      </Button>
    </div>
  );
}
