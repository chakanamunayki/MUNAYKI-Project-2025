'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Globe2, Video, Users } from 'lucide-react';
import { type Therapist, type TherapyType, type AppointmentType } from '@/types/therapist';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/contexts/translation-context';

interface TherapistCardProps {
  therapist: Therapist;
  className?: string;
}

export function TherapistCard({ therapist, className }: TherapistCardProps) {
  const { t, locale } = useTranslation();

  const getSpecializationLabel = (type: TherapyType) => {
    return t(`main.therapies.items.${type}`, 'navigation');
  };

  const getAppointmentTypeInfo = (type: AppointmentType) => {
    switch (type) {
      case 'virtual':
        return {
          icon: <Video className="w-4 h-4" />,
          label: t('therapists.appointmentType.virtual', 'home')
        };
      case 'presencial':
        return {
          icon: <Users className="w-4 h-4" />,
          label: t('therapists.appointmentType.presencial', 'home')
        };
      case 'both':
        return {
          icon: <div className="flex gap-1"><Video className="w-4 h-4" /><Users className="w-4 h-4" /></div>,
          label: t('therapists.appointmentType.both', 'home')
        };
    }
  };

  // Format price to COP
  const formatPrice = (price: string) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    return `${(numericPrice * 4000).toLocaleString('es-CO')} COP`;
  };

  const appointmentTypeInfo = getAppointmentTypeInfo(therapist.appointmentType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg card-glow hover:-translate-y-1",
        className
      )}>
        {/* Therapist Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={therapist.image}
            alt={therapist.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl">{therapist.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{therapist.title[locale]}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span>{therapist.rating}</span>
              <span>({therapist.reviewCount})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {therapist.specializations.map((spec) => (
              <Badge
                key={spec}
                variant="secondary"
                className="text-xs"
              >
                {getSpecializationLabel(spec)}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {therapist.bio[locale]}
          </p>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{therapist.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe2 className="w-4 h-4" />
              <span>{therapist.languages.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {appointmentTypeInfo.icon}
              <span>{appointmentTypeInfo.label}</span>
            </div>
          </div>

          {/* Services Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('therapists.services', 'home')}:</h4>
            <div className="space-y-1">
              {therapist.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-muted-foreground">{service.name[locale]}</span>
                  <span className="font-medium">{formatPrice(service.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Link href={`/${locale}${therapist.link}`} className="w-full">
            <ButtonColorful
              className="w-full"
              label={t('buttons.moreDetails', 'home')}
            />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 