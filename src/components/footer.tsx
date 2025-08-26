import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const toolCategories = [
    "Organize PDF",
    "Optimize PDF",
    "Convert to PDF",
    "Convert from PDF",
    "Edit PDF",
    "PDF Security",
    "Image Tools",
    "Utility Tools"
  ];

  return (
    <footer className="bg-card text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 text-foreground mb-6">
            <DileToolLogo className="h-8 w-auto" />
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium mb-6">
            {toolCategories.map(category => (
               <Link key={category} href="#" className="hover:text-accent transition-colors">
                  {category}
               </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 mb-8">
            <Link href="#" aria-label="Github">
              <Github className="h-5 w-5 hover:text-accent transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-accent transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 hover:text-accent transition-colors" />
            </Link>
          </div>

          <div className="pt-6 border-t w-full text-center text-sm">
              <p>&copy; {new Date().getFullYear()} Offline Toolkit. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
