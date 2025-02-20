import { z } from 'zod';

// Base type for localized strings
export const LocalizedStringSchema = z.object({
  en: z.string(),
  es: z.string(),
});

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;

// Base type for images with captions
export const ImageWithCaptionSchema = z.object({
  url: z.string().url(),
  caption: LocalizedStringSchema,
});

export type ImageWithCaption = z.infer<typeof ImageWithCaptionSchema>;

// Base type for location coordinates
export const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type Coordinates = z.infer<typeof CoordinatesSchema>;

// Base type for reviews/ratings
export const ReviewSchema = z.object({
  author: z.string(),
  content: LocalizedStringSchema,
  rating: z.number().min(1).max(5),
  date: z.date(),
});

export type Review = z.infer<typeof ReviewSchema>; 