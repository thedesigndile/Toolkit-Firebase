
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ModernLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -80, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/80 shadow-md border-b border-border/20 backdrop-blur-lg" 
            : "bg-gradient-to-b from-background via-background/80 to-transparent"
        )}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <ModernLogo />
                  <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.div>
                <motion.span
                  className={cn(
                    "font-bold text-2xl tracking-wider text-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  TOOLKIT
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden md:flex items-center gap-2"
              variants={itemVariants}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              {navItems.map((item) => {
                const isActive = item.href === pathname;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                        "relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 rounded-lg",
                        isActive ? "text-primary" : "hover:text-primary"
                    )}
                    onMouseOver={() => setHoveredPath(item.href)}
                  >
                    <span>{item.name}</span>
                    {item.href === hoveredPath && (
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                            layoutId="underline"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                    )}
                  </Link>
                )
              })}
            </motion.nav>

            {/* Desktop Actions */}
            <motion.div 
              className="hidden md:flex items-center gap-4"
              variants={itemVariants}
            >
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-border hover:border-primary">
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg">
                  Get Started
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div 
              className="md:hidden flex items-center gap-2"
              variants={itemVariants}
            >
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg border border-border hover:border-primary hover:bg-muted transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="bg-background h-full flex flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3">
                    <ModernLogo />
                    <span className="font-bold text-xl text-foreground">TOOLKIT</span>
                  </div>
                </Link>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 p-6">
                <motion.nav
                  className="space-y-2"
                  initial="initial"
                  animate="animate"
                  variants={{
                    animate: { transition: { staggerChildren: 0.07 } }
                  }}
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block p-4 rounded-lg text-lg font-medium text-foreground hover:bg-muted transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Mobile Actions */}
              <div className="p-6 border-t border-border">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full h-12 text-md" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Button>
                  <Button className="w-full h-12 text-md bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
