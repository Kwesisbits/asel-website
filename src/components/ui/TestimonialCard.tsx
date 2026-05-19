interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <article className="rounded-lg border-l-4 border-asel-yellow bg-white p-6 shadow-sm">
      <p className="text-lg text-asel-navy">"{quote}"</p>
      <div className="mt-5 font-bold">{name}</div>
      <div className="text-sm text-asel-mid-gray">{role}</div>
    </article>
  );
}
