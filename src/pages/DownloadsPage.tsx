import React, { useState, useMemo, useEffect, useRef } from 'react'
import { ALL_APKS } from '../data/apks'
import { PRODUCTS_BY_ID } from '../data/products'
import { ProductIcon } from '../components/products/ProductIcons'
import { InixaFooter } from '../components/footer/InixaFooter'
import {
  ART,
  ACCENT,
  Doodle,
  DoodleIcon,
  DoodleKind,
  CrewKind,
  clamp,
} from '../components/footer/DoodleCrewFooter'
import { copyToClipboard } from '../utils/clipboard'
import { navigate } from '../router'
import {
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  QrCode,
  HardDrive,
  Cpu,
  Calendar,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'

// Character mapping for each product to give every release a unique living mascot
const PRODUCT_MASCOTS: Record<string, { kind: CrewKind; quote: string; accentColor: string }> = {
  'beatbox-pro': {
    kind: 'yeti',
    quote: 'Bit-perfect 32-bit ALSA audio pipeline verified!',
    accentColor: '#FF7A1A',
  },
  'beatbox-lite': {
    kind: 'bird',
    quote: 'Ultra-lightweight under 15MB. Featherweight speed!',
    accentColor: '#00D2FF',
  },
  'beatbox-ultra': {
    kind: 'mushroom',
    quote: 'Liquid glass caustics & real-time blur tuned!',
    accentColor: '#00FF87',
  },
  'mytube': {
    kind: 'cat',
    quote: 'SponsorBlock built-in. Zero ad tracking!',
    accentColor: '#FF2A55',
  },
  'lumina': {
    kind: 'ghost',
    quote: 'Air-gapped privacy vault. Zero Google telemetry!',
    accentColor: '#00B4D8',
  },
  'liquid-stream': {
    kind: 'kid',
    quote: 'Hardware accelerated 120Hz cinema stream!',
    accentColor: '#A855F7',
  },
  'clipster': {
    kind: 'yeti',
    quote: 'Offline audio extraction engine ready!',
    accentColor: '#10B981',
  },
  'wikipedia-app': {
    kind: 'bird',
    quote: 'Offline Wikipedia knowledge base with instant indexing!',
    accentColor: '#3B82F6',
  },
  'wikipedia-infopedia': {
    kind: 'bird',
    quote: 'Offline Wikipedia knowledge base with instant indexing!',
    accentColor: '#3B82F6',
  },
  'inixa-ai': {
    kind: 'kid',
    quote: 'Local on-device neural model inference active!',
    accentColor: '#D946EF',
  },
}

// Doodle Category tabs
const CATEGORIES: { id: string; label: string; doodle: DoodleKind; count: number }[] = [
  { id: 'all', label: 'All Releases', doodle: 'bolt', count: 15 },
  { id: 'audio', label: 'Audio Systems', doodle: 'flame', count: 7 },
  { id: 'video', label: 'Video & Cinema', doodle: 'sparkle', count: 3 },
  { id: 'ai', label: 'AI & Knowledge', doodle: 'star', count: 3 },
  { id: 'privacy', label: 'Privacy & Web', doodle: 'heart', count: 2 },
]

// Interactive Doodle Mascot Component
const DoodleMascot: React.FC<{
  kind: CrewKind
  size?: number
  quote?: string
  color?: string
  speechAlign?: 'top' | 'left' | 'right'
}> = ({ kind, size = 70, quote, color = '#00ff87', speechAlign = 'top' }) => {
  const [talking, setTalking] = useState(false)
  const [hopping, setHopping] = useState(false)
  const timerRef = useRef<number | null>(null)

  const art = ART[kind]
  if (!art) return null

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTalking(true)
    setHopping(true)
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setTalking(false)
      setHopping(false)
    }, 3200)
  }

  // Calculate viewBox
  const pad = 12
  const vx = art.box.l - pad
  const vy = art.box.t - pad
  const vw = art.box.r - art.box.l + pad * 2
  const vh = art.box.b - art.box.t + pad * 2

  return (
    <div
      className="relative inline-block select-none cursor-pointer group"
      onClick={handleClick}
      title="Click me!"
    >
      {/* Speech Bubble */}
      {talking && quote && (
        <div
          className={`absolute z-30 pointer-events-none whitespace-nowrap bg-[#040a18] text-[#00ff87] border-2 border-[#00ff87] rounded-2xl px-3 py-1.5 text-xs font-bold shadow-[3px_3px_0_#be185d] animate-in fade-in zoom-in duration-200 ${
            speechAlign === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              : speechAlign === 'left'
              ? 'bottom-full right-0 mb-2'
              : 'bottom-full left-0 mb-2'
          }`}
        >
          <span>{quote}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#040a18] border-r-2 border-b-2 border-[#00ff87] rotate-45" />
        </div>
      )}

      {/* Mascot SVG */}
      <svg
        viewBox={`${vx} ${vy} ${vw} ${vh}`}
        width={size}
        height={size}
        className={`transition-transform duration-200 ${
          hopping ? '-translate-y-2 scale-110' : 'group-hover:-translate-y-1 group-hover:scale-105'
        }`}
        style={{
          filter: `drop-shadow(2px 3px 0px rgba(0,0,0,0.8)) drop-shadow(0 0 10px ${color}35)`,
        }}
      >
        <g className="dcf-art">
          {art.body('none')}
          {art.eyes.map((eye, i) => (
            <g key={i}>
              {eye.r > 0 && <circle cx={eye.x} cy={eye.y} r={eye.r} />}
              <circle className="k" cx={eye.x} cy={eye.y} r={eye.pupil} />
              <circle
                className="dcf-glint"
                cx={eye.x + eye.pupil * 0.35}
                cy={eye.y - eye.pupil * 0.4}
                r={eye.pupil * 0.32}
              />
            </g>
          ))}
          {art.front?.()}
        </g>
      </svg>
    </div>
  )
}

