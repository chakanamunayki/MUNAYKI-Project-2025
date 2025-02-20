'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Globe2, Video, Users } from 'lucide-react';
import { type Therapist } from '@/types/therapist';
import { type Locale } from '@/types/i18n';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/contexts/translation-context';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/motion';

interface TherapistHeroProps {
  therapist: Therapist;
  locale: Locale;
  className?: string;
}

export function TherapistHero({ therapist, locale, className }: TherapistHeroProps) {
  const { t } = useTranslation();

  const getSpecializationLabel = (type: string) => {
    return t(`specializations.${type}`, 'therapists');
  };

  const getLanguageLabel = (lang: string) => {
    return t(`languages.${lang}`, 'therapists');
  };

  const getAppointmentTypeInfo = (type: string) => {
    switch (type) {
      case 'virtual':
        return {
          icon: <Video className="w-5 h-5" />,
          label: t('appointmentType.virtual', 'therapists')
        };
      case 'presencial':
        return {
          icon: <Users className="w-5 h-5" />,
          label: t('appointmentType.presencial', 'therapists')
        };
      case 'both':
        return {
          icon: <div className="flex gap-2"><Video className="w-5 h-5" /><Users className="w-5 h-5" /></div>,
          label: t('appointmentType.both', 'therapists')
        };
      default:
        return null;
    }
  };

  const appointmentTypeInfo = getAppointmentTypeInfo(therapist.appointmentType);

  return (
    <section className={cn("relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-muted", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={therapist.image}
          alt={therapist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-background/50 dark:from-background/95 dark:via-background/70 dark:to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative h-full mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="w-full max-w-4xl space-y-8 text-center"
        >
          {/* Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white">
              {therapist.name}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground dark:text-white/90">
              {therapist.title[locale]}
            </p>
          </div>

          {/* Stats & Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground dark:text-white/80">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="text-lg">{therapist.rating}</span>
              <span>({therapist.reviewCount} {t('testimonials.reviews', 'therapists')})</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{therapist.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5" />
              <span>{therapist.languages.map(lang => t(`languages.${lang}`, 'therapists')).join(', ')}</span>
            </div>
            {appointmentTypeInfo && (
              <div className="flex items-center gap-2">
                {appointmentTypeInfo.icon}
                <span>{appointmentTypeInfo.label}</span>
              </div>
            )}
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {therapist.specializations.map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="text-sm bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                {getSpecializationLabel(spec)}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 