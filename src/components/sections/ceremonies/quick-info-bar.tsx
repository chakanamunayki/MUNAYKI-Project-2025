import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { type Locale } from '@/types/i18n'
import { cn } from '@/lib/utils'

interface QuickInfoBarProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string
  startTime: string
  endTime: string
  location: {
    venue: string
    city: string
  }
  locale: Locale
}

export function QuickInfoBar({
  date,
  startTime,
  endTime,
  location,
  locale,
  className,
  ...props
}: QuickInfoBarProps) {
  const dateFormatter = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    dateStyle: 'long',
  })

  const formattedDate = dateFormatter.format(new Date(date))

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg p-6',
        'shadow-[0_0_30px_rgba(219,27,119,0.15)]',
        'dark:shadow-[0_0_30px_rgba(219,27,119,0.25)]',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-foreground/60 dark:text-white/60">
            {locale === 'es' ? 'Fecha' : 'Date'}
          </div>
          <div className="font-medium text-foreground dark:text-white">{formattedDate}</div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <ClockIcon className="h-6 w-6 text-primary" />
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-foreground/60 dark:text-white/60">
            {locale === 'es' ? 'Horario' : 'Time'}
          </div>
          <div className="font-medium text-foreground dark:text-white">
            {startTime} - {endTime}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <MapPinIcon className="h-6 w-6 text-primary" />
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wider text-foreground/60 dark:text-white/60">
            {locale === 'es' ? 'Ubicación' : 'Location'}
          </div>
          <div className="font-medium text-foreground dark:text-white">
            {location.venue}, {location.city}
          </div>
        </div>
      </div>
    </div>
  )
} 