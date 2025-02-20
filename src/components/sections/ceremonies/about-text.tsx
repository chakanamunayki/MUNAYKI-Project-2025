import Image from 'next/image'
import { type Locale } from '@/types/i18n'

interface AboutTextProps {
  locale: Locale
  title: {
    [key in Locale]: string
  }
  content: {
    [key in Locale]: string
  }
  image: {
    src: string
    alt: {
      [key in Locale]: string
    }
  }
}

export function AboutText({ locale, title, content, image }: AboutTextProps) {
  return (
    <div className="space-y-16">
      {/* Main Section Title */}
      <div className="text-center space-y-4 pt-12 md:pt-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="section-title">
            {locale === 'es' ? 'Sobre la Ceremonia' : 'About the Ceremony'}
          </span>
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {title[locale]}
          </h3>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {content[locale]}
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden lg:aspect-[4/3]">
          <Image
            src={image.src}
            alt={image.alt[locale]}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </div>
  )
} 