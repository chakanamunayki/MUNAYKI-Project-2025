'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useBookingStore } from '@/hooks/use-booking-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { generateBookingReference } from '@/lib/utils';
import { useState } from 'react';

const paymentSchema = z.object({
  justPaid: z.boolean().default(false),
  sendPreparationToWhatsapp: z.boolean().default(false),
  acceptedTerms: z.boolean().refine((val) => val, {
    message: 'You must accept the terms to continue',
  }),
  privacyAccepted: z.boolean().refine((val) => val, {
    message: 'You must accept the privacy policy to continue',
  }),
  marketingConsent: z.boolean().default(false),
});

interface PaymentDetailsProps {
  locale: string;
  totalAmount: number;
  currency: string;
  onSubmit: () => void;
  onBack: () => void;
}

export function PaymentDetails({ locale, totalAmount, currency, onSubmit, onBack }: PaymentDetailsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { updateBookingData, bookingData: existingBookingData } = useBookingStore();
  const depositAmount = totalAmount * 0.5;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      justPaid: false,
      sendPreparationToWhatsapp: false,
      acceptedTerms: false,
      privacyAccepted: false,
      marketingConsent: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof paymentSchema>) => {
    try {
      setIsLoading(true);

      const now = new Date().toISOString();
      const bookingReference = generateBookingReference(user?.name || 'guest');

      // Prepare booking data
      const bookingData = {
        ...existingBookingData,
        paymentMethod: 'transfer' as const,
        paymentStatus: data.justPaid ? 'pending_verification' : 'pending',
        communicationPreferences: {
          whatsappPreparation: data.sendPreparationToWhatsapp,
          marketingConsent: data.marketingConsent,
        },
        privacyAccepted: data.privacyAccepted,
        termsAccepted: data.acceptedTerms,
        bookingDate: now,
        lastUpdated: now,
        status: 'active' as const,
        bookingReference,
        userId: user?.id,
      };

      // Save booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData,
          totalAmount,
          currency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save booking');
      }

      const { bookingReference: newBookingRef } = await response.json();

      // Redirect to dashboard with success message
      router.push(`/${locale}/dashboard?booking=${newBookingRef}`);
    } catch (error) {
      console.error('Error saving booking:', error);
      setError(error instanceof Error ? error.message : 'Failed to save booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(handleSubmit)(e);
      }} className="space-y-6">
        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'es' ? 'Resumen de Pago' : 'Payment Summary'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {locale === 'es' ? 'Total' : 'Total Amount'}
              </span>
              <span>
                {new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
                  style: 'currency',
                  currency,
                }).format(totalAmount)}
              </span>
            </div>
            
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">
                {locale === 'es' ? 'Depósito Requerido (50%)' : 'Required Deposit (50%)'}
              </span>
              <span className="text-primary">
                {new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
                  style: 'currency',
                  currency,
                }).format(depositAmount)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {locale === 'es' ? 'Pago Restante (En el día)' : 'Remaining Payment (On ceremony day)'}
              </span>
              <span>
                {new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
                  style: 'currency',
                  currency,
                }).format(depositAmount)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'es' ? 'Instrucciones de Pago' : 'Payment Instructions'}
            </CardTitle>
            <CardDescription>
              {locale === 'es'
                ? 'Realiza el pago del 50% para asegurar tu lugar'
                : 'Make the 50% payment to secure your spot'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium">
                  {locale === 'es' ? 'Detalles de la Cuenta' : 'Account Details'}:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>{locale === 'es' ? 'Banco: Bancolombia' : 'Bank: Bancolombia'}</li>
                  <li>{locale === 'es' ? 'Cuenta: XXXX XXXX XXXX' : 'Account: XXXX XXXX XXXX'}</li>
                  <li>{locale === 'es' ? 'Titular: XXXXX' : 'Account Holder: XXXXX'}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Nequi:</p>
                <p className="text-muted-foreground">XXX XXX XXXX</p>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium mb-2">
                  {locale === 'es' 
                    ? 'Importante: Después de realizar el pago'
                    : 'Important: After making the payment'}:
                </p>
                <p>
                  {locale === 'es'
                    ? 'Envía el comprobante de pago al número: XX XXX XXX'
                    : 'Send proof of payment to the number: XX XXX XXX'}
                </p>
              </div>

              <FormField
                control={form.control}
                name="justPaid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {locale === 'es'
                          ? 'Acabo de realizar el pago por Nequi'
                          : 'I have just made the payment via Nequi'}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'es' ? 'Preferencias de Comunicación' : 'Communication Preferences'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="sendPreparationToWhatsapp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {locale === 'es'
                        ? '¿Deseas recibir los detalles de preparación por WhatsApp?'
                        : 'Would you like to receive preparation details via WhatsApp?'}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Special Offers */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <CardHeader>
            <CardTitle>
              {locale === 'es' ? 'Ofertas Especiales' : 'Special Offers'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="rounded-lg bg-background/80 p-4">
                <h4 className="font-medium mb-2">
                  {locale === 'es' ? 'Terapia de Hielo Wim Hof' : 'Wim Hof Ice Therapy'}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {locale === 'es'
                    ? 'Descubre el poder del frío y fortalece tu sistema inmunológico'
                    : 'Discover the power of cold and strengthen your immune system'}
                </p>
                <p className="text-sm font-medium text-primary">
                  10% OFF
                </p>
              </div>

              <div className="rounded-lg bg-background/80 p-4">
                <h4 className="font-medium mb-2">
                  {locale === 'es' ? 'Acceso al Chatbot Holístico' : 'Access to Holistic Chatbot'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {locale === 'es'
                    ? 'Obtén respuestas a tus preguntas sobre bienestar y crecimiento personal'
                    : 'Get answers to your questions about wellness and personal growth'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Terms */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'es' ? 'Privacidad y Términos' : 'Privacy & Terms'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="privacyAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {locale === 'es'
                        ? 'He leído y acepto la política de privacidad. Entiendo que mis datos personales serán tratados de acuerdo con la política de privacidad y no serán compartidos con terceros.'
                        : 'I have read and accept the privacy policy. I understand that my personal data will be processed according to the privacy policy and will not be shared with third parties.'}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {locale === 'es'
                        ? 'Me gustaría recibir información sobre ofertas especiales y eventos futuros (opcional)'
                        : 'I would like to receive information about special offers and future events (optional)'}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Terms Acceptance */}
        <FormField
          control={form.control}
          name="acceptedTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {locale === 'es'
                    ? 'Entiendo que el pago restante debe realizarse el día de la ceremonia y que mi lugar no estará asegurado hasta que se complete el pago total'
                    : 'I understand that the remaining payment must be made on the ceremony day and that my spot is not secured until full payment is completed'}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            {locale === 'es' ? 'Anterior' : 'Back'}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : (locale === 'es' ? 'Completar Reserva' : 'Complete Booking')}
          </Button>
        </div>
      </form>
    </Form>
  );
} 