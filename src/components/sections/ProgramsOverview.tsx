import { ArrowRight, BriefcaseBusiness, Cpu, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const pathways = [
  {
    icon: Wrench,
    accent: "border-l-asel-yellow",
    iconColor: "text-asel-yellow",
    title: "Technical Trainings",
    copy: "Applied labs, safety standards, and field exercises for solar, EV, biogas, and clean cooking systems.",
  },
  {
    icon: Cpu,
    accent: "border-l-asel-orange",
    iconColor: "text-asel-orange",
    title: "Digital Skills for Energy",
    copy: "Data analytics, GIS, energy modeling, and digital project tools for the sector's transformation.",
  },
  {
    icon: BriefcaseBusiness,
    accent: "border-l-[#2F80ED]",
    iconColor: "text-[#2F80ED]",
    title: "Career Growth & Venture Support",
    copy: "Entrepreneurship, leadership, policy, and partnership readiness for practitioners ready to scale.",
  },
];

export function ProgramsOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "is-visible" : ""} bg-white py-20`}>
      <div className="container-shell">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">What We Do</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
          Three Pathways to Energy Expertise
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pathways.map(({ icon: Icon, accent, iconColor, title, copy }) => (
            <article
              key={title}
              className={`rounded-xl border border-asel-navy/8 border-l-4 ${accent} bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <Icon className={iconColor} size={32} />
              <h3 className="mt-5 font-display text-xl font-bold leading-snug">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-asel-mid-gray">{copy}</p>
              <Link
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-asel-navy transition hover:text-asel-orange"
                to="/programs"
              >
                Explore <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
