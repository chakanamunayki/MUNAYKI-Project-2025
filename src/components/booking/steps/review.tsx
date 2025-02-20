'use client';

import type { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';

interface ReviewProps {
  locale: string;
  bookingData: BookingData;
  selectedExtras: string[];
  onNext: () => void;
  onPrevious: () => void;
}

export function Review({ locale, bookingData, selectedExtras, onNext, onPrevious }: ReviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {locale === 'es' ? 'Detalles del Participante' : 'Attendee Details'}
        </h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Nombre Completo' : 'Full Name'}
            </dt>
            <dd className="text-sm">{bookingData.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Correo Electrónico' : 'Email'}
            </dt>
            <dd className="text-sm">{bookingData.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Teléfono' : 'Phone'}
            </dt>
            <dd className="text-sm">{bookingData.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Género' : 'Gender'}
            </dt>
            <dd className="text-sm capitalize">
              {locale === 'es' 
                ? bookingData.gender === 'male' ? 'Masculino' : 'Femenino'
                : bookingData.gender}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Edad' : 'Age'}
            </dt>
            <dd className="text-sm">{bookingData.age}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          {locale === 'es' ? 'Contacto de Emergencia' : 'Emergency Contact'}
        </h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Nombre' : 'Name'}
            </dt>
            <dd className="text-sm">{bookingData.emergencyContact.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Teléfono' : 'Phone'}
            </dt>
            <dd className="text-sm">{bookingData.emergencyContact.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Relación' : 'Relationship'}
            </dt>
            <dd className="text-sm">{bookingData.emergencyContact.relationship}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          {locale === 'es' ? 'Información Médica' : 'Medical Information'}
        </h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Condiciones Médicas' : 'Medical Conditions'}
            </dt>
            <dd className="text-sm">
              {bookingData.hasMedicalConditions 
                ? bookingData.medicalConditionsDetails
                : locale === 'es' ? 'Ninguna' : 'None'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Medicamentos' : 'Medications'}
            </dt>
            <dd className="text-sm">
              {bookingData.hasMedications
                ? bookingData.medicationsDetails
                : locale === 'es' ? 'Ninguno' : 'None'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Alergias' : 'Allergies'}
            </dt>
            <dd className="text-sm">
              {bookingData.hasAllergies
                ? bookingData.allergiesDetails
                : locale === 'es' ? 'Ninguna' : 'None'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              {locale === 'es' ? 'Restricciones Dietéticas' : 'Dietary Restrictions'}
            </dt>
            <dd className="text-sm">
              {bookingData.hasDietaryRestrictions
                ? bookingData.dietaryRestrictionsDetails
                : locale === 'es' ? 'Ninguna' : 'None'}
            </dd>
          </div>
          {bookingData.medicalNotes && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                {locale === 'es' ? 'Notas Médicas Adicionales' : 'Additional Medical Notes'}
              </dt>
              <dd className="text-sm">{bookingData.medicalNotes}</dd>
            </div>
          )}
        </dl>
      </div>

      {selectedExtras.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">
            {locale === 'es' ? 'Servicios Adicionales' : 'Additional Services'}
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {selectedExtras.map((extra) => (
              <li key={extra} className="text-sm">{extra}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          {locale === 'es' ? 'Anterior' : 'Back'}
        </Button>
        <Button onClick={onNext}>
          {locale === 'es' ? 'Siguiente' : 'Next'}
        </Button>
      </div>
    </div>
  );
} 