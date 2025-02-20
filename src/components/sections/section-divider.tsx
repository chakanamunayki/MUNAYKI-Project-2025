'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { type Locale } from '@/types/i18n';

interface SectionDividerProps {
  locale: Locale;
}

const quotes = {
  en: "Where ancient wisdom meets modern healing, transformation begins its sacred journey",
  es: "Donde la sabiduría ancestral se encuentra con la sanación moderna, la transformación comienza su viaje sagrado"
};

export function SectionDivider({ locale }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax and animation effects
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div 
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent" />
      </div>

      {/* Mandala Pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ rotate, scale }}
          className="absolute w-[400px] h-[400px] max-w-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary/20">
            {/* Outer square */}
            <path d="M10,10 h80 v80 h-80 z" className="fill-none stroke-current stroke-2" />
            
            {/* Inner mandala pattern */}
            <g className="fill-current">
              <circle cx="50" cy="50" r="5" />
              <path d="M50,20 L55,45 L80,50 L55,55 L50,80 L45,55 L20,50 L45,45 Z" />
              <path d="M30,30 L45,45 L50,20 L55,45 L70,30 L55,55 L80,50 L55,55 L70,70 L45,55 L50,80 L45,55 L30,70 L45,45 L20,50 L45,45 Z" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative container">
        <motion.div
          style={{ opacity }}
          className="text-center space-y-4 max-w-3xl mx-auto px-4"
        >
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl font-light italic text-foreground/80"
          >
            {quotes[locale]}
          </motion.p>
        </motion.div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
} 