import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS, Product } from '../data/products'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import { navigate } from '../router'
import {
  Sparkles,
  Layers,
  Download,
  ArrowRight,
  Filter,
  CheckCircle2,
  HardDrive,
  Cpu,
  Smartphone,
} from 'lucide-react'

const CATEGORIES = ['All Products', 'Audio Systems', 'Video & Streaming', 'System & AI Utilities']

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === 'All Products'
          ? true
          : selectedCategory === 'Audio Systems'
          ? p.category.toLowerCase().includes('audio') || p.category.toLowerCase().includes('music')
          : selectedCategory === 'Video & Streaming'
          ? p.category.toLowerCase().includes('video') || p.category.toLowerCase().includes('stream')
          : p.category.toLowerCase().includes('ai') ||
            p.category.toLowerCase().includes('browser') ||
            p.category.toLowerCase().includes('utility') ||
            p.category.toLowerCase().includes('knowledge')

      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCat && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-[#020612] text-white selection:bg-pink-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="w-[800px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-pink-600/15 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>Complete INIXA Software Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Flagship Applications & <br />
            <span className="bg-gradient-to-r from-[#00ff87] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
              Laboratory Experiments
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Every product engineered at INIXA Labs is built with custom graphics pipelines, real-time hardware audio rendering, and zero-telemetry architectures.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#00ff87] to-emerald-400 text-black font-extrabold shadow-[0_0_15px_rgba(0,255,135,0.35)]'
                    : 'bg-white/[0.03] border border-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const latestApk =
              product.apks && product.apks.length > 0 ? product.apks[product.apks.length - 1] : null

            return (
              <GlassCard
                key={product.id}
                glassLevel="card"
                enableTilt={true}
                className="flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden group hover:border-emerald-400/40 transition-all duration-300"
              >
                {/* Glow accent */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 w-36 h-36 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: product.accentColor }}
                />

                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${product.accentColor}18`,
                        borderColor: `${product.accentColor}40`,
                        color: product.accentColor,
                      }}
                    >
                      {product.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{product.version}</span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400/90 mb-3">{product.tagline}</p>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {product.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff87] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white/80 hover:text-[#00ff87] hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all cursor-pointer"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {latestApk ? (
                    <GlassButton
                      href={latestApk.downloadPath}
                      download
                      variant="primary"
                      className="!py-2 !px-3.5 !text-xs font-mono font-bold"
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      APK ({latestApk.sizeFormatted || latestApk.fileSize || 'Verified'})
                    </GlassButton>
                  ) : (
                    <GlassButton
                      onClick={() => navigate(`/product/${product.id}`)}
                      variant="secondary"
                      className="!py-2 !px-3.5 !text-xs font-medium"
                    >
                      Web Service
                    </GlassButton>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-base">No products match your search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}
