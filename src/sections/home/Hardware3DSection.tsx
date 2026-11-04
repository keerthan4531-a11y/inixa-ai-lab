import React, { useState } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { Download, ArrowRight, Smartphone, Check, Sparkles } from 'lucide-react'
import { navigate } from '../../router'
import { cn } from '../../utils/cn'
import { DoodleBird, DoodlePenguin, DoodleSketchArrow } from '../../components/doodle/DoodleCritters'
import { DoodleIcon } from '../../components/footer/DoodleCrewFooter'

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
    <section className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden" id="showcase">
      {/* Background Caustic Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[140px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${selectedProduct.accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="text-center mb-12 relative z-10">
        {/* Playful Bird & Penguin Row above Heading */}
        <div className="flex items-center justify-center gap-6 mb-2 pointer-events-auto">
          <DoodleBird pose="singing" size={54} speech="Singing lossless FLAC! 🎵" speechAlign="top" />
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-black tracking-widest text-[#00ff87] uppercase px-4 py-1.5 rounded-full border-2 border-white bg-[#040a18] shadow-[3px_3px_0_#be185d] -rotate-1">
            <Smartphone className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>REAL HARDWARE VERIFICATION</span>
          </div>
          <DoodlePenguin pose="waddling" size={54} speech="Noot noot! 120Hz tested 🐧" speechAlign="top" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          Tactile 3D Hardware{' '}
          <span className="text-[#00ff87] relative inline-block">
            Showcase
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-medium">
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
              className={`min-h-10 shrink-0 rounded-full px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                selectedProductId === prod.id
                  ? 'bg-[#00ff87] text-[#020612] border-2 border-white shadow-[3px_3px_0_#be185d] -rotate-1 scale-105'
                  : 'bg-[#040a18] text-white hover:border-white hover:text-[#00ff87] border-2 border-white/40 shadow-[2px_2px_0_rgba(255,255,255,0.2)]'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Phone Mockup & Specs Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Realistic Phone Mockup with Perching Bird & Sliding Penguin */}
        <div className="lg:col-span-5 flex flex-col items-center relative">
          {/* Bird perched on top notch of phone */}
          <div className="absolute -top-10 z-30 pointer-events-auto">
            <DoodleBird pose="perching" size={56} speech="Perched on the notch! 🐥" speechAlign="top" />
          </div>

          {activeScreenshot ? (
            <div className="w-full flex flex-col items-center">
              <DeviceMockup
                src={activeScreenshot.assetPath}
                alt={activeScreenshot.altText}
                glowColor={selectedProduct.accentColor}
              />

              {/* Sliding Penguin at the base of the phone */}
              <div className="mt-2 pointer-events-auto">
                <DoodlePenguin pose="sliding" size={62} speech="Sliding through 120Hz frames! ❄️" speechAlign="bottom" />
              </div>
              
              {/* Screen switcher pills */}
              {Object.keys(prodScreenshots).length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap max-w-[340px]">
                  {Object.entries(prodScreenshots).slice(0, 4).map(([key, shot]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedShotKey(key)}
                      className={cn(
                        'px-3 py-1 rounded-full text-[11px] font-bold transition-all border-2 cursor-pointer',
                        activeKey === key
                          ? 'bg-[#00ff87] text-black border-white shadow-[2px_2px_0_#be185d]'
                          : 'bg-[#040a18] text-white/80 border-white/30 hover:border-white hover:text-white'
                      )}
                    >
                      {shot.whatItShows}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[480px] w-[260px] rounded-[36px] border-2 border-white bg-black/60 shadow-[5px_5px_0_#be185d] flex items-center justify-center text-white/40">
              No Preview
            </div>
          )}
        </div>

        {/* Right Column: Deep Product Details with Audiophile Headphones Penguin */}
        <div className="lg:col-span-7 relative">
          {/* Headphones Penguin perched on top right of the card */}
          <div className="absolute -top-12 right-6 sm:right-12 z-30 pointer-events-auto">
            <DoodlePenguin pose="headphones" size={64} speech="Audiophile penguin jamming! 🎧" speechAlign="left" />
          </div>

          <div className="doodle-card rounded-[32px] p-8 border-2 border-white shadow-[6px_6px_0_#be185d]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span
                className="doodle-stamp rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-black bg-[#00ff87] shadow-[2px_2px_0_#be185d]"
              >
                {selectedProduct.badge}
              </span>
              <span className="text-xs font-mono font-bold text-neutral-400 bg-[#060e24] px-2.5 py-1 rounded-md border border-white/30">
                {selectedProduct.platform}
              </span>
            </div>

            <h3 className="text-3xl font-black text-white mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-sm font-bold text-[#00ff87] mb-4">
              {selectedProduct.tagline}
            </p>
            <p className="text-sm text-neutral-300 font-medium leading-relaxed mb-6">
              {selectedProduct.detailedSummary}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-2 mb-8 border-t-2 border-dashed border-white/20 pt-4">
              <div className="text-xs font-black uppercase tracking-wider text-[#00ff87] mb-2 font-mono">
                ✦ Engineering Highlights
              </div>
              {selectedProduct.techHighlights.slice(0, 4).map((tech, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-200 font-medium">
                  <span className="text-[#00ff87] font-black shrink-0">✔</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons with Doodle Arrow */}
            <div className="flex flex-wrap items-center gap-3.5 pt-5 border-t-2 border-dashed border-white/20 relative">
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={() => navigate(`/product/${selectedProduct.id}`)}
                  className="doodle-btn doodle-btn-green px-6 py-2.5 text-xs font-black text-[#020612]"
                >
                  <span>View Full Specifications</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {latestApk && (
                <a
                  href={latestApk.downloadPath}
                  download
                  className="doodle-btn doodle-btn-outline px-5 py-2.5 text-xs font-black text-white hover:text-[#00ff87]"
                >
                  <Download className="h-4 w-4 text-[#00ff87]" />
                  <span>Download {latestApk.fileName} ({latestApk.sizeFormatted})</span>
                </a>
              )}

              {/* Hand-drawn curly arrow */}
              <div className="hidden sm:block absolute -bottom-10 right-4 pointer-events-none">
                <DoodleSketchArrow direction="up-right" label="Tap to inspect" color="#ffd23f" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
