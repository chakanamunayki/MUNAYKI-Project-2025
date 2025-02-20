'use client';

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MoveRight, PhoneCall, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui";
import { useTheme } from "next-themes";
import Image from "next/image";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation values
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);
  
  const titles = useMemo(
    () => [
      "Self", "Spirit", "Wisdom", "Soul", "Child", "Truth", 
      "Potential", "Power", "Peace", "Light", "Heart", 
      "Nature", "Being", "Voice"
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  }

  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: 'radial-gradient(circle at center, var(--background) 0%, var(--background) 100%)',
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)',
            rotateX,
            rotateY,
          }}
        />
      </div>

      <div className="container relative mx-auto flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="secondary" size="sm" className="gap-4">
              Learn our story <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl tracking-tighter font-regular">
              <span>Awaken Your Inner</span>
              <div className="h-24 md:h-32 relative flex justify-center overflow-hidden text-primary">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -50 : 50,
                            opacity: 0,
                          }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Step into MUNAYKI's world of holistic possibilities, where expert-led ceremonies, 
              immersive retreats, and inspiring projects converge to awaken your inner wisdom 
              and guide you towards profound self-discovery and transformation of the health 
              of your mind, body and soul.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="gap-4" variant="outline">
              Call Marta <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Book a Session <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Background Image with Parallax */}
        <motion.div
          className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none"
          style={{
            x: useTransform(mouseX, [-300, 300], [-20, 20]),
            y: useTransform(mouseY, [-300, 300], [-20, 20]),
          }}
        >
          {/* Replace src with your actual image path */}
          <Image
            src="/placeholder-image.jpg"
            alt="Decorative background"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}

export { Hero }; 