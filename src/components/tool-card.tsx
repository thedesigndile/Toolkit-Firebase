"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
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

  return (
    <motion.div
      className="w-full h-full"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full transition-all duration-300 ease-out bg-card rounded-xl border group-hover:border-primary/30 group-hover:shadow-large tool-card-interactive">
                  <CardContent className="flex flex-col h-full p-5 items-center justify-center text-center">
                      <motion.div 
                        className="mb-4 p-3 bg-primary/5 rounded-lg transition-colors duration-300 group-hover:bg-primary/10"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                          <Icon className="h-7 w-7 icon-gradient" />
                      </motion.div>
                      <h3 className="text-md font-semibold leading-tight text-foreground">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
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
