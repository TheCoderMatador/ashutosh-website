"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return getSystemTheme();
}

function subscribe(callback: () => void) {
  window.addEventListener("ak-theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ak-theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    readTheme,
    () => null
  );

  useLayoutEffect(() => {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggle() {
    const current = theme ?? "dark";
    const next: Theme = current === "light" ? "dark" : "light";
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new Event("ak-theme-change"));
  }

  const showLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={showLight ? "Switch to dark theme" : "Switch to light theme"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-foreground"
    >
      {showLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
