
"use client";

import Link from "next/link";
import { ArrowUp, Twitter, Facebook, Instagram } from "lucide-react";
import { ModernLogo } from "./icons";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Rajdhani } from "next/font/google";

const fontLogo = Rajdhani({
  subsets: ['latin'],
  weight: ['600'],
});

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-gray-300 hover:text-white transition-colors">
    {children}
  </Link>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h4 className="font-semibold text-white tracking-wider uppercase text-sm">{title}</h4>
    {children}
  </div>
);

const SocialIcon = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
        <Icon className="h-5 w-5" />
    </Link>
)

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  return (
    <footer className="footer-bg text-white relative">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="flex flex-col items-start max-w-sm">
                <Link href="/" className="flex items-center gap-3 mb-4">
                    <ModernLogo />
                    <span className={cn(fontLogo.className, "font-semibold text-2xl text-white tracking-widest whitespace-nowrap")}>TOOL KIT</span>
                </Link>
                <p className="text-gray-300 text-base">
                    Your all-in-one suite of online tools for documents, images, and more. Simple, fast, and secure processing right in your browser.
                </p>
            </div>

            <FooterColumn title="Convert PDF">
                 <FooterLink href={getToolUrl('PDF to Word')}>PDF to Word</FooterLink>
                 <FooterLink href={getToolUrl('Word to PDF')}>Word to PDF</FooterLink>
                 <FooterLink href={getToolUrl('PDF to JPG')}>PDF to JPG</FooterLink>
                 <FooterLink href={getToolUrl('Image to PDF')}>Image to PDF</FooterLink>
                 <FooterLink href={getToolUrl('Image Converter')}>Image Converter</FooterLink>
            </FooterColumn>
            
            <FooterColumn title="Organize PDF">
                <FooterLink href={getToolUrl('Merge PDF')}>Merge PDF</FooterLink>
                <FooterLink href={getToolUrl('Split PDF')}>Split PDF</FooterLink>
                <FooterLink href={getToolUrl('Remove Pages')}>Remove Pages</FooterLink>
                <FooterLink href={getToolUrl('Extract Pages')}>Extract Pages</FooterLink>
                <FooterLink href={getToolUrl('Reorder Pages')}>Reorder Pages</FooterLink>
            </FooterColumn>

            <FooterColumn title="Utilities">
                 <FooterLink href={getToolUrl('Image Compressor')}>Image Compressor</FooterLink>
                 <FooterLink href={getToolUrl('Password Generator')}>Password Generator</FooterLink>
                 <FooterLink href={getToolUrl('QR Code Generator')}>QR Code Generator</FooterLink>
                 <FooterLink href={getToolUrl('Text Compare')}>Text Compare</FooterLink>
                 <FooterLink href={getToolUrl('Website to PDF')}>Website to PDF</FooterLink>
            </FooterColumn>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col-reverse sm:grid sm:grid-cols-3 justify-between items-center gap-6">
            <div className="flex gap-4 items-center">
                <SocialIcon href="https://x.com" icon={Twitter} />
                <SocialIcon href="https://facebook.com" icon={Facebook} />
                <SocialIcon href="https://instagram.com" icon={Instagram} />
            </div>

            <div className="flex justify-center">
                 <Button onClick={handleScrollToTop} variant="outline" className="p-3 rounded-full bg-transparent border-white/20 hover:bg-white/10 text-white transition-all hover:scale-110 focus:outline-none h-auto w-auto">
                    <ArrowUp className="h-5 w-5" />
                </Button>
            </div>
            
            <p className="text-sm text-gray-400 text-center sm:text-right">
                &copy; {new Date().getFullYear()} Toolkit Inc. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
