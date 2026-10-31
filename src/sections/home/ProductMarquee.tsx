import React from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { Sparkles, Cpu, Layers, Zap } from 'lucide-react'

const TECH_STACK_TAGS = [
  'Android 15 Ready',
  'Jetpack Compose Multiplatform',
  'Three.js WebGL 2.0',
  'ExoPlayer High Fidelity',
  'Liquid Glass Refraction',
  'Zero Trackers / 100% Local',
  '60fps Physics Tweens',
  'Edge Neural Synthesis',
  'Kotlin 2.1 Native',
  'ColorOS & OneUI Tuned',
]

export const ProductMarquee: React.FC = () => {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-md">
      {/* Subtle edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Row 1: Products */}
      <div className="marquee-row flex w-max animate-marquee space-x-6 mb-4 select-none">
        {[...ALL_PRODUCTS, ...ALL_PRODUCTS].map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            aria-hidden={i >= ALL_PRODUCTS.length || undefined}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-colors shadow-inner"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: p.accentColor, boxShadow: `0 0 10px ${p.accentColor}` }}
            />
            <span className="text-sm font-bold text-white tracking-wide">{p.name}</span>
            <span className="text-[11px] font-mono text-white/50 px-2 py-0.5 rounded-md bg-white/5">
              {p.version}
            </span>
            <span className="text-xs text-cyan-300/80 font-medium">{p.category}</span>
          </div>
        ))}
      </div>

      {/* Row 2: Technologies */}
      <div className="marquee-row flex w-max animate-marquee-reverse space-x-6 select-none opacity-80">
        {[...TECH_STACK_TAGS, ...TECH_STACK_TAGS, ...TECH_STACK_TAGS].map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            aria-hidden={i >= TECH_STACK_TAGS.length || undefined}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-200"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
