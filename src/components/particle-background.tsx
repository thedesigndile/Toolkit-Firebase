
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ParticleBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_50%_0,hsl(var(--primary)/0.1),transparent_40%)]",
          "dark:bg-[radial-gradient(circle_at_50%_0,hsl(var(--primary)/0.15),transparent_60%)]"
        )}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-20" />
      <motion.div
        className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
