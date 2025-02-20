'use client';

import { motion } from 'framer-motion';
import { type Therapist } from '@/types/therapist';
import { TherapistCard } from '@/components/cards/therapist-card';
import { useTranslation } from '@/lib/contexts/translation-context';
import { fadeIn } from '@/lib/motion';

interface TherapistsSectionProps {
  therapists: Therapist[];
}

export function TherapistsSection({ therapists }: TherapistsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <motion.h2
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="text-4xl font-bold tracking-tight"
            >
              <span className="section-title">
                {t('therapists.title', 'home')}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('therapists.description', 'home')}
            </motion.p>
          </div>

          {/* Therapists Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {therapists.map((therapist) => (
              <TherapistCard
                key={therapist.id}
                therapist={therapist}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 