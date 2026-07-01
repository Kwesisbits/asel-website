import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock3, GraduationCap, MapPin, X } from "lucide-react";
import type { Program } from "../../types";
import { FeePolicyModal } from "./FeePolicyModal";

const FULL_PRICE = 1300;
const WOMENS_PRICE = 650;

function calcOrg(males: number, females: number) {
  return males * FULL_PRICE + females * WOMENS_PRICE;
}

const trackConfig: Record<string, { label: string; badge: string }> = {
  technical: {
    label: "Technical",
    badge: "border-asel-yellow/50 bg-asel-yellow/15 text-asel-navy",
  },
  digital: {
    label: "Digital Skills",
    badge: "border-asel-orange/40 bg-asel-orange/10 text-asel-orange",
  },
  career: {
    label: "Career Growth",
    badge: "border-asel-navy/20 bg-asel-navy/8 text-asel-navy",
  },
};

interface CourseDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onEnroll: (program: string) => void;
}

export function CourseDetailModal({ program, onClose, onEnroll }: CourseDetailModalProps) {
  const [pricingTab, setPricingTab] = useState<"individual" | "org">("individual");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [showPolicy, setShowPolicy] = useState(false);

  const isOpen = program !== null;
  const orgTotal = calcOrg(males, females);
  const orgCount = males + females;

  return (
    <>
      <AnimatePresence>
        {isOpen && program && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-asel-navy/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header */}
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-asel-navy/10 bg-white px-8 py-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide ${trackConfig[program.track].badge}`}
                  >
                    {trackConfig[program.track].label}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-asel-navy/10 bg-asel-off-white px-3 py-1 text-xs font-semibold text-asel-navy">
                    <MapPin size={11} /> {program.format}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-asel-navy/10 bg-asel-off-white px-3 py-1 text-xs font-semibold text-asel-navy">
                    <Clock3 size={11} /> {program.duration}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close course details"
                  className="rounded-full p-2 text-asel-navy transition hover:bg-asel-off-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 space-y-7 overflow-y-auto px-8 py-6">
                {/* Title + summary */}
                <div>
                  <h2 className="font-display text-3xl font-extrabold leading-tight text-asel-navy">
                    {program.title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-asel-mid-gray">
                    {program.summary}
                  </p>
                </div>

                {/* Learning points */}
                <div>
                  <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wide text-asel-navy">
                    What you'll learn
                  </h3>
                  <ul className="space-y-3">
                    {program.learningPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-asel-yellow" />
                        <span className="text-asel-navy/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who it's for */}
                <div className="rounded-xl bg-asel-off-white p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-asel-orange">
                    Who it's for
                  </p>
                  <p className="mt-2 text-asel-navy">{program.targetAudience}</p>
                </div>

                {/* Certification */}
                <div className="flex items-center gap-4 rounded-xl border border-asel-navy/10 p-5">
                  <GraduationCap className="shrink-0 text-asel-yellow" size={28} />
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-asel-orange">
                      Certification
                    </p>
                    <p className="mt-1 font-display font-bold text-asel-navy">
                      {program.certification}
                    </p>
                  </div>
                </div>

                {/* Pricing calculator */}
                <div>
                  <h3 className="mb-4 font-display text-base font-bold uppercase tracking-wide text-asel-navy">
                    Estimated Fee
                  </h3>

                  {/* Tab switcher */}
                  <div className="grid grid-cols-2 gap-1 rounded-xl bg-asel-off-white p-1">
                    {(["individual", "org"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setPricingTab(tab)}
                        className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                          pricingTab === tab
                            ? "bg-asel-navy text-white"
                            : "text-asel-navy hover:bg-white"
                        }`}
                      >
                        {tab === "individual" ? "Individual" : "Organisation"}
                      </button>
                    ))}
                  </div>

                  {pricingTab === "individual" ? (
                    <div className="mt-4 space-y-4">
                      {/* Gender selector */}
                      <div className="grid grid-cols-2 gap-3">
                        {(["male", "female"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            className={`rounded-xl border-2 px-4 py-3 text-sm font-bold transition ${
                              gender === g
                                ? "border-asel-navy bg-asel-navy text-white"
                                : "border-asel-navy/20 text-asel-navy hover:border-asel-navy/50"
                            }`}
                          >
                            {g === "male" ? "Male" : "Female"}
                          </button>
                        ))}
                      </div>

                      {/* Fee display */}
                      {gender === "female" ? (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                          <p className="text-sm font-bold text-green-800">
                            Women's Workforce Discount applied
                          </p>
                          <p className="mt-1 font-display text-4xl font-extrabold text-green-700">
                            GHS 650
                          </p>
                          <p className="mt-1 text-xs text-green-700">
                            50% discount on the standard rate of GHS 1,300
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-asel-off-white p-5">
                          <p className="text-sm font-bold text-asel-navy">Standard rate</p>
                          <p className="mt-1 font-display text-4xl font-extrabold text-asel-navy">
                            GHS 1,300
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {/* Participant count inputs */}
                      <div className="grid grid-cols-2 gap-4">
                        <label className="grid gap-2 text-sm font-bold text-asel-navy">
                          Male participants
                          <input
                            type="number"
                            min="0"
                            value={males === 0 ? "" : males}
                            placeholder="0"
                            onChange={(e) =>
                              setMales(Math.max(0, parseInt(e.target.value) || 0))
                            }
                            className="rounded-lg border border-asel-navy/15 px-4 py-3 font-normal"
                          />
                        </label>
                        <label className="grid gap-2 text-sm font-bold text-asel-navy">
                          Female participants
                          <input
                            type="number"
                            min="0"
                            value={females === 0 ? "" : females}
                            placeholder="0"
                            onChange={(e) =>
                              setFemales(Math.max(0, parseInt(e.target.value) || 0))
                            }
                            className="rounded-lg border border-asel-navy/15 px-4 py-3 font-normal"
                          />
                        </label>
                      </div>

                      {/* Live total */}
                      <div className="rounded-xl bg-asel-off-white p-5">
                        <div className="flex items-baseline justify-between">
                          <p className="text-sm text-asel-mid-gray">
                            Total participants:{" "}
                            <strong className="text-asel-navy">{orgCount}</strong>
                          </p>
                          {orgCount > 0 && (orgCount < 10 || orgCount > 20) && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                              Outside 10–20 range
                            </span>
                          )}
                        </div>
                        <p className="mt-3 font-display text-4xl font-extrabold text-asel-navy">
                          GHS {orgTotal.toLocaleString()}
                        </p>
                        {orgCount > 0 && (
                          <p className="mt-1 text-xs text-asel-mid-gray">
                            {males} × GHS 1,300
                            {females > 0
                              ? ` + ${females} × GHS 650 (women's discount)`
                              : ""}
                          </p>
                        )}
                        {orgCount === 0 && (
                          <p className="mt-1 text-xs text-asel-mid-gray">
                            Enter participant counts above to calculate
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPolicy(true)}
                        className="text-sm font-bold text-asel-navy underline underline-offset-2 transition hover:text-asel-orange"
                      >
                        View full fee policy →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky footer CTA */}
              <div className="shrink-0 border-t border-asel-navy/10 bg-white px-8 py-5">
                {program.isComingSoon && (
                  <p className="mb-3 text-center text-xs text-asel-mid-gray">
                    This program is in development. Register your interest and we'll notify you when it opens.
                  </p>
                )}
                <button
                  onClick={() => {
                    onClose();
                    onEnroll(program.title);
                  }}
                  className="w-full rounded-full bg-asel-yellow px-6 py-4 font-bold text-asel-navy transition hover:bg-asel-yellow/90"
                >
                  {program.isComingSoon
                    ? "Register Interest →"
                    : "Register for this Course →"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fee policy secondary modal */}
      {showPolicy && <FeePolicyModal onClose={() => setShowPolicy(false)} />}
    </>
  );
}
