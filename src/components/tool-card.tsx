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
import { Button } from "./ui/button";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const MemoizedToolCard = memo(function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = useMemo(() => tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'), [tool.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
      className="w-full h-full"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden bg-card border border-border hover:border-primary/50 rounded-lg">
                  <CardContent className="flex flex-col h-full p-6 text-center justify-between items-center relative">
                    <div className="flex-grow flex flex-col items-center justify-center">
                      <motion.div
                          className="mb-4"
                          whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                      >
                          <Icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-md font-bold leading-tight text-foreground">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      Use Tool
                    </Button>
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
