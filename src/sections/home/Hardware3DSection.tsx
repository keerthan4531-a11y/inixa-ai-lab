import React, { useState } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { GlassCard } from '../../components/common/GlassCard'
import { GlassButton } from '../../components/common/GlassButton'
import { Download, ArrowRight, Smartphone, Check } from 'lucide-react'
import { navigate } from '../../router'
import { cn } from '../../utils/cn'

/**
 * Curated map of the richest, most vivid and populated showcase screenshot
 * for each product to guarantee no dark/blank screens are shown by default.
 */
const BEST_SHOWCASE_SHOT: Record<string, string> = {
  'beatbox-ultra': 'shot-1', // Ambient Glass Now Playing (warm album tones + waveform)
  'beatbox-pro': 'shot-2',   // Hi-Res Now Playing (full playback UI, bitrate, album art)
  'beatbox-lite': 'shot-1',  // Compact Playlist & Track Hub (100% active screen coverage)
  'inixa-ai': 'shot-1',      // AI Chat Interface
  'liquid-stream': 'shot-1', // Live Stream Hub (edge-to-edge high-def channels)
  'mytube': 'shot-1',        // Trending Feed & Home (clean zero-ad algorithmic feed)
  'lumina': 'shot-1',        // Fire Wipe Engine & Sandbox
  'clipster': 'shot-5',      // Format Transcoder (multi-format video converter)
  'wikipedia-infopedia': 'shot-1',
  'wikipedia-app': 'sc_cite',
}

export const Hardware3DSection: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('beatbox-ultra')
  const [selectedShotKey, setSelectedShotKey] = useState<string | null>(null)

  const selectedProduct = ALL_PRODUCTS.find((p) => p.id === selectedProductId) || ALL_PRODUCTS[0]
  const prodScreenshots = SCREENSHOT_MAP[selectedProduct.id] || {}

  const defaultKey = BEST_SHOWCASE_SHOT[selectedProduct.id] || Object.keys(prodScreenshots)[0] || 'shot-1'
  const activeKey = selectedShotKey && prodScreenshots[selectedShotKey] ? selectedShotKey : defaultKey
  const activeScreenshot = prodScreenshots[activeKey] || prodScreenshots[Object.keys(prodScreenshots)[0]]

  const latestApk = selectedProduct.apks?.[selectedProduct.apks.length - 1]

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id)
    setSelectedShotKey(null) // reset to preferred showcase shot
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto" id="showcase">
      {/* Background Caustic Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[140px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${selectedProduct.accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
          <Smartphone className="h-3.5 w-3.5" />
          <span>REAL HARDWARE VERIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Tactile 3D Hardware Showcase
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/60">
          Inspect unedited physical device captures running our 120Hz Liquid Glass shaders, Haze backdrops, and bit-perfect audio pipelines.
        </p>

        {/* Product Selector Pills */}
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:items-center sm:justify-center sm:px-0">
          {ALL_PRODUCTS.map((prod) => (
            <button
              type="button"
              key={prod.id}
              onClick={() => handleSelectProduct(prod.id)}
              aria-pressed={selectedProductId === prod.id}
              className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedProductId === prod.id
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Phone Mockup & Specs Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Realistic Phone Mockup with Screen Pills */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {activeScreenshot ? (
            <div className="w-full flex flex-col items-center">
              <DeviceMockup
                src={activeScreenshot.assetPath}
                alt={activeScreenshot.altText}
                glowColor={selectedProduct.accentColor}
              />
              
              {/* Screen switcher pills */}
              {Object.keys(prodScreenshots).length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap max-w-[340px]">
                  {Object.entries(prodScreenshots).slice(0, 4).map(([key, shot]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedShotKey(key)}
                      className={cn(
                        'px-3 py-1 rounded-full text-[11px] font-medium transition-all border cursor-pointer',
                        activeKey === key
                          ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-md shadow-cyan-400/20'
                          : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {shot.whatItShows}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[480px] w-[260px] rounded-[36px] border border-white/20 bg-black/60 flex items-center justify-center text-white/40">
              No Preview
            </div>
          )}
        </div>

        {/* Right Column: Deep Product Details */}
        <div className="lg:col-span-7">
          <GlassCard glowColor={selectedProduct.accentColor} className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border"
                style={{
                  backgroundColor: `${selectedProduct.accentColor}25`,
                  borderColor: `${selectedProduct.accentColor}50`,
                }}
              >
                {selectedProduct.badge}
              </span>
              <span className="text-xs font-mono text-white/50">{selectedProduct.platform}</span>
            </div>

            <h3 className="text-3xl font-extrabold text-white mb-3">
              {selectedProduct.name}
            </h3>
            <p className="text-sm font-medium text-cyan-300 mb-6">
              {selectedProduct.tagline}
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {selectedProduct.detailedSummary}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-2 mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                Engineering Highlights
              </div>
              {selectedProduct.techHighlights.slice(0, 4).map((tech, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                  <div
                    className="h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${selectedProduct.accentColor}30` }}
                  >
                    <Check className="h-2.5 w-2.5" style={{ color: selectedProduct.accentColor }} />
                  </div>
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              <GlassButton
                onClick={() => navigate(`/product/${selectedProduct.id}`)}
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                View Full Specifications
              </GlassButton>

              {latestApk && (
                <GlassButton
                  href={latestApk.downloadPath}
                  download
                  icon={<Download className="h-4 w-4 text-emerald-400" />}
                >
                  Download {latestApk.fileName} ({latestApk.sizeFormatted})
                </GlassButton>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
