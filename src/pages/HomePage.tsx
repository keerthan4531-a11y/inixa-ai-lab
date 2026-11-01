import React from 'react'
import { HeroSection } from '../sections/home/HeroSection'
import { ProductMarquee } from '../sections/home/ProductMarquee'
import { LabsGridSection } from '../sections/home/LabsGridSection'
import { Hardware3DSection } from '../sections/home/Hardware3DSection'
import { GallerySection } from '../sections/home/GallerySection'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import DriftWall from '../components/DriftWall'
import LogoLoop, { LogoItem } from '../components/LogoLoop'
import RulerCarousel from '../components/RulerCarousel'
import { ALL_PRODUCTS } from '../data/products'
import { navigate } from '../router'
import { Download, Sparkles, Shield, ArrowRight, Layers, Smartphone } from 'lucide-react'

const DRIFT_ITEMS = [
  { image: '/shots/beat-pro/01ee4605-24f3-4202-9a6d-65439547f437.jpg', title: 'BeatBox Pro — Equalizer DSP', href: '/product/beatbox-pro' },
  { image: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg', title: 'BeatBox Ultra — Liquid Glass Player', href: '/product/beatbox-ultra' },
  { image: '/shots/liquid-streaming/104338c6-3296-46a9-b63f-241c8ddbbda9.jpg', title: 'Liquid Stream — 4K Stream Engine', href: '/product/liquid-stream' },
  { image: '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg', title: 'MyTube — Decentralized Player', href: '/product/mytube' },
  { image: '/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg', title: 'Clipster — Format Transcoder', href: '/product/clipster' },
  { image: '/shots/inixa-ai/image.png', title: 'INIXA AI — Neural Workspace', href: '/product/inixa-ai' },
  { image: '/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg', title: 'BeatBox Lite — Offline Vault', href: '/product/beatbox-lite' },
  { image: '/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg', title: 'Lumina Browser — Fire Wipe Engine', href: '/product/lumina' },
  { image: '/shots/beat-pro/19db6341-8988-4fb8-ba73-41f97dc665ed.jpg', title: 'BeatBox Pro — Dynamic Lyrics', href: '/product/beatbox-pro' },
  { image: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg', title: 'BeatBox Ultra — Ambient Canvas', href: '/product/beatbox-ultra' },
  { image: '/shots/liquid-streaming/42ef5c25-7aac-48ce-80d0-606989fba156.jpg', title: 'Liquid Stream — Gesture ExoPlayer', href: '/product/liquid-stream' },
  { image: '/shots/my-tube/7a5397cb-7e56-4576-8b3f-94743ad77412.jpg', title: 'MyTube — SponsorBlock UI', href: '/product/mytube' },
  { image: '/shots/clipster/19b0165f-2102-4044-b938-cca4d546c829.jpg', title: 'Clipster — Multi-thread Downloader', href: '/product/clipster' },
  { image: '/shots/inixa-ai/373d0497-e6b1-4e11-aedf-13578c79edb6.jpg', title: 'INIXA AI — Multi-Model Gateway', href: '/product/inixa-ai' },
  { image: '/shots/beat-box-lite/32a1e6bf-213f-4046-874d-83adda9d3bd0.jpg', title: 'BeatBox Lite — Dynamic Visuals', href: '/product/beatbox-lite' },
  { image: '/shots/lumina/21e8bad7-558f-4b2e-8922-4d879f811d03.jpg', title: 'Lumina Browser — DuckPlayer Sandbox', href: '/product/lumina' },
]

interface HomePageProps {
  onOpenSearch?: () => void
}


const TECH_LOGOS: LogoItem[] = [
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#3DDC84]" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9996.4482.9996.9993.0001.5511-.4486.9997-.9996.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9997.4482.9997.9993 0 .5511-.4486.9997-.9997.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4128 13.8533 8.0818 12 8.0818c-1.8533 0-3.5902.331-5.1368.868L4.8409 5.4468a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>
        <span className="text-xs font-semibold text-white/90">Android 15+ Native</span>
      </span>
    ),
    title: 'Android Native SDK',
    hoverColor: '#3DDC84',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#7F52FF]" viewBox="0 0 24 24"><path d="M24 24H0V0h24L12 12Z"/></svg>
        <span className="text-xs font-semibold text-white/90">Kotlin Coroutines</span>
      </span>
    ),
    title: 'Kotlin Native',
    hoverColor: '#7F52FF',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#00ff87]" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00ff87" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs font-semibold text-white/90">WebGL2 Shaders</span>
      </span>
    ),
    title: 'WebGL2 Engine',
    hoverColor: '#00ff87',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 stroke-white fill-none" viewBox="0 0 24 24"><polygon points="12 2 22 20 2 20" strokeWidth="1.8" strokeLinejoin="round"/></svg>
        <span className="text-xs font-semibold text-white/90">Three.js 3D</span>
      </span>
    ),
    title: 'Three.js Spatial Pipeline',
    hoverColor: '#FFFFFF',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#61DAFB]" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>
        <span className="text-xs font-semibold text-white/90">React 19 Core</span>
      </span>
    ),
    title: 'React Concurrent UI',
    hoverColor: '#61DAFB',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#F74C00]" viewBox="0 0 24 24"><path d="M12 1a2 2 0 0 1 2 2v.2a8.03 8.03 0 0 1 3.5 1.5l.14-.14a2 2 0 1 1 2.83 2.83l-.14.14a8.03 8.03 0 0 1 1.5 3.5H22a2 2 0 1 1 0 4h-.17a8.03 8.03 0 0 1-1.5 3.5l.14.14a2 2 0 1 1-2.83 2.83l-.14-.14a8.03 8.03 0 0 1-3.5 1.5V23a2 2 0 1 1-4 0v-.2a8.03 8.03 0 0 1-3.5-1.5l-.14.14a2 2 0 1 1-2.83-2.83l.14-.14a8.03 8.03 0 0 1-1.5-3.5H2a2 2 0 1 1 0-4h.17a8.03 8.03 0 0 1 1.5-3.5l-.14-.14a2 2 0 1 1 2.83-2.83l.14.14a8.03 8.03 0 0 1 3.5-1.5V3a2 2 0 0 1 2-2zm0 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>
        <span className="text-xs font-semibold text-white/90">Rust Native Engine</span>
      </span>
    ),
    title: 'Rust Core Architecture',
    hoverColor: '#F74C00',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#38BDF8]" viewBox="0 0 24 24"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>
        <span className="text-xs font-semibold text-white/90">Tailwind CSS 4</span>
      </span>
    ),
    title: 'Tailwind Styling',
    hoverColor: '#38BDF8',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#E60012]" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" stroke="#E60012" strokeWidth="1.8" fill="none"/><rect x="8" y="8" width="8" height="8" rx="1.5" fill="#E60012"/><line x1="9" y1="1" x2="9" y2="4" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="1" x2="15" y2="4" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="9" y1="20" x2="9" y2="23" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="15" y1="20" x2="15" y2="23" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="9" x2="4" y2="9" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="15" x2="4" y2="15" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="20" y1="9" x2="23" y2="9" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/><line x1="20" y1="15" x2="23" y2="15" stroke="#E60012" strokeWidth="1.8" strokeLinecap="round"/></svg>
        <span className="text-xs font-semibold text-white/90">Snapdragon NPU</span>
      </span>
    ),
    title: 'Snapdragon Hardware Acceleration',
    hoverColor: '#E60012',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 stroke-[#C084FC] fill-none" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeWidth="2" strokeLinecap="round"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" strokeWidth="2"/></svg>
        <span className="text-xs font-semibold text-white/90">Bit-Perfect 32-bit DSP</span>
      </span>
    ),
    title: 'ExoPlayer Lossless Audio',
    hoverColor: '#C084FC',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 fill-[#0AE448]" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        <span className="text-xs font-semibold text-white/90">GSAP Physics</span>
      </span>
    ),
    title: 'GreenSock Motion Architecture',
    hoverColor: '#0AE448',
  },
  {
    node: (
      <span className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <svg className="w-5 h-5 stroke-[#10B981] fill-none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/><path d="m9 12 2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs font-semibold text-white/90">0 Telemetry Verified</span>
      </span>
    ),
    title: 'Air-Gapped Privacy Engine',
    hoverColor: '#10B981',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-pink-600 selection:text-white">
      {/* 1. Glass 3D Hero */}
      <HeroSection onOpenSearch={onOpenSearch} />

      {/* 2. Interactive Marquee */}
      <ProductMarquee />

      {/* 3. Labs Grid Section (9 Real Products) */}
      <LabsGridSection />

      {/* 4. Real 3D Hardware Showcase */}
      <Hardware3DSection />

      {/* 5. Production Screenshot Gallery (56 Screens) */}
      <GallerySection />

      {/* 6. Comprehensive Ecosystem Download Banner */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <GlassCard
            glassLevel="specular"
            className="p-8 sm:p-14 relative overflow-hidden text-center sm:text-left border-emerald-500/30"
          >
            {/* Background glow orbs — Light Green + Dark Pink */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -top-20 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#00ff87]" />
                  <span>Direct Build Pipeline • Zero Tracking • Pure Performance</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Ready to experience <br />
                  <span className="bg-gradient-to-r from-[#00ff87] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
                    next-generation Android craft?
                  </span>
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                  Download all 15 production APKs directly from INIXA Labs. Guaranteed SHA-256 integrity, no ad trackers, no telemetry wrappers, and immediate offline playback.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Shield className="w-4 h-4 text-[#00ff87]" />
                    <span>Malware Free Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Smartphone className="w-4 h-4 text-pink-400" />
                    <span>Android 10 - 15</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>All 9 Labs Products</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <GlassButton
                  onClick={() => navigate('/downloads')}
                  variant="primary"
                  className="!py-4 !px-8 text-base shadow-lg shadow-emerald-500/25 w-full justify-center"
                  icon={<Download className="w-5 h-5" />}
                >
                  Download Hub
                </GlassButton>
                <GlassButton
                  onClick={() => navigate('/products')}
                  variant="secondary"
                  className="!py-4 !px-8 text-base w-full justify-center hover:border-pink-500/40"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Catalog
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 7. React Bits 3D DriftWall Showcase — Living Ecosystem Horizon */}
      <section className="relative py-16 overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#020612] via-[#040a18] to-[#020612]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-950/60 px-4 py-1.5 text-xs font-semibold text-pink-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>3D SPATIAL DRIFT WALL • INTERACTIVE PERSPECTIVE VIEW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Infinite Software Horizon
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            A slow 3D drift of verified production screens from all 9 INIXA Labs flagships, in their real portrait format. Hover a frame to lift it, click to open the product.
          </p>
        </div>

        <div style={{ height: 600, width: '100%', position: 'relative' }}>
          <DriftWall
            items={DRIFT_ITEMS}
            columns={5}
            tileWidth={168}
            tileHeight={296}
            gap={16}
            tilt={12}
            turn={-9}
            perspective={1200}
            depth={70}
            speed={0}
            direction="up"
            variance={0.35}
            parallax={0.45}
            lift={56}
            fade={0.35}
            dim={0.88}
            overlayColor="#020612"
          />
        </div>
      </section>

      {/* 8. Interactive Precision Engineering Benchmark Ruler Carousel — 10 Native Pillars */}
      <section className="relative overflow-hidden border-t border-white/10" id="benchmarks">
        <RulerCarousel />
      </section>

      {/* 9. React Bits LogoLoop — Technology Ecosystem & Native Engineering Strip */}
      <section className="relative py-14 border-t border-white/10 bg-[#020612]/95 backdrop-blur-md overflow-hidden" aria-label="Technology Stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] animate-pulse" />
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
