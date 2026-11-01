import React from 'react';
import ScrollVelocity from '../../components/ScrollVelocity';
import RulerCarousel from '../../components/RulerCarousel';
import { ALL_PRODUCTS } from '../../data/products';
import { Sparkles } from 'lucide-react';

interface ProductItem {
  name: string;
  version: string;
  category: string;
  accentColor: string;
  badge?: string;
}

const ROW_1_PRODUCTS: ProductItem[] = [
  { name: 'BeatBox Pro', version: 'v2.4.2', category: 'audio', accentColor: '#a855f7' },
  { name: 'BeatBox Ultra', version: 'v1.0.405', category: 'audio', accentColor: '#f59e0b' },
  { name: 'Lumina Browser', version: 'v5.295.3', category: 'browser', accentColor: '#00ff87' },
  { name: 'Clipster', version: 'v2.0.0-stable', category: 'utility', accentColor: '#be185d' },
  { name: 'INIXA AI', version: 'v1.0.0', category: 'ai', accentColor: '#ec4899' },
];

const ROW_2_PRODUCTS: ProductItem[] = [
  { name: 'BeatBox Lite', version: 'v1.2.0', category: 'audio', accentColor: '#10b981' },
  { name: 'MyTube', version: 'v3.1.0', category: 'video', accentColor: '#ef4444' },
  { name: 'Liquid Stream', version: 'v1.4.2', category: 'streaming', accentColor: '#3b82f6' },
  { name: 'Infopedia Alpha', version: 'v2.7.0-alpha', category: 'knowledge', accentColor: '#eab308' },
  { name: 'BeatBox Pro', version: 'v2.4.2', category: 'audio', accentColor: '#a855f7' },
];

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
];

function renderProductRow(products: ProductItem[]) {
  return (
    <div className="inline-flex items-center gap-4 py-1">
      {products.map((p, idx) => (
        <div
          key={`${p.name}-${idx}`}
          className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#040a18]/90 border border-white/10 hover:border-emerald-400/50 transition-all shadow-lg backdrop-blur-xl hover:scale-105 select-none"
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
            style={{ backgroundColor: p.accentColor, boxShadow: `0 0 10px ${p.accentColor}` }}
          />
          <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">
            {p.name}
          </span>
          <span className="text-[11px] font-mono font-medium text-white/60 px-2 py-0.5 rounded-md bg-white/10 whitespace-nowrap">
            {p.version}
          </span>
          <span
            className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md whitespace-nowrap"
            style={{
              color: p.accentColor,
              backgroundColor: `${p.accentColor}15`,
              border: `1px solid ${p.accentColor}30`,
            }}
          >
            {p.category}
          </span>
        </div>
      ))}
    </div>
  );
}

export const ProductMarquee: React.FC = () => {
  return (
    <section className="relative py-8 overflow-hidden border-y border-white/10 bg-[#020612]/80 backdrop-blur-xl">
      {/* Background glow sheen — Light Green & Dark Pink */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-pink-600/10" />

      {/* Header Eyebrow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
          <span>Verified Software Ecosystem • Real-Time Velocity Stream</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-white/40">
          <span>Drag or Scroll to Accelerate</span>
        </div>
      </div>

      {/* React Bits ScrollVelocity Component */}
      <div className="w-full flex flex-col gap-3 py-2 cursor-grab active:cursor-grabbing">
        <ScrollVelocity
          texts={[
            renderProductRow(ROW_1_PRODUCTS),
            renderProductRow(ROW_2_PRODUCTS),
          ]}
          velocity={40}
          skewWithVelocity={8}
          scaleWithVelocity={0.06}
          draggable
          pauseOnHover
          fadeEdges
          gap={20}
          numCopies={4}
          damping={40}
          stiffness={300}
          parallaxClassName="parallax py-1"
          scrollerClassName="scroller items-center"
        />
      </div>

      {/* Interactive Precision Ruler Carousel — Auto-scrolling 10 Native Engineering Pillars */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <RulerCarousel
          compact
          autoScroll
          autoScrollInterval={2600}
          showHeader={false}
          className="!py-1"
        />
      </div>
    </section>
  );
};

export default ProductMarquee;
