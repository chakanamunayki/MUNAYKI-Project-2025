'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video slightly
    }
  }, []);

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-20" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] z-10" />
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
} 