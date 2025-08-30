
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
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }}
      className="w-full h-full"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tools/${slug}`}
              className="block group relative h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
              aria-label={`Open ${tool.name} tool`}
            >
               <div className={cn("animated-gradient-border-container h-52 sm:h-48 md:h-52 group-hover:shadow-2xl transition-shadow duration-300")}>
                  <div className="animated-gradient-border-content flex flex-col h-full relative overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {tool.isNew && (
                        <motion.div
                          className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                            NEW
                        </motion.div>
                    )}

                    <Card
                        className={cn(
                            "cursor-pointer transition-all duration-300 relative overflow-hidden h-full border-0 shadow-none flex flex-col justify-between group-hover:bg-card",
                        )}
                    >
                        <CardContent className="p-5 flex flex-col items-center text-center flex-1 justify-center relative z-10">
                        <motion.div
                            className="mb-4 p-3 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 group-hover:from-brand-blue/20 group-hover:to-brand-purple/20 transition-all duration-300"
                            whileHover={{
                              scale: 1.15,
                              rotate: 5,
                              transition: { duration: 0.2, ease: "easeOut" }
                            }}
                        >
                            <Icon className="h-10 w-10 text-brand-blue group-hover:text-brand-purple transition-colors duration-300" />
                        </motion.div>
                        <motion.h3
                          className="text-base font-semibold leading-tight text-foreground group-hover:text-brand-blue transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {tool.name}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-muted-foreground mt-2 line-clamp-2 px-2 group-hover:text-foreground/80 transition-colors duration-300"
                          whileHover={{ scale: 1.01 }}
                        >
                          {tool.description}
                        </motion.p>
                        </CardContent>
                    </Card>

                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
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
});

export const ToolCard = MemoizedToolCard;
