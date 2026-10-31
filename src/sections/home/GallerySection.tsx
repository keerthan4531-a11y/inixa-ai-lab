import React, { useEffect, useMemo, useState } from 'react'
import { ALL_AUDITED_SCREENSHOTS, SCREENSHOT_MAP, ScreenshotMeta } from '../../data/screenshotMap'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from '../../data/products'
import { GlassButton } from '../../components/common/GlassButton'
import FlexCarousel from '../../components/FlexCarousel'
import { Search, X, Maximize2, ExternalLink, ChevronLeft, ChevronRight, ImageOff, Sparkles } from 'lucide-react'
import { navigate } from '../../router'

/**
 * Round-robin across products (BearBox 1, BeatBox Pro 1, …) so the
 * carousel shows a rich mixture of the whole ecosystem.
 */
function interleavedScreenshots(): ScreenshotMeta[] {
  const byProduct = ALL_PRODUCTS.map((p) => Object.values(SCREENSHOT_MAP[p.id] || {})).filter(
    (list) => list.length > 0,
  )
  const out: ScreenshotMeta[] = []
  const maxLen = Math.max(0, ...byProduct.map((l) => l.length))
  for (let i = 0; i < maxLen; i++) {
    for (const list of byProduct) {
      if (list[i]) out.push(list[i])
    }
  }
  return out.length > 0 ? out : ALL_AUDITED_SCREENSHOTS
}

