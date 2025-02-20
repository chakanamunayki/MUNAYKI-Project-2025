import { CeremonySection } from '../schemas/ceremony.schema';
import { LocalizedString } from './base';

// Base props that all ceremony components will share
export interface BaseCeremonyProps {
  locale: 'en' | 'es';
  className?: string;
}

// Props for the ceremony hero section
export interface CeremonyHeroProps extends BaseCeremonyProps {
  data: CeremonySection['hero'];
}

// Props for the about section
export interface CeremonyAboutProps extends BaseCeremonyProps {
  data: CeremonySection['about'];
}

// Props for the benefits section
export interface CeremonyBenefitsProps extends BaseCeremonyProps {
  data: CeremonySection['benefits'];
}

// Props for the preparation section
export interface CeremonyPreparationProps extends BaseCeremonyProps {
  data: CeremonySection['preparation'];
}

// Props for the schedule section
export interface CeremonyScheduleProps extends BaseCeremonyProps {
  data: CeremonySection['schedule'];
}

// Props for the guides section
export interface CeremonyGuidesProps extends BaseCeremonyProps {
  data: CeremonySection['guides'];
}

// Props for the extra services section
export interface CeremonyExtraServicesProps extends BaseCeremonyProps {
  data: CeremonySection['extraServices'];
}

// Props for the venue section
export interface CeremonyVenueProps extends BaseCeremonyProps {
  data: CeremonySection['venue'];
}

// Props for the gallery section
export interface CeremonyGalleryProps extends BaseCeremonyProps {
  data: CeremonySection['gallery'];
}

// Props for the reviews section
export interface CeremonyReviewsProps extends BaseCeremonyProps {
  data: CeremonySection['reviews'];
}

// Props for the FAQ section
export interface CeremonyFAQProps extends BaseCeremonyProps {
  data: CeremonySection['faq'];
}

// Props for the location section
export interface CeremonyLocationProps extends BaseCeremonyProps {
  data: CeremonySection['location'];
}

// Props for the full ceremony detail page
export interface CeremonyDetailProps extends BaseCeremonyProps {
  data: CeremonySection;
} 