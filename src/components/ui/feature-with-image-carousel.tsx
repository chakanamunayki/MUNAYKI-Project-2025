import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "@/lib/contexts/translation-context";
import { type LocalizedString } from "@/types/i18n";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

interface FeatureProps {
  title: string;
  description: string;
  badge?: string;
  highlights: LocalizedString[];
  className?: string;
}

function Feature({ title, description, badge, highlights, className }: FeatureProps) {
  const { locale } = useTranslation();
  const [api, setApi] = React.useState<any>(null);

  React.useEffect(() => {
    if (!api) return;

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-center gap-10">
          <motion.div 
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="flex gap-4 flex-col items-start"
          >
            {badge && (
              <div>
                <Badge>{badge}</Badge>
              </div>
            )}
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-4xl tracking-tighter lg:max-w-xl font-bold text-left">
                {title}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                {description}
              </p>
            </div>
          </motion.div>
          <motion.div 
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className="w-full max-w-full px-6"
          >
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {highlights.map((highlight, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all p-8 space-y-4">
                      {/* Extract and display number if it exists */}
                      {highlight[locale].match(/\d+/)?.[0] && (
                        <span className="text-4xl font-bold text-primary">
                          {highlight[locale].match(/\d+/)?.[0]}+
                        </span>
                      )}
                      <p className="text-lg text-muted-foreground dark:text-white/70">
                        {highlight[locale].replace(/\d+\+?\s/, '')}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Feature }; 