export const GallerySection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPreset, setCurrentPreset] = useState<'liquid' | 'vortex' | 'arch' | 'ribbon'>('liquid')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const ordered = useMemo(interleavedScreenshots, [])

  const filteredScreenshots = useMemo(() => {
    return ordered.filter((s) => {
      const matchProduct = selectedProduct === 'all' || s.product === selectedProduct
      const q = searchQuery.toLowerCase().trim()
      const matchQuery =
        !q ||
        s.whatItShows.toLowerCase().includes(q) ||
        s.altText.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q) ||
        (PRODUCTS_BY_ID[s.product]?.name || '').toLowerCase().includes(q)
      return matchProduct && matchQuery
    })
  }, [ordered, selectedProduct, searchQuery])

  useEffect(() => {
    setActiveIndex(null)
  }, [selectedProduct, searchQuery])

  // Map to FlexCarousel item format: { src, alt, title, subtitle }
  const carouselItems = useMemo(() => {
    return filteredScreenshots.map((shot) => ({
      src: shot.assetPath,
      alt: shot.altText,
      title: shot.whatItShows,
      subtitle: PRODUCTS_BY_ID[shot.product]?.name || shot.product.toUpperCase(),
    }))
  }, [filteredScreenshots])

  const activeShot = activeIndex !== null ? filteredScreenshots[activeIndex] : undefined
  const productsWithShots = ALL_PRODUCTS.filter(
    (p) => (SCREENSHOT_MAP[p.id] ? Object.keys(SCREENSHOT_MAP[p.id]).length : 0) > 0,
  )

  /* Modal keyboard support + scroll lock */
  useEffect(() => {
    if (!activeShot) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight')
        setActiveIndex((i) => (i === null ? i : (i + 1) % filteredScreenshots.length))
      if (e.key === 'ArrowLeft')
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + filteredScreenshots.length) % filteredScreenshots.length,
        )
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [activeShot, filteredScreenshots.length])

  const productName = (id: string) => PRODUCTS_BY_ID[id]?.name || id
  const accent = (id: string) => PRODUCTS_BY_ID[id]?.accentColor || '#00f2fe'

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6" id="gallery">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WebGL Liquid Glass Refraction Stream</span>
          </p>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Real screens. Liquid glass optics.
          </h2>
          <p className="text-sm leading-relaxed text-white/60 sm:text-base">
            Interactive WebGL FlexCarousel displaying real Android hardware captures. Drag, scroll or swipe to bend the row through the liquid glass lens.
          </p>
        </div>
        <p className="text-sm text-white/50" aria-live="polite">
          Active stream:{' '}
          <span className="font-bold text-white">{carouselItems.length}</span> verified screens
        </p>
      </div>

      {/* Filters — one scrollable row on phones */}
      <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => setSelectedProduct('all')}
          aria-pressed={selectedProduct === 'all'}
          className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
            selectedProduct === 'all'
              ? 'bg-cyan-400 font-bold text-black'
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          All screens ({ordered.length})
        </button>
        {productsWithShots.map((prod) => {
          const count = Object.keys(SCREENSHOT_MAP[prod.id] || {}).length
          return (
            <button
              type="button"
              key={prod.id}
              onClick={() => setSelectedProduct(prod.id)}
              aria-pressed={selectedProduct === prod.id}
              className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                selectedProduct === prod.id
                  ? 'bg-white font-bold text-black'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: prod.accentColor }}
                aria-hidden="true"
              />
              <span>{prod.name}</span>
              <span className="opacity-60">({count})</span>
            </button>
          )
        })}
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
        <label htmlFor="gallery-search" className="sr-only">
          Filter screenshots by feature
        </label>
        <input
          id="gallery-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by feature — lyrics, equalizer, 4K…"
          className="min-h-11 w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-10 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/40 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* React Bits FlexCarousel — WebGL Liquid Glass Optical Refraction Carousel */}
      {carouselItems.length > 0 ? (
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/80 backdrop-blur-2xl shadow-2xl p-3 sm:p-5">
          {/* Preset Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Lens Preset:</span>
              {(['liquid', 'vortex', 'arch', 'ribbon'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCurrentPreset(preset)}
                  className={`px-3 py-1 text-xs rounded-full capitalize font-medium transition-all ${
                    currentPreset === preset
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'text-white/60 hover:text-white border border-transparent'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-cyan-400/80">
              <span>Scroll or drag horizontally • Click card to open</span>
            </div>
          </div>

          <div style={{ width: '100%', height: '560px', position: 'relative' }}>
            <FlexCarousel
              items={carouselItems}
              preset={currentPreset}
              intro="rise"
              cardHeight={0.52}
              gap={14}
              radius={16}
              squeeze={0.2}
              focusOnClick
              captions
              onSelect={(idx) => {
                if (filteredScreenshots[idx]) {
                  setActiveIndex(idx)
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="liquid-glass-panel flex flex-col items-center gap-3 px-6 py-16 text-center">
          <ImageOff className="h-8 w-8 text-white/35" aria-hidden="true" />
          <p className="text-base font-semibold text-white">
            No screens match {searchQuery ? `“${searchQuery}”` : 'this filter'}
          </p>
          <p className="max-w-sm text-sm text-white/55">
            Try a shorter keyword — for example “lyrics”, “player” or “offline”.
          </p>
          <GlassButton
            variant="secondary"
            className="!px-5 !py-2.5 !text-xs"
            onClick={() => {
              setSearchQuery('')
              setSelectedProduct('all')
            }}
          >
            Reset filters
          </GlassButton>
        </div>
      )}

      {/* Inspect dialog */}
      {activeShot && activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${productName(activeShot.product)} — ${activeShot.whatItShows}`}>
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setActiveIndex(null)} aria-hidden="true" />
          <div className="liquid-glass-panel relative z-10 max-h-[92vh] w-full max-w-xl overflow-y-auto p-4 sm:p-6 text-white border border-cyan-500/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {productName(activeShot.product)}
                </span>
                <h3 className="text-lg font-bold text-white sm:text-xl">{activeShot.whatItShows}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close dialog"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mx-auto aspect-[9/17] max-h-[62vh] overflow-hidden rounded-2xl bg-black">
              <img
                src={activeShot.assetPath}
                alt={activeShot.altText}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-4 text-xs text-white/70 sm:text-sm">{activeShot.altText}</p>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex gap-2">
                <GlassButton
                  variant="ghost"
                  className="!px-3 !py-1.5 !text-xs"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null ? i : (i - 1 + filteredScreenshots.length) % filteredScreenshots.length,
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </GlassButton>
                <GlassButton
                  variant="ghost"
                  className="!px-3 !py-1.5 !text-xs"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null ? i : (i - 1 + filteredScreenshots.length) % filteredScreenshots.length,
                    )
                  }
                >
                  Next <ChevronRight className="h-4 w-4" />
                </GlassButton>
              </div>

              <GlassButton
                variant="primary"
                className="!px-4 !py-1.5 !text-xs"
                onClick={() => {
                  setActiveIndex(null)
                  navigate(`/product/${activeShot.product}`)
                }}
                icon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                Go to Product
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
