import React, { useState, useMemo } from "react";
import { Search, Download, ArrowUpRight, Sparkles, Filter, ChevronDown, Check, Eye } from "lucide-react";
import { CATEGORIES } from "../data/inixaProducts.js";
import confetti from "canvas-confetti";

export default function LabsGrid({ products, onSelectProduct, searchQuery, setSearchQuery }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [downloadDropdownAppId, setDownloadDropdownAppId] = useState(null);

  // Filter products by category and search term
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q) ||
        p.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleDownload = (e, apk) => {
    e.stopPropagation();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7", "#10b981"],
    });
    window.location.href = apk.downloadUrl;
    setDownloadDropdownAppId(null);
  };

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setDownloadDropdownAppId(downloadDropdownAppId === id ? null : id);
  };

  return (
    <section id="experiments" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title — Google Labs Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Labs Inspired Directory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              INIXA <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Labs</span> & Applications
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Explore our laboratory of production-ready mobile systems, neural companions, audiophile audio frameworks, and privacy tools.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps, features, codecs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-white/[0.03] text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? "bg-black/10 text-black font-bold" : "bg-white/10 text-neutral-400"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Labs Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white/[0.02] border border-white/10">
            <p className="text-neutral-400 text-sm">No applications found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((app) => {
              const primaryShot = app.screenshots[0]?.src;
              const hasMultipleApks = app.apks.length > 1;
              const isDropdownOpen = downloadDropdownAppId === app.id;

              return (
                <div
                  key={app.id}
                  onClick={() => onSelectProduct(app)}
                  className="group relative rounded-3xl bg-neutral-900/40 border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
                >
                  {/* Subtle top glow bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: app.accentGradient }}
                  />

                  {/* Top Bar: Badge + Version */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-sm"
                        style={{ background: app.accentGradient }}
                      >
                        {app.badge}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">{app.version}</span>
                    </div>

                    {/* Screenshot Preview Card */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-neutral-950 border border-white/5">
                      {primaryShot ? (
                        <img
                          src={primaryShot}
                          alt={app.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                          Preview
                        </div>
                      )}

                      {/* Screen count pill */}
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                        {app.screenshots.length} Screens
                      </span>
                    </div>

                    {/* App Title & Tagline */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                        <span>{app.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      </h3>
                      <p className="text-xs font-semibold text-cyan-400/90 mt-0.5">{app.tagline}</p>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-400 line-clamp-3 mb-4 leading-relaxed">
                      {app.shortDesc}
                    </p>

                    {/* Key bullets */}
                    <div className="space-y-1.5 mb-5 border-t border-white/5 pt-3">
                      {app.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-300 line-clamp-1">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-white/10 relative">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(app);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors text-center border border-white/5"
                      >
                        Inspect Lab
                      </button>

                      {/* Direct APK Download Button or Dropdown */}
                      {hasMultipleApks ? (
                        <div className="relative">
                          <button
                            onClick={(e) => toggleDropdown(e, app.id)}
                            className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                            title="Choose APK Architecture"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>APK ({app.apks.length})</span>
                            <ChevronDown className="w-3 h-3 ml-0.5" />
                          </button>

                          {/* Multi-version Dropdown Menu */}
                          {isDropdownOpen && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute bottom-full right-0 mb-2 w-64 rounded-2xl bg-neutral-950/95 border border-white/15 backdrop-blur-2xl p-2 shadow-2xl z-40 space-y-1"
                            >
                              <div className="px-2 py-1 text-[10px] uppercase font-mono text-neutral-400 border-b border-white/10">
                                Select Version Architecture
                              </div>
                              {app.apks.map((apk, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => handleDownload(e, apk)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-white/10 text-xs text-white transition-colors flex items-center justify-between group/apk"
                                >
                                  <div>
                                    <p className="font-semibold text-cyan-300">{apk.arch}</p>
                                    <p className="text-[10px] text-neutral-400">{apk.type}</p>
                                  </div>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">
                                    {apk.size}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleDownload(e, app.apks[0])}
                          className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                          title="Download APK"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>APK ({app.apks[0]?.size})</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
