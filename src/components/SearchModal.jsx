import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Download, Sparkles, Smartphone, Layers } from "lucide-react";

export default function SearchModal({ isOpen, onClose, products, onSelectProduct }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenSearch();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const results = products.filter((p) => {
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.highlights.some((h) => h.toLowerCase().includes(q)) ||
      p.apks.some((apk) => apk.arch.toLowerCase().includes(q) || apk.type.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Search Palette Container */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-neutral-950 border border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]">
        {/* Input Bar */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all INIXA apps, codecs, APKs, or features..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 scrollbar-thin">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3">
            {results.length} Applications & Labs Matching
          </span>

          {results.map((app) => (
            <div
              key={app.id}
              onClick={() => {
                onSelectProduct(app);
                onClose();
              }}
              className="p-3.5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group border border-transparent hover:border-white/10"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ backgroundColor: `${app.color}33`, color: app.color }}
                >
                  {app.iconGlyph}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {app.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/10 text-neutral-300">
                      {app.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{app.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300">
                  {app.apks.length} APK{app.apks.length > 1 ? "s" : ""}
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 px-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>Navigate with mouse or click</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
