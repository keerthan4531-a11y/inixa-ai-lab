import React, { useState, useRef } from 'react'
import { HeroSection } from '../sections/home/HeroSection'
import { ProductMarquee } from '../sections/home/ProductMarquee'
import { LabsGridSection } from '../sections/home/LabsGridSection'
import { Hardware3DSection } from '../sections/home/Hardware3DSection'
import { GallerySection } from '../sections/home/GallerySection'
import DriftWall from '../components/DriftWall'
import LogoLoop, { LogoItem } from '../components/LogoLoop'
import { ALL_PRODUCTS } from '../data/products'
import { ALL_AUDITED_SCREENSHOTS } from '../data/screenshotMap'
import { navigate } from '../router'
import { Download, Sparkles, Shield, ArrowRight, Layers, Smartphone } from 'lucide-react'
import { ART, DoodleIcon, CrewKind } from '../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../components/doodle/DoodleCat'

const DRIFT_ITEMS = ALL_AUDITED_SCREENSHOTS.map((shot) => {
  const prod = ALL_PRODUCTS.find((p) => p.id === shot.product)
  return {
    image: shot.assetPath,
    title: prod ? `${prod.name} — ${shot.whatItShows}` : shot.whatItShows,
    href: `/product/${shot.product}`,
  }
})

interface HomePageProps {
  onOpenSearch?: () => void
}

