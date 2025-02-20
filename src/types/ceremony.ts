export type CeremonyType = 'ayahuasca' | 'holistic-networking';

interface LocalizedContent {
  en: string;
  es: string;
}

export interface Ceremony {
  id: string;
  type: CeremonyType;
  title: LocalizedContent;
  date: string;
  time: string;
  image: string;
  description: LocalizedContent;
  location: string;
  price: string;
  capacity: number;
  spotsLeft: number;
  status: 'upcoming' | 'full' | 'cancelled';
  link: string;
} 