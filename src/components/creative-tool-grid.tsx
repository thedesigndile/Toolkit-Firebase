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
    <div className="bg-blue-50">
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
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <motion.h2 
                className="text-4xl font-bold mb-12 text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {categoryName}
                </span>
                <motion.div 
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryTools.map((tool, toolIndex) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: toolIndex * 0.05 }}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                        <Icon className="w-full h-full" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm text-center leading-relaxed">
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
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  {categoryName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryTools.map((tool, toolIndex) => {
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: toolIndex * 0.05 }}
                        className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                        whileHover={{ 
                          y: -8, 
                          scale: 1.03,
                          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 30px rgba(139, 92, 246, 0.3)"
                        }}
                      >
                        <motion.div 
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 shadow-md group-hover:shadow-xl"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-blue-600 transition-colors duration-300">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
                          {tool.description}
                        </p>
                        
                        <motion.div 
                          className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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