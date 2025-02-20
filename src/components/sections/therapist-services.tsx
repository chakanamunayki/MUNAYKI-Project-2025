'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HighlightCard } from '@/components/ui/highlight-card';
import { useTranslation } from '@/lib/contexts/translation-context';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { type Locale } from '@/types/i18n';
import { type Therapist } from '@/types/therapist';
import { Clock, MapPin, Users, Video, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TherapistServicesProps {
  therapist: Therapist;
  locale: Locale;
  className?: string;
}

interface ServiceCardProps {
  service: Therapist['services'][0];
  locale: Locale;
}

function ServiceCard({ service, locale }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-xl font-semibold tracking-tight">
              {service.name[locale]}
            </h4>
            <p className="text-sm text-muted-foreground">
              {service.duration} {locale === 'en' ? 'minutes' : 'minutos'}
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(parseInt(service.price))}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {service.description[locale]}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{locale === 'en' ? 'In-person' : 'Presencial'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>{locale === 'en' ? 'Virtual' : 'Virtual'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>1:1</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonColorful 
          className="w-full"
          label={locale === 'en' ? 'Book Now' : 'Reservar'}
          onClick={() => {
            // TODO: Implement booking flow
            console.log('Book service:', service.id);
          }}
        />
      </CardFooter>
    </Card>
  );
}

function FreeAssessmentCard({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-8"
    >
      {/* Category Icon */}
      <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full flex items-center justify-center transition-all bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200">
        <Sparkles className="h-3 w-3 text-primary" />
      </div>
      
      <div className="group relative rounded-lg border p-6 transition-all bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200">
        <div className="flex flex-col space-y-2">
          {/* Time */}
          <div className="text-sm font-medium text-white/90">
            15:00
          </div>

          {/* Title and Free Badge */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">
              {locale === 'en' ? 'Free Initial Assessment' : 'Evaluación Inicial Gratuita'}
            </h3>
            <Badge className="mt-1 px-4 py-1 text-base bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
              {locale === 'en' ? 'Free' : 'Gratis'}
            </Badge>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              15 min
            </span>
            <span className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              {locale === 'en' ? 'Online' : 'En línea'}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              1:1
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/90">
            {locale === 'en' 
              ? 'Schedule a complimentary consultation to discuss your needs and discover the most suitable path for your healing journey.'
              : 'Agenda una consulta gratuita para discutir tus necesidades y descubrir el camino más adecuado para tu viaje de sanación.'}
          </p>

          {/* Book Button */}
          <ButtonColorful 
            className="w-full mt-2"
            label={locale === 'en' ? 'Book a Session' : 'Reservar Sesión'}
            onClick={() => {
              // TODO: Implement booking flow for free assessment
              console.log('Book free assessment');
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function TherapistServices({ therapist, locale, className = '' }: TherapistServicesProps) {
  const { t } = useTranslation();

  const serviceCategories = {
    preparation: {
      id: 'preparation',
      title: locale === 'en' ? 'Preparation' : 'Preparación',
      services: therapist.services.filter(s => s.id.includes('pre')),
    },
    ceremony: {
      id: 'ceremony',
      title: locale === 'en' ? 'Ceremony' : 'Ceremonia',
      services: therapist.services.filter(s => s.id.includes('ceremony')),
    },
    integration: {
      id: 'integration',
      title: locale === 'en' ? 'Integration' : 'Integración',
      services: therapist.services.filter(s => s.id.includes('integration')),
    },
  };

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`py-16 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {locale === 'en' ? 'Available Services' : 'Servicios Disponibles'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Pre and post ceremony guidance available both remotely and in-person'
                : 'Guía pre y post ceremonia disponible tanto de forma remota como presencial'}
            </p>
          </div>

          <Tabs defaultValue="preparation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.values(serviceCategories).map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.values(serviceCategories).map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {category.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      locale={locale}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </motion.section>
  );
} 