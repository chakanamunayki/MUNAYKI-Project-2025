'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/contexts/translation-context';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

/**
 * IMPORTANT: Main Navigation Menu Items
 * DO NOT remove or modify these items without explicit request
 * Each item represents a core section of the application
 * 
 * MODIFICATION RULES:
 * 1. Keep all existing menu items unless specifically requested to remove
 * 2. Maintain the order of items as defined
 * 3. Preserve href paths for routing
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

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname();
  const { t, locale } = useTranslation();
  const { user, isAuthenticated, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <nav className={cn('flex items-center space-x-8', className)} {...props}>
        {menuItems.map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={`/${locale}${item.href}`}
              className={cn(
                'flex items-center gap-1 text-sm font-medium transition-colors dark:text-white text-black hover:text-[#db1b77]',
                pathname === item.href
                  ? 'dark:text-white text-black'
                  : 'dark:text-white text-black'
              )}
            >
              {t(`main.${item.key}.title`, 'navigation')}
              {item.submenu && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-0.5 transition-transform duration-200 group-hover:rotate-180"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              )}
            </Link>
            
            {item.submenu && (
              <div className="absolute left-1/2 top-full mt-1 w-48 -translate-x-1/2 rounded-lg bg-background/95 shadow-lg ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={`/${locale}${subItem.href}`}
                      className={cn(
                        'block px-4 py-2.5 text-sm transition-colors hover:text-[#db1b77] hover:bg-accent/50',
                        pathname === subItem.href
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {t(`main.${item.key}.items.${subItem.key}`, 'navigation')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="ml-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                asChild
              >
                <Link href={`/${locale}/dashboard`}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {locale === 'es' ? 'Panel de Control' : 'Dashboard'}
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/avatar-placeholder.jpg" alt={user?.name || 'User'} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/dashboard/profile`}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{locale === 'es' ? 'Perfil' : 'Profile'}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/dashboard/settings`}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{locale === 'es' ? 'Configuración' : 'Settings'}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{locale === 'es' ? 'Cerrar sesión' : 'Sign out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button 
              variant="default" 
              onClick={() => setShowAuthModal(true)}
            >
              {locale === 'es' ? 'Iniciar sesión' : 'Sign in'}
            </Button>
          )}
        </div>
      </nav>

      <AuthModal 
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSuccess={handleAuthSuccess}
        locale={locale}
      />
    </>
  );
} 