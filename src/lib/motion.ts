import type { Transition, Variants } from "framer-motion";

/** A long, confident ease-out - the backbone of the whole site's motion. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SOFT: [number, number, number, number] = [0.33, 1, 0.68, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 30,
};

/** Shared viewport config: animate once, slightly before the element is centred. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.05 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Parent that releases its children one after another. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: springSnappy },
} satisfies Record<string, unknown>;

/** Word-by-word heading reveal. */
export const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.08 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -55 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};
