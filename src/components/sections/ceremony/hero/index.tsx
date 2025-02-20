import { type Locale } from '@/types/i18n'
import { Background } from './background'
import { QuickInfoBar } from './quick-info-bar'

interface HeroProps {
  locale: Locale
  ceremony: {
    title: {
      [key in Locale]: string
    }
    subtitle: {
      [key in Locale]: string
    }
    date: string
    startTime: string
    endTime: string
    location: {
      venue: string
      city: string
    }
    image: {
      src: string
      alt: {
        [key in Locale]: string
      }
    }
  }
}

export function Hero({ locale, ceremony }: HeroProps) {
  return (
    <div className="relative">
      {/* Background with parallax effect */}
      <Background
        imageSrc={ceremony.image.src}
        imageAlt={ceremony.image.alt[locale]}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container space-y-8">
          {/* Title and subtitle */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {ceremony.title[locale]}
            </h1>
            <p className="text-xl text-white/90 sm:text-2xl">
              {ceremony.subtitle[locale]}
            </p>
          </div>

          {/* Quick info bar */}
          <QuickInfoBar
            date={ceremony.date}
            startTime={ceremony.startTime}
            endTime={ceremony.endTime}
            location={ceremony.location}
            locale={locale}
          />
        </div>
      </div>
    </div>
  )
} 