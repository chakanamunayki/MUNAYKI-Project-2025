'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Award, BookOpen, Newspaper, ArrowRight } from 'lucide-react';
import { type Therapist } from '@/types/therapist';
import { type Locale } from '@/types/i18n';
import { useTranslation } from '@/lib/contexts/translation-context';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fadeIn, slideIn } from '@/lib/motion';
import { Feature } from "@/components/ui/feature-with-image-carousel";
import { FreeAssessmentCard } from '@/components/ui/free-assessment-card';

interface TherapistAboutProps {
  therapist: Therapist;
  locale: Locale;
  className?: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div 
      variants={fadeIn('up', 'tween', 0.2, 1)}
      className={cn(
        "relative p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10",
        "hover:bg-white/10 transition-colors duration-300",
        "dark:bg-background/50 dark:border-white/5 dark:hover:bg-background/70",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground dark:text-white">
            {title}
          </h3>
          <p className="text-muted-foreground dark:text-white/70">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const experienceHighlights = [
  {
    en: "Ayahuasca Integration Specialist",
    es: "Especialista en Integración de Ayahuasca"
  },
  {
    en: "Over 100 guided ceremonies",
    es: "Más de 100 ceremonias guiadas"
  },
  {
    en: "20+ Years of Expertise",
    es: "Más de 20 años de experiencia"
  },
  {
    en: "Indigenous Wisdom Keeper",
    es: "Guardián de la Sabiduría Indígena"
  },
  {
    en: "Holistic Healing Practitioner",
    es: "Practicante de Sanación Holística"
  },
  {
    en: "Traditional Medicine Guide",
    es: "Guía de Medicina Tradicional"
  }
];

const pressArticles = [
  {
    url: "https://news.mongabay.com/2024/12/indigenous-runners-complete-seven-month-journey-for-mother-earth-and-solidarity/",
    title: {
      en: "Indigenous Runners Complete Seven-Month Journey for Mother Earth and Solidarity",
      es: "Viaje de los Corredores Indígenas: Una Expedición de Siete Meses por la Madre Tierra"
    },
    source: "Mongabay",
    date: {
      en: "December 30, 2024",
      es: "30 de Diciembre, 2024"
    }
  },
  {
    url: "https://news.mongabay.com/2023/12/indigenous-runners-journey/",
    title: {
      en: "Indigenous Runners Journey: A Seven-Month Expedition for Mother Earth",
      es: "Viaje de los Corredores Indígenas: Una Expedición de Siete Meses por la Madre Tierra"
    },
    source: "Mongabay",
    date: {
      en: "December 1, 2023",
      es: "1 de Diciembre, 2023"
    }
  }
];

export function TherapistAbout({ therapist, locale, className }: TherapistAboutProps) {
  const { t } = useTranslation();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // State for sliding text animation
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experienceHighlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className={cn("relative py-24 overflow-hidden", className)}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="max-w-6xl mx-auto space-y-24"
        >
          {/* Main Bio */}
          <div className="text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
                <span className="section-title">
                  {t('sections.about', 'therapists')}
                </span>
              </h2>
            </div>
            
            {/* 50/50 Image and Text Layout */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={fadeIn('right', 'tween', 0.2, 1)}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={therapist.image}
                  alt={therapist.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </motion.div>
              
              <motion.div 
                variants={fadeIn('left', 'tween', 0.2, 1)}
                className="text-left space-y-6"
              >
                <p className="text-lg md:text-xl text-muted-foreground dark:text-white/70 leading-relaxed">
                  {therapist.bio[locale]}
                </p>
                <p className="text-lg md:text-xl text-muted-foreground dark:text-white/70 leading-relaxed">
                  {therapist.methodology[locale]}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Experience Section with Sliding Text */}
          <div className="text-center space-y-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground dark:text-white">
              {locale === 'en' ? 'Experience' : 'Experiencia'}
            </h3>
            <div className="h-48 md:h-44 lg:h-40 flex items-center justify-center overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#E31C58] max-w-[90vw] md:max-w-[800px] lg:max-w-[1000px] break-words px-2"
                >
                  {experienceHighlights[currentIndex][locale]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Services Section */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
                {locale === 'en' ? "Henri's Holistic Services" : 'Servicios Holísticos de Henri'}
              </h3>
              <p className="text-lg text-muted-foreground dark:text-white/70 max-w-2xl mx-auto">
                {locale === 'en' 
                  ? 'Pre and post ceremony guidance available both remotely and in-person'
                  : 'Guía pre y post ceremonia disponible tanto de forma remota como presencial'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pre-Ceremony Support */}
              <motion.div 
                variants={fadeIn('up', 'tween', 0.3, 1)}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground dark:text-white">
                    {locale === 'en' ? 'Pre-Ceremony Preparation' : 'Preparación Pre-Ceremonia'}
                  </h4>
                  <p className="text-muted-foreground dark:text-white/70">
                    {locale === 'en'
                      ? 'Personalized guidance to prepare your mind, body, and spirit for the sacred ceremony experience.'
                      : 'Guía personalizada para preparar tu mente, cuerpo y espíritu para la experiencia de la ceremonia sagrada.'}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/70">
                    <li>• {locale === 'en' ? 'Dietary guidelines' : 'Guías dietéticas'}</li>
                    <li>• {locale === 'en' ? 'Intention setting' : 'Establecimiento de intención'}</li>
                    <li>• {locale === 'en' ? 'Emotional preparation' : 'Preparación emocional'}</li>
                  </ul>
                </div>
              </motion.div>

              {/* Ceremony Facilitation */}
              <motion.div 
                variants={fadeIn('up', 'tween', 0.4, 1)}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-primary/10">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground dark:text-white">
                    {locale === 'en' ? 'Sacred Ceremony' : 'Ceremonia Sagrada'}
                  </h4>
                  <p className="text-muted-foreground dark:text-white/70">
                    {locale === 'en'
                      ? 'Guided ceremonial experience in a safe, sacred space with traditional practices.'
                      : 'Experiencia ceremonial guiada en un espacio sagrado y seguro con prácticas tradicionales.'}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/70">
                    <li>• {locale === 'en' ? 'Sacred space holding' : 'Mantenimiento del espacio sagrado'}</li>
                    <li>• {locale === 'en' ? 'Traditional icaros' : 'Icaros tradicionales'}</li>
                    <li>• {locale === 'en' ? 'Personal guidance' : 'Guía personal'}</li>
                  </ul>
                </div>
              </motion.div>

              {/* Integration Support */}
              <motion.div 
                variants={fadeIn('up', 'tween', 0.5, 1)}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all md:col-span-2 lg:col-span-1"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground dark:text-white">
                    {locale === 'en' ? 'Integration Support' : 'Apoyo de Integración'}
                  </h4>
                  <p className="text-muted-foreground dark:text-white/70">
                    {locale === 'en'
                      ? 'Ongoing support to help integrate insights and transform your experience into lasting positive change.'
                      : 'Apoyo continuo para ayudar a integrar las revelaciones y transformar tu experiencia en cambios positivos duraderos.'}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground dark:text-white/70">
                    <li>• {locale === 'en' ? 'Integration circles' : 'Círculos de integración'}</li>
                    <li>• {locale === 'en' ? 'One-on-one sessions' : 'Sesiones individuales'}</li>
                    <li>• {locale === 'en' ? 'Practical tools & practices' : 'Herramientas y prácticas'}</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Free Assessment Card */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="max-w-2xl mx-auto"
          >
            <FreeAssessmentCard locale={locale} />
          </motion.div>

          {/* Press Features */}
          <motion.div 
            variants={slideIn('left', 'tween', 0.2, 1)}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground dark:text-white">
              {locale === 'en' ? 'Press & Media' : 'Prensa y Medios'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {pressArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground dark:text-white">
                        {article.title[locale]}
                      </h4>
                      <p className="text-sm text-muted-foreground dark:text-white/70">
                        {article.source} • {article.date[locale]}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <div className="text-center pt-8">
          </div>
        </motion.div>
      </div>
    </section>
  );
} 