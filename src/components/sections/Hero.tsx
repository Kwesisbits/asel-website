import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  onEnroll: (program?: string) => void;
}

export function Hero({ onEnroll: _onEnroll }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden text-white">
      {/* Background photo */}
      <img
        src="/Women in training.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-asel-navy/60" />

      {/* Content */}
      <div className="container-shell relative z-10 pb-28 pt-44">
        <p className="animate-fade-up font-mono text-xs font-bold uppercase tracking-[0.28em] text-asel-yellow">
          Africa's Energy Workforce Platform
        </p>
        <h1
          className="mt-5 animate-fade-up max-w-4xl font-display text-5xl font-extrabold leading-tight md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          Building Africa's Inclusive Energy Workforce
        </h1>
        <p
          className="mt-6 max-w-2xl animate-fade-up text-lg text-white/80 md:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          Hands-on training in solar, EV, biogas, clean cooking, and digital energy skills — designed for real deployment across Africa.
        </p>
        <div
          className="mt-10 animate-fade-up flex flex-wrap items-center gap-4"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full bg-asel-yellow px-7 py-3.5 text-sm font-bold text-asel-navy transition hover:bg-asel-yellow/90"
          >
            Explore Programs <ArrowRight size={16} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
          >
            Our Mission
          </Link>
        </div>
      </div>

      <ChevronDown className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-asel-yellow" />
    </section>
  );
}
