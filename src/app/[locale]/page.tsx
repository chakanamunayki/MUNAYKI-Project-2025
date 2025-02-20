import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { CeremoniesSection } from '@/components/sections/ceremonies-section';
import { TherapistsSection } from '@/components/sections/therapists-section';
import { HolisticInvestment } from '@/components/sections/holistic-investment';
import { JoinNetwork } from '@/components/sections/join-network';
import { SectionDivider } from '@/components/sections/section-divider';
import { ceremonies } from '@/data/ceremonies';
import { therapists } from '@/data/therapists';
import { type Locale } from '@/types/i18n';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default function Home({ params: { locale } }: HomePageProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <SectionDivider locale={locale} />
      <CeremoniesSection ceremonies={ceremonies} />
      <TherapistsSection therapists={therapists} />
      <div className="bg-background">
        <HolisticInvestment />
      </div>
      <div className="bg-muted/30">
        <JoinNetwork />
      </div>
    </main>
  );
} 