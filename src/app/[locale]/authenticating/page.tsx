'use client';

import { AuthenticatingPage } from '@/components/auth/authenticating-page';
import { useSearchParams } from 'next/navigation';
import { type Locale } from '@/types/i18n';

export default function AuthenticatingRoute({
  params,
}: {
  params: { locale: Locale };
}) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || undefined;
  const message = searchParams.get('message') || undefined;

  return (
    <AuthenticatingPage 
      locale={params.locale}
      redirectTo={redirectTo}
      message={message}
    />
  );
} 