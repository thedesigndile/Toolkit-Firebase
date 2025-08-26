import { tools } from "@/lib/tools";
import { DileToolLogo } from "@/components/icons";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const toolsByGroup = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  const categoryOrder = [
    'Organize PDF',
    'Optimize PDF',
    'Convert to PDF',
    'Convert from PDF',
    'Edit PDF',
    'PDF Security',
    'Image Tools',
    'Utility Tools',
  ];

  return (
    <footer className="bg-muted dark:bg-card/40 text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          {categoryOrder.map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {toolsByGroup[category]?.map((tool) => {
                   const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
                   return (
                    <li key={tool.name}>
                      <Link href={`/tools/${slug}`} className="hover:text-primary transition-colors text-sm">
                        {tool.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <DileToolLogo className="h-10 w-auto" />
              <span className="text-sm">
                &copy; {new Date().getFullYear()} Dile Tool. All Rights Reserved.
              </span>
            </div>
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
        </div>
      </div>
    </footer>
  );
}
