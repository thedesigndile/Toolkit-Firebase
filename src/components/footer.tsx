"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { DileToolLogo } from "./icons";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <DileToolLogo />
              <span className="font-bold text-xl">ToolBox</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-white/80 hover:text-white transition-transform duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} ToolBox. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
