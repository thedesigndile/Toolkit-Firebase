
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ToolCardProps {
  tool: Tool;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (toolName: string) => void;
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

export function ToolCard({ tool, index, isFavorite, onToggleFavorite, isHighlighted }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(tool.name);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.02, y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }}
      className={cn("w-full h-full", isHighlighted ? "animate-pulse-glow" : "")}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/tools/${slug}`} className="block group relative h-full">
              <Card
                  className={cn(
                      "cursor-pointer transition-shadow duration-250 relative overflow-hidden bg-card h-full border rounded-2xl",
                      "shadow-sm group-hover:shadow-lg group-hover:shadow-accent/10",
                      "group-hover:border-accent/20",
                      isFavorite && "border-yellow-400/50 shadow-yellow-500/10"
                  )}
              >
                  <button
                    onClick={handleFavoriteClick}
                    className={cn(
                      "absolute top-2 right-2 z-10 p-1.5 rounded-full bg-card/50 backdrop-blur-sm transition-colors",
                      isFavorite ? "text-yellow-400" : "text-muted-foreground/50 hover:text-muted-foreground"
                    )}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className={cn("h-5 w-5", isFavorite && "fill-current")} />
                  </button>

                  <CardContent className="p-5 flex flex-col items-center text-center aspect-square justify-center">
                  <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
                  >
                      <Icon className="h-16 w-16" />
                  </motion.div>
                  <p className="text-base font-semibold leading-tight text-foreground">{tool.name}</p>
                  <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
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
}
