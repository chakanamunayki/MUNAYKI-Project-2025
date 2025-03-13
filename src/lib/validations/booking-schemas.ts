import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{1,4}\)?[\s.-]?\d{1,5}[\s.-]?\d{1,9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Base schema for personal information
export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name must be less than 100 characters' }),
  
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  
  phone: z.string()
    .min(7, { message: 'Phone number must be at least 7 characters' })
    .regex(phoneRegex, { message: 'Please enter a valid phone number' }),
  
  age: z.string()
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 120;
    }, { message: 'Age must be between 18 and 120' }),
  
  preferredLanguage: z.enum(['en', 'es'], {
    required_error: 'Please select a language',
    invalid_type_error: 'Please select a valid language',
  }),
  
  specialRequirements: z.string().optional(),
  emergencyContact: z.string().optional(),
  isGroupBooking: z.boolean().optional(),
});

// Schema for additional participant
export const participantSchema = z.object({
  fullName: z.string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name must be less than 100 characters' }),
  
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  
  phone: z.string().optional(),
  age: z.string().optional(),
  specialRequirements: z.string().optional(),
});

// Schema for payment information
export const paymentInfoSchema = z.object({
  whatsappNumber: z.string()
    .min(7, { message: 'WhatsApp number must be at least 7 characters' })
    .regex(phoneRegex, { message: 'Please enter a valid WhatsApp number' }),
  
  paymentMethod: z.enum(['bank-transfer', 'nequi'], {
    required_error: 'Please select a payment method',
    invalid_type_error: 'Please select a valid payment method',
  }),
});

// Complete booking schema
export const completeBookingSchema = personalInfoSchema.extend({
  additionalParticipants: z.array(participantSchema).optional(),
  ...paymentInfoSchema.shape,
});

// Type definitions based on schemas
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ParticipantFormData = z.infer<typeof participantSchema>;
export type PaymentInfoFormData = z.infer<typeof paymentInfoSchema>;
export type CompleteBookingFormData = z.infer<typeof completeBookingSchema>; 