import { ArrowRight, Clock3, GraduationCap, MapPin, Sparkles } from "lucide-react";
import type { Program } from "../../types";
import { Button } from "./Button";

interface ProgramCardProps extends Program {
  onEnroll: () => void;
}

const trackLabel = {
  technical: "Technical",
  digital: "Digital Skills",
  career: "Career Growth",
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
}: ProgramCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-asel-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-asel-yellow hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="rounded-full bg-asel-off-white px-3 py-1 font-mono text-xs font-medium uppercase text-asel-navy">
          {trackLabel[track]}
        </span>
        {isComingSoon ? <span className="rounded-full bg-asel-yellow/20 px-3 py-1 text-xs font-bold text-asel-navy">Coming Soon</span> : null}
      </div>
      <h3 className="font-display text-xl font-bold text-asel-navy">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-asel-mid-gray">
        <span className="flex items-center gap-2">
          <Clock3 size={16} className="text-asel-orange" /> {duration}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={16} className="text-asel-orange" /> {format}
        </span>
        <span className="flex items-center gap-2">
          <GraduationCap size={16} className="text-asel-orange" /> {certification}
        </span>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-asel-navy/80">
        {learningPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-asel-yellow" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm font-semibold text-asel-navy">For: {targetAudience}</p>
      <Button className="mt-auto w-full translate-y-4" onClick={onEnroll}>
        View Details + Sign Up <ArrowRight size={16} />
      </Button>
    </article>
  );
}
