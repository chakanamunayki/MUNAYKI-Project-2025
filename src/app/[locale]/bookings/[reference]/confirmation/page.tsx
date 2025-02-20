'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, CheckCircle2 } from 'lucide-react';
import { type Locale } from '@/types/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BookingConfirmationPageProps {
  params: {
    locale: Locale;
    reference: string;
  };
}

export default function BookingConfirmationPage({
  params: { locale, reference },
}: BookingConfirmationPageProps) {
  useEffect(() => {
    // Send confirmation email
    fetch('/api/bookings/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference }),
    });
  }, [reference]);

  return (
    <div className="container max-w-2xl py-12">
      <Card className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">
            {locale === 'es'
              ? '¡Reserva Registrada!'
              : 'Booking Registered!'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'es'
              ? 'Tu número de referencia es:'
              : 'Your reference number is:'}
          </p>
          <p className="font-mono text-lg font-medium">{reference}</p>
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>
            {locale === 'es'
              ? 'Próximos Pasos'
              : 'Next Steps'}
          </AlertTitle>
          <AlertDescription className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>
                {locale === 'es'
                  ? 'Realiza el pago del depósito (50%) usando los detalles bancarios proporcionados.'
                  : 'Make the deposit payment (50%) using the provided bank details.'}
              </li>
              <li>
                {locale === 'es'
                  ? 'Nuestro equipo verificará tu pago y te enviaremos un correo de confirmación.'
                  : 'Our team will verify your payment and send you a confirmation email.'}
              </li>
              <li>
                {locale === 'es'
                  ? 'El saldo restante se pagará el día de la ceremonia.'
                  : 'The remaining balance will be paid on the day of the ceremony.'}
              </li>
            </ol>
          </AlertDescription>
        </Alert>

        <Alert className="bg-primary/5 border-primary/10">
          <InfoIcon className="h-4 w-4 text-primary" />
          <AlertTitle>
            {locale === 'es'
              ? 'Importante'
              : 'Important'}
          </AlertTitle>
          <AlertDescription>
            {locale === 'es'
              ? 'Hemos enviado un correo electrónico con todos los detalles de tu reserva y la información de pago. Por favor revisa tu bandeja de entrada.'
              : 'We have sent an email with all your booking details and payment information. Please check your inbox.'}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center pt-4">
          <Link href={`/${locale}`}>
            <Button variant="outline">
              {locale === 'es'
                ? 'Volver al Inicio'
                : 'Back to Home'}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
} 