"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";
import { ParticleBackground } from "./particle-background";

export function HomepageHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden bg-background pt-32 sm:pt-40 lg:pt-48">
      <ParticleBackground />
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_top,hsl(var(--primary)/0.15),transparent_60%)]"
        style={{ y }}
      />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl lg:flex-shrink-0 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Transform Your Files with Ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Access 20+ powerful tools for PDF, images, and more, powered by Gemini.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/tools">
                <Button size="lg" className="btn-pulse bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
