
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { motion, AnimatePresence } from "framer-motion";
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
      whileHover={{ y: -10, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full tool-card-interactive shadow-lg hover:shadow-xl">
                  <CardContent className="flex flex-col h-full p-5 items-center justify-center text-center relative z-10">
                      <motion.div 
                        className="mb-4 p-3 bg-primary/5 rounded-full transition-colors duration-300 group-hover:bg-primary/10"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                          <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:icon-gradient" />
                      </motion.div>
                      <h3 className="text-md font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                  </CardContent>
               </Card>
            </Link>
          </TooltipTrigger>
          <AnimatePresence>
          {isHovered && (
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-[hsl(var(--tooltip-bg))] text-[hsl(var(--tooltip-fg))] border-none shadow-xl transition-colors duration-300"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {tool.description}
              </motion.p>
            </TooltipContent>
          )}
          </AnimatePresence>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

export const ToolCard = MemoizedToolCard;
