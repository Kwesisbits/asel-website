import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { programs } from "../data/programs";
import { Hero } from "../components/sections/Hero";
import { ImpactStats } from "../components/sections/ImpactStats";
import { ProgramsOverview } from "../components/sections/ProgramsOverview";
import { WhyASEL } from "../components/sections/WhyASEL";
import { PartnersStrip } from "../components/sections/PartnersStrip";
import { ArticlesSection } from "../components/sections/ArticlesSection";
import { ProgramCard } from "../components/ui/ProgramCard";

interface HomeProps {
  onEnroll: (program?: string) => void;
  onPartnerClick: () => void;
}

export function Home({ onEnroll, onPartnerClick }: HomeProps) {
  return (
    <>
      <Hero onEnroll={onEnroll} />
      <ImpactStats />
      <ProgramsOverview />
      <section className="bg-asel-off-white py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">Featured programs</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">Start with a practical cohort.</h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-asel-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-asel-navy/80"
            >
              See All Programs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="no-scrollbar mt-10 grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-6 overflow-x-auto pb-4 lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard key={program.id} {...program} browseOnly onEnroll={() => onEnroll(program.title)} />
            ))}
          </div>
        </div>
      </section>
      <WhyASEL />
      <ArticlesSection />
      <PartnersStrip onPartnerClick={onPartnerClick} />
    </>
  );
}
