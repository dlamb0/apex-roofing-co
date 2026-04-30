"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Section";
import { STATS } from "@/lib/constants";

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isDecimal = target % 1 !== 0;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = eased * target;
            setCurrent(isDecimal ? Math.min(value, target) : Math.floor(value));
            if (progress < 1) requestAnimationFrame(animate);
            else setCurrent(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const isDecimal = target % 1 !== 0;
  const display = isDecimal ? current.toFixed(1) : current.toLocaleString();

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-brand-orange py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
