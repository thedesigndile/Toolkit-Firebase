
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { ModernLogo } from "./icons";
import { tools } from "@/lib/tools";

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm">{title}</h4>
    {children}
  </div>
);

const importantTools = [
    'Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word', 'Word to PDF',
    'PDF to JPG', 'JPG to PDF', 'Image Converter', 'Image Compressor', 'Image Resizer',
    'Video Compressor', 'Trim Video', 'Password Generator', 'QR Code Generator', 'Text Compare'
]

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  return (
    <footer className="footer-bg text-foreground relative">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 flex flex-col items-start max-w-sm">
                <Link href="/" className="flex items-center gap-3 mb-4">
                    <ModernLogo />
                    <span className="text-2xl font-bold">Toolkit</span>
                </Link>
                <p className="text-muted-foreground text-base">
                    Your all-in-one suite of online tools for documents, images, and more. Simple, fast, and secure processing right in your browser.
                </p>
            </div>

            <FooterColumn title="Organize">
                <FooterLink href={getToolUrl('Merge PDF')}>Merge PDF</FooterLink>
                <FooterLink href={getToolUrl('Split PDF')}>Split PDF</FooterLink>
                <FooterLink href={getToolUrl('Remove Pages')}>Remove Pages</FooterLink>
                <FooterLink href={getToolUrl('Extract Pages')}>Extract Pages</FooterLink>
                <FooterLink href={getToolUrl('Reorder Pages')}>Reorder Pages</FooterLink>
            </FooterColumn>

            <FooterColumn title="Convert">
                 <FooterLink href={getToolUrl('PDF to Word')}>PDF to Word</FooterLink>
                 <FooterLink href={getToolUrl('Word to PDF')}>Word to PDF</FooterLink>
                 <FooterLink href={getToolUrl('PDF to JPG')}>PDF to JPG</FooterLink>
                 <FooterLink href={getToolUrl('JPG to PDF')}>JPG to PDF</FooterLink>
                 <FooterLink href={getToolUrl('Image Converter')}>Image Converter</FooterLink>
            </FooterColumn>
            
            <FooterColumn title="Utilities">
                 <FooterLink href={getToolUrl('Image Compressor')}>Image Compressor</FooterLink>
                 <FooterLink href={getToolUrl('Video Compressor')}>Video Compressor</FooterLink>
                 <FooterLink href={getToolUrl('Password Generator')}>Password Generator</FooterLink>
                 <FooterLink href={getToolUrl('QR Code Generator')}>QR Code Generator</FooterLink>
                 <FooterLink href={getToolUrl('Text Compare')}>Text Compare</FooterLink>
            </FooterColumn>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
                &copy; {new Date().getFullYear()} Toolkit Inc. All Rights Reserved.
            </p>
             <button onClick={handleScrollToTop} className="absolute bottom-6 right-6 p-3 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white transition-all hover:scale-110 focus:outline-none">
                <ArrowUp className="h-5 w-5" />
            </button>
        </div>
      </div>
    </footer>
  );
}
