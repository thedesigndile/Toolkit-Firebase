"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { ModernLogo } from "./icons";
import { tools } from "@/lib/tools";

const popularTools = tools.slice(0, 5);

const categories = [
    { name: "PDF Tools", href: "/tools#pdf-tools" },
    { name: "Image Tools", href: "/tools#image-tools" },
    { name: "Conversion Tools", href: "/tools#conversion-tools" },
    { name: "Editing Tools", href: "/tools#editing-tools" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ModernLogo />
              <span className="font-bold text-2xl font-heading">TOOL KIT</span>
            </div>
            <p className="text-indigo-100 leading-relaxed">
              A comprehensive suite of online tools to make your life easier.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-heading">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="block text-indigo-200 hover:text-white transition-colors duration-300">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Popular Tools */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-heading">Popular Tools</h3>
            <div className="space-y-3">
              {popularTools.map((tool) => (
                <Link key={tool.name} href={`/tools/${tool.name.toLowerCase().replace(/ /g, '-')}`} className="block text-indigo-200 hover:text-white transition-colors duration-300">
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-heading">Contact</h3>
            <div className="space-y-3 mb-6">
              <a href="mailto:support@toolkit.com" className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors duration-300">
                <Mail className="h-5 w-5" />
                <span>support@toolkit.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors duration-300">
                <Phone className="h-5 w-5" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-indigo-200 hover:text-white transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-indigo-200 hover:text-white transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-indigo-200 hover:text-white transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-indigo-200 hover:text-white transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8">
          <p className="text-center text-indigo-200 text-sm">
            © {new Date().getFullYear()} TOOL KIT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
