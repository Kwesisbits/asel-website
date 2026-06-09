import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Zap } from "lucide-react";
import { programs } from "../../data/programs";
import { Button } from "../ui/Button";

interface HeroSlideshowProps {
  onEnroll: (program?: string) => void;
}

const AUTOPLAY_MS = 6000;

const slides = [
  {
    id: "training",
    image: "/Image of Training.jpeg",
    badge: "Partnership",
    headline: "Training Young Professionals in the Field",
    body: "ASEL Africa partnered with Dream Renewables to connect young professionals with hands-on renewable energy experience.",
    cta: { label: "View Programs", href: "/programs" as const, external: false },
  },
  {
    id: "award",
    image: "/CEO Award.PNG",
    badge: "Recognition",
    headline: "TUM SEED Center Award",
    body: "Recognized on International Day of the Girl Child for advancing renewable energy training for women and girls in Ghana.",
    cta: {
      label: "Read the Story",
      href: "https://www.linkedin.com/posts/empower-power-international-share-7382798793022550016-l6Js/?utm_source=share&utm_medium=member_ios&rcm=ACoAADMq4OEBpMzB7-pznNczL5IG1Xnl9WuspU0",
      external: true,
    },
  },
] as const;

export function HeroSlideshow({ onEnroll }: HeroSlideshowProps) {
  // 0 = training, 1 = award, 2 = course card
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = slides.length + 1; // +1 for course card

  const go = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent((idx + total) % total);
    },
    [current, total],
  );

  const next = useCallback(() => go((current + 1) % total), [go, current, total]);
  const prev = useCallback(() => go((current - 1 + total) % total), [go, current, total]);

  useEffect(() => {
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, next]);

  return (
    <div className="relative hidden lg:block">
      <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-asel-yellow/25 blur-3xl pointer-events-none" />

      <div className="animate-float rounded-[2rem] border border-white/15 bg-white/12 p-4 shadow-2xl backdrop-blur-md">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-asel-off-white">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
            >
              {current < slides.length ? (
                <ImageSlide slide={slides[current]} />
              ) : (
                <CourseSlide onEnroll={onEnroll} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation row */}
        <div className="mt-3 flex items-center justify-between px-1">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-asel-yellow" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next slide"
            className="rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageSlide({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <>
      <div className="relative h-60 overflow-hidden">
        <img
          src={slide.image}
          alt={slide.headline}
          className="h-full w-full object-cover"
        />
        {/* Subtle bottom fade only — no heavy gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6 text-asel-navy">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-asel-orange">
          {slide.badge}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug">{slide.headline}</h3>
        <p className="mt-2 text-sm text-asel-mid-gray leading-relaxed">{slide.body}</p>
        {slide.cta.external ? (
          <a
            href={slide.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-asel-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-asel-navy/80"
          >
            {slide.cta.label} <ExternalLink size={14} />
          </a>
        ) : (
          <a
            href={slide.cta.href}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-asel-yellow px-5 py-2.5 text-sm font-bold text-asel-navy transition hover:bg-asel-yellow/90"
          >
            {slide.cta.label} <ArrowRight size={14} />
          </a>
        )}
      </div>
    </>
  );
}

function CourseSlide({ onEnroll }: { onEnroll: (program?: string) => void }) {
  return (
    <>
      <div className="h-60 bg-[linear-gradient(135deg,rgba(245,168,0,.85),rgba(26,46,74,.92)),url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
      <div className="p-6 text-asel-navy">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-asel-orange">
          <Zap size={15} /> Next Cohort
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug">{programs[0].title}</h3>
        <p className="mt-2 text-sm text-asel-mid-gray">
          Hands-on installation, safety, commissioning, and maintenance.
        </p>
        <Button className="mt-4" onClick={() => onEnroll(programs[0].title)}>
          Enroll Now <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
