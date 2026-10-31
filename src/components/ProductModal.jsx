import React, { useState, useEffect } from "react";
import { X, Download, Eye, Sparkles, Check, ChevronLeft, ChevronRight, Smartphone, Shield, Cpu, Layers } from "lucide-react";
import confetti from "canvas-confetti";

export default function ProductModal({ product, onClose }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, screenshots, apks
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, onClose]);

  if (!product) return null;

  const handleDownload = (apk) => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7", "#f59e0b", "#10b981"],
    });
    window.location.href = apk.downloadUrl;
  };

  const screenshots = product.screenshots || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-neutral-950 border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg"
              style={{ background: product.accentGradient }}
            >
              {product.iconGlyph}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">{product.name}</h3>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: product.accentGradient }}
                >
                  {product.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {product.version} • {product.categoryLabel} • Updated {product.updatedAt}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-white/[0.01]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "overview"
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Overview & Features
          </button>
          <button
            onClick={() => setActiveTab("screenshots")}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "screenshots"
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Screenshots ({screenshots.length})
          </button>
          <button
            onClick={() => setActiveTab("apks")}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "apks"
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            All APK Releases ({product.apks.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8 scrollbar-thin">
          {/* TAB 1: OVERVIEW & FEATURES */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Tagline & Long Description */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">{product.tagline}</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {product.longDesc}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  Flagship Innovations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-neutral-900/80 border border-white/5 flex items-start gap-2.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-neutral-200 leading-normal">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured Feature Breakdown */}
              {product.features && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                    Architectural Deep-Dive
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <h5 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>{feat.title}</span>
                        </h5>
                        <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Screenshot teaser preview strip */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Visual Previews
                  </h4>
                  <button
                    onClick={() => setActiveTab("screenshots")}
                    className="text-xs text-cyan-400 hover:underline font-medium"
                  >
                    View All {screenshots.length} Screens →
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {screenshots.slice(0, 6).map((shot, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveTab("screenshots");
                        setLightboxIndex(i);
                      }}
                      className="aspect-[9/16] rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:border-cyan-400 transition-all transform hover:scale-105"
                    >
                      <img src={shot.src} alt={shot.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCREENSHOTS & LIGHTBOX */}
          {activeTab === "screenshots" && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative rounded-2xl overflow-hidden aspect-[9/16] border border-white/10 bg-neutral-900 cursor-pointer hover:border-cyan-400 hover:shadow-xl transition-all"
                  >
                    <img
                      src={shot.src}
                      alt={shot.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold text-white truncate">{shot.title}</p>
                      <p className="text-[10px] text-neutral-400 line-clamp-1">{shot.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ALL APK VERSIONS & DOWNLOAD MATRIX */}
          {activeTab === "apks" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs">
                All binaries are clean, virus-checked, and cryptographically verified.
                Compatible with Android 5.0 through Android 15+.
              </div>

              <div className="space-y-3">
                {product.apks.map((apk, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{apk.fileName}</span>
                        {apk.recommended && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-neutral-400 font-mono">
                        <span>Arch: {apk.arch}</span>
                        <span>•</span>
                        <span>Size: {apk.size}</span>
                        <span>•</span>
                        <span>Min: {apk.minSdk}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(apk)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download APK</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">
            INIXA Open Ecosystem • Direct Local Download
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR SCREENSHOTS */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev/Next buttons */}
          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
            }
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setLightboxIndex((prev) => (prev + 1) % screenshots.length)}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox image */}
          <div className="max-w-md max-h-[80vh] flex flex-col items-center">
            <img
              src={screenshots[lightboxIndex].src}
              alt={screenshots[lightboxIndex].title}
              className="max-h-[75vh] w-auto rounded-3xl border border-white/20 shadow-2xl object-contain"
            />
            <div className="text-center mt-4">
              <p className="text-white font-bold text-sm">{screenshots[lightboxIndex].title}</p>
              <p className="text-neutral-400 text-xs mt-1">{screenshots[lightboxIndex].caption}</p>
              <p className="text-neutral-500 font-mono text-[10px] mt-2">
                {lightboxIndex + 1} of {screenshots.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
