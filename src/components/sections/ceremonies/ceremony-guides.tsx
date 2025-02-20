'use client';

import { motion } from 'framer-motion';
import { type Locale } from '@/types/i18n';
import Image from 'next/image';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Guide {
  name: string;
  role: {
    [key in Locale]: string;
  };
  bio: {
    [key in Locale]: string;
  };
  image: string;
}

interface CeremonyGuidesProps {
  locale: Locale;
  title: {
    [key in Locale]: string;
  };
  subtitle: {
    [key in Locale]: string;
  };
  guides: Guide[];
}

export function CeremonyGuides({ locale, title, subtitle, guides }: CeremonyGuidesProps) {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">
            {title[locale]}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {subtitle[locale]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <Card 
              key={guide.name} 
              className={cn(
                "overflow-hidden relative group",
                "hover:shadow-lg transition-all duration-300",
                "flex flex-col"
              )}
            >
              <div className="flex flex-col gap-6 h-full">
                <div className="relative h-80 w-full">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-semibold">{guide.name}</h3>
                    <p className="text-muted-foreground text-lg">{guide.role[locale]}</p>
                  </div>
                  <p className="text-muted-foreground line-clamp-4 flex-1">
                    {guide.bio[locale]}
                  </p>
                  <div className="pt-4">
                    <ButtonColorful
                      label={
                        locale === 'es' 
                          ? (guide.name === 'Marta' || guide.name === 'Henri' || guide.name === 'Mariane' 
                            ? 'Ver Perfil' 
                            : 'Ver Más')
                          : (guide.name === 'Marta' || guide.name === 'Henri' || guide.name === 'Mariane'
                            ? 'View Profile'
                            : 'View More')
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 