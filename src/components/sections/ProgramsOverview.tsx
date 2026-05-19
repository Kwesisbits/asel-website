import { ArrowRight, BriefcaseBusiness, Cpu, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const pathways = [
  { icon: Wrench, title: "Technical Trainings", copy: "Applied labs, safety standards, and field exercises for modern energy systems." },
  { icon: Cpu, title: "Digital Skills for Energy", copy: "Data, GIS, modeling, and digital project tools for energy sector transformation." },
  { icon: BriefcaseBusiness, title: "Career Growth & Venture Support", copy: "Entrepreneurship, leadership, policy, and partnership readiness for new ventures." },
];

export function ProgramsOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "is-visible" : ""} bg-white py-20`}>
      <div className="container-shell">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">What We Do</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">Three Pathways to Energy Expertise</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pathways.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-lg border border-asel-navy/10 border-l-4 border-l-asel-yellow bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <Icon className="text-asel-yellow" size={34} />
              <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 text-asel-mid-gray">{copy}</p>
              <Link className="mt-5 inline-flex items-center gap-2 font-bold text-asel-navy hover:text-asel-orange" to="/programs">
                Explore <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
