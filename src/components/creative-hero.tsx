"use client";

import { motion } from "framer-motion";

export function CreativeHero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          className="heading-1 mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Professional File Tools
        </motion.h1>
        
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: 'hsl(var(--text-secondary))' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Enterprise-grade PDF and document processing tools designed for professionals who demand precision and reliability.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.button
            className="btn-luxury focus-luxury"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Start Processing
          </motion.button>
          
          <motion.button
            className="nav-item px-6 py-3 rounded-lg border border-gray-200 surface-glass"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
