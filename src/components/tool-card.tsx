
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState } from "react";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const MemoizedToolCard = memo(function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = useMemo(() => tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'), [tool.name]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={`/tools/${slug}`}
        className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`Open ${tool.name} tool`}
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="h-full"
        >
          <Card className="h-full relative overflow-hidden bg-card rounded-2xl border shadow-md hover:shadow-premium-hover transition-shadow duration-300 ease-premium">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <CardContent className="relative flex flex-col h-full p-5 items-center justify-center text-center z-10">
              <motion.div
                className="mb-4 p-3 bg-primary/5 rounded-full transition-colors duration-300 group-hover:bg-white/10"
                animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.05 }}
              >
                <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" />
              </motion.div>
              <h3 className="text-md font-semibold leading-tight text-foreground group-hover:text-white transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 transition-colors duration-300 group-hover:text-white/80">
                {tool.description}
              </p>
            </CardContent>
            
            <div className="premium-tool-card-underline" />
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
});

export const ToolCard = MemoizedToolCard;
