
"use client";

import { useState } from "react";
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
            <DileToolLogo />
            <span className="font-bold text-lg tracking-wide text-foreground hidden sm:inline-block">
              Offline Toolkit
            </span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-md items-center">
            <Input
              type="search"
              placeholder="Search for tools..."
              className="pr-10"
            />
            <Button variant="ghost" size="icon" className="-ml-10 z-10 text-muted-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <LogIn className="h-4 w-4 mr-1.5"/> Login
            </Link>
            <Link href="#" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <UserPlus className="h-4 w-4 mr-1.5"/> Register
            </Link>
            <ThemeToggle />
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
        <nav className="hidden md:block border-t border-border/40">
          <div className="container flex items-center justify-center gap-8 py-2">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
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
