import { type Guide } from '@/types/guide';

export const guides: Guide[] = [
  {
    id: 'henri-gomez',
    name: 'Henri Gomez',
    role: {
      en: 'Integration Specialist',
      es: 'Especialista en Integración'
    },
    bio: {
      en: 'Henri specializes in helping participants integrate their experiences into daily life, with a background in psychology and traditional practices.',
      es: 'Henri se especializa en ayudar a los participantes a integrar sus experiencias en la vida diaria, con experiencia en psicología y prácticas tradicionales.'
    },
    image: '/images/guides/henri.jpg',
    specialties: ['integration', 'psychology', 'traditional-practices'],
    languages: ['Spanish', 'English'],
    certifications: [
      'Certified Integration Specialist',
      'Traditional Medicine Practitioner'
    ]
  }
  // Additional guides can be added here
]; 