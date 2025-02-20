import Image from 'next/image'
import { type Locale } from '@/types/i18n'
import { cn } from '@/lib/utils'
import { QuickInfoBar } from './quick-info-bar'
import { CeremonyNav } from './ceremony-nav'

interface CeremonyHeroProps {
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

export function CeremonyHero({ locale, ceremony }: CeremonyHeroProps) {
  return (
    <section className="relative w-screen">
      {/* Background with parallax effect */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={ceremony.image.src}
          alt={ceremony.image.alt[locale]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Gradient Overlay - Dark mode aware */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        
        {/* Decorative Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between py-12">
        {/* Title and subtitle container */}
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="max-w-4xl space-y-6 text-center px-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {ceremony.title[locale]}
            </h1>
            <p className="text-xl text-white/90 sm:text-2xl">
              {ceremony.subtitle[locale]}
            </p>
          </div>
        </div>

        {/* Info boxes container */}
        <div className="w-full">
          <div className="max-w-4xl mx-auto space-y-6 px-4">
            <QuickInfoBar
              date={ceremony.date}
              startTime={ceremony.startTime}
              endTime={ceremony.endTime}
              location={ceremony.location}
              locale={locale}
              className="bg-background/40 dark:bg-background/40 backdrop-blur-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 