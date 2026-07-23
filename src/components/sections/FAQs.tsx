"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const FAQS_DATA = [
  {
    q: "Who is eligible to join DPS Digits?",
    a: "All enrolled students at Delhi Public School Azaad Nagar, Kanpur from Class 6 to Class 12 are eligible to apply. We recruit both beginners with high learning aptitude and experienced programmers.",
  },
  {
    q: "Do I need prior coding experience to get selected?",
    a: "Not necessarily! While senior roles require technical experience, our Junior Wing welcomes students with high problem-solving curiosity, logical aptitude, or design talent.",
  },
  {
    q: "How are club selections conducted?",
    a: "Recruitment happens in two annual cycles (Spring & Autumn). It includes an online application, a logic & technical aptitude task, followed by an interview with executive leads.",
  },
  {
    q: "What benefits do members receive?",
    a: "Members gain access to private computer labs, specialized domain mentorship, entry into national hackathons, official DPS Digits merchandise, and priority nomination for inter-school tech symposiums.",
  },
  {
    q: "Can I participate in multiple domains?",
    a: "Yes! While members pick a primary domain (e.g. AI & ML), cross-collaboration is encouraged on major hackathons and hardware projects.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-32 px-4 sm:px-8 max-w-4xl mx-auto border-t border-amber-500/20">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
          EVERYTHING YOU <br />
          <span className="text-gradient-gold">NEED TO KNOW.</span>
        </h2>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden hud-box ${
                isOpen
                  ? "bg-zinc-900/90 border-amber-500/50 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                  : "bg-zinc-950/60 border-white/10 hover:border-amber-500/30"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans text-base sm:text-lg font-bold text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-amber-300" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
