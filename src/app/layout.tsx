import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import EntryAnimation from '@/components/entry-animation';
import { PageTransitionProvider } from '@/hooks/use-page-transition';

export const metadata: Metadata = {
  title: 'Kishan Patel | BOLT Universe',
  description: 'The futuristic portfolio of a next-gen AI/ML engineer.',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
  themeColor: '#0ff0fc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ff0fc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/10 text-foreground relative overflow-x-hidden'
        )}
      >
        {/* Futuristic blurred background shapes */}
        <div className="pointer-events-none fixed -top-32 -left-32 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="pointer-events-none fixed -bottom-32 -right-32 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-3xl opacity-20 -z-10"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            <EntryAnimation />
            {children}
            <Toaster />
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}