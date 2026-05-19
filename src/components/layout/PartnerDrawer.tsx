import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { submitInterest } from "../../lib/supabaseClient";
import { Button } from "../ui/Button";

interface PartnerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerDrawer({ isOpen, onClose }: PartnerDrawerProps) {
  const { register, handleSubmit, reset } = useForm<Record<string, string>>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: Record<string, string>) {
    setIsSubmitting(true);
    await submitInterest("partner_inquiries", { ...values, created_at: new Date().toISOString() });
    setIsSubmitting(false);
    setSubmitted(true);
    reset();
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="fixed inset-0 z-[70] bg-asel-navy/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.aside className="ml-auto flex h-full w-full max-w-[430px] flex-col overflow-y-auto bg-white p-6 shadow-2xl" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-asel-orange">Alliances</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-asel-navy">Partner With ASEL Africa</h2>
              </div>
              <button onClick={onClose} aria-label="Close partner drawer" className="rounded-full p-2 hover:bg-asel-off-white"><X /></button>
            </div>
            <p className="mt-5 text-asel-mid-gray">We welcome institutions, companies, policymakers, investors, and development partners committed to sustainable energy and inclusive innovation.</p>

            {submitted ? (
              <div className="mt-10 rounded-xl bg-asel-off-white p-6 text-center">
                <CheckCircle2 className="mx-auto text-asel-yellow" size={48} />
                <h3 className="mt-4 font-display text-xl font-bold">Interest received</h3>
                <p className="mt-2 text-sm text-asel-mid-gray">ASEL Africa will follow up with partnership next steps.</p>
                <Button className="mt-6" onClick={onClose}>Close</Button>
              </div>
            ) : (
              <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <DrawerField label="Organisation Name"><input required {...register("organisation_name")} /></DrawerField>
                <DrawerField label="Partnership Type"><select {...register("partnership_type")}><option>Training Delivery</option><option>Funding/Grant</option><option>Research</option><option>Government</option><option>Advisory</option><option>Other</option></select></DrawerField>
                <DrawerField label="Contact Name"><input required {...register("contact_name")} /></DrawerField>
                <DrawerField label="Email"><input type="email" required {...register("email")} /></DrawerField>
                <DrawerField label="Phone"><input {...register("phone")} /></DrawerField>
                <DrawerField label="Brief description"><textarea rows={5} required {...register("message")} /></DrawerField>
                <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Interest"}</Button>
              </form>
            )}
            <p className="mt-6 text-sm text-asel-mid-gray">Or email us directly at <span className="font-bold text-asel-navy">partners@aselafrica.org</span></p>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DrawerField({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-asel-navy">
      {label}
      <span className="[&>input]:w-full [&>input]:rounded-lg [&>input]:border [&>input]:border-asel-navy/15 [&>input]:px-4 [&>input]:py-3 [&>select]:w-full [&>select]:rounded-lg [&>select]:border [&>select]:border-asel-navy/15 [&>select]:px-4 [&>select]:py-3 [&>textarea]:w-full [&>textarea]:rounded-lg [&>textarea]:border [&>textarea]:border-asel-navy/15 [&>textarea]:px-4 [&>textarea]:py-3">{children}</span>
    </label>
  );
}
