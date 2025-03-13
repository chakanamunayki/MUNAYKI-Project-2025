import { User } from 'lucide-react';
import { type Locale } from '@/types/i18n';

interface ParticipantCardProps {
  index: number;
  locale: Locale;
  onRemove?: () => void;
  isMainParticipant?: boolean;
}

export function ParticipantCard({ 
  index, 
  locale, 
  onRemove, 
  isMainParticipant = false 
}: ParticipantCardProps) {
  return (
    <div className="bg-card dark:bg-card/40 rounded-lg border border-border shadow-sm p-4 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-16 h-16 transform -translate-x-8 -translate-y-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#db1b77]/10 to-transparent"></div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-[#db1b77]/20 dark:bg-[#db1b77]/30 p-2 rounded-full mr-3">
            <User className="h-5 w-5 text-[#db1b77]" />
          </div>
          <h3 className="font-medium text-foreground">
            {isMainParticipant 
              ? (locale === 'es' ? 'Participante Principal' : 'Main Participant') 
              : `${locale === 'es' ? 'Participante' : 'Participant'} ${index}`}
          </h3>
        </div>
        
        {!isMainParticipant && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            {locale === 'es' ? 'Eliminar' : 'Remove'}
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor={`participant-${index}-name`} className="block text-sm font-medium text-muted-foreground mb-1">
            {locale === 'es' ? 'Nombre Completo' : 'Full Name'}
          </label>
          <input
            type="text"
            id={`participant-${index}-name`}
            name={`participants[${index}].fullName`}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#db1b77]/50 focus:border-[#db1b77] bg-background text-foreground"
            placeholder={locale === 'es' ? 'Nombre y apellido' : 'First and last name'}
            required
          />
        </div>
        
        <div>
          <label htmlFor={`participant-${index}-email`} className="block text-sm font-medium text-muted-foreground mb-1">
            {locale === 'es' ? 'Correo Electrónico' : 'Email'}
          </label>
          <input
            type="email"
            id={`participant-${index}-email`}
            name={`participants[${index}].email`}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#db1b77]/50 focus:border-[#db1b77] bg-background text-foreground"
            placeholder={locale === 'es' ? 'correo@ejemplo.com' : 'email@example.com'}
            required
          />
        </div>
        
        {/* Hidden fields for additional participants to satisfy validation */}
        {!isMainParticipant && (
          <>
            <input
              type="hidden"
              name={`participants[${index}].phone`}
              value="not-required"
            />
            <input
              type="hidden"
              name={`participants[${index}].age`}
              value="0"
            />
          </>
        )}
        
        {isMainParticipant && (
          <>
            <div>
              <label htmlFor={`participant-${index}-phone`} className="block text-sm font-medium text-muted-foreground mb-1">
                {locale === 'es' ? 'Teléfono' : 'Phone'}
              </label>
              <input
                type="tel"
                id={`participant-${index}-phone`}
                name={`participants[${index}].phone`}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#db1b77]/50 focus:border-[#db1b77] bg-background text-foreground"
                placeholder="+57 300 123 4567"
                required
              />
            </div>
            
            <div>
              <p className="block text-sm font-medium text-muted-foreground mb-2">
                {locale === 'es' ? 'Método de Pago' : 'Payment Method'}
              </p>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`participants[${index}].paymentMethod`}
                    value="bank"
                    className="h-4 w-4 text-[#db1b77] focus:ring-[#db1b77]/50 border-gray-300 dark:border-gray-600"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-foreground">
                    {locale === 'es' ? 'Transferencia Bancaria' : 'Bank Transfer'}
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`participants[${index}].paymentMethod`}
                    value="nequi"
                    className="h-4 w-4 text-[#db1b77] focus:ring-[#db1b77]/50 border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-foreground">Nequi</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 