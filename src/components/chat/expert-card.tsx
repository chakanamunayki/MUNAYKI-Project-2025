'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import type { HolisticExpert } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ExpertCardProps {
  expert: HolisticExpert;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ExpertCard({ expert, isActive, onClick, className }: ExpertCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all duration-200",
        "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
        isActive && "bg-muted/50 shadow-lg",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 flex-shrink-0">
          <div className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r",
            expert.accentColor
          )} />
          <Image
            src={expert.avatar}
            alt={expert.name}
            width={48}
            height={48}
            className="relative rounded-full object-cover border-2 border-background"
          />
          {isActive && (
            <span className="absolute bottom-0 right-0 h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{expert.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{expert.title}</p>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-medium">{expert.rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
        {expert.description}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {expert.topics.map((topic) => (
          <span
            key={topic}
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              "bg-gradient-to-r bg-clip-text text-transparent",
              expert.accentColor
            )}
          >
            {topic}
          </span>
        ))}
      </div>
    </button>
  );
} 