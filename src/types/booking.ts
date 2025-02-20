import { type Locale } from './i18n';

export interface CeremonyExtra {
  id: string;
  title: {
    [key in Locale]: string;
  };
  description: {
    [key in Locale]: string;
  };
  price: {
    amount: number;
    currency: string;
  };
}

export interface BookingState {
  selectedExtras: string[];
  totalPrice: number;
  discountApplied: boolean;
}

export interface CeremonyBookingCardProps {
  basePrice: number;
  currency: string;
  capacity: {
    total: number;
    available: number;
  };
  extras: CeremonyExtra[];
  locale: Locale;
  ceremonyId: string;
  ceremonyDetails: {
    title: string;
    date: string;
    time: string;
  };
}

export interface BookingData {
  // Attendee Details
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  age: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  // Medical Info
  hasMedicalConditions: boolean;
  medicalConditionsDetails?: string;
  hasMedications: boolean;
  medicationsDetails?: string;
  hasAllergies: boolean;
  allergiesDetails?: string;
  hasDietaryRestrictions: boolean;
  dietaryRestrictionsDetails?: string;
  medicalNotes?: string;

  // Payment Info
  paymentMethod: 'transfer';
  paymentStatus: 'pending' | 'pending_verification' | 'verified' | 'completed';
  transferDetails?: {
    transferDate?: string;
    transferAmount?: string;
  };

  // Communication and Privacy
  communicationPreferences: {
    whatsappPreparation: boolean;
    marketingConsent: boolean;
  };
  privacyAccepted: boolean;
  termsAccepted: boolean;

  // Metadata
  bookingReference?: string;
  bookingDate: string;
  lastUpdated: string;
  status: 'active' | 'cancelled' | 'completed';
  previousBookings?: string[]; // Array of previous booking references
  discountEligible?: boolean;
} 