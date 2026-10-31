import React, { useEffect, useMemo, useState } from 'react'
import { ALL_AUDITED_SCREENSHOTS, SCREENSHOT_MAP, ScreenshotMeta } from '../../data/screenshotMap'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from '../../data/products'
import { SafeImage } from '../../components/common/SafeImage'
import { GlassButton } from '../../components/common/GlassButton'
import { Search, X, Maximize2, ExternalLink, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { navigate } from '../../router'

const PAGE_SIZE = 12

/**
 * Round-robin across products (BearBox 1, BeatBox Pro 1, …) so the first
 * screenful shows the whole ecosystem. The registry order starts with 11
 * near-identical INIXA AI chat screens, which is why the old wall looked
 * like one app repeated — plus every broken <img> printed its alt text.
 * SafeImage now guarantees a card can never render as raw alt text.
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
  const [expanded, setExpanded] = useState(false)
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
    setExpanded(false)
    setActiveIndex(null)
  }, [selectedProduct, searchQuery])

  const visible = expanded ? filteredScreenshots : filteredScreenshots.slice(0, PAGE_SIZE)
  const activeShot = activeIndex !== null ? filteredScreenshots[activeIndex] : undefined
  const productsWithShots = ALL_PRODUCTS.filter(
    (p) => (SCREENSHOT_MAP[p.id] ? Object.keys(SCREENSHOT_MAP[p.id]).length : 0) > 0,
  )

  /* Modal keyboard support + scroll lock (ESC/arrows did nothing before). */
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
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
            Verified pixels · Direct from hardware
          </p>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Real screens. Real devices.
          </h2>
          <p className="text-sm leading-relaxed text-white/60 sm:text-base">
            No mockups and no placeholders — unedited captures from physical Android hardware.
            Tap any screen to inspect it up close.
          </p>
        </div>
        <p className="text-sm text-white/50" aria-live="polite">
          Showing{' '}
          <span className="font-bold text-white">{visible.length}</span> of{' '}
          <span className="font-bold text-white">{filteredScreenshots.length}</span> screens
        </p>
      </div>

      {/* Filters — one scrollable row on phones instead of a 3-line pill pile */}
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

      {/* Straight, readable cards — no perspective wall, no tilt-on-every-card */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((shot) => {
            const shotIndex = filteredScreenshots.indexOf(shot)
            return (
              <button
                type="button"
                key={`${shot.product}-${shot.featureId}`}
                onClick={() => setActiveIndex(shotIndex)}
                className="liquid-glass-card group cursor-pointer p-2 text-left transition-transform duration-300 hover:-translate-y-1"
                aria-label={`Inspect ${productName(shot.product)} — ${shot.whatItShows}`}
              >
                <span className="relative z-10 block">
                  <span className="relative block aspect-[9/17] overflow-hidden rounded-[20px] bg-black/60">
                    <SafeImage
                      src={shot.assetPath}
                      alt={shot.altText}
                      fallbackLabel={productName(shot.product)}
                      accentColor={accent(shot.product)}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/85 to-transparent p-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" /> Inspect
                      </span>
                    </span>
                  </span>
                  <span className="block px-2 py-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/55">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: accent(shot.product) }}
                        aria-hidden="true"
                      />
                      {productName(shot.product)}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {shot.whatItShows}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
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

      {filteredScreenshots.length > PAGE_SIZE && (
        <div className="mt-10 text-center">
          <GlassButton variant="secondary" className="!px-6 !py-3 !text-sm" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show less' : `Show all ${filteredScreenshots.length} screens`}
          </GlassButton>
        </div>
      )}

      {/* Inspect dialog */}
      {activeShot && activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${productName(activeShot.product)} — ${activeShot.whatItShows}`}>
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setActiveIndex(null)} aria-hidden="true" />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col items-center gap-6 overflow-y-auto rounded-3xl border border-white/20 bg-[#080d1a] p-6 shadow-2xl md:flex-row">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() =>
                  setActiveIndex((activeIndex - 1 + filteredScreenshots.length) % filteredScreenshots.length)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="relative aspect-[9/19] max-h-[70vh] w-[240px] overflow-hidden rounded-2xl border border-white/20 bg-black shadow-xl sm:w-[270px]">
                <SafeImage
                  src={activeShot.assetPath}
                  alt={activeShot.altText}
                  fallbackLabel={productName(activeShot.product)}
                  accentColor={accent(activeShot.product)}
                  eager
                  className="h-full w-full object-contain"
                />
              </div>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => setActiveIndex((activeIndex + 1) % filteredScreenshots.length)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent(activeShot.product) }}>
                {productName(activeShot.product)}
                <span className="ml-2 font-mono font-normal text-white/40">
                  {activeIndex + 1} / {filteredScreenshots.length}
                </span>
              </p>
              <h3 className="mb-3 text-2xl font-bold text-white">{activeShot.whatItShows}</h3>
              <p className="mb-7 text-sm leading-relaxed text-white/65">{activeShot.altText}</p>
              <GlassButton
                variant="primary"
                className="!px-5 !py-2.5 !text-sm"
                icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                onClick={() => {
                  /* Was /products/:id — no such route; that landed on the 404 page. */
                  navigate(`/product/${activeShot.product}`)
                  setActiveIndex(null)
                }}
              >
                View {productName(activeShot.product)}
              </GlassButton>
              <p className="mt-5 hidden text-xs text-white/35 md:block">← → to browse · Esc to close</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
