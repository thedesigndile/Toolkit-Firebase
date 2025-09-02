"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ParticleBackground } from "./particle-background";

export function HomepageHero() {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-32 lg:pb-40 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4" />
            <span>Over 20 Powerful Tools</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl mx-auto">
            Sleek, Minimalist File Tools
          </h1>
          <p className="mt-6 max-w-prose mx-auto text-lg text-muted-foreground">
            Access a powerful suite of offline-first tools designed for efficiency and a clean user experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="btn-primary shadow-lg hover:shadow-xl">
                <Link href="/tools">
                  Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
