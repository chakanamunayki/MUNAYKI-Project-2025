'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Locale } from '@/types/i18n';
import { type Participant } from '@/types/booking';
import { type BookingStep } from '@/components/booking/step-indicator';

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  preferredLanguage: string;
  specialRequirements: string;
  emergencyContact: string;
  paymentMethod: string;
  whatsappNumber: string;
  isGroupBooking: boolean;
  eventPrice?: string;
  eventCurrency?: string;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventImage?: string;
  userId?: string;
}

interface BookingContextProps {
  eventId: string;
  locale: Locale;
  formData: BookingFormData;
  currentStep: BookingStep;
  isGroupBooking: boolean;
  additionalParticipants: Participant[];
  isSubmitting: boolean;
  
  // Additional props
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventImage?: string;
  userId?: string;
  groupDiscountRate?: number;
  depositPercentage?: number;
  
  // Methods
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<BookingStep>>;
  setIsGroupBooking: React.Dispatch<React.SetStateAction<boolean>>;
  setAdditionalParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Helper methods
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleGroupBookingChange: (checked: boolean) => void;
  handleRadioChange: (value: string) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  validateCurrentStep: () => boolean;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export interface BookingProviderProps {
  children: React.ReactNode;
  eventId: string;
  locale: Locale;
  userEmail?: string;
  isGroupBookingEnabled?: boolean;
  eventPrice?: string;
  eventCurrency?: string;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventImage?: string;
  userId?: string;
  groupDiscountRate?: number;
  depositPercentage?: number;
}

export function BookingProvider({
  children,
  eventId,
  locale,
  userEmail = '',
  isGroupBookingEnabled = true,
  eventPrice = '',
  eventCurrency = 'COP',
  eventName = '',
  eventDate = '',
  eventTime = '',
  eventLocation = '',
  eventImage = '',
  userId = '',
  groupDiscountRate = 0.1,
  depositPercentage = 0.5,
}: BookingProviderProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('personal-info');
  const [isGroupBooking, setIsGroupBooking] = useState(false);
  const [additionalParticipants, setAdditionalParticipants] = useState<Participant[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: userEmail || '',
    phone: '',
    age: '',
    preferredLanguage: locale,
    specialRequirements: '',
    emergencyContact: '',
    paymentMethod: 'bank-transfer',
    whatsappNumber: '',
    isGroupBooking: false,
    eventPrice,
    eventCurrency,
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    userId,
  });

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem(`booking_form_${eventId}`);
    const savedAdditionalParticipants = localStorage.getItem(`booking_participants_${eventId}`);
    const savedStep = localStorage.getItem(`booking_step_${eventId}`);
    const savedIsGroupBooking = localStorage.getItem(`booking_is_group_${eventId}`);
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
    
    if (savedAdditionalParticipants) {
      try {
        const parsedParticipants = JSON.parse(savedAdditionalParticipants);
        setAdditionalParticipants(parsedParticipants);
      } catch (e) {
        console.error('Error parsing saved participants data:', e);
      }
    }
    
    if (savedIsGroupBooking) {
      try {
        const isGroup = JSON.parse(savedIsGroupBooking);
        setIsGroupBooking(isGroup);
      } catch (e) {
        console.error('Error parsing saved group booking status:', e);
      }
    }
    
    if (savedStep) {
      try {
        const step = savedStep as BookingStep;
        if (step === 'personal-info' || step === 'additional-participants' || step === 'payment-info') {
          setCurrentStep(step);
        }
      } catch (e) {
        console.error('Error parsing saved step:', e);
      }
    }
  }, [eventId]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`booking_form_${eventId}`, JSON.stringify(formData));
    localStorage.setItem(`booking_is_group_${eventId}`, JSON.stringify(isGroupBooking));
  }, [formData, isGroupBooking, eventId]);

  // Save additional participants to localStorage whenever they change
  useEffect(() => {
    if (additionalParticipants.length > 0) {
      localStorage.setItem(`booking_participants_${eventId}`, JSON.stringify(additionalParticipants));
    }
  }, [additionalParticipants, eventId]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`booking_step_${eventId}`, currentStep);
  }, [currentStep, eventId]);

  // Update WhatsApp number when phone number changes
  useEffect(() => {
    if (formData.phone && !formData.whatsappNumber) {
      setFormData(prev => ({ ...prev, whatsappNumber: formData.phone }));
    }
  }, [formData.phone]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleGroupBookingChange = (checked: boolean) => {
    console.log('Group booking changed to:', checked);
    setIsGroupBooking(checked);
    setFormData(prev => ({ ...prev, isGroupBooking: checked }));
    
    // If unchecking group booking, clear additional participants
    if (!checked) {
      setAdditionalParticipants([]);
    }
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep === 'personal-info') {
      // Validate personal info
      if (!formData.fullName || !formData.email || !formData.phone || !formData.age) {
        alert(locale === 'es' 
          ? 'Por favor completa todos los campos obligatorios' 
          : 'Please fill in all required fields');
        return false;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert(locale === 'es'
          ? 'Por favor ingresa un correo electrónico válido'
          : 'Please enter a valid email address');
        return false;
      }
      
      return true;
    }
    
    if (currentStep === 'additional-participants') {
      // ALWAYS RETURN TRUE FOR ADDITIONAL PARTICIPANTS
      // This bypasses all validation
      console.log('Bypassing validation for additional participants');
      return true;
    }
    
    if (currentStep === 'payment-info') {
      // Validate payment info
      if (!formData.whatsappNumber) {
        alert(locale === 'es'
          ? 'Por favor ingresa tu número de WhatsApp para enviar el comprobante de pago'
          : 'Please enter your WhatsApp number to send the payment proof');
        return false;
      }
      
      return true;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 'personal-info') {
      if (!validateCurrentStep()) {
        return;
      }
      
      // Log the current state to debug
      console.log('Current isGroupBooking state:', isGroupBooking);
      console.log('Current formData.isGroupBooking state:', formData.isGroupBooking);
      
      // Use either state value to determine the next step
      const goToGroupBooking = isGroupBooking || formData.isGroupBooking;
      
      if (goToGroupBooking && isGroupBookingEnabled) {
        setCurrentStep('additional-participants');
      } else {
        setCurrentStep('payment-info');
      }
    } else if (currentStep === 'additional-participants') {
      // BYPASS VALIDATION COMPLETELY FOR ADDITIONAL PARTICIPANTS
      // Just go to the next step
      setCurrentStep('payment-info');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'additional-participants') {
      setCurrentStep('personal-info');
    } else if (currentStep === 'payment-info') {
      if (isGroupBooking && isGroupBookingEnabled) {
        setCurrentStep('additional-participants');
      } else {
        setCurrentStep('personal-info');
      }
    }
  };

  const value = {
    eventId,
    locale,
    formData,
    currentStep,
    isGroupBooking,
    additionalParticipants,
    isSubmitting,
    
    // Additional props
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    userId,
    groupDiscountRate,
    depositPercentage,
    
    // Methods
    setFormData,
    setCurrentStep,
    setIsGroupBooking,
    setAdditionalParticipants,
    setIsSubmitting,
    
    // Helper methods
    handleInputChange,
    handleGroupBookingChange,
    handleRadioChange,
    handleNextStep,
    handlePreviousStep,
    validateCurrentStep,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
} 