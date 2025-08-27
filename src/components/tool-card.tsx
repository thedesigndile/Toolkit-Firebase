
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
      className="w-full h-full"
    >
      <Link href={`/tools/${slug}`} className="block group relative h-full">
        <motion.div
          whileHover={{ boxShadow: "0 10px 20px -5px hsl(var(--brand-blue-raw) / 0.15), 0 4px 6px -4px hsl(var(--brand-blue-raw) / 0.1)" }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="h-full"
        >
          <Card
            className={cn(
              "cursor-pointer transition-shadow duration-250 relative overflow-hidden bg-card h-full border rounded-2xl",
              "shadow-md group-hover:shadow-xl group-hover:shadow-accent/10",
               "group-hover:border-accent/20"
            )}
          >
            <CardContent className="p-5 flex flex-col items-center text-center aspect-square justify-center">
              <motion.div 
                className="mb-4"
                whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
              >
                <Icon className="h-16 w-16" />
              </motion.div>
              <p className="text-base font-semibold leading-tight text-foreground">{tool.name}</p>
              <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
