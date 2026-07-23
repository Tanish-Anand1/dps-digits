"use client";

import { useState, useRef } from "react";
import { Trophy, Crown, Medal, Star, Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

const REAL_ACHIEVEMENT_IMAGES = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: `/achievements/ach_${i + 1}.png`,
}));

const HIGHLIGHT_HONORS = [
  {
    title: "Overall National Champions",
    event: "TechNext National Symposium",
    category: "OVERALL PODIUM",
    place: "1ST PLACE",
    icon: Crown,
    color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
  },
  {
    title: "Best Cyber Defense Enclave",
    event: "All-India Inter-School CTF",
    category: "CYBERSECURITY",
    place: "GOLD MEDAL",
    icon: Trophy,
    color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
  },
  {
    title: "Hackathon Innovation Winner",
    event: "Northern Zone AI HackFest",
    category: "ARTIFICIAL INTELLIGENCE",
    place: "GRAND PRIZE",
    icon: Medal,
    color: "text-yellow-400 border-amber-500/30 bg-amber-950/20",
  },
  {
    title: "Algorithmic Excellence Trophy",
    event: "International Olympiad Prep",
    category: "COMPETITIVE PROGRAMMING",
    place: "NATIONAL TOP 3",
    icon: Star,
    color: "text-amber-300 border-amber-500/30 bg-amber-950/20",
  },
];

const MARQUEE_ITEMS = [
  "⚡ OVERALL CHAMPIONS - TECHFEST 2025",
  "🛡️ 1ST PLACE CTF - CYBER ENCLAVE",
  "🤖 BEST ROBOTICS DESIGN - ALL INDIA ROBO",
  "🚀 TOP 5 CODEFORCES SCHOOL CLUBS",
  "🏆 45+ NATIONAL TROPHIES SINCE 2018",
  "💡 DPS DIGITS EXCELLENCE ARCHIVE",
];

export default function Achievements() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? REAL_ACHIEVEMENT_IMAGES.length - 1 : (prev as number) - 1));
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === REAL_ACHIEVEMENT_IMAGES.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <section id="achievements" className="relative py-32 border-t border-amber-500/20 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE HALL OF EXCELLENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
              NATIONAL TROPHIES & <br />
              <span className="text-gradient-gold glitch-text" data-text="VERIFIED HONORS.">
                VERIFIED HONORS.
              </span>
            </h2>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-amber-400 font-bold hidden sm:inline uppercase">
              21 VERIFIED TROPHIES (SWIPE / ARROWS)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-white hover:bg-amber-400 hover:text-black hover:border-amber-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-white hover:bg-amber-400 hover:text-black hover:border-amber-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Victory Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {HIGHLIGHT_HONORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group hud-box"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3.5 rounded-2xl border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono font-bold text-amber-400">
                    {item.place}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">{item.event}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seamless Horizontal Scroll Slider Gallery */}
        <div className="relative mb-20">
          <div
            ref={carouselRef}
            className="flex items-center gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {REAL_ACHIEVEMENT_IMAGES.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setSelectedIndex(idx)}
                className="group shrink-0 w-80 sm:w-96 h-80 sm:h-96 rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-amber-400/60 transition-all duration-500 overflow-hidden cursor-pointer p-4 snap-center shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] hud-box"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center p-3 border border-white/5">
                  {/* eslint-disable-next-html-element-for-img */}
                  <img
                    src={img.src}
                    alt={`DPS Digits Achievement ${img.id}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out rounded-xl"
                  />

                  {/* Glassmorphic Hover Lens */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-amber-950/90 border border-amber-400/60 flex items-center justify-center text-amber-300 scale-90 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.7)]">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                      EXPAND IMAGE
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Speed Infinite Text Marquee */}
      <div className="py-6 bg-amber-950/30 border-y border-amber-500/20 backdrop-blur-md overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 font-mono text-sm tracking-widest text-amber-300 uppercase font-semibold select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-amber-500/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with Prev/Next Navigation */}
      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-pointer select-none"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-white transition-colors z-20 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-white transition-colors z-20 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Fullscreen High-Res Image Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center justify-center p-4"
          >
            {/* eslint-disable-next-html-element-for-img */}
            <img
              src={REAL_ACHIEVEMENT_IMAGES[selectedIndex].src}
              alt="Achievement Fullscreen Preview"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-3xl border border-amber-500/50 shadow-[0_0_60px_rgba(212,175,55,0.5)]"
            />
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>ASSET {selectedIndex + 1} OF {REAL_ACHIEVEMENT_IMAGES.length}</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">VERIFIED DPS DIGITS ARCHIVE</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
