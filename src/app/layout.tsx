import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { AccessibilityProvider } from '@/components/accessibility-provider';
import { PerformanceMonitor } from '@/components/performance-monitor';

const fontBody = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap',
});

const fontHeading = Poppins({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700'],
  display: 'swap',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontBody.variable, fontHeading.variable)}>
        <AccessibilityProvider>
          <ThemeProvider>
            <Header />
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
            <Toaster />
            <PerformanceMonitor />
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
