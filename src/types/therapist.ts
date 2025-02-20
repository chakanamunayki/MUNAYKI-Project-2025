export type TherapyType = 
  | 'reiki'
  | 'sanacion-energetica'
  | 'meditacion'
  | 'acupuntura'
  | 'masaje'
  | 'respiracion'
  | 'sanacion-sonora'
  | 'yoga'
  | 'ayahuasca'
  | 'integracion'
  | 'medicina-ancestral';

export type AppointmentType = 'virtual' | 'presencial' | 'both';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface Service {
  id: string;
  name: LocalizedString;
  duration: string;
  price: string;
  description: LocalizedString;
}

export interface Testimonial {
  id: string;
  content: LocalizedString;
  author: string;
  rating: number;
}

export interface PressArticle {
  title: LocalizedString;
  source: string;
  url: string;
  date: string;
}

export interface Experience {
  years: number;
  highlights: LocalizedString[];
}

export interface Location {
  id: string;
  type: 'physical' | 'virtual';
  name: LocalizedString;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  operatingHours: Record<string, {
    open: string;
    close: string;
  }>;
  availableServices: string[];
  facilities?: string[];
  virtualPlatform?: string;
  virtualMeetingInfo?: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: LocalizedString;
  image: string;
  specializations: TherapyType[];
  bio: LocalizedString;
  experience: Experience;
  methodology: LocalizedString;
  services: Service[];
  languages: string[];
  certifications: string[];
  availability: {
    days: string[];
    hours: string;
  };
  rating: number;
  reviewCount: number;
  location: string;
  link: string;
  appointmentType: AppointmentType;
  testimonials?: Testimonial[];
  press?: PressArticle[];
  locations: Location[];
} 