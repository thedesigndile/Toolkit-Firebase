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
    <div ref={ref} className="relative isolate overflow-hidden bg-background pt-14">
      <ParticleBackground />
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_top,rgba(0,123,255,0.15),white_100%)] dark:bg-[radial-gradient(45rem_45rem_at_top,rgba(0,123,255,0.15),#0f172a_100%)]"
        style={{ y }}
      />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              All-in-One PDF & File Tools
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Convert, edit, and manage your files with ease. Professional tools trusted by millions worldwide.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Link href="/tools">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50">
                  Explore Tools
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="ghost">
                  View pricing <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
