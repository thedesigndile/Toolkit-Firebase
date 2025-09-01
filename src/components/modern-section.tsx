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
      "section-gradient": gradient && !dark,
      "bg-gradient-primary text-white": dark,
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
      {/* Background decorations */}
      {gradient && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-primary opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-hover opacity-5 rounded-full blur-3xl" />
        </div>
      )}
      
      {dark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl float" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl float" style={{ animationDelay: "2s" }} />
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
}
