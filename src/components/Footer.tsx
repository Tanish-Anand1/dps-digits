"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-amber-500/20 pt-20 pb-12 px-4 sm:px-8 text-zinc-400 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-html-element-for-img */}
              <img
                src="/logo.png"
                alt="DPS Digits Logo"
                className="w-10 h-10 object-contain rounded-xl border border-amber-500/40 bg-black/80 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              />
              <div>
                <span className="text-lg font-bold text-white font-sans tracking-tight">
                  DPS DIGITS
                </span>
                <span className="text-[10px] font-mono text-amber-400 block tracking-wider uppercase font-semibold">
                  ENCLAVE OF COMPUTATIONAL ENGINE
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light max-w-sm leading-relaxed">
              The premier student-led technology enclave of Delhi Public School Azaad Nagar, Kanpur, Uttar Pradesh, India.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/dpsdigits/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@dpsdigits.org"
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-amber-500/40 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#domains" className="hover:text-amber-400 transition-colors">Domains</a></li>
              <li><a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a></li>
              <li><a href="#achievements" className="hover:text-amber-400 transition-colors">Achievements</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Visual Gallery</a></li>
            </ul>
          </div>

          {/* Specializations Track */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              Enclave Wings
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><span className="text-zinc-400">Competitive Coding</span></li>
              <li><span className="text-zinc-400">Artificial Intelligence</span></li>
              <li><span className="text-zinc-400">Cybersecurity CTF</span></li>
              <li><span className="text-zinc-400">Robotics & Hardware</span></li>
              <li><span className="text-zinc-400">Full-Stack Web/App</span></li>
            </ul>
          </div>

          {/* Institution Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              Institution
            </h4>
            <div className="text-xs font-mono space-y-2 leading-relaxed">
              <p className="text-white font-bold">Delhi Public School Azaad Nagar</p>
              <p>Nawabganj, Kanpur</p>
              <p>Uttar Pradesh - 208002</p>
              <p className="text-amber-400 font-bold pt-2">Affiliated to CBSE, New Delhi</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} DPS DIGITS • ALL RIGHTS RESERVED. HANDCRAFTED WITH PRECISION.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors group"
          >
            <span>BACK TO TOP</span>
            <div className="p-2 rounded-full border border-white/10 group-hover:border-amber-500/40 group-hover:bg-amber-950/40">
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
