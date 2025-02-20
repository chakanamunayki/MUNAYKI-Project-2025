import Link from "next/link";
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { CeremoniesSection } from '@/components/sections/ceremonies-section';
import { TherapistsSection } from '@/components/sections/therapists-section';
import { ceremonies } from '@/data/ceremonies';
import { therapists } from '@/data/therapists';

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <div className="section-darker">
        <About />
      </div>
      <div className="section-dark">
        <CeremoniesSection ceremonies={ceremonies} />
      </div>
      <div className="section-darker">
        <TherapistsSection therapists={therapists} />
      </div>
    </main>
  );
}
