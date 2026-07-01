import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { programs } from "../../data/programs";
import { submitInterest } from "../../lib/supabaseClient";
import { Button } from "./Button";
import { PhoneInput } from "./PhoneInput";
import { CountrySelect } from "./CountrySelect";
import { FeePolicyModal } from "./FeePolicyModal";

const FULL_PRICE = 1300;
const WOMENS_PRICE = 650;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

interface SignupModalProps {
  isOpen: boolean;
  preSelectedProgram?: string | null;
  onClose: () => void;
}

type RegistrantType = "individual" | "organisation";

type FormValues = {
  full_name: string;
  email: string;
  education_level: string;
  program: string;
  preferred_format: string;
  referral_source: string;
  organisation_name: string;
  organisation_type: string;
  contact_name: string;
  message: string;
};

export function SignupModal({ isOpen, preSelectedProgram, onClose }: SignupModalProps) {
  const [registrantType, setRegistrantType] = useState<RegistrantType>("individual");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Phone + country (managed outside react-hook-form)
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [country, setCountry] = useState("");

  // Individual pricing
  const [gender, setGender] = useState<"male" | "female" | "prefer_not">("prefer_not");

  // Org pricing
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [showFeePolicy, setShowFeePolicy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const selectedTitle = useMemo(
    () => preSelectedProgram ?? programs[0].title,
    [preSelectedProgram],
  );

  useEffect(() => {
    reset({ program: selectedTitle } as Partial<FormValues>);
    setPhone("");
    setPhoneError(null);
    setCountry("");
    setGender("prefer_not");
    setMaleCount(0);
    setFemaleCount(0);
  }, [reset, selectedTitle, isOpen]);

  function closeModal() {
    setSubmitted(false);
    setSubmitError(null);
    setPhoneError(null);
    onClose();
  }

  function validatePhone(): boolean {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setPhoneError("Enter a valid phone number (at least 7 digits)");
      return false;
    }
    setPhoneError(null);
    return true;
  }

  async function onSubmit(values: FormValues) {
    if (!validatePhone()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const orgCount = maleCount + femaleCount;
      const estimatedFee =
        registrantType === "individual"
          ? gender === "female"
            ? WOMENS_PRICE
            : FULL_PRICE
          : maleCount * FULL_PRICE + femaleCount * WOMENS_PRICE;

      await submitInterest("course_registrations", {
        registrant_type: registrantType,
        ...values,
        phone,
        country,
        gender: registrantType === "individual" ? gender : undefined,
        male_participants: registrantType === "organisation" ? maleCount : undefined,
        female_participants: registrantType === "organisation" ? femaleCount : undefined,
        total_participants: registrantType === "organisation" ? orgCount : undefined,
        estimated_fee_ghs: estimatedFee,
        source: "website",
        created_at: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Derived pricing values
  const individualFee = gender === "female" ? WOMENS_PRICE : FULL_PRICE;
  const orgTotal = maleCount * FULL_PRICE + femaleCount * WOMENS_PRICE;
  const orgCount = maleCount + femaleCount;

  return (
    <>
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
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-asel-orange">
                    Course registration
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-asel-navy">
                    Start your ASEL enrolment
                  </h2>
                </div>
                <button
                  aria-label="Close signup modal"
                  onClick={closeModal}
                  className="rounded-full p-2 text-asel-navy hover:bg-asel-off-white"
                >
                  <X />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto text-asel-yellow" size={64} />
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    Thank you for registering interest.
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg text-asel-mid-gray">
                    ASEL Africa will be in touch within 2 business days with cohort details
                    and next steps.
                  </p>
                  <Button className="mt-8" onClick={closeModal}>
                    Close
                  </Button>
                </div>
              ) : (
                <form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Registrant type switcher */}
                  <div className="grid gap-3 rounded-xl bg-asel-off-white p-2 sm:grid-cols-2">
                    {(["individual", "organisation"] as RegistrantType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setRegistrantType(type)}
                        className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
                          registrantType === type
                            ? "bg-asel-navy text-white"
                            : "text-asel-navy hover:bg-white"
                        }`}
                      >
                        {type === "individual" ? "Individual Learner" : "Organisation / Institution"}
                      </button>
                    ))}
                  </div>

                  {/* ── INDIVIDUAL FIELDS ── */}
                  {registrantType === "individual" ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <Field
                        label="Full Name"
                        required
                        error={errors.full_name?.message}
                      >
                        <input
                          {...register("full_name", {
                            required: "Full name is required",
                          })}
                          className={inputCls(!!errors.full_name)}
                          placeholder="Your full name"
                        />
                      </Field>

                      <Field label="Gender">
                        <select
                          value={gender}
                          onChange={(e) =>
                            setGender(e.target.value as typeof gender)
                          }
                          className={inputCls(false)}
                        >
                          <option value="prefer_not">Prefer not to say</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </Field>

                      {/* Live fee pill */}
                      <div className="md:col-span-2">
                        {gender === "female" ? (
                          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm">
                            <p className="font-bold text-green-800">
                              Women's Workforce Discount applied
                            </p>
                            <p className="text-green-700">
                              Estimated fee:{" "}
                              <strong>GHS {individualFee.toLocaleString()}</strong>{" "}
                              <span className="text-xs">(50% off standard GHS 1,300)</span>
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-xl bg-asel-off-white px-4 py-3 text-sm text-asel-navy">
                            Estimated fee:{" "}
                            <strong>GHS {individualFee.toLocaleString()}</strong>
                          </div>
                        )}
                      </div>

                      <Field
                        label="Email"
                        required
                        className="md:col-span-2"
                        error={errors.email?.message}
                      >
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: EMAIL_PATTERN,
                              message: "Enter a valid email address (e.g. name@example.com)",
                            },
                          })}
                          className={inputCls(!!errors.email)}
                          placeholder="you@example.com"
                        />
                      </Field>

                      <Field
                        label="Phone"
                        className="md:col-span-2"
                        error={phoneError ?? undefined}
                      >
                        <PhoneInput value={phone} onChange={setPhone} />
                      </Field>

                      <Field label="Country">
                        <CountrySelect value={country} onChange={setCountry} />
                      </Field>

                      <Field label="Highest Education Level">
                        <select
                          {...register("education_level")}
                          className={inputCls(false)}
                        >
                          <option>Secondary / TVET</option>
                          <option>Diploma</option>
                          <option>Undergraduate</option>
                          <option>Postgraduate</option>
                          <option>Professional</option>
                        </select>
                      </Field>

                      <Field label="Program of Interest">
                        <select {...register("program")} className={inputCls(false)}>
                          {programs.map((p) => (
                            <option key={p.id}>{p.title}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Preferred Format">
                        <select
                          {...register("preferred_format")}
                          className={inputCls(false)}
                        >
                          <option>In-Person</option>
                          <option>Hybrid</option>
                          <option>Online</option>
                        </select>
                      </Field>

                      <Field
                        label="How did you hear about us?"
                        className="md:col-span-2"
                      >
                        <input
                          {...register("referral_source")}
                          className={inputCls(false)}
                          placeholder="LinkedIn, referral, event..."
                        />
                      </Field>
                    </div>
                  ) : (
                    /* ── ORGANISATION FIELDS ── */
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <Field
                        label="Organisation Name"
                        required
                        error={errors.organisation_name?.message}
                      >
                        <input
                          {...register("organisation_name", {
                            required: "Organisation name is required",
                          })}
                          className={inputCls(!!errors.organisation_name)}
                          placeholder="Your organisation"
                        />
                      </Field>

                      <Field label="Organisation Type">
                        <select
                          {...register("organisation_type")}
                          className={inputCls(false)}
                        >
                          <option>NGO</option>
                          <option>Government</option>
                          <option>Private</option>
                          <option>Academic</option>
                          <option>Development partner</option>
                        </select>
                      </Field>

                      <Field
                        label="Contact Person Name"
                        required
                        error={errors.contact_name?.message}
                      >
                        <input
                          {...register("contact_name", {
                            required: "Contact name is required",
                          })}
                          className={inputCls(!!errors.contact_name)}
                          placeholder="Full name"
                        />
                      </Field>

                      <Field
                        label="Contact Email"
                        required
                        error={errors.email?.message}
                      >
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: EMAIL_PATTERN,
                              message: "Enter a valid email address",
                            },
                          })}
                          className={inputCls(!!errors.email)}
                          placeholder="contact@organisation.org"
                        />
                      </Field>

                      <Field
                        label="Phone"
                        className="md:col-span-2"
                        error={phoneError ?? undefined}
                      >
                        <PhoneInput value={phone} onChange={setPhone} />
                      </Field>

                      <Field label="Country">
                        <CountrySelect value={country} onChange={setCountry} />
                      </Field>

                      {/* Participant gender breakdown */}
                      <div className="md:col-span-2">
                        <p className="mb-3 text-sm font-bold text-asel-navy">
                          Participant Breakdown
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Male participants">
                            <input
                              type="number"
                              min="0"
                              value={maleCount === 0 ? "" : maleCount}
                              placeholder="0"
                              onChange={(e) =>
                                setMaleCount(Math.max(0, parseInt(e.target.value) || 0))
                              }
                              className={inputCls(false)}
                            />
                          </Field>
                          <Field label="Female participants">
                            <input
                              type="number"
                              min="0"
                              value={femaleCount === 0 ? "" : femaleCount}
                              placeholder="0"
                              onChange={(e) =>
                                setFemaleCount(Math.max(0, parseInt(e.target.value) || 0))
                              }
                              className={inputCls(false)}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* Live org fee */}
                      {orgCount > 0 && (
                        <div className="md:col-span-2">
                          <div className="rounded-xl bg-asel-off-white px-4 py-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-asel-mid-gray">
                                Total participants:{" "}
                                <strong className="text-asel-navy">{orgCount}</strong>
                              </p>
                              {(orgCount < 10 || orgCount > 20) && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                                  Outside 10–20 range
                                </span>
                              )}
                            </div>
                            <p className="mt-2 font-display text-2xl font-extrabold text-asel-navy">
                              GHS {orgTotal.toLocaleString()}
                            </p>
                            <p className="mt-0.5 text-xs text-asel-mid-gray">
                              {maleCount} × GHS 1,300
                              {femaleCount > 0
                                ? ` + ${femaleCount} × GHS 650 (women's discount)`
                                : ""}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowFeePolicy(true)}
                            className="mt-2 text-xs font-bold text-asel-navy underline underline-offset-2 hover:text-asel-orange"
                          >
                            View full fee policy →
                          </button>
                        </div>
                      )}

                      <Field label="Program of Interest">
                        <select {...register("program")} className={inputCls(false)}>
                          {programs.map((p) => (
                            <option key={p.id}>{p.title}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Preferred Format">
                        <select
                          {...register("preferred_format")}
                          className={inputCls(false)}
                        >
                          <option>In-Person</option>
                          <option>Hybrid</option>
                          <option>Online</option>
                        </select>
                      </Field>

                      <Field
                        label="Brief Message / Requirements"
                        className="md:col-span-2"
                      >
                        <textarea
                          rows={4}
                          {...register("message")}
                          className={inputCls(false)}
                          placeholder="Describe your training needs..."
                        />
                      </Field>
                    </div>
                  )}

                  {submitError ? (
                    <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      {submitError}
                    </p>
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

      {showFeePolicy && <FeePolicyModal onClose={() => setShowFeePolicy(false)} />}
    </>
  );
}

/** Helper: returns Tailwind input classes, with red border if error */
function inputCls(hasError: boolean) {
  return `w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-asel-navy focus:ring-2 focus:ring-asel-navy/10 ${
    hasError ? "border-red-400 bg-red-50/30" : "border-asel-navy/15 bg-white"
  }`;
}

function Field({
  label,
  children,
  required,
  error,
  className = "",
}: {
  label: string;
  children: React.ReactElement;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label className="text-sm font-bold text-asel-navy">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
