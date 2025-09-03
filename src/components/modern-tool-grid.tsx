"use client";

import { motion } from "framer-motion";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle, ModernCardDescription } from "./modern-card";
import { ModernButton } from "./modern-button";
import { ArrowRight } from "lucide-react";

const pdfTools = tools.filter(t => ['Edit PDF', 'Protect & Secure', 'View & Organize', 'Convert PDF'].some(cat => t.category.includes(cat)));
const imageTools = tools.filter(t => t.category === 'Image Tools');
const utilityTools = tools.filter(t => ['Utility Tools', 'Converters', 'Archive Tools'].includes(t.category));

const categories = [
    { name: "PDF Power Tools", tools: pdfTools },
    { name: "Image Studio", tools: imageTools },
    { name: "Essential Utilities", tools: utilityTools },
];

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

export function ModernToolGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">All-in-One Toolkit</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Everything you need to be productive, all in one place.
            </p>
        </motion.div>

        <div className="space-y-20">
          {categories.map((category) => (
            <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-center mb-12 text-gradient-animated">{category.name}</h3>
              <motion.div 
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {category.tools.slice(0, 8).map((tool) => (
                    <ModernCard key={tool.name} glassmorphism hover onClick={() => window.location.href = getToolUrl(tool.name)}>
                        <ModernCardHeader>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <tool.icon className="h-6 w-6" />
                            </div>
                            <ModernCardTitle>{tool.name}</ModernCardTitle>
                        </ModernCardHeader>
                        <ModernCardContent>
                            <ModernCardDescription>
                                {tool.description}
                            </ModernCardDescription>
                        </ModernCardContent>
                    </ModernCard>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <ModernButton size="lg" variant="gradient" glow>
                <Link href="/tools" className="flex items-center">
                    Explore All Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </ModernButton>
        </div>
      </div>
    </div>
  );
}
