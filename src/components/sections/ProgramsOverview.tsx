import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const capabilities = [
  {
    title: "Technical Trainings",
    description:
      "Hands-on installation, safety, and maintenance for solar PV, electric vehicles, biogas, and clean cooking systems.",
  },
  {
    title: "Digital Skills for Energy",
    description:
      "Data analytics, GIS mapping, energy system modeling, and digital project management for the modern energy sector.",
  },
  {
    title: "Career Growth & Ventures",
    description:
      "Entrepreneurship, policy, business development, and leadership programs for practitioners ready to scale.",
  },
];

export function ProgramsOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "is-visible" : ""} bg-white py-24`}>
      <div className="container-shell">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">
          Our Capabilities
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold md:text-5xl">
          What we train for
        </h2>

        <div className="mt-12 grid border border-asel-navy/10 bg-asel-navy/10 gap-px md:grid-cols-3">
          {capabilities.map(({ title, description }) => (
            <article
              key={title}
              className="group flex flex-col bg-white p-8 transition hover:bg-asel-off-white"
            >
              <h3 className="font-display text-xl font-bold text-asel-navy">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-asel-mid-gray">
                {description}
              </p>
              <Link
                to="/programs"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-asel-navy transition group-hover:text-asel-orange"
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
