"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, ArrowUp } from "lucide-react";
import { ModernLogo } from "./icons";
import { Button } from "./ui/button";

const footerLinks = {
  product: [
    { name: "All Tools", href: "/tools" },
    { name: "Merge PDF", href: "/tools/merge-pdf" },
    { name: "Compress PDF", href: "/tools/compress-pdf" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer className="relative bg-background border-t border-border/20 text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_100%,hsl(var(--primary)),transparent_40%)]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ModernLogo />
              </motion.div>
              <span className="font-bold text-2xl tracking-wider">TOOLKIT</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Transform your workflow with our comprehensive suite of online tools. 
              Fast, secure, and reliable solutions for all your digital needs.
            </p>
            <div className="space-y-3">
              <motion.a href="mailto:hello@toolkit.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-5 w-5" />
                <span>hello@toolkit.com</span>
              </motion.a>
              <motion.a href="tel:+15551234567"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6 text-foreground">Product</h3>
            <div className="space-y-3">
              {footerLinks.product.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6 text-foreground">Company</h3>
            <div className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6 text-foreground">Support</h3>
            <div className="space-y-3">
              {footerLinks.support.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-border/20 pt-8 mt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Toolkit. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-300"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
