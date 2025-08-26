import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { Github, Twitter, Linkedin } from "lucide-react";
import { tools } from "@/lib/tools";

export function Footer() {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <footer className="bg-muted dark:bg-card/40 text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <DileToolLogo className="h-10 w-auto" />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {categories.map(category => (
                 <Link key={category} href="#" className="hover:text-primary transition-colors">
                    {category}
                 </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Github">
                <Github className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Dile Tool. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
