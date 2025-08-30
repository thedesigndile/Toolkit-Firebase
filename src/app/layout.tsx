
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider, SkipToContent } from '@/components/accessibility-provider';
import { PerformanceMonitor, usePerformanceOptimization } from '@/components/performance-monitor';
import { ServiceWorkerRegistration } from '@/components/service-worker-registration';
import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { ClientHeader } from '@/components/client-header';

const fontBody = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Advanced offline toolkit with cutting-edge UI design" />
        <title>Offline Toolkit - Advanced PDF and Document Tools</title>
      </head>
      <body className={cn("font-body antialiased", fontBody.variable)}>
        <AccessibilityProvider>
          <ThemeProvider>
            <PerformanceMonitor />
            <ServiceWorkerRegistration />
            <SkipToContent />
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
              <ClientHeader />
            </div>
            <main id="main-content" role="main">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
