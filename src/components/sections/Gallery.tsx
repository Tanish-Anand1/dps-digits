"use client";

import { useState } from "react";
import { Sparkles, Maximize2, X } from "lucide-react";

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "National Cyberathon Overall Champions",
    category: "VICTORY MOMENTS",
    aspect: "h-72",
    gradient: "from-emerald-900/60 to-zinc-900",
    caption: "Team DPS Digits receiving the overall championship trophy at TechFest 2025.",
  },
  {
    id: 2,
    title: "Autonomous Robotics Lab Prototyping",
    category: "LAB WORKSHOPS",
    aspect: "h-96",
    gradient: "from-blue-900/60 to-zinc-900",
    caption: "Senior hardware leads calibrating LiDAR sensors for the Aether Autonomous Rover.",
  },
  {
    id: 3,
    title: "36-Hour Hackathon War Room",
    category: "HACKATHONS",
    aspect: "h-64",
    gradient: "from-zinc-800 to-black",
    caption: "Late night debugging session during Digits Hack 2025.",
  },
  {
    id: 4,
    title: "Deep Learning Neural Net Masterclass",
    category: "SEMINARS",
    aspect: "h-80",
    gradient: "from-emerald-950 to-zinc-900",
    caption: "Student mentor demonstrating PyTorch transformer fine-tuning in the lab.",
  },
  {
    id: 5,
    title: "Capture The Flag Strategy Huddle",
    category: "CYBERSECURITY",
    aspect: "h-96",
    gradient: "from-purple-950/60 to-zinc-900",
    caption: "Cyber defense wing resolving reverse-engineering challenges during CTF zero-day.",
  },
  {
    id: 6,
    title: "Design System & UI Prototyping",
    category: "DESIGN WING",
    aspect: "h-72",
    gradient: "from-amber-950/50 to-zinc-900",
    caption: "Visual architecture leads designing micro-interactive web design systems.",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_IMAGES)[0] | null>(null);

  return (
    <section id="gallery" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            LIFE INSIDE THE <br />
            <span className="text-gradient-green">DIGITS ENCLAVE.</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-md">
          A glimpse into our lab sessions, hackathon nights, national podium ceremonies, and collaborative workshops.
        </p>
      </div>

      {/* Masonry Layout Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {GALLERY_IMAGES.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            data-cursor-text="ZOOM"
            className={`group relative ${img.aspect} rounded-3xl bg-gradient-to-b ${img.gradient} border border-white/10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden cursor-pointer p-6 flex flex-col justify-between break-inside-avoid`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 border border-white/10">
                {img.category}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:text-emerald-400 transition-all">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-2 z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {img.title}
              </h3>
              <p className="text-xs text-zinc-400 font-light line-clamp-2">{img.caption}</p>
            </div>

            {/* Subtle Noise Grid Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-emerald-600 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-emerald-500/40 space-y-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              {selectedImage.category}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {selectedImage.title}
            </h3>
            <p className="text-base text-zinc-300 font-light leading-relaxed">
              {selectedImage.caption}
            </p>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>DPS DIGITS ARCHIVE</span>
              <span className="text-emerald-400">HIGH-RESOLUTION PREVIEW</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
