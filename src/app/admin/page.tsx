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
  Ban,
  CheckCircle2,
  ListFilter,
  History,
  AlertTriangle,
} from "lucide-react";
import { AnalyticsEvent, GroupedIPVisitor } from "@/lib/analyticsStore";

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
    blockedIPCount: 0,
    deviceCounts: { Desktop: 0, Mobile: 0, Tablet: 0, Unknown: 0 },
  });

  const [groupedVisitors, setGroupedVisitors] = useState<GroupedIPVisitor[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<GroupedIPVisitor | null>(null);
  const [activeTab, setActiveTab] = useState<"grouped" | "blocked">("grouped");

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
        setGroupedVisitors(data.groupedVisitors || []);
        setBlockedIPs(data.blockedIPs || []);
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

  const handleToggleBlockIP = async (ip: string, isCurrentlyBlocked: boolean) => {
    const action = isCurrentlyBlocked ? "UNBLOCK" : "BLOCK";
    if (!confirm(`Are you sure you want to ${action} IP address: ${ip}?`)) return;

    try {
      const res = await fetch("/api/admin/block-ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          ip,
          action,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchAnalytics(passcode);
      } else {
        alert(data.error || "Failed to update IP block status.");
      }
    } catch {
      alert("Error connecting to server.");
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

  const filteredVisitors = groupedVisitors.filter((visitor) => {
    const query = searchFilter.toLowerCase();
    return (
      visitor.ip.toLowerCase().includes(query) ||
      visitor.visitorId.toLowerCase().includes(query) ||
      visitor.deviceType.toLowerCase().includes(query) ||
      visitor.os.toLowerCase().includes(query) ||
      visitor.browser.toLowerCase().includes(query)
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
                  IP GROUPING & BLOCKER
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">
                Grouped Unique Devices, Timestamp Timelines & IP Access Control
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 hud-box space-y-4 bg-gradient-to-b from-amber-950/30 via-zinc-950 to-black shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <div className="flex items-center justify-between text-amber-400 text-xs font-mono font-bold">
              <span>UNIQUE NETWORK IPS</span>
              <Globe className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-4xl font-black font-mono text-white flex items-baseline gap-2">
              <span>{metrics.uniqueIPs}</span>
              <span className="text-xs text-amber-400 font-mono font-bold uppercase">IPS</span>
            </div>
            <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Distinct Network Addresses</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hud-box space-y-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>UNIQUE DEVICES</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {metrics.uniqueDeviceCount}
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              💻 Distinct Hardware Fingerprints
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hud-box space-y-4">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>TOTAL ACTIONS & HITS</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {metrics.totalHits}
            </div>
            <div className="text-[10px] font-mono text-zinc-400">
              ⚡ De-duplicated Interactions
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 hud-box space-y-4 bg-red-950/10">
            <div className="flex items-center justify-between text-red-400 text-xs font-mono font-bold">
              <span>BLOCKED IPS</span>
              <Ban className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {metrics.blockedIPCount}
            </div>
            <div className="text-[10px] font-mono text-red-400 font-bold">
              🚫 Access Denied (HTTP 403)
            </div>
          </div>
        </div>

        {/* Tab Switcher & Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center bg-white/[0.04] p-1.5 rounded-full border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab("grouped")}
                className={`px-5 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  activeTab === "grouped"
                    ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                GROUPED VISITOR IPS ({groupedVisitors.length})
              </button>
              <button
                onClick={() => setActiveTab("blocked")}
                className={`px-5 py-2 rounded-full font-bold transition-all cursor-pointer ${
                  activeTab === "blocked"
                    ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                BLOCKED IPS MANAGEMENT ({blockedIPs.length})
              </button>
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search IP, device, OS..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400 font-mono transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* TAB 1: GROUPED IP VISITORS TABLE */}
          {activeTab === "grouped" && (
            <div className="rounded-2xl border border-white/10 bg-zinc-950 overflow-x-auto hud-box">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.03] text-amber-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Visitor IP Address</th>
                    <th className="p-4">Device & OS</th>
                    <th className="p-4">Total Visits</th>
                    <th className="p-4">Latest Active Timestamp</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-500">
                        No visitor devices logged matching search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((visitor) => (
                      <tr key={visitor.ip} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-bold text-white whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono">
                            {visitor.ip}
                          </span>
                        </td>

                        <td className="p-4 text-zinc-300 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {visitor.deviceType === "Mobile" ? (
                              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                            ) : visitor.deviceType === "Tablet" ? (
                              <Tablet className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>{visitor.deviceType} ({visitor.os} • {visitor.browser})</span>
                          </div>
                        </td>

                        <td className="p-4 font-bold text-white whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-amber-400">
                            {visitor.totalVisits} {visitor.totalVisits === 1 ? "Visit" : "Visits"}
                          </span>
                        </td>

                        <td className="p-4 text-zinc-400 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-500/60" />
                            <span>{new Date(visitor.lastSeen).toLocaleString()}</span>
                          </div>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {visitor.isBlocked ? (
                            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 text-[9px] font-bold uppercase">
                              BLOCKED 🚫
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold uppercase">
                              ALLOWED ✅
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedGroup(visitor)}
                              className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-400 hover:text-black font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <History className="w-3.5 h-3.5" />
                              <span>View Timestamps ({visitor.history.length})</span>
                            </button>

                            <button
                              onClick={() => handleToggleBlockIP(visitor.ip, visitor.isBlocked)}
                              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                visitor.isBlocked
                                  ? "bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black"
                                  : "bg-red-950 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white"
                              }`}
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>{visitor.isBlocked ? "Unblock IP" : "Block IP"}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: BLOCKED IPS MANAGEMENT */}
          {activeTab === "blocked" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
                <span>
                  Blocked IP addresses are immediately served an <strong>HTTP 403 Access Denied Screen</strong> upon visiting the website.
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 overflow-x-auto hud-box">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.03] text-red-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Blocked Network IP Address</th>
                      <th className="p-4">Security Enforcement</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blockedIPs.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-zinc-500">
                          No IP addresses are currently blocked.
                        </td>
                      </tr>
                    ) : (
                      blockedIPs.map((blockedIP) => (
                        <tr key={blockedIP} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-bold text-white whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300">
                              {blockedIP}
                            </span>
                          </td>

                          <td className="p-4 text-zinc-400">
                            HTTP 403 Access Denied Enforced
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleToggleBlockIP(blockedIP, true)}
                              className="px-4 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Unblock IP Address</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TIMESTAMPS & ACTIVITY HISTORY MODAL FOR SELECTED IP */}
      {selectedGroup && (
        <div
          onClick={() => setSelectedGroup(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-pointer select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-amber-500/40 space-y-6 hud-box max-h-[85vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
                    {selectedGroup.ip}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {selectedGroup.deviceType} ({selectedGroup.os} • {selectedGroup.browser})
                  </span>
                </div>
                <p className="text-xs font-mono text-amber-400">
                  Total Visits: {selectedGroup.totalVisits} Recorded Hits
                </p>
              </div>

              <button
                onClick={() => setSelectedGroup(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Timestamps List Container */}
            <div className="overflow-y-auto space-y-3 pr-2 flex-1 scrollbar-none">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                CHRONOLOGICAL TIMESTAMP TIMELINE ({selectedGroup.history.length} ENTRIES)
              </h4>

              <div className="space-y-2">
                {selectedGroup.history.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                        #{selectedGroup.history.length - index}
                      </span>
                      <div>
                        <span className="text-white font-bold block">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                        <span className="text-zinc-500 text-[10px]">
                          ISO: {item.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.linkText ? (
                        <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-bold">
                          Clicked: &quot;{item.linkText}&quot;
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-zinc-400">
                          Page Visit ({item.path})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500">
                Visitor ID: {selectedGroup.visitorId}
              </span>

              <button
                onClick={() => {
                  handleToggleBlockIP(selectedGroup.ip, selectedGroup.isBlocked);
                  setSelectedGroup(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedGroup.isBlocked
                    ? "bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black"
                    : "bg-red-950 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white"
                }`}
              >
                <Ban className="w-4 h-4" />
                <span>{selectedGroup.isBlocked ? "Unblock IP Address" : "Block This IP Address"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
