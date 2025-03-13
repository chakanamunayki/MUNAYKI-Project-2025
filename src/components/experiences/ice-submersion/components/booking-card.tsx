'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { type Locale } from '@/types/i18n';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Users, Minus, Plus, PartyPopper, Coffee, Snowflake, Heart, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { AuthModal } from '@/components/auth/auth-modal';
import { BookingWizard } from '@/components/booking/booking-wizard';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

interface IceSubmersionBookingCardProps {
  basePrice: number;
  currency: string;
  capacity: {
    total: number;
    available: number;
  };
  locale: Locale;
  eventId: string;
  eventDetails: {
    title: string;
    date: string;
    time: string;
    location?: string;
    image?: string;
  };
}

export function IceSubmersionBookingCard({
  basePrice = 380000, // Updated default base price
  currency,
  capacity,
  locale,
  eventId,
  eventDetails,
}: IceSubmersionBookingCardProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Original price before discount
  const originalPrice = 460000;

  // Group booking state
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showGroupDiscount, setShowGroupDiscount] = useState(false);
  const [showDiscountAnimation, setShowDiscountAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Included items
  const includedItems = [
    {
      icon: <Coffee className="h-4 w-4" />,
      text: locale === 'es' ? 'Cacao Natural Caliente' : 'Hot Natural Cacao'
    },
    {
      icon: <Snowflake className="h-4 w-4" />,
      text: locale === 'es' ? 'Guía Experta de Hielo' : 'Expert Ice Guidance'
    },
    {
      icon: <Heart className="h-4 w-4" />,
      text: locale === 'es' ? 'Almuerzo Delicioso' : 'Delicious Lunch'
    },
    {
      icon: <Users2 className="h-4 w-4" />,
      text: locale === 'es' ? 'Apoyo Personalizado' : 'Personal Support'
    }
  ];

  // Calculate spots progress
  const spotsProgress = ((capacity.total - capacity.available) / capacity.total) * 100;

  // Update total price when number of people changes
  useEffect(() => {
    // Apply 10% discount for groups of 4 or more
    const hasGroupDiscount = numberOfPeople >= 4;
    setShowGroupDiscount(hasGroupDiscount);
    
    // Show celebration animation when discount is first applied
    if (hasGroupDiscount && !showGroupDiscount) {
      setShowDiscountAnimation(true);
      setTimeout(() => setShowDiscountAnimation(false), 3000);
    }
    
    const pricePerPerson = hasGroupDiscount 
      ? basePrice * 0.9 // Apply 10% discount
      : basePrice;
      
    setTotalPrice(pricePerPerson * numberOfPeople);
  }, [basePrice, numberOfPeople, showGroupDiscount]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBookNowClick = () => {
    setIsLoading(true);
    
    try {
      // Create a complete booking info object with all required fields
      const bookingInfo = {
        eventId: eventId,
        eventName: eventDetails.title,
        eventDate: eventDetails.date,
        eventTime: eventDetails.time,
        eventPrice: (showGroupDiscount ? basePrice * 0.9 : basePrice).toString(),
        eventCurrency: currency,
        eventLocation: eventDetails.location || 'La Chakana, Medellín',
        eventImage: eventDetails.image || '/images/experiences/ice-submersion/hero.jpg',
        numberOfPeople: numberOfPeople.toString()
      };
      
      // Store booking information in localStorage
      localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
      sessionStorage.setItem('isBookingFlow', 'true');
      
      console.log('Storing booking info', bookingInfo);
      
      // Build query parameters for the auth page
      const queryParams = new URLSearchParams();
      Object.entries(bookingInfo).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value as string);
        }
      });
      queryParams.append('isBookingFlow', 'true');
      
      // If user is authenticated, show booking wizard
      if (user) {
        setShowBookingWizard(true);
      } else {
        // Otherwise, redirect to authenticating page
        const targetDestination = `/${locale}/booking/new?${queryParams.toString()}`;
        const authenticatingUrl = `/${locale}/authenticating?redirectTo=${encodeURIComponent(targetDestination)}`;
        
        console.log('Redirecting to authenticating page:', authenticatingUrl);
        router.push(authenticatingUrl);
      }
    } catch (error) {
      console.error('Error in handleBookNowClick:', error);
    } finally {
      // Reset loading state after a short delay to ensure UI updates
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowBookingWizard(true);
    setIsLoading(false);
  };

  const incrementPeople = () => {
    if (numberOfPeople < capacity.available) {
      setNumberOfPeople(prev => prev + 1);
    }
  };

  const decrementPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prev => prev - 1);
    }
  };

  const BookingContent = () => (
    <div className="space-y-6">
      {/* Header with Base Price and Spots */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {locale === 'es' ? 'Precio por persona' : 'Price per person'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-muted-foreground">
                  {formatCurrency(originalPrice)}
                </span>
                <motion.h3 
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {formatCurrency(basePrice)}
                </motion.h3>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span>
                  {capacity.available}/{capacity.total} 
                  {locale === 'es' ? ' cupos' : ' spots'}
                </span>
              </div>
              <Progress value={spotsProgress} className="h-1.5 w-24" />
            </div>
          </div>
        </div>

        {/* Included Items */}
        <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
          <h4 className="text-sm font-medium">
            {locale === 'es' ? 'La Experiencia Incluye' : 'Experience Includes'}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="text-primary">{item.icon}</div>
                <span className="text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Group Booking Section */}
        <div className="pt-4 border-t">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">
                {locale === 'es' ? 'Número de participantes' : 'Number of participants'}
              </p>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={decrementPeople}
                  disabled={numberOfPeople <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-6 text-center">{numberOfPeople}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={incrementPeople}
                  disabled={numberOfPeople >= capacity.available}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Group discount notification */}
            {numberOfPeople < 4 && (
              <div className="text-sm text-muted-foreground italic">
                {locale === 'es' 
                  ? 'Grupos de 4+ reciben 10% de descuento' 
                  : 'Groups of 4+ receive 10% discount'}
              </div>
            )}
            
            {/* Ice-themed discount celebration animation */}
            <AnimatePresence>
              {showDiscountAnimation && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative overflow-hidden rounded-md bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10 p-4"
                >
                  {/* Snowflake animations */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: 2 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ 
                          top: "-20%", 
                          left: `${(i * 20) + Math.random() * 10}%`,
                          rotate: 0,
                          opacity: 0
                        }}
                        animate={{ 
                          top: "120%", 
                          rotate: 360,
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      >
                        <Snowflake className="h-4 w-4 text-blue-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="relative flex items-center gap-2 text-primary">
                    <PartyPopper className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {locale === 'es' 
                        ? '¡Felicidades! 10% de descuento aplicado' 
                        : 'Congratulations! 10% discount applied'}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Show discount applied for groups of 4+ */}
            {showGroupDiscount && !showDiscountAnimation && (
              <div className="text-sm text-primary font-medium flex items-center gap-1 bg-primary/5 p-2 rounded-md">
                <PartyPopper className="h-4 w-4" />
                {locale === 'es' 
                  ? 'Descuento de grupo aplicado (10%)' 
                  : 'Group discount applied (10%)'}
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">
                {locale === 'es' ? 'Total' : 'Total'}
              </span>
              <motion.span 
                className={cn(
                  "text-lg font-semibold",
                  showGroupDiscount ? "text-primary" : ""
                )}
                key={totalPrice} // Force animation on price change
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {formatCurrency(totalPrice)}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <Sheet open={showBookingWizard} onOpenChange={setShowBookingWizard}>
        <SheetTrigger asChild>
          <ButtonColorful 
            className="w-full" 
            label={locale === 'es' ? 'Reservar Ahora' : 'Book Now'} 
            onClick={handleBookNowClick}
            isLoading={isLoading}
          />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
            <SheetHeader>
              <SheetTitle>
                {locale === 'es' ? 'Detalles de la Reserva' : 'Booking Details'}
              </SheetTitle>
            </SheetHeader>
          </div>
          <div className="px-6 py-4 overflow-y-auto">
            <BookingWizard
              ceremonyId={eventId}
              basePrice={showGroupDiscount ? basePrice * 0.9 : basePrice}
              currency={currency}
              selectedExtras={[]}
              ceremonyDetails={{
                title: eventDetails.title,
                date: eventDetails.date,
                time: eventDetails.time,
                // Add any additional properties as custom props
              }}
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
                <p className="text-sm text-muted-foreground">
                  {locale === 'es' ? 'Total' : 'Total'}
                </p>
                <p className="text-lg font-bold">{formatCurrency(totalPrice)}</p>
              </div>
              <ButtonColorful 
                label={locale === 'es' ? 'Reservar' : 'Book'} 
                onClick={handleBookNowClick}
                isLoading={isLoading}
              />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>
              {locale === 'es' ? 'Detalles de la Reserva' : 'Booking Details'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <BookingContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
} 