import React, { useState, useMemo } from 'react'
import { ALL_AUDITED_SCREENSHOTS, ScreenshotMeta } from '../../data/screenshotMap'
import { ALL_PRODUCTS } from '../../data/products'
import { GlassCard } from '../../components/common/GlassCard'
import { Image, Search, X, Maximize2, ExternalLink } from 'lucide-react'
import { navigate } from '../../router'

export const GallerySection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeModalShot, setActiveModalShot] = useState<ScreenshotMeta | null>(null)

  const filteredScreenshots = useMemo(() => {
    return ALL_AUDITED_SCREENSHOTS.filter((s) => {
      const matchProduct = selectedProduct === 'all' || s.product === selectedProduct
      const q = searchQuery.toLowerCase().trim()
      const matchQuery =
        !q ||
        s.whatItShows.toLowerCase().includes(q) ||
        s.altText.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q)
      return matchProduct && matchQuery
    })
  }, [selectedProduct, searchQuery])

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto" id="gallery">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
          <Image className="h-3.5 w-3.5" />
          <span>VERIFIED PIXELS DIRECT FROM HARDWARE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          All Verified Physical Hardware Screenshots ({ALL_AUDITED_SCREENSHOTS.length})
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/60">
          Zero mockups, zero placeholders. Every capture below is taken directly from the physical projects in your workspace with full title and feature breakdown.
        </p>

        {/* Product Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setSelectedProduct('all')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              selectedProduct === 'all'
                ? 'bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-400/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            All Screens ({ALL_AUDITED_SCREENSHOTS.length})
          </button>
          {ALL_PRODUCTS.map((prod) => {
            const count = ALL_AUDITED_SCREENSHOTS.filter((s) => s.product === prod.id).length
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(prod.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedProduct === prod.id
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{prod.name}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Search Filter Bar */}
        <div className="max-w-md mx-auto mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by feature (e.g. equalizer, lyrics, sponsorblock, 4K)..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-xs text-white placeholder-white/40 backdrop-blur-xl outline-none focus:border-cyan-400/50"
          />
        </div>
      </div>

      {/* Grid of Screenshots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredScreenshots.map((shot, idx) => (
          <GlassCard
            key={idx}
            className="group cursor-pointer p-2 flex flex-col justify-between"
            onClick={() => setActiveModalShot(shot)}
          >
            <div className="relative aspect-[9/18] overflow-hidden rounded-2xl bg-black/60 mb-2">
              <img
                src={shot.assetPath}
                alt={shot.altText}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300">
                  <Maximize2 className="h-3 w-3" /> Inspect
                </span>
              </div>
            </div>

            <div className="p-1">
              <div className="truncate text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {shot.whatItShows}
              </div>
              <div className="truncate text-[10px] text-white/40 uppercase tracking-wider font-mono">
                {shot.product}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Inspect Modal Dialog */}
      {activeModalShot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalShot(null)}
          />
          <div className="relative z-10 max-w-4xl w-full overflow-hidden rounded-3xl border border-white/20 bg-[#080d1a] p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center">
            <button
              onClick={() => setActiveModalShot(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative max-h-[75vh] aspect-[9/19] w-[260px] sm:w-[280px] overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-black">
              <img
                src={activeModalShot.assetPath}
                alt={activeModalShot.altText}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                {activeModalShot.product} — {activeModalShot.featureId}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {activeModalShot.whatItShows}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {activeModalShot.altText}
              </p>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 mb-6 text-xs text-white/50 space-y-1">
                <div>Original file: <code className="text-white/80">{activeModalShot.originalFile}</code></div>
                <div>Clean asset: <code className="text-white/80">{activeModalShot.assetPath}</code></div>
              </div>

              <button
                onClick={() => {
                  navigate(`/products/${activeModalShot.product}`)
                  setActiveModalShot(null)
                }}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-300 transition-colors"
              >
                Go to Product Page <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
