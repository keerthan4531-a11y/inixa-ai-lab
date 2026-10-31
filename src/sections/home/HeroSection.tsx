import React, { useState } from 'react'
import { GlassButton } from '../../components/common/GlassButton'
import { Magnet } from '../../components/react-bits/Magnet'
import DecryptedText from '../../components/react-bits/DecryptedText'
import TechText from '../../components/TechText'
import Shuffle from '../../components/Shuffle'
import ElectricLogo from '../../components/ElectricLogo'
import DepthCarousel, { DepthCarouselItem } from '../../components/DepthCarousel'
import { ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { Download, ArrowRight, Search, ShieldCheck, Music2 } from 'lucide-react'

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

/**
 * Clean, ultra-high-end hero showcasing physical flagship Android hardware
 * with pure dark optics, React Bits 3D DepthCarousel, and interactive typography.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSearch }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const currentItem = HERO_SHOWCASE_ITEMS[activeSlide] || HERO_SHOWCASE_ITEMS[0]

  const stats = [
    { value: '9', label: 'Flagship apps' },
    { value: '15', label: 'Verified APKs' },
    { value: String(ALL_AUDITED_SCREENSHOTS.length), label: 'Real device screens' },
    { value: '0', label: 'Telemetry / trackers' },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:min-h-[88vh] lg:flex lg:items-center">
      {/* Calm, static ambient gradient caustics — no moving orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30" aria-hidden="true">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/15 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Brand band: ElectricLogo + interactive TechText wordmark */}
        <div className="mb-2 sm:mb-4 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[#060a12]/90 border border-cyan-400/40 p-1 shadow-[0_0_30px_rgba(34,211,238,0.25)] overflow-hidden">
              <ElectricLogo
                src="/inixa-brand-electric.svg"
                color="#38bdf8"
                glowColor="#0284c7"
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

          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg backdrop-blur-xl mb-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <DecryptedText
              text="INIXA AI LABS • 2026 SHOWCASE"
              animateOn="view"
              speed={40}
              maxIterations={10}
              revealDirection="start"
              className="tracking-widest uppercase font-mono text-cyan-300"
            />
          </div>
          <div className="relative mx-auto w-full max-w-4xl h-[120px] sm:h-[160px] md:h-[200px] text-white">
            <TechText
              text="INIXA LAB"
              fontWeight={700}
              fontSize={150}
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
              accentColor="#22d3ee"
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
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headlines & Action CTAs */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <Shuffle
              text="Frontiers of AI & Liquid Glass Flagships"
              tag="h1"
              className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
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
              accentColor="#22d3ee"
            />

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Nine native applications — audiophile bit-perfect players, an autonomous AI
              sandbox, a hardened privacy browser, and zero-ad stream extractors. Real software,
              captured on real hardware, with zero telemetry.
            </p>

            {/* Premium Interactive CTA Buttons with Magnet Effect */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Magnet magnetStrength={0.18}>
                <GlassButton
                  href="/products"
                  variant="primary"
                  className="!px-6 !py-3 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore 9 Products
                </GlassButton>
              </Magnet>

              <Magnet magnetStrength={0.18}>
                <GlassButton
                  href="/downloads"
                  variant="secondary"
                  className="!px-6 !py-3 cursor-pointer"
                  icon={<Download className="h-4 w-4" />}
                >
                  Download APKs
                </GlassButton>
              </Magnet>

              <Magnet magnetStrength={0.18}>
                <GlassButton
                  onClick={onOpenSearch}
                  variant="ghost"
                  className="!px-5 !py-3 text-white/70 hover:text-white cursor-pointer"
                  icon={<Search className="h-4 w-4 text-cyan-400" />}
                >
                  Search <kbd className="ml-1 text-[10px] text-white/40">⌘K</kbd>
                </GlassButton>
              </Magnet>
            </div>

            {/* Verified Metrics Strip */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4 max-w-2xl mx-auto lg:mx-0">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-mono text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                  <div className="mt-1 text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Physical Device 3D DepthCarousel */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[570px] sm:h-[620px] flex items-center justify-center">
              {/* Soft ambient back-glow aura */}
              <div className="pointer-events-none absolute -inset-6 rounded-[56px] bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-purple-600/10 blur-3xl opacity-60" />

              <DepthCarousel
                items={HERO_SHOWCASE_ITEMS}
                cardWidth={260}
                cardHeight={520}
                radius={34}
                depth={160}
                spread={55}
                tilt={16}
                tiltDirection="right"
                perspective={1300}
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

              {/* Floating feature pills - dynamic and crisp */}
              <div className="absolute -left-6 top-1/4 z-30 hidden rounded-full border border-white/15 bg-black/90 px-3.5 py-1.5 text-xs text-white/90 shadow-2xl backdrop-blur-xl sm:flex items-center gap-1.5 pointer-events-none">
                <Music2 className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-medium">{currentItem.badge || 'Verified Flagship'}</span>
              </div>
              <div className="absolute -right-6 bottom-1/4 z-30 hidden rounded-full border border-white/15 bg-black/90 px-3.5 py-1.5 text-xs text-white/90 shadow-2xl backdrop-blur-xl sm:flex items-center gap-1.5 pointer-events-none">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-medium">100% Real Device</span>
              </div>
            </div>

            {/* Dynamic Active Screenshot Pill */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs backdrop-blur-xl shadow-lg">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="font-bold text-white">{currentItem.title}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 truncate max-w-[190px]">{currentItem.subtitle}</span>
              <span className="ml-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                {activeSlide + 1}/12
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