export const DownloadsPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedChangelogs, setExpandedChangelogs] = useState<Record<string, boolean>>({})
  const [qrModalApk, setQrModalApk] = useState<(typeof ALL_APKS)[0] | null>(null)

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const toggleChangelog = (key: string) => {
    setExpandedChangelogs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const getProductRouteId = (id: string) => {
    if (id === 'wikipedia-infopedia') return 'wikipedia-app'
    return id
  }

  // Filter APKs
  const filteredApks = useMemo(() => {
    return ALL_APKS.filter((apk) => {
      let matchesCategory = true
      if (selectedCategory === 'audio') {
        matchesCategory = ['beatbox-pro', 'beatbox-lite', 'beatbox-ultra'].includes(apk.productId)
      } else if (selectedCategory === 'video') {
        matchesCategory = ['mytube', 'liquid-stream'].includes(apk.productId)
      } else if (selectedCategory === 'ai') {
        matchesCategory = ['inixa-ai', 'wikipedia-infopedia', 'wikipedia-app'].includes(
          apk.productId
        )
      } else if (selectedCategory === 'privacy') {
        matchesCategory = ['lumina', 'clipster'].includes(apk.productId)
      }

      const q = search.toLowerCase()
      const matchesSearch =
        apk.productName.toLowerCase().includes(q) ||
        apk.version.toLowerCase().includes(q) ||
        apk.fileName.toLowerCase().includes(q) ||
        apk.abi.toLowerCase().includes(q) ||
        (apk.sha256 && apk.sha256.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, search])

  return (
    <div className="relative min-h-screen pt-28 pb-12 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white overflow-hidden font-sans">
      {/* Doodle Sketch Hatch Background & Living Ink Styles */}
      <style>{`
        .doodle-card {
          position: relative;
          background: #040a18;
          border: 2.5px solid #ffffff;
          box-shadow: 6px 6px 0 #be185d;
          transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.2s cubic-bezier(0.3, 1.4, 0.5, 1);
        }
        .doodle-card:hover {
          transform: translateY(-3px) rotate(-0.3deg);
          box-shadow: 8px 8px 0 #00ff87;
        }
        .doodle-card.latest {
          border-color: #00ff87;
          box-shadow: 6px 6px 0 #00ff87;
        }
        .doodle-card.latest:hover {
          box-shadow: 9px 9px 0 #be185d;
        }
        .doodle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          font-weight: 850;
          letter-spacing: -0.01em;
          transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
          cursor: pointer;
        }
        .doodle-btn-green {
          background: linear-gradient(135deg, #00ff87, #10b981);
          color: #020612;
          border: 2px solid #ffffff;
          box-shadow: 4px 4px 0 #be185d;
        }
        .doodle-btn-green:hover {
          transform: translateY(-2px) rotate(-1.5deg);
          box-shadow: 6px 6px 0 #ffd23f;
        }
        .doodle-btn-green:active {
          transform: translateY(2px);
          box-shadow: 1px 1px 0 #be185d;
        }
        .doodle-btn-outline {
          background: #040a18;
          color: #ffffff;
          border: 2px solid #ffffff;
          box-shadow: 3px 3px 0 #00ff87;
        }
        .doodle-btn-outline:hover {
          transform: translateY(-2px) rotate(1.2deg);
          border-color: #00ff87;
          box-shadow: 5px 5px 0 #be185d;
        }
        .doodle-btn-outline:active {
          transform: translateY(2px);
          box-shadow: 1px 1px 0 #00ff87;
        }
        .doodle-stamp {
          border: 2px dashed #00ff87;
          transform: rotate(-2deg);
          font-weight: 900;
          text-transform: uppercase;
        }
        .dcf-art {
          fill: #060d22;
          stroke: #ffffff;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .dcf-art .k { fill: #ffffff; }
        .dcf-art .dcf-glint { fill: #060d22; stroke: none; }
        .dcf-art .thin { stroke-width: 1.5; }
        .dcf-art .thick { stroke-width: 3.4; }
        .dcf-art .a { fill: #00ff87; }
        .dcf-art .o { fill: #ff9f1c; }
        .dcf-art .r { fill: #be185d; }
      `}</style>

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-pink-600/15 blur-[150px]" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* Floating Interactive Doodle Stickers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-36 left-12 transform -rotate-12 opacity-80 animate-pulse">
          <DoodleIcon kind="flame" size={36} />
        </div>
        <div className="absolute top-48 right-16 transform rotate-12 opacity-85">
          <DoodleIcon kind="star" size={32} />
        </div>
        <div className="absolute top-[520px] left-8 transform rotate-6 opacity-75">
          <DoodleIcon kind="bolt" size={34} />
        </div>
        <div className="absolute top-[820px] right-12 transform -rotate-12 opacity-80">
          <DoodleIcon kind="sandwich" size={36} />
        </div>
        <div className="absolute top-[1200px] left-14 transform rotate-12 opacity-85">
          <DoodleIcon kind="sparkle" size={34} />
        </div>
        <div className="absolute top-[1600px] right-10 transform -rotate-6 opacity-80">
          <DoodleIcon kind="plane" size={32} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* HERO SECTION: Hand-Drawn Sketchbook Header with Mascot Crew */}
        <div className="text-center max-w-4xl mx-auto mb-14 pt-4">
          {/* Stamped Tagline Badge with Pip the Bird */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border-2 border-[#00ff87] bg-[#040a18] shadow-[3px_3px_0_#be185d] transform -rotate-1 mb-6">
            <DoodleIcon kind="bolt" size={16} />
            <span className="text-xs font-mono font-black tracking-wider uppercase text-[#00ff87]">
              LIVING SKETCHBOOK VAULT • 15 VERIFIED BUILDS
            </span>
            <DoodleIcon kind="sparkle" size={16} />
          </div>

          {/* Main Title with Bruno the Yeti peeking */}
          <div className="relative inline-block">
            {/* Bruno Mascot peeking from top right of title */}
            <div className="absolute -top-16 -right-12 sm:-right-20 z-20">
              <DoodleMascot
                kind="yeti"
                size={76}
                quote="Pure APKs! Zero Play Store bloatware."
                speechAlign="left"
              />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-4">
              Direct Binary Vault & <br />
              <span className="relative inline-block text-[#00ff87]">
                APK Distribution Hub
                {/* Hand-drawn squiggly underline */}
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4"
                    fill="none"
                    stroke="#be185d"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </div>

          <p className="mt-7 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Handcrafted Android packages compiled directly from our source repositories. Zero Google
            Play dependencies, zero telemetry tracking, and hardware-accelerated 120Hz optics.
          </p>
        </div>

        {/* 4 HAND-DRAWN SKETCH STAT CARDS WITH MASCOTS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {/* Stat 1: Verified Builds + Pip Bird */}
          <div className="relative p-5 rounded-[22px] bg-[#040a18] border-2 border-white shadow-[4px_4px_0_#00ff87] hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-black uppercase text-[#00ff87] tracking-wider">
                Direct Builds
              </span>
              <DoodleIcon kind="bolt" size={18} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">15 APKs</div>
            <p className="text-xs text-neutral-400 mt-1 font-mono">ARM64-v8a & Universal</p>
          </div>

          {/* Stat 2: SHA-256 + Boo Ghost */}
          <div className="relative p-5 rounded-[22px] bg-[#040a18] border-2 border-white shadow-[4px_4px_0_#be185d] hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-black uppercase text-[#be185d] tracking-wider">
                Integrity Seal
              </span>
              <DoodleIcon kind="star" size={18} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">SHA-256</div>
            <p className="text-xs text-neutral-400 mt-1 font-mono">Cryptographic Checksums</p>
          </div>

          {/* Stat 3: 0 Trackers + Patch Cat */}
          <div className="relative p-5 rounded-[22px] bg-[#040a18] border-2 border-white shadow-[4px_4px_0_#ffd23f] hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-black uppercase text-[#ffd23f] tracking-wider">
                Privacy Audit
              </span>
              <DoodleIcon kind="flame" size={18} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">0 Trackers</div>
            <p className="text-xs text-neutral-400 mt-1 font-mono">100% Air-Gapped Code</p>
          </div>

          {/* Stat 4: Silicon Target + Morel Mushroom */}
          <div className="relative p-5 rounded-[22px] bg-[#040a18] border-2 border-white shadow-[4px_4px_0_#a855f7] hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-black uppercase text-purple-400 tracking-wider">
                Silicon Target
              </span>
              <DoodleIcon kind="sparkle" size={18} />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">Android 8–15+</div>
            <p className="text-xs text-neutral-400 mt-1 font-mono">Snapdragon, Tensor & Dimensity</p>
          </div>
        </div>

        {/* SKETCHBOOK CATEGORY FILTER TABS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Tabs: Hand-drawn notebook stamps */}
          <div className="flex flex-wrap items-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`doodle-btn px-4 py-2 text-xs font-black transition-all ${
                    isSelected
                      ? 'bg-[#00ff87] text-[#020612] border-2 border-white shadow-[3px_3px_0_#be185d] -rotate-1 scale-105'
                      : 'bg-[#040a18] text-white border-2 border-white/40 shadow-[2px_2px_0_rgba(255,255,255,0.2)] hover:border-white hover:text-[#00ff87]'
                  }`}
                >
                  <DoodleIcon kind={cat.doodle} size={15} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected ? 'bg-black text-[#00ff87]' : 'bg-white/10 text-neutral-300'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box with Hand-drawn sketch border */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00ff87]" />
            <input
              type="text"
              placeholder="Search by app, version, or SHA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#040a18] border-2 border-white rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-neutral-400 shadow-[3px_3px_0_#00ff87] focus:outline-none focus:border-[#00ff87] focus:shadow-[4px_4px_0_#be185d] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#00ff87] text-sm font-black cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* APK RELEASE CARDS (DOODLE SKETCHBOOK STYLE) */}
        <div className="space-y-7 mb-20">
          {filteredApks.length === 0 ? (
            <div className="text-center py-20 rounded-[28px] border-2 border-dashed border-white/30 bg-[#040a18] shadow-[5px_5px_0_#be185d]">
              <div className="flex justify-center mb-3">
                <DoodleIcon kind="plane" size={48} />
              </div>
              <p className="text-white font-bold text-base">No releases match your search query.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('all')
                }}
                className="mt-3 doodle-btn doodle-btn-green px-5 py-2 text-xs"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredApks.map((apk, idx) => {
              const mascotInfo = PRODUCT_MASCOTS[apk.productId] || {
                kind: 'yeti' as CrewKind,
                quote: 'Verified standalone Android package!',
                accentColor: '#00ff87',
              }
              const copyShaId = `sha-${apk.productId}-${idx}`
              const changelogKey = `${apk.productId}-${apk.version}-${idx}`
              const isExpanded = !!expandedChangelogs[changelogKey]
              const product =
                PRODUCTS_BY_ID[apk.productId] ||
                PRODUCTS_BY_ID[getProductRouteId(apk.productId)]
              const detailRoute = `/product/${getProductRouteId(apk.productId)}`

              return (
                <div
                  key={`${apk.productId}-${apk.version}-${idx}`}
                  className={`doodle-card rounded-[26px] p-6 sm:p-7 ${
                    apk.isLatest ? 'latest' : ''
                  }`}
                >
                  {/* Peeking Doodle Mascot on the top right */}
                  <div className="absolute -top-7 right-6 sm:right-10 z-20">
                    <DoodleMascot
                      kind={mascotInfo.kind}
                      size={64}
                      quote={mascotInfo.quote}
                      color={mascotInfo.accentColor}
                      speechAlign="left"
                    />
                  </div>

                  {/* Top Row: App Icon, Name, Version Stamp, and Primary Details Button */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Product Icon in a Doodle Framed Tile */}
                      <div
                        onClick={() => navigate(detailRoute)}
                        className="cursor-pointer shrink-0 w-14 h-14 rounded-2xl bg-[#060e24] border-2 border-white flex items-center justify-center p-2.5 shadow-[3px_3px_0_#00ff87] hover:scale-105 hover:-rotate-3 transition-transform"
                        title="View Full Product Specs"
                      >
                        <ProductIcon productId={apk.productId} color={mascotInfo.accentColor} />
                      </div>

                      {/* Title & Stamped Badges */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <h3
                            onClick={() => navigate(detailRoute)}
                            className="text-2xl sm:text-3xl font-black text-white tracking-tight hover:text-[#00ff87] cursor-pointer transition-colors"
                          >
                            {apk.productName}
                          </h3>

                          {/* Version Tag */}
                          <span className="px-3 py-0.5 rounded-full text-xs font-mono font-black border-2 border-white bg-[#060e24] text-white shadow-[2px_2px_0_#be185d]">
                            {apk.version}
                          </span>

                          {/* Stamped Latest Stable Seal */}
                          {apk.isLatest && (
                            <span className="doodle-stamp inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d]">
                              <DoodleIcon kind="bolt" size={12} />
                              <span>LATEST STABLE</span>
                            </span>
                          )}
                        </div>

                        {/* Tagline */}
                        {product && (
                          <p
                            className="text-xs sm:text-sm font-bold tracking-wide"
                            style={{ color: mascotInfo.accentColor }}
                          >
                            {product.tagline}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Prominent Details Button */}
                    <button
                      type="button"
                      onClick={() => navigate(detailRoute)}
                      className="doodle-btn doodle-btn-outline px-5 py-2.5 text-xs font-black self-start"
                      title="Inspect specs, changelog, and screenshots"
                    >
                      <DoodleIcon kind="sparkle" size={15} />
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00ff87]" />
                    </button>
                  </div>

                  {/* Middle Row: Doodle Spec Badges */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2 pt-3 pb-3 mb-3 border-t-2 border-dashed border-white/20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#060e24] border border-white text-slate-200 shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                      <Cpu className="w-3.5 h-3.5 text-[#00ff87]" />
                      <span>{apk.abi}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#060e24] border border-white text-slate-200 shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                      <HardDrive className="w-3.5 h-3.5 text-[#ffd23f]" />
                      <span>Size: {apk.fileSize || apk.sizeFormatted}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#060e24] border border-white text-slate-200 shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                      <Smartphone className="w-3.5 h-3.5 text-[#00d2ff]" />
                      <span>Min SDK {apk.minSdk} (Android 8.0+)</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#060e24] border border-white text-slate-200 shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                      <Calendar className="w-3.5 h-3.5 text-[#be185d]" />
                      <span>{apk.releaseDate}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono text-neutral-300 bg-[#060e24] border border-white/40">
                      <span>File: {apk.fileName}</span>
                    </span>
                  </div>

                  {/* SHA-256 Checksum Tape */}
                  {apk.sha256 && (
                    <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4 p-2.5 rounded-xl bg-[#020612] border-2 border-white shadow-[3px_3px_0_#be185d]">
                      <span className="text-xs font-mono font-black text-[#00ff87] uppercase tracking-wider">
                        SHA-256:
                      </span>
                      <code className="text-[11px] font-mono text-neutral-300 break-all flex-1">
                        {apk.sha256}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(apk.sha256!, copyShaId)}
                        className="doodle-btn px-3 py-1 text-xs bg-[#040a18] hover:bg-[#00ff87] hover:text-[#020612] text-white border border-white rounded-lg transition-colors"
                      >
                        {copiedId === copyShaId ? (
                          <>
                            <Check className="w-3 h-3 text-[#00ff87]" />
                            <span className="font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy SHA</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Expandable Handwritten Changelog Accordion */}
                  {apk.changelog && apk.changelog.length > 0 && (
                    <div className="relative z-10 mb-4">
                      <button
                        type="button"
                        onClick={() => toggleChangelog(changelogKey)}
                        className="inline-flex items-center gap-2 text-xs font-black text-[#00ff87] hover:underline cursor-pointer"
                      >
                        <DoodleIcon kind="star" size={14} />
                        <span>{isExpanded ? 'Hide Release Notes' : 'Inspect Release Notes & Fixes'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-4 rounded-2xl bg-[#060e24] border-2 border-white/60 space-y-2 text-xs text-neutral-200 animate-in fade-in duration-200 shadow-[3px_3px_0_#00ff87]">
                          {apk.changelog.map((c, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2.5">
                              <span className="text-[#00ff87] font-black shrink-0 mt-0.5">✦</span>
                              <span className="leading-relaxed font-medium">{c}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Action Bar: QR Scan, Copy URL, and Big Download APK Button */}
                  <div className="relative z-10 pt-4 border-t-2 border-dashed border-white/20 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      {/* Secondary Details Link */}
                      <button
                        type="button"
                        onClick={() => navigate(detailRoute)}
                        className="doodle-btn px-4 py-2 text-xs text-white bg-[#060e24] border border-white hover:border-[#00ff87] hover:text-[#00ff87]"
                      >
                        <span>Product Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Scan to Phone Button */}
                      <button
                        type="button"
                        onClick={() => setQrModalApk(apk)}
                        className="doodle-btn px-4 py-2 text-xs text-white bg-[#060e24] border border-white hover:border-[#ffd23f] hover:text-[#ffd23f]"
                        title="Show QR Code to scan with your Android camera"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#00ff87]" />
                        <span>Scan to Phone</span>
                      </button>

                      {/* Copy Direct Link */}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            apk.downloadPath.startsWith('http')
                              ? apk.downloadPath
                              : `${window.location.origin}${apk.downloadPath}`,
                            `url-${apk.productId}-${idx}`
                          )
                        }
                        className="p-2 rounded-xl bg-[#060e24] border border-white/40 hover:border-white text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy direct download link"
                      >
                        {copiedId === `url-${apk.productId}-${idx}` ? (
                          <Check className="w-4 h-4 text-[#00ff87]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Big Vibrant Download APK Button */}
                    <a
                      href={apk.downloadPath}
                      download={apk.fileName}
                      className="doodle-btn doodle-btn-green px-7 py-3 text-sm font-black text-[#020612]"
                    >
                      <DoodleIcon kind="bolt" size={18} />
                      <span>Download APK ({apk.fileSize || apk.sizeFormatted})</span>
                    </a>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* DOODLE QR CODE POPUP MODAL */}
      {qrModalApk && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setQrModalApk(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-[28px] bg-[#040a18] border-3 border-white p-6 text-center space-y-4 shadow-[8px_8px_0_#be185d]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setQrModalApk(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white bg-[#060e24] text-white hover:bg-[#be185d] flex items-center justify-center font-black transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Mascot on top */}
            <div className="flex justify-center -mt-12">
              <DoodleMascot
                kind="bird"
                size={64}
                quote="Point your Android camera here!"
                speechAlign="top"
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{qrModalApk.productName}</h3>
              <p className="text-xs font-mono text-[#00ff87] mt-0.5">
                {qrModalApk.version} • {qrModalApk.fileSize || qrModalApk.sizeFormatted}
              </p>
            </div>

            {/* QR Code Container with Hand-Drawn Frame */}
            <div className="p-4 rounded-2xl bg-[#020612] border-2 border-white flex items-center justify-center shadow-[4px_4px_0_#00ff87]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&color=00ff87&bgcolor=020612&data=${encodeURIComponent(
                  qrModalApk.downloadPath.startsWith('http')
                    ? qrModalApk.downloadPath
                    : `${window.location.origin}${qrModalApk.downloadPath}`
                )}`}
                alt={`QR code for ${qrModalApk.productName}`}
                className="w-44 h-44 rounded-xl object-contain"
              />
            </div>

            <p className="text-xs text-neutral-300 font-medium">
              Open your Android Camera to download directly to your device.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    qrModalApk.downloadPath.startsWith('http')
                      ? qrModalApk.downloadPath
                      : `${window.location.origin}${qrModalApk.downloadPath}`,
                    'modal-copy'
                  )
                }
                className="w-full doodle-btn doodle-btn-green py-2.5 justify-center text-xs"
              >
                {copiedId === 'modal-copy' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Direct Download URL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const targetId = getProductRouteId(qrModalApk.productId)
                  setQrModalApk(null)
                  navigate(`/product/${targetId}`)
                }}
                className="w-full py-2 text-xs font-black text-[#00ff87] hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Full Product Specs</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Living Sketchbook Doodle Crew Footer */}
      <InixaFooter />
    </div>
  )
}
