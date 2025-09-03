"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModernSectionProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  dark?: boolean;
  id?: string;
}

export function ModernSection({ 
  children, 
  className, 
  gradient = false,
  dark = false,
  id 
}: ModernSectionProps) {
  const sectionClasses = cn(
    "relative py-16 sm:py-20 px-6 overflow-hidden",
    {
      "bg-gradient-to-b from-background to-primary/5": gradient && !dark,
      "bg-gradient-to-b from-gray-900 to-black text-white": dark,
      "bg-background": !gradient && !dark,
    },
    className
  );

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
}
