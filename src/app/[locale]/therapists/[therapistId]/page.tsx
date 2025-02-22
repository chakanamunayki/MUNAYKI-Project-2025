import { type Metadata } from 'next';
import { therapists } from '@/data/therapists';
import { type Locale } from '@/types/i18n';
import { notFound } from 'next/navigation';
import { TherapistHero } from '@/components/sections/therapist-hero';
import { TherapistAbout } from '@/components/sections/therapist-about';
import { TherapistLocations } from '@/components/sections/therapist-locations';

interface TherapistProfilePageProps {
  params: {
    locale: Locale;
    therapistId: string;
  };
}

export async function generateMetadata({ params }: TherapistProfilePageProps): Promise<Metadata> {
  const { locale, therapistId } = params;
  const therapist = therapists.find(t => t.id === therapistId);

  if (!therapist) {
    return {
      title: 'Therapist Not Found',
      description: 'The requested therapist profile could not be found.',
    };
  }

  return {
    title: `${therapist.name} - ${therapist.title[locale]}`,
    description: therapist.bio[locale],
  };
}

export default function TherapistProfilePage({ params }: TherapistProfilePageProps) {
  const { locale, therapistId } = params;
  const therapist = therapists.find(t => t.id === therapistId);

  if (!therapist) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <TherapistHero
        therapist={therapist}
        locale={locale}
      />

      <TherapistAbout
        therapist={therapist}
        locale={locale}
      />

      <TherapistLocations
        therapist={therapist}
        locale={locale}
      />
    </main>
  );
} 