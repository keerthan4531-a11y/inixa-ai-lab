import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { GlassCard } from '../../components/common/GlassCard'
import { GlassButton } from '../../components/common/GlassButton'
import { navigate } from '../../router'
import { Download, ArrowRight, Sparkles, Layers } from 'lucide-react'

export const LabsGridSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Experiments', count: ALL_PRODUCTS.length },
    { id: 'audio', label: 'Audiophile Engines', count: 3 },
    { id: 'streaming', label: 'Cinema & Video', count: 2 },
    { id: 'ai', label: 'AI & Intelligence', count: 1 },
    { id: 'browser', label: 'Privacy Browsers', count: 1 },
    { id: 'utility', label: 'Extractors & Tools', count: 1 },
    { id: 'knowledge', label: 'AI Encyclopedia', count: 1 },
  ]

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return ALL_PRODUCTS
    if (activeCategory === 'streaming') {
      return ALL_PRODUCTS.filter((p) => p.category === 'streaming' || p.category === 'video')
    }
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="experiments">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
          <Layers className="h-3.5 w-3.5" />
          <span>INIXA LABS DIRECTORY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Experiments &amp; Production Flagships
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/60">
          Google-Labs-inspired directory of all 9 mobile and desktop systems, fully unbundled and verified for independent sideloading.
        </p>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/25 font-bold'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  activeCategory === cat.id ? 'bg-black/20 text-black' : 'bg-white/10 text-white/50'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Liquid Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const latestApk = prod.apks?.[prod.apks.length - 1]
          const firstFeature = prod.features[0]

          return (
            <GlassCard
              key={prod.id}
              glowColor={prod.accentColor}
              className="flex flex-col justify-between p-6 group cursor-pointer"
              onClick={() => navigate(`/product/${prod.id}`)}
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white border"
                    style={{
                      backgroundColor: `${prod.accentColor}25`,
                      borderColor: `${prod.accentColor}40`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: prod.accentColor }}
                    />
                    {prod.badge}
                  </span>
                  <span className="text-[11px] font-mono text-white/40">{prod.platform.split('(')[0]}</span>
                </div>

                {/* Product Name & Tagline */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-white/60 mb-5 line-clamp-2 leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Feature highlight bullet */}
                {firstFeature && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 mb-6">
                    <div className="text-[11px] font-bold text-white/80 mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-cyan-400" />
                      {firstFeature.title}
                    </div>
                    <div className="text-[11px] text-white/50 line-clamp-2">
                      {firstFeature.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                {latestApk ? (
                  <a
                    href={latestApk.downloadPath}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{latestApk.version}</span>
                    <span className="text-[10px] text-white/40">({latestApk.sizeFormatted})</span>
                  </a>
                ) : (
                  <span className="text-xs text-white/40">Desktop Engine</span>
                )}

                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </section>
  )
}
