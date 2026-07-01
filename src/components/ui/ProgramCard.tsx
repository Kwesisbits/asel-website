import { ArrowRight, Clock3, MapPin } from "lucide-react";
import type { Program } from "../../types";

interface ProgramCardProps extends Program {
  onOpenDetail: (program: Program) => void;
}

const trackConfig: Record<
  string,
  { label: string; header: string; badge: string }
> = {
  technical: {
    label: "Technical",
    header: "bg-asel-yellow/20",
    badge: "bg-asel-yellow/20 text-asel-navy border-asel-yellow/30",
  },
  digital: {
    label: "Digital Skills",
    header: "bg-asel-orange/15",
    badge: "bg-asel-orange/15 text-asel-orange border-asel-orange/30",
  },
  career: {
    label: "Career Growth",
    header: "bg-asel-navy/10",
    badge: "bg-asel-navy/10 text-asel-navy border-asel-navy/15",
  },
};

export function ProgramCard({ onOpenDetail, ...program }: ProgramCardProps) {
  const { track, title, duration, format, summary, isComingSoon } = program;
  const config = trackConfig[track];

  return (
    <article
      onClick={() => onOpenDetail(program)}
      className="group flex flex-col cursor-pointer rounded-2xl bg-white border border-asel-navy/8 overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpenDetail(program)}
    >
      {/* Colored track header */}
      <div className={`relative flex items-end px-6 pb-4 pt-8 ${config.header}`}>
        <span
          className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide ${config.badge}`}
        >
          {config.label}
        </span>
        {isComingSoon && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-asel-navy shadow-sm">
            Coming Soon
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-asel-navy">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-asel-mid-gray">
          {summary}
        </p>

        {/* Format + duration badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-asel-navy/10 bg-asel-off-white px-3 py-1 text-xs font-semibold text-asel-navy">
            <MapPin size={11} />
            {format}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-asel-navy/10 bg-asel-off-white px-3 py-1 text-xs font-semibold text-asel-navy">
            <Clock3 size={11} />
            {duration}
          </span>
        </div>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-end pt-5">
          <span className="flex items-center gap-1 text-sm font-bold text-asel-navy transition group-hover:text-asel-orange">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
