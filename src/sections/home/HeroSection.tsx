import React from 'react'
import { GlassButton } from '../../components/common/GlassButton'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { ShinyText } from '../../components/react-bits/ShinyText'
import { Magnet } from '../../components/react-bits/Magnet'
import DecryptedText from '../../components/react-bits/DecryptedText'
import TechText from '../../components/TechText'
import Shuffle from '../../components/Shuffle'
import { ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { Download, ArrowRight, Search, ShieldCheck, Music2 } from 'lucide-react'

interface HeroSectionProps {
  onOpenSearch?: () => void
}

/**
 * Clean, ultra-high-end hero showcasing physical flagship Android hardware
 * with pure dark optics and zero distracting looping animations.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSearch }) => {
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
        {/* Brand band: interactive TechText wordmark */}
        <div className="mb-2 sm:mb-4 text-center">
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

          {/* Right Column: Physical Device Showcase with Tactile 3D Tilt */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Soft ambient back-glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-[48px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl" />

              <DeviceMockup
                src="/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg"
                alt="BeatBox Ultra 405 Ambient Player"
                glowColor="#00f2fe"
                className="relative z-10 w-full"
              />

              {/* Floating feature pills - static and crisp */}
              <div className="absolute -left-6 top-1/4 z-20 hidden rounded-full border border-white/15 bg-black/85 px-3.5 py-1.5 text-xs text-white/90 shadow-2xl backdrop-blur-xl sm:flex items-center gap-1.5">
                <Music2 className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-medium">Synced lyrics, live</span>
              </div>
              <div className="absolute -right-6 bottom-1/4 z-20 hidden rounded-full border border-white/15 bg-black/85 px-3.5 py-1.5 text-xs text-white/90 shadow-2xl backdrop-blur-xl sm:flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-medium">0 telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
