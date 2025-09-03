"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function ModernCard({ 
  children, 
  className, 
  hover = true, 
  glassmorphism = false,
  gradient = false,
  onClick 
}: ModernCardProps) {
  const cardClasses = cn(
    "rounded-2xl p-6 transition-all duration-300 h-full flex flex-col",
    {
      "glass-card border-gradient": glassmorphism,
      "bg-card border border-border shadow-md hover:shadow-xl": !glassmorphism && !gradient,
      "bg-gradient-primary text-white shadow-lg": gradient,
      "hover:-translate-y-2 cursor-pointer": hover && onClick,
      "hover:border-primary": hover && !glassmorphism && !gradient,
    },
    className
  );

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: hover ? {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    } : {}
  };

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      whileHover="hover"
      whileTap={onClick ? { scale: 0.97 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface ModernCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ModernCardHeader({ children, className }: ModernCardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

interface ModernCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function ModernCardTitle({ children, className }: ModernCardTitleProps) {
  return (
    <h3 className={cn("text-xl font-bold text-foreground", className)}>
      {children}
    </h3>
  );
}

interface ModernCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ModernCardDescription({ children, className }: ModernCardDescriptionProps) {
  return (
    <p className={cn("leading-relaxed text-muted-foreground flex-grow", className)}>
      {children}
    </p>
  );
}

interface ModernCardContentProps {
  children: ReactNode;
  className?: string;
}

export function ModernCardContent({ children, className }: ModernCardContentProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

interface ModernCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModernCardFooter({ children, className }: ModernCardFooterProps) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-border/10", className)}>
      {children}
    </div>
  );
}
