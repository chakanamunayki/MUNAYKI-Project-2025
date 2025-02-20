'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/contexts/translation-context';
import { type Locale } from '@/types/i18n';

interface LanguageToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function LanguageToggle({ className, ...props }: LanguageToggleProps) {
  const { locale, setLocale, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'es' : 'en';
    setLocale(newLocale);
    
    // Update URL to reflect new locale
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className={cn('relative inline-flex', className)} {...props}>
      <Button
        variant="ghost"
        onClick={toggleLanguage}
        className="text-sm font-medium h-9 px-3 hover:bg-accent"
        title={t('language.toggle', 'navigation')}
      >
        {t(`language.${locale}`, 'navigation')}
      </Button>
    </div>
  );
} 