'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/lib/contexts/translation-context';
import { CeremonyCard } from '@/components/cards/ceremony-card';
import { type Ceremony } from '@/types/ceremony';

// Sample ceremony data - replace with actual data from your API/CMS
const ceremonies: Ceremony[] = [
  {
    id: '1',
    type: 'ayahuasca',
    title: 'Sacred Ayahuasca Ceremony',
    date: 'March 15, 2024',
    time: '7:00 PM',
    image: '/images/ceremonies/ayahuasca-1.jpg',
    description: 'Experience profound healing and spiritual awakening through traditional Ayahuasca ceremony guided by experienced shamans.',
    location: 'La Chakana, Medellín',
    price: '$150 USD',
    capacity: 15,
    spotsLeft: 8,
    status: 'upcoming',
    link: '/ceremonies/ayahuasca/march-15',
  },
  {
    id: '2',
    type: 'ayahuasca',
    title: 'Full Moon Ayahuasca Ceremony',
    date: 'March 24, 2024',
    time: '7:00 PM',
    image: '/images/ceremonies/ayahuasca-2.jpg',
    description: 'Join us for a special Ayahuasca ceremony during the full moon, amplifying the healing energies and spiritual connection.',
    location: 'La Chakana, Medellín',
    price: '$150 USD',
    capacity: 15,
    spotsLeft: 4,
    status: 'upcoming',
    link: '/ceremonies/ayahuasca/march-24',
  },
  {
    id: '3',
    type: 'holistic-networking',
    title: 'Holistic Wellness Gathering',
    date: 'March 20, 2024',
    time: '5:00 PM',
    image: '/images/ceremonies/holistic-1.jpg',
    description: 'Connect with like-minded individuals in a sacred space. Share experiences, knowledge, and create meaningful connections.',
    location: 'La Chakana, Medellín',
    price: '$25 USD',
    capacity: 30,
    spotsLeft: 15,
    status: 'upcoming',
    link: '/ceremonies/holistic-networking/march-20',
  },
];

export function Ceremonies() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/chakana-bg.jpg"
          alt="La Chakana"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('ceremonies.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('ceremonies.description')}
          </p>
        </motion.div>

        {/* Venue Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/chakana-venue.jpg"
              alt="La Chakana Venue"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {t('ceremonies.venue.title')}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t('ceremonies.venue.description')}</p>
              <p>{t('ceremonies.venue.facilities')}</p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Ceremonies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-semibold">
            {t('ceremonies.upcoming.title')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ceremonies.map((ceremony) => (
              <CeremonyCard
                key={ceremony.id}
                ceremony={ceremony}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 