import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface PhotoFeatureCta {
  label: string;
  href: string;
  external?: boolean;
}

interface PhotoFeatureProps {
  image: string;
  alt: string;
  badge: string;
  headline: string;
  body: string;
  imageLeft?: boolean;
  dark?: boolean;
  cta?: PhotoFeatureCta;
}

export function PhotoFeature({
  image,
  alt,
  badge,
  headline,
  body,
  imageLeft = true,
  dark = false,
  cta,
}: PhotoFeatureProps) {
  return (
    <section className="overflow-hidden">
      <div className={`grid lg:grid-cols-2 ${!imageLeft ? "lg:flex-row-reverse" : ""}`}>
        {/* Image panel */}
        <div
          className={`relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-[520px] ${
            !imageLeft ? "lg:order-2" : ""
          }`}
        >
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Text panel */}
        <div
          className={`flex flex-col justify-center px-8 py-16 lg:px-16 ${
            dark ? "bg-asel-navy text-white" : "bg-white text-asel-navy"
          } ${!imageLeft ? "lg:order-1" : ""}`}
        >
          <p
            className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${
              dark ? "text-asel-yellow" : "text-asel-orange"
            }`}
          >
            {badge}
          </p>
          <h2
            className={`mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl ${
              dark ? "text-white" : "text-asel-navy"
            }`}
          >
            {headline}
          </h2>
          <p
            className={`mt-5 text-lg leading-relaxed ${
              dark ? "text-white/75" : "text-asel-mid-gray"
            }`}
          >
            {body}
          </p>

          {cta &&
            (cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                  dark
                    ? "bg-asel-yellow text-asel-navy hover:bg-asel-yellow/90"
                    : "bg-asel-navy text-white hover:bg-asel-navy/80"
                }`}
              >
                {cta.label} <ExternalLink size={14} />
              </a>
            ) : (
              <Link
                to={cta.href}
                className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                  dark
                    ? "bg-asel-yellow text-asel-navy hover:bg-asel-yellow/90"
                    : "bg-asel-navy text-white hover:bg-asel-navy/80"
                }`}
              >
                {cta.label} <ArrowRight size={14} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
