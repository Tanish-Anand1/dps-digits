"use client";

import { Calendar, MapPin, Users, ArrowUpRight, Sparkles, Clock } from "lucide-react";

const EVENTS_LIST = [
  {
    id: "digits-hack-2026",
    title: "DIGITS HACK 2026",
    tag: "ANNUAL HACKATHON",
    date: "OCTOBER 14-15, 2026",
    location: "Main Auditorium & Cyber Lab • DPS Azaad Nagar",
    time: "36-HOUR CONTINUOUS HACK",
    description:
      "Our flagship national inter-school hackathon bringing together over 300 top student developers to build AI solutions, hardware IoT setups, and web platforms.",
    status: "REGISTRATIONS OPENING SOON",
    statusBg: "bg-emerald-950 text-emerald-400 border-emerald-500/40",
  },
  {
    id: "ai-prompt-craft",
    title: "Deep Learning & Transformer Systems",
    tag: "SPECIALIZED WORKSHOP",
    date: "AUGUST 22, 2026",
    location: "Innovation Hub Lab 2",
    time: "10:00 AM - 04:00 PM IST",
    description:
      "Hands-on workshop introducing PyTorch model fine-tuning, neural architecture setup, and building autonomous AI agent workflows.",
    status: "MEMBERS ONLY",
    statusBg: "bg-blue-950 text-blue-400 border-blue-500/40",
  },
  {
    id: "ctf-zero-day",
    title: "Operation Zero-Day CTF",
    tag: "CYBER WARGAME",
    date: "SEPTEMBER 05, 2026",
    location: "Online Arena & Digits Portal",
    time: "12-HOUR TOURNAMENT",
    description:
      "Jeopardy-style Capture The Flag competition testing skills in binary exploitation, reverse engineering, web security, and steganography.",
    status: "OPEN ALL INDIA",
    statusBg: "bg-amber-950 text-amber-400 border-amber-500/40",
  },
];

export default function Events() {
  return (
    <section id="events" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CALENDAR & SYMPOSIUMS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            UPCOMING TECH <br />
            <span className="text-gradient-green">EVENTS & FESIS.</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-md">
          Join our hackathons, hands-on masterclasses, guest speaker keynotes, and competitive arenas.
        </p>
      </div>

      {/* Events Grid */}
      <div className="space-y-6">
        {EVENTS_LIST.map((event) => (
          <div
            key={event.id}
            className="group p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-md border border-white/10 uppercase tracking-widest">
                  {event.tag}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-md border uppercase tracking-wider ${event.statusBg}`}
                >
                  {event.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                {event.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#join"
                data-cursor-text="REGISTER"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-full border border-emerald-400/40 shadow-[0_0_20px_rgba(13,110,63,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Event Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
