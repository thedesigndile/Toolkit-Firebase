
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = useMemo(() => tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'), [tool.name]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
    >
      <Link href={`/tools/${slug}`} className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        <Card className="h-full bg-card hover:bg-muted/50 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 relative animated-border-card">
          <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
            <motion.div 
              className="mb-4 p-3 bg-primary/10 rounded-full text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
            <h3 className="text-md font-semibold text-foreground">{tool.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {tool.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
