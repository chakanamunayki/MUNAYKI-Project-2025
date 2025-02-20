'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/hooks/use-booking-store';
import type { BookingData } from '@/types/booking';

const attendeeSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is too short'),
  gender: z.enum(['male', 'female']),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return age >= 18 && age <= 120;
  }, 'Age must be between 18 and 120'),
  emergencyContact: z.object({
    name: z.string().min(2, 'Name is too short'),
    phone: z.string().min(10, 'Phone number is too short'),
    relationship: z.string().min(2, 'Relationship is too short'),
  }),
});

interface AttendeeDetailsProps {
  locale: string;
  defaultValues?: Partial<BookingData>;
  onSubmit: () => void;
}

export function AttendeeDetails({ locale, defaultValues, onSubmit }: AttendeeDetailsProps) {
  const { updateBookingData } = useBookingStore();

  const form = useForm<z.infer<typeof attendeeSchema>>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: defaultValues || {
      fullName: '',
      email: '',
      phone: '',
      gender: 'male',
      age: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: '',
      },
    },
  });

  const handleSubmit = (data: z.infer<typeof attendeeSchema>) => {
    updateBookingData(data);
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleSubmit)(e);
      }} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === 'es' ? 'Nombre Completo' : 'Full Name'}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === 'es' ? 'Correo Electrónico' : 'Email'}</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === 'es' ? 'Teléfono' : 'Phone'}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === 'es' ? 'Género' : 'Gender'}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Masculino' : 'Male'}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {locale === 'es' ? 'Femenino' : 'Female'}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locale === 'es' ? 'Edad' : 'Age'}</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="18" max="120" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {locale === 'es' ? 'Contacto de Emergencia' : 'Emergency Contact'}
          </h3>
          
          <FormField
            control={form.control}
            name="emergencyContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale === 'es' ? 'Nombre' : 'Name'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale === 'es' ? 'Teléfono' : 'Phone'}</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContact.relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale === 'es' ? 'Relación' : 'Relationship'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit">
            {locale === 'es' ? 'Siguiente' : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 