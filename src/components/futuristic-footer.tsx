"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { ModernLogo } from "./icons";

const quickLinks = [
  { name: "All Tools", href: "/" },
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
  { name: "Converters", href: "/tools/convert" },
  { name: "Utilities", href: "/tools/utility" }
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Help Center", href: "/help" }
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" }
];

export function FuturisticFooter() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white relative overflow-hidden" style={{ backgroundColor: '#1e40af' }}>
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_40%)]" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <ModernLogo />
              <span className="text-2xl font-bold text-white">
                TOOLKIT
              </span>
            </motion.div>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Transform your workflow with our comprehensive suite of online tools. 
              Fast, secure, and reliable solutions for all your digital needs.
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>🚀 50+ Tools</span>
              <span>⚡ Lightning Fast</span>
              <span>🔒 100% Secure</span>
            </div>
          </motion.div>

          {/* Tools Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Tools</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200 py-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <div className="space-y-2">
              {companyLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200 py-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-white/80">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>


        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-white/60 mb-2">
            © 2025 Toolkit. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Built with ❤️ for productivity. Made to simplify your digital workflow.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}