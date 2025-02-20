'use client';

import { useEffect, useRef } from 'react';

const symbols = [
  // Large Flower of Life
  'M0,0 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0',
  // Large Metatron's Cube
  'M0,0 L20,34.64 L40,0 L20,-34.64 Z',
  // Large Sri Yantra
  'M0,-20 L17.32,10 L-17.32,10 Z',
  // Large Seed of Life
  'M0,0 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0',
];

const colors = [
  'rgba(255, 51, 102, 0.8)', // Pink
  'rgba(255, 153, 51, 0.8)', // Orange
  'rgba(255, 204, 51, 0.8)', // Yellow
  'rgba(51, 204, 153, 0.8)', // Green
];

interface Symbol {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  symbol: string;
  color: string;
  opacity: number;
  speed: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function SacredGeometry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let geometrySymbols: Symbol[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      geometrySymbols = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        scale: Math.random() * 2 + 1.5, // Much larger scale
        rotation: Math.random() * Math.PI * 2,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.3,
        speed: Math.random() * 0.15 + 0.05,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawSymbol(ctx: CanvasRenderingContext2D, symbol: Symbol) {
      ctx.save();
      ctx.translate(symbol.x, symbol.y);
      ctx.rotate(symbol.rotation);
      ctx.scale(symbol.scale, symbol.scale);

      // Draw main symbol
      ctx.globalAlpha = symbol.opacity;
      ctx.strokeStyle = symbol.color;
      ctx.lineWidth = 3;

      // Enhanced glow effect
      ctx.shadowColor = symbol.color;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      const path = new Path2D(symbol.symbol);
      ctx.stroke(path);

      // Second pass for stronger glow
      ctx.lineWidth = 1;
      ctx.shadowBlur = 30;
      ctx.stroke(path);
      
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      geometrySymbols.forEach((symbol) => {
        // Update position with wrapping
        symbol.y += symbol.speed;
        if (symbol.y > canvas.height + 100) {
          symbol.y = -100;
          symbol.x = Math.random() * canvas.width;
        }

        // Smooth rotation
        symbol.rotation += 0.001;

        // Complex pulsing effect
        const pulse = Math.sin(Date.now() * symbol.pulseSpeed + symbol.pulsePhase);
        symbol.opacity = 0.3 + pulse * 0.2;
        symbol.scale = (Math.random() * 2 + 1.5) * (1 + pulse * 0.1);

        drawSymbol(ctx, symbol);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-90"
      style={{ mixBlendMode: 'screen' }}
    />
  );
} 