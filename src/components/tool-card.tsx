"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      whileHover={{ y: -10, scale: 1.03 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full tool-card-interactive shadow-lg hover:shadow-xl">
                  <motion.div
                    className="absolute inset-0 opacity-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(260 80% 60% / 0.15) 100%)',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                   <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      boxShadow: 'inset 0 0 1.5rem 0 hsl(var(--primary) / 0.2), 0 0 1.5rem 0 hsl(var(--primary) / 0.1)'
                   }} />
                  <CardContent className="flex flex-col h-full p-5 items-center justify-center text-center relative z-10">
                      <motion.div 
                        className="mb-4 p-3 bg-primary/5 rounded-lg transition-colors duration-300 group-hover:bg-primary/10"
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                          <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-blue-500 icon-gradient" />
                      </motion.div>
                      <h3 className="text-md font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 max-w-prose">
                        {tool.description}
                      </p>
                  </CardContent>
               </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>{tool.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

export const ToolCard = MemoizedToolCard;
