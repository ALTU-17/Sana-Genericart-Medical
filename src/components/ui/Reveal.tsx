"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  duration?: number;
  /** Vertical travel in pixels. Use 0 for a pure fade. */
  y?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  once?: boolean;
};

/**
 * Fade-and-rise as the element scrolls into view.
 *
 * `data-animate` is what the <noscript> rule in the layout targets, so the
 * content is never left invisible if JavaScript fails to load.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  y = 28,
  amount = 0.2,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      data-animate
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = { hidden: {}, show: {} };

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
};

/** Parent that releases its <RevealItem> children one after another. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
  once = true,
}: RevealGroupProps) {
  return (
    <motion.div
      data-animate
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={groupVariants}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  /** Renders an <li> instead of a <div> when inside a list. */
  as?: "div" | "li" | "article";
};

/** A single child of <RevealGroup>. Inherits the parent's hidden/show labels. */
export function RevealItem({
  children,
  className,
  y = 26,
  duration = 0.7,
  as = "div",
}: RevealItemProps) {
  const Component =
    as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <Component
      data-animate
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/**
 * Heading that reveals word by word. Rendered as real text so search engines
 * and screen readers get a normal sentence.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {/* Assistive tech reads the plain sentence; the visual copy is decorative. */}
      <span className="sr-only">{text}</span>
      <motion.span
        data-animate
        aria-hidden
        className={cn("inline-block", className)}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.4 }}
        variants={groupVariants}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { opacity: 0, y: "1.05em" },
                show: { opacity: 1, y: "0em" },
              }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </>
  );
}
