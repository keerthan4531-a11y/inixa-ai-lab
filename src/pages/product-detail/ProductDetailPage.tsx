import React, { useState, useRef } from 'react'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { ProductIcon } from '../../components/products/ProductIcons'
import { copyToClipboard } from '../../utils/clipboard'
import { navigate } from '../../router'
import {
  ART,
  DoodleIcon,
  DoodleKind,
  CrewKind,
} from '../../components/footer/DoodleCrewFooter'
import {
  Download,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Calendar,
  HardDrive,
  FileCode,
  CheckCircle2,
} from 'lucide-react'

interface ProductDetailPageProps {
  productId: string
}

// Character mapping for each product to give every flagship a unique living mascot
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

// Interactive Doodle Mascot Component
const DoodleMascot: React.FC<{
  kind: CrewKind
  size?: number
  quote?: string
  color?: string
  speechAlign?: 'top' | 'left' | 'right'
}> = ({ kind, size = 80, quote, color = '#00ff87', speechAlign = 'top' }) => {
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

  const pad = 12
  const vx = art.box.l - pad
  const vy = art.box.t - pad
  const vw = art.box.r - art.box.l + pad * 2
  const vh = art.box.b - art.box.t + pad * 2

  return (
    <div
      className="relative inline-block select-none cursor-pointer group"
      onClick={handleClick}
      title="Click me to chat!"
    >
      {/* Speech Bubble */}
      {talking && quote && (
        <div
          className={`absolute z-30 pointer-events-none whitespace-nowrap bg-[#040a18] text-[#00ff87] border-2 border-[#00ff87] rounded-2xl px-3.5 py-1.5 text-xs font-bold shadow-[3px_3px_0_#be185d] animate-in fade-in zoom-in duration-200 ${
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
          filter: `drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px ${color}35)`,
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

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const [copiedApkIndex, setCopiedApkIndex] = useState<number | null>(null)

  const product = PRODUCTS_BY_ID[productId] || ALL_PRODUCTS[0]
  const prodScreenshots = SCREENSHOT_MAP[product.id] || {}
  const mascotInfo = PRODUCT_MASCOTS[product.id] || {
    kind: 'yeti' as CrewKind,
    quote: 'Verified flagship Android architecture!',
    accentColor: product.accentColor || '#00ff87',
  }

  const handleCopyLink = async (downloadPath: string, index: number) => {
    const fullUrl = downloadPath.startsWith('http') ? downloadPath : `${window.location.origin}${downloadPath}`
    const ok = await copyToClipboard(fullUrl)
    if (ok) {
      setCopiedApkIndex(index)
      setTimeout(() => setCopiedApkIndex(null), 2500)
    }
  }

  const screenshotKeys = Object.keys(prodScreenshots)
  const heroShot = prodScreenshots[screenshotKeys[0]]

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white overflow-hidden font-sans">
      {/* Living Sketchbook Styles */}
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
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-10 left-1/4 w-[480px] h-[480px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: product.accentColor || '#00ff87' }}
        />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-pink-600/15 blur-[160px]" />
      </div>

      {/* Floating Interactive Doodle Stickers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-32 left-10 transform -rotate-12 opacity-80 animate-pulse">
          <DoodleIcon kind="bolt" size={36} />
        </div>
        <div className="absolute top-52 right-12 transform rotate-12 opacity-85">
          <DoodleIcon kind="star" size={34} />
        </div>
        <div className="absolute top-[650px] left-8 transform rotate-6 opacity-75">
          <DoodleIcon kind="flame" size={32} />
        </div>
        <div className="absolute top-[1100px] right-10 transform -rotate-12 opacity-80">
          <DoodleIcon kind="sparkle" size={36} />
        </div>
        <div className="absolute top-[1600px] left-12 transform rotate-12 opacity-80">
          <DoodleIcon kind="sandwich" size={34} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* TOP BREADCRUMB & STAMPED BADGE */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate('/products')}
            className="doodle-btn doodle-btn-outline px-4 py-2 text-xs font-black"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>Back to Products</span>
          </button>

          {/* Stamped Product Category Badge */}
          <div className="doodle-stamp inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#040a18] border-2 border-white shadow-[3px_3px_0_#be185d]">
            <DoodleIcon kind="sparkle" size={14} />
            <span className="text-xs font-mono font-black tracking-wider text-[#00ff87]">
              {product.badge}
            </span>
          </div>
        </div>

        {/* HERO SECTION: Product Info, Living Mascot, and Device Preview */}
        <div className="doodle-card rounded-[32px] p-8 sm:p-10 mb-20">
          {/* Peeking Mascot on top right of the Hero Card */}
          <div className="absolute -top-10 right-8 sm:right-14 z-20">
            <DoodleMascot
              kind={mascotInfo.kind}
              size={84}
              quote={mascotInfo.quote}
              color={mascotInfo.accentColor}
              speechAlign="left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Titles, Descriptions, Buttons */}
            <div className="lg:col-span-7 space-y-6">
              {/* Architecture Stamp */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-white/60 bg-[#060e24] text-xs font-mono font-bold text-[#00ff87] shadow-[2px_2px_0_#be185d]">
                <DoodleIcon kind="bolt" size={14} />
                <span>{product.version} • Verified Flagship Architecture</span>
              </div>

              {/* Main App Title with Product Icon */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#060e24] border-2 border-white flex items-center justify-center p-3 shadow-[4px_4px_0_#00ff87] shrink-0 -rotate-2">
                  <ProductIcon productId={product.id} color={mascotInfo.accentColor} />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Hand-drawn squiggly divider */}
              <div className="w-48 h-3">
                <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4"
                    fill="none"
                    stroke="#be185d"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Tagline */}
              <p
                className="text-lg sm:text-xl font-black tracking-wide"
                style={{ color: mascotInfo.accentColor }}
              >
                {product.tagline}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                {product.detailedSummary
                  ? `${product.longDescription} ${product.detailedSummary}`
                  : product.longDescription}
              </p>

              {/* Action Buttons: Comic CTA buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {product.apks && product.apks.length > 0 && (
                  <a
                    href={product.apks[product.apks.length - 1].downloadPath}
                    download
                    className="doodle-btn doodle-btn-green px-6 py-3 text-sm font-black text-[#020612]"
                  >
                    <DoodleIcon kind="bolt" size={17} />
                    <span>Download Latest ({product.apks[product.apks.length - 1].version})</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('releases-timeline')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="doodle-btn doodle-btn-outline px-5 py-3 text-xs font-black"
                >
                  <DoodleIcon kind="sparkle" size={15} />
                  <span>All Releases</span>
                </button>

                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doodle-btn doodle-btn-outline px-5 py-3 text-xs font-black text-white hover:text-[#00ff87]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              {/* Platform & Package Tech Tape */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono border-t-2 border-dashed border-white/20 pt-4 text-neutral-400">
                <div>
                  Platform: <span className="text-white font-bold">{product.platform}</span>
                </div>
                <span>•</span>
                <div>
                  Package: <span className="text-[#00ff87] font-bold">{product.packageId}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Device Showcase Preview */}
            <div className="lg:col-span-5 flex justify-center">
              {heroShot ? (
                <div className="relative group">
                  {/* Decorative sketch corner tape */}
                  <div className="absolute -top-3 -left-3 w-12 h-6 bg-[#be185d] border border-white -rotate-12 z-20 shadow-md opacity-90" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-[#00ff87] border border-white rotate-12 z-20 shadow-md opacity-90" />
                  <DeviceMockup
                    src={heroShot.assetPath}
                    alt={heroShot.altText}
                    glowColor={product.accentColor}
                  />
                </div>
              ) : (
                <div className="h-[460px] w-[260px] rounded-[32px] border-2 border-white bg-[#060e24] shadow-[6px_6px_0_#be185d] flex items-center justify-center text-white/50 font-bold">
                  Flagship Preview
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DEEP ARCHITECTURAL FEATURES: Doodle Sketch Cards with Mockups */}
        <div className="space-y-14 mb-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#00ff87] bg-[#040a18] shadow-[3px_3px_0_#be185d] transform rotate-1 mb-3">
              <DoodleIcon kind="star" size={15} />
              <span className="text-xs font-mono font-black uppercase text-[#00ff87]">
                ON-DEVICE VERIFICATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Deep Architectural Features
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
              Verified against physical hardware execution with zero mocked components.
            </p>
          </div>

          {product.features.map((feat, index) => {
            const shot = feat.screenshotKey
              ? prodScreenshots[feat.id] || prodScreenshots[feat.screenshotKey]
              : null
            const isEven = index % 2 === 0
            const cardShadowColor = isEven ? '#be185d' : '#00ff87'

            return (
              <div
                key={feat.id}
                className="doodle-card rounded-[30px] p-7 sm:p-9"
                style={{
                  boxShadow: `6px 6px 0 ${cardShadowColor}`,
                }}
              >
                <div
                  className={`flex flex-col gap-8 items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Side */}
                  <div className="flex-1 space-y-4">
                    {feat.badge && (
                      <span className="doodle-stamp inline-block px-3 py-1 rounded-full text-[11px] font-black bg-[#060e24] text-[#00ff87] border-2 border-white shadow-[2px_2px_0_#be185d]">
                        {feat.badge}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{feat.title}</h3>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>

                  {/* Device Screenshot Side */}
                  {shot && (
                    <div className="w-full sm:w-[280px] md:w-[320px] shrink-0 flex flex-col items-center">
                      <div className="relative">
                        <DeviceMockup
                          src={shot.assetPath}
                          alt={shot.altText}
                          glowColor={product.accentColor}
                        />
                      </div>
                      <div className="mt-3 text-xs font-mono font-bold text-center text-[#00ff87] bg-[#060e24] px-3 py-1 rounded-full border border-white/40 max-w-[260px] truncate">
                        {shot.whatItShows}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* TECHNICAL SPECIFICATIONS & SYSTEM TELEMETRY (BLUEPRINT CARD) */}
        <div className="doodle-card rounded-[32px] p-7 sm:p-9 mb-24" style={{ boxShadow: '6px 6px 0 #ffd23f' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#ffd23f]">
              <Cpu className="h-5 w-5 text-[#ffd23f]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Technical Specifications & Architecture
              </h3>
              <p className="text-xs text-neutral-400 font-mono">Hardware compilation telemetry</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([label, val]) => (
              <div
                key={label}
                className="p-4 rounded-2xl border-2 border-white/50 bg-[#060e24] shadow-[3px_3px_0_rgba(255,255,255,0.15)] hover:border-[#00ff87] transition-colors"
              >
                <div className="text-xs font-mono font-black uppercase text-[#00ff87] tracking-wider mb-1">
                  {label}
                </div>
                <div className="text-sm sm:text-base font-bold text-white">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* APK RELEASE TIMELINE (DOODLE RELEASE CARDS) */}
        <div id="releases-timeline" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#00ff87] bg-[#040a18] shadow-[3px_3px_0_#be185d] transform -rotate-1 mb-3">
              <DoodleIcon kind="bolt" size={15} />
              <span className="text-xs font-mono font-black uppercase text-[#00ff87]">
                CRYPTOGRAPHIC BUILDS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Verified Binary Releases
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-2 font-medium">
              Compiled directly from source. Ready to install on physical Android silicon.
            </p>
          </div>

          <div className="space-y-5">
            {product.apks && product.apks.length > 0 ? (
              product.apks.map((apk, index) => (
                <div
                  key={index}
                  className={`doodle-card rounded-[26px] p-6 sm:p-7 ${
                    apk.isLatest ? 'latest' : ''
                  }`}
                  style={{
                    boxShadow: apk.isLatest ? '6px 6px 0 #00ff87' : '5px 5px 0 #be185d',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: Version, ABI, Date & Changelogs */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-black text-white">{apk.version}</span>
                        {apk.isLatest && (
                          <span className="doodle-stamp px-3 py-0.5 rounded-full text-[10px] bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d]">
                            LATEST TAGGED
                          </span>
                        )}
                        <span className="text-xs font-mono text-neutral-400 bg-[#060e24] px-2.5 py-1 rounded-lg border border-white/30">
                          {apk.releaseDate}
                        </span>
                      </div>

                      {/* File Specs Tape */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-lg bg-[#060e24] border border-white/40 text-neutral-200">
                          {apk.fileName}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#060e24] border border-[#00ff87]/60 text-[#00ff87] font-bold">
                          {apk.sizeFormatted}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#060e24] border border-white/40 text-neutral-200">
                          {apk.abi}
                        </span>
                      </div>

                      {/* Changelog Items */}
                      <div className="space-y-1.5 pt-1">
                        {apk.changelog.map((change, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-xs text-neutral-200 font-medium">
                            <span className="text-[#00ff87] font-black shrink-0 mt-0.5">✦</span>
                            <span>{change}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Copy & Download Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(apk.downloadPath, index)}
                        className="doodle-btn px-3 py-2.5 bg-[#060e24] hover:bg-white hover:text-black border-2 border-white rounded-xl text-xs font-bold transition-colors"
                        title="Copy direct download link"
                      >
                        {copiedApkIndex === index ? (
                          <>
                            <Check className="h-4 w-4 text-[#00ff87]" />
                            <span className="text-[#00ff87]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <a
                        href={apk.downloadPath}
                        download
                        className={`doodle-btn px-6 py-2.5 text-xs font-black ${
                          apk.isLatest ? 'doodle-btn-green' : 'doodle-btn-outline'
                        }`}
                      >
                        <DoodleIcon kind="bolt" size={15} />
                        <span>Download APK</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 rounded-[28px] border-2 border-dashed border-white/30 bg-[#040a18] text-center text-neutral-400 font-medium shadow-[4px_4px_0_#be185d]">
                This project distributes as an Electron Desktop application or serverless Cloudflare Edge package.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailPage
