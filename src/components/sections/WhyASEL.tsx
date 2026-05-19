import { Award, Handshake, Layers3, UsersRound } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const reasons = [
  ["Gender inclusion focus", "Programs intentionally expand access for women and underrepresented energy talent.", UsersRound],
  ["Industry-aligned curriculum", "Training bridges academic theory and the practical realities of field deployment.", Award],
  ["Hybrid delivery", "In-person and virtual learning supports affordability, local relevance, and scale.", Layers3],
  ["Mentorship and placement", "Learners join a support community for professional growth and job pathways.", Handshake],
] as const;

export function WhyASEL() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className={`reveal ${isVisible ? "is-visible" : ""} bg-asel-off-white py-20`}>
      <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">Why ASEL</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">Practical energy education, designed for real deployment.</h2>
          <p className="mt-5 text-lg text-asel-mid-gray">ASEL develops capable, inclusive teams that can install, manage, analyze, and scale modern energy systems across African contexts.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map(([title, copy, Icon]) => (
            <article key={title} className="rounded-lg bg-white p-6 shadow-sm">
              <Icon className="text-asel-yellow" />
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-asel-mid-gray">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
