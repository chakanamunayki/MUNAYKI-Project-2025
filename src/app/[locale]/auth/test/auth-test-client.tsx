'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/auth/auth-modal';
import { Button } from '@/components/ui/button';
import { type Locale } from '@/types/i18n';

interface AuthTestClientProps {
  locale: Locale;
}

export function AuthTestClient({ locale }: AuthTestClientProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();

  // Add environment variable check
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="container py-20 space-y-8">
      <h1 className="text-4xl font-bold">Auth Test Page</h1>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Environment Check:</h2>
        <pre className="p-4 bg-muted rounded-lg overflow-auto">
          SUPABASE_URL: {supabaseUrl ? '✅ Set' : '❌ Missing'}\n
          SUPABASE_KEY: {supabaseKey ? '✅ Set' : '❌ Missing'}
        </pre>

        <h2 className="text-2xl font-semibold">Current User:</h2>
        <pre className="p-4 bg-muted rounded-lg overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="space-x-4">
        {user ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => setShowAuthModal(true)}>Open Auth Modal</Button>
        )}
      </div>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        locale={locale}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
} 