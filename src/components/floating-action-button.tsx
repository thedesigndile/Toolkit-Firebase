"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, HelpCircle, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const actions = [
  { icon: MessageCircle, label: "Chat Support", action: () => console.log("Chat") },
  { icon: HelpCircle, label: "Help Center", action: () => console.log("Help") },
  { icon: ArrowUp, label: "Scroll to Top", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                    className="glass-card hover-gradient hover:text-white shadow-medium hover:shadow-glow w-12 h-12 rounded-full p-0 group border-gradient"
                    title={action.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {action.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-ripple bg-gradient-primary hover:bg-gradient-hover text-white shadow-gradient hover:shadow-glow w-14 h-14 rounded-full p-0 float energy-pulse"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Scroll to Top Button (separate from FAB) */}
      <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.div
            className="absolute bottom-20 right-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="glass-card hover-gradient hover:text-white shadow-medium hover:shadow-glow w-12 h-12 rounded-full p-0 border-gradient"
                title="Scroll to Top"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}