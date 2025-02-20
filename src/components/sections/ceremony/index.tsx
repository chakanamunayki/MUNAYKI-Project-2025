import { type Locale } from '@/types/i18n'
import { Hero } from './hero'

interface CeremonySectionProps {
  locale: Locale
}

// Sample data - This should come from your API/database
const sampleCeremony = {
  title: {
    en: 'Itorii at La Chakana - Ayahuasca Ceremony',
    es: 'Itorii en La Chakana - Ceremonia de Ayahuasca'
  },
  subtitle: {
    en: 'A sacred medicine journey',
    es: 'Un viaje sagrado de medicina'
  },
  date: '2024-03-15',
  startTime: '4:00 PM',
  endTime: '9:00 AM',
  location: {
    venue: 'La Chakana',
    city: 'Medellín'
  },
  image: {
    src: '/images/ceremonies/ayahuasca-ceremony.jpg',
    alt: {
      en: 'Ayahuasca ceremony space at La Chakana',
      es: 'Espacio de ceremonia de Ayahuasca en La Chakana'
    }
  }
}

export function CeremonySection({ locale }: CeremonySectionProps) {
  return (
    <section>
      {/* Hero Section */}
      <Hero locale={locale} ceremony={sampleCeremony} />

      {/* Ceremonies Grid - To be implemented */}
      <div className="container py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Ceremony cards will be added here */}
        </div>
      </div>
    </section>
  )
} 