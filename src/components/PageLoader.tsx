"use client";

import { useEffect, useState, useRef } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }
    }, 20);

    const fallbackTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 400);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-between p-8 sm:p-12 select-none overflow-hidden transition-all duration-500 ease-in-out ${
        fadeOut ? "opacity-0 -translate-y-8 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Top Brand Tag */}
      <div className="w-full flex justify-between items-center max-w-7xl text-[11px] font-mono tracking-widest text-amber-500/80 uppercase">
        <span>[ SYSTEM_INIT ]</span>
        <span>DPS DIGITS • KANPUR, IN</span>
      </div>

      {/* Center Animated Emblem & Counter */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Outer glowing aura */}
          <div className="absolute w-32 h-32 bg-amber-500/25 rounded-full blur-2xl animate-pulse" />

          {/* Official Emblem Logo */}
          {/* eslint-disable-next-html-element-for-img */}
          <img
            src="/logo.png"
            alt="DPS Digits Emblem"
            className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] animate-pulse"
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans glitch-text" data-text="DPS DIGITS">
            DPS DIGITS
          </h2>
          <p className="text-xs font-mono tracking-wider text-amber-400 uppercase">
            Delhi Public School Azaad Nagar
          </p>
        </div>
      </div>

      {/* Bottom Counter */}
      <div className="w-full max-w-7xl flex items-end justify-between font-mono">
        <div className="text-[11px] tracking-widest text-zinc-500 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>LOADING CORE ENGINE</span>
        </div>
        <div className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
          <span>{String(count).padStart(3, "0")}</span>
          <span className="text-xs text-amber-400 font-mono ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
