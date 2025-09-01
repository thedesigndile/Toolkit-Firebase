"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
  className?: string;
}

export function ModernButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  ripple = true,
  glow = false,
  className,
  disabled,
  ...props
}: ModernButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium hover:shadow-large",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-medium hover:shadow-large",
    outline: "border-2 border-border bg-background text-foreground hover:border-primary hover:bg-muted",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    gradient: "bg-gradient-primary hover:bg-gradient-hover text-white shadow-medium hover:shadow-glow"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const glowClasses = glow ? "hover:shadow-glow" : "";
  const rippleClasses = ripple ? "btn-ripple" : "";
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    glowClasses,
    rippleClasses,
    className
  );

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      className={buttonClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect background */}
      {ripple && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-500 group-active:scale-100" />
        </span>
      )}
      
      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-4 w-4" />
          </motion.div>
        )}
        {children}
      </span>
      
      {/* Gradient overlay for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-hover opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      )}
    </motion.button>
  );
}