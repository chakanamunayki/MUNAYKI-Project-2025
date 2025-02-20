'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/lib/contexts/translation-context';
import { fadeIn } from '@/lib/motion';

export function JoinNetwork() {
  const { t } = useTranslation();

  const openWhatsApp = () => {
    window.open('https://wa.me/573106172601?text=Hi%20Marta!%20I%27m%20interested%20in%20joining%20the%20Munayki%20holistic%20network.', '_blank');
  };

  const cards = [
    {
      title: 'Add Your Holistic Project',
      description: 'Share your vision for a holistic project and connect with like-minded individuals. Whether it\'s a retreat center, healing space, or community initiative.',
      image: '/images/join/add-project.jpg',
      action: 'Start Your Project'
    },
    {
      title: 'Add Your Therapy Practice',
      description: 'Join our network of skilled therapists and healers. Showcase your unique healing modalities and connect with clients seeking holistic wellness.',
      image: '/images/join/add-therapist.jpg',
      action: 'Join as Therapist'
    },
    {
      title: 'Add Your Ceremony',
      description: 'Share your sacred ceremonies and rituals with our community. Create transformative experiences in a supportive and respectful environment.',
      image: '/images/join/add-ceremony.jpg',
      action: 'Host Ceremony'
    },
    {
      title: 'Add Your Retreat',
      description: 'List your holistic retreat and reach participants seeking deep transformation. Perfect for retreat centers and facilitators.',
      image: '/images/join/add-retreat.jpg',
      action: 'Create Retreat'
    }
  ];

  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.h2
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="text-4xl font-bold tracking-tight"
            >
              <span className="section-title">
                {t('joinNetwork.title', 'home')}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('joinNetwork.subtitle', 'home')}
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
                className="group"
              >
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-glow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                        <Plus className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                  
                  <CardFooter>
                    <ButtonColorful
                      onClick={openWhatsApp}
                      className="w-full"
                      label={card.action}
                    />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Closing Text */}
          <motion.p
            variants={fadeIn('up', 'tween', 0.6, 1)}
            className="text-center text-muted-foreground max-w-3xl mx-auto"
          >
            {t('joinNetwork.closing', 'home')}
          </motion.p>
        </div>
      </div>
    </section>
  );
} 