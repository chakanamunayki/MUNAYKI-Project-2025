'use client';

import React from 'react';
import { type Locale } from '@/types/i18n';
import { Loader2 } from 'lucide-react';
import { BookingProvider } from '@/contexts/booking-context';
import { PersonalInfoStep } from './personal-info-step';
import { AdditionalParticipantsStep } from './additional-participants-step';
import { PaymentInfoStep } from './payment-info-step';
import { StepIndicator } from './step-indicator';
import { useBooking } from '@/contexts/booking-context';

interface MultiBookingFormContentProps {
  isGroupBookingEnabled?: boolean;
}

function MultiBookingFormContent({
  isGroupBookingEnabled = true,
}: MultiBookingFormContentProps) {
  const {
    currentStep,
    isGroupBooking,
    locale,
    isSubmitting
  } = useBooking();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Add StepIndicator component */}
      <StepIndicator 
        currentStep={currentStep}
        isGroupBooking={isGroupBooking}
        locale={locale}
      />
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-card shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium">
              {locale === 'es' ? 'Guardando tu reserva...' : 'Saving your booking...'}
            </p>
          </div>
        </div>
      )}
      
      {currentStep === 'personal-info' && (
        <PersonalInfoStep isGroupBookingEnabled={isGroupBookingEnabled} />
      )}
      {currentStep === 'additional-participants' && (
        <AdditionalParticipantsStep maxParticipants={10} />
      )}
      {currentStep === 'payment-info' && (
        <PaymentInfoStep 
          depositPercentage={0.5}
          groupDiscountRate={0.1}
        />
      )}
    </div>
  );
}

interface MultiBookingFormV2Props {
  locale: Locale;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime?: string;
  eventPrice: string;
  eventCurrency: string;
  eventLocation: string;
  eventImage?: string;
  userId: string;
  userEmail: string;
  isGroupBookingEnabled?: boolean;
  groupDiscountRate?: number;
  depositPercentage?: number;
}

export function MultiBookingFormV2({ 
  locale, 
  eventId,
  eventName,
  eventDate,
  eventTime,
  eventPrice,
  eventCurrency,
  eventLocation,
  eventImage,
  userId,
  userEmail,
  isGroupBookingEnabled = true,
  groupDiscountRate = 0.1,
  depositPercentage = 0.5,
}: MultiBookingFormV2Props) {
  return (
    <BookingProvider
      eventId={eventId}
      locale={locale}
      userEmail={userEmail}
      isGroupBookingEnabled={isGroupBookingEnabled}
      eventPrice={eventPrice}
      eventCurrency={eventCurrency}
      eventName={eventName}
      eventDate={eventDate}
      eventTime={eventTime}
      eventLocation={eventLocation}
      eventImage={eventImage}
      userId={userId}
      groupDiscountRate={groupDiscountRate}
      depositPercentage={depositPercentage}
    >
      <MultiBookingFormContent isGroupBookingEnabled={isGroupBookingEnabled} />
    </BookingProvider>
  );
} 