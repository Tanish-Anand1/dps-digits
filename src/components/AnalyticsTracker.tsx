"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    // 1. Fire initial page view event
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        action: "PAGE_VIEW",
      }),
    }).catch(() => {});

    // 2. Global click listener for tracking user interactions
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button']") as HTMLElement | null;
      if (clickable) {
        const linkText =
          clickable.getAttribute("aria-label") ||
          clickable.textContent?.trim().substring(0, 60) ||
          clickable.tagName;

        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            action: "CLICK",
            linkText: linkText || "Unlabeled Click",
          }),
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
}
