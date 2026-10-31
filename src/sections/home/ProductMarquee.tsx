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
    <section className="relative py-10 overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Products Row — Clean, static non-running grid pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {ALL_PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-colors shadow-sm"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: p.accentColor, boxShadow: `0 0 8px ${p.accentColor}` }}
              />
              <span className="text-xs font-bold text-white tracking-wide">{p.name}</span>
              <span className="text-[10px] font-mono text-white/50 px-1.5 py-0.5 rounded bg-white/5">
                {p.version}
              </span>
              <span className="text-[11px] text-cyan-300/80 font-medium">{p.category}</span>
            </div>
          ))}
        </div>

        {/* Technology stack row — Calm and readable */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TECH_STACK_TAGS.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-[11px] font-mono text-cyan-200"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
