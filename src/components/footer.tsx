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
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <DileToolLogo className="h-8 w-auto" />
                </div>
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium mb-4 md:mb-0">
                    <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">About</Link>
                    <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy</Link>
                    <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms</Link>
                    <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</Link>
                </nav>
                 <div className="flex items-center gap-4">
                    <Link href="#" aria-label="Github">
                        <Github className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                    </Link>
                    <Link href="#" aria-label="Twitter">
                        <Twitter className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                    </Link>
                    <Link href="#" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                    </Link>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Offline Toolkit. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
}
