'use client';

import { AuthProvider as AuthContextProvider } from '@/lib/contexts/AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
} 