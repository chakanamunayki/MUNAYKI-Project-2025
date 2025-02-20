export type EventCategory = 'meditation' | 'ceremony' | 'meal' | 'preparation' | 'integration';

export interface TimelineEvent {
  id: string;
  time: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  isOptional: boolean;
  price?: {
    amount: number;
    currency: string;
  };
  hasMoreDetails?: boolean;
  order: number;
  category: EventCategory;
  duration: string;
  location?: {
    name: string;
    indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  };
  facilitators?: {
    name: string;
    role: string;
    image: string;
  }[];
  preparation?: {
    items: string[];
    instructions: string;
  };
  media?: {
    previewImage?: string;
  };
}

export interface CeremonySchedule {
  title: {
    en: string;
    es: string;
  };
  subtitle: {
    en: string;
    es: string;
  };
  events: TimelineEvent[];
} 