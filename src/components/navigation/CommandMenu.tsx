import React, { useState, useEffect, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { ALL_VERIFIED_APKS } from '../../data/apks'
import { ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { Search, X, Download, ArrowRight, Layers } from 'lucide-react'
import { SafeImage } from '../common/SafeImage'
import { navigate } from '../../router'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')

  // Close on Escape or open on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filteredProducts = useMemo(() => {
    if (!query) return ALL_PRODUCTS
    const q = query.toLowerCase()
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  const filteredApks = useMemo(() => {
    if (!query) return ALL_VERIFIED_APKS.slice(0, 4)
    const q = query.toLowerCase()
    return ALL_VERIFIED_APKS.filter(
      (a) =>
        a.fileName.toLowerCase().includes(q) ||
        a.version.toLowerCase().includes(q) ||
        a.abi.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [query])

  const filteredScreenshots = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return ALL_AUDITED_SCREENSHOTS.filter(
      (s) =>
        s.whatItShows.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q) ||
        s.featureId.toLowerCase().includes(q)
    ).slice(0, 4)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Floating Command Box */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#080d1a]/90 shadow-2xl backdrop-blur-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-white/10 px-5 py-4">
          <Search className="h-5 w-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, features, APK binaries, or screenshots... (ESC to exit)"
            className="ml-3.5 flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-white/40 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Products Group */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              INIXA Products & Flagships
            </div>
            <div className="space-y-1">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`)
                    onClose()
                  }}
                  className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: p.accentColor }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                        {p.name}
                      </div>
                      <div className="text-xs text-white/50">{p.tagline}</div>
                    </div>
                  </div>
                  <span className="text-xs text-white/30 group-hover:text-cyan-400 flex items-center gap-1">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* APK Downloads Group */}
          {filteredApks.length > 0 && (
            <div>
              <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Direct APK Binaries
              </div>
              <div className="space-y-1">
                {filteredApks.map((apk, idx) => (
                  <a
                    key={idx}
                    href={apk.downloadPath}
                    download
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-white/10 text-white/80 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{apk.fileName}</span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
                        {apk.sizeFormatted}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40">{apk.abi}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots Group */}
          {filteredScreenshots.length > 0 && (
            <div>
              <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Live Device Screenshots
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredScreenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`/product/${shot.product}`)
                      onClose()
                    }}
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2 hover:border-cyan-400/40"
                  >
                    <SafeImage
                      src={shot.assetPath}
                      alt={shot.altText}
                      fallbackLabel={shot.whatItShows}
                      wrapperClassName="h-10 w-8 shrink-0 rounded"
                      className="h-full w-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <div className="truncate text-xs font-medium text-white">
                        {shot.whatItShows}
                      </div>
                      <div className="text-[10px] text-white/40">{shot.product}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
