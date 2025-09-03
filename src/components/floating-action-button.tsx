"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, HelpCircle, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const actions = [
  { icon: MessageCircle, label: "Chat Support", action: () => console.log("Chat") },
  { icon: HelpCircle, label: "Help Center", action: () => console.log("Help") },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-3"
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-end"
                >
                  <div className="bg-background shadow-md text-foreground px-3 py-1 rounded-lg text-sm whitespace-nowrap mr-3">
                    {action.label}
                  </div>
                  <Button
                    size="icon"
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground shadow-lg"
                    aria-label={action.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-3">
        <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-primary text-white shadow-lg shadow-primary/40"
          aria-label={isOpen ? "Close actions" : "Open actions"}
        >
          <motion.div
             animate={{ rotate: isOpen ? 45 : 0 }}
             transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Plus className="h-7 w-7" />
          </motion.div>
        </Button>
      </motion.div>
      </div>
    </div>
  );
}
