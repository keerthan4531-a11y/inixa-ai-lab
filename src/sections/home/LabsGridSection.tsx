import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { SpotlightCard } from '../../components/react-bits/SpotlightCard'
import PictureRailGallery, { PictureRailItem } from '../../components/ui/picture-rail-gallery'
import { navigate, Link } from '../../router'
import { DoodleIcon } from '../../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin } from '../../components/doodle/DoodleCritters'
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
  CheckCircle2,
  LayoutGrid,
  Frame
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

/** 9 Flagship Products formatted for the interactive PictureRailGallery (Hanging Smartphones) */
const FLAGSHIP_RAIL_ITEMS: PictureRailItem[] = [
  {
    id: 'beatbox-pro',
    title: 'BeatBox Pro',
    artist: 'Audiophile DSP • Direct ALSA 32-bit',
    year: 'v2.4.2',
    image: PRODUCT_COVERS['beatbox-pro'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.02,
    tag: 'v2.4.2 • 85.4 MB',
    apkUrl: '/apks/BeatBox%20Pro_2.4.2.apk',
    details: [
      'com.inixa.beatbox.pro',
      '31-Band Parametric DSP Engine',
      'Direct ALSA / USB DAC Bit-Perfect Stream',
      'Verified SHA-256 • 0 Telemetry Trackers'
    ]
  },
  {
    id: 'beatbox-lite',
    title: 'BeatBox Lite',
    artist: 'Featherweight Hybrid Audio & Cinema',
    year: 'v1.2.0',
    image: PRODUCT_COVERS['beatbox-lite'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: -0.01,
    tag: 'v1.2.0 • 10.9 MB',
    apkUrl: '/apks/BeatBox%20Lite%201.2.0.apk',
    details: [
      'com.inixa.beatbox.lite',
      'Sub-15MB Featherweight Kotlin Core',
      'Zero-Latency Local Offline Vault',
      'Cross-Platform Streaming Pipeline'
    ]
  },
  {
    id: 'beatbox-ultra',
    title: 'BeatBox Ultra',
    artist: 'Liquid Glass Audiophile Architecture',
    year: 'v1.0.405',
    image: PRODUCT_COVERS['beatbox-ultra'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.03,
    tag: 'v1.0.405 • 133.2 MB',
    apkUrl: '/apks/BeatBox_Ultra_1.0.405.apk',
    details: [
      'com.inixa.beatbox.ultra',
      'Real-Time Frosted Glass Shaders (Haze)',
      'Dynamic Chromatic Palette Sync',
      'ExoPlayer 120Hz Lossless FLAC Stream'
    ]
  },
  {
    id: 'mytube',
    title: 'MyTube',
    artist: 'Zero-Ad Decentralized Stream Extractor',
    year: 'v3.1.0',
    image: PRODUCT_COVERS['mytube'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.01,
    tag: 'v3.1.0 • 42.1 MB',
    apkUrl: '/apks/MyTube%203.1.0.apk',
    details: [
      'com.inixa.mytube',
      'Invidious & Piped Decentralized Gateway',
      'True Background PIP Video Engine',
      'Automated SponsorBlock Segment Skipping'
    ]
  },
  {
    id: 'lumina',
    title: 'Lumina Browser',
    artist: 'Hardened Tor & Web Privacy Sandbox',
    year: 'v5.295.3',
    image: PRODUCT_COVERS['lumina'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.02,
    tag: 'v5.295.3 • 68.4 MB',
    apkUrl: '/apks/Lumina%20Browser_5.295.3.apk',
    details: [
      'com.inixa.lumina.browser',
      'Air-Gapped Privacy & Tor Circuit Routing',
      'One-Tap Memory Wipe & Cache Eraser',
      'Zero Third-Party Telemetry Trackers'
    ]
  },
  {
    id: 'liquid-stream',
    title: 'Liquid Stream',
    artist: 'Edge HLS Cinema & 4K Broadcaster',
    year: 'v1.4.2',
    image: PRODUCT_COVERS['liquid-stream'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: -0.01,
    tag: 'v1.4.2 • 54.8 MB',
    apkUrl: '/apks/Liquid%20Stream%201.4.2.apk',
    details: [
      'com.inixa.liquid.stream',
      'Edge HLS Ultra-Low Latency Streaming',
      'Gesture Luminance & Volume Dial Physics',
      'Hardware-Accelerated AV1 & HEVC Codecs'
    ]
  },
  {
    id: 'clipster',
    title: 'Clipster',
    artist: 'Hardware Media Slicer & Transcoder',
    year: 'v2.0.0',
    image: PRODUCT_COVERS['clipster'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.02,
    tag: 'v2.0.0 • 32.1 MB',
    apkUrl: '/apks/Clipster%202.0.0.apk',
    details: [
      'com.inixa.clipster',
      'Multi-Thread Concurrent Media Fetcher',
      'Lossless Sample Slicer & Tone Extractor',
      'Zero Ads • 100% Local Utility Runtime'
    ]
  },
  {
    id: 'wikipedia-app',
    title: 'Infopedia Alpha',
    artist: 'Decentralized Offline Knowledge Base',
    year: 'v2.7.0',
    image: PRODUCT_COVERS['wikipedia-app'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.01,
    tag: 'v2.7.0 • 28.6 MB',
    apkUrl: '/apks/Wikipedia_2.7.50508-r-2025-02-14.apk',
    details: [
      'org.inixa.infopedia',
      'Grounded Autonomous Local Knowledge Base',
      'ZIM Compressed Universal Archive',
      'Zero Cloud Dependency • Private Search'
    ]
  },
  {
    id: 'inixa-ai',
    title: 'INIXA AI',
    artist: 'Autonomous On-Device Neural Sandbox',
    year: 'v1.0.0',
    image: PRODUCT_COVERS['inixa-ai'],
    aspect: 0.48,
    frame: 'black',
    mat: false,
    drop: 0.03,
    tag: 'v1.0.0 • 94.2 MB',
    apkUrl: '/downloads',
    details: [
      'com.inixa.ai.agent',
      'Air-Gapped Local LLM & Multi-Agent Matrix',
      'Private Hardware Memory Containment',
      'Direct Snapdragon NPU & GPU Acceleration'
    ]
  }
]

export const LabsGridSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'gallery' | 'grid'>('gallery')
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
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6" id="experiments">
      {/* Background atmospheric ambient aura — Light Green + Dark Pink over Dark Blue */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-r from-emerald-500/15 via-pink-600/15 to-emerald-400/10 blur-[130px] rounded-full" aria-hidden="true" />

      {/* Header section with doodle sketchbook typography and stamped badge */}
      <div className="mb-10 text-center relative z-10">
        {/* Playful Cat, Bird, and Penguin crew on top of section */}
        <div className="flex items-center justify-center gap-6 -mb-2 relative z-20 pointer-events-auto">
          <DoodleBird pose="singing" size={48} speech="Chirp! 9 mastercrafted apps ♪" speechAlign="top" />
          <DoodleCat pose="sitting" size={56} speech="All 9 flagships audited! 🐾" speechAlign="top" />
          <DoodlePenguin pose="waddling" size={50} speech="Waddling through the lab 🐧" speechAlign="top" />
        </div>

        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs font-mono font-black tracking-widest text-[#00ff87] shadow-[3px_3px_0_#be185d] -rotate-1">
          <DoodleIcon kind="bolt" size={14} />
          <span>INIXA LABS REPOSITORY • 9 FLAGSHIPS</span>
          <DoodleIcon kind="sparkle" size={14} />
        </div>

        <h2 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Experiments &amp;{' '}
          <span className="text-[#00ff87] relative inline-block">
            Production Flagships
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base font-medium">
          All 9 physical mobile and desktop software architectures — bit-perfect audio, autonomous air-gapped AI, hardened web privacy, and zero-ad stream pipelines.
        </p>

        {/* View Mode Toggle: Interactive Hanging Gallery vs Technical Cards */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="relative inline-flex items-center p-1.5 rounded-full border-2 border-white bg-[#040a18] shadow-[4px_4px_0_#00ff87]">
            {/* Sleeping Cat napping on View Toggle */}
            <div className="absolute -top-7 right-4 z-20 hidden sm:block pointer-events-auto">
              <DoodleCat pose="sleeping" size={48} speechAlign="top" />
            </div>

            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Frame className="w-3.5 h-3.5" />
              <span>Hanging Rail Gallery Wall</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Technical Cards Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: PictureRailGallery — Full-Screen Edge-to-Edge Hanging Smartphone Wall */}
      {viewMode === 'gallery' && (
        <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden my-4 py-4 transition-all duration-500">
          <PictureRailGallery
            items={FLAGSHIP_RAIL_ITEMS}
            eyebrow="Physical Software Gallery • 9 Hanging Flagships"
            heading="Handcrafted Physical Software Framed &amp; Verified"
            caption="Slide or brush the rail to swing the phones. Click or lift any phone to flip its 3D architecture specs."
            autoplay={true}
            interval={3500}
            action={
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => navigate('/downloads')}
                  className="doodle-btn doodle-btn-green px-6 py-2.5 text-xs font-black uppercase text-[#020612]"
                >
                  <DoodleIcon kind="bolt" size={15} />
                  <span>Direct APK Vault (15 Builds)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className="doodle-btn doodle-btn-outline px-5 py-2.5 text-xs font-black text-white hover:text-[#00ff87]"
                >
                  <span>Switch to Technical Cards Grid</span>
                </button>
              </div>
            }
          />
        </div>
      )}

      {/* VIEW 2: Technical Cards Grid with Category Filters */}
      {viewMode === 'grid' && (
        <div className="relative z-10 transition-all duration-500">
          {/* Doodle Category Filter Chips */}
          <div className="no-scrollbar -mx-4 mb-10 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:items-center sm:justify-center sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`group relative flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00ff87] text-[#020612] border-2 border-white shadow-[3px_3px_0_#be185d] -rotate-1 scale-105'
                      : 'border-2 border-white/40 bg-[#040a18] text-white hover:border-white hover:text-[#00ff87] shadow-[2px_2px_0_rgba(255,255,255,0.2)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                      isActive
                        ? 'bg-black text-[#00ff87] font-black'
                        : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="py-20 text-center text-sm text-white/55">No products in this category yet.</p>
          ) : (
            /* 9 Products Grid styled with Living Sketchbook Doodle Cards */
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((prod, pIdx) => {
                const latestApk = prod.apks?.[prod.apks.length - 1]
                const firstFeature = prod.features[0]
                const coverPath = PRODUCT_COVERS[prod.id] || Object.values(SCREENSHOT_MAP[prod.id] || {})[0]?.assetPath
                const cardShadow = pIdx % 2 === 0 ? '#be185d' : '#00ff87'

                return (
                  <SpotlightCard
                    key={prod.id}
                    spotlightColor={`${prod.accentColor || '#00ff87'}25`}
                    className="group flex flex-col overflow-hidden rounded-[28px] border-2 border-white bg-[#040a18] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{ boxShadow: `6px 6px 0 ${cardShadow}` }}
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

                      {/* Top Floating Badge Bar with Live Status Indicator */}
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
                      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-white/20 pt-4">
                        {latestApk ? (
                          <a
                            href={encodeURI(latestApk.downloadPath)}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="doodle-btn doodle-btn-green px-3.5 py-1.5 text-xs font-black text-[#020612]"
                            aria-label={`Download ${prod.name} ${latestApk.version} APK (${latestApk.sizeFormatted})`}
                          >
                            <DoodleIcon kind="bolt" size={14} />
                            <span>Get APK</span>
                            <span className="text-[10px] font-mono text-black/80 font-bold">({latestApk.sizeFormatted})</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                            <Cpu className="h-3.5 w-3.5 text-[#00ff87]" /> Desktop Native
                          </span>
                        )}

                        <Link
                          to={`/product/${prod.id}`}
                          className="doodle-btn doodle-btn-outline px-3.5 py-1.5 text-xs font-black text-white hover:text-[#00ff87]"
                          aria-label={`View ${prod.name} details`}
                        >
                          <span>Explore</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#00ff87] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                )
              })}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
