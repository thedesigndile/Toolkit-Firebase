import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

const fontBody = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

const fontHeading = Poppins({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'Offline Toolkit - Your Go-To for Productivity',
  description: 'A comprehensive suite of offline-first tools for document and media processing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontBody.variable, fontHeading.variable)}>
        <ThemeProvider>
          <Header />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
