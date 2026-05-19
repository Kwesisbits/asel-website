import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { submitInterest } from "../lib/supabaseClient";
import { Button } from "../components/ui/Button";

const faqs = [
  ["Who is ASEL for?", "Students, technicians, engineers, founders, public agencies, companies, and development partners building sustainable energy capacity."],
  ["How do I enroll?", "Choose a program and submit the registration form. ASEL will follow up with cohort details and next steps."],
  ["Do you offer scholarships?", "Scholarship availability depends on partner funding and cohort design."],
  ["Can organizations register groups?", "Yes. Organizations can register participants or request customized programs."],
  ["Are programs virtual?", "ASEL combines in-person, hybrid, and online delivery depending on the program."],
];

export function ContactUs() {
  const { register, handleSubmit, reset } = useForm<Record<string, string>>();
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(values: Record<string, string>) {
    await submitInterest("contact_messages", { ...values, created_at: new Date().toISOString() });
    setSubmitted(true);
    reset();
  }

  return (
    <main className="pt-20">
      <section className="bg-asel-navy py-20 text-white">
        <div className="container-shell">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-asel-yellow">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Let's Talk Energy</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Info icon={<Mail />} title="Email" value="hello@aselafrica.org" />
            <Info icon={<Phone />} title="Phone" value="+233 000 000 000" />
            <Info icon={<MapPin />} title="Location" value="Ghana" />
          </div>
        </div>
      </section>
      <section className="bg-asel-off-white py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl font-bold">Send a message</h2>
            <div className="mt-6 grid gap-4">
              <ContactField label="Name"><input required {...register("name")} /></ContactField>
              <ContactField label="Email"><input type="email" required {...register("email")} /></ContactField>
              <ContactField label="Subject"><select {...register("subject")}><option>Course enrollment</option><option>Partnership</option><option>Media</option><option>General inquiry</option></select></ContactField>
              <ContactField label="Message"><textarea rows={6} required {...register("message")} /></ContactField>
              {submitted ? <p className="rounded-lg bg-asel-yellow/20 p-3 text-sm font-bold text-asel-navy">Message received. ASEL will follow up shortly.</p> : null}
              <Button className="w-full">Submit</Button>
            </div>
          </form>
          <aside className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl font-bold">Visit or connect</h2>
            <div className="mt-6 grid h-60 place-items-center rounded-xl bg-asel-navy text-center text-white">
              <div>
                <MapPin className="mx-auto text-asel-yellow" />
                <p className="mt-3 font-bold">Map placeholder</p>
                <p className="text-sm text-white/70">Ghana-based operations</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold">FAQ</h3>
              <div className="mt-4 grid gap-3">
                {faqs.map(([q, a]) => (
                  <details key={q} className="rounded-lg bg-asel-off-white p-4">
                    <summary className="cursor-pointer font-bold">{q}</summary>
                    <p className="mt-2 text-sm text-asel-mid-gray">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="rounded-xl bg-white/10 p-5">{icon}<p className="mt-3 text-sm text-white/60">{title}</p><p className="font-bold">{value}</p></div>;
}

function ContactField({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-asel-navy">
      {label}
      <span className="[&>input]:w-full [&>input]:rounded-lg [&>input]:border [&>input]:border-asel-navy/15 [&>input]:px-4 [&>input]:py-3 [&>select]:w-full [&>select]:rounded-lg [&>select]:border [&>select]:border-asel-navy/15 [&>select]:px-4 [&>select]:py-3 [&>textarea]:w-full [&>textarea]:rounded-lg [&>textarea]:border [&>textarea]:border-asel-navy/15 [&>textarea]:px-4 [&>textarea]:py-3">{children}</span>
    </label>
  );
}
