"use client";

import { useSyncExternalStore } from "react";

// The theme is external state (a class on <html>, set by an inline script
// before hydration). Subscribe to it rather than copying it into React state.
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => obs.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => null;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="font-sans text-sm text-ink-2 hover:text-ink transition-colors"
    >
      {dark === null ? "◐" : dark ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
