'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/types/i18n';
import { AttendeeDetails } from './steps/attendee-details';
import { MedicalInfo } from './steps/medical-info';
import { Review } from './steps/review';
import { PaymentDetails } from './steps/payment-details';
import { generateBookingReference } from '@/lib/utils';
import { useBookingStore } from '@/hooks/use-booking-store';

interface BookingWizardProps {
  ceremonyId: string;
  locale: Locale;
  basePrice: number;
  currency: string;
  selectedExtras: Array<{
    id: string;
    title: string;
    price: {
      amount: number;
      currency: string;
    };
  }>;
  ceremonyDetails: {
    title: string;
    date: string;
    time: string;
  };
}

const steps = ['attendee-details', 'medical-info', 'review', 'payment-details'] as const;
type BookingStep = typeof steps[number];

export function BookingWizard({
  ceremonyId,
  locale,
  basePrice,
  currency,
  selectedExtras,
  ceremonyDetails
}: BookingWizardProps) {
  const router = useRouter();
  const { currentStep, setCurrentStep, bookingData, updateBookingData } = useBookingStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentStepIndex = steps.indexOf(currentStep as BookingStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!bookingData) return;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ceremonyId,
          bookingData,
          selectedExtras,
          totalAmount: basePrice + selectedExtras.reduce((total, extra) => total + extra.price.amount, 0),
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const bookingReference = generateBookingReference(bookingData.fullName);
      router.push(`/${locale}/bookings/${bookingReference}/confirmation`);
    } catch (error) {
      console.error('Booking failed:', error);
      // TODO: Show error message to user
    }
  };

  const totalAmount = basePrice + selectedExtras.reduce((total, extra) => total + extra.price.amount, 0);

  const renderStep = () => {
    switch (currentStep) {
      case 'attendee-details':
        return (
          <AttendeeDetails
            locale={locale}
            defaultValues={bookingData || undefined}
            onSubmit={handleNext}
          />
        );
      case 'medical-info':
        return (
          <MedicalInfo
            locale={locale}
            defaultValues={bookingData || undefined}
            onSubmit={handleNext}
            onBack={handlePrevious}
          />
        );
      case 'review':
        return (
          <Review
            locale={locale}
            bookingData={bookingData!}
            selectedExtras={selectedExtras.map(extra => extra.title)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'payment-details':
        return (
          <PaymentDetails
            locale={locale}
            totalAmount={totalAmount}
            currency={currency}
            onSubmit={handleSubmit}
            onBack={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {locale === 'es' ? 'Proceso de Reserva' : 'Booking Process'}
        </h2>
        <div className="text-sm text-muted-foreground">
          {locale === 'es' ? 'Paso' : 'Step'} {currentStepIndex + 1} {locale === 'es' ? 'de' : 'of'} {steps.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>
    </div>
  );
} 