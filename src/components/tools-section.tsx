"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { tools, Tool } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Skeleton, ToolCardSkeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

export function ToolsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
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

  return (
    <div className="container mx-auto px-4 py-16">
      {isLoading ? (
        <div className="space-y-12">
          {Array.from({ length: 4 }).map((_, categoryIndex) => (
            <div key={`skeleton-category-${categoryIndex}`}>
              <Skeleton className="h-8 w-48 mb-6 bg-muted" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ToolCardSkeleton key={`skeleton-${categoryIndex}-${i}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          {categorizedTools.map(([category, toolsInCategory]) => {
            const CategoryIcon = toolsInCategory[0]?.categoryIcon;

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="mb-8 text-center"
                  whileHover={{x: 2}}
                >
                  {CategoryIcon && 
                    <motion.div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4" whileHover={{scale: 1.1, rotate: -5}}>
                      <CategoryIcon className="h-7 w-7 text-primary" />
                    </motion.div>
                  }
                  <h2 className="text-3xl font-bold text-foreground">{category}</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    {toolsInCategory[0]?.description}
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {toolsInCategory.map((tool, i) => (
                     <Suspense key={tool.name} fallback={<ToolCardSkeleton />}>
                       <div className="premium-tool-card">
                          <ToolCard tool={tool} index={i} />
                       </div>
                     </Suspense>
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>
      )}
    </div>
  );
}