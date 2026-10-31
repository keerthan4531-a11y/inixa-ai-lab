import React from "react";
import { ArrowDown, Download, Sparkles, Smartphone, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import InixaHero3D from "./InixaHero3D.jsx";
import { INIXA_MANIFESTO } from "../data/inixaProducts.js";

export default function InixaHero({ onNavigate }) {
  return (
    <section id="overview" className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* 3D Three.js Interactive Holographic Core Background */}
      <InixaHero3D />

      {/* Ambient gradient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Futuristic Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-400/40 text-cyan-200 text-xs font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="tracking-wide">INIXA LABS • FRONTIERS OF AI & MOBILE SOFTWARE</span>
          <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-mono">
            8 APPS LIVE
          </span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Where Generative AI Meets{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Flagship Mobile
          </span>{" "}
          Craftsmanship.
        </h1>

        {/* Narrative Description */}
        <p className="max-w-3xl mx-auto text-neutral-300 text-base sm:text-xl font-normal leading-relaxed">
          Explore our suite of next-gen mobile innovations: from the <span className="text-white font-medium">INIXA AI</span> companion and <span className="text-white font-medium">Beat Box Ultra</span> liquid music engine to <span className="text-white font-medium">Liquid Stream</span> and <span className="text-white font-medium">Lumina Privacy Browser</span>.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate("experiments")}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Explore Labs Directory</span>
          </button>

          <button
            onClick={() => onNavigate("apk-hub")}
            className="px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-sm border border-white/20 backdrop-blur-lg hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Get Direct APKs (13 Binaries)</span>
          </button>

          <button
            onClick={() => onNavigate("showcase-3d")}
            className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm border border-white/10 backdrop-blur-lg transition-all flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>3D Device View</span>
          </button>
        </div>

        {/* Live Ecosystem Metrics Strip */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {INIXA_MANIFESTO.ecosystemStats.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-center hover:border-cyan-500/40 transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-black text-white">{item.value}</p>
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Down arrow scroll hint */}
      <button
        onClick={() => onNavigate("experiments")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 rounded-full text-neutral-500 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
