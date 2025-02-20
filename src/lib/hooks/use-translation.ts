'use client';

import { useContext } from 'react';
import { TranslationContext } from '@/lib/contexts/translation-context';

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 