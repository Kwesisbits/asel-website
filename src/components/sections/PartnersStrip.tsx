import { Button } from "../ui/Button";

export function PartnersStrip({ onPartnerClick }: { onPartnerClick: () => void }) {
  return (
    <section className="bg-white py-16">
      <div className="container-shell rounded-2xl bg-asel-navy p-8 text-white md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-asel-yellow">Alliances</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">Build talent pipelines and energy access programs with ASEL.</h2>
            <p className="mt-4 max-w-2xl text-white/70">We partner with governments, companies, academia, and development agencies to design market-relevant programs and strengthen ESG capabilities.</p>
          </div>
          <Button onClick={onPartnerClick}>Partner With Us</Button>
        </div>
      </div>
    </section>
  );
}
