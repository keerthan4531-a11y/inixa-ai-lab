import React, { useState, useMemo } from "react";
import { Download, Search, Check, ShieldCheck, Filter, ArrowDownToLine, Smartphone, Layers, Copy } from "lucide-react";
import { ALL_APKS } from "../data/inixaProducts.js";
import confetti from "canvas-confetti";

export default function InixaApkHub() {
  const [archFilter, setArchFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredApks = useMemo(() => {
    return ALL_APKS.filter((apk) => {
      const matchesArch =
        archFilter === "all" ||
        apk.arch.toLowerCase().includes(archFilter.toLowerCase()) ||
        apk.type.toLowerCase().includes(archFilter.toLowerCase());

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        apk.appName.toLowerCase().includes(q) ||
        apk.fileName.toLowerCase().includes(q) ||
        apk.arch.toLowerCase().includes(q) ||
        apk.type.toLowerCase().includes(q);

      return matchesArch && matchesSearch;
    });
  }, [archFilter, searchTerm]);

  const handleDownload = (apk) => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7", "#10b981", "#f59e0b"],
    });
    window.location.href = apk.downloadUrl;
  };

  const copyDownloadLink = (apk, idx) => {
    const fullUrl = `${window.location.origin}${apk.downloadUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const archTabs = [
    { id: "all", label: "All Architectures (13)" },
    { id: "arm64", label: "ARM64-v8a" },
    { id: "universal", label: "Universal" },
    { id: "foss", label: "FOSS Editions" },
  ];

  return (
    <section id="apk-hub" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Android Binary Repository</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Official <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">APK</span> Downloads
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Download any release version, architecture variant (ARM64, Universal, FOSS, GMS), or lightweight build directly to your phone. Zero intermediate redirects.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search APKs (e.g. arm64, foss, beat-box)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {archTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setArchFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                archFilter === tab.id
                  ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* APK Table / Card Grid */}
        <div className="rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] border-b border-white/10 text-neutral-400 uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">Application & Binary</th>
                  <th className="py-4 px-4">Architecture</th>
                  <th className="py-4 px-4">Type / Channel</th>
                  <th className="py-4 px-4">Package Size</th>
                  <th className="py-4 px-4">Min Android</th>
                  <th className="py-4 px-6 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApks.map((apk, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* App info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shrink-0"
                          style={{ backgroundColor: `${apk.appColor}33`, color: apk.appColor }}
                        >
                          {apk.iconGlyph}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                              {apk.appName}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/10 text-neutral-300">
                              v{apk.version}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-neutral-400 block truncate max-w-xs">
                            {apk.fileName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Architecture */}
                    <td className="py-4 px-4 font-mono text-cyan-300">
                      {apk.arch}
                    </td>

                    {/* Type */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-neutral-300 border border-white/10">
                        {apk.type}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      {apk.size}
                    </td>

                    {/* Min SDK */}
                    <td className="py-4 px-4 font-mono text-neutral-400">
                      {apk.minSdk}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => copyDownloadLink(apk, idx)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                          title="Copy Download URL"
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDownload(apk)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security / Verification Guarantee */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Cryptographically Signed
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Every release APK is compiled and signed with the official INIXA production release key.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Side-Load Ready
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Direct installation on any Android phone without Google Play Store dependency or account requirements.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <ArrowDownToLine className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Instant CDN Speeds
              </h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Hosted directly in the root repository for maximum bandwidth and unthrottled download speeds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
