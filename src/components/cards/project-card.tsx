'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/contexts/translation-context';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  status: 'active' | 'completed' | 'upcoming';
  link: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { t } = useTranslation();

  const statusColors = {
    active: 'bg-green-500/10 text-green-500',
    completed: 'bg-blue-500/10 text-blue-500',
    upcoming: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-glow",
        className
      )}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge 
            className={cn(
              "absolute top-4 right-4 z-10",
              statusColors[project.status]
            )}
          >
            {t(`project.status.${project.status}`)}
          </Badge>
        </div>
        
        <CardHeader>
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{project.description}</p>
          
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {project.progress}%
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <ButtonColorful
            className="w-full"
            label={t('buttons.learnMore')}
            onClick={() => window.location.href = project.link}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
} 