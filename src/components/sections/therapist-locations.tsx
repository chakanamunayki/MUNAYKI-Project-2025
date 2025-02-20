'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Users, Video, ArrowRight, Link } from 'lucide-react';
import { type Therapist } from '@/types/therapist';
import { type Ceremony } from '@/types/ceremony';
import { type Locale } from '@/types/i18n';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/motion';
import Image from 'next/image';

interface TherapistLocationsProps {
  therapist: Therapist;
  locale: Locale;
  className?: string;
}

function LocationCard({ location, locale }: { location: Therapist['locations'][0], locale: Locale }) {
  const isVirtual = location.type === 'virtual';
  
  // Get available days from operating hours
  const availableDays = Object.entries(location.operatingHours).map(([day, hours]) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    hours
  }));

  return (
    <div className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all space-y-6">
      {/* Location Type Badge */}
      <div className="flex items-start justify-between">
        <Badge 
          variant="secondary" 
          className={cn(
            "px-3 py-1.5 text-base",
            isVirtual ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
          )}
        >
          {isVirtual 
            ? (locale === 'en' ? 'Virtual Sessions' : 'Sesiones Virtuales')
            : (locale === 'en' ? 'Physical Location' : 'Ubicación Física')}
        </Badge>
      </div>

      {/* Location Name & Address */}
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-white">
          {location.name[locale]}
        </h3>
        {!isVirtual && location.address && (
          <div className="flex items-start gap-2 text-white/70">
            <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
            <p className="text-base">
              {location.address.street}<br />
              {location.address.city}, {location.address.state}<br />
              {location.address.country}
            </p>
          </div>
        )}
      </div>

      {/* Operating Hours */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-white">
          {locale === 'en' ? 'Available Hours' : 'Horarios Disponibles'}
        </h4>
        <div className="grid gap-2">
          {availableDays.map(({ day, hours }) => (
            <div key={day} className="flex items-center justify-between text-white/70">
              <span className="text-base">{day}</span>
              <span className="text-base">{hours.open} - {hours.close}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities or Virtual Info */}
      {isVirtual ? (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-white">
            {locale === 'en' ? 'Platform Information' : 'Información de Plataforma'}
          </h4>
          <div className="space-y-2 text-white/70">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              <span className="text-base">{location.virtualPlatform}</span>
            </div>
            <p className="text-base">{location.virtualMeetingInfo}</p>
          </div>
        </div>
      ) : location.facilities && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-white">
            {locale === 'en' ? 'Facilities' : 'Instalaciones'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {location.facilities.map((facility) => (
              <Badge 
                key={facility}
                variant="outline" 
                className="px-3 py-1 text-base bg-white/5 border-white/10 text-white/70"
              >
                {facility}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      <ButtonColorful
        className="w-full mt-4"
        label={locale === 'en' ? 'Book a Session' : 'Reservar Sesión'}
        onClick={() => {
          // TODO: Implement booking flow
          console.log('Book at location:', location.id);
        }}
      />
    </div>
  );
}

function UpcomingCeremonyCard({ ceremony, locale }: { ceremony: Ceremony, locale: Locale }) {
  return (
    <div className="relative p-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 transition-all space-y-6">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
          {locale === 'en' ? 'Upcoming' : 'Próximo'}
        </Badge>
      </div>

      {/* Ceremony Image */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <Image
          src={ceremony.image}
          alt={ceremony.title[locale]}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      {/* Title & Description */}
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-white">
          {ceremony.title[locale]}
        </h3>
        <p className="text-base text-white/70">
          {ceremony.description[locale]}
        </p>
      </div>

      {/* Details */}
      <div className="grid gap-3">
        <div className="flex items-center gap-2 text-white/70">
          <Calendar className="h-5 w-5" />
          <span className="text-base">{ceremony.date}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Clock className="h-5 w-5" />
          <span className="text-base">{ceremony.time}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <MapPin className="h-5 w-5" />
          <span className="text-base">{ceremony.location}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Users className="h-5 w-5" />
          <span className="text-base">{ceremony.spotsLeft} / {ceremony.capacity} {locale === 'en' ? 'spots available' : 'cupos disponibles'}</span>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="pt-2 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(parseInt(ceremony.price))}
          </span>
          <Badge variant="outline" className="border-primary/20 text-primary">
            {locale === 'en' ? 'Guided by Henri' : 'Guiado por Henri'}
          </Badge>
        </div>
        <ButtonColorful
          className="w-full"
          label={locale === 'en' ? 'View Ceremony Details' : 'Ver Detalles de la Ceremonia'}
          onClick={() => {
            // TODO: Navigate to ceremony page
            window.location.href = `/${locale}${ceremony.link}`;
          }}
        />
      </div>
    </div>
  );
}

export function TherapistLocations({ therapist, locale, className }: TherapistLocationsProps) {
  const physicalLocation = therapist.locations.find(l => l.type === 'physical');
  const virtualLocation = therapist.locations.find(l => l.type === 'virtual');

  // TODO: Get this from the API or props
  const upcomingCeremony: Ceremony = {
    id: 'ayahuasca-medellin-2024',
    type: 'ayahuasca',
    title: {
      en: 'Ayahuasca Ceremony at La Chakana',
      es: 'Ceremonia de Ayahuasca en La Chakana'
    },
    date: 'March 15, 2024',
    time: '19:00',
    image: '/images/ceremonies/ayahuasca-ceremony.jpg',
    description: {
      en: 'Join us for a transformative night of healing and connection guided by Henri Gomez at La Chakana Healing Center in Medellín.',
      es: 'Únete a nosotros para una noche transformadora de sanación y conexión guiada por Henri Gomez en el Centro de Sanación La Chakana en Medellín.'
    },
    location: 'La Chakana Healing Center, Medellín',
    price: '800000',
    capacity: 15,
    spotsLeft: 8,
    status: 'upcoming',
    link: '/ceremonies/ayahuasca-medellin-2024'
  };

  return (
    <section className={cn("py-24 relative", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {locale === 'en' ? 'Session Locations' : 'Ubicaciones de Sesiones'}
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Choose between in-person sessions at our healing center or virtual sessions from the comfort of your home.'
                : 'Elige entre sesiones presenciales en nuestro centro de sanación o sesiones virtuales desde la comodidad de tu hogar.'}
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid gap-8">
            {/* Physical Location */}
            {physicalLocation && (
              <div className="grid md:grid-cols-2 gap-8">
                <LocationCard location={physicalLocation} locale={locale} />
                {/* Upcoming Ceremony */}
                <UpcomingCeremonyCard ceremony={upcomingCeremony} locale={locale} />
              </div>
            )}
            
            {/* Virtual Location */}
            {virtualLocation && (
              <div className="md:max-w-2xl mx-auto">
                <LocationCard location={virtualLocation} locale={locale} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 