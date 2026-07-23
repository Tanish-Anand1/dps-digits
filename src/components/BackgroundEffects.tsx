"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const { clientX, clientY } = e;
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${clientX}px ${clientY}px, rgba(212, 175, 55, 0.12), rgba(10, 10, 15, 0.02) 60%, transparent 100%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 bg-noise opacity-30 z-10" />

      {/* Scanline Layer */}
      <div className="absolute inset-0 bg-scanlines opacity-40 z-10" />

      {/* Mouse Reactive Gold Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-700 z-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 30%, rgba(212, 175, 55, 0.12), transparent 70%)",
        }}
      />

      {/* Gold Ambient Auroras */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-amber-950/20 blur-[150px] animate-aurora-gold pointer-events-none" />
      <div
        className="absolute top-[45%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-yellow-950/15 blur-[160px] animate-aurora-gold pointer-events-none"
        style={{ animationDelay: "-5s" }}
      />

      {/* Subtle Grid Pattern Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0" />
    </div>
  );
}
