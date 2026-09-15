"use client";

import { useEffect, useSyncExternalStore } from "react";

type VisitStatus = "loading" | "first" | "repeat";

const noopSubscribe = () => () => {};

function readVisitStatus(key: string): "first" | "repeat" {
  try {
    return window.localStorage.getItem(key) ? "repeat" : "first";
  } catch {
    return "first";
  }
}

export function useFirstVisit(key: string): VisitStatus {
  const status = useSyncExternalStore<VisitStatus>(
    noopSubscribe,
    () => readVisitStatus(key),
    () => "loading"
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, "1");
    } catch {}
  }, [key]);

  return status;
}
