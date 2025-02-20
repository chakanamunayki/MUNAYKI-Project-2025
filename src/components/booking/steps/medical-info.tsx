'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBookingStore } from '@/hooks/use-booking-store';
import type { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';

const medicalSchema = z.object({
  hasMedicalConditions: z.enum(['true', 'false']).transform(val => val === 'true'),
  medicalConditionsDetails: z.string().min(0),
  hasMedications: z.enum(['true', 'false']).transform(val => val === 'true'),
  medicationsDetails: z.string().min(0),
  hasAllergies: z.enum(['true', 'false']).transform(val => val === 'true'),
  allergiesDetails: z.string().min(0),
  hasDietaryRestrictions: z.enum(['true', 'false']).transform(val => val === 'true'),
  dietaryRestrictionsDetails: z.string().min(0),
  medicalNotes: z.string().min(0),
}).refine((data) => {
  if (data.hasMedicalConditions && !data.medicalConditionsDetails) {
    return false;
  }
  if (data.hasMedications && !data.medicationsDetails) {
    return false;
  }
  if (data.hasAllergies && !data.allergiesDetails) {
    return false;
  }
  if (data.hasDietaryRestrictions && !data.dietaryRestrictionsDetails) {
    return false;
  }
  return true;
}, {
  message: "Please provide details where required",
});

type MedicalFormData = z.infer<typeof medicalSchema>;

interface MedicalInfoProps {
  locale: string;
  defaultValues?: Partial<BookingData>;
  onSubmit: () => void;
  onBack: () => void;
}

export function MedicalInfo({ locale, defaultValues, onSubmit, onBack }: MedicalInfoProps) {
  const { updateBookingData } = useBookingStore();

  const form = useForm<MedicalFormData>({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      hasMedicalConditions: 'false',
      medicalConditionsDetails: '',
      hasMedications: 'false',
      medicationsDetails: '',
      hasAllergies: 'false',
      allergiesDetails: '',
      hasDietaryRestrictions: 'false',
      dietaryRestrictionsDetails: '',
      medicalNotes: '',
    },
  });

  const handleSubmit = async (data: MedicalFormData) => {
    console.log('Form data before submission:', data);
    updateBookingData({
      hasMedicalConditions: data.hasMedicalConditions,
      medicalConditionsDetails: data.medicalConditionsDetails,
      hasMedications: data.hasMedications,
      medicationsDetails: data.medicationsDetails,
      hasAllergies: data.hasAllergies,
      allergiesDetails: data.allergiesDetails,
      hasDietaryRestrictions: data.hasDietaryRestrictions,
      dietaryRestrictionsDetails: data.dietaryRestrictionsDetails,
      medicalNotes: data.medicalNotes,
    });
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="hasMedicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === 'es' ? '¿Tiene alguna condición médica?' : 'Do you have any medical conditions?'}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Sí' : 'Yes'}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'No' : 'No'}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('hasMedicalConditions') === 'true' && (
          <FormField
            control={form.control}
            name="medicalConditionsDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === 'es' ? 'Por favor, describa sus condiciones médicas' : 'Please describe your medical conditions'}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="hasMedications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === 'es' ? '¿Toma algún medicamento?' : 'Are you taking any medications?'}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Sí' : 'Yes'}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'No' : 'No'}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('hasMedications') === 'true' && (
          <FormField
            control={form.control}
            name="medicationsDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === 'es' ? 'Por favor, liste sus medicamentos' : 'Please list your medications'}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="hasAllergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === 'es' ? '¿Tiene alguna alergia?' : 'Do you have any allergies?'}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Sí' : 'Yes'}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'No' : 'No'}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('hasAllergies') === 'true' && (
          <FormField
            control={form.control}
            name="allergiesDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === 'es' ? 'Por favor, describa sus alergias' : 'Please describe your allergies'}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="hasDietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === 'es' ? '¿Tiene restricciones dietéticas?' : 'Do you have any dietary restrictions?'}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Sí' : 'Yes'}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'No' : 'No'}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('hasDietaryRestrictions') === 'true' && (
          <FormField
            control={form.control}
            name="dietaryRestrictionsDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {locale === 'es' ? 'Por favor, describa sus restricciones dietéticas' : 'Please describe your dietary restrictions'}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="medicalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {locale === 'es' ? 'Notas médicas adicionales (opcional)' : 'Additional medical notes (optional)'}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            {locale === 'es' ? 'Anterior' : 'Back'}
          </Button>
          <Button type="submit">
            {locale === 'es' ? 'Siguiente' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 