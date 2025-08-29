
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
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
      <body className={cn("font-body antialiased", fontBody.variable)}>
        <ThemeProvider>
            <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
              <ClientHeader />
            </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
