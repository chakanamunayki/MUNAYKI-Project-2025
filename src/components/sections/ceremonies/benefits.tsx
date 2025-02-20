import { type Locale } from '@/types/i18n'
import { cn } from '@/lib/utils'

interface BenefitsProps {
  locale: Locale
  title: {
    [key in Locale]: string
  }
  subtitle: {
    [key in Locale]: string
  }
  benefits: Array<{
    title: {
      [key in Locale]: string
    }
    description: {
      [key in Locale]: string
    }
    icon?: React.ComponentType<{ className?: string }>
  }>
}

export function Benefits({ locale, title, subtitle, benefits }: BenefitsProps) {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="section-title">
            {title[locale]}
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle[locale]}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary/50 transition-colors"
          >
            {benefit.icon && (
              <div className="mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
            )}
            <h3 className="mb-2 font-semibold tracking-tight">
              {benefit.title[locale]}
            </h3>
            <p className="text-muted-foreground">
              {benefit.description[locale]}
            </p>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  )
} 