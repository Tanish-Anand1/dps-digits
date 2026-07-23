"use client";

import { useState } from "react";
import {
  Code2,
  BrainCircuit,
  ShieldAlert,
  Bot,
  Palette,
  Smartphone,
  Globe,
  Rocket,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const DOMAINS_DATA = [
  {
    id: "programming",
    title: "Competitive Programming",
    subtitle: "ALGORITHMS & DATA STRUCTURES",
    icon: Code2,
    description:
      "Engineers mastering complex graph algorithms, dynamic programming, and high-performance C++/Python code to conquer national Olympiads and Codeforces contests.",
    skills: ["C++20", "Data Structures", "Dynamic Programming", "Graph Theory", "Codeforces"],
    accent: "from-amber-500/20 to-yellow-500/5",
  },
  {
    id: "ai",
    title: "Artificial Intelligence & ML",
    subtitle: "NEURAL NETWORKS & LLMS",
    icon: BrainCircuit,
    description:
      "Researching deep learning architectures, computer vision, natural language transformers, and fine-tuning intelligent agents for real-world predictive analysis.",
    skills: ["PyTorch", "TensorFlow", "OpenCV", "LLM Agents", "Transformers"],
    accent: "from-amber-400/20 to-amber-600/5",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & CTFs",
    subtitle: "ETHICAL HACKING & OFFENSIVE DEFENSE",
    icon: ShieldAlert,
    description:
      "Trained in binary exploitation, web vulnerability auditing, cryptography, reverse engineering, and competing in global Capture The Flag tournaments.",
    skills: ["Reverse Engineering", "Wireshark", "GDB", "Web Exploitation", "Pen Testing"],
    accent: "from-yellow-500/20 to-amber-500/5",
  },
  {
    id: "robotics",
    title: "Robotics & Hardware",
    subtitle: "EMBEDDED SYSTEMS & MECHATRONICS",
    icon: Bot,
    description:
      "Designing custom micro-controller PCBs, autonomous rover navigation systems, IoT sensor networks, and CAD 3D-printed chassis.",
    skills: ["Arduino", "Raspberry Pi", "ESP32", "ROS2", "Fusion 360"],
    accent: "from-amber-300/20 to-yellow-600/5",
  },
  {
    id: "design",
    title: "UI/UX & Motion Design",
    subtitle: "VISUAL ARCHITECTURE & ANIMATION",
    icon: Palette,
    description:
      "Crafting world-class design systems, micro-interactive prototypes, 3D assets, and award-winning digital brand identities.",
    skills: ["Figma", "Framer", "After Effects", "Spline 3D", "Design Systems"],
    accent: "from-yellow-400/20 to-amber-500/5",
  },
  {
    id: "appdev",
    title: "App Development",
    subtitle: "IOS & ANDROID ECOSYSTEMS",
    icon: Smartphone,
    description:
      "Building high-speed native and cross-platform mobile software with seamless offline sync, push notifications, and buttery smooth UI.",
    skills: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    accent: "from-amber-500/20 to-yellow-300/5",
  },
  {
    id: "webdev",
    title: "Web Engineering",
    subtitle: "FULL-STACK PLATFORMS",
    icon: Globe,
    description:
      "Creating modern, ultra-fast web apps using Next.js, WebGL, serverless APIs, and resilient database architectures.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Anime.js", "Node.js"],
    accent: "from-amber-400/20 to-amber-950/20",
  },
  {
    id: "entrepreneurship",
    title: "Tech Entrepreneurship",
    subtitle: "PRODUCT & VENTURE INCUBATION",
    icon: Rocket,
    description:
      "Transforming technical prototypes into viable startup products. Pitch deck design, user growth loops, and MVP product management.",
    skills: ["Product Strategy", "Pitching", "Growth Hacking", "Market Validation", "Agile"],
    accent: "from-yellow-300/20 to-amber-600/5",
  },
];

export default function Domains() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  return (
    <section id="domains" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPECIALIZED WINGS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            EIGHT DOMAINS OF <br />
            <span className="text-gradient-gold">EXCELLENCE.</span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-md">
          Members choose dedicated specialization tracks led by senior student mentors. Explore our specialized tech divisions.
        </p>
      </div>

      {/* Domains Expandable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOMAINS_DATA.map((domain, index) => {
          const Icon = domain.icon;
          const isExpanded = activeDomain === domain.id;

          return (
            <div
              key={domain.id}
              onClick={() => setActiveDomain(isExpanded ? null : domain.id)}
              className={`group relative p-8 rounded-3xl bg-zinc-950/70 border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between hud-box ${
                isExpanded
                  ? "border-amber-400 bg-zinc-900/90 shadow-[0_0_40px_rgba(212,175,55,0.3)] ring-1 ring-amber-400/50"
                  : "border-white/10 hover:border-amber-500/40 hover:bg-zinc-900/40"
              }`}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${domain.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-400/70 font-semibold tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase block mb-1">
                    {domain.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {domain.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {domain.description}
                </p>
              </div>

              {/* Skills Tags & Footer */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-amber-500/20 text-[10px] font-mono text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-semibold">
                  <span>{isExpanded ? "ACTIVE WING" : "EXPLORE WING"}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-45 text-white" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
