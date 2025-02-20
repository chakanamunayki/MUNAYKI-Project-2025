'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { type Locale } from '@/types/i18n';
import { MapPin, Leaf, Heart, Sparkles, Moon } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CeremonyVenueProps {
  locale: Locale;
  venue: {
    name: string;
    description: {
      [key in Locale]: string;
    };
    amenities: {
      [key in Locale]: string[];
    };
    images: {
      src: string;
      alt: string;
    }[];
  };
}

export function CeremonyVenue({ locale, venue }: CeremonyVenueProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative space-y-20">
      {/* Header Title */}
      <div className="container pt-8 md:pt-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl text-center"
        >
          <span className="section-title">
            {locale === 'es' ? 'El Espacio Sagrado' : 'The Sacred Space'}
          </span>
        </motion.h1>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-screen overflow-hidden -mx-[calc((100vw-100%)/2)]">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <div className="relative h-full w-full">
            <Image
              src={venue.images[0].src}
              alt={venue.images[0].alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 mix-blend-overlay" />
          </div>
        </motion.div>
        
        <div className="relative h-full">
          <div className="container flex h-full flex-col items-center justify-end pb-20 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-3xl"
            >
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
                <span className="block">Itorii</span>
                <span className="block text-3xl sm:text-4xl text-white/90 mt-2">
                  La Chakana
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {venue.description[locale]}
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">Medellín, Colombia</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* About La Chakana */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className="section-title">
                {locale === 'es' ? 'Sobre La Chakana' : 'About La Chakana'}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {venue.description[locale]}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {venue.amenities[locale].slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    {index === 0 && <Leaf className="h-5 w-5 text-primary" />}
                    {index === 1 && <Heart className="h-5 w-5 text-primary" />}
                    {index === 2 && <Moon className="h-5 w-5 text-primary" />}
                    {index === 3 && <Sparkles className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{amenity}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* About Itorii */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              <span className="section-title">
                {locale === 'es' ? 'Sobre Itorii' : 'About Itorii'}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === 'es'
                ? 'Itorii es más que un espacio – es una comunidad dedicada a la sanación y el crecimiento espiritual. Nuestro equipo de facilitadores experimentados guía cada ceremonia con sabiduría y compasión.'
                : 'Itorii is more than a space – it\'s a community dedicated to healing and spiritual growth. Our team of experienced facilitators guides each ceremony with wisdom and compassion.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {venue.amenities[locale].slice(4, 8).map((amenity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    {index === 0 && <Leaf className="h-5 w-5 text-primary" />}
                    {index === 1 && <Heart className="h-5 w-5 text-primary" />}
                    {index === 2 && <Moon className="h-5 w-5 text-primary" />}
                    {index === 3 && <Sparkles className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{amenity}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container px-4 md:px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venue.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 