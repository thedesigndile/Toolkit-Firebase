
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "h-16 bg-background/80 backdrop-blur-lg border-b"
          : "h-20 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" aria-label="Go to homepage">
            <div className="flex items-center gap-2">
                <DileToolLogo />
                <span className="text-xl font-bold text-foreground">Toolkit</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/tools">
              <Button className="hidden md:flex bg-primary hover:bg-gradient-primary text-primary-foreground font-bold relative overflow-hidden group transition-all duration-300">
                  Get Started
                   <span className="absolute -inset-0.5 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-75 blur transition-opacity duration-300"></span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <User className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden fixed inset-0 bg-background z-50"
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                         <div className="flex items-center gap-2">
                            <DileToolLogo />
                            <span className="text-xl font-bold text-foreground">Toolkit</span>
                        </div>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex flex-col items-center justify-center h-full gap-8">
                     {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/tools">
                      <Button size="lg" className="bg-gradient-primary text-primary-foreground font-bold">Get Started</Button>
                    </Link>
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link href={href} className="relative text-sm font-medium text-foreground hover:text-primary p-2 transition-colors group">
            {children}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
        </Link>
    );
};
