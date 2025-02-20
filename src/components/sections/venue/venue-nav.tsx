'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { type Locale } from '@/types/i18n';
import { cn } from '@/lib/utils';

interface VenueNavProps {
  locale: Locale;
}

const sections = [
  {
    id: 'about',
    label: {
      es: 'Sobre Nosotros',
      en: 'About Us'
    }
  },
  {
    id: 'space',
    label: {
      es: 'El Espacio',
      en: 'The Space'
    }
  },
  {
    id: 'gallery',
    label: {
      es: 'Galería',
      en: 'Gallery'
    }
  }
];

export function VenueNav({ locale }: VenueNavProps) {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-6 px-4 mx-auto">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "relative h-14 flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                activeSection === id 
                  ? "text-foreground" 
                  : "text-foreground/60"
              )}
            >
              {label[locale]}
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
} 