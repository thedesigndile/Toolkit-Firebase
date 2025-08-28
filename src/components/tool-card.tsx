
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ToolCardProps {
  tool: Tool;
  index: number;
  isHighlighted: boolean;
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

export function ToolCard({ tool, index, isHighlighted }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }}
      className="w-full h-full"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/tools/${slug}`} className="block group relative h-full">
               <div className={cn("animated-gradient-border-container", isHighlighted ? "animate-pulse-glow" : "")}>
                  <div className="animated-gradient-border-content flex flex-col">
                    <Card
                        className={cn(
                            "cursor-pointer transition-shadow duration-250 relative overflow-hidden bg-transparent h-full border-0 shadow-none flex flex-col justify-center flex-grow",
                        )}
                    >
                        <CardContent className="p-0 flex flex-col items-center text-center">
                        <motion.div
                            className="mb-4"
                            whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
                        >
                            <Icon className="h-12 w-12" strokeWidth={1.5} />
                        </motion.div>
                        <p className="text-base font-semibold leading-tight text-foreground">{tool.name}</p>
                        <p className="text-sm text-muted-foreground mt-2 flex-grow">{tool.description}</p>
                        </CardContent>
                    </Card>
                  </div>
               </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tool.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
