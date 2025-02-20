'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  UserCircle, 
  Bookmark,
  HelpCircle,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function DashboardLayout({ children, params: { locale } }: DashboardLayoutProps) {
  const pathname = usePathname();
  
  const sidebarLinks = [
    {
      id: 'overview',
      label: locale === 'es' ? 'Vista General' : 'Overview',
      href: `/${locale}/dashboard`,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: 'holistic-experts',
      label: locale === 'es' ? 'Expertos Holísticos' : 'Holistic Experts',
      href: `/${locale}/dashboard/experts`,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: 'bookings',
      label: locale === 'es' ? 'Mis Reservas' : 'My Bookings',
      href: `/${locale}/dashboard/bookings`,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: 'saved-chats',
      label: locale === 'es' ? 'Conversaciones Guardadas' : 'Saved Chats',
      href: `/${locale}/dashboard/saved-chats`,
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      id: 'profile',
      label: locale === 'es' ? 'Perfil' : 'Profile',
      href: `/${locale}/dashboard/profile`,
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      id: 'settings',
      label: locale === 'es' ? 'Configuración' : 'Settings',
      href: `/${locale}/dashboard/settings`,
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: 'help',
      label: locale === 'es' ? 'Ayuda y Soporte' : 'Help & Support',
      href: `/${locale}/dashboard/help`,
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar>
        <SidebarBody className="py-6">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {locale === 'es' ? 'Panel de Control' : 'Dashboard'}
            </h2>
            <div className="space-y-1">
              {sidebarLinks.map((link) => (
                <SidebarLink
                  key={link.id}
                  link={{
                    ...link,
                    className: cn(
                      "transition-colors hover:text-primary",
                      pathname === link.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent"
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 