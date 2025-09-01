"use client";

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Poppins, Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { SubHeader } from '@/components/sub-header';
import { Footer } from '@/components/footer';

const fontBody = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Modern, professional toolkit for PDF editing, image conversion, and productivity tools - all in your browser" />
        <title>ToolKit - Modern PDF & Productivity Tools</title>
      </head>
      <body className={cn("font-body antialiased", fontBody.variable, fontHeading.variable)}>
          <ThemeProvider>
            <SubHeader />
            <main id="main-content" role="main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
