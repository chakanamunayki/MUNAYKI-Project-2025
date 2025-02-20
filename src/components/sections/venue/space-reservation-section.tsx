'use client';

import { type Locale } from '@/types/i18n';
import { MapPin } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';

interface SpaceReservationSectionProps {
  locale: Locale;
}

export function SpaceReservationSection({ locale }: SpaceReservationSectionProps) {
  return (
    <section className="container py-12 md:py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Reservation Card */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="relative p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
            <div className="relative space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  {locale === 'es' 
                    ? 'Reserva el Espacio para tu Servicio'
                    : 'Book the Venue for Your Service'}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {locale === 'es'
                    ? 'Organiza tu clase holística o ceremonia en nuestro espacio sagrado.'
                    : 'Host your holistic class or ceremony in our sacred space.'}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>Medellín, Colombia</span>
              </div>

              {/* Features */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: locale === 'es' ? 'Espacio Ceremonial' : 'Ceremonial Space',
                    description: locale === 'es' 
                      ? 'Ambiente sagrado para ceremonias'
                      : 'Sacred environment for ceremonies'
                  },
                  {
                    title: locale === 'es' ? 'Entorno Natural' : 'Natural Setting',
                    description: locale === 'es'
                      ? 'Rodeado de naturaleza'
                      : 'Surrounded by nature'
                  },
                  {
                    title: locale === 'es' ? 'Capacidad' : 'Capacity',
                    description: locale === 'es'
                      ? 'Hasta 30 personas'
                      : 'Up to 30 people'
                  },
                  {
                    title: locale === 'es' ? 'Instalaciones' : 'Facilities',
                    description: locale === 'es'
                      ? 'Comodidades básicas'
                      : 'Basic amenities'
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Contact Button */}
              <ButtonColorful
                label={locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
                className="w-full"
                onClick={() => window.open('https://wa.me/573123456789', '_blank')}
              />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="aspect-square lg:aspect-auto rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0587387586087!2d-75.16126882427543!3d6.582062393433436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e446d048b3b45eb%3A0x835d6b6df3ab8e08!2sLA%20CHAKANA%20-%20Territorio%20Hol%C3%ADstico!5e0!3m2!1sen!2sus!4v1708013436789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={locale === 'es' ? 'Ubicación de La Chakana' : 'La Chakana Location'}
            className="w-full h-full min-h-[400px]"
          />
        </div>
      </div>
    </section>
  );
} 