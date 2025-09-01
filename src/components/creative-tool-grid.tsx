"use client";

import { motion } from "framer-motion";
import { tools } from "@/lib/tools";

const topCategories = [
  'Convert PDF',
  'Protect & Secure', 
  'Edit PDF'
];

const bottomCategories = [
  'View & Organize',
  'Image Tools',
  'Utility Tools'
];

export function CreativeToolGrid() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        {topCategories.map((categoryName, categoryIndex) => {
          const categoryTools = tools.filter(tool => tool.category === categoryName);
          if (categoryTools.length === 0) return null;
          
          return (
            <motion.section
              key={categoryName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: categoryIndex * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-16"
            >
              <motion.h2 
                className="heading-2 mb-12 text-center relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="text-gradient">
                  {categoryName}
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                />
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryTools.slice(0,4).map((tool, toolIndex) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: toolIndex * 0.03, ease: [0.22, 0.61, 0.36, 1] }}
                      className="card-luxury cursor-pointer group"
                      whileHover={{ y: -3, scale: 1.015 }}
                    >
                      <div className="tool-icon mx-auto mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="heading-3 mb-2 text-center" style={{ fontSize: '1.125rem' }}>
                        {tool.name}
                      </h3>
                      
                      <p className="text-sm text-center leading-relaxed" style={{ color: 'hsl(var(--text-secondary))' }}>
                        {tool.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
        
        {/* Bottom Section */}
        <div className="mt-20">
          {bottomCategories.map((categoryName, categoryIndex) => {
            const categoryTools = tools.filter(tool => tool.category === categoryName);
            if (categoryTools.length === 0) return null;
            
            return (
              <motion.section
                key={categoryName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: categoryIndex * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="mb-16"
              >
                <h2 className="heading-2 mb-8 text-center text-gradient">
                  {categoryName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryTools.slice(0,4).map((tool, toolIndex) => {
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.32, delay: toolIndex * 0.03, ease: [0.22, 0.61, 0.36, 1] }}
                        className="card-luxury cursor-pointer group"
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <motion.div 
                          className="tool-icon mx-auto mb-4"
                          whileHover={{ rotate: 3, scale: 1.05 }}
                          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>
                        
                        <h3 className="heading-3 mb-3 text-center relative z-10">
                          {tool.name}
                        </h3>
                        
                        <p className="text-sm text-center leading-relaxed mb-4 relative z-10" style={{ color: 'hsl(var(--text-secondary))' }}>
                          {tool.description}
                        </p>
                        
                        <motion.div 
                          className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100"
                          style={{ transition: 'all var(--spring-curve) var(--micro-duration)'}}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
