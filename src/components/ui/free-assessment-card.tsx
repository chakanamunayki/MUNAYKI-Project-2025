'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Video, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { type Locale } from '@/types/i18n';

interface FreeAssessmentCardProps {
  locale: Locale;
}

export function FreeAssessmentCard({ locale }: FreeAssessmentCardProps) {
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