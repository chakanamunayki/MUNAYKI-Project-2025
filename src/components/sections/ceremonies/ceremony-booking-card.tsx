'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { type CeremonyBookingCardProps } from '@/types/booking';
import { useBookingCard } from '@/hooks/use-booking-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, PartyPopper } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ButtonColorful } from '@/components/ui/button-colorful';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { BookingWizard } from '@/components/booking/booking-wizard';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/auth/auth-modal';

export function CeremonyBookingCard({
  basePrice,
  currency,
  capacity,
  extras,
  locale,
  ceremonyId,
  ceremonyDetails,
}: CeremonyBookingCardProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const {
    state,
    allExtrasSelected,
    handleExtraToggle,
    formatCurrency,
  } = useBookingCard({ basePrice, extras });

  const prevDiscountState = useRef(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Trigger confetti when discount is applied
  useEffect(() => {
    if (state.discountApplied && !prevDiscountState.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    prevDiscountState.current = state.discountApplied;
  }, [state.discountApplied]);

  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowBookingWizard(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowBookingWizard(true);
  };

  const BookingContent = () => (
    <div className="space-y-6">
      {/* Header with Base Price and Spots */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Base Price</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(basePrice)}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{capacity.available}/{capacity.total} spots</span>
            </div>
          </div>

          {/* Discount Messages */}
          {!state.discountApplied && extras.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-start gap-2">
                <div className="relative w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <p className="text-sm font-medium bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                  {locale === 'es' 
                    ? 'Selecciona todos los extras para recibir un 10% de descuento en tu total'
                    : 'Select all extras to receive a 10% discount on your total'
                  }
                </p>
              </div>
            </motion.div>
          )}
          
          {state.discountApplied && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md flex items-center gap-2"
            >
              <PartyPopper className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">
                {locale === 'es'
                  ? '¡Felicitaciones! Has recibido un 10% de descuento en tu total.'
                  : 'Congratulations! You\'ve received a 10% discount on your total.'
                }
              </p>
            </motion.div>
          )}
        </div>

        {/* Total if different from base price */}
        {state.totalPrice !== basePrice && (
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-semibold">
                {formatCurrency(state.totalPrice)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Extras */}
      <div className="space-y-4">
        <h4 className="font-medium">Optional Extras</h4>
        <div className="space-y-3">
          {extras.map((extra) => (
            <label
              key={extra.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
            >
              <Checkbox
                checked={state.selectedExtras.includes(extra.id)}
                onCheckedChange={() => handleExtraToggle(extra.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{extra.title[locale]}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(extra.price.amount)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {extra.description[locale]}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <Sheet open={showBookingWizard} onOpenChange={setShowBookingWizard}>
        <SheetTrigger asChild>
          <ButtonColorful 
            className="w-full" 
            label={locale === 'es' ? 'Reservar Ahora' : 'Book Now'} 
            onClick={handleBookNowClick}
          />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
            <SheetHeader>
              <SheetTitle>{locale === 'es' ? 'Detalles de la Reserva' : 'Booking Details'}</SheetTitle>
            </SheetHeader>
          </div>
          <div className="px-6 py-4 overflow-y-auto">
            <BookingWizard
              ceremonyId={ceremonyId}
              basePrice={basePrice}
              currency={currency}
              selectedExtras={state.selectedExtras.map(id => {
                const extra = extras.find(e => e.id === id)!;
                return {
                  id: extra.id,
                  title: extra.title[locale],
                  price: extra.price
                };
              })}
              ceremonyDetails={ceremonyDetails}
              locale={locale}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSuccess={handleAuthSuccess}
        locale={locale}
      />
    </div>
  );

  return (
    <>
      {/* Desktop Version */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm hidden lg:block"
      >
        <BookingContent />
      </motion.div>

      {/* Mobile Version */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg lg:hidden">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-bold">{formatCurrency(state.totalPrice)}</p>
              </div>
              <ButtonColorful label="Book Now" />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <BookingContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
} 