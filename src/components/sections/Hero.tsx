"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { ArrowDown, Terminal, Sparkles, ChevronRight, Zap } from "lucide-react";

const TYPING_PHRASES = [
  "NEXT-GEN ALGORITHMS",
  "ARTIFICIAL INTELLIGENCE",
  "FULL-STACK ARCHITECTURES",
  "CYBERSECURITY ENCLAVES",
  "ROBOTICS & MECHATRONICS",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[typingIndex];
    const speed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingIndex]);

  // Anime.js Stagger entrance animation
  useEffect(() => {
    if (typeof window !== "undefined" && document.querySelector(".hero-stagger")) {
      animate(".hero-stagger", {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(120, { start: 200 }),
        duration: 1000,
        easing: "outQuint",
      });

      if (document.querySelector(".hero-[data-float]")) {
        animate(".hero-[data-float]", {
          translateY: [-10, 10],
          rotate: [-3, 3],
          duration: 4000,
          direction: "alternate",
          loop: true,
          easing: "inOutSine",
        });
      }
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Background Floating Decorative Nodes */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 border border-amber-500/15 rounded-full blur-sm pointer-events-none hero-[data-float]" />
      <div className="absolute bottom-1/3 left-[5%] w-48 h-48 border border-white/5 rounded-3xl blur-sm pointer-events-none hero-[data-float]" style={{ animationDelay: "-2s" }} />

      {/* Top Cyber Badge */}
      <div className="hero-stagger flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
          <span>DPS AZAAD NAGAR • KANPUR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>
      </div>

      {/* Hero Central Content */}
      <div className="my-auto py-12 flex flex-col items-start gap-8">
        <div className="space-y-4">
          <div className="hero-stagger inline-flex items-center gap-2 text-xs font-mono text-amber-400/90 uppercase tracking-widest bg-zinc-950 px-3.5 py-1.5 rounded-md border border-amber-500/30 hud-box">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>EST. 2018 // PIONEERING STUDENT TECH</span>
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] uppercase text-white font-sans"
          >
            <span className="hero-stagger block text-white glitch-text" data-text="WE BUILD.">
              WE BUILD.
            </span>
            <span className="hero-stagger block text-gradient-gold drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] glitch-text" data-text="WE INNOVATE.">
              WE INNOVATE.
            </span>
            <span className="hero-stagger block text-zinc-400 glitch-text" data-text="WE INSPIRE.">
              WE INSPIRE.
            </span>
          </h1>
        </div>

        {/* Dynamic Cyber Typing Banner */}
        <div className="hero-stagger flex items-center gap-3 font-mono text-sm sm:text-base md:text-lg text-zinc-300 min-h-[32px] bg-zinc-950/80 px-4 py-2 rounded-xl border border-amber-500/30 hud-box">
          <span className="text-amber-400 font-bold">&gt;</span>
          <span className="text-zinc-400">EXECUTING:</span>
          <span className="text-amber-300 font-semibold px-2 py-0.5 bg-amber-950/80 rounded border border-amber-500/40">
            {displayText}
          </span>
          <span className="w-2 h-5 bg-amber-400 animate-pulse inline-block" />
        </div>

        {/* Hero Paragraph */}
        <p className="hero-stagger max-w-2xl text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-light">
          The official premier technology & computational engineering enclave of Delhi Public School Azaad Nagar. We are a collective of coders, AI researchers, cyber defense strategists, and makers constructing the future.
        </p>

        {/* Action Buttons */}
        <div className="hero-stagger flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-xs font-mono font-bold text-black bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 hover:from-amber-200 hover:to-amber-500 rounded-full border border-amber-200 shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            <span>Explore Innovations</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#join"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-mono font-bold text-white hover:text-amber-300 bg-white/[0.04] hover:bg-amber-950/40 rounded-full border border-white/10 hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Join The Enclave</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer Info & Scroll Indicator */}
      <div className="hero-stagger w-full pt-8 flex items-end justify-between border-t border-amber-500/20 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-6">
          <div>
            <span className="block text-white font-bold text-sm font-mono">250+</span>
            <span className="text-zinc-400">ALUMNI & MEMBERS</span>
          </div>
          <div className="h-6 w-[1px] bg-amber-500/20" />
          <div>
            <span className="block text-amber-400 font-bold text-sm font-mono">45+</span>
            <span className="text-zinc-400">NATIONAL AWARDS</span>
          </div>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors group"
        >
          <span className="hidden sm:inline">SCROLL TO DISCOVER</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-950/40 transition-all">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
          </div>
        </a>
      </div>
    </section>
  );
}
