'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { type Locale } from '@/types/i18n';
import { useAuth } from '@/hooks/use-auth';

interface AuthenticatingPageProps {
  locale: Locale;
  redirectTo?: string;
  message?: string;
}

export function AuthenticatingPage({
  locale,
  redirectTo,
  message,
}: AuthenticatingPageProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // If auth is still loading, wait
    if (loading) return;

    // Auth has been checked
    setAuthChecked(true);

    // If user is authenticated, redirect to the specified page or home
    if (user) {
      const destination = redirectTo || `/${locale}`;
      router.push(destination);
    } else {
      // If not authenticated, redirect to auth page
      const authUrl = `/${locale}/auth`;
      const url = redirectTo ? `${authUrl}?redirectTo=${encodeURIComponent(redirectTo)}` : authUrl;
      router.push(url);
    }
  }, [user, loading, locale, redirectTo, router]);

  // Custom messages based on authentication state
  const getLoadingMessage = () => {
    if (!authChecked) {
      return locale === 'es' 
        ? 'Verificando autenticación...' 
        : 'Checking authentication...';
    }
    
    if (user) {
      return locale === 'es'
        ? 'Autenticado! Redirigiendo...'
        : 'Authenticated! Redirecting...';
    }
    
    return locale === 'es'
      ? 'Redirigiendo a la página de inicio de sesión...'
      : 'Redirecting to login page...';
  };

  return (
    <LoadingOverlay 
      isLoading={true}
      message={message || getLoadingMessage()}
      locale={locale}
    />
  );
} 