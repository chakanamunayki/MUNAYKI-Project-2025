'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { type Locale } from '@/types/i18n';

interface CeremonyDividerProps {
  locale: Locale;
}

const quotes = {
  en: "Where ancient wisdom meets modern healing, transformation begins its sacred journey",
  es: "Donde la sabiduría ancestral se encuentra con la sanación moderna, la transformación comienza su viaje sagrado"
};

export function CeremonyDivider({ locale }: CeremonyDividerProps) {
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

      {/* Chakana Cross Pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          style={{ rotate, scale }}
          className="absolute w-[400px] h-[400px] max-w-none"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full text-primary/20">
            {/* Inner cross structure */}
            <path d="
              M40,10 h40 v30 h30 v40 h-30 v30 h-40 v-30 h-30 v-40 h30 z
              M50,20 h20 v30 h30 v20 h-30 v30 h-20 v-30 h-30 v-20 h30 z
              M60,30 h10 v30 h30 v10 h-30 v30 h-10 v-30 h-30 v-10 h30 z
            " className="fill-current" />

            {/* Center hole */}
            <rect x="55" y="55" width="10" height="10" className="fill-background" />

            {/* Corner decorative elements */}
            <path d="M15,15 h15 v15 h-15 z" className="fill-current" />
            <path d="M90,15 h15 v15 h-15 z" className="fill-current" />
            <path d="M15,90 h15 v15 h-15 z" className="fill-current" />
            <path d="M90,90 h15 v15 h-15 z" className="fill-current" />
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