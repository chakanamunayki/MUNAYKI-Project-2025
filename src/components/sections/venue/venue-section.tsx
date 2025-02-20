'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { type Locale } from '@/types/i18n';
import { MapPin, Calendar, Users, Leaf, Heart, Sparkles, Moon, Sun, Star, Flower2, Wifi, Coffee, Car, Music } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { cn } from '@/lib/utils';
import { SpaceReservationSection } from './space-reservation-section';

interface VenueSectionProps {
  locale: Locale;
}

export function VenueSection({ locale }: VenueSectionProps) {
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
            {locale === 'es' ? 'El Espacio' : 'The Venue'}
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
            <img
              src="/images/venue/chakana-hero.jpg"
              alt="La Chakana Sacred Space"
              className="h-full w-full object-cover"
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
                {locale === 'es' 
                  ? 'Un espacio sagrado donde la naturaleza y la espiritualidad se encuentran para crear experiencias transformadoras.'
                  : 'A sacred space where nature and spirituality meet to create transformative experiences.'}
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
      <section id="about" className="container px-4 md:px-6 scroll-mt-20">
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
              {locale === 'es' 
                ? 'La Chakana es un espacio sagrado diseñado para la sanación y el crecimiento espiritual. Ubicado en un entorno natural tranquilo, nuestro centro ofrece un ambiente perfecto para retiros, ceremonias y sesiones de bienestar holístico.'
                : 'La Chakana is a sacred space designed for healing and spiritual growth. Located in a peaceful natural setting, our center offers the perfect environment for retreats, ceremonies, and holistic wellness sessions.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Entorno Natural' : 'Natural Setting'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es' 
                      ? 'Rodeado de naturaleza para una conexión profunda'
                      : 'Surrounded by nature for deep connection'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Espacio Sagrado' : 'Sacred Space'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Diseñado para ceremonias y sanación'
                      : 'Designed for ceremonies and healing'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Alojamiento' : 'Accommodation'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Opciones de estadía para retiros'
                      : 'Stay options for retreats'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Instalaciones' : 'Facilities'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Equipado para tu bienestar completo'
                      : 'Equipped for your complete wellbeing'}
                  </p>
                </div>
              </div>
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
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Experiencia' : 'Experience'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Años de experiencia en ceremonias'
                      : 'Years of ceremonial experience'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Sun className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Guía Espiritual' : 'Spiritual Guidance'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Facilitadores dedicados y compasivos'
                      : 'Dedicated and compassionate facilitators'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Comunidad' : 'Community'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Espacio seguro y acogedor'
                      : 'Safe and welcoming space'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Flower2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {locale === 'es' ? 'Tradición' : 'Tradition'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'es'
                      ? 'Respeto por las prácticas ancestrales'
                      : 'Respect for ancestral practices'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Space Reservation Section */}
      <section id="space" className="scroll-mt-20">
        <SpaceReservationSection locale={locale} />
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container px-4 md:px-6 pb-20 scroll-mt-20">
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className="section-title">
              {locale === 'es' ? 'Galería' : 'Gallery'}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: num * 0.1 }}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center",
                  {
                    "sm:col-span-2 lg:col-span-2": num === 4
                  }
                )}
              >
                <p className="text-muted-foreground text-sm">Please add image: /public/images/venue/gallery-{num}.jpg</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 