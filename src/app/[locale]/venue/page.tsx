import { VenueSection } from '@/components/sections/venue/venue-section';
import { type Locale } from '@/types/i18n';

interface VenuePageProps {
  params: {
    locale: Locale;
  };
}

export default function VenuePage({ params: { locale } }: VenuePageProps) {
  return (
    <main className="relative">
      <VenueSection locale={locale} />
    </main>
  );
} 