import React, { useState } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { GlassCard } from '../../components/common/GlassCard'
import { GlassButton } from '../../components/common/GlassButton'
import { Download, ArrowRight, Smartphone, Sparkles, Check } from 'lucide-react'
import { navigate } from '../../router'

export const Hardware3DSection: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('beatbox-pro')

  const selectedProduct = ALL_PRODUCTS.find((p) => p.id === selectedProductId) || ALL_PRODUCTS[0]
  const prodScreenshots = SCREENSHOT_MAP[selectedProduct.id] || {}
  const firstScreenshotKey = Object.keys(prodScreenshots)[0]
  const activeScreenshot = prodScreenshots[firstScreenshotKey]

  const latestApk = selectedProduct.apks?.[selectedProduct.apks.length - 1]

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
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {ALL_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
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
        {/* Left Column: Realistic Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          {activeScreenshot ? (
            <DeviceMockup
              src={activeScreenshot.assetPath}
              alt={activeScreenshot.altText}
              glowColor={selectedProduct.accentColor}
            />
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
