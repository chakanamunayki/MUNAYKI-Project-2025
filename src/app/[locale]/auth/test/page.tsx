import { type Locale } from '@/types/i18n';
import { AuthTestClient } from './auth-test-client';

interface PageProps {
  params: { locale: Locale };
}

// Server Component
export default async function AuthTestPage({ params }: PageProps) {
  // Properly handle the async params
  const locale = await Promise.resolve(params.locale);
  
  return <AuthTestClient locale={locale} />;
} 