import React, { useState, useRef } from 'react'
import { Magnet } from '../../components/react-bits/Magnet'
import DecryptedText from '../../components/react-bits/DecryptedText'
import TechText from '../../components/TechText'
import Shuffle from '../../components/Shuffle'
import ElectricLogo from '../../components/ElectricLogo'
import DepthCarousel, { DepthCarouselItem } from '../../components/DepthCarousel'
import TextType from '../../components/TextType'
import { ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { Download, ArrowRight, Search, ShieldCheck, Music2, Sparkles } from 'lucide-react'
import { ART, DoodleIcon, CrewKind } from '../../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin, DoodleSketchArrow } from '../../components/doodle/DoodleCritters'
import { DoodleHeroBackground } from '../../components/doodle/DoodleHeroBackground'
import { DoodleCatToggle } from '../../components/doodle/DoodleCatToggle'
import { navigate } from '../../router'

interface HeroSectionProps {
  onOpenSearch?: () => void
}

/**
 * 12 genuine flagship Android on-device captures requested by the user,
 * cycled seamlessly with React Bits DepthCarousel in 3D perspective depth stack.
 */
const HERO_SHOWCASE_ITEMS: DepthCarouselItem[] = [
  {
    image: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg',
    alt: 'BeatBox Ultra — Ambient Glass Player',
    title: 'BeatBox Ultra',
    subtitle: 'Ambient Glass Now Playing',
    badge: 'AUDIO 405'
  },
  {
    image: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg',
    alt: 'BeatBox Ultra — Artist Page & Top Tracks',
    title: 'BeatBox Ultra',
    subtitle: 'Artist Page & Top Tracks',
    badge: 'AUDIO 405'
  },
  {
    image: '/shots/beat-pro/9e4cfaf7-819b-46d3-b81f-613509ae3971.jpg',
    alt: 'BeatBox Pro — Parametric Equalizer',
    title: 'BeatBox Pro',
    subtitle: '31-Band Parametric DSP Engine',
    badge: 'PRO HI-RES'
  },
  {
    image: '/shots/beat-pro/31031e0e-1853-409b-ae3b-e8017f365d7b.jpg',
    alt: 'BeatBox Pro — Bit-Perfect Audio Pipeline',
    title: 'BeatBox Pro',
    subtitle: 'Direct ALSA / USB Audio Stream',
    badge: 'PRO HI-RES'
  },
  {
    image: '/shots/clipster/5051e47d-12c0-4d5f-9222-4b5b5c522955.jpg',
    alt: 'Clipster — Audio Extraction Studio',
    title: 'Clipster',
    subtitle: 'Hardware Ringtone & Sample Slicer',
    badge: 'STUDIO TOOL'
  },
  {
    image: '/shots/inixa-ai/image.png',
    alt: 'INIXA AI — Autonomous Neural Sandbox',
    title: 'INIXA AI',
    subtitle: 'Autonomous Agent Sandbox',
    badge: 'AI PROTOCOL'
  },
  {
    image: '/shots/liquid-streaming/6c8accae-f5a9-4c25-840a-6f11a1b3b389.jpg',
    alt: 'Liquid Stream — Edge HLS Ultra-Low Latency',
    title: 'Liquid Stream',
    subtitle: 'Edge HLS Live Stream Hub',
    badge: '4K BROADCAST'
  },
  {
    image: '/shots/liquid-streaming/b50f38c2-a738-443a-a4fe-1c7708624c65.jpg',
    alt: 'Liquid Stream — Dynamic Audio Spectrum',
    title: 'Liquid Stream',
    subtitle: 'Dynamic 120Hz Visualizer Sheen',
    badge: '4K BROADCAST'
  },
  {
    image: '/shots/lumina/6ceac216-b3aa-41d1-ae2b-2c5cdd476bfe.jpg',
    alt: 'Lumina Browser — Hardened Tor Engine',
    title: 'Lumina Browser',
    subtitle: 'Air-Gapped Privacy Routing',
    badge: 'HARDENED'
  },
  {
    image: '/shots/lumina/66fbb727-fb12-4a8d-8730-eecf0f0aa2b2.jpg',
    alt: 'Lumina Browser — Instant Sandbox Wipe',
    title: 'Lumina Browser',
    subtitle: 'One-Tap Ram Session Eraser',
    badge: 'HARDENED'
  },
  {
    image: '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg',
    alt: 'My Tube — Zero-Ad Stream Extractor',
    title: 'My Tube',
    subtitle: 'Clean Algorithmic Feed Engine',
    badge: 'STREAMING'
  },
  {
    image: '/shots/my-tube/dc7d8287-2b77-4d9c-8d6c-d22bafc21880.jpg',
    alt: 'My Tube — Background PIP & SponsorBlock',
    title: 'My Tube',
    subtitle: 'True Background PIP Playback',
    badge: 'STREAMING'
  }
]

const HERO_TYPED_PARAGRAPHS = [
  'Nine native applications — audiophile bit-perfect players, an autonomous AI sandbox, a hardened privacy browser, and zero-ad stream extractors. Real software, captured on real hardware, with zero telemetry.',
  'Hardware-calibrated audiophile architecture — direct bit-perfect ALSA and USB DAC streams, 31-band parametric equalizers, dynamic lyrics, and pristine local lossless reproduction.',
  'Autonomous on-device neural sandbox — private air-gapped LLM inference, multi-agent workspaces, and grounded local knowledge with absolute hardware containment.',
  'Hardened privacy browsers and bufferless stream extractors — zero third-party telemetry, ad-free streaming with background PIP playback, SponsorBlock automation, and clean media downloads.',
  'Fifteen production APK releases compiled with verified SHA-256 signatures — engineered exclusively for physical Snapdragon and modern Android flagships with zero telemetry.'
]

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

/**
 * Doodle Sketchbook Hero showcasing physical flagship Android hardware
 * with pure dark optics, React Bits 3D DepthCarousel, and interactive typography.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSearch }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  // Text animation toggle: DEFAULT FALSE (OFF) per user request
  const [textAnimEnabled, setTextAnimEnabled] = useState(false)
  const currentItem = HERO_SHOWCASE_ITEMS[activeSlide] || HERO_SHOWCASE_ITEMS[0]

  const stats = [
    { value: '9', label: 'Flagship apps', shadow: '#00ff87' },
    { value: '15', label: 'Verified APKs', shadow: '#be185d' },
    { value: String(ALL_AUDITED_SCREENSHOTS.length), label: 'Device screens', shadow: '#ffd23f' },
    { value: '0', label: 'Telemetry / trackers', shadow: '#00ff87' },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:min-h-[85vh] lg:flex lg:items-center bg-[#020612]">
      {/* Hand-Drawn Living Sketchbook Background (Graph paper, rockets, planets, doodles, zero lag) */}
      <DoodleHeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Brand band: ElectricLogo + interactive TechText wordmark */}
        <div className="mb-2 sm:mb-4 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[#040a18] border-2 border-white p-1 shadow-[4px_4px_0_#00ff87] overflow-hidden -rotate-2">
              <ElectricLogo
                src="/inixa-brand-electric.svg"
                color="#00ff87"
                glowColor="#be185d"
                scale={0.82}
                strands={4}
                bend={0.6}
                crackle={1.4}
                arcs={1}
                speed={2.2}
                interactive
              />
            </div>
          </div>

          {/* Interactive Doodle Cat Animation Switch */}
          <div className="mb-4 flex items-center justify-center">
            <DoodleCatToggle
              enabled={textAnimEnabled}
              onToggle={setTextAnimEnabled}
            />
          </div>

          <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#00ff87] bg-[#040a18] px-4 py-1.5 text-xs font-black text-[#00ff87] shadow-[3px_3px_0_#be185d] -rotate-1 mb-3">
            <DoodleIcon kind="bolt" size={14} />
            {textAnimEnabled ? (
              <DecryptedText
                text="INIXA AI LABS • 2026 LIVING SKETCHBOOK"
                animateOn="view"
                speed={40}
                maxIterations={10}
                revealDirection="start"
                className="tracking-widest uppercase font-mono text-[#00ff87]"
              />
            ) : (
              <span className="tracking-widest uppercase font-mono text-[#00ff87]">
                INIXA AI LABS • 2026 LIVING SKETCHBOOK
              </span>
            )}
            <DoodleIcon kind="sparkle" size={14} />
          </div>

          <div className="relative mx-auto w-full max-w-4xl h-[90px] sm:h-[140px] md:h-[180px] text-white flex items-center justify-center">
            {/* Playful Doodle Cat Sitting atop INIXA LAB wordmark */}
            <div className="absolute -top-10 sm:-top-12 left-4 sm:left-28 z-30 pointer-events-auto">
              <DoodleCat pose="sitting" size={48} speech="Perched on INIXA! Meow 🐾" speechAlign="top" />
            </div>

            {/* Flying Bird above the Wordmark */}
            <div className="absolute -top-9 sm:-top-10 right-4 sm:right-32 z-30 pointer-events-auto hidden sm:block">
              <DoodleBird pose="flying" size={50} speech="Flying above INIXA LABS! ✈️" speechAlign="top" />
            </div>

            {textAnimEnabled ? (
              <TechText
                text="INIXA LAB"
                fontWeight={700}
                fontSize={120}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                draggable
                guides={false}
                fontFamily=""
                letterSpacing={-0.03}
                accentColor="#00ff87"
                reach={200}
                softness={0.7}
                lineStyle="dashed"
                strokeWidth={1.5}
                speed={1}
                bounce={0.4}
                selection
                labels
                color="currentColor"
                align="center"
                sweep
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center px-2">
                <h1 className="text-[clamp(2.4rem,9.5vw,7.8rem)] font-black tracking-tight text-white select-none leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-center">
                  INIX<span className="text-[#00ff87]">A</span> LAB
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headlines, Text Animations & Doodle Buttons */}
          <div className="text-center lg:col-span-7 lg:text-left relative">
            {/* Peeking Mascot: Bruno the Yeti */}
            <div className="absolute -top-14 right-2 sm:right-10 z-20 hidden sm:block">
              <DoodleMascot
                kind="yeti"
                size={74}
                quote="Pure tactile Android craft! Zero Google trackers."
                speechAlign="left"
              />
            </div>

            {/* Peeking Doodle Cat on Headline */}
            <div className="absolute -top-10 left-2 sm:left-4 z-20">
              <DoodleCat pose="peeking" size={52} speech="Curious cat inspecting 120Hz optics! ✨" speechAlign="top" />
            </div>

            {/* Peeking Penguin on Headline */}
            <div className="absolute -top-11 left-24 sm:left-32 z-20 hidden sm:block">
              <DoodlePenguin pose="peeking" size={48} speech="Noot noot! Zero Play Store bloat! 🐧" speechAlign="top" />
            </div>

            <div className="relative inline-block mb-6">
              {textAnimEnabled ? (
                <Shuffle
                  text="Frontiers of AI & Liquid Glass Flagships"
                  tag="h1"
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white"
                  textAlign="inherit"
                  effect="slide"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover={true}
                  hoverRadius={0}
                  motionBlur={false}
                  respectReducedMotion={true}
                  accentColor="#00ff87"
                />
              ) : (
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white">
                  Frontiers of AI &amp; Liquid Glass Flagships
                </h1>
              )}
              {/* Hand-drawn squiggly underline */}
              <div className="w-56 h-3 mt-1 mx-auto lg:mx-0">
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
            </div>

            {/* Cyclical Flagship Paragraphs (TextType if enabled, clean static paragraph if disabled) */}
            <div className="mb-8 max-w-2xl min-h-[5.5rem] sm:min-h-[5rem]">
              {textAnimEnabled ? (
                <TextType
                  text={HERO_TYPED_PARAGRAPHS}
                  typingSpeed={32}
                  pauseDuration={3000}
                  deletingSpeed={16}
                  deleteMode="backspace"
                  typeEffect="fade"
                  mistakes={0.01}
                  cursorStyle="bar"
                  cursorGlide
                  showCursor
                  loop
                  cursorColor="#00ff87"
                  className="text-base leading-relaxed text-neutral-200 sm:text-lg font-medium"
                />
              ) : (
                <p className="text-base leading-relaxed text-neutral-200 sm:text-lg font-medium">
                  {HERO_TYPED_PARAGRAPHS[0]}
                </p>
              )}
            </div>

            {/* Tactile Doodle CTA Buttons with Magnet Effect & Sketch Arrow */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start relative">
              <Magnet magnetStrength={0.18}>
                <div className="relative inline-block">
                  {/* Sleeping Cat napping on the Explore Button */}
                  <div className="absolute -top-8 right-2 z-30 pointer-events-auto">
                    <DoodleCat pose="sleeping" size={50} speechAlign="top" />
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/products')}
                    className="doodle-btn doodle-btn-green px-7 py-3.5 text-sm font-black text-[#020612] cursor-pointer"
                  >
                    <DoodleIcon kind="sparkle" size={17} />
                    <span>Explore 9 Products</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Magnet>

              <Magnet magnetStrength={0.18}>
                <button
                  type="button"
                  onClick={() => navigate('/downloads')}
                  className="doodle-btn doodle-btn-outline px-7 py-3.5 text-sm font-black text-white hover:text-[#00ff87] cursor-pointer"
                >
                  <DoodleIcon kind="bolt" size={17} />
                  <span>Download APKs</span>
                </button>
              </Magnet>

              <Magnet magnetStrength={0.18}>
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="doodle-btn doodle-btn-outline px-5 py-3.5 text-xs font-black text-neutral-300 hover:text-white cursor-pointer"
                >
                  <Search className="h-4 w-4 text-[#00ff87]" />
                  <span>Search <kbd className="ml-1 text-[10px] text-[#00ff87]">⌘K</kbd></span>
                </button>
              </Magnet>
            </div>

            {/* Doodle Metric Blocks with Loaf Cat */}
            <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-4 max-w-2xl mx-auto lg:mx-0">
              {stats.map((s) => (
                <div key={s.label} className="relative">
                  {s.label.includes('trackers') && (
                    <div className="absolute -top-8 right-1 z-30 pointer-events-auto">
                      <DoodleCat pose="loaf" size={44} speech="Purr... 0 trackers! 🛡️" speechAlign="top" />
                    </div>
                  )}
                  <div
                    className="p-4 rounded-2xl bg-[#040a18] border-2 border-white text-center lg:text-left transition-transform hover:-translate-y-1"
                    style={{ boxShadow: `4px 4px 0 ${s.shadow}` }}
                  >
                    <div className="font-mono text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                    <div className="mt-0.5 text-xs text-neutral-400 font-medium">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Physical Device 3D DepthCarousel with Critters */}
          <div className="flex flex-col items-center justify-center lg:col-span-5 relative w-full overflow-hidden sm:overflow-visible">
            <div className="relative w-full max-w-[310px] sm:max-w-[420px] md:max-w-[460px] h-[580px] sm:h-[680px] flex items-center justify-center">
              {/* Stretching Cat watching the DepthCarousel */}
              <div className="absolute -bottom-6 -left-4 z-30 hidden sm:block pointer-events-auto">
                <DoodleCat pose="stretching" size={64} flip speech="Stretching my lossless audio paws! 🐾" speechAlign="top" />
              </div>

              {/* Audiophile Penguin jamming on top right of the phone */}
              <div className="absolute -top-10 -right-2 sm:-right-8 z-30 pointer-events-auto">
                <DoodlePenguin pose="headphones" size={54} speech="Pure FLAC jamming! 🐧🎧" speechAlign="left" />
              </div>

              {/* Singing bird on top left of phone */}
              <div className="absolute -top-10 left-4 sm:left-12 z-30 pointer-events-auto hidden sm:block">
                <DoodleBird pose="singing" size={44} speech="Chirp chirp! ♪♫" speechAlign="top" />
              </div>
              <DepthCarousel
                items={HERO_SHOWCASE_ITEMS}
                cardWidth={285}
                cardHeight={570}
                radius={40}
                depth={170}
                spread={60}
                tilt={16}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.22}
                blur={4}
                autoplay={true}
                autoplayDelay={3200}
                loop={true}
                showControls={true}
                showIndicators={true}
                showDeviceFrame={true}
                onChange={(idx) => setActiveSlide(idx)}
                className="w-full h-full"
              />

              {/* Floating feature pills */}
              <div className="absolute left-1 sm:-left-3 top-1/4 z-30 hidden rounded-full border-2 border-white bg-[#040a18] px-3.5 py-1.5 text-xs text-white shadow-[3px_3px_0_#be185d] sm:flex items-center gap-1.5 pointer-events-none -rotate-2">
                {currentItem.badge?.includes('AUDIO') || currentItem.badge?.includes('PRO') ? (
                  <Music2 className="h-3.5 w-3.5 text-pink-400" />
                ) : (
                  <DoodleIcon kind="bolt" size={14} />
                )}
                <span className="font-black text-white">{currentItem.badge || 'Verified Flagship'}</span>
              </div>
              <div className="absolute right-1 sm:-right-3 bottom-1/4 z-30 hidden rounded-full border-2 border-white bg-[#040a18] px-3.5 py-1.5 text-xs text-white shadow-[3px_3px_0_#00ff87] sm:flex items-center gap-1.5 pointer-events-none rotate-2">
                <DoodleIcon kind="star" size={14} />
                <span className="font-black text-white">100% Real Device</span>
              </div>
            </div>

            {/* Dynamic Active Screenshot Pill */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs shadow-[3px_3px_0_#be185d]">
              <span className="h-2 w-2 rounded-full bg-[#00ff87]" />
              <span className="font-black text-white">{currentItem.title}</span>
              <span className="text-white/40">•</span>
              <span className="text-neutral-300 font-medium truncate max-w-[190px]">{currentItem.subtitle}</span>
              <span className="ml-1 text-[10px] font-mono font-black text-[#00ff87] bg-black border border-[#00ff87] px-2 py-0.5 rounded-full">
                {activeSlide + 1}/12
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
