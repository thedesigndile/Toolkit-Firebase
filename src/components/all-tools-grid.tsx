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

const getToolUrl = (toolName: string) =>
  `/tools/${toolName.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`;

export function AllToolsGrid() {
  const categorizedTools = useMemo(() => {
    const categories: { [key: string]: Tool[] } = {};
    tools.forEach((tool) => {
      if (!categories[tool.category]) {
        categories[tool.category] = [];
      }
      categories[tool.category].push(tool);
    });
    return Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));
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
    <div className="space-y-16">
      {categorizedTools.map(([categoryName, toolsInCategory]) => {
        const CategoryIcon = toolsInCategory[0]?.categoryIcon;
        return (
          <motion.section
            key={categoryName}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 text-center">
              {CategoryIcon && (
                <motion.div
                  className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <CategoryIcon className="h-7 w-7 text-primary" />
                </motion.div>
              )}
              <h2 className="text-3xl font-bold text-foreground">
                {categoryName}
              </h2>
            </div>
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {toolsInCategory.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="h-full"
                >
                  <ModernCard
                    className="h-full"
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
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        );
      })}
    </div>
  );
}
