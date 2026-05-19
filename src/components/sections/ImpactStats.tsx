import { StatCounter } from "../ui/StatCounter";

export function ImpactStats() {
  return (
    <section className="bg-asel-yellow py-9 text-asel-navy">
      <div className="container-shell grid grid-cols-2 gap-7 md:grid-cols-4">
        <StatCounter value={500} label="Trained" suffix="+" />
        <StatCounter value={4} label="Program Tracks" />
        <StatCounter value={3} label="Countries" />
        <StatCounter value={60} label="Women Enrolled" suffix="%" />
      </div>
    </section>
  );
}
