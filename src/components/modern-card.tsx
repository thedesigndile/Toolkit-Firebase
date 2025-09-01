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
    "rounded-2xl p-6 transition-all duration-300",
    {
      "glass-card border-gradient": glassmorphism,
      "bg-card border border-border shadow-medium hover:shadow-large": !glassmorphism && !gradient,
      "bg-gradient-primary text-white shadow-gradient": gradient,
      "hover-lift cursor-pointer": hover && onClick,
      "hover:border-primary hover:shadow-glow": hover && !glassmorphism && !gradient,
    },
    className
  );

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: hover ? {
      y: -8,
      scale: 1.02,
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
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? { scale: 0.98 } : {}}
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
    <h3 className={cn("text-xl font-bold", className)} style={{ color: 'hsl(var(--foreground))' }}>
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
    <p className={cn("leading-relaxed", className)} style={{ color: 'hsl(var(--muted-foreground))' }}>
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
    <div className={cn("mt-6 pt-4 border-t border-border", className)}>
      {children}
    </div>
  );
}