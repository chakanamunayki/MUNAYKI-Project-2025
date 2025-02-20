'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { type Ceremony } from '@/types/ceremony';
import { cn } from '@/lib/utils';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { useTranslation } from '@/lib/contexts/translation-context';

interface CeremonyCardProps {
  ceremony: Ceremony;
  className?: string;
}

export function CeremonyCard({ ceremony, className }: CeremonyCardProps) {
  const { t, locale } = useTranslation();

  const statusColors = {
    upcoming: 'bg-green-500',
    full: 'bg-amber-500',
    cancelled: 'bg-red-500',
  };

  // Format price to COP
  const formatPrice = (price: string) => {
    const numericPrice = parseInt(price) * 1000;
    return `${numericPrice.toLocaleString('es-CO')} COP`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-shadow',
        className
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className={cn(
          'px-3 py-1 rounded-full text-xs font-medium text-white',
          statusColors[ceremony.status]
        )}>
          {t(`ceremony.status.${ceremony.status}`)}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={ceremony.image}
          alt={ceremony.title[locale]}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">{ceremony.title[locale]}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ceremony.description[locale]}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{ceremony.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{ceremony.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{ceremony.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{ceremony.spotsLeft} / {ceremony.capacity} cupos disponibles</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="pt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">{formatPrice(ceremony.price)}</div>
          <Link href={`/${locale}${ceremony.link}`}>
            <ButtonColorful 
              label={t('buttons.moreDetails', 'home')} 
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 