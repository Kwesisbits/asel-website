import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatCounter({ value, label, prefix = "", suffix = "" }: StatCounterProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let frame = 0;
    const frames = 42;
    const interval = window.setInterval(() => {
      frame += 1;
      setCount(Math.round((value * frame) / frames));
      if (frame >= frames) window.clearInterval(interval);
    }, 24);
    return () => window.clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold md:text-5xl">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-1 font-mono text-xs uppercase tracking-[0.18em]">{label}</div>
    </div>
  );
}
