import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { therapists } from '@/data/therapists';
import { type Locale } from '@/types/i18n';
import { TherapistHero } from '@/components/sections/therapist-hero';
import { TherapistAbout } from '@/components/sections/therapist-about';
import { TherapistLocations } from '@/components/sections/therapist-locations';

interface TherapistProfilePageProps {
  params: {
    therapistId: string;
    locale: Locale;
  };
}

export async function generateMetadata({ params }: TherapistProfilePageProps): Promise<Metadata> {
  const therapist = therapists.find(t => t.id === params.therapistId);
  
  if (!therapist) {
    return {
      title: 'Therapist Not Found',
    };
  }

  return {
    title: `${therapist.name} - ${therapist.title[params.locale]}`,
    description: therapist.bio[params.locale],
  };
}

export default function TherapistProfilePage({ params }: TherapistProfilePageProps) {
  const therapist = therapists.find(t => t.id === params.therapistId);

  if (!therapist) {
    notFound();
  }

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <TherapistHero 
        therapist={therapist}
        locale={params.locale}
      />

      {/* About Section */}
      <TherapistAbout
        therapist={therapist}
        locale={params.locale}
      />

      {/* Locations Section */}
      <TherapistLocations
        therapist={therapist}
        locale={params.locale}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Location Section */}
        <section className="space-y-8">
          {/* Location content will go here */}
        </section>

        {/* Testimonials Section */}
        <section className="space-y-8">
          {/* Testimonials content will go here */}
        </section>
      </div>
    </main>
  );
} 