// Interactive Doodle Mascot Component
const DoodleMascot: React.FC<{
  kind: CrewKind
  size?: number
  quote?: string
  color?: string
  speechAlign?: 'top' | 'left' | 'right'
}> = ({ kind, size = 76, quote, color = '#00ff87', speechAlign = 'top' }) => {
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

const TECH_LOGOS: LogoItem[] = [
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#00ff87]">
        <svg className="w-5 h-5 fill-[#3DDC84]" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4486.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9997.4482.9997.9993 0 .5511-.4486.9997-.9997.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4128 13.8533 8.0818 12 8.0818c-1.8533 0-3.5902.331-5.1368.868L4.8409 5.4468a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
        <span className="text-xs font-bold text-white">Android 15+ Native</span>
      </span>
    ),
    title: 'Android Native SDK',
    hoverColor: '#3DDC84',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#7F52FF]">
        <svg className="w-5 h-5 fill-[#7F52FF]" viewBox="0 0 24 24"><path d="M24 24H0V0h24L12 12Z"/></svg>
        <span className="text-xs font-bold text-white">Kotlin Coroutines</span>
      </span>
    ),
    title: 'Kotlin Native',
    hoverColor: '#7F52FF',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#00ff87]">
        <svg className="w-5 h-5 fill-[#00ff87]" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00ff87" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs font-bold text-white">WebGL2 Shaders</span>
      </span>
    ),
    title: 'WebGL2 Engine',
    hoverColor: '#00ff87',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#be185d]">
        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24"><polygon points="12 2 22 20 2 20" strokeWidth="1.8" strokeLinejoin="round"/></svg>
        <span className="text-xs font-bold text-white">Three.js 3D</span>
      </span>
    ),
    title: 'Three.js Spatial Pipeline',
    hoverColor: '#FFFFFF',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#61DAFB]">
        <svg className="w-5 h-5 fill-[#61DAFB]" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>
        <span className="text-xs font-bold text-white">React 19 Core</span>
      </span>
    ),
    title: 'React Concurrent UI',
    hoverColor: '#61DAFB',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#F74C00]">
        <svg className="w-5 h-5 fill-[#F74C00]" viewBox="0 0 24 24"><path d="M12 1a2 2 0 0 1 2 2v.2a8.03 8.03 0 0 1 3.5 1.5l.14-.14a2 2 0 1 1 2.83 2.83l-.14.14a8.03 8.03 0 0 1 1.5 3.5H22a2 2 0 1 1 0 4h-.17a8.03 8.03 0 0 1-1.5 3.5l.14.14a2 2 0 1 1-2.83 2.83l-.14-.14a8.03 8.03 0 0 1-3.5 1.5V23a2 2 0 1 1-4 0v-.2a8.03 8.03 0 0 1-3.5-1.5l-.14.14a2 2 0 1 1-2.83-2.83l.14-.14a8.03 8.03 0 0 1-1.5-3.5H2a2 2 0 1 1 0-4h.17a8.03 8.03 0 0 1 1.5-3.5l-.14-.14a2 2 0 1 1 2.83-2.83l.14.14a8.03 8.03 0 0 1 3.5-1.5V3a2 2 0 0 1 2-2zm0 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>
        <span className="text-xs font-bold text-white">Rust Native Engine</span>
      </span>
    ),
    title: 'Rust Core Architecture',
    hoverColor: '#F74C00',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border-2 border-white/40 bg-[#040a18] shadow-[2px_2px_0_#00ff87]">
        <DoodleIcon kind="bolt" size={16} />
        <span className="text-xs font-bold text-white">Zero Telemetry</span>
      </span>
    ),
    title: 'Air-Gapped Privacy Engine',
    hoverColor: '#00ff87',
  },
]

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  return (
    <div className="relative min-h-screen bg-[#020612] text-white selection:bg-[#be185d] selection:text-white font-sans">
      {/* Living Sketchbook Doodle Theme Styles */}
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

      {/* 1. Hero Section (with TechText, Shuffle, DecryptedText, TextType & 3D DepthCarousel) */}
      <HeroSection onOpenSearch={onOpenSearch} />

      {/* 2. Interactive Marquee */}
      <ProductMarquee />

      {/* 3. Labs Grid Section (9 Real Products with Genuine Screenshots) */}
      <LabsGridSection />

      {/* 4. Real 3D Hardware Showcase */}
      <Hardware3DSection />

      {/* 5. Production Screenshot Gallery (56 Screens) */}
      <GallerySection />

      {/* 6. Comprehensive Ecosystem Download Banner (Doodle Card) */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="doodle-card rounded-[32px] p-8 sm:p-14 relative overflow-hidden text-center sm:text-left">
            {/* Peeking Mascot: Juno the Kid on top right */}
            <div className="absolute -top-10 right-8 sm:right-16 z-20 hidden sm:block">
              <DoodleMascot
                kind="kid"
                size={80}
                quote="All 15 APKs verified! Zero Play Store needed."
                speechAlign="left"
              />
            </div>

            {/* Playful Doodle Cat Sitting on top left of Download Card */}
            <div className="absolute -top-11 left-6 sm:left-14 z-20 pointer-events-auto">
              <DoodleCat pose="sitting" size={70} speech="Download all 15 builds! 🐾" speechAlign="top" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#060e24] px-4 py-1.5 text-xs font-black text-[#00ff87] shadow-[2px_2px_0_#be185d] -rotate-1">
                  <DoodleIcon kind="bolt" size={14} />
                  <span>DIRECT APK PIPELINE • ZERO TRACKING • PURE PERFORMANCE</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Ready to experience <br />
                  <span className="text-[#00ff87]">
                    next-generation Android craft?
                  </span>
                </h2>

                <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
                  Download all 15 production APKs directly from INIXA Labs. Guaranteed SHA-256 integrity, no ad trackers, no telemetry wrappers, and immediate offline playback.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#060e24] px-3 py-1.5 rounded-xl border border-white/30">
                    <DoodleIcon kind="star" size={14} />
                    <span>Malware Free Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#060e24] px-3 py-1.5 rounded-xl border border-white/30">
                    <DoodleIcon kind="sparkle" size={14} />
                    <span>Android 10 - 15+</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#060e24] px-3 py-1.5 rounded-xl border border-white/30">
                    <DoodleIcon kind="bolt" size={14} />
                    <span>All 9 Labs Products</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <div className="relative w-full">
                  {/* Cozy Loaf Cat on Download Button */}
                  <div className="absolute -top-7 -right-2 z-30 pointer-events-auto hidden sm:block">
                    <DoodleCat pose="loaf" size={46} speech="Cozy loaf says: direct downloads! ⚡" speechAlign="top" />
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/downloads')}
                    className="doodle-btn doodle-btn-green !py-4 !px-8 text-base text-[#020612] w-full justify-center"
                  >
                    <DoodleIcon kind="bolt" size={18} />
                    <span>Download APK Vault</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="doodle-btn doodle-btn-outline !py-4 !px-8 text-base text-white w-full justify-center hover:text-[#00ff87]"
                >
                  <DoodleIcon kind="sparkle" size={18} />
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. React Bits 3D DriftWall Showcase — Living Ecosystem Horizon */}
      <section className="relative py-16 overflow-hidden border-t-2 border-dashed border-white/20 bg-[#020612] w-full">
        {/* Peeking Cat on top of 3D DriftWall Header */}
        <div className="flex justify-center -mb-3 relative z-20 pointer-events-auto">
          <DoodleCat pose="peeking" size={58} speech="Watching 56 screens drift by! 👀" speechAlign="top" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs font-black text-[#be185d] shadow-[3px_3px_0_#00ff87] -rotate-1 mb-3">
            <DoodleIcon kind="sparkle" size={15} />
            <span>3D SPATIAL DRIFT WALL • INTERACTIVE PERSPECTIVE VIEW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Infinite Software Horizon
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mt-2 font-medium">
            A continuous 3D stream of verified production screens from all 9 INIXA Labs flagships, in their real portrait smartphone format. Hover a frame to lift it, click to open the product.
          </p>
        </div>

        <div className="w-full relative h-[720px] sm:h-[820px] lg:h-[880px] overflow-hidden">
          <DriftWall
            items={DRIFT_ITEMS}
            columns={7}
            tileWidth={195}
            tileHeight={375}
            gap={20}
            radius={20}
            tilt={10}
            turn={-8}
            perspective={1350}
            depth={55}
            speed={38}
            direction="up"
            variance={0.3}
            parallax={0.4}
            lift={64}
            fade={0.2}
            dim={0.94}
            overlayColor="#020612"
          />
        </div>
      </section>

      {/* 8. React Bits LogoLoop — Technology Ecosystem & Native Engineering Strip */}
      <section className="relative py-14 border-t-2 border-dashed border-white/20 bg-[#020612]" aria-label="Technology Stack">
        {/* Stretching Cat on top of Technology Stack */}
        <div className="flex justify-center -mb-3 relative z-20 pointer-events-auto">
          <DoodleCat pose="stretching" size={66} speech="Stretching on native Kotlin & Rust! 🐾" speechAlign="top" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs font-mono font-black uppercase text-[#00ff87] shadow-[2px_2px_0_#be185d]">
            <DoodleIcon kind="bolt" size={14} />
            <span>High-Performance Native Engineering Stack</span>
          </div>
        </div>

        <div className="w-full relative overflow-hidden py-2">
          <LogoLoop
            logos={TECH_LOGOS}
            speed={60}
            direction="left"
            logoHeight={34}
            gap={24}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="INIXA Labs Technology Foundation"
          />
        </div>
      </section>
    </div>
  )
}
