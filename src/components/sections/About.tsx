"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ShieldCheck, Cpu, Trophy, Users, Code, Sparkles } from "lucide-react";

const STATS = [
  { label: "Active Members", value: 250, suffix: "+", icon: Users, color: "text-amber-400" },
  { label: "National Victories", value: 45, suffix: "+", icon: Trophy, color: "text-yellow-400" },
  { label: "Open Source Repos", value: 120, suffix: "+", icon: Code, color: "text-amber-300" },
  { label: "Years of Legacy", value: 8, suffix: " YRS", icon: ShieldCheck, color: "text-amber-400" },
];

const MILESTONES = [
  {
    year: "2018",
    title: "Foundation of Digits",
    description:
      "Started as a 5-member computer club room at DPS Azaad Nagar, aiming to push past standard computer science curriculums into competitive programming.",
  },
  {
    year: "2020",
    title: "AI & Cybersecurity Expansion",
    description:
      "Expanded into machine learning and CTF security tournaments, claiming top podium positions across regional inter-school tech symposiums.",
  },
  {
    year: "2023",
    title: "National Hackathon Dominance",
    description:
      "Captured overall championship trophies at premier national tech fests, building autonomous robotics and web3 hardware solutions.",
  },
  {
    year: "2026",
    title: "Startup Enclave Era",
    description:
      "Transformed into a student-led technology incubator, shipping real-world software products, client prototypes, and open-source packages.",
  },
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".counter-val");
            counters.forEach((counter) => {
              const targetVal = parseInt(counter.getAttribute("data-target") || "0");
              const obj = { val: 0 };
              animate(obj, {
                val: targetVal,
                duration: 2000,
                easing: "outExpo",
                onUpdate: () => {
                  counter.textContent = String(Math.round(obj.val));
                },
              });
            });

            if (entry.target.querySelector(".about-card")) {
              animate(".about-card", {
                translateY: [30, 0],
                opacity: [0, 1],
                delay: stagger(150),
                duration: 800,
                easing: "outCubic",
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR IDENTITY & STORY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
          WE ARE NOT A CLUB. <br />
          <span className="text-gradient-gold">WE ARE AN INNOVATION ENGINE.</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
          DPS Digits is the official technological society of Delhi Public School Azaad Nagar, Kanpur. Founded to transcend textbook theory, we build production software, train ethical hackers, engineer autonomous hardware, and incubate tomorrow&apos;s tech founders.
        </p>
      </div>

      {/* Stats Ticker Counter Grid */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-28"
      >
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="about-card glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group hud-box"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  METRIC 0{idx + 1}
                </span>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline">
                  <span className="counter-val" data-target={stat.value}>
                    0
                  </span>
                  <span className="text-amber-400 ml-0.5">{stat.suffix}</span>
                </div>
                <p className="text-xs font-medium text-zinc-400 mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>

              {/* Decorative hover glow */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            </div>
          );
        })}
      </div>

      {/* Narrative Milestone Timeline */}
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              EVOLUTION TIMELINE
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
              From classroom coders to national tech champions
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold">2018 — PRESENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, index) => (
            <div
              key={index}
              className="about-card p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="inline-block text-3xl font-black font-mono text-amber-400/90 group-hover:text-amber-300 transition-colors">
                  {item.year}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>PHASE 0{index + 1}</span>
                <Cpu className="w-3.5 h-3.5 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
