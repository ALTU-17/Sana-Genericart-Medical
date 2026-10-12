"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type CounterProps = {
  to: number;
  /** Appended straight after the number, e.g. "%" or " hrs". */
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/** Counts up to `to` the first time it scrolls into view. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.7,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // A zero duration lands on the final number immediately, so there is no
    // separate reduced-motion branch that would set state inside the effect.
    const controls = animate(0, to, {
      duration: reduced ? 0 : duration,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
      onComplete: () => setValue(to),
    });

    return () => controls.stop();
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
