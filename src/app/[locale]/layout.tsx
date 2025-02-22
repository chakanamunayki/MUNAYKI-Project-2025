import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/components/providers/providers';
import { MainNav } from '@/components/layout';
import { MobileNav } from '@/components/layout/mobile-nav';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { type Locale } from '@/types/i18n';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Munayki Platform',
  description: 'Connect with ceremonies, therapists, and retreats',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  return (
    <body className={cn(inter.className, 'min-h-screen antialiased')} lang={locale}>
      <AuthProvider>
        <Providers locale={locale}>
          <div className="flex min-h-screen flex-col">
            <header className="fixed top-0 z-50 w-full bg-white/95 dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center justify-between">
                <MainNav className="hidden md:flex" />
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  <MobileNav />
                </div>
              </div>
            </header>
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </AuthProvider>
    </body>
  );
} 