"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Menu, X, Search, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const mainNavLinks = [
    { name: "Home", href: "/"},
    { name: "Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-lg" : "bg-transparent"
      )}>
        <div className="container flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
            <DileToolLogo />
            <span className="font-bold text-lg tracking-wide text-foreground hidden sm:inline-block">
              Offline Toolkit
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center justify-center gap-2">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary group"
              >
                {link.name}
                <motion.span 
                  layoutId={`underline-${link.name}`} 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="#">
                <LogIn className="h-4 w-4 mr-1.5"/> Login
              </Link>
            </Button>
            <Button asChild className="btn-primary">
              <Link href="#">
                <UserPlus className="h-4 w-4 mr-1.5"/> Register
              </Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
                <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-background z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-2">
                  <DileToolLogo />
                  <span className={cn("font-bold text-lg")}>Offline Toolkit</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="flex flex-col gap-2">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block p-4 text-lg font-semibold text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="border-t my-4"></div>
              <div className="p-4 space-y-4">
                 <Link href="#" className="flex items-center text-lg font-semibold text-foreground hover:bg-accent rounded-md p-4 transition-colors">
                  <LogIn className="h-5 w-5 mr-3"/> Login
                </Link>
                <Link href="#" className="flex items-center text-lg font-semibold text-foreground hover:bg-accent rounded-md p-4 transition-colors">
                  <UserPlus className="h-5 w-5 mr-3"/> Register
                </Link>
                <div className="flex items-center justify-between p-4">
                  <span className="text-lg font-semibold">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
