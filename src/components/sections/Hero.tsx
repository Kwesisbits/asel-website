import { ArrowRight, ChevronDown, Search, Zap } from "lucide-react";
import { programs } from "../../data/programs";
import { Button } from "../ui/Button";

interface HeroProps {
  onEnroll: (program?: string) => void;
}

export function Hero({ onEnroll }: HeroProps) {
  return (
    <section className="solar-mesh grain clip-diagonal relative min-h-screen overflow-hidden pt-32 text-white">
      <div className="container-shell grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="animate-fade-up font-mono text-xs font-bold uppercase tracking-[0.28em] text-asel-yellow">Sustainable Energy Workforce</p>
          <h1 className="mt-6 animate-fade-up font-display text-4xl font-extrabold leading-tight md:text-6xl" style={{ animationDelay: "120ms" }}>
            Powering Africa's Energy Future — One Skilled Practitioner at a Time
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg text-white/78 md:text-xl" style={{ animationDelay: "240ms" }}>
            Join Africa's training platform for solar, EV, biogas, clean cooking, and digital energy skills.
          </p>
          <div className="mt-9 animate-fade-up rounded-2xl bg-white p-3 shadow-2xl" style={{ animationDelay: "360ms" }}>
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <select className="rounded-xl bg-asel-off-white px-4 py-3 text-asel-navy outline-none">
                <option>Program type</option>
                <option>Technical training</option>
                <option>Digital skills</option>
                <option>Career growth</option>
              </select>
              <select className="rounded-xl bg-asel-off-white px-4 py-3 text-asel-navy outline-none">
                <option>Location / Format</option>
                <option>In-person</option>
                <option>Hybrid</option>
                <option>Online</option>
              </select>
              <Button onClick={() => onEnroll()}><Search size={17} /> Explore Programs</Button>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Solar PV", "EV Repair", "Biogas", "GIS for Energy", "Clean Cooking"].map((chip) => (
              <button key={chip} onClick={() => onEnroll(chip)} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-asel-yellow">
                {chip}
              </button>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-asel-yellow/25 blur-3xl" />
          <div className="animate-float rounded-[2rem] border border-white/15 bg-white/12 p-4 shadow-2xl backdrop-blur-md">
            <div className="overflow-hidden rounded-[1.5rem] bg-asel-off-white">
              <div className="h-60 bg-[linear-gradient(135deg,rgba(245,168,0,.85),rgba(26,46,74,.92)),url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="p-6 text-asel-navy">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-asel-orange">
                  <Zap size={15} /> Next Cohort
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">{programs[0].title}</h3>
                <p className="mt-2 text-asel-mid-gray">Hands-on installation, safety, commissioning, and maintenance.</p>
                <Button className="mt-5" onClick={() => onEnroll(programs[0].title)}>Enroll Now <ArrowRight size={16} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChevronDown className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-asel-yellow" />
    </section>
  );
}
