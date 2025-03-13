'use client';

import { type Locale } from '@/types/i18n';
import { Section } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, Phone, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

interface ReservationSectionProps {
  locale: Locale;
  eventDate: Date;
  location: string;
  whatsappNumber: string;
}

export function ReservationSection({ 
  locale, 
  eventDate, 
  location,
  whatsappNumber 
}: ReservationSectionProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Breathing animation state for glow effect
  const [breathingPhase, setBreathingPhase] = useState(0);
  
  // Breathing animation effect
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase((prev) => (prev + 0.01) % 1);
    }, 50);
    
    return () => clearInterval(breathingInterval);
  }, []);
  
  // Calculate breathing effect values
  const breathingScale = 1 + Math.sin(breathingPhase * Math.PI * 2) * 0.03;
  const breathingOpacity = 0.15 + Math.sin(breathingPhase * Math.PI * 2) * 0.05;

  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(eventDate);

  // Format the time
  const formattedTime = '10:00 AM';

  // Format prices
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const normalPrice = 500000;
  const promotionPrice = 380000;

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    locale === 'es' 
      ? `Hola, estoy interesado/a en el taller de Inmersión en Hielo del ${formattedDate}. ¿Puedo reservar mi lugar?` 
      : `Hello, I'm interested in the Ice Submersion workshop on ${formattedDate}. Can I reserve my place?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Format the date for URL parameters
  const formattedDateForUrl = eventDate ? eventDate.toISOString() : '';
  
  // Create URL with event information for the auth page
  const eventName = locale === 'es' ? 'Inmersión en Hielo' : 'Ice Submersion';
  const authUrl = `/${locale}/auth?eventName=${encodeURIComponent(eventName)}&eventDate=${encodeURIComponent(formattedDateForUrl)}&eventCost=${encodeURIComponent(promotionPrice.toString())}&eventLocation=${encodeURIComponent(location)}`;

  // Handle Book Now button click
  const handleBookNow = () => {
    try {
      setIsLoading(true);
      
      // Create a complete booking info object with all required fields
      const bookingInfo = {
        eventId: 'ice-submersion-event',
        eventName: eventName,
        eventDate: formattedDateForUrl,
        eventTime: formattedTime,
        eventPrice: promotionPrice.toString(),
        eventCurrency: 'COP',
        eventLocation: location,
        eventImage: '/images/experiences/ice-submersion/hero.jpg',
      };
      
      // Store booking information in localStorage
      localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
      sessionStorage.setItem('isBookingFlow', 'true');
      
      console.log('Storing booking info', bookingInfo);
      
      // Build query parameters for the auth page
      const queryParams = new URLSearchParams();
      Object.entries(bookingInfo).forEach(([key, value]) => {
        queryParams.append(key, value as string);
      });
      queryParams.append('isBookingFlow', 'true');
      
      // Redirect to authenticating page with the target destination
      const targetDestination = `/${locale}/booking/new?${queryParams.toString()}`;
      const authenticatingUrl = `/${locale}/authenticating?redirectTo=${encodeURIComponent(targetDestination)}`;
      
      console.log('Redirecting to authenticating page:', authenticatingUrl);
      router.push(authenticatingUrl);
    } catch (error) {
      console.error('Error in handleBookNow:', error);
      setIsLoading(false);
    }
  };

  return (
    <section id="reservation-section" className="relative w-full py-24 overflow-hidden">
      {/* Blue glow background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent dark:from-blue-900/20 dark:via-blue-800/10"
          style={{ opacity: 0.15 }}
        />
        
        {/* Breathing glow effect */}
        <motion.div 
          className="absolute bg-blue-600/10 dark:bg-blue-600/15 blur-3xl rounded-full"
          style={{ 
            scale: breathingScale,
            opacity: breathingOpacity,
            top: '30%',
            left: '50%',
            width: '70%',
            height: '70%',
            x: '-50%',
            y: '-50%',
          }}
        />
        
        {/* Secondary glow spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-700/10 dark:bg-blue-700/15 blur-3xl rounded-full" />
        
        {/* Accent color spot */}
        <div className="absolute top-3/4 left-2/3 w-48 h-48 bg-blue-300/5 blur-3xl rounded-full" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4 relative">
            <motion.div 
              className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/15 blur-xl rounded-full -z-10"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl relative inline-block">
              <span className="section-title">
                {locale === 'es' ? 'Reserva tu lugar' : 'Reserve your place'}
              </span>
              <div className="absolute -inset-1 bg-blue-600/10 dark:bg-blue-600/15 blur-md rounded-lg -z-10"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'es' ? 'Plazas limitadas disponibles (30 en total)' : 'Limited places available (30 in total)'}
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-lg blur-md"></div>
              
              <Card className="h-full overflow-hidden rounded-lg border border-blue-500/20 dark:border-blue-400/20 p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/10 bg-card dark:bg-black/80 backdrop-blur-sm relative z-10">
                <CardContent className="p-2 space-y-6">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {locale === 'es' ? 'Precio Especial' : 'Special Price'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white/30 dark:bg-white/5 p-3 rounded-lg">
                      <span className="text-muted-foreground font-medium">
                        {locale === 'es' ? 'Precio normal' : 'Normal price'}
                      </span>
                      <span className="text-muted-foreground font-semibold text-lg">
                        {formatPrice(normalPrice)}
                      </span>
                    </div>
                    
                    <motion.div 
                      className="flex items-center justify-between bg-white/50 dark:bg-blue-900/20 p-4 rounded-lg shadow-sm border border-blue-500/20"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    >
                      <span className="font-medium">
                        {locale === 'es' ? 'Precio promocional' : 'Promotion price'}
                      </span>
                      <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(promotionPrice)}
                      </span>
                    </motion.div>
                  </div>

                  <div className="bg-blue-500/10 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-500/20 relative overflow-hidden mt-6">
                    {/* Subtle animated highlight */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                      }}
                    />
                    <p className="font-medium text-center relative z-10 text-lg">
                      {locale === 'es' 
                        ? '¡Solo el 50% de depósito asegura tu lugar!' 
                        : 'Just 50% deposit secures your place!'}
                    </p>
                  </div>

                  {/* Group discount */}
                  <div className="bg-blue-100/50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50 relative overflow-hidden">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-blue-800 dark:text-blue-300">
                        {locale === 'es' ? 'Descuento para grupos' : 'Group discount'}
                      </span>
                    </div>
                    <p className="text-center text-blue-700 dark:text-blue-400 text-sm">
                      {locale === 'es' 
                        ? '10% de descuento para grupos de 4 o más personas' 
                        : '10% discount for groups of 4 or more people'}
                    </p>
                  </div>

                  <div className="space-y-3 mt-6">
                    <h4 className="font-medium text-lg text-center">
                      {locale === 'es' ? 'Opciones de pago' : 'Payment options'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 bg-white/50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>
                          {locale === 'es' ? 'Transferencia bancaria' : 'Bank transfer'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Nequi</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-center text-blue-600 dark:text-blue-400 font-medium text-lg">
                      {locale === 'es' 
                        ? '¡No pierdas esta oportunidad!' 
                        : "Don't miss this opportunity!"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-lg blur-md"></div>
              
              <Card className="h-full overflow-hidden rounded-lg border border-blue-500/20 dark:border-blue-400/20 p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/10 bg-card dark:bg-black/80 backdrop-blur-sm relative z-10">
                <CardContent className="p-2 space-y-6">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {locale === 'es' ? 'Detalles del evento' : 'Event details'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          {locale === 'es' ? 'Fecha' : 'Date'}
                        </h4>
                        <p className="text-muted-foreground text-lg">{formattedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          {locale === 'es' ? 'Hora' : 'Time'}
                        </h4>
                        <p className="text-muted-foreground text-lg">{formattedTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          {locale === 'es' ? 'Ubicación' : 'Location'}
                        </h4>
                        <p className="text-muted-foreground text-lg">{location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBookNow}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {locale === 'es' ? 'Cargando...' : 'Loading...'}
                        </>
                      ) : (
                        locale === 'es' ? 'Reservar ahora' : 'Book Now'
                      )}
                    </Button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full flex items-center justify-center gap-2"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-green-500"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {locale === 'es'
                        ? 'Contáctanos vía WhatsApp'
                        : 'Contact us via WhatsApp'}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 