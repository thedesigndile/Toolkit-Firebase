
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { tools } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

export function ToolsSection() {
   const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);


  const categorizedTools = useMemo(() => {
    const categories: { [key: string]: typeof tools } = {};
    tools.forEach(tool => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });
    return Object.entries(categories);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {isLoading ? (
        <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, categoryIndex) => (
              <div key={`skeleton-category-${categoryIndex}`}>
                  <Skeleton className="h-8 w-48 mb-6 bg-muted" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={`skeleton-${categoryIndex}-${i}`} className="h-40 rounded-lg bg-muted" />
                    ))}
                  </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="space-y-16">
           {categorizedTools.map(([category, toolsInCategory]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-6 text-foreground">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toolsInCategory.map((tool, i) => (
                   <Suspense key={tool.name} fallback={<Skeleton className="h-40 rounded-lg" />}>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                     >
                        <ToolCard tool={tool} index={i} />
                     </motion.div>
                   </Suspense>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
       )}
    </div>
  );
}
