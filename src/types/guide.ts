import { type LocalizedString } from './i18n';

export interface Guide {
  id: string;
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  image: string;
  specialties?: string[];
  languages?: string[];
  certifications?: string[];
} 