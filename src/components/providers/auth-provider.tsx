'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Set hydrated state
    setIsHydrated(true);
  }, []);

  // Show nothing until hydration is complete
  if (!isHydrated) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
} 