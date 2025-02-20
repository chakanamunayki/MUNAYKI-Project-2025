'use client';

import { useLocale } from 'next-intl';
import { DashboardContent } from '@/components/dashboard/dashboard-content';

export default function DashboardPage() {
  const locale = useLocale();

  return (
    <main className="container mx-auto py-8 px-4">
      <DashboardContent locale={locale} />
    </main>
  );
} 