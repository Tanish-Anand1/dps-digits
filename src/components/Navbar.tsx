"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "About", targetId: "about" },
  { name: "Domains", targetId: "domains" },
  { name: "Projects", targetId: "projects" },
  { name: "Achievements", targetId: "achievements" },
  { name: "Gallery", targetId: "gallery" },
  { name: "Team", targetId: "team" },
  { name: "FAQs", targetId: "faqs" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (targetId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = NAV_LINKS.map((link) => link.targetId);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-8 transition-all duration-500 ${
        isScrolled ? "pt-3 pb-3" : "pt-6 pb-6"
      }`}
    >
      <nav
        className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 rounded-full px-6 ${
          isScrolled
            ? "h-14 bg-zinc-950/85 backdrop-blur-xl border border-amber-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.15)]"
            : "h-16 bg-zinc-900/40 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand / Official Logo */}
        <button
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          {/* eslint-disable-next-html-element-for-img */}
          <img
            src="/logo.png"
            alt="DPS Digits Logo"
            className="w-9 h-9 object-contain rounded-xl border border-amber-500/40 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-black/70 p-0.5"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white font-sans glitch-text" data-text="DPS DIGITS">
              DPS DIGITS
            </span>
            <span className="text-[9px] font-mono text-amber-500/80 tracking-wider hidden sm:inline uppercase font-semibold">
              DPS AZAAD NAGAR
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.targetId;
            return (
              <button
                key={link.name}
                onClick={(e) => scrollToSection(link.targetId, e)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-black bg-amber-400 border border-amber-300 font-bold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={(e) => scrollToSection("join", e)}
            className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-bold text-black bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 hover:from-amber-200 hover:to-amber-500 rounded-full border border-amber-200 shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wider cursor-pointer"
          >
            <span>JOIN CLUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-amber-400 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col p-6 border-b border-amber-500/20 animate-fade-in">
          <div className="flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(link.targetId, e);
                }}
                className="text-lg font-medium text-zinc-300 hover:text-amber-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between text-left cursor-pointer"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-amber-500" />
              </button>
            ))}
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                scrollToSection("join", e);
              }}
              className="mt-4 w-full py-3.5 text-center font-bold text-black bg-amber-400 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 font-mono uppercase cursor-pointer"
            >
              <span>Join DPS Digits</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
