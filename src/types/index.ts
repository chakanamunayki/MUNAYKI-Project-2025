export type CeremonyType = 
  | 'ayahuasca' 
  | 'holistic-networking'
  | 'wim-hof'
  | 'women-circle'
  | 'meditation';

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

export interface CeremoniesData {
  ceremonies: Ceremony[];
} 