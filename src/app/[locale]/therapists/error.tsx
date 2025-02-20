'use client';

import { useEffect } from 'react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { useTranslation } from '@/lib/contexts/translation-context';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">
            {t('errors.somethingWentWrong', 'common')}
          </h2>
          <p className="text-muted-foreground">
            {t('errors.tryAgainLater', 'common')}
          </p>
          <ButtonColorful
            onClick={reset}
            label={t('buttons.tryAgain', 'common')}
          />
        </div>
      </div>
    </main>
  );
} 