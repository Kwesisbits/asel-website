import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function MissionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} bg-asel-navy py-24 text-white`}
    >
      <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-yellow">
            Who We Are
          </p>
          <blockquote className="mt-5 font-display text-3xl font-extrabold leading-snug md:text-4xl">
            "Skilled, inclusive, industry-ready energy talent — built for Africa."
          </blockquote>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg leading-relaxed text-white/80">
            ASEL Africa is a workforce development organization training the next generation of
            clean energy practitioners. We design hands-on programs that bridge the gap between
            academic theory and real field deployment — with a deliberate focus on expanding
            access for women and underrepresented communities.
          </p>
        </div>
      </div>
    </section>
  );
}

