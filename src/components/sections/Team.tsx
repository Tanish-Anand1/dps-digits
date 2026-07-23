"use client";

import { Sparkles, Brain, Shield, Code, Video, Feather, DollarSign, Lightbulb } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/Icons";

const OFFICIAL_EXECUTIVE_BOARD = [
  {
    name: "Suryawardhan Dwivedi",
    role: "PRESIDENT",
    category: "EXECUTIVE LEADERSHIP",
    initials: "SD",
    bio: "Directing the executive council, overall club operations, national symposium delegations, and strategic technology vision.",
    icon: Brain,
    gradient: "from-amber-900/60 to-zinc-900",
  },
  {
    name: "Aryan Giri",
    role: "VICE-PRESIDENT",
    category: "EXECUTIVE LEADERSHIP",
    initials: "AG",
    bio: "Managing domain workflows, technical infrastructure, full-stack dev teams, and inter-school competition execution.",
    icon: Shield,
    gradient: "from-yellow-900/60 to-zinc-900",
  },
  {
    name: "Tanish Anand",
    role: "TECHNICAL HEAD",
    category: "ENGINEERING & SYSTEMS",
    initials: "TA",
    bio: "Spearheading competitive programming algorithms, AI architecture, system kernels, and technical domain masterclasses.",
    icon: Code,
    gradient: "from-amber-950 to-zinc-900",
  },
  {
    name: "Lavanya Sharma",
    role: "MEDIA HEAD",
    category: "CREATIVE & BROADCAST",
    initials: "LS",
    bio: "Directing visual storytelling, photography, event aftermovies, digital press coverage, and brand media aesthetics.",
    icon: Video,
    gradient: "from-amber-900/60 to-zinc-900",
  },
  {
    name: "Krishna Jaiswal",
    role: "LITERARY HEAD",
    category: "EDITORIAL & POLICY",
    initials: "KJ",
    bio: "Leading tech journalism, symposium debate teams, pitch presentations, and technology policy research.",
    icon: Feather,
    gradient: "from-yellow-900/60 to-zinc-900",
  },
  {
    name: "Reet Malhotra",
    role: "LITERARY HEAD",
    category: "EDITORIAL & POLICY",
    initials: "RM",
    bio: "Co-leading literary research, editorial publications, symposium essays, and student tech debates.",
    icon: Feather,
    gradient: "from-yellow-900/60 to-zinc-900",
  },
  {
    name: "Shresth Agarwal",
    role: "FINANCE HEAD",
    category: "VENTURE & BUDGETING",
    initials: "SA",
    bio: "Overseeing event sponsorships, club venture budgets, hardware component allocations, and fiscal planning.",
    icon: DollarSign,
    gradient: "from-amber-950 to-zinc-900",
  },
  {
    name: "Akshara Gupta",
    role: "FINANCE HEAD",
    category: "VENTURE & BUDGETING",
    initials: "AG",
    bio: "Co-managing financial operations, event logistics budgeting, and partner sponsorship accounts.",
    icon: DollarSign,
    gradient: "from-amber-950 to-zinc-900",
  },
  {
    name: "Yash Shukla",
    role: "INNOVATION HEAD",
    category: "R&D AND PRODUCT",
    initials: "YS",
    bio: "Incubating experimental prototypes, IoT hardware labs, hackathon product ideas, and new domain initiatives.",
    icon: Lightbulb,
    gradient: "from-yellow-900/60 to-zinc-900",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE BOARD 2026</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            MEET THE LEADERSHIP <br />
            <span className="text-gradient-gold">BEHIND DIGITS.</span>
          </h2>
        </div>
      </div>

      {/* Core Executive Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fade-in">
        {OFFICIAL_EXECUTIVE_BOARD.map((member, idx) => {
          const Icon = member.icon;
          return (
            <div
              key={idx}
              className="group relative rounded-3xl bg-zinc-950 border border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between hud-box"
            >
              {/* Image Placeholder Frame Container */}
              <div className={`relative h-48 w-full bg-gradient-to-br ${member.gradient} p-6 flex flex-col justify-between border-b border-white/10 group-hover:scale-[1.02] transition-transform duration-500`}>
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-black/70 border border-amber-500/30 font-bold">
                    {member.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Visual Portrait Initials Placeholder */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black/80 border border-amber-500/50 flex items-center justify-center text-amber-300 font-mono font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:border-amber-400 transition-colors">
                    {member.initials}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      MEMBER 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      DPS DIGITS LEAD
                    </span>
                  </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
              </div>

              {/* Member Profile Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase block">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">EXECUTIVE BOARD</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/dpsdigits/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
