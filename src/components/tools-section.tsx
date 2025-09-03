
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { tools, Tool } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

function ToolCardSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex flex-col items-center text-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
}

export function ToolsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const categorizedTools = useMemo(() => {
    const categories: { [key: string]: Tool[] } = {};
    tools.forEach(tool => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });
    return Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {Array.from({ length: 4 }).map((_, categoryIndex) => (
            <div key={`skeleton-category-${categoryIndex}`}>
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ToolCardSkeleton key={`skeleton-card-${categoryIndex}-${i}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-16">
        {categorizedTools.map(([category, toolsInCategory]) => {
          const CategoryIcon = toolsInCategory[0]?.categoryIcon;

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-8 text-center">
                {CategoryIcon && 
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <CategoryIcon className="h-8 w-8 text-primary" />
                  </div>
                }
                <h2 className="text-3xl font-bold text-foreground">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toolsInCategory.map((tool, i) => (
                  <ToolCard key={tool.name} tool={tool} index={i} />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
