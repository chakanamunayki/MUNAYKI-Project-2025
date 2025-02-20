import * as React from 'react'
import { type Locale } from '@/types/i18n'
import { cn } from '@/lib/utils'
import { ButtonColorful } from '@/components/ui/button-colorful'
import { CalendarCheck, CalendarDays, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface PreparationTimelineProps {
  locale: Locale
  title: {
    [key in Locale]: string
  }
  subtitle: {
    [key in Locale]: string
  }
  personalSession: {
    title: {
      [key in Locale]: string
    }
    description: {
      [key in Locale]: string
    }
    price: string
  }
  timeline: Array<{
    title: {
      [key in Locale]: string
    }
    description: {
      [key in Locale]: string
    }
    time: {
      [key in Locale]: string
    }
    rationale?: {
      [key in Locale]: string
    }
  }>
}

export function PreparationTimeline({
  locale,
  title,
  subtitle,
  personalSession,
  timeline
}: PreparationTimelineProps) {
  return (
    <TooltipProvider>
      <div className="space-y-12">
        {/* Section Header */}
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

        {/* Personal Session Card */}
        <div className="relative max-w-3xl mx-auto overflow-hidden rounded-lg border bg-card">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="hidden sm:block">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  {personalSession.title[locale]}
                </h3>
                <p className="text-muted-foreground">
                  {personalSession.description[locale]}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-medium text-primary text-lg">
                  {personalSession.price}
                </p>
                <ButtonColorful
                  label={locale === 'es' ? 'Agendar Sesión' : 'Schedule Session'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 
            md:-translate-x-px" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((step, index) => (
              <div key={index} className={cn(
                "relative flex flex-col md:flex-row items-stretch gap-4 md:gap-12 pl-6 md:pl-0",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                {/* Time Period */}
                <div className={cn(
                  "flex-none md:flex-1 md:pt-1",
                  "flex items-center md:block",
                  "bg-muted/50 md:bg-transparent rounded-full md:rounded-none px-4 py-2 md:p-0",
                  "md:text-right",
                  index % 2 === 1 && "md:text-left"
                )}>
                  <div className={cn(
                    "inline-flex items-center gap-2 text-base md:text-lg font-semibold",
                    "md:mb-0"
                  )}>
                    <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-primary md:order-1" />
                    <span>{step.time[locale]}</span>
                  </div>
                </div>

                {/* Circle on Timeline */}
                <div className="absolute left-0 top-[1.4rem] h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-primary bg-background
                  md:left-1/2 md:top-2 md:-translate-x-1/2">
                  <div className="absolute inset-0.5 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 relative">
                  <div className="relative rounded-lg border bg-card p-4 md:p-6 shadow-sm
                    before:absolute before:left-0 before:top-6 before:h-px before:w-4 md:before:w-8 before:bg-border
                    md:before:left-auto md:before:right-full md:before:w-12
                    [&[data-align=right]]:before:left-full [&[data-align=right]]:before:right-auto"
                    data-align={index % 2 === 0 ? "left" : "right"}
                  >
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="font-semibold text-lg">
                        {step.title[locale]}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description[locale]}
                      </p>
                      {step.rationale && (
                        <div className="pt-2 md:pt-3 border-t">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground/90">
                              {step.rationale[locale]}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
} 