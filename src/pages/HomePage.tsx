import React from 'react'
import { HeroSection } from '../sections/home/HeroSection'
import { ProductMarquee } from '../sections/home/ProductMarquee'
import { LabsGridSection } from '../sections/home/LabsGridSection'
import { Hardware3DSection } from '../sections/home/Hardware3DSection'
import { GallerySection } from '../sections/home/GallerySection'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import DriftWall from '../components/DriftWall'
import { ALL_PRODUCTS } from '../data/products'
import { navigate } from '../router'
import { Download, Sparkles, Shield, ArrowRight, Layers, Smartphone } from 'lucide-react'

const DRIFT_ITEMS = [
  { image: '/shots/beat-pro/01ee4605-24f3-4202-9a6d-65439547f437.jpg', title: 'BeatBox Pro — Equalizer DSP', href: '/product/beatbox-pro' },
  { image: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg', title: 'BearBox Ultra — Liquid Glass Player', href: '/product/bearbox-ultra' },
  { image: '/shots/liquid-streaming/104338c6-3296-46a9-b63f-241c8ddbbda9.jpg', title: 'Liquid Stream — 4K Stream Engine', href: '/product/liquid-stream' },
  { image: '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg', title: 'MyTube — Decentralized Player', href: '/product/mytube' },
  { image: '/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg', title: 'Clipster — Format Transcoder', href: '/product/clipster' },
  { image: '/shots/inixa-ai/image.png', title: 'INIXA AI — Neural Workspace', href: '/product/inixa-ai' },
  { image: '/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg', title: 'BeatBox Lite — Offline Vault', href: '/product/beatbox-lite' },
  { image: '/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg', title: 'Lumina Browser — Fire Wipe Engine', href: '/product/lumina' },
  { image: '/shots/beat-pro/19db6341-8988-4fb8-ba73-41f97dc665ed.jpg', title: 'BeatBox Pro — Dynamic Lyrics', href: '/product/beatbox-pro' },
  { image: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg', title: 'BearBox Ultra — Ambient Canvas', href: '/product/bearbox-ultra' },
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

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
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
            className="p-8 sm:p-14 relative overflow-hidden text-center sm:text-left border-cyan-500/30"
          >
            {/* Background glow orb */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -top-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Direct Build Pipeline • Zero Tracking • Pure Performance</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Ready to experience <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    next-generation Android craft?
                  </span>
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                  Download all 15 production APKs directly from INIXA Labs. Guaranteed SHA-256 integrity, no ad trackers, no telemetry wrappers, and immediate offline playback.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Malware Free Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>Android 10 - 15</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>All 9 Labs Products</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <GlassButton
                  onClick={() => navigate('/downloads')}
                  variant="primary"
                  className="!py-4 !px-8 text-base shadow-lg shadow-cyan-500/20 w-full justify-center"
                  icon={<Download className="w-5 h-5" />}
                >
                  Download Hub
                </GlassButton>
                <GlassButton
                  onClick={() => navigate('/products')}
                  variant="secondary"
                  className="!py-4 !px-8 text-base w-full justify-center"
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
      <section className="relative py-16 overflow-hidden border-t border-white/10 bg-gradient-to-b from-black via-neutral-950 to-[#060010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
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
            speed={30}
            direction="up"
            variance={0.35}
            parallax={0.45}
            lift={56}
            fade={0.35}
            dim={0.88}
            overlayColor="#060010"
          />
        </div>
      </section>
    </div>
  )
}
