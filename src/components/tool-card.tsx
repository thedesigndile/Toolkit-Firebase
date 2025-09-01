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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const MemoizedToolCard = memo(function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = useMemo(() => tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'), [tool.name]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
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
               <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden bg-card border border-border hover:border-accent rounded-lg">
                  <CardContent className="flex flex-col h-full p-6 text-center justify-center items-center relative">
                    <motion.div
                        className="mb-4 p-3 rounded-full transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                    >
                        <Icon className="h-8 w-8 text-gray-700 group-hover:text-accent transition-colors duration-200" />
                    </motion.div>
                    <h3 className="text-md font-semibold leading-tight text-foreground group-hover:text-accent transition-colors duration-300">
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
