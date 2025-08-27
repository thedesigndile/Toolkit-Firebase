
import Link from "next/link";
import { Github, Twitter, Linkedin, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModernLogo } from "./icons";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h4 className="font-semibold text-foreground tracking-wider">{title}</h4>
    {children}
  </div>
);

export function Footer() {
  return (
    <footer className="footer-bg text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        {/* Top section: Logo and Newsletter */}
        <div className="grid md:grid-cols-2 gap-8 border-b border-white/10 pb-10 mb-10">
            <div className="flex flex-col items-start max-w-md">
                <Link href="/" className="flex items-center gap-3 mb-4">
                    <ModernLogo />
                    <span className="text-2xl font-bold">Toolkit</span>
                </Link>
                <p className="text-muted-foreground text-base">
                    Your all-in-one suite of online tools for documents, images, and more. Simple, fast, and secure processing right in your browser.
                </p>
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                    Get the latest tool releases and feature updates delivered to your inbox.
                </p>
                 <form className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Enter your email" className="bg-white/5 border-white/20 placeholder:text-muted-foreground h-11" />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white h-11">Subscribe</Button>
                </form>
            </div>
        </div>

        {/* Middle section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <FooterColumn title="ORGANIZE PDF">
                <FooterLink href="/tools/merge-pdf">Merge PDF</FooterLink>
                <FooterLink href="/tools/split-pdf">Split PDF</FooterLink>
                <FooterLink href="/tools/compress-pdf">Compress PDF</FooterLink>
                <FooterLink href="/tools/remove-pages">Remove Pages</FooterLink>
                <FooterLink href="/tools/reorder-pages">Reorder Pages</FooterLink>
            </FooterColumn>
            <FooterColumn title="EDIT & SIGN">
                <FooterLink href="/tools/rotate-pdf">Rotate PDF</FooterLink>
                <FooterLink href="/tools/add-watermark">Add Watermark</FooterLink>
                <FooterLink href="/tools/sign-pdf">Sign PDF</FooterLink>
                <FooterLink href="/tools/draw-annotate-pdf">Annotate PDF</FooterLink>
                <FooterLink href="/tools/crop-pdf">Crop PDF</FooterLink>
            </FooterColumn>
            <FooterColumn title="CONVERT FROM PDF">
                <FooterLink href="/tools/pdf-to-word">PDF to Word</FooterLink>
                <FooterLink href="/tools/pdf-to-jpg">PDF to JPG</FooterLink>
                <FooterLink href="/tools/pdf-to-powerpoint">PDF to PowerPoint</FooterLink>
                <FooterLink href="/tools/pdf-to-excel">PDF to Excel</FooterLink>
                <FooterLink href="/tools/pdf-to-html">PDF to HTML</FooterLink>
            </FooterColumn>
            <FooterColumn title="CONVERT TO PDF">
                <FooterLink href="/tools/word-to-pdf">Word to PDF</FooterLink>
                <FooterLink href="/tools/jpg-to-pdf">JPG to PDF</FooterLink>
                <FooterLink href="/tools/powerpoint-to-pdf">PowerPoint to PDF</FooterLink>
                <FooterLink href="/tools/excel-to-pdf">Excel to PDF</FooterLink>
                <FooterLink href="/tools/html-to-pdf">HTML to PDF</FooterLink>
            </FooterColumn>
            <FooterColumn title="COMPANY">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterColumn>
        </div>

        {/* Bottom section: Copyright and Socials */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
                &copy; {new Date().getFullYear()} Toolkit Inc. All Rights Reserved.
            </p>
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                    <Link href="#" aria-label="Github"><Github className="h-5 w-5" strokeWidth={1.5} /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                    <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" strokeWidth={1.5} /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                    <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" strokeWidth={1.5} /></Link>
                </Button>
            </div>
        </div>
      </div>
    </footer>
  );
}

    