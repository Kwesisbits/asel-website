import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface FeePolicyModalProps {
  onClose: () => void;
}

const feeRows = [
  { type: "Individual — Male / Any gender", fee: "GHS 1,300", note: "Standard rate" },
  { type: "Individual — Female", fee: "GHS 650", note: "50% Women's Workforce Discount" },
  {
    type: "Organisation — per male participant",
    fee: "GHS 1,300",
    note: "Per head, standard rate",
  },
  {
    type: "Organisation — per female participant",
    fee: "GHS 650",
    note: "Per head, women's discount",
  },
  {
    type: "Organisation range (10–20 participants)",
    fee: "GHS 6,500 – 26,000",
    note: "Calculated individually per gender",
  },
];

export function FeePolicyModal({ onClose }: FeePolicyModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">
                ASEL Africa
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-asel-navy">
                Training Fee Policy
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close fee policy"
              className="rounded-full p-2 text-asel-navy transition hover:bg-asel-off-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-asel-navy/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-asel-navy text-white">
                  <th className="px-4 py-3 text-left font-bold">Applicant Type</th>
                  <th className="px-4 py-3 text-right font-bold">Fee</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row, i) => (
                  <tr
                    key={row.type}
                    className={i % 2 === 0 ? "bg-white" : "bg-asel-off-white"}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-asel-navy">{row.type}</p>
                      <p className="mt-0.5 text-xs text-asel-mid-gray">{row.note}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-asel-navy">
                      {row.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl bg-asel-yellow/10 p-4 text-sm text-asel-navy/80">
            <p>
              <strong>All fees are quoted in Ghana Cedis (GHS).</strong> Payment instructions
              — including MoMo and bank transfer options — are sent within 24–48 hours after
              your registration is reviewed by the ASEL Africa team.
            </p>
            <p className="mt-2">
              For group bookings outside the 10–20 range, or for custom cohort arrangements,
              please contact us at{" "}
              <a
                href="mailto:info@aselafrica.org"
                className="font-bold underline hover:text-asel-orange"
              >
                info@aselafrica.org
              </a>
              .
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
