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
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--brand-blue-raw))" />
            <stop offset="100%" stopColor="hsl(var(--brand-purple-raw))" />
          </linearGradient>
        </defs>
      </svg>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-3xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 overflow-hidden bg-card border border-border hover:border-primary rounded-2xl relative">
                  {/* Top gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
                  
                  <CardContent className="flex flex-col h-full p-8 text-center justify-center items-center relative">
                    {tool.isNew && (
                        <motion.div
                          className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold rounded-full shadow-md z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                            NEW
                        </motion.div>
                    )}
                    <div className="flex flex-col items-center text-center flex-1 justify-center">
                      <motion.div
                          className="mb-6 p-4 rounded-2xl bg-gradient-light group-hover:bg-gradient-primary transition-all duration-300"
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2, ease: "easeOut" }
                          }}
                      >
                          <Icon className="h-12 w-12 text-primary group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-xl font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                        {tool.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </CardContent>
               </Card>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tool.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

export const ToolCard = MemoizedToolCard;