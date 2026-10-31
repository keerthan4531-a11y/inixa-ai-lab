import React from 'react'
import { HeroSection } from '../sections/home/HeroSection'
import { ProductMarquee } from '../sections/home/ProductMarquee'
import { LabsGridSection } from '../sections/home/LabsGridSection'
import { Hardware3DSection } from '../sections/home/Hardware3DSection'
import { GallerySection } from '../sections/home/GallerySection'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import { ALL_PRODUCTS } from '../data/products'
import { navigate } from '../router'
import { Download, Sparkles, Shield, ArrowRight, Layers, Smartphone } from 'lucide-react'

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
    </div>
  )
}
