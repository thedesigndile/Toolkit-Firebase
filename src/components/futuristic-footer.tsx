"use client";

import { motion } from "framer-motion";
import { ModernLogo } from "./icons";
import Link from "next/link";

export function FuturisticFooter() {
  return (
    <footer className="surface-glass border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              className="heading-3 mb-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ModernLogo />
              <span className="text-gradient">TOOLKIT</span>
            </motion.h3>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'hsl(var(--text-secondary))' }}>
              Professional-grade file processing tools designed for enterprise workflows. 
              Secure, fast, and reliable document management solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'hsl(var(--text-secondary))' }}>
              <li><Link href="#" className="nav-item inline-block p-0">PDF Converter</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">Document Merger</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">File Compressor</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">Security Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'hsl(var(--text-secondary))' }}>
              <li><Link href="#" className="nav-item inline-block p-0">About</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">Privacy</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">Terms</Link></li>
              <li><Link href="#" className="nav-item inline-block p-0">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm" style={{ color: 'hsl(var(--text-secondary))' }}>
            © 2024 TOOLKIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
