'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Building, Phone, Info, Clock } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { useBooking } from '@/contexts/booking-context';
import { CurrencyConverter } from '@/components/ui/currency-converter';
import { formatCurrency, convertCurrency } from '@/utils/currency-formatter';
import { calculatePricing } from '@/utils/pricing-calculator';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { generateBookingReference } from '@/lib/utils';
import { bookingService } from '@/services/booking-service';

export interface PaymentInfoStepProps {
  depositPercentage?: number;
  groupDiscountRate?: number;
}

export function PaymentInfoStep({
  depositPercentage = 0.5,
  groupDiscountRate = 0.1,
}: PaymentInfoStepProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const {
    locale,
    formData,
    additionalParticipants,
    isGroupBooking,
    handleInputChange,
    handleRadioChange,
    handlePreviousStep,
    isSubmitting,
    setIsSubmitting,
    eventId,
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventImage,
    userId
  } = useBooking();

  // Calculate pricing
  const getPricing = () => {
    const basePrice = parseFloat(formData.eventPrice || '0');
    const totalParticipants = isGroupBooking ? additionalParticipants.length + 1 : 1;
    
    return calculatePricing({
      basePrice,
      totalParticipants,
      groupDiscountRate,
      depositPercentage
    });
  };
  
  const pricing = getPricing();
  const eventCurrency = formData.eventCurrency || 'COP';

  const handleSubmit = async () => {
    // Validate WhatsApp number
    if (!formData.whatsappNumber) {
      alert(locale === 'es'
        ? 'Por favor ingresa tu número de WhatsApp para enviar el comprobante de pago'
        : 'Please enter your WhatsApp number to send the payment proof');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate a booking reference
      const bookingReference = generateBookingReference(formData.fullName || 'user');
      
      // Prepare the complete booking data
      const completeBookingData = {
        bookingReference: bookingReference,
        eventId: eventId,
        eventName: eventName || "Event Name",
        eventDate: eventDate || new Date().toISOString(),
        eventTime: eventTime || "",
        eventPrice: formData.eventPrice || '0',
        eventCurrency: formData.eventCurrency || 'COP',
        eventLocation: eventLocation || "Event Location",
        eventImage: eventImage || "",
        userId: userId || "user-id",
        userEmail: formData.email,
        mainParticipant: {
          id: `main-${Date.now()}`,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          preferredLanguage: formData.preferredLanguage,
          specialRequirements: formData.specialRequirements,
          emergencyContact: formData.emergencyContact,
          paymentMethod: formData.paymentMethod as 'bank-transfer' | 'nequi',
          whatsappNumber: formData.whatsappNumber
        },
        isGroupBooking: isGroupBooking,
        additionalParticipants: isGroupBooking ? additionalParticipants : [],
        totalParticipants: isGroupBooking ? additionalParticipants.length + 1 : 1,
        
        // Add pricing information
        basePrice: parseFloat(formData.eventPrice || '0'),
        subtotal: pricing.subtotal,
        hasGroupDiscount: pricing.hasGroupDiscount,
        discountRate: pricing.discountRate,
        discountAmount: pricing.discountAmount,
        totalAmount: pricing.totalAmount,
        depositAmount: pricing.depositAmount,
        
        // Add booking metadata
        bookingDate: new Date().toISOString(),
        bookingStatus: 'pending' as const,
        paymentStatus: 'pending' as const
      };
      
      // Save booking to localStorage as a backup
      localStorage.setItem(`booking_${bookingReference}`, JSON.stringify(completeBookingData));
      localStorage.setItem('bookingId', bookingReference);
      
      // Try to save to Supabase using the booking service
      try {
        console.log('Saving booking using BookingService:', completeBookingData);
        
        const { data, error } = await bookingService.createBookingWithSQLFunction(completeBookingData);
        
        if (error) {
          console.error('Error saving booking to Supabase:', error);
          // Still proceed to confirmation page with localStorage data
          alert(locale === 'es'
            ? 'Hubo un problema al guardar tu reserva en la base de datos, pero puedes continuar con los datos guardados localmente.'
            : 'There was an issue saving your booking to the database, but you can continue with the locally saved data.');
        } else {
          console.log('Booking saved successfully:', data);
          
          // If we have a database ID, update the localStorage bookingId
          if (data?.id) {
            localStorage.setItem('bookingId', data.id);
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        alert(locale === 'es'
          ? 'Hubo un problema al guardar tu reserva en la base de datos, pero puedes continuar con los datos guardados localmente.'
          : 'There was an issue saving your booking to the database, but you can continue with the locally saved data.');
      }
      
      // Redirect to confirmation page
      router.push(`/${locale}/booking/confirmation`);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert(locale === 'es'
        ? 'Hubo un error al procesar tu reserva. Por favor intenta de nuevo.'
        : 'There was an error processing your booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {locale === 'es' ? 'Información de Pago' : 'Payment Information'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">
            {locale === 'es' ? 'Resumen de la Reserva' : 'Booking Summary'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{locale === 'es' ? 'Participantes' : 'Participants'}:</span>
              <span>{pricing.totalParticipants}</span>
            </div>
            
            {isGroupBooking && (
              <div className="pl-4 border-l-2 border-gray-200 ml-2 text-sm">
                <div className="mb-1">{locale === 'es' ? 'Participante principal' : 'Main participant'}: {formData.fullName}</div>
                {additionalParticipants.map((p, index) => (
                  <div key={p.id} className="mb-1">
                    {locale === 'es' ? 'Adicional' : 'Additional'} {index + 1}: {p.fullName}
                  </div>
                ))}
              </div>
            )}
            
            {/* Pricing details */}
            <div className="pt-3 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{locale === 'es' ? 'Precio por persona' : 'Price per person'}:</span>
                  <span>{formatCurrency(pricing.basePrice, eventCurrency, locale)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{locale === 'es' ? 'Subtotal' : 'Subtotal'}:</span>
                  <span>{formatCurrency(pricing.subtotal, eventCurrency, locale)}</span>
                </div>
                
                {pricing.hasGroupDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span>{locale === 'es' ? 'Descuento grupal (10%)' : 'Group discount (10%)'}:</span>
                    <span>-{formatCurrency(pricing.discountAmount, eventCurrency, locale)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                  <span>{locale === 'es' ? 'Total' : 'Total'}:</span>
                  <span>{formatCurrency(pricing.totalAmount, eventCurrency, locale)}</span>
                </div>
                
                <div className="flex justify-between text-blue-700 font-medium bg-blue-50 p-2 rounded">
                  <span>{locale === 'es' ? 'Depósito requerido (50%)' : 'Required deposit (50%)'}:</span>
                  <span>{formatCurrency(pricing.depositAmount, eventCurrency, locale)}</span>
                </div>
                
                {/* Currency conversion information */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-muted-foreground mb-2">
                    {locale === 'es' 
                      ? 'Valores aproximados en otras monedas:' 
                      : 'Approximate values in other currencies:'}
                  </p>
                  <CurrencyConverter 
                    amount={pricing.totalAmount} 
                    sourceCurrency="COP" 
                    locale={locale} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">
              {locale === 'es' ? 'Tu número de WhatsApp' : 'Your WhatsApp number'} *
            </Label>
            <Input
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder={locale === 'es' ? 'Ej: +57 300 123 4567' : 'E.g. +57 300 123 4567'}
              required
            />
            <p className="text-sm text-muted-foreground">
              {locale === 'es' 
                ? 'Necesitamos tu número de WhatsApp para poder contactarte sobre tu reserva.' 
                : 'We need your WhatsApp number so we can contact you about your booking.'}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>
              {locale === 'es' ? 'Método de Pago' : 'Payment Method'} *
            </Label>
            <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`flex flex-col border p-4 rounded-md cursor-pointer transition-all relative overflow-hidden shadow-sm
                ${formData.paymentMethod === 'bank-transfer' 
                  ? 'border-[#db1b77] bg-[#db1b77]/5 dark:bg-[#db1b77]/10' 
                  : 'hover:border-gray-400 dark:hover:border-gray-600'}`}>
                {formData.paymentMethod === 'bank-transfer' && (
                  <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#db1b77]/10 to-transparent rounded-full"></div>
                  </div>
                )}
                <div className="flex items-start space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                  <div className="flex-grow">
                    <Label htmlFor="bank-transfer" className="font-medium flex items-center cursor-pointer text-foreground">
                      <Building className="h-4 w-4 mr-2 text-[#db1b77]" />
                    {locale === 'es' ? 'Transferencia Bancaria' : 'Bank Transfer'}
                  </Label>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{locale === 'es' ? 'Banco' : 'Bank'}:</span>
                        <span className="font-medium text-foreground">Bancolombia</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{locale === 'es' ? 'Cuenta' : 'Account'}:</span>
                        <span className="font-mono text-[#db1b77] dark:text-[#db1b77]">123-456789-00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{locale === 'es' ? 'Titular' : 'Holder'}:</span>
                        <span className="text-foreground">MunayKi Experiences</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`flex flex-col border p-4 rounded-md cursor-pointer transition-all relative overflow-hidden shadow-sm
                ${formData.paymentMethod === 'nequi' 
                  ? 'border-[#db1b77] bg-[#db1b77]/5 dark:bg-[#db1b77]/10' 
                  : 'hover:border-gray-400 dark:hover:border-gray-600'}`}>
                {formData.paymentMethod === 'nequi' && (
                  <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#db1b77]/10 to-transparent rounded-full"></div>
                  </div>
                )}
                <div className="flex items-start space-x-2">
                <RadioGroupItem value="nequi" id="nequi" className="mt-1" />
                  <div className="flex-grow">
                    <Label htmlFor="nequi" className="font-medium flex items-center cursor-pointer text-foreground">
                      <Phone className="h-4 w-4 mr-2 text-[#db1b77]" />
                      Nequi
                    </Label>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{locale === 'es' ? 'Número' : 'Number'}:</span>
                        <span className="font-mono text-[#db1b77] dark:text-[#db1b77]">300 987 6543</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{locale === 'es' ? 'Titular' : 'Holder'}:</span>
                        <span className="text-foreground">MunayKi Experiences</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Payment proof instructions */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center mb-2">
              <Info className="h-4 w-4 mr-2" />
              {locale === 'es' ? 'Enviar comprobante de pago' : 'Send payment proof'}
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
              {locale === 'es' 
                ? 'Después de realizar el pago, por favor envía el comprobante por WhatsApp al siguiente número:' 
                : 'After making the payment, please send the proof via WhatsApp to the following number:'}
            </p>
            <div className="bg-white dark:bg-blue-900/50 p-2 rounded flex items-center justify-between">
              <span className="font-mono text-blue-800 dark:text-blue-200 text-base">310 617 2607</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 dark:text-blue-300 h-8"
                onClick={() => {
                  navigator.clipboard.writeText('3106172607');
                  alert(locale === 'es' ? 'Número copiado!' : 'Number copied!');
                }}
              >
                {locale === 'es' ? 'Copiar' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Payment Policy - Updated with better dark mode support */}
        <div className="bg-card/80 dark:bg-card/40 border-l-4 border-[#db1b77] p-4 rounded-lg shadow-sm relative overflow-hidden">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#db1b77]/10 to-transparent rounded-full"></div>
          </div>
          
          <h3 className="font-medium text-foreground text-lg mb-3 flex items-center">
            <Info className="h-5 w-5 mr-2 text-[#db1b77]" />
            {locale === 'es' ? 'Política de Pago' : 'Payment Policy'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-background dark:bg-background/40 rounded-full p-1 mr-2 mt-0.5 shadow-sm">
                <Clock className="h-4 w-4 text-[#db1b77]" />
              </div>
              <p className="text-foreground">
                <span className="font-medium">
                  {locale === 'es' ? 'Depósito del 50%: ' : '50% Deposit: '}
                </span>
                {locale === 'es' 
                  ? `Solo se requiere un depósito del 50% (${formatCurrency(pricing.depositAmount, eventCurrency, locale)}) para asegurar tu reserva.`
                  : `Only a 50% deposit (${formatCurrency(pricing.depositAmount, eventCurrency, locale)}) is required to secure your booking.`}
                <span className="text-xs text-muted-foreground ml-1">
                  {locale === 'es' 
                    ? `(Aprox. ${formatCurrency(convertCurrency(pricing.depositAmount, 'USD'), 'USD', locale)})`
                    : `(Approx. ${formatCurrency(convertCurrency(pricing.depositAmount, 'USD'), 'USD', locale)})`}
                </span>
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-background dark:bg-background/40 rounded-full p-1 mr-2 mt-0.5 shadow-sm">
                <CreditCard className="h-4 w-4 text-[#db1b77]" />
              </div>
              <p className="text-foreground">
                <span className="font-medium">
                  {locale === 'es' ? 'Pago del saldo: ' : 'Balance Payment: '}
                </span>
                {locale === 'es' 
                  ? `El 50% restante (${formatCurrency(pricing.depositAmount, eventCurrency, locale)}) se pagará el día del evento.`
                  : `The remaining 50% (${formatCurrency(pricing.depositAmount, eventCurrency, locale)}) will be paid on the day of the event.`}
                <span className="text-xs text-muted-foreground ml-1">
                  {locale === 'es' 
                    ? `(Aprox. ${formatCurrency(convertCurrency(pricing.depositAmount, 'USD'), 'USD', locale)})`
                    : `(Approx. ${formatCurrency(convertCurrency(pricing.depositAmount, 'USD'), 'USD', locale)})`}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePreviousStep}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {locale === 'es' ? 'Anterior' : 'Previous'}
        </Button>
        
        <ButtonColorful 
          onClick={handleSubmit}
          disabled={isSubmitting}
          label={isSubmitting 
            ? (locale === 'es' ? 'Procesando...' : 'Processing...') 
            : (locale === 'es' ? 'Confirmar Reserva' : 'Confirm Booking')}
          className="min-w-[180px]"
        />
      </CardFooter>
    </Card>
  );
} 