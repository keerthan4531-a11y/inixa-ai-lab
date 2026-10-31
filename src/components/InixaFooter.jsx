import React from "react";
import { ArrowUp, Sparkles, Shield, Code2, Heart, Layers } from "lucide-react";
import { INIXA_MANIFESTO, PRODUCTS } from "../data/inixaProducts.js";

export default function InixaFooter({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-60 bg-gradient-to-t from-cyan-900/20 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brand Showcase Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-black text-xl bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                    IX
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-wider text-white">
                  INIXA <span className="text-cyan-400">LABS</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {INIXA_MANIFESTO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
              {INIXA_MANIFESTO.mission}
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {INIXA_MANIFESTO.ecosystemStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300"
                >
                  <span className="font-bold text-white">{stat.value}</span>{" "}
                  <span className="text-neutral-500">• {stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Directory */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Software Ecosystem
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {PRODUCTS.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onNavigate("experiments")}
                  className="text-left text-neutral-400 hover:text-cyan-300 transition-colors py-1 flex items-center gap-1.5"
                >
                  <span className="text-cyan-400">•</span>
                  <span>{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Navigation & Direct APK Hub */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Access
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <button
                  onClick={() => onNavigate("showcase-3d")}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  3D Interactive Hardware Display
                </button>
              </div>
              <div>
                <button
                  onClick={() => onNavigate("beatbox-flagship")}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Beat Box Ultra Master Stage
                </button>
              </div>
              <div>
                <button
                  onClick={() => onNavigate("ai-playground")}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  INIXA AI Simulation Lab
                </button>
              </div>
              <div>
                <button
                  onClick={() => onNavigate("apk-hub")}
                  className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>All 13 APK Binaries</span> →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 INIXA LABS. Engineered with pride for freedom, speed, and privacy.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
