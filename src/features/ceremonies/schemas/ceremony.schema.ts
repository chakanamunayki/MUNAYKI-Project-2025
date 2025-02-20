import { z } from 'zod';
import {
  LocalizedStringSchema,
  ImageWithCaptionSchema,
  CoordinatesSchema,
  ReviewSchema,
} from '../types/base';

// Define the structure for ceremony sections
export const CeremonySectionSchema = z.object({
  hero: z.object({
    title: LocalizedStringSchema,
    subtitle: LocalizedStringSchema,
    mainImage: z.string().url(),
    date: z.date(),
    location: LocalizedStringSchema,
    price: z.number().positive(),
  }),

  about: z.object({
    description: LocalizedStringSchema,
    included: z.array(LocalizedStringSchema),
    highlights: z.array(LocalizedStringSchema),
  }),

  benefits: z.object({
    items: z.array(z.object({
      title: LocalizedStringSchema,
      description: LocalizedStringSchema,
      icon: z.string(),
    })),
  }),

  preparation: z.object({
    guidelines: z.array(LocalizedStringSchema),
    requirements: z.array(LocalizedStringSchema),
    recommendations: z.array(LocalizedStringSchema),
  }),

  schedule: z.object({
    timeline: z.array(z.object({
      time: z.string(),
      activity: LocalizedStringSchema,
      description: LocalizedStringSchema,
    })),
  }),

  guides: z.object({
    facilitators: z.array(z.object({
      name: z.string(),
      role: LocalizedStringSchema,
      bio: LocalizedStringSchema,
      image: z.string().url(),
    })),
  }),

  extraServices: z.object({
    services: z.array(z.object({
      title: LocalizedStringSchema,
      description: LocalizedStringSchema,
      price: z.number().positive(),
      image: z.string().url().optional(),
    })),
  }),

  venue: z.object({
    name: z.string(),
    description: LocalizedStringSchema,
    amenities: z.array(LocalizedStringSchema),
    images: z.array(z.string().url()),
  }),

  gallery: z.object({
    images: z.array(ImageWithCaptionSchema),
  }),

  reviews: z.object({
    testimonials: z.array(ReviewSchema),
  }),

  faq: z.object({
    questions: z.array(z.object({
      question: LocalizedStringSchema,
      answer: LocalizedStringSchema,
    })),
  }),

  location: z.object({
    address: LocalizedStringSchema,
    coordinates: CoordinatesSchema,
    directions: LocalizedStringSchema,
  }),
});

export type CeremonySection = z.infer<typeof CeremonySectionSchema>; 