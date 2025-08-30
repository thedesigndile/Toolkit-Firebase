"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
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
              className="block group relative h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
              aria-label={`Open ${tool.name} tool`}
            >
               <Card className="h-52 sm:h-48 md:h-52 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/50">
                  <CardContent className="flex flex-col h-full p-6 text-center justify-center items-center">
                    {tool.isNew && (
                        <motion.div
                          className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-md z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                            NEW
                        </motion.div>
                    )}
                    <div className="flex flex-col items-center text-center flex-1 justify-center relative z-10">
                      <motion.div
                          className="mb-4 p-3 rounded-full bg-slate-100 dark:bg-slate-700 transition-all duration-300"
                          whileHover={{
                            scale: 1.15,
                            rotate: 5,
                            transition: { duration: 0.2, ease: "easeOut" }
                          }}
                      >
                          <Icon className="h-10 w-10 text-primary group-hover:text-primary transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-lg font-semibold leading-tight text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors duration-300">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 px-2 transition-colors duration-300">
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
