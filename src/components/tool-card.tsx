
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: -10 },
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

const iconVariants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
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
      whileHover="hover"
      className="w-full h-full"
    >
      <Link href={`/tools/${slug}`} className="block group relative h-full">
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
          className="h-full"
        >
          <Card
            className={cn(
              "cursor-pointer transition-all duration-300 relative overflow-hidden bg-card h-full border rounded-2xl",
              "shadow-md group-hover:shadow-xl group-hover:shadow-accent/20",
              "group-hover:border-accent/30"
            )}
          >
             <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none" />
            <CardContent className="p-5 flex flex-col items-center text-center aspect-square justify-center">
              <motion.div variants={iconVariants} className="mb-4">
                <Icon className="h-16 w-16" />
              </motion.div>
              <p className="text-base font-bold leading-tight text-foreground">{tool.name}</p>
              <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
