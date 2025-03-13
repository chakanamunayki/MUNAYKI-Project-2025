'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Locale } from '@/types/i18n';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  locale?: Locale;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  message,
  locale = 'en',
  className,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  const defaultMessage = locale === 'es' 
    ? 'Cargando, por favor espere...' 
    : 'Loading, please wait...';

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg bg-card shadow-lg">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-center text-muted-foreground">
          {message || defaultMessage}
        </p>
      </div>
    </div>
  );
} 