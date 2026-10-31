import React from 'react'
import { GlassHeroScene } from '../../components/3d/GlassHeroScene'
import { GlassButton } from '../../components/common/GlassButton'
import { Sparkles, Download, ArrowRight, ShieldCheck, Cpu } from 'lucide-react'

interface HeroSectionProps {
  onOpenSearch?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSearch }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Liquid Glass Canvas */}
      <GlassHeroScene />

      {/* Ambient gradient caustics */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 shadow-lg backdrop-blur-xl mb-6">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>INIXA AI LABS 2026 SHOWCASE</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]">
          Frontiers of AI &amp; <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Liquid Glass Flagships
          </span>
        </h1>

        {/* Lede Summary */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/70 mb-10 leading-relaxed">
          Explore our complete ecosystem of 9 native applications: audiophile bit-perfect players,
          autonomous AI sandboxes, hardened privacy browsers, and zero-ad stream extractors—rendered with real optical refraction and zero telemetry.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <GlassButton
            href="/products"
            variant="primary"
            className="!px-6 !py-3 !text-sm"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Explore 9 Products
          </GlassButton>

          <GlassButton
            href="/downloads"
            className="!px-6 !py-3 !text-sm"
            icon={<Download className="h-4 w-4 text-cyan-400" />}
          >
            Download 15 APKs
          </GlassButton>

          <GlassButton
            onClick={onOpenSearch}
            variant="ghost"
            className="!px-5 !py-3 !text-sm text-white/70"
          >
            Search (⌘K)
          </GlassButton>
        </div>

        {/* Verified Hardware Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="text-xl font-black text-cyan-400">9 Flagships</div>
            <div className="text-xs text-white/50">Native Android &amp; Desktop</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="text-xl font-black text-blue-400">15 Binaries</div>
            <div className="text-xs text-white/50">Direct verified APKs</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="text-xl font-black text-purple-400">56 Screens</div>
            <div className="text-xs text-white/50">Captured on real hardware</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="text-xl font-black text-emerald-400">0 Telemetry</div>
            <div className="text-xs text-white/50">Private &amp; open-source</div>
          </div>
        </div>
      </div>
    </section>
  )
}
