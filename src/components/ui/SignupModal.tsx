import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { programs } from "../../data/programs";
import { submitInterest } from "../../lib/supabaseClient";
import { Button } from "./Button";
import { PhoneInput } from "./PhoneInput";
import { CountrySelect } from "./CountrySelect";

interface SignupModalProps {
  isOpen: boolean;
  preSelectedProgram?: string | null;
  onClose: () => void;
}

type RegistrantType = "individual" | "organisation";

export function SignupModal({ isOpen, preSelectedProgram, onClose }: SignupModalProps) {
  const [registrantType, setRegistrantType] = useState<RegistrantType>("individual");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const { register, handleSubmit, reset } = useForm<Record<string, string>>();
  const selectedTitle = useMemo(() => preSelectedProgram ?? programs[0].title, [preSelectedProgram]);

  useEffect(() => {
    reset({ program: selectedTitle });
    setPhone("");
    setCountry("");
  }, [reset, selectedTitle, isOpen]);

  function closeModal() {
    setSubmitted(false);
    setError(null);
    onClose();
  }

  async function onSubmit(values: Record<string, string>) {
    setIsSubmitting(true);
    setError(null);
    try {
      await submitInterest("course_registrations", {
        registrant_type: registrantType,
        ...values,
        phone,
        country,
        source: "website",
        created_at: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-asel-navy/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-asel-orange">Course registration</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-asel-navy">Start your ASEL enrolment</h2>
              </div>
              <button aria-label="Close signup modal" onClick={closeModal} className="rounded-full p-2 text-asel-navy hover:bg-asel-off-white">
                <X />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto text-asel-yellow" size={64} />
                <h3 className="mt-5 font-display text-2xl font-bold">Thank you for registering interest.</h3>
                <p className="mx-auto mt-3 max-w-lg text-asel-mid-gray">
                  ASEL Africa will be in touch within 2 business days with cohort details and next steps.
                </p>
                <Button className="mt-8" onClick={closeModal}>Close</Button>
              </div>
            ) : (
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-3 rounded-xl bg-asel-off-white p-2 sm:grid-cols-2">
                  {(["individual", "organisation"] as RegistrantType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRegistrantType(type)}
                      className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                        registrantType === type ? "bg-asel-navy text-white" : "text-asel-navy hover:bg-white"
                      }`}
                    >
                      {type === "individual" ? "Individual Learner" : "Organisation / Institution"}
                    </button>
                  ))}
                </div>

                {registrantType === "individual" ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Field label="Full Name" required>
                      <input {...register("full_name", { required: true })} />
                    </Field>
                    <Field label="Email" required>
                      <input type="email" {...register("email", { required: true })} />
                    </Field>
                    <Field label="Phone" className="md:col-span-2">
                      <PhoneInput value={phone} onChange={setPhone} />
                    </Field>
                    <Field label="Country">
                      <CountrySelect value={country} onChange={setCountry} />
                    </Field>
                    <Field label="Highest Education Level">
                      <select {...register("education_level")}>
                        <option>Secondary / TVET</option>
                        <option>Diploma</option>
                        <option>Undergraduate</option>
                        <option>Postgraduate</option>
                        <option>Professional</option>
                      </select>
                    </Field>
                    <Field label="Program of Interest">
                      <select {...register("program")}>
                        {programs.map((program) => (
                          <option key={program.id}>{program.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Preferred Format">
                      <select {...register("preferred_format")}>
                        <option>In-Person</option>
                        <option>Hybrid</option>
                        <option>Online</option>
                      </select>
                    </Field>
                    <Field label="How did you hear about us?">
                      <input {...register("referral_source")} />
                    </Field>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Field label="Organisation Name" required>
                      <input {...register("organisation_name", { required: true })} />
                    </Field>
                    <Field label="Organisation Type">
                      <select {...register("organisation_type")}>
                        <option>NGO</option>
                        <option>Government</option>
                        <option>Private</option>
                        <option>Academic</option>
                        <option>Development partner</option>
                      </select>
                    </Field>
                    <Field label="Contact Person Name" required>
                      <input {...register("contact_name", { required: true })} />
                    </Field>
                    <Field label="Contact Email" required>
                      <input type="email" {...register("email", { required: true })} />
                    </Field>
                    <Field label="Phone" className="md:col-span-2">
                      <PhoneInput value={phone} onChange={setPhone} />
                    </Field>
                    <Field label="Country">
                      <CountrySelect value={country} onChange={setCountry} />
                    </Field>
                    <Field label="No. of Participants">
                      <select {...register("participants")}>
                        <option>1-5</option>
                        <option>6-20</option>
                        <option>20+</option>
                      </select>
                    </Field>
                    <Field label="Program of Interest">
                      <select {...register("program")}>
                        {programs.map((program) => (
                          <option key={program.id}>{program.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Brief Message / Requirements" className="md:col-span-2">
                      <textarea rows={4} {...register("message")} />
                    </Field>
                  </div>
                )}
                {error ? (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
                ) : null}
                <Button className="mt-6 w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Enrolment Interest"}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactElement;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 text-sm font-bold text-asel-navy ${className}`}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <span className="[&>input]:w-full [&>input]:rounded-lg [&>input]:border [&>input]:border-asel-navy/15 [&>input]:px-4 [&>input]:py-3 [&>select]:w-full [&>select]:rounded-lg [&>select]:border [&>select]:border-asel-navy/15 [&>select]:px-4 [&>select]:py-3 [&>textarea]:w-full [&>textarea]:rounded-lg [&>textarea]:border [&>textarea]:border-asel-navy/15 [&>textarea]:px-4 [&>textarea]:py-3">
        {children}
      </span>
    </label>
  );
}
