'use client';

import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HighlightCardProps {
  icon?: ReactNode;
  time?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  details?: Array<{
    icon: ReactNode;
    text: string;
  }>;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function HighlightCard({
  icon,
  time,
  title,
  subtitle,
  description,
  badge,
  details,
  action,
  className,
}: HighlightCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:ring-2 hover:ring-primary/20",
      "bg-gradient-to-r from-purple-900/40 to-purple-800/20",
      "border-purple-800/30",
      className
    )}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Time and Icon */}
            <div className="flex items-center gap-3">
              {time && (
                <span className="text-lg font-medium text-white/90">
                  {time}
                </span>
              )}
              {icon && (
                <div className="text-primary/90">
                  {icon}
                </div>
              )}
            </div>

            {/* Title and Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-white/70">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <Badge 
              variant={badge.variant || 'secondary'}
              className={cn(
                "text-sm",
                badge.variant === 'secondary' && "bg-primary/20 text-primary hover:bg-primary/30"
              )}
            >
              {badge.text}
            </Badge>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-base text-white/70">
            {description}
          </p>
        )}

        {/* Details Grid */}
        {details && details.length > 0 && (
          <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
            {details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="text-white/50">
                  {detail.icon}
                </div>
                <span>{detail.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              "w-full mt-4 py-3 px-4 rounded-lg",
              "bg-gradient-to-r from-purple-400 to-pink-400",
              "text-white font-medium",
              "hover:from-purple-500 hover:to-pink-500",
              "transition-all duration-200",
              "flex items-center justify-center gap-2"
            )}
          >
            {action.label}
            <span className="text-lg">→</span>
          </button>
        )}
      </div>
    </Card>
  );
} 