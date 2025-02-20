'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/lib/contexts/translation-context';
import { cn } from '@/lib/utils';
import { ButtonColorful } from '@/components/ui/button-colorful';

export function Footer() {
  const { t, locale } = useTranslation();

  const socialLinks = [
    {
      name: 'instagram',
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://instagram.com/munayki',
    },
    {
      name: 'facebook',
      icon: <Facebook className="w-5 h-5" />,
      href: 'https://facebook.com/munayki',
    },
    {
      name: 'whatsapp',
      icon: <MessageCircle className="w-5 h-5" />,
      href: 'https://wa.me/573123456789',
    },
    {
      name: 'youtube',
      icon: <Youtube className="w-5 h-5" />,
      href: 'https://youtube.com/munayki',
    },
  ];

  const quickLinks = [
    { key: 'ceremonies', href: '/ceremonies' },
    { key: 'therapies', href: '/therapies' },
    { key: 'retreats', href: '/retreats' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-6 flex flex-col items-center text-center">
            <Link href={`/${locale}`}>
              <Image
                src="/images/logo/munay-ki.svg"
                alt="MUNAY-KI"
                width={150}
                height={40}
                className="dark:invert"
              />
            </Link>
            <p className="text-sm text-gray-400">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={t(`footer.social.${social.name}`)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {t(`footer.quickLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('footer.contact.title')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>{t('footer.contact.address')}</li>
              <li>{t('footer.contact.phone')}</li>
              <li>{t('footer.contact.email')}</li>
              <li>{t('footer.contact.hours')}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('footer.newsletter.title')}</h3>
            <p className="text-sm text-gray-400">
              {t('footer.newsletter.description')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ButtonColorful
                type="submit"
                label={t('footer.newsletter.button')}
                className="w-full"
              />
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {t('footer.legal.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                {t('footer.legal.privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                {t('footer.legal.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 