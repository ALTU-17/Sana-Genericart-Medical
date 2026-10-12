"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Shows a soft light that follows the pointer. */
  glow?: boolean;
};

/**
 * A glass panel that leans toward the pointer, with a highlight that tracks it.
 * Falls back to a plain card on touch devices and for reduced-motion users.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  glow = true,
}: TiltCardProps) {
  const rotateX = useSpring(0, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 20 });
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const light = useMotionTemplate`radial-gradient(340px circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.55), transparent 62%)`;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set((0.5 - py) * max * 2);
    lightX.set(px * 100);
    lightY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  return (
    <motion.div
      className={cn("preserve-3d relative", className)}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {glow ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: light }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}
