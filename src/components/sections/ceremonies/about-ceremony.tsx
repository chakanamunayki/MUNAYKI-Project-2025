import { type Locale } from '@/types/i18n'
import { cn } from '@/lib/utils'

interface AboutCeremonyProps {
  locale: Locale
  description: {
    [key in Locale]: string
  }
  highlights: Array<{
    title: {
      [key in Locale]: string
    }
    description: {
      [key in Locale]: string
    }
    icon?: React.ComponentType<{ className?: string }>
  }>
  preparation: Array<{
    title: {
      [key in Locale]: string
    }
    description: {
      [key in Locale]: string
    }
  }>
}

export function AboutCeremony({ locale, description, highlights, preparation }: AboutCeremonyProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Main Description */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {locale === 'es' ? 'Sobre la Ceremonia' : 'About the Ceremony'}
              </h2>
              <div className="prose prose-gray dark:prose-invert">
                <p>{description[locale]}</p>
              </div>
            </div>

            {/* Highlights/Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                {locale === 'es' ? 'Beneficios' : 'Benefits'}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded-lg border p-4 bg-card"
                  >
                    {highlight.icon && (
                      <highlight.icon className="h-5 w-5 text-primary" />
                    )}
                    <h4 className="font-medium">{highlight.title[locale]}</h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preparation Guidelines */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {locale === 'es' ? 'Preparación' : 'Preparation'}
              </h3>
              <div className="space-y-6">
                {preparation.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-lg border p-4 bg-card"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">{step.title[locale]}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 