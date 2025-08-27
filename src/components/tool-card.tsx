
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

export function ToolCard({ tool, index }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30, restDelta: 0.001 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30, restDelta: 0.001 });

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  const cardScale = useTransform([mouseX, mouseY], [[-150, 150], [-150, 150]], [1.05, 1]);
  const iconTranslateX = useTransform(mouseX, [-100, 100], [-5, 5]);
  const iconTranslateY = useTransform(mouseY, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
          style={{
            rotateX,
            rotateY,
            scale: cardScale,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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
            style={{ transform: "translateZ(20px)" }}
          >
             <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-500/30 transition-all duration-300 pointer-events-none" />
            <CardContent className="p-5 flex flex-col items-center text-center aspect-square justify-center">
              <motion.div
                style={{ 
                  translateX: iconTranslateX,
                  translateY: iconTranslateY,
                  transformStyle: "preserve-3d" 
                }}
                className="mb-4"
              >
                <Icon className="h-16 w-16" style={{ transform: "translateZ(40px)" }} />
              </motion.div>
              <p className="text-base font-bold leading-tight text-foreground" style={{ transform: "translateZ(30px)" }}>{tool.name}</p>
              <p className="text-sm text-muted-foreground mt-2" style={{ transform: "translateZ(20px)" }}>{tool.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
