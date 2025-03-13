'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Tag, Info } from 'lucide-react';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { AdditionalParticipants } from './additional-participants';
import { useBooking } from '@/contexts/booking-context';

export interface AdditionalParticipantsStepProps {
  maxParticipants?: number;
}

export function AdditionalParticipantsStep({
  maxParticipants = 10,
}: AdditionalParticipantsStepProps) {
  const {
    locale,
    additionalParticipants,
    setAdditionalParticipants,
    handleNextStep,
    handlePreviousStep,
    formData
  } = useBooking();

  // Extract event price and currency from formData
  const eventPrice = formData.eventPrice || '';
  const eventCurrency = formData.eventCurrency || 'COP';

  return (
    <Card className="shadow-md bg-card dark:bg-card/40 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#db1b77]/10 to-transparent rounded-full"></div>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Users className="h-5 w-5 mr-2 text-[#db1b77]" />
          {locale === 'es' ? 'Participantes Adicionales' : 'Additional Participants'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdditionalParticipants
          locale={locale}
          maxParticipants={maxParticipants}
          eventPrice={eventPrice}
          eventCurrency={eventCurrency}
          participants={additionalParticipants}
          setParticipants={setAdditionalParticipants}
        />
        
        {/* Group discount notice */}
        {additionalParticipants.length >= 3 ? (
          <div className="mt-4 bg-[#db1b77]/10 dark:bg-[#db1b77]/20 p-3 rounded-md border border-[#db1b77]/20 flex items-start">
            <div className="bg-background dark:bg-background/40 rounded-full p-1 mr-2 mt-0.5 shadow-sm">
              <Tag className="h-4 w-4 text-[#db1b77]" />
            </div>
            <div>
              <p className="text-foreground font-medium">
                {locale === 'es' ? '¡Descuento grupal aplicado!' : 'Group discount applied!'}
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === 'es' 
                  ? 'Grupos de 4 o más participantes reciben un 10% de descuento en el total.' 
                  : 'Groups of 4 or more participants receive a 10% discount on the total.'}
              </p>
            </div>
          </div>
        ) : additionalParticipants.length === 2 ? (
          <div className="mt-4 bg-card/80 dark:bg-card/40 p-3 rounded-md border border-muted flex items-start">
            <div className="bg-background dark:bg-background/40 rounded-full p-1 mr-2 mt-0.5 shadow-sm">
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-foreground font-medium">
                {locale === 'es' ? '¡Casi ahí!' : 'Almost there!'}
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === 'es' 
                  ? 'Agrega 1 participante más para obtener un 10% de descuento en el total.' 
                  : 'Add 1 more participant to get a 10% discount on the total.'}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePreviousStep} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> {locale === 'es' ? 'Anterior' : 'Previous'}
        </Button>
        <ButtonColorful 
          onClick={handleNextStep}
          label={locale === 'es' ? 'Continuar' : 'Continue'}
        />
      </CardFooter>
    </Card>
  );
} 