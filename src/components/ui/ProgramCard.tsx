import { ArrowRight, Clock3, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { Program } from "../../types";

interface ProgramCardProps extends Program {
  /** Opens the enroll modal */
  onEnroll: () => void;
  /** When true the primary CTA links to /programs instead of opening the modal */
  browseOnly?: boolean;
}

const trackLabel = {
  technical: "Technical",
  digital: "Digital Skills",
  career: "Career Growth",
};

const trackAccent: Record<string, string> = {
  technical: "border-l-asel-yellow",
  digital: "border-l-asel-orange",
  career: "border-l-[#2F80ED]",
};

export function ProgramCard({
  track,
  title,
  duration,
  format,
  certification,
  learningPoints,
  targetAudience,
  isComingSoon,
  onEnroll,
  browseOnly = false,
}: ProgramCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-xl border border-asel-navy/10 border-l-4 ${trackAccent[track]} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="rounded-full bg-asel-off-white px-3 py-1 font-mono text-xs font-medium uppercase tracking-wide text-asel-navy">
          {trackLabel[track]}
        </span>
        {isComingSoon ? (
          <span className="rounded-full bg-asel-yellow/15 px-3 py-1 text-xs font-bold text-asel-navy">
            Coming Soon
          </span>
        ) : null}
      </div>

      <h3 className="font-display text-xl font-bold text-asel-navy leading-snug">{title}</h3>

      <div className="mt-4 grid gap-2 text-sm text-asel-mid-gray">
        <span className="flex items-center gap-2">
          <Clock3 size={15} className="text-asel-orange shrink-0" /> {duration}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={15} className="text-asel-orange shrink-0" /> {format}
        </span>
        <span className="flex items-center gap-2">
          <GraduationCap size={15} className="text-asel-orange shrink-0" /> {certification}
        </span>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm text-asel-navy/80">
        {learningPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-asel-yellow" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm font-semibold text-asel-navy">For: {targetAudience}</p>

      <div className="mt-auto pt-5">
        {browseOnly ? (
          <Link
            to="/programs"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-asel-navy/20 px-5 py-2.5 text-sm font-bold text-asel-navy transition hover:border-asel-yellow hover:bg-asel-off-white"
          >
            Learn More <ArrowRight size={15} />
          </Link>
        ) : (
          <button
            onClick={onEnroll}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-asel-yellow px-5 py-2.5 text-sm font-bold text-asel-navy transition hover:bg-asel-yellow/90 hover:-translate-y-0.5"
          >
            Enroll <ArrowRight size={15} />
          </button>
        )}
      </div>
    </article>
  );
}
