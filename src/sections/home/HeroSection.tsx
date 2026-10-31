import React from 'react'
import { GlassHeroScene } from '../../components/3d/GlassHeroScene'
import { GlassButton } from '../../components/common/GlassButton'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { SCREENSHOT_MAP, ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { Sparkles, Download, ArrowRight, Search, ShieldCheck, Music2 } from 'lucide-react'

interface HeroSectionProps {
  onOpenSearch?: () => void
}

/**
 * The hero now opens with an OBJECT (a real phone running a real capture)
 * instead of a headline floating over abstract WebGL — which is the rule
 * styles.css states for this site. The 3D field stays, as atmosphere
 * behind the device, at reduced opacity.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSearch }) => {
  const heroShot =
    SCREENSHOT_MAP['bearbox-ultra']?.['shot-2'] ||
    SCREENSHOT_MAP['beatbox-pro']?.['shot-2']

  const stats = [
    { value: '9', label: 'Flagship apps' },
    { value: '15', label: 'Verified APKs' },
    { value: String(ALL_AUDITED_SCREENSHOTS.length), label: 'Real device screens' },
    { value: '0', label: 'Telemetry / trackers' },
  ]

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:min-h-[92vh] lg:flex lg:items-center">
      {/* 3D WebGL Liquid Glass Canvas (atmosphere, not the message) */}
      <GlassHeroScene className="opacity-60" />

      {/* Ambient gradient caustics */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30" aria-hidden="true">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-purple-600/20 blur-[120px]" />
      </div>
      {/* Readability scrim so copy never sits directly on bright 3D geometry */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
        {/* Copy */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 shadow-lg backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            <span>INIXA AI LABS 2026 SHOWCASE</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Frontiers of AI &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Liquid Glass Flagships
            </span>
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0">
            Nine native applications — audiophile players, an autonomous AI sandbox, a hardened
            privacy browser and zero-ad stream tools. Real software, captured on real phones,
            with zero telemetry.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <GlassButton
              href="/products"
              variant="primary"
              className="!px-6 !py-3 !text-sm"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Explore 9 Products
            </GlassButton>
            <GlassButton
              href="/downloads"
              variant="secondary"
              className="!px-6 !py-3 !text-sm"
              icon={<Download className="h-4 w-4 text-cyan-400" aria-hidden="true" />}
            >
              Download APKs
            </GlassButton>
            {/* Only render search when it is actually wired up — a dead ⌘K
                button shipped here before because the prop was never passed. */}
            {onOpenSearch && (
              <GlassButton
                onClick={onOpenSearch}
                variant="ghost"
                className="!px-5 !py-3 !text-sm text-white/70"
                icon={<Search className="h-4 w-4" aria-hidden="true" />}
              >
                Search <kbd className="ml-1 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">⌘K</kbd>
              </GlassButton>
            )}
          </div>

          <dl className="mx-auto mt-11 grid max-w-2xl grid-cols-2 gap-5 border-t border-white/10 pt-6 text-left sm:grid-cols-4 lg:mx-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-xs text-white/50">{s.label}</dt>
                <dd className="order-1 text-2xl font-extrabold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The object: a phone running an unedited capture */}
        <div className="relative lg:col-span-5">
          {heroShot && (
            <DeviceMockup src={heroShot.assetPath} alt={heroShot.altText} glowColor="#FFBA4A" />
          )}
          <div className="pointer-events-none absolute -right-1 top-10 hidden items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md sm:inline-flex lg:right-2">
            <Music2 className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" /> Synced lyrics, live
          </div>
          <div className="pointer-events-none absolute -left-1 bottom-16 hidden items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md sm:inline-flex lg:left-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" /> 0 telemetry
          </div>
          <p className="mt-5 text-center text-xs text-white/45">
            BearBox Ultra — unedited capture from physical hardware
          </p>
        </div>
      </div>
    </section>
  )
}
