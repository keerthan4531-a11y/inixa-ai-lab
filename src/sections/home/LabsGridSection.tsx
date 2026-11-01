import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { SpotlightCard } from '../../components/react-bits/SpotlightCard'
import { SafeImage } from '../../components/common/SafeImage'
import { navigate, Link } from '../../router'
import {
  Download,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
  Volume2,
  Play,
  ExternalLink,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react'

// Curated verified cover images for each product ensuring stunning visuals
const PRODUCT_COVERS: Record<string, string> = {
  'beatbox-pro': '/shots/beat-pro/31031e0e-1853-409b-ae3b-e8017f365d7b.jpg',
  'beatbox-lite': '/shots/beat-box-lite/68b49f8c-9460-4dd6-a897-9b104d396ce4.jpg',
  'beatbox-ultra': '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg',
  'mytube': '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg',
  'lumina': '/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg',
  'liquid-stream': '/shots/liquid-streaming/42ef5c25-7aac-48ce-80d0-606989fba156.jpg',
  'clipster': '/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg',
  'wikipedia-app': '/shots/wikipedia-app/1_en-US.png',
  'inixa-ai': '/shots/inixa-ai/image.png'
}

export const LabsGridSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Experiments', count: ALL_PRODUCTS.length },
    { id: 'audio', label: 'Audiophile Engines', count: 3 },
    { id: 'streaming', label: 'Cinema & Video', count: 2 },
    { id: 'ai', label: 'AI & Intelligence', count: 1 },
    { id: 'browser', label: 'Privacy Browsers', count: 1 },
    { id: 'utility', label: 'Extractors & Tools', count: 1 },
    { id: 'knowledge', label: 'AI Encyclopedia', count: 1 },
  ]

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return ALL_PRODUCTS
    if (activeCategory === 'streaming') {
      return ALL_PRODUCTS.filter((p) => p.category === 'streaming' || p.category === 'video')
    }
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6" id="experiments">
      {/* Background atmospheric ambient aura — Light Green + Dark Pink over Dark Blue */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-r from-emerald-500/15 via-pink-600/15 to-emerald-400/10 blur-[130px] rounded-full" aria-hidden="true" />

      {/* Header section with ultra-modern typography and animated pill badge */}
      <div className="mb-14 text-center relative z-10">
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-950/70 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-emerald-300 shadow-[0_0_20px_rgba(0,255,135,0.18)] backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] animate-ping" />
          <Layers className="h-3.5 w-3.5 text-[#00ff87]" aria-hidden="true" />
          <span>INIXA LABS REPOSITORY • 9 FLAGSHIPS</span>
        </div>

        <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Experiments &amp;{' '}
          <span className="bg-gradient-to-r from-[#00ff87] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
            Production Flagships
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          All 9 physical mobile and desktop software architectures — bit-perfect audio, autonomous air-gapped AI, hardened web privacy, and zero-ad stream pipelines.
        </p>

        {/* Floating Liquid Category Filter Chips */}
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:items-center sm:justify-center sm:px-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
                className={`group relative flex min-h-11 shrink-0 items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-400 via-green-400 to-[#00ff87] text-black shadow-[0_0_24px_rgba(0,255,135,0.4)] scale-[1.03]'
                    : 'border border-white/12 bg-[#040a18]/70 text-white/75 hover:border-emerald-400/40 hover:bg-[#060f24] hover:text-white backdrop-blur-md'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                    isActive
                      ? 'bg-black/25 text-black font-extrabold'
                      : 'bg-white/10 text-white/60 group-hover:bg-white/20'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-20 text-center text-sm text-white/55">No products in this category yet.</p>
      ) : (
        /* 9 Products Grid powered by React Bits SpotlightCard with interactive cursor follow */
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {filteredProducts.map((prod) => {
            const latestApk = prod.apks?.[prod.apks.length - 1]
            const firstFeature = prod.features[0]
            const coverPath = PRODUCT_COVERS[prod.id] || Object.values(SCREENSHOT_MAP[prod.id] || {})[0]?.assetPath

            return (
              <SpotlightCard
                key={prod.id}
                spotlightColor={`${prod.accentColor || '#00ff87'}38`}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-white/12 bg-[#040a18]/95 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_24px_65px_rgba(0,255,135,0.18)] hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/product/${prod.id}`)}
              >
                {/* 1. Real Physical Device Mockup Showcase Header */}
                <div className="relative h-72 sm:h-80 w-full flex flex-col items-center justify-end pt-12 pb-3.5 px-4 bg-gradient-to-b from-[#020612] via-[#040a18] to-[#060d22] border-b border-white/10 overflow-hidden">
                  {/* Subtle radial aura behind phone */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: `radial-gradient(circle at center, ${prod.accentColor || '#00ff87'}, transparent 65%)` }}
                  />

                  {/* Physical Smartphone Shell with notch and real app screen */}
                  <div className="relative h-full max-h-[245px] sm:max-h-[265px] aspect-[9/19] rounded-[22px] border-[2.5px] border-white/30 bg-black shadow-[0_16px_36px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-emerald-400/60 group-hover:-translate-y-1">
                    {/* Dynamic Notch / Island */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full border border-white/15 z-30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-600 mr-2" />
                      <div className="w-1 h-1 rounded-full bg-blue-900" />
                    </div>

                    {/* Screenshot displaying verified real hardware app capture */}
                    <img
                      src={coverPath}
                      alt={`${prod.name} verified physical capture`}
                      loading="eager"
                      className="h-full w-full object-cover object-top"
                    />

                    {/* Glass Reflection Sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                  </div>

                  {/* Floating "100% Real Device" verified hardware pill */}
                  <div className="absolute bottom-2.5 right-3 hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-black/85 px-2 py-0.5 text-[9px] font-mono text-emerald-300 shadow-md backdrop-blur-md z-20 pointer-events-none">
                    <ShieldCheck className="h-2.5 w-2.5 text-[#00ff87]" />
                    <span>Real Device</span>
                  </div>

                  {/* Top Floating Badge Bar with Live Status Indicator — with clean clearance above phone */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-20 pointer-events-none">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xl backdrop-blur-xl"
                      style={{
                        backgroundColor: `${prod.accentColor || '#00ff87'}38`,
                        borderColor: `${prod.accentColor || '#00ff87'}77`,
                      }}
                    >
                      {prod.category === 'audio' ? (
                        <span className="flex items-end gap-0.5 h-2.5 mr-0.5">
                          <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                          <span className="w-0.5 h-3 bg-amber-300 animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse" />
                        </span>
                      ) : prod.category === 'browser' ? (
                        <ShieldCheck className="h-3.5 w-3.5 text-[#00ff87]" />
                      ) : prod.category === 'ai' ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] animate-ping" />
                      ) : (
                        <Zap className="h-3 w-3 text-pink-400" />
                      )}
                      {prod.badge || 'FLAGSHIP'}
                    </span>

                    <span className="rounded-full border border-white/15 bg-black/80 px-2.5 py-0.5 text-[10px] font-mono font-medium text-white/80 backdrop-blur-md">
                      {prod.platform.split('(')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* 2. Card Content Body */}
                <div className="flex flex-1 flex-col p-6 pt-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black tracking-tight text-white transition-colors duration-200 group-hover:text-emerald-300">
                      {prod.name}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                      {latestApk ? latestApk.version : prod.specs['Engine Version'] || 'v1.0'}
                    </span>
                  </div>

                  <p className="mb-5 text-xs sm:text-sm leading-relaxed text-white/65 line-clamp-2">
                    {prod.tagline}
                  </p>

                  {/* Feature Spotlight Box */}
                  {firstFeature && (
                    <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors group-hover:border-pink-500/30 group-hover:bg-pink-950/15">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-white/90">
                        <Sparkles className="h-3 w-3 text-pink-400" aria-hidden="true" />
                        <span className="truncate">{firstFeature.title}</span>
                      </div>
                      <div className="text-xs leading-relaxed text-white/55 line-clamp-2">
                        {firstFeature.description}
                      </div>
                    </div>
                  )}

                  {/* 3. Card Footer Action Bar */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4.5">
                    {latestApk ? (
                      <a
                        href={encodeURI(latestApk.downloadPath)}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-400"
                        aria-label={`Download ${prod.name} ${latestApk.version} APK (${latestApk.sizeFormatted})`}
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Get APK</span>
                        <span className="text-[10px] font-mono text-emerald-400/70">({latestApk.sizeFormatted})</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/45 font-mono">
                        <Cpu className="h-3.5 w-3.5" /> Desktop Native
                      </span>
                    )}

                    <Link
                      to={`/product/${prod.id}`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/90 transition-all group-hover:border-emerald-400/50 group-hover:text-emerald-300 group-hover:bg-emerald-500/10"
                      aria-label={`View ${prod.name} details`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      )}
    </section>
  )
}
