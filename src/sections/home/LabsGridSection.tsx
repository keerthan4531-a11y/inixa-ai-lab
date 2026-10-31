import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { GlassCard } from '../../components/common/GlassCard'
import { SafeImage } from '../../components/common/SafeImage'
import { navigate, Link } from '../../router'
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
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6" id="experiments">
      <div className="mb-12 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
          <span>INIXA Labs Directory</span>
        </div>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Experiments &amp; Production Flagships
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/60 sm:text-base">
          All 9 mobile and desktop systems, fully unbundled and verified for independent sideloading.
        </p>

        {/* Category filters — one scrollable row on phones */}
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:items-center sm:justify-center sm:px-0">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-400/25'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  activeCategory === cat.id ? 'bg-black/20 text-black' : 'bg-white/10 text-white/55'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/55">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((prod) => {
            const latestApk = prod.apks?.[prod.apks.length - 1]
            const firstFeature = prod.features[0]
            // Cards were 9 identical text boxes. A real capture up top makes
            // each product recognisable in one glance (SafeImage degrades to
            // a branded placeholder for products without registry shots).
            const cover = Object.values(SCREENSHOT_MAP[prod.id] || {})[0]

            return (
              <GlassCard
                key={prod.id}
                glowColor={prod.accentColor}
                className="group flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                onClick={() => navigate(`/product/${prod.id}`)}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
                  <SafeImage
                    src={cover?.assetPath}
                    alt={cover?.altText || `${prod.name} in action`}
                    fallbackLabel={prod.name}
                    accentColor={prod.accentColor}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a101c] to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 pt-4">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white"
                      style={{
                        backgroundColor: `${prod.accentColor}25`,
                        borderColor: `${prod.accentColor}40`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: prod.accentColor }} aria-hidden="true" />
                      {prod.badge}
                    </span>
                    <span className="text-[11px] font-mono text-white/45">{prod.platform.split('(')[0]}</span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                    {prod.name}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-white/60 line-clamp-2">{prod.tagline}</p>

                  {firstFeature && (
                    <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-white/85">
                        <Sparkles className="h-3 w-3 text-cyan-400" aria-hidden="true" />
                        {firstFeature.title}
                      </div>
                      <div className="text-xs leading-relaxed text-white/55 line-clamp-2">{firstFeature.description}</div>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    {latestApk ? (
                      <a
                        href={encodeURI(latestApk.downloadPath)}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex min-h-11 items-center gap-1.5 py-1 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                        aria-label={`Download ${prod.name} ${latestApk.version} APK (${latestApk.sizeFormatted})`}
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{latestApk.version}</span>
                        <span className="text-[11px] text-white/45">({latestApk.sizeFormatted})</span>
                      </a>
                    ) : (
                      <span className="text-xs text-white/45">Desktop Engine</span>
                    )}

                    {/* A real, keyboard-focusable link — the card-wide onClick alone was unreachable by keyboard */}
                    <Link
                      to={`/product/${prod.id}`}
                      className="inline-flex min-h-11 items-center gap-1 py-1 text-xs font-bold text-cyan-400 transition-transform group-hover:translate-x-0.5"
                      aria-label={`View ${prod.name} details`}
                    >
                      Details <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}
    </section>
  )
}
