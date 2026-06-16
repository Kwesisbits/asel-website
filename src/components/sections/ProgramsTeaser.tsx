import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { programs, tracks } from "../../data/programs";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const activePrograms = programs.filter((p) => !p.isComingSoon);

export function ProgramsTeaser() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} bg-asel-off-white py-24`}
    >
      <div className="container-shell">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">
          Curriculum
        </p>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Our programs</h2>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-asel-navy/20 px-5 py-3 text-sm font-bold text-asel-navy transition hover:border-asel-navy hover:bg-asel-navy hover:text-white"
          >
            View all {programs.length} programs <ArrowRight size={15} />
          </Link>
        </div>

        {/* Track groups */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {(Object.entries(tracks) as [keyof typeof tracks, (typeof tracks)[keyof typeof tracks]][]).map(
            ([trackKey, track]) => (
              <div key={trackKey}>
                <h3 className="font-display text-base font-bold text-asel-navy">{track.label}</h3>
                <p className="mt-1 text-sm text-asel-mid-gray">{track.description}</p>
                <ul className="mt-5 grid gap-2">
                  {activePrograms
                    .filter((p) => p.track === trackKey)
                    .map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/programs"
                          className="flex items-center gap-2 text-sm text-asel-navy/80 transition hover:text-asel-orange"
                        >
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-asel-yellow" />
                          {p.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
