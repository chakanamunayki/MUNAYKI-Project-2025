'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export type SectionVariant = 'default' | 'alternate' | 'dark' | 'black';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  containerClassName?: string;
}

export function Section({
  children,
  className,
  variant = 'default',
  containerClassName,
}: SectionProps) {
  const sectionClasses = cn(
    'w-full py-24',
    {
      // Combined light and dark mode classes
      'bg-background dark:bg-black text-foreground dark:text-white': variant === 'default',
      'bg-muted dark:bg-[#111111] text-foreground dark:text-white': variant === 'alternate',
      'bg-[#111111] text-white': variant === 'dark',
      'bg-black text-white': variant === 'black',
    },
    className
  );

  return (
    <section className={sectionClasses}>
      <div className={cn('container mx-auto px-4', containerClassName)}>
        {children}
      </div>
    </section>
  );
} 