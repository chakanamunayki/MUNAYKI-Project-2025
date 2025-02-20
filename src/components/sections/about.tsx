'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/lib/contexts/translation-context';
import { useRef } from 'react';
import { fadeIn } from '@/lib/motion';

interface StatProps {
  value: string;
  label: string;
  description: string;
}

function Stat({ value, label, description }: StatProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="section-title">
              {t('about.title', 'home')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle', 'home')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side with parallax */}
          <motion.div
            style={{ y }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <motion.div
              style={{ opacity: imageOpacity }}
              className="absolute inset-0"
            >
              <Image
                src="/images/about/about-1.jpg"
                alt="About Munayki"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className="space-y-8"
          >
            <div className="space-y-4 text-muted-foreground">
              <p>{t('about.content.intro', 'home')}</p>
              <p>{t('about.content.approach', 'home')}</p>
              <p>{t('about.content.mission', 'home')}</p>
            </div>

            {/* Wellness Statistics Grid */}
            <div className="grid gap-8 pt-8">
              <h3 className="text-xl font-semibold">The Impact of Holistic Wellness</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <Stat
                  value="76%"
                  label="Mental Wellness"
                  description="Reduction in stress and anxiety levels through regular meditation and mindfulness practices"
                />
                <Stat
                  value="68%"
                  label="Physical Health"
                  description="Decrease in chronic pain and physical discomfort through integrated healing approaches"
                />
                <Stat
                  value="85%"
                  label="Spiritual Growth"
                  description="Report increased sense of purpose and deeper connection to self after holistic practices"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 