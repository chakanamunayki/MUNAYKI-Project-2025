'use client';

import { useRef, useState } from 'react';
import { type Locale } from '@/types/i18n';
import { ceremonySchedule } from "@/data/ceremony-schedule";
import { TimelineEvent } from "./timeline-event";
import { CeremonyBookingCard } from "./ceremony-booking-card";
import { motion, useScroll, useTransform } from "framer-motion";

interface CeremonyScheduleProps {
  locale: Locale;
}

// Sample extras data - in a real app, this would come from your API/CMS
const ceremonyExtras = [
  {
    id: "river-meditation",
    title: {
      en: "River Meditation Walk",
      es: "Caminata de Meditación del Río",
    },
    description: {
      en: "A guided meditation walk along the sacred river before the ceremony",
      es: "Una caminata de meditación guiada a lo largo del río sagrado antes de la ceremonia",
    },
    price: {
      amount: 50000,
      currency: "COP",
    },
  },
  {
    id: "breakfast",
    title: {
      en: "Integration Breakfast",
      es: "Desayuno de Integración",
    },
    description: {
      en: "A nutritious breakfast and group integration session after the ceremony",
      es: "Un desayuno nutritivo y sesión de integración grupal después de la ceremonia",
    },
    price: {
      amount: 23000,
      currency: "COP",
    },
  },
  {
    id: "river-cleansing",
    title: {
      en: "River Cleansing Ritual",
      es: "Ritual de Limpieza en el Río",
    },
    description: {
      en: "Traditional river cleansing ritual with medicinal plants",
      es: "Ritual tradicional de limpieza en el río con plantas medicinales",
    },
    price: {
      amount: 45000,
      currency: "COP",
    },
  },
];

export function CeremonySchedule({ locale }: CeremonyScheduleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const sortedEvents = [...ceremonySchedule.events].sort((a, b) => a.order - b.order);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress line height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20" ref={containerRef}>
      {/* 🔒 PROTECTED COMPONENT - Timeline Structure
          This component's structure is essential for the booking card layout.
          See .cursorrules/protected-components.md for details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-4 mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {ceremonySchedule.title[locale]}
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          {ceremonySchedule.subtitle[locale]}
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto lg:mr-0">
        {/* 🔒 PROTECTED - Timeline Container
            This structure must be maintained to ensure proper layout with the booking card */}
        {/* Progress Line */}
        <motion.div 
          className="absolute left-[11px] top-6 w-[2px] origin-top bg-primary"
          style={{ height: progressHeight }}
        />

        {/* Events */}
        <div className="relative">
          {sortedEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              locale={locale}
              isLast={index === sortedEvents.length - 1}
              index={index}
              isActive={event.id === activeEventId}
              onHover={() => setActiveEventId(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 