"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Loader } from "@/components/loader/Loader";

type IntroValue = {
  /** True once the loader curtains have started to open. */
  revealed: boolean;
};

const IntroContext = createContext<IntroValue>({ revealed: false });

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * Sits above the page and coordinates the loader with the hero.
 *
 * The rest of the site renders underneath the whole time, so the hero is
 * already laid out when the curtains split - the reveal reads as one
 * continuous motion instead of a swap.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);
  const value = useMemo(() => ({ revealed }), [revealed]);

  return (
    <IntroContext.Provider value={value}>
      <Loader onReveal={reveal} />
      {children}
    </IntroContext.Provider>
  );
}
