import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ModernHeader } from '@/components/modern-header';
import { ModernFooter } from '@/components/modern-footer';
import { cn } from '@/lib/utils';
import { AccessibilityProvider } from '@/components/accessibility-provider';
import { PerformanceMonitor } from '@/components/performance-monitor';

const fontBody = Open_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '600'],
  display: 'swap',
});

const fontHeading = Open_Sans({
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
            <ModernHeader />
            <main id="main-content" role="main">
              {children}
            </main>
            <ModernFooter />
            <Toaster />
            <PerformanceMonitor />
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
