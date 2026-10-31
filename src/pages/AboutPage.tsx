import React from 'react'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import { navigate } from '../router'
import {
  Sparkles,
  Shield,
  Layers,
  Cpu,
  Eye,
  Zap,
  Globe,
  Heart,
  Terminal,
  ArrowRight,
  Code2,
} from 'lucide-react'

const PILLARS = [
  {
    icon: <Eye className="w-6 h-6 text-cyan-400" />,
    title: 'Liquid Glass Optics',
    description:
      'We treat user interfaces as optical physics. Light refracts through chromatic layers, specular edges highlight active surfaces, and motion follows physical spring tension.',
  },
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: 'Zero Surveillance Architecture',
    description:
      'No third-party SDK trackers, no telemetry hooks, no advertising beacons. Your audio files, bookmarks, search terms, and browsing stay strictly local on device hardware.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    title: 'Native Hardware Acceleration',
    description:
      'Custom ExoPlayer audio pipelines, 120Hz Jetpack Compose rendering loops, GPU shader displacement, and direct memory streaming engineered for peak mobile efficiency.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-amber-400" />,
    title: 'Laboratory Speed & Direct Builds',
    description:
      'We release software with rapid iteration. Unfettered by app store bureaucratic delays, each binary is digitally signed and distributed directly to power users.',
  },
]

export const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="w-[850px] h-[550px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/10 to-purple-600/20 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The INIXA Manifesto</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Engineering Software as <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              High-Fidelity Physical Instruments
            </span>
          </h1>
          <p className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            INIXA AI Labs was founded on a simple conviction: modern mobile software has become bloated, predatory, and visually stagnant. We build software that feels alive.
          </p>
        </div>

        {/* Narrative Section */}
        <GlassCard glassLevel="panel" className="p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The Philosophy of Liquid Glass
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            <p>
              In an era dominated by flat, sanitized templates and generic design systems, INIXA reimagines the digital viewport as a tactile, optical substance. Inspired by high-end audio hardware and experimental Google Labs projects, our design language blends real-time chromatic aberration, caustics, and specular highlights.
            </p>
            <p>
              When a user touches a slider in Beat Box Ultra or navigates a tab in Lumina Browser, the glass substrate yields with mass, refraction dynamically distorts underlying elements, and micro-animations provide immediate sensory confirmation.
            </p>
            <p>
              This isn't merely aesthetic decoration—it is functional clarity. Glass allows dense spatial hierarchies to remain readable and fluid without cluttering the screen with opaque borders and synthetic drop shadows.
            </p>
          </div>
        </GlassCard>

        {/* Core Pillars Grid */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white">Our Engineering Creed</h2>
            <p className="text-sm text-neutral-400 mt-2">Built without compromise for Android power users.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, idx) => (
              <GlassCard key={idx} glassLevel="card" className="p-7 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{pillar.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Real Ecosystem Stats */}
        <GlassCard glassLevel="specular" className="p-8 sm:p-10 border-cyan-500/30">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-5xl font-black text-cyan-400">9</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold mt-1">
                Ecosystem Apps
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-purple-400">15</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold mt-1">
                Production APKs
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-emerald-400">0</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold mt-1">
                Ad Trackers
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-pink-400">120Hz</div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold mt-1">
                Refresh Fidelity
              </div>
            </div>
          </div>
        </GlassCard>

        {/* CTA */}
        <div className="text-center space-y-6 pt-4">
          <h3 className="text-2xl font-bold text-white">Experience the laboratory in your hands</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlassButton
              onClick={() => navigate('/products')}
              variant="primary"
              className="!py-3.5 !px-8 text-base shadow-lg shadow-cyan-500/25"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Products
            </GlassButton>
            <GlassButton
              onClick={() => navigate('/downloads')}
              variant="secondary"
              className="!py-3.5 !px-8 text-base"
            >
              Direct Downloads
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  )
}
