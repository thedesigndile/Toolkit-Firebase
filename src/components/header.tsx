
"use client";

import { useState } from "react";
import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Search, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Input } from "./ui/input";

const navLinks = [
    { name: "Home", href: "/"},
    { name: "Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full border-b">
        <div className="container mx-auto px-4">
          {/* Top section with logo, search, and login */}
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
                <DileToolLogo />
                <span className="font-bold text-xl tracking-wider whitespace-nowrap text-foreground">
                  ToolBox
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
              <div className="relative w-full max-w-md">
                <Input
                  type="search"
                  placeholder="Search for tools..."
                  className="w-full pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="#" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Lock className="h-4 w-4" />
                Login
              </Link>
              <Link href="#" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <User className="h-4 w-4" />
                Register
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
        </div>

        {/* Bottom navigation bar */}
        <nav className="hidden md:flex items-center justify-center h-12 border-t">
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary rounded-md transition-colors"
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
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
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-2">
                  <DileToolLogo />
                  <span className={cn("font-bold text-xl")}>ToolBox</span>
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
                {navLinks.map((link) => (
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

              <div className="mt-8 border-t pt-6 flex flex-col gap-4">
                <Link href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                  Login
                </Link>
                <Link href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                  Register
                </Link>
                 <div className="mt-4">
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
