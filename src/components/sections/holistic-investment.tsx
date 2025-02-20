'use client';

import { motion } from 'framer-motion';
import { ProjectCard, type Project } from '@/components/cards/project-card';
import { Section } from '@/components/ui/section';
import { useTranslation } from '@/lib/contexts/translation-context';
import { fadeIn, staggerContainer } from '@/lib/motion';

export function HolisticInvestment() {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: '1',
      title: t('holistic.project1.title'),
      description: t('holistic.project1.description'),
      image: '/images/projects/sacred-valley.jpg',
      progress: 65,
      status: 'active',
      link: '/projects/sacred-valley',
    },
    {
      id: '2',
      title: t('holistic.project2.title'),
      description: t('holistic.project2.description'),
      image: '/images/projects/wisdom-center.jpg',
      progress: 40,
      status: 'active',
      link: '/projects/wisdom-center',
    },
    {
      id: '3',
      title: t('holistic.project3.title'),
      description: t('holistic.project3.description'),
      image: '/images/projects/healing-arts.jpg',
      progress: 25,
      status: 'upcoming',
      link: '/projects/healing-arts',
    },
  ];

  return (
    <section className="w-full py-20">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.h2
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
          >
            <span className="section-title">
              {t('holistic.title')}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {t('holistic.description')}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
} 