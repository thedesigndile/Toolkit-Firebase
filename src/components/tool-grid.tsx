"use client";

import { motion } from "framer-motion";
import { FileText, Image, Type, RefreshCw, Zap, Scissors, GitMerge, Minimize2 } from "lucide-react";

const toolCategories = [
  {
    category: "PDF Tools",
    tools: [
      { name: "Merge PDF", description: "Combine multiple PDF files into one", icon: GitMerge },
      { name: "Split PDF", description: "Split PDF into separate pages", icon: Scissors },
      { name: "Compress PDF", description: "Reduce PDF file size", icon: Minimize2 },
      { name: "PDF to Word", description: "Convert PDF to editable Word document", icon: FileText }
    ]
  },
  {
    category: "Image Tools",
    tools: [
      { name: "Resize Image", description: "Change image dimensions", icon: Image },
      { name: "Compress Image", description: "Reduce image file size", icon: Minimize2 },
      { name: "Convert Format", description: "Change image format", icon: RefreshCw },
      { name: "Remove Background", description: "Remove image background", icon: Scissors }
    ]
  },
  {
    category: "Text Tools", 
    tools: [
      { name: "Word Counter", description: "Count words and characters", icon: Type },
      { name: "Text Formatter", description: "Format and style text", icon: Type },
      { name: "Case Converter", description: "Change text case", icon: RefreshCw },
      { name: "Lorem Generator", description: "Generate placeholder text", icon: Type }
    ]
  },
  {
    category: "AI Utilities",
    tools: [
      { name: "AI Writer", description: "Generate content with AI", icon: Zap },
      { name: "Text Summarizer", description: "Summarize long text", icon: Zap },
      { name: "Language Detector", description: "Detect text language", icon: Zap },
      { name: "Content Generator", description: "Generate various content types", icon: Zap }
    ]
  }
];

export function ToolGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 parallax-bg">
      {toolCategories.map((category, categoryIndex) => (
        <motion.section
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          className="mb-16"
        >
          {/* Category Heading */}
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-8 category-underline inline-block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 + 0.2 }}
          >
            {category.category}
          </motion.h2>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.tools.map((tool, toolIndex) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: categoryIndex * 0.1 + toolIndex * 0.1 
                  }}
                  className="tool-card group cursor-pointer"
                  whileHover={{ 
                    y: -12, 
                    scale: 1.08,
                    rotateX: 5,
                    transition: { duration: 0.4, type: "spring", stiffness: 200 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 icon-container rounded-3xl flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <Icon className="h-10 w-10 icon-gradient icon-glow" />
                  </motion.div>

                  {/* Tool Name */}
                  <motion.h3 
                    className="text-xl font-bold text-gray-800 mb-3 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tool.name}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  
                  {/* Action Button */}
                  <motion.button
                    className="w-full py-2 px-4 bg-gradient-light hover:bg-gradient-primary hover:text-white rounded-lg font-medium transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Use Tool
                  </motion.button>

                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-gradient-glow blur-2xl -z-10 scale-110" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-300 pointer-events-none bg-white blur-sm -z-10" />
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}