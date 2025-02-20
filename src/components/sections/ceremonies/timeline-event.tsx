'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { type Locale } from '@/types/i18n';
import { type TimelineEvent as TimelineEventType } from "@/types/ceremony-schedule";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, PlayCircle } from "lucide-react";
import { getCategoryIcon, getCategoryStyles } from "@/lib/timeline-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimelineEventProps {
  event: TimelineEventType;
  isLast?: boolean;
  locale: Locale;
  index: number;
  isActive?: boolean;
  onHover?: () => void;
}

export function TimelineEvent({ 
  event, 
  isLast, 
  locale, 
  index,
  isActive,
  onHover 
}: TimelineEventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const CategoryIcon = getCategoryIcon(event.category);
  const isExtraService = event.isOptional && event.price;
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: event.price?.currency || "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <motion.div
        id={event.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={onHover}
        className={cn(
          "relative pl-8 pb-8",
          !isLast && "before:absolute before:left-[11px] before:top-[24px] before:h-full before:w-[2px] before:bg-border dark:before:bg-border/50"
        )}
      >
        {/* Category Icon */}
        <div className={cn(
          "absolute left-0 top-1.5 h-6 w-6 rounded-full flex items-center justify-center transition-all",
          getCategoryStyles(event.category),
          isActive && "ring-2 ring-primary ring-offset-2"
        )}>
          <CategoryIcon className="h-3 w-3" />
        </div>
        
        <div className={cn(
          "group relative rounded-lg border p-6 transition-all",
          isExtraService 
            ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border-purple-200 dark:border-purple-800" 
            : "border-border/50 hover:border-border hover:shadow-md",
          isActive && !isExtraService && "border-primary/50 bg-primary/5"
        )}>
          <div className="flex flex-col space-y-2">
            {/* Time */}
            <div className="text-sm font-medium text-muted-foreground">
              {event.time}
            </div>

            {/* Title and Optional Badge */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold">
                {event.title[locale]}
              </h3>
              {event.isOptional && (
                <Badge variant="secondary" className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                  {locale === 'es' ? 'Opcional' : 'Optional'}
                </Badge>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.duration}
              </span>
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.location.name}
                </span>
              )}
              {event.facilitators && (
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {event.facilitators.length} {event.facilitators.length === 1 ? 'facilitator' : 'facilitators'}
                </span>
              )}
            </div>

            {/* Price if exists */}
            {event.price && (
              <div className="text-lg font-semibold text-primary">
                {formatPrice(event.price.amount)}
              </div>
            )}

            {/* Description */}
            <p className={cn(
              "text-sm",
              isExtraService 
                ? "bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent"
                : "text-muted-foreground"
            )}>
              {event.description[locale]}
            </p>

            {/* More Details Button */}
            {event.hasMoreDetails && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="mt-2"
              >
                {locale === 'es' ? 'Más Detalles' : 'More Details'}
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Details Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{event.title[locale]}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* Event Details */}
              <div className="space-y-2">
                <h4 className="font-semibold">{locale === 'es' ? 'Sobre esta Actividad' : 'About this Activity'}</h4>
                <p className="text-muted-foreground">{event.description[locale]}</p>
              </div>

              {/* Location Details */}
              {event.location && (
                <div className="space-y-2">
                  <h4 className="font-semibold">{locale === 'es' ? 'Ubicación' : 'Location'}</h4>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location.name}</span>
                    <Badge variant="secondary">
                      {event.location.indoorOutdoor}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Facilitators */}
              {event.facilitators && event.facilitators.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">{locale === 'es' ? 'Facilitadores' : 'Facilitators'}</h4>
                  <div className="flex flex-wrap gap-4">
                    {event.facilitators.map((facilitator) => (
                      <div key={facilitator.name} className="flex items-center gap-2">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <img
                            src={facilitator.image}
                            alt={facilitator.name}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{facilitator.name}</p>
                          <p className="text-xs text-muted-foreground">{facilitator.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation Instructions */}
              {event.preparation && (
                <div className="space-y-2">
                  <h4 className="font-semibold">{locale === 'es' ? 'Preparación' : 'Preparation'}</h4>
                  <p className="text-muted-foreground">{event.preparation.instructions}</p>
                  {event.preparation.items.length > 0 && (
                    <ul className="ml-6 list-disc text-muted-foreground">
                      {event.preparation.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Media */}
            <div className="space-y-6">
              {/* Placeholder for images/video - we can add actual media content later */}
              <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                <img
                  src="/images/placeholder-activity.jpg"
                  alt="Activity preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Additional images could go here */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                  <img
                    src="/images/placeholder-detail-1.jpg"
                    alt="Activity detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                  <img
                    src="/images/placeholder-detail-2.jpg"
                    alt="Activity detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Video Link - if available */}
              <Button variant="outline" className="w-full">
                <PlayCircle className="w-4 h-4 mr-2" />
                {locale === 'es' ? 'Ver Video de la Actividad' : 'Watch Activity Video'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 