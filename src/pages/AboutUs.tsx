import { Globe2, Lightbulb, Target, UsersRound } from "lucide-react";

const values = ["Impact-driven", "Inclusion & equity", "Excellence", "Innovation", "Collaboration", "Sustainability"];

export function AboutUs() {
  return (
    <main className="pt-20">
      <section className="solar-mesh py-24 text-white">
        <div className="container-shell max-w-4xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-asel-yellow">About ASEL Africa</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Building Africa's Inclusive Energy Workforce</h1>
          <p className="mt-6 text-lg text-white/75">A workforce development and advisory organization focused on sustainable energy training, education, and advocacy with gender inclusion at the core.</p>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-asel-off-white p-8">
            <UsersRound className="text-asel-yellow" size={44} />
            <h2 className="mt-5 font-display text-3xl font-bold">Our Story</h2>
          </div>
          <div className="text-lg leading-8 text-asel-mid-gray">
            <p>ASEL bridges the gap between academic theory and industry practice, preparing practitioners who design, deploy, and manage modern power systems.</p>
            <p className="mt-5">The organization develops capable, inclusive teams that deliver reliable, scalable clean power across African contexts.</p>
          </div>
        </div>
      </section>
      <section className="bg-asel-off-white py-20">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-asel-navy p-8 text-white">
            <Target className="text-asel-yellow" />
            <h2 className="mt-5 font-display text-3xl font-bold">Vision</h2>
            <p className="mt-4 text-white/75">To build Africa's most inclusive and highly skilled sustainable energy workforce, accelerating electrification and enabling climate-resilient economies.</p>
          </article>
          <article className="rounded-2xl bg-asel-yellow p-8 text-asel-navy">
            <Lightbulb />
            <h2 className="mt-5 font-display text-3xl font-bold">Mission</h2>
            <p className="mt-4">ASEL empowers Africa's workforce, particularly women, through industry-aligned training, education, and advocacy in sustainable energy.</p>
          </article>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container-shell">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">Core values</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold">Values that guide partnerships and learning.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article key={value} className="rounded-lg border border-asel-navy/10 p-6 transition hover:border-asel-yellow hover:bg-asel-off-white">
                <Globe2 className="text-asel-yellow" />
                <h3 className="mt-4 font-display text-xl font-bold">{value}</h3>
                <p className="mt-2 text-sm text-asel-mid-gray">A practical standard for inclusive, high-quality energy workforce development.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-asel-off-white py-20">
        <div className="container-shell">
          <h2 className="font-display text-4xl font-extrabold">Meet the Team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((member) => (
              <article key={member} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-asel-yellow/20 font-display text-2xl font-bold text-asel-navy">TBA</div>
                <h3 className="mt-4 font-display text-lg font-bold">Team member TBA</h3>
                <p className="text-sm text-asel-mid-gray">Leadership role</p>
              </article>
            ))}
          </div>
          <blockquote className="mt-12 border-l-4 border-asel-yellow bg-white p-8 font-display text-2xl font-bold leading-relaxed">
            “ASEL Africa is positioning itself to become a leading platform for sustainable energy workforce transformation across Africa.”
          </blockquote>
        </div>
      </section>
    </main>
  );
}
