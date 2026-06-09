import { ArrowRight, BookOpen, ExternalLink, FileText } from "lucide-react";

const articles = [
  {
    id: "ghana-summit",
    tag: "Policy",
    tagColor: "bg-asel-navy/8 text-asel-navy",
    accentColor: "border-l-asel-navy",
    icon: BookOpen,
    title: "Ghana's Withdrawal from the Africa Energies Summit",
    subtitle: "A Defining Moment for Energy Sovereignty",
    description:
      "An analysis of Ghana's decision and its wider implications for African energy policy, national sovereignty, and the continent's approach to international energy forums.",
    link: "https://medium.com/@aselafricanews/ghanas-withdrawal-from-the-africa-energies-summit-a-defining-moment-for-energy-sovereignty-71c5778008c8",
    external: true,
    cta: "Read on Medium",
  },
  {
    id: "gender-brief",
    tag: "Research Brief",
    tagColor: "bg-asel-yellow/15 text-asel-navy",
    accentColor: "border-l-asel-yellow",
    icon: FileText,
    title: "Advancing Gender Mainstreaming in the Energy Sector",
    subtitle: "ASEL Africa Gender Equality Brief",
    description:
      "Women hold 32% of renewable energy workforce positions but only 11% of technical roles — far from the ECOWAS 2030 target. This brief examines the frameworks, gaps, and operational levers for transformation.",
    link: "/ASEL_Gender_Brief_.pdf",
    external: true,
    cta: "Download Brief",
  },
  {
    id: "ceo-award",
    tag: "Impact Story",
    tagColor: "bg-asel-orange/10 text-asel-orange",
    accentColor: "border-l-asel-orange",
    icon: BookOpen,
    title: "Recognized on International Day of the Girl Child",
    subtitle: "TUM SEED Center Award for Women in Energy",
    description:
      "ASEL Africa's Founder & CEO received an award from the TUM SEED Center in recognition of our work promoting renewable energy training for women and girls in Ghana. Every girl can become a catalyst for sustainable change.",
    link: "https://www.linkedin.com/posts/empower-power-international-share-7382798793022550016-l6Js/?utm_source=share&utm_medium=member_ios&rcm=ACoAADMq4OEBpMzB7-pznNczL5IG1Xnl9WuspU0",
    external: true,
    cta: "Read on LinkedIn",
  },
] as const;

export function ArticlesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-orange">
              Perspectives
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
              Ideas from ASEL Africa
            </h2>
          </div>
          <p className="max-w-sm text-sm text-asel-mid-gray sm:text-right">
            Policy, research, and stories from the front lines of Africa's energy transition.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map(({ id, tag, tagColor, accentColor, icon: Icon, title, subtitle, description, link, external, cta }) => (
            <article
              key={id}
              className={`flex flex-col rounded-xl border border-asel-navy/8 border-l-4 ${accentColor} bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide ${tagColor}`}>
                  {tag}
                </span>
                <Icon size={18} className="mt-0.5 shrink-0 text-asel-mid-gray/60" />
              </div>

              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-asel-navy">
                {title}
              </h3>
              <p className="mt-1 font-mono text-xs font-medium text-asel-orange uppercase tracking-wide">
                {subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-asel-mid-gray">
                {description}
              </p>

              <a
                href={link}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-asel-navy transition hover:text-asel-orange"
              >
                {cta}
                {external ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
