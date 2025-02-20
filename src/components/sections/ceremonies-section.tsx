'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Ceremony } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { useTranslation } from '@/lib/contexts/translation-context';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext 
} from '@/components/ui/carousel';
import { ImageGallery } from '@/components/ui/image-gallery';

// Sample venue images - replace with actual images
const venueImages = [
  { src: '/images/venue/chakana-1.jpg', alt: 'La Chakana Main Hall' },
  { src: '/images/venue/chakana-2.jpg', alt: 'La Chakana Garden' },
  { src: '/images/venue/chakana-3.jpg', alt: 'La Chakana Sacred River' },
  { src: '/images/venue/chakana-4.jpg', alt: 'La Chakana Meditation Space' },
  { src: '/images/venue/chakana-5.jpg', alt: 'La Chakana Ceremony Room' },
  { src: '/images/venue/chakana-6.jpg', alt: 'La Chakana Surroundings' },
];

interface CeremoniesSectionProps {
  ceremonies: Ceremony[];
}

export function CeremoniesSection({ ceremonies }: CeremoniesSectionProps) {
  const { t, locale } = useTranslation();

  // Format price to COP
  const formatPrice = (price: string) => {
    const numericPrice = parseInt(price) * 1000;
    return `${numericPrice.toLocaleString('es-CO')} COP`;
  };

  const getStatusColor = (status: Ceremony['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/10 text-green-500';
      case 'full':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const renderCard = (ceremony: Ceremony) => (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-glow bg-black/40">
      <div className="relative h-48">
        <Image
          src={ceremony.image}
          alt={ceremony.title[locale]}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{ceremony.title[locale]}</CardTitle>
          <Badge className={getStatusColor(ceremony.status)}>
            {t(`ceremony.status.${ceremony.status}`, 'home')}
          </Badge>
        </div>
        <CardDescription>
          {ceremony.date} • {ceremony.time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {ceremony.description[locale]}
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <p>📍 {ceremony.location}</p>
          <p>💰 {formatPrice(ceremony.price)}</p>
          <p>👥 {ceremony.spotsLeft} / {ceremony.capacity} {t('ceremony.spotsAvailable', 'home')}</p>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonColorful
          className="w-full"
          label={t('buttons.moreDetails', 'home')}
          onClick={() => window.location.href = ceremony.link}
          disabled={ceremony.status === 'full' || ceremony.status === 'cancelled'}
        />
      </CardFooter>
    </Card>
  );

  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <motion.h2
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              <span className="section-title">
                {t('ceremonies.title', 'home')}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('ceremonies.description', 'home')}
            </motion.p>
          </div>

          {/* Venue Information */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                <span className="section-title">
                  {t('ceremonies.venue.title', 'home')}
                </span>
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {t('ceremonies.venue.description', 'home')}
                </p>
                <p className="text-muted-foreground">
                  {t('ceremonies.venue.facilities', 'home')}
                </p>
              </div>
            </div>
            <ImageGallery images={venueImages} />
          </motion.div>

          {/* Upcoming Ceremonies */}
          <div className="space-y-8">
            <motion.h3
              variants={fadeIn('up', 'tween', 0.5, 1)}
              className="text-2xl font-semibold text-center text-foreground"
            >
              <span className="section-title">
                {t('ceremonies.upcoming.title', 'home')}
              </span>
            </motion.h3>
            <motion.div
              variants={fadeIn('up', 'tween', 0.6, 1)}
              className="px-4 py-8"
            >
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                className="overflow-visible"
              >
                <CarouselContent className="-ml-4">
                  {ceremonies.map((ceremony) => (
                    <CarouselItem key={ceremony.id} className="pl-4 basis-[384px] p-6">
                      {renderCard(ceremony)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-background/80 hover:bg-background border-primary hover:border-primary/80 w-10 h-10 text-primary hover:text-primary/80 backdrop-blur-sm left-2 md:-left-12" />
                <CarouselNext className="bg-background/80 hover:bg-background border-primary hover:border-primary/80 w-10 h-10 text-primary hover:text-primary/80 backdrop-blur-sm right-2 md:-right-12" />
              </Carousel>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 