import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface QuickInfoBarProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string
  startTime: string
  endTime: string
  location: {
    venue: string
    city: string
  }
  locale: 'en' | 'es'
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
        'flex flex-col gap-4 rounded-lg bg-background/80 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:p-6',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">{formattedDate}</span>
      </div>

      <div className="flex items-center gap-2">
        <ClockIcon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">
          {startTime} - {endTime}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <MapPinIcon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">
          {location.venue}, {location.city}
        </span>
      </div>
    </div>
  )
} 