import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { programs, tracks } from "../data/programs";
import type { Program, ProgramFormat, ProgramTrack } from "../types";
import { ProgramCard } from "../components/ui/ProgramCard";
import { CourseDetailModal } from "../components/ui/CourseDetailModal";

type TrackFilter = "all" | ProgramTrack;
type FormatFilter = "all" | ProgramFormat;

const trackLabels: Record<TrackFilter, string> = {
  all: "All",
  technical: "Technical",
  digital: "Digital",
  career: "Career",
};

export function Programs({ onEnroll }: { onEnroll: (program?: string) => void }) {
  const [trackFilter, setTrackFilter] = useState<TrackFilter>("all");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailProgram, setDetailProgram] = useState<Program | null>(null);

  function handleTrackChange(track: TrackFilter) {
    setTrackFilter(track);
    setFormatFilter("all");
  }

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return programs.filter(
      (program) =>
        (trackFilter === "all" || program.track === trackFilter) &&
        (formatFilter === "all" || program.format === formatFilter) &&
        (q === "" ||
          program.title.toLowerCase().includes(q) ||
          program.summary.toLowerCase().includes(q)),
    );
  }, [trackFilter, formatFilter, searchQuery]);

  const hasResults = filtered.length > 0;

  return (
    <main className="pt-20">
      <section className="solar-mesh py-24 text-white">
        <div className="container-shell">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-asel-yellow">
            Our Programs
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold md:text-6xl">
            Find your program and build energy skills that travel.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Technical, digital, and career growth pathways for practitioners, organizations,
            and public agencies.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-20 z-30 border-b border-asel-navy/10 bg-white/95 py-4 backdrop-blur">
        <div className="container-shell no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          <Filter size={18} className="shrink-0 text-asel-orange" />
          {(["all", "technical", "digital", "career"] as TrackFilter[]).map((track) => (
            <button
              key={track}
              onClick={() => handleTrackChange(track)}
              className={`shrink-0 touch-manipulation rounded-full px-4 py-2 text-sm font-bold transition ${
                trackFilter === track
                  ? "bg-asel-navy text-white"
                  : "bg-asel-off-white text-asel-navy hover:bg-asel-navy/10"
              }`}
            >
              {trackLabels[track]}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 bg-asel-navy/15" />
          <SlidersHorizontal size={16} className="shrink-0 text-asel-orange" />
          {(["all", "In-Person", "Hybrid", "Online"] as FormatFilter[]).map((format) => (
            <button
              key={format}
              onClick={() => setFormatFilter(format)}
              className={`shrink-0 touch-manipulation rounded-full px-4 py-2 text-sm font-bold transition ${
                formatFilter === format
                  ? "bg-asel-yellow text-asel-navy"
                  : "bg-asel-off-white text-asel-navy hover:bg-asel-navy/10"
              }`}
            >
              {format === "all" ? "Any Format" : format}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-asel-off-white py-16">
        <div className="container-shell">
          {/* Live search bar */}
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-asel-mid-gray"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-2xl border border-asel-navy/10 bg-white py-4 pl-11 pr-11 text-sm text-asel-navy shadow-sm outline-none transition placeholder:text-asel-mid-gray focus:border-asel-navy/30 focus:ring-2 focus:ring-asel-navy/8"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-asel-mid-gray transition hover:text-asel-navy"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {!hasResults ? (
            <div className="mt-14 rounded-2xl border-2 border-dashed border-asel-navy/15 p-12 text-center">
              <Filter className="mx-auto text-asel-navy/30" size={40} />
              <h3 className="mt-4 font-display text-xl font-bold text-asel-navy">
                No programs match your filters
              </h3>
              <p className="mt-2 text-asel-mid-gray">
                Try a different category, format, or search term.
              </p>
              <button
                onClick={() => { handleTrackChange("all"); setSearchQuery(""); }}
                className="mt-6 rounded-full bg-asel-navy px-6 py-2.5 text-sm font-bold text-white transition hover:bg-asel-navy/80"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            (["technical", "digital", "career"] as ProgramTrack[]).map((track) => {
              const trackPrograms = filtered.filter((p) => p.track === track);
              if (!trackPrograms.length) return null;
              return (
                <section key={track} className="pt-14">
                  <div className="mb-8 max-w-3xl">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">
                      {tracks[track].label}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold">
                      {tracks[track].description}
                    </h2>
                  </div>

                  {/* Balanced grid: 4-col for 4 cards, 3-col otherwise */}
                  <div
                    className={`grid gap-6 ${
                      trackPrograms.length === 4
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {trackPrograms.map((program) => (
                      <ProgramCard
                        key={program.id}
                        {...program}
                        onOpenDetail={(p) => setDetailProgram(p)}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </section>

      {/* Course detail modal */}
      <CourseDetailModal
        program={detailProgram}
        onClose={() => setDetailProgram(null)}
        onEnroll={(title) => onEnroll(title)}
      />
    </main>
  );
}
