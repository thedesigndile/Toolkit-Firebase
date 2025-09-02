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
    { name: "Homepage", href: "/"},
    { name: "Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}>
        <div className="container flex h-20 items-center justify-between gap-4">
          {/* Logo and Brand */}
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group shrink-0">
            <DileToolLogo />
            <span className="font-bold text-lg tracking-wide text-foreground hidden sm:inline-block">
              Offline Toolkit
            </span>
          </Link>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg items-center">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search tools..."
                className="pr-12 h-10 border-border/80"
              />
              <Button size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10 rounded-md header-search-button">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="#" className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <LogIn className="h-4 w-4"/> Login
            </Link>
            <Link href="#" className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <UserPlus className="h-4 w-4"/> Register
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
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

        {/* Sub-Navigation Bar */}
        <nav className={cn(
            "hidden md:flex h-12 items-center justify-center border-t border-border/60",
            isScrolled ? "bg-background/80" : "bg-transparent"
        )}>
          <div className="container flex items-center justify-center gap-8">
            {mainNavLinks.map((link) => (
              <Link key={link.name} href={link.href} className="header-nav-link">
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Panel */}
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
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
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

              <div className="space-y-4">
                <div className="border-t my-4"></div>
                <div className="p-2 space-y-2">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
