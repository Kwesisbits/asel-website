import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { programs, tracks } from "../data/programs";
import type { ProgramFormat, ProgramTrack } from "../types";
import { ProgramCard } from "../components/ui/ProgramCard";

type TrackFilter = "all" | ProgramTrack;
type FormatFilter = "all" | ProgramFormat;

export function Programs({ onEnroll }: { onEnroll: (program?: string) => void }) {
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("all");

  const filtered = useMemo(
    () => programs.filter((program) => (trackFilter === "all" || program.track === trackFilter) && (formatFilter === "all" || program.format === formatFilter)),
    [trackFilter, formatFilter],
  );

  return (
    <main className="pt-20">
      <section className="solar-mesh py-24 text-white">
        <div className="container-shell">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-asel-yellow">Our Programs</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold md:text-6xl">Find your program and build energy skills that travel.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Technical, digital, and career growth pathways for practitioners, organizations, and public agencies.</p>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-asel-navy/10 bg-white/95 py-4 backdrop-blur">
        <div className="container-shell flex flex-wrap items-center gap-3">
          <Filter size={18} className="text-asel-orange" />
          {(["all", "technical", "digital", "career"] as TrackFilter[]).map((track) => (
            <button key={track} onClick={() => setTrackFilter(track)} className={`rounded-full px-4 py-2 text-sm font-bold ${trackFilter === track ? "bg-asel-navy text-white" : "bg-asel-off-white text-asel-navy"}`}>
              {track === "all" ? "All" : tracks[track].label.replace(" Trainings", "")}
            </button>
          ))}
          <span className="hidden h-6 w-px bg-asel-navy/15 md:block" />
          {(["all", "In-Person", "Hybrid", "Online"] as FormatFilter[]).map((format) => (
            <button key={format} onClick={() => setFormatFilter(format)} className={`rounded-full px-4 py-2 text-sm font-bold ${formatFilter === format ? "bg-asel-yellow text-asel-navy" : "bg-asel-off-white text-asel-navy"}`}>
              {format}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-asel-off-white py-16">
        <div className="container-shell">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 rounded-xl bg-asel-off-white px-4 py-3 text-asel-mid-gray">
              <Search size={18} />
              <span>Showing {filtered.length} programs from ASEL Africa's current training catalog</span>
            </div>
          </div>
          {(["technical", "digital", "career"] as ProgramTrack[]).map((track) => {
            const trackPrograms = filtered.filter((program) => program.track === track);
            if (!trackPrograms.length) return null;
            return (
              <section key={track} className="pt-14">
                <div className="mb-8 max-w-3xl">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">{tracks[track].label}</p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold">{tracks[track].description}</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {trackPrograms.map((program) => <ProgramCard key={program.id} {...program} onEnroll={() => onEnroll(program.title)} />)}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
