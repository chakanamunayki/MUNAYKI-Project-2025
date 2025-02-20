import { type Metadata } from 'next';
import { TherapistsSection } from '@/components/sections/therapists-section';
import { therapists } from '@/data/therapists';
import { type Locale } from '@/types/i18n';

interface TherapistsPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: TherapistsPageProps): Promise<Metadata> {
  return {
    title: 'Our Therapists | MunayKi',
    description: 'Meet our experienced therapists offering a range of holistic healing services.',
  };
}

export default function TherapistsPage() {
  return (
    <main className="relative min-h-screen">
      <TherapistsSection therapists={therapists} />
    </main>
  );
} 