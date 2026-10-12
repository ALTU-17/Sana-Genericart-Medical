"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "glass" | "outline" | "gold" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_18px_38px_-16px_rgba(11,109,118,0.75)] hover:bg-brand-700",
  glass:
    "glass text-brand-800 hover:bg-white/80",
  outline:
    "border border-brand-600/35 bg-white/45 text-brand-800 backdrop-blur-md hover:border-brand-600/70 hover:bg-white/70",
  gold: "bg-gold text-brand-950 shadow-[0_18px_38px_-16px_rgba(245,165,36,0.8)] hover:brightness-105",
  ghost: "text-brand-800 hover:bg-brand-50",
};

type MagneticProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** How far the button is allowed to drift, as a fraction of cursor offset. */
  strength?: number;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  /** Adds rel="noreferrer" and target="_blank" for outbound links. */
  external?: boolean;
  fullWidth?: boolean;
};

/**
 * A button that drifts a few pixels toward the pointer, then springs back.
 * Renders as an <a> when given `href`, otherwise as a <button>.
 *
 * Note: the base class sets `inline-flex`, and Tailwind emits that after
 * `hidden`, so passing `hidden` (or `hidden md:inline-flex`) through
 * `className` will NOT hide it. Hide the wrapper element instead.
 */
export function MagneticButton({
  children,
  className,
  variant = "primary",
  icon,
  strength = 0.22,
  href,
  onClick,
  ariaLabel,
  title,
  external,
  fullWidth,
}: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    // Touch devices have no hover, and the drift would fight the scroll.
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength * 0.8);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5",
    "text-[0.95rem] font-semibold tracking-tight whitespace-nowrap",
    "transition-colors duration-200 will-change-transform",
    "focus-visible:outline-2 focus-visible:outline-offset-3",
    fullWidth && "w-full",
    VARIANT_CLASSES[variant],
    className,
  );

  const inner = (
    <>
      {icon ? (
        <span className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {/* Sheen that sweeps across on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span className="absolute -inset-y-4 -left-1/3 w-1/3 rotate-12 bg-white/25 opacity-0 blur-md transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />
      </span>
    </>
  );

  const motionProps = {
    style: { x: springX, y: springY },
    className: classes,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    "data-animate": true,
  } as const;

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        aria-label={ariaLabel}
        title={title}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
    >
      {inner}
    </motion.button>
  );
}
