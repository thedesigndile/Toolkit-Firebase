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
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full transition-all duration-250 ease-out bg-card rounded-xl border group-hover:border-primary/30 group-hover:shadow-large">
                  <CardContent className="flex flex-col h-full p-5 items-center justify-center text-center">
                      <div className="mb-4 p-3 bg-accent rounded-lg transition-colors duration-250 group-hover:bg-primary/10">
                          <Icon className="h-7 w-7 text-primary transition-transform duration-250 group-hover:scale-110" />
                      </div>
                      <h3 className="text-md font-semibold leading-tight text-foreground">
                        {tool.name}
                      </h3>
                  </CardContent>
               </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tool.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

export const ToolCard = MemoizedToolCard;
