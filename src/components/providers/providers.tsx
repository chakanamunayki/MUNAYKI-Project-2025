'use client';

import { ThemeProvider } from 'next-themes';
import { TranslationProvider } from '@/lib/contexts/translation-context';
import { type Locale } from '@/types/i18n';
import { useEffect } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TranslationProvider initialLocale={locale}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  );
} 