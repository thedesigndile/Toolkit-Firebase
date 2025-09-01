"use client";

import { motion } from "framer-motion";
import { tools } from "@/lib/tools";
import Link from "next/link";

const pdfTools = tools.filter(t => ['Edit PDF', 'Protect & Secure', 'View & Organize'].includes(t.category));
const imageTools = tools.filter(t => t.category === 'Image Tools');
const conversionTools = tools.filter(t => ['Convert PDF', 'Converters', 'Other Tools'].includes(t.category));
const editingTools = tools.filter(t => t.category === 'Edit PDF');
const videoTools = tools.filter(t => t.category === 'Video Tools');
const audioTools = tools.filter(t => t.category === 'Audio Tools');
const utilityTools = tools.filter(t => t.category === 'Utility Tools');

const categories = [
    { name: "PDF Tools", tools: pdfTools },
    { name: "Image Tools", tools: imageTools },
    { name: "Conversion Tools", tools: conversionTools },
    { name: "Editing Tools", tools: editingTools },
    { name: "Video Tools", tools: videoTools },
    { name: "Audio Tools", tools: audioTools },
    { name: "Utility Tools", tools: utilityTools },
];

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

export function ModernToolGrid() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5, 
      transition: { duration: 0.2 },
      filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))"
    },
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              className="relative rounded-2xl bg-card p-8 shadow-lg border border-border/20"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-border opacity-0 hover:opacity-100 transition-opacity duration-300 hover:shadow-2xl hover:shadow-purple-500/50"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">{category.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.tools.length} tools to help you with your tasks.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {category.tools.slice(0, 4).map((tool) => (
                    <Link href={getToolUrl(tool.name)} key={tool.name}>
                      <motion.div
                        className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
                        variants={iconVariants}
                        whileHover="hover"
                        initial="rest"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-purple-500/50">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}