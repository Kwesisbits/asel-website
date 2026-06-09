import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { HeroSlideshow } from "./HeroSlideshow";

interface HeroProps {
  onEnroll: (program?: string) => void;
}

export function Hero({ onEnroll }: HeroProps) {
  return (
    <section className="solar-mesh grain clip-diagonal relative min-h-screen overflow-hidden pt-32 text-white">
      <div className="container-shell grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="animate-fade-up font-mono text-xs font-bold uppercase tracking-[0.28em] text-asel-yellow">
            Sustainable Energy Workforce
          </p>
          <h1
            className="mt-6 animate-fade-up font-display text-4xl font-extrabold leading-tight md:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Powering Africa's Energy Future — One Skilled Practitioner at a Time
          </h1>
          <p
            className="mt-6 max-w-2xl animate-fade-up text-lg text-white/80 md:text-xl"
            style={{ animationDelay: "240ms" }}
          >
            Africa's training platform for solar, EV, biogas, clean cooking, and digital energy skills.
          </p>

          <div
            className="mt-8 animate-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Button onClick={() => onEnroll()}>
              Enroll in a Course <ArrowRight size={16} />
            </Button>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-asel-yellow hover:text-asel-yellow"
            >
              Browse Programs
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" style={{ animationDelay: "480ms" }}>
            {["Solar PV", "EV Repair", "Biogas", "GIS for Energy", "Clean Cooking"].map((chip) => (
              <Link
                key={chip}
                to="/programs"
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-asel-yellow hover:text-asel-yellow"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>

        <HeroSlideshow onEnroll={onEnroll} />
      </div>
      <ChevronDown className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-asel-yellow" />
    </section>
  );
}
