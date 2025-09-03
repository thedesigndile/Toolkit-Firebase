"use client";

import { motion } from "framer-motion";
import { tools, Tool } from "@/lib/tools";
import Link from "next/link";
import {
  ModernCard,
  ModernCardContent,
  ModernCardHeader,
  ModernCardTitle,
  ModernCardDescription,
} from "./modern-card";
import { useMemo } from "react";
import { ModernButton } from "./modern-button";
import { ArrowRight } from "lucide-react";

const getToolUrl = (toolName: string) =>
  `/tools/${toolName.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`;

export function FeaturedToolsGrid() {
  const featuredTools = useMemo(() => {
    return tools
      .filter(
        (tool) =>
          tool.category === "Edit PDF" ||
          tool.category === "Convert PDF" ||
          tool.category === "Image Tools"
      )
      .slice(0, 8);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A versatile toolkit for your digital tasks.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to be productive, all in one place.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredTools.map((tool) => (
            <ModernCard
              key={tool.name}
              hover
              onClick={() => (window.location.href = getToolUrl(tool.name))}
            >
              <ModernCardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <tool.icon className="h-6 w-6" />
                </div>
                <ModernCardTitle>{tool.name}</ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent>
                <ModernCardDescription>
                  {tool.description}
                </ModernCardDescription>
              </ModernCardContent>
            </ModernCard>
          ))}
        </motion.div>

        <div className="mt-20 text-center">
          <ModernButton size="lg" variant="gradient" glow>
            <Link href="/tools" className="flex items-center">
              Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </ModernButton>
        </div>
      </div>
    </div>
  );
}
