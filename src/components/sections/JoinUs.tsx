"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    gradeClass: "Class 11",
    email: "",
    domain: "Programming & Algorithms",
    portfolio: "",
    statement: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.statement.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setErrorMsg("");
    setSubmitted(true);

    // Fire Metallic Gold & Pure White Confetti explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F59E0B", "#ffffff", "#FFF5C0", "#E6C200"],
    });
  };

  return (
    <section id="join" className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Info Column */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/40 text-amber-400 text-xs font-mono uppercase tracking-widest hud-box">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEMBERSHIP INTAKE 2026-27</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            JOIN THE <br />
            <span className="text-gradient-gold">DIGITS ENCLAVE.</span>
          </h2>

          <p className="text-zinc-400 text-base font-light leading-relaxed">
            Are you passionate about building software, hacking systems, designing modern interfaces, or engineering hardware? We welcome students from Class 6 to Class 12 at DPS Azaad Nagar.
          </p>

          <div className="space-y-4 pt-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>ROUND 1: ONLINE WRITTEN STATEMENT & PORTFOLIO REVIEW</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ROUND 2: DOMAIN LAB INTERVIEW & TECHNICAL TASK</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>OFFICIAL INDUCTION & ENCLAVE MENTORSHIP</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] relative hud-box">
          {submitted ? (
            <div className="py-16 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-amber-950/80 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.6)]">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-sans">
                  APPLICATION RECEIVED
                </h3>
                <p className="text-xs font-mono text-amber-400 font-bold">
                  CONFIRMATION ID: #DIGITS-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              <p className="text-xs text-zinc-400 font-light max-w-md mx-auto">
                Thank you for applying to DPS Digits. Our executive board will review your submission and contact you via email for the Round 2 interview.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-white/[0.05] border border-amber-500/30 text-xs font-mono text-amber-300 hover:text-white transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanish Anand"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                    Class / Grade *
                  </label>
                  <select
                    value={formData.gradeClass}
                    onChange={(e) => setFormData({ ...formData, gradeClass: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option>Class 6 - 8 (Junior)</option>
                    <option>Class 9 (Sub-Senior)</option>
                    <option>Class 10 (Sub-Senior)</option>
                    <option>Class 11 (Senior)</option>
                    <option>Class 12 (Senior)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                    School Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@dpsazaadnagar.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                  Primary Domain Preference *
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option>Programming & Competitive Coding</option>
                  <option>Artificial Intelligence & Machine Learning</option>
                  <option>Cybersecurity & Capture The Flag</option>
                  <option>Robotics & Hardware Engineering</option>
                  <option>UI/UX Design & Visual Architecture</option>
                  <option>App & Web Full-Stack Engineering</option>
                  <option>Tech Entrepreneurship & Product</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  GitHub / Portfolio / Project Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                  Why do you want to join DPS Digits? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your projects, skills, or what drives your curiosity in tech..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 hover:from-amber-200 hover:to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Submit Membership Application</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
