"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, Lock } from "lucide-react";

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
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedIP, setBlockedIP] = useState("");

  useEffect(() => {
    // Check if client IP is blocked on mount
    fetch("/api/track")
      .then((res) => res.json())
      .then((data) => {
        if (data.blocked) {
          setIsBlocked(true);
          setBlockedIP(data.ip || "");
        }
      })
      .catch(() => {});

    const isExcluded =
      localStorage.getItem("digits_ignore_analytics") === "true" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isExcluded) return;

    const visitorId = getOrCreateVisitorId();

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        path: window.location.pathname,
        action: "PAGE_VIEW",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.blocked) {
          setIsBlocked(true);
        }
      })
      .catch(() => {});

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

  // Access Denied Screen for Blocked Network IPs
  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-8 select-none overflow-hidden font-mono">
        <div className="max-w-lg w-full p-8 rounded-3xl bg-red-950/30 border border-red-500/50 space-y-6 text-center shadow-[0_0_60px_rgba(239,68,68,0.3)] hud-box">
          <div className="w-20 h-20 rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center text-red-400 mx-auto shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded bg-red-950 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-widest">
              HTTP 403 • ACCESS DENIED
            </span>
            <h1 className="text-2xl font-bold text-white font-sans tracking-tight">
              IP ADDRESS BLOCKED
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Your network IP address <code className="text-red-400 font-bold">{blockedIP || "171.x.x.x"}</code> has been blocked from accessing DPS Digits by the site administrator.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/80 border border-red-500/20 text-[11px] text-zinc-500 space-y-1 text-left">
            <div>STATUS: FORBIDDEN</div>
            <div>SECURITY ENCLAVE: ENFORCED</div>
            <div>CONTACT: contact@dpsdigits.org</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
