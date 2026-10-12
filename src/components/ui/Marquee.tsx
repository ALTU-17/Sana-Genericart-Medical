"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Slows the strip down - handy for long rows on small screens. */
  slow?: boolean;
  reverse?: boolean;
};

/**
 * A seamless horizontal loop.
 *
 * The content is rendered twice and the track is translated by exactly -50%,
 * so the second copy lands where the first started and the jump is invisible.
 * Pure CSS, so it keeps running smoothly without a JS animation loop.
 */
export function Marquee({ children, className, slow, reverse }: MarqueeProps) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max hover:[animation-play-state:paused]",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
