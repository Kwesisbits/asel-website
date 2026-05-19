import { Award, BriefcaseBusiness, Cpu, GraduationCap, Layers3, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { TestimonialCard } from "../components/ui/TestimonialCard";
import { Button } from "../components/ui/Button";

export function WhatWeDo() {
  return (
    <main className="pt-20">
      <section className="bg-asel-off-white py-20">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-asel-orange">Education</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Bridging Theory and Practice in Sustainable Energy</h1>
            <p className="mt-6 text-lg text-asel-mid-gray">ASEL delivers integrated education programs that combine hands-on technical training with digital competencies for Africa's evolving energy sector.</p>
          </div>
          <div className="rounded-3xl bg-asel-navy p-8 text-white shadow-2xl">
            <GraduationCap className="text-asel-yellow" size={46} />
            <h2 className="mt-6 font-display text-3xl font-bold">Hybrid, stackable, practical.</h2>
            <p className="mt-4 text-white/72">Cohorts combine in-person and virtual learning, mentorship, and job-placement support.</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-shell grid gap-6 md:grid-cols-3">
          {[[Wrench, "Technical", "Applied labs and field exercises."], [Cpu, "Digital", "Analytics, GIS, modeling, and project systems."], [BriefcaseBusiness, "Career", "Venture building, policy, and leadership support."]].map(([Icon, title, copy]) => {
            const TypedIcon = Icon as typeof Wrench;
            return (
              <article key={title as string} className="rounded-lg border-l-4 border-asel-yellow bg-white p-7 shadow-sm">
                <TypedIcon className="text-asel-yellow" />
                <h2 className="mt-4 font-display text-2xl font-bold">{title as string}</h2>
                <p className="mt-2 text-asel-mid-gray">{copy as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-asel-navy py-20 text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-yellow">How We Deliver</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold">Learning built around access, affordability, and scale.</h2>
          </div>
          <div className="grid gap-4">
            {["Hybrid learning for in-person and virtual participation", "Stackable certifications across technical and digital pathways", "Mentorship and job-placement support as part of community support", "Programs customizable for students, developers, and public agencies"].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white/10 p-4"><Layers3 className="shrink-0 text-asel-yellow" /> <span>{item}</span></div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-asel-off-white py-20">
        <div className="container-shell">
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <Award className="text-asel-yellow" size={40} />
            <h2 className="mt-4 font-display text-3xl font-bold">Aligned with Ghana Energy Compact priorities</h2>
            <p className="mt-4 max-w-4xl text-asel-mid-gray">ASEL's digital education programs support energy sector digitalization, improved service delivery, and cross-sector integration between energy and digital technologies.</p>
            <Button className="mt-8" variant="dark"><Link to="/programs">Explore Programs</Link></Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <TestimonialCard quote="The practical emphasis made technical concepts feel usable in the field." name="Graduate TBA" role="Solar trainee" />
            <TestimonialCard quote="ASEL connects digital skills to the energy problems teams are solving now." name="Graduate TBA" role="Energy analyst" />
            <TestimonialCard quote="The cohort model creates accountability and momentum." name="Partner TBA" role="Institutional partner" />
          </div>
        </div>
      </section>
    </main>
  );
}
