'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { VideoBackground } from '@/components/effects/video-background';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { useTranslation } from '@/lib/contexts/translation-context';

/**
 * IMPORTANT: DO NOT REMOVE OR MODIFY THESE WORDS
 * These words are part of the core rotating animation in the hero section
 * Only modify with explicit user request
 */
const words = [
  'Being',
  'Mind',
  'Body',
  'Soul',
  'Spirit',
  'Energy',
  'Wisdom',
  'Heart',
];

// Add tooltip content mapping
const tooltipContent = {
  holistic: "Embrace holistic healing, where every facet of your being aligns in a symphony of balance and growth.",
  immersive: "Step into an immersive experience that envelops you in transformative energy and gentle renewal.",
  inspiring: "Let inspiring moments kindle your inner light, guiding you toward boundless hope and creativity.",
  awaken: "Allow your spirit to awaken to the gentle call of each new day, blossoming into profound self-discovery.",
  wisdom: "Discover wisdom that whispers ancient truths, anchoring you with clarity and serene purpose.",
  mind: "Nurture your mind as a sanctuary of calm and creativity, where thoughtful insights bloom.",
  body: "Honor your body as a temple of natural vitality, gracefully carrying you through life's journey.",
  soul: "Embrace your soul, a profound wellspring of love and purpose, revealing the beauty of your inner self.",
};

// Tooltip component
function Tooltip({ word, children }: { word: string, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { t } = useTranslation();

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 bottom-full mb-2 w-64 -translate-x-1/2 rounded-lg bg-background/95 px-4 py-2 text-sm shadow-lg ring-1 ring-black/10 backdrop-blur-sm"
          >
            <div className="relative">
              {t(`tooltips.${word.toLowerCase()}`, 'common')}
              {/* Arrow */}
              <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-background/95" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/**
 * Hero Component
 * Core landing section of the application
 * 
 * MODIFICATION RULES:
 * 1. DO NOT remove existing animations or transitions
 * 2. DO NOT remove any content without explicit request
 * 3. Style changes should preserve existing functionality
 * 4. Maintain all interactive elements (buttons, animations)
 * 5. Preserve accessibility features
 */
export function Hero() {
  const { t, locale } = useTranslation();
  const [currentWord, setCurrentWord] = React.useState(0);
  
  // Get rotating words from translations
  const rotatingWords = React.useMemo(() => {
    const translationKey = 'hero.title.rotatingWords';
    const translations = t(translationKey, 'home');
    // Handle both array and string formats
    if (Array.isArray(translations)) {
      return translations;
    }
    // If it's not working, try accessing the translation object directly
    try {
      const homeTranslations = require(`@/locales/${locale}/home.json`);
      return homeTranslations.hero.title.rotatingWords;
    } catch {
      // Fallback to default words if everything fails
      return [
        locale === 'es' ? 'Ser' : 'Being',
        locale === 'es' ? 'Mente' : 'Mind',
        locale === 'es' ? 'Cuerpo' : 'Body',
        locale === 'es' ? 'Alma' : 'Soul',
        locale === 'es' ? 'Espíritu' : 'Spirit',
        locale === 'es' ? 'Energía' : 'Energy',
        locale === 'es' ? 'Sabiduría' : 'Wisdom',
        locale === 'es' ? 'Corazón' : 'Heart',
      ];
    }
  }, [t, locale]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Helper function to replace placeholders with tooltips
  const renderDescription = (text: string) => {
    const parts = text.split(/\{([^}]+)\}/);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is a placeholder
        const tooltipWord = part.toLowerCase();
        return (
          <Tooltip key={part} word={tooltipWord}>
            <span className="highlight-word">
              {t(`words.${tooltipWord}`, 'common')}
            </span>
          </Tooltip>
        );
      }
      return part;
    });
  };

  return (
    <section className="w-full min-h-screen section-dark">
      {/* Video Background */}
      <VideoBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center space-y-12"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-48 h-48 relative mx-auto mb-8"
          >
            <Image
              src="/images/logo/munay-ki.svg"
              alt="Munayki Logo"
              fill
              className="object-contain dark:invert"
              priority
            />
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl font-bold tracking-tight sm:text-7xl"
            >
              {t('hero.title.prefix', 'home')}{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block text-[#db1b77]"
                >
                  {rotatingWords[currentWord]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto px-4"
            >
              {renderDescription(t('hero.description', 'home'))}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center px-4"
          >
            <ButtonColorful 
              label={t('buttons.learnMore', 'common')}
              onClick={() => window.location.href = `/${locale}/about`}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1 h-1 bg-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
} 