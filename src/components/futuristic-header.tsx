"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Image, Type, RefreshCw } from "lucide-react";
import { ModernLogo } from "./icons";

const categories = [
  {
    name: "PDF Tools",
    icon: FileText,
    tools: [
      { name: "Merge PDF", icon: "🔗" },
      { name: "Split PDF", icon: "✂️" },
      { name: "Compress PDF", icon: "📦" },
      { name: "PDF to Word", icon: "📄" },
      { name: "Protect PDF", icon: "🔒" },
      { name: "Unlock PDF", icon: "🔓" },
      { name: "Rotate PDF", icon: "🔄" },
      { name: "Watermark PDF", icon: "💧" }
    ]
  },
  {
    name: "Image Tools", 
    icon: Image,
    tools: [
      { name: "Resize Image", icon: "📏" },
      { name: "Compress Image", icon: "📦" },
      { name: "Convert Format", icon: "🔄" },
      { name: "Remove Background", icon: "🎭" },
      { name: "Add Watermark", icon: "💧" },
      { name: "Crop Image", icon: "✂️" },
      { name: "Rotate Image", icon: "🔄" },
      { name: "Image Filters", icon: "🎨" }
    ]
  },
  {
    name: "Conversion Tools",
    icon: RefreshCw,
    tools: [
      { name: "PDF to JPG", icon: "🖼️" },
      { name: "Word to PDF", icon: "📄" },
      { name: "Excel to PDF", icon: "📊" },
      { name: "PPT to PDF", icon: "📽️" },
      { name: "Image Converter", icon: "🔄" },
      { name: "Video Converter", icon: "🎬" },
      { name: "Audio Converter", icon: "🎵" },
      { name: "Text to PDF", icon: "📝" }
    ]
  },
  {
    name: "Editing Tools",
    icon: Type,
    tools: [
      { name: "Word Counter", icon: "🔢" },
      { name: "Text Formatter", icon: "📝" },
      { name: "Case Converter", icon: "🔤" },
      { name: "Lorem Generator", icon: "📄" },
      { name: "QR Generator", icon: "📱" },
      { name: "Password Generator", icon: "🔐" },
      { name: "Color Picker", icon: "🎨" },
      { name: "Base64 Encoder", icon: "🔧" }
    ]
  }
];

export function FuturisticHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="nav-luxury">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ModernLogo />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              TOOLKIT
            </motion.span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 group nav-item"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Icon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{category.name}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 p-6"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {category.tools.map((tool) => (
                            <motion.div
                              key={tool.name}
                              whileHover={{ scale: 1.02, x: 2 }}
                              className="group"
                            >
                              <Link
                                href={`/tools/${tool.name.toLowerCase().replace(/ /g, '-')}`}
                                className="flex items-center gap-3 p-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200 group-hover:shadow-md"
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                  {tool.icon}
                                </span>
                                <span className="font-medium">{tool.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA Button */}
          <motion.button
            className="btn-luxury focus-luxury"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </header>
  );
}
