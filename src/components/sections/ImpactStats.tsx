import { StatCounter } from "../ui/StatCounter";

const stats = [
  { value: 500, label: "Practitioners trained", suffix: "+" },
  { value: 4, label: "Program tracks" },
  { value: 3, label: "Countries reached" },
  { value: 60, label: "Women enrolled", suffix: "%" },
];

export function ImpactStats() {
  return (
    <section className="bg-asel-yellow py-10 text-asel-navy">
      <div className="container-shell grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <StatCounter value={s.value} label={s.label} suffix={s.suffix} />
          </div>
        ))}
      </div>
    </section>
  );
}
