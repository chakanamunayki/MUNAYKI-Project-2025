'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, Users, Home, Calendar, MapPin, CreditCard, Clock, Phone } from 'lucide-react';
import { type Locale } from '@/types/i18n';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { BookingInfo, Participant } from '@/types/booking';
import { PaymentSummary } from '@/components/booking/payment-summary';
import { PaymentInstructions } from '@/components/booking/payment-instructions';
import { getLocaleParam } from '@/utils/route-params';
import { bookingService } from '@/services/booking-service';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

interface ConfirmationPageProps {
  params: {
    locale: Locale;
  };
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  // Use the useParams hook to get the locale
  const routeParams = useParams();
  const locale = (routeParams.locale as Locale) || params.locale;
  
  const router = useRouter();
  const { user, loading, checkAndRefreshSession } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient<Database>();
  
  useEffect(() => {
    console.log('ConfirmationPage - Initial render');
    
    // Redirect if not authenticated
    if (!loading && !user) {
      console.log('ConfirmationPage - No user, redirecting to login');
      router.push(`/${locale}/auth?redirect=booking-confirmation`);
      return;
    }

    // Get booking ID from localStorage
    const bookingId = localStorage.getItem('bookingId');
    
    if (!bookingId) {
      setError(locale === 'es' ? 'No se encontró información de reserva' : 'No booking information found');
      setIsLoading(false);
      return;
    }
    
    // Check if we need to automatically save a booking after re-authentication
    const pendingSaveId = sessionStorage.getItem('pendingBookingSave');
    const shouldAutoSave = pendingSaveId && bookingId === pendingSaveId && bookingId.startsWith('local-booking-');
    
    if (shouldAutoSave && user) {
      console.log('Auto-saving booking after re-authentication:', pendingSaveId);
      
      // We'll attempt to save the booking after the component has fully loaded
      const autoSaveBooking = async () => {
        try {
          // First, explicitly refresh the session to ensure we're authenticated
          console.log('Refreshing session before auto-saving booking...');
          const { isAuthenticated, error: sessionError } = await checkAndRefreshSession();
          
          if (sessionError || !isAuthenticated) {
            console.error('Session refresh failed during auto-save:', sessionError);
            setError(locale === 'es' 
              ? 'Error de autenticación. Por favor, inténtalo de nuevo.' 
              : 'Authentication error. Please try again.');
            return;
          }
          
          console.log('Session refreshed successfully, proceeding to auto-save booking...');
          
          // Now proceed with saving the booking
          const result = await bookingService.saveLocalBookingToDatabase(pendingSaveId);
          
          if (result.error) {
            const errorMessage = typeof result.error === 'object' && result.error !== null && 'message' in result.error 
              ? String(result.error.message) 
              : String(result.error);
            console.error('Error auto-saving booking:', errorMessage);
            setError(locale === 'es' 
              ? `Error al guardar la reserva: ${errorMessage}` 
              : `Error saving booking: ${errorMessage}`);
          } else {
            console.log('Booking auto-saved successfully:', result.data);
            
            // Clear the pending save flag
            sessionStorage.removeItem('pendingBookingSave');
            
            // Update the booking in state with the database version
            setBooking(result.data);
            
            // Show success message
            alert(locale === 'es'
              ? '¡Reserva guardada en la base de datos correctamente!'
              : 'Booking saved to database successfully!');
          }
        } catch (error) {
          console.error('Unexpected error during auto-save:', error);
          setError(locale === 'es' 
            ? 'Error inesperado al guardar la reserva' 
            : 'Unexpected error saving booking');
        }
      };
      
      // Load the booking first, then attempt to save it
      setTimeout(autoSaveBooking, 1000);
    }
    
    // Check if it's a local booking (fallback for RLS issues)
    if (bookingId.startsWith('local-booking-')) {
      console.log('Loading local booking from localStorage');
      try {
        // Get booking from localStorage
        const localBookingStr = localStorage.getItem(`booking_${bookingId}`);
        if (!localBookingStr) {
          throw new Error('Local booking not found');
        }
        
        const localBooking = JSON.parse(localBookingStr);
        
        // Get main participant
        const mainParticipantStr = localStorage.getItem(`participant_main_${bookingId}`);
        const mainParticipant = mainParticipantStr ? JSON.parse(mainParticipantStr) : null;
        
        // Get additional participants
        const additionalParticipantsStr = localStorage.getItem(`participants_additional_${bookingId}`);
        const additionalParticipants = additionalParticipantsStr ? JSON.parse(additionalParticipantsStr) : [];
        
        // Combine data
        const combinedBooking = {
          ...localBooking,
          participants: mainParticipant ? [mainParticipant, ...additionalParticipants] : additionalParticipants
        };
        
        setBooking(combinedBooking);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading local booking:', error);
        setError(locale === 'es' ? 'Error al cargar la reserva local' : 'Error loading local booking');
        setIsLoading(false);
      }
      return;
    }
    
    // Fetch booking details from Supabase
    bookingService.getBookingById(bookingId)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching booking:', error);
          
          // Try to load from localStorage as fallback
          try {
            const localBookingStr = localStorage.getItem(`booking_${bookingId}`);
            if (localBookingStr) {
              const localBooking = JSON.parse(localBookingStr);
              setBooking(localBooking);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error('Error loading fallback booking:', e);
          }
          
          setError(locale === 'es' ? 'Error al cargar la reserva' : 'Error loading booking');
          setIsLoading(false);
          return;
        }
        
        setBooking(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Unexpected error:', error);
        setError(locale === 'es' ? 'Error inesperado' : 'Unexpected error');
        setIsLoading(false);
      });
  }, [user, loading, locale, router]);
  
  if (loading || isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">{locale === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  if (error) {
    return (
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <Card className="shadow-md bg-card dark:bg-card/40">
          <CardContent className="pt-6 pb-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {locale === 'es' ? 'Error' : 'Error'}
              </h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => router.push(`/${locale}`)}>
                {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <Card className="shadow-md bg-card dark:bg-card/40">
          <CardContent className="pt-6 pb-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {locale === 'es' ? 'No se encontró la reserva' : 'Booking not found'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {locale === 'es' 
                  ? 'No pudimos encontrar los detalles de tu reserva.' 
                  : 'We could not find your booking details.'}
              </p>
              <Button onClick={() => router.push(`/${locale}`)}>
                {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Add a function to get WhatsApp link
  const getWhatsAppLink = (locale: Locale, bookingRef: string) => {
    const supportNumber = "+57 300 987 6543"; // This should match the number in the instructions
    const message = locale === 'es' 
      ? `Hola, estoy enviando el comprobante de pago para mi reserva con referencia: ${bookingRef}`
      : `Hello, I'm sending the payment proof for my booking with reference: ${bookingRef}`;
    
    return `https://wa.me/${supportNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg bg-card dark:bg-card/40 relative overflow-hidden border-t-4 border-t-primary">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 transform -translate-x-16 -translate-y-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 transform translate-x-16 translate-y-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full"></div>
        </div>
        
        <CardHeader className="pb-2 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-3xl font-bold">
            {locale === 'es' ? '¡Reserva Confirmada!' : 'Booking Confirmed!'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          {/* Booking Reference */}
          <div className="text-center mb-8">
            <div className="inline-block bg-muted/50 px-6 py-3 rounded-lg mb-2">
              <h3 className="text-sm text-muted-foreground mb-1">
                {locale === 'es' ? 'Referencia' : 'Reference'}
              </h3>
              <p className="text-xl font-mono font-semibold text-foreground">
                {booking.booking_reference || 'N/A'}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {locale === 'es' 
                ? 'Por favor guarda esta referencia para futuras consultas' 
                : 'Please save this reference for future inquiries'}
            </p>
          </div>
          
          <div className="grid gap-6 max-w-xl mx-auto">
            {/* Event Details */}
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50 shadow-sm">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-medium text-foreground">{booking.event_name}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(booking.event_date)}</p>
                  {booking.event_time && (
                    <p className="text-sm text-muted-foreground">{booking.event_time}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50 shadow-sm">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-medium text-foreground">
                    {locale === 'es' ? 'Ubicación' : 'Location'}
                  </h3>
                  <p className="text-sm text-muted-foreground">{booking.event_location}</p>
                </div>
              </div>
            </div>
            
            {/* Participants */}
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50 shadow-sm">
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-medium text-foreground">
                    {locale === 'es' ? 'Participantes' : 'Participants'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.total_participants} {locale === 'es' ? 'personas' : 'people'}
                  </p>
                  {booking.participants && booking.participants.length > 0 && (
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      {booking.participants.map((participant: any) => (
                        <li key={participant.id} className="flex items-center justify-between py-1 px-2 rounded-md bg-background/50">
                          <span>{participant.full_name}</span>
                          {participant.is_main_participant && (
                            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                              {locale === 'es' ? 'Principal' : 'Main'}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50 shadow-sm">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-medium text-foreground mb-2">
                    {locale === 'es' ? 'Detalles de Pago' : 'Payment Details'}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm py-1 border-b border-border/30">
                      <span className="text-muted-foreground">
                        {locale === 'es' ? 'Precio base' : 'Base price'}:
                      </span>
                      <span className="text-foreground font-medium">
                        {formatCurrency(booking.base_price, booking.event_currency)}
                      </span>
                    </div>
                    
                    {booking.has_group_discount && (
                      <div className="flex justify-between items-center text-sm py-1 border-b border-border/30">
                        <span className="text-muted-foreground">
                          {locale === 'es' ? 'Descuento grupal' : 'Group discount'}:
                        </span>
                        <span className="text-foreground font-medium text-green-600 dark:text-green-400">
                          -{formatCurrency(booking.discount_amount, booking.event_currency)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-sm py-1 border-b border-border/30">
                      <span className="text-muted-foreground">
                        {locale === 'es' ? 'Total' : 'Total'}:
                      </span>
                      <span className="text-foreground font-bold">
                        {formatCurrency(booking.total_amount, booking.event_currency)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-muted-foreground">
                        {locale === 'es' ? 'Depósito (50%)' : 'Deposit (50%)'}:
                      </span>
                      <span className="text-foreground font-medium">
                        {formatCurrency(booking.deposit_amount, booking.event_currency)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-100 dark:border-yellow-800/30">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center justify-between">
                      <span>{locale === 'es' ? 'Estado de pago' : 'Payment status'}:</span>
                      <span className="ml-1 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200">
                        {booking.payment_status === 'pending' 
                          ? (locale === 'es' ? 'Pendiente' : 'Pending')
                          : booking.payment_status === 'partial'
                          ? (locale === 'es' ? 'Parcial' : 'Partial')
                          : (locale === 'es' ? 'Completo' : 'Complete')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Instructions */}
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50 shadow-sm">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-medium text-foreground mb-2">
                    {locale === 'es' ? 'Instrucciones de Pago' : 'Payment Instructions'}
                  </h3>
                  <ol className="text-sm text-muted-foreground mt-1 list-decimal pl-5 space-y-2">
                    <li>
                      {locale === 'es' 
                        ? `Realiza el pago del depósito (${formatCurrency(booking.deposit_amount, booking.event_currency)}) usando el método seleccionado.`
                        : `Make the deposit payment (${formatCurrency(booking.deposit_amount, booking.event_currency)}) using the selected method.`}
                    </li>
                    <li>
                      {locale === 'es' 
                        ? 'Toma una captura de pantalla o foto del comprobante de pago.'
                        : 'Take a screenshot or photo of the payment receipt.'}
                    </li>
                    <li>
                      {locale === 'es' 
                        ? 'Envía el comprobante a nuestro WhatsApp: +57 300 987 6543'
                        : 'Send the proof to our WhatsApp: +57 300 987 6543'}
                    </li>
                    <li>
                      {locale === 'es' 
                        ? 'Recibirás una confirmación una vez que verifiquemos el pago.'
                        : 'You will receive a confirmation once we verify the payment.'}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center py-6 space-x-3">
          <ButtonColorful 
            onClick={() => router.push(`/${locale}`)}
            label={locale === 'es' ? 'Volver al inicio' : 'Back to home'}
            icon={<Home className="h-4 w-4 mr-1" />}
          />
          
          <ButtonColorful 
            onClick={() => window.open(getWhatsAppLink(locale, booking.booking_reference || booking.id), '_blank')}
            label={locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            icon={<Phone className="h-4 w-4 mr-1" />}
            className="bg-green-600 hover:bg-green-700 text-white"
            showArrow={false}
          />
          
          {/* Add Save to Database button for local bookings */}
          {process.env.NODE_ENV === 'development' && booking && booking.id && booking.id.startsWith('local-') && (
            <Button 
              variant="secondary"
              onClick={async () => {
                try {
                  // Show loading indicator
                  const loadingMessage = locale === 'es' 
                    ? 'Guardando reserva en la base de datos...' 
                    : 'Saving booking to database...';
                  alert(loadingMessage);
                  
                  // Store the booking ID in sessionStorage so we can retrieve it after re-authentication
                  sessionStorage.setItem('pendingBookingSave', booking.id);
                  
                  // First, explicitly refresh the session to ensure we're authenticated
                  console.log('Explicitly refreshing session before saving booking...');
                  const { isAuthenticated, error: sessionError } = await checkAndRefreshSession();
                  
                  if (sessionError || !isAuthenticated) {
                    console.error('Session refresh failed:', sessionError);
                    alert(`Error: Failed to refresh authentication session. You will be redirected to sign in again.`);
                    
                    // Redirect to auth page with a special parameter
                    router.push(`/${locale}/auth?redirect=booking-confirmation&saveBooking=true`);
                    return;
                  }
                  
                  console.log('Session refreshed successfully, proceeding to save booking...');
                  
                  // Now proceed with saving the booking
                  const result = await bookingService.saveLocalBookingToDatabase(booking.id);
                  
                  if (result.error) {
                    const errorMessage = typeof result.error === 'object' && result.error !== null && 'message' in result.error 
                      ? String(result.error.message) 
                      : String(result.error);
                    alert(`Error: ${errorMessage}`);
                    
                    // If it's an authentication error, redirect to sign in
                    if (errorMessage.includes('authentication') || errorMessage.includes('authenticated')) {
                      sessionStorage.setItem('pendingBookingSave', booking.id);
                      router.push(`/${locale}/auth?redirect=booking-confirmation&saveBooking=true`);
                    }
                  } else {
                    const successMessage = locale === 'es'
                      ? '¡Reserva guardada en la base de datos correctamente!'
                      : 'Booking saved to database successfully!';
                    alert(successMessage);
                    
                    // Clear the pending save flag
                    sessionStorage.removeItem('pendingBookingSave');
                    
                    // Update the booking in state with the database version
                    setBooking(result.data);
                    
                    // Reload the page to refresh all data
                    window.location.reload();
                  }
                } catch (error) {
                  alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
              }}
              className="px-6"
            >
              {locale === 'es' ? 'Guardar en Base de Datos' : 'Save to Database'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 