import { type Locale } from '@/types/i18n';
import { SimpleAuthForm } from '@/components/auth/simple-auth-form';
import Image from 'next/image';
import { Suspense } from 'react';
import { BookingInfoBanner } from '@/components/booking/booking-info-banner';

interface PageProps {
  params: {
    locale: Locale;
  };
  searchParams?: {
    eventId?: string;
    eventName?: string;
    eventDate?: string;
    eventTime?: string;
    eventPrice?: string;
    eventCurrency?: string;
    eventLocation?: string;
    eventImage?: string;
    isBookingFlow?: string;
    redirect?: string;
    redirectTo?: string;
    error?: string;
    saveBooking?: string;
  };
}

export default function AuthPage({ params, searchParams = {} }: PageProps) {
  const { locale } = params;
  const hasBookingInfo = searchParams.eventName && searchParams.eventDate && searchParams.eventPrice;
  const shouldSaveBooking = searchParams.saveBooking === 'true';
  
  // Use redirectTo parameter if available, otherwise use redirect
  const redirectPath = searchParams.redirectTo || searchParams.redirect;

  // Log the search parameters for debugging
  console.log('AuthPage - searchParams:', searchParams);
  console.log('AuthPage - hasBookingInfo:', hasBookingInfo);
  console.log('AuthPage - shouldSaveBooking:', shouldSaveBooking);
  console.log('AuthPage - redirectPath:', redirectPath);

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image 
            src="/images/auth/auth_page.jpg" 
            alt="Authentication background"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.svg" alt="MunayKi Logo" className="h-8 w-auto mr-2" />
          MunayKi
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {locale === 'es' 
                ? "Conecta con la naturaleza, conecta contigo mismo."
                : "Connect with nature, connect with yourself."}
            </p>
            <footer className="text-sm">MunayKi Experiences</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {hasBookingInfo && (
            <div className="mb-4">
              <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-md" />}>
                <BookingInfoBanner
                  eventName={searchParams.eventName!}
                  eventDate={searchParams.eventDate!}
                  eventCost={searchParams.eventPrice!}
                  locale={locale}
                />
              </Suspense>
            </div>
          )}
          {shouldSaveBooking && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {locale === 'es' 
                  ? "Inicia sesión para guardar tu reserva en la base de datos."
                  : "Sign in to save your booking to the database."}
              </p>
            </div>
          )}
          <SimpleAuthForm 
            locale={locale} 
            bookingInfo={hasBookingInfo ? {
              eventId: searchParams.eventId,
              eventName: searchParams.eventName,
              eventDate: searchParams.eventDate,
              eventTime: searchParams.eventTime,
              eventPrice: searchParams.eventPrice,
              eventCurrency: searchParams.eventCurrency,
              eventLocation: searchParams.eventLocation,
              eventImage: searchParams.eventImage,
              isBookingFlow: searchParams.isBookingFlow === 'true'
            } : undefined}
            saveBookingAfterAuth={shouldSaveBooking}
            redirectPath={redirectPath}
          />
        </div>
      </div>
    </div>
  );
} 