import React, { useState, useEffect, useMemo } from 'react'
import { ALL_PRODUCTS } from '../../data/products'
import { ALL_VERIFIED_APKS } from '../../data/apks'
import { ALL_AUDITED_SCREENSHOTS } from '../../data/screenshotMap'
import { X, Download, ArrowRight, Sparkles, Smartphone, Terminal, Layers } from 'lucide-react'
import { SafeImage } from '../common/SafeImage'
import { DetectiveCatIcon } from '../doodle/DetectiveCatIcon'
import { DoodleCat } from '../doodle/DoodleCat'
import { DoodleIcon } from '../footer/DoodleCrewFooter'
import { navigate } from '../../router'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')

  // Close on Escape or toggle on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
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
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:pt-16">
      {/* Living Doodle Scrollbar Styles */}
      <style>{`
        .doodle-search-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .doodle-search-scroll::-webkit-scrollbar-track {
          background: #020612;
          border-radius: 999px;
        }
        .doodle-search-scroll::-webkit-scrollbar-thumb {
          background: #00ff87;
          border-radius: 999px;
          border: 1px solid #ffffff;
        }
      `}</style>

      {/* Dim Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Floating Living Sketchbook Command Box */}
      <div className="relative w-full max-w-2xl overflow-visible rounded-[28px] border-2 border-white bg-[#040a18] shadow-[8px_8px_0_#be185d] animate-in fade-in zoom-in-95 duration-200 z-10">
        {/* Peeking Doodle Cat on Top Left of Modal */}
        <div className="absolute -top-11 left-6 z-20 pointer-events-auto">
          <DoodleCat
            pose="peeking"
            size={52}
            speech="Detective Cat on duty! 🐾"
            speechAlign="top"
          />
        </div>

        {/* Top Tagline Strip */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10 text-xs font-mono font-bold text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
            <span className="text-[#00ff87] font-black uppercase tracking-wider text-[11px]">
              INIXA LABS DISPATCH SEARCH
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#060e24] border border-white/30 text-[10px] text-white font-mono">
              ESC
            </span>
            <span>to close</span>
          </div>
        </div>

        {/* Search Input Bar with Bhoothakannadi Detective Cat */}
        <div className="flex items-center px-4 py-3.5 bg-[#060e24]/70 border-b-2 border-white/15">
          {/* Hand-drawn Cat with Bhoothakannadi (Magnifying Glass) */}
          <DetectiveCatIcon size={46} className="mr-2" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, features, APK binaries, or screens..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-neutral-400 font-medium outline-none"
            autoFocus
          />

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#040a18] border border-white/30 text-[10px] font-mono font-bold text-neutral-300">
              <DoodleIcon kind="sparkle" size={10} />
              <span>9 Apps • 15 APKs</span>
            </div>
          )}
        </div>

        {/* Scrollable Results List (Ugly white scrollbar removed!) */}
        <div className="doodle-search-scroll max-h-[58vh] overflow-y-auto p-4 space-y-5">
          {/* Products Group */}
          <div>
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-[#00ff87] flex items-center gap-1.5">
                <DoodleIcon kind="bolt" size={12} />
                <span>INIXA Products &amp; Flagships ({filteredProducts.length})</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400">Click to inspect</span>
            </div>

            <div className="space-y-1.5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`)
                    onClose()
                  }}
                  className="group flex cursor-pointer items-center justify-between rounded-2xl p-3 bg-[#060e24] border border-white/20 hover:border-white hover:bg-[#0a1638] hover:shadow-[3px_3px_0_#00ff87] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-white"
                      style={{
                        backgroundColor: p.accentColor || '#00ff87',
                        boxShadow: `0 0 8px ${p.accentColor || '#00ff87'}`,
                      }}
                    />
                    <div>
                      <div className="text-sm font-black text-white group-hover:text-[#00ff87] transition-colors flex items-center gap-2">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-full bg-[#020612] border border-white/30 text-neutral-300">
                          {p.version || p.badge}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-300 font-medium line-clamp-1">
                        {p.tagline}
                      </div>
                    </div>
                  </div>

                  <span className="doodle-btn doodle-btn-outline px-3 py-1 text-[11px] font-black group-hover:bg-[#00ff87] group-hover:text-[#020612] transition-all">
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* APK Downloads Group */}
          {filteredApks.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-[#ffd23f] flex items-center gap-1.5">
                  <DoodleIcon kind="star" size={12} />
                  <span>Direct Cryptographic APKs</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">100% Offline</span>
              </div>

              <div className="space-y-1.5">
                {filteredApks.map((apk, idx) => (
                  <a
                    key={idx}
                    href={apk.downloadPath}
                    download
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 bg-[#060e24] border border-white/20 hover:border-[#ffd23f] hover:bg-[#0a1638] text-xs font-bold text-white transition-all shadow-[2px_2px_0_#be185d]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="h-4 w-4 text-[#00ff87] shrink-0" />
                      <span className="font-mono">{apk.fileName}</span>
                      <span className="rounded-full bg-[#020612] border border-white/30 px-2 py-0.5 text-[10px] font-mono text-[#00ff87]">
                        {apk.sizeFormatted || apk.fileSize}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">
                      {apk.abi}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Live Device Screenshots Group */}
          {filteredScreenshots.length > 0 && (
            <div>
              <div className="px-2 pb-2 text-[11px] font-mono font-black uppercase tracking-wider text-[#be185d] flex items-center gap-1.5">
                <DoodleIcon kind="flame" size={12} />
                <span>Live Hardware Captures ({filteredScreenshots.length})</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {filteredScreenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`/product/${shot.product}`)
                      onClose()
                    }}
                    className="flex cursor-pointer items-center gap-2.5 rounded-2xl border-2 border-white/25 bg-[#060e24] p-2 hover:border-white hover:shadow-[3px_3px_0_#be185d] transition-all"
                  >
                    <SafeImage
                      src={shot.assetPath}
                      alt={shot.altText}
                      fallbackLabel={shot.whatItShows}
                      wrapperClassName="h-12 w-10 shrink-0 rounded-xl overflow-hidden border border-white/40"
                      className="h-full w-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <div className="truncate text-xs font-bold text-white">
                        {shot.whatItShows}
                      </div>
                      <div className="text-[10px] font-mono text-[#00ff87] font-semibold">
                        {shot.product}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Quick Shortcuts */}
        <div className="flex items-center justify-between px-5 py-3 border-t-2 border-dashed border-white/15 bg-[#020612]/90 rounded-b-[26px] text-[11px] font-mono font-bold text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#060e24] border border-white/30 text-white text-[10px]">
                ↑↓
              </kbd>{' '}
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#060e24] border border-white/30 text-white text-[10px]">
                ↵
              </kbd>{' '}
              select
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              navigate('/products')
              onClose()
            }}
            className="text-[#00ff87] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All 9 Flagships</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
