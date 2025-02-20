'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  showArrow?: boolean;
  animate?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

/**
 * StoryButton Component
 * A reusable button component with consistent styling and optional animation
 * 
 * @example
 * // Basic usage
 * <StoryButton>Learn our story</StoryButton>
 * 
 * // With link
 * <StoryButton href="/about">Learn our story</StoryButton>
 * 
 * // Without arrow
 * <StoryButton showArrow={false}>Custom Text</StoryButton>
 * 
 * // Without animation
 * <StoryButton animate={false}>Static Button</StoryButton>
 */
export function StoryButton({
  children,
  href,
  showArrow = true,
  animate = true,
  variant = 'outline',
  size = 'lg',
  className,
  ...props
}: StoryButtonProps) {
  // Base button content
  const buttonContent = (
    <>
      {children}
      {showArrow && (
        <span className="ml-2">
          {animate ? (
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </span>
      )}
    </>
  );

  // Base button styles
  const buttonStyles = cn(
    'gap-2 text-lg hover:bg-accent transition-colors duration-200',
    className
  );

  // If href is provided, wrap with Link
  if (href) {
    return (
      <Link href={href}>
        {animate ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant={variant}
              size={size}
              className={buttonStyles}
              {...props}
            >
              {buttonContent}
            </Button>
          </motion.div>
        ) : (
          <Button
            variant={variant}
            size={size}
            className={buttonStyles}
            {...props}
          >
            {buttonContent}
          </Button>
        )}
      </Link>
    );
  }

  // Regular button without Link
  return animate ? (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Button
        variant={variant}
        size={size}
        className={buttonStyles}
        {...props}
      >
        {buttonContent}
      </Button>
    </motion.div>
  ) : (
    <Button
      variant={variant}
      size={size}
      className={buttonStyles}
      {...props}
    >
      {buttonContent}
    </Button>
  );
} 