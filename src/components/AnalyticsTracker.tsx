"use client";

import { useEffect } from "react";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "vid_ssr";
  let vid = localStorage.getItem("digits_visitor_id");
  if (!vid) {
    vid = "dev_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
    localStorage.setItem("digits_visitor_id", vid);
  }
  return vid;
}

export default function AnalyticsTracker() {
  useEffect(() => {
    // Check if this PC / browser has opted out of tracking (e.g. Admin PC)
    const isExcluded =
      localStorage.getItem("digits_ignore_analytics") === "true" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isExcluded) {
      return; // Skip analytics for admin/developer PC
    }

    const visitorId = getOrCreateVisitorId();

    // 1. Fire initial page view event
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
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
            visitorId,
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
