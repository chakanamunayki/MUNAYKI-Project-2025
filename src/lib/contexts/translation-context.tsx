'use client';

import * as React from 'react';
import { type Locale, type Translations } from '@/types/i18n';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, namespace?: keyof Translations) => string;
  isLoading: boolean;
}

export const TranslationContext = React.createContext<TranslationContextType | null>(null);

interface TranslationProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function TranslationProvider({
  children,
  initialLocale = 'en'
}: TranslationProviderProps) {
  const [locale, setLocale] = React.useState<Locale>(initialLocale);
  const [translations, setTranslations] = React.useState<Translations | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load translations
  React.useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      try {
        const common = await import(`@/locales/${locale}/common.json`);
        const navigation = await import(`@/locales/${locale}/navigation.json`);
        const home = await import(`@/locales/${locale}/home.json`);
        const chat = await import(`@/locales/${locale}/chat.json`);
        const therapists = await import(`@/locales/${locale}/therapists.json`);

        setTranslations({
          common: common.default,
          navigation: navigation.default,
          home: home.default,
          chat: chat.default,
          therapists: therapists.default,
        });
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTranslations();
  }, [locale]);

  // Translation function
  const t = React.useCallback((key: string, namespace: keyof Translations = 'common') => {
    if (!translations) return key;

    const keys = key.split('.');
    let current = translations[namespace] as Record<string, any>;

    for (const k of keys) {
      if (current?.[k] === undefined) return key;
      current = current[k];
    }

    return typeof current === 'string' ? current : key;
  }, [translations]);

  const value = React.useMemo(() => ({
    locale,
    setLocale,
    t,
    isLoading,
  }), [locale, t, isLoading]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  const context = React.useContext(TranslationContext);
  if (context === undefined || context === null) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 