'use client';

import * as React from 'react';
import { ThemeProvider } from './theme-provider';
import { TranslationProvider } from '@/lib/contexts/translation-context';
import { type Locale } from '@/types/i18n';

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
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