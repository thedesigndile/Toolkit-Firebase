"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  animation = "slideUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: once,
    delay,
  });

  return (
    <motion.div
      ref={elementRef}
      className={cn(className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animationVariants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth animation
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childAnimation?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate";
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  childAnimation = "slideUp",
}: StaggerContainerProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      className={cn(className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  animation = "slideUp",
  className,
}: {
  children: ReactNode;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate";
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={animationVariants[animation]}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}