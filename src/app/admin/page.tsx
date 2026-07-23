"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  RefreshCw,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  Sparkles,
  Search,
  KeyRound,
  LogOut,
  ChevronRight,
  Eye,
  Laptop,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { AnalyticsEvent } from "@/lib/analyticsStore";

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExcludedPC, setIsExcludedPC] = useState(false);

  const [metrics, setMetrics] = useState({
    totalHits: 0,
    uniqueDeviceCount: 0,
    uniqueIPs: 0,
    deviceCounts: { Desktop: 0, Mobile: 0, Tablet: 0, Unknown: 0 },
  });

  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<AnalyticsEvent | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsExcludedPC(localStorage.getItem("digits_ignore_analytics") === "true");
    }

    const savedKey = sessionStorage.getItem("admin_passcode");
    if (savedKey) {
      setPasscode(savedKey);
      fetchAnalytics(savedKey);
    }
  }, []);

  const toggleExcludePC = () => {
    const nextState = !isExcludedPC;
    setIsExcludedPC(nextState);
    if (nextState) {
      localStorage.setItem("digits_ignore_analytics", "true");
    } else {
      localStorage.removeItem("digits_ignore_analytics");
    }
  };

  const fetchAnalytics = async (keyToUse: string) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/admin/analytics?passcode=${encodeURIComponent(keyToUse)}`);
      const data = await res.json();

      if (res.ok && data.metrics) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_passcode", keyToUse);
        setMetrics(data.metrics);
        setEvents(data.events || []);
      } else {
        setIsAuthenticated(false);
        setErrorMsg(data.error || "Invalid Admin Passcode.");
      }
    } catch {
      setErrorMsg("Failed to connect to analytics server.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg("Please enter your passcode.");
      return;
    }
    fetchAnalytics(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const filteredEvents = events.filter((evt) => {
    const query = searchFilter.toLowerCase();
    return (
      evt.ip.toLowerCase().includes(query) ||
      evt.visitorId.toLowerCase().includes(query) ||
      evt.action.toLowerCase().includes(query) ||
      (evt.linkText && evt.linkText.toLowerCase().includes(query)) ||
      evt.deviceType.toLowerCase().includes(query) ||
      evt.os.toLowerCase().includes(query) ||
      evt.browser.toLowerCase().includes(query)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-950/90 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] relative z-10 hud-box space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>ENCLAVE TELEMETRY SYSTEM</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-sans tracking-tight">
              ADMIN DASHBOARD
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Restricted Access • Authorized Executive Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono text-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-400 font-mono transition-colors"
                />
                <KeyRound className="w-4 h-4 text-amber-500/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 hover:from-amber-200 hover:to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] font-mono text-zinc-500 text-center">
            Default Passcode: <code className="text-amber-400">digits2026admin</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 select-none relative">
      <div className="max-w-7xl mx-auto space-y-8 pt-6">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white font-sans tracking-tight">
                  TELEMETRY DASHBOARD
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  UNIQUE DEVICE DETECTOR
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">
                Tracking Unique Devices, Network IPs & Real Visitor Hits (Excluding Localhost & Developer PC)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Developer PC Exclusion Toggle */}
            <button
              onClick={toggleExcludePC}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isExcludedPC
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-amber-500/40"
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-amber-400" />
              <span>{isExcludedPC ? "🛡️ THIS PC EXCLUDED FROM LOGS" : "EXCLUDE THIS PC FROM LOGS"}</span>
            </button>

            <button
              onClick={() => fetchAnalytics(passcode)}
              className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-300 hover:text-white hover:border-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-400 hover:bg-amber-900/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Unique Devices Metric */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 hud-box space-y-4 bg-gradient-to-b from-amber-950/30 via-zinc-950 to-black shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <div className="flex items-center justify-between text-amber-400 text-xs font-mono font-bold">
              <span>UNIQUE DEVICES (NEW USERS)</span>
              <Users className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-4xl font-black font-mono text-white flex items-baseline gap-2">
              <span>{metrics.uniqueDeviceCount}</span>
              <span className="text-xs text-amber-400 font-mono font-bold uppercase">DEVICES</span>
            </div>
            <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Distinct Hardware Fingerprints</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hud-box space-y-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>UNIQUE NETWORK IPS</span>
              <Globe className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {metrics.uniqueIPs}
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              🌐 Distinct IP Addresses
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hud-box space-y-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>TOTAL VISITS & CLICKS</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {metrics.totalHits}
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              ⚡ De-duplicated Action Hits
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hud-box space-y-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>DEVICE BREAKDOWN</span>
              <Smartphone className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs font-mono space-y-1 pt-1 text-zinc-300">
              <div className="flex justify-between">
                <span>Desktop:</span>
                <span className="font-bold text-white">{metrics.deviceCounts.Desktop || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile:</span>
                <span className="font-bold text-amber-400">{metrics.deviceCounts.Mobile || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Tablet:</span>
                <span className="font-bold text-yellow-300">{metrics.deviceCounts.Tablet || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Log Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-sans">
                LIVE AUDIT TRAIL
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Excludes Localhost/Developer PC • De-duplicates Rapid Page Reload Hits
              </p>
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search IP, visitor ID, device..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 font-mono transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 overflow-x-auto hud-box">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/[0.03] text-amber-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Visitor Device ID</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Device & OS</th>
                  <th className="p-4">Action / Target</th>
                  <th className="p-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">
                      No visitor telemetry recorded yet. Share the website link to see new device visits!
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-zinc-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-amber-500/60" />
                          <span>{new Date(evt.timestamp).toLocaleString()}</span>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {evt.isNewDevice ? (
                            <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-bold text-[9px] uppercase tracking-wider shadow-[0_0_10px_rgba(212,175,55,0.6)]">
                              NEW DEVICE ✨
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 text-[9px] uppercase">
                              REPEAT VISIT
                            </span>
                          )}
                          <span className="text-zinc-300 font-mono text-[11px]">
                            {evt.visitorId.substring(0, 16)}...
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-white whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                          {evt.ip}
                        </span>
                      </td>

                      <td className="p-4 text-zinc-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {evt.deviceType === "Mobile" ? (
                            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                          ) : evt.deviceType === "Tablet" ? (
                            <Tablet className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <Monitor className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          <span>{evt.deviceType} ({evt.os} • {evt.browser})</span>
                        </div>
                      </td>

                      <td className="p-4 text-zinc-200">
                        {evt.linkText ? (
                          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white font-semibold">
                            Clicked: &quot;{evt.linkText}&quot;
                          </span>
                        ) : (
                          <span className="text-zinc-500">Page Visit ({evt.path})</span>
                        )}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-amber-400 hover:text-black text-zinc-300 transition-colors cursor-pointer"
                          title="View Full Telemetry"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User-Agent Inspector Modal */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full p-6 rounded-3xl bg-zinc-950 border border-amber-500/40 space-y-4 hud-box"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                RAW USER-AGENT & DEVICE INSPECTOR
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-amber-400 block text-[10px]">VISITOR DEVICE ID:</span>
                <span className="text-white font-bold">{selectedEvent.visitorId}</span>
              </div>
              <div>
                <span className="text-amber-400 block text-[10px]">IP ADDRESS:</span>
                <span className="text-amber-300 font-bold">{selectedEvent.ip}</span>
              </div>
              <div>
                <span className="text-amber-400 block text-[10px]">TIMESTAMP:</span>
                <span className="text-zinc-300">{new Date(selectedEvent.timestamp).toString()}</span>
              </div>
              <div>
                <span className="text-amber-400 block text-[10px]">RAW USER-AGENT STRING:</span>
                <div className="p-3 rounded-xl bg-black border border-white/10 text-zinc-300 text-[11px] break-all leading-relaxed font-mono">
                  {selectedEvent.userAgent}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
