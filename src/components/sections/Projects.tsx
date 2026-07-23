"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

const PROJECTS_DATA = [
  {
    id: "sentinel-ai",
    title: "Sentinel AI",
    category: "AI & CYBER DEFENSE",
    description:
      "An autonomous intrusion detection system using local deep learning transformers to analyze network packet anomalies in real-time, built for zero-trust environments.",
    tech: ["PyTorch", "Rust", "Next.js", "TailwindCSS", "WebSockets"],
    github: "https://github.com/dps-digits/sentinel-ai",
    demo: "#",
    members: ["Aarav Sharma ('25)", "Ananya Verma ('26)"],
    gradient: "from-amber-950/80 via-zinc-900 to-black",
    badge: "WINNER • NATIONAL CYBERATHON 2025",
  },
  {
    id: "nexus-os",
    title: "Nexus Kernel OS",
    category: "SYSTEMS & COMPILERS",
    description:
      "A custom 64-bit microkernel written in Rust and C with virtual memory management, multitasking scheduler, and custom shell command interface.",
    tech: ["Rust", "Assembly x86_64", "QEMU", "C"],
    github: "https://github.com/dps-digits/nexus-os",
    demo: "#",
    members: ["Rohan Gupta ('25)", "Devansh Singh ('26)"],
    gradient: "from-zinc-900 via-amber-950/40 to-black",
    badge: "BEST LOW-LEVEL ARCHITECTURE",
  },
  {
    id: "aether-rover",
    title: "Aether Autonomous Rover",
    category: "ROBOTICS & EMBEDDED",
    description:
      "3D-printed hexapod exploration rover equipped with LiDAR spatial mapping, stereo camera vision, and ROS2 autonomous waypoint navigation.",
    tech: ["ROS2", "Python", "Raspberry Pi 5", "Fusion 360", "OpenCV"],
    github: "https://github.com/dps-digits/aether-rover",
    demo: "#",
    members: ["Kabir Mehta ('26)", "Siddharth Rao ('25)"],
    gradient: "from-yellow-950/60 via-zinc-900 to-black",
    badge: "1ST PLACE • ALL-INDIA ROBOTICS",
  },
  {
    id: "orbit-cloud",
    title: "Orbit Mesh Cloud",
    category: "DISTRIBUTED PLATFORMS",
    description:
      "Peer-to-peer decentralized file storage and real-time collaboration engine for student researchers with end-to-end zero-knowledge encryption.",
    tech: ["TypeScript", "WebRTC", "Golang", "Docker", "TailwindCSS"],
    github: "https://github.com/dps-digits/orbit-mesh",
    demo: "#",
    members: ["Riya Malhotra ('25)", "Tanishq Agarwal ('26)"],
    gradient: "from-amber-900/40 via-zinc-900 to-black",
    badge: "FEATURED OPEN SOURCE",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PROPRIETARY INNOVATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            ENGINEERED AT <br />
            <span className="text-gradient-gold">DPS DIGITS.</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-md">
          A showcase of student-architected software platforms, hardware systems, and open-source contributions.
        </p>
      </div>

      {/* Projects Cards Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <div
            key={project.id}
            className="group relative rounded-3xl bg-zinc-950 border border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between hud-box"
          >
            {/* Visual Header Canvas / Gradient Card Container */}
            <div
              className={`relative h-64 sm:h-80 w-full bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-between overflow-hidden border-b border-white/10 group-hover:scale-[1.01] transition-transform duration-700`}
            >
              {/* Grid lines overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/30 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                  {project.badge}
                </span>
                <span className="text-xs font-mono text-zinc-500">PROJECT 0{index + 1}</span>
              </div>

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono text-amber-400/90 uppercase tracking-wider block">
                  {project.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Decorative Gold Glow Circle */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/35 transition-all" />
            </div>

            {/* Content Details */}
            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-amber-500/20 text-xs font-mono text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Authors & Links Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500 uppercase block text-[10px]">Architects:</span>
                  <span className="text-zinc-300 font-medium">{project.members.join(" • ")}</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-amber-400 hover:bg-white/10 hover:border-amber-500/40 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 hover:text-white text-xs font-mono transition-all font-semibold"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
