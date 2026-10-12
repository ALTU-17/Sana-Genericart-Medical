"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { en, type Dictionary } from "./en";
import { mr } from "./mr";

export type Lang = "en" | "mr";

const DICTS: Record<Lang, Dictionary> = { en, mr };
const STORAGE_KEY = "sana-medical:lang";

/* -------------------------------------------------------------------------
   A tiny external store for the chosen language.

   Reading localStorage during render would desynchronise hydration, and
   writing state from an effect would cost an extra render pass on every page
   load. useSyncExternalStore is built for exactly this: the server snapshot is
   always English, and React swaps to the visitor's saved language right after
   hydration without a warning.
------------------------------------------------------------------------- */

let current: Lang = "en";
let hydrated = false;
const listeners = new Set<() => void>();

function readPreference(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "mr") return stored;
  } catch {
    // Private mode or blocked storage - fall through to the browser locale.
  }
  return navigator.language?.toLowerCase().startsWith("mr") ? "mr" : "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  if (!hydrated) {
    current = readPreference();
    hydrated = true;
  }
  return current;
}

/** Prerendered HTML and the first client render must agree, so: always English. */
function getServerSnapshot(): Lang {
  return "en";
}

function applyLang(next: Lang) {
  current = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice simply will not persist.
  }
  listeners.forEach((listener) => listener());
}

type LanguageValue = {
  lang: Lang;
  /** The copy for the active language. */
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep the document language in step for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => applyLang(next), []);
  const toggle = useCallback(
    () => applyLang(lang === "en" ? "mr" : "en"),
    [lang],
  );

  const value = useMemo<LanguageValue>(
    () => ({ lang, t: DICTS[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return value;
}

/** Replace `{{name}}` placeholders in a translated string. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{{${key}}}`,
  );
}

export { en, mr };
export type { Dictionary };
