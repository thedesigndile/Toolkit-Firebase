"use client";

import { useState } from "react";
import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
    { name: "Home", href: "/"},
    { name: "Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const navButtonClasses = "font-semibold text-sm px-4 py-3 bg-transparent text-foreground hover:text-primary rounded-xl transition-all duration-300";

  return (
    <>
      <motion.header
        className={cn(
          "hidden md:flex items-center justify-between w-full max-w-7xl mx-auto p-4 fixed top-0 left-1/2 -translate-x-1/2 z-50",
          "bg-gradient-to-b from-primary-dark/80 to-primary/80 backdrop-blur-lg"
        )}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex-shrink-0"
          variants={navItemVariants}
        >
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <DileToolLogo />
            </motion.div>
            <motion.span
              className={cn("font-bold text-xl text-white tracking-wider whitespace-nowrap")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ToolBox
            </motion.span>
          </Link>
        </motion.div>
        
        <motion.div
          className="flex-grow flex justify-center"
          variants={navItemVariants}
        >
          <nav className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={link.href} className={cn(navButtonClasses, "text-white hover:bg-white/10 hover:text-primary-light")}>
                    {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        <motion.div className="flex items-center gap-2" variants={navItemVariants}>
          <ThemeToggle />
           <Button>Get Started</Button>
        </motion.div>

      </motion.header>

      {/* Mobile Header */}
      <motion.div
        className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-primary-dark/90 backdrop-blur-lg border-b border-border fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="flex-1 flex justify-start"
          whileTap={{ scale: 0.95 }}
        >
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="text-white hover:bg-white/10 hover:text-primary-light"
          >
              <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </motion.div>
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
                <DileToolLogo />
                <span className={cn("font-bold text-xl text-white")}>ToolBox</span>
            </Link>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-end"
          whileHover={{ scale: 1.1 }}
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-background z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-navigation"
          >
            <motion.div
              className="flex justify-between items-center p-4 border-b border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-2">
                  <DileToolLogo />
                  <span className={cn("font-bold text-xl")}>ToolBox</span>
              </Link>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="flex-1 overflow-y-auto"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="p-4">
                <motion.div className="flex flex-col" variants={mobileMenuContainerVariants} initial="hidden" animate="visible">
                    {navLinks.map((link) => (
                        <motion.div key={link.name} variants={mobileMenuItemVariants}>
                             <Link
                                href={link.href}
                                className="block p-4 text-lg font-semibold text-foreground hover:bg-accent/10 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="p-4 border-t border-border"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
               <motion.div
                 className="grid grid-cols-1 gap-3"
                 variants={mobileMenuItemVariants}
               >
                 <Button size="lg" className="w-full">Get Started</Button>
               </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}