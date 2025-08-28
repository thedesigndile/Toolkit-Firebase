
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

export function ToolCard({ tool, index }: ToolCardProps) {
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
               <div className={cn("animated-gradient-border-container h-52")}>
                  <div className="animated-gradient-border-content flex flex-col h-full">
                    {tool.isNew && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-md animate-pulse z-10">
                            NEW
                        </div>
                    )}
                    <Card
                        className={cn(
                            "cursor-pointer transition-shadow duration-250 relative overflow-hidden bg-transparent h-full border-0 shadow-none flex flex-col justify-between",
                        )}
                    >
                        <CardContent className="p-0 flex flex-col items-center text-center flex-1 justify-center">
                        <motion.div
                            className="mb-4"
                            whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
                        >
                            <Icon className="h-12 w-12 text-brand-blue group-hover:text-brand-purple" strokeWidth={1.5} />
                        </motion.div>
                        <h3 className="text-base font-semibold leading-tight text-foreground">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{tool.description}</p>
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
