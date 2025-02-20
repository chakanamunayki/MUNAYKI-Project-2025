'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/contexts/translation-context';
import Image from 'next/image';

/**
 * IMPORTANT: Mobile Navigation Menu Items
 * These items must match the main navigation items
 * DO NOT modify without explicit request
 * 
 * MODIFICATION RULES:
 * 1. Keep in sync with main-nav.tsx menu items
 * 2. Preserve all items and their order
 * 3. Maintain consistent href paths
 * 4. Keep accessibility features intact
 * 5. Maintain submenu structure and items
 */
const menuItems = [
  { 
    key: 'ceremonies',
    href: '/ceremonies',
    submenu: [
      { key: 'cacao', href: '/ceremonies/cacao' },
      { key: 'soundHealing', href: '/ceremonies/sound-healing' },
      { key: 'fire', href: '/ceremonies/fire' },
      { key: 'fullMoon', href: '/ceremonies/full-moon' },
    ]
  },
  { 
    key: 'therapies',
    href: '/therapies',
    submenu: [
      { key: 'reiki', href: '/therapies/reiki' },
      { key: 'massage', href: '/therapies/massage' },
      { key: 'energyHealing', href: '/therapies/energy-healing' },
      { key: 'breathwork', href: '/therapies/breathwork' },
    ]
  },
  { 
    key: 'retreats',
    href: '/retreats',
    submenu: [
      { key: 'weekend', href: '/retreats/weekend' },
      { key: 'weekLong', href: '/retreats/week-long' },
      { key: 'custom', href: '/retreats/custom' },
    ]
  },
  { key: 'venue', href: '/venue' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  // Close menu when pathname changes
  React.useEffect(() => {
    setIsOpen(false);
    setExpandedItems([]);
  }, [pathname]);

  const toggleSubmenu = (href: string) => {
    setExpandedItems(current =>
      current.includes(href)
        ? current.filter(item => item !== href)
        : [...current, href]
    );
  };

  return (
    <>
      {/* Burger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative md:hidden"
        aria-label={t('buttons.menu')}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-[400px] bg-background border-l z-[9999] shadow-xl"
            >
              <div className="flex flex-col h-full relative">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b bg-background">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-semibold text-[#db1b77]">{t('buttons.menu')}</span>
                    <LanguageToggle />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label={t('buttons.close')}
                    className="hover:bg-[#db1b77]/10 hover:text-[#db1b77] transition-all duration-200"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Menu Items - Scrollable Container */}
                <div className="flex-1 overflow-y-auto">
                  <nav className="p-6">
                    <ul className="space-y-6">
                      {menuItems.map((item) => (
                        <li key={item.href}>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/${locale}${item.href}`}
                                className={cn(
                                  'block w-full px-3 py-2 rounded-md text-xl font-medium transition-all duration-200',
                                  'hover:bg-[#db1b77]/30 hover:text-[#db1b77]',
                                  pathname === item.href 
                                    ? 'text-[#db1b77] bg-[#db1b77]/25' 
                                    : 'text-foreground dark:text-gray-100'
                                )}
                                onClick={(e) => {
                                  if (item.submenu) {
                                    e.preventDefault();
                                    toggleSubmenu(item.href);
                                  } else {
                                    setIsOpen(false);
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{t(`main.${item.key}.title`, 'navigation') || t(`main.${item.key}`, 'navigation')}</span>
                                  {item.submenu && (
                                    <motion.div
                                      animate={{ rotate: expandedItems.includes(item.href) ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="m6 9 6 6 6-6"/>
                                      </svg>
                                    </motion.div>
                                  )}
                                </div>
                              </Link>
                            </div>
                            
                            {/* Submenu with updated text colors */}
                            {item.submenu && (
                              <AnimatePresence>
                                {expandedItems.includes(item.href) && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0, y: -10 }}
                                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -10 }}
                                    transition={{ 
                                      duration: 0.3,
                                      ease: "easeInOut"
                                    }}
                                    className="pl-6 space-y-3 overflow-hidden border-l-2 border-[#db1b77]/20 ml-2"
                                  >
                                    {item.submenu.map((subItem) => (
                                      <motion.li
                                        key={subItem.href}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={`/${locale}${subItem.href}`}
                                          className={cn(
                                            'block w-full px-3 py-2 rounded-md text-lg transition-all duration-200',
                                            'hover:bg-[#db1b77]/30 hover:text-[#db1b77]',
                                            pathname === subItem.href
                                              ? 'text-[#db1b77] bg-[#db1b77]/25 font-medium'
                                              : 'text-foreground/90 dark:text-gray-200'
                                          )}
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {t(`main.${item.key}.items.${subItem.key}`, 'navigation')}
                                        </Link>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Theme Toggle and Logo - Fixed at bottom */}
                <div className="border-t bg-background p-6">
                  <div className="flex flex-col items-center gap-6">
                    {/* Logo */}
                    <div className="w-32 h-32 relative">
                      <Image
                        src="/images/logo/munay-ki.svg"
                        alt="Munayki Logo"
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-center w-full">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Swipe to close handler */}
            <motion.div
              className="fixed inset-0 z-40"
              onPanEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe > 50) {
                  setIsOpen(false);
                }
              }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
} 