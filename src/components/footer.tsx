"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Rss } from "lucide-react";
import { DileToolLogo } from "./icons";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "RSS", icon: Rss, href: "#" }
];

const footerLinks = [
    { name: "Home", href: "/"},
    { name: "Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
    { name: "Privacy Policy", href: "#"},
    { name: "Terms of Service", href: "#"}
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <DileToolLogo />
              <span className="font-bold text-lg">Offline Toolkit</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 md:mb-0">
                {footerLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                ))}
            </nav>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-all duration-200"
                  whileHover={{ scale: 1.2, y: -2 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Offline Toolkit. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
