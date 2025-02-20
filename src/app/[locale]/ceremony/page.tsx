import { type Metadata } from 'next'
import { type Locale } from '@/types/i18n'
import { CeremonySection } from '@/components/sections/ceremony'

export const metadata: Metadata = {
  title: 'Sacred Ceremonies | Munayki Platform',
  description: 'Discover and connect with sacred ceremonies and traditional healing practices.',
}

interface CeremonyPageProps {
  params: {
    locale: Locale
  }
}

export default async function CeremonyPage({
  params: { locale },
}: CeremonyPageProps) {
  return (
    <div className="container relative">
      <CeremonySection locale={locale} />
    </div>
  )
} 