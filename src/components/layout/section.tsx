import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'darker' | 'gradient';
  containerClassName?: string;
}

export function Section({
  children,
  className,
  variant = 'default',
  containerClassName,
}: SectionProps) {
  const sectionClasses = cn(
    'w-full',
    {
      'section-dark': variant === 'dark',
      'section-darker': variant === 'darker',
      'section-gradient': variant === 'gradient',
    },
    className
  );

  return (
    <section className={sectionClasses}>
      <div className={cn('container mx-auto px-4 py-16', containerClassName)}>
        {children}
      </div>
    </section>
  );
} 