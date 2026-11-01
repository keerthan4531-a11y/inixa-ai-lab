import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Product } from '../../types/product'
import { ProductIcon } from './ProductIcons'
import { navigate } from '../../router'
import {
  Download,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Precision neon brand colors matching the screenshot mockup
const BRAND_COLORS: Record<string, string> = {
  'beatbox-pro': '#FF7A1A', // Warm glowing amber/orange
  'beatbox-lite': '#00D2FF', // Electric sky cyan
  'beatbox-ultra': '#00FF87', // Neon mint emerald
  'mytube': '#FF2A55', // Crimson / Coral pink
  'lumina': '#00B4D8', // Electric cyber cyan-blue
  'liquid-stream': '#A855F7', // Royal purple / violet
  'clipster': '#10B981', // Emerald green
  'wikipedia-app': '#3B82F6', // Azure blue
  'inixa-ai': '#D946EF', // Cyber magenta
}

interface ArcCarouselProps {
  products: Product[]
}

export const ArcCarousel: React.FC<ArcCarouselProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Reset index if filtered products change
  useEffect(() => {
    setActiveIndex(0)
  }, [products.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(products.length - 1, prev + 1))
  }, [products.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const diff = e.clientX - dragStartX.current
    setDragOffset(diff)
  }

  const handlePointerUp = () => {
    if (dragStartX.current !== null) {
      if (dragOffset < -55) handleNext()
      else if (dragOffset > 55) handlePrev()
    }
    dragStartX.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  return (
    <div className="w-full relative py-4 select-none">
      {/* 3D Arc Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[610px] sm:h-[640px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {products.map((product, index) => {
            const latestApk =
              product.apks && product.apks.length > 0
                ? product.apks[product.apks.length - 1]
                : null
            const brandColor = BRAND_COLORS[product.id] || product.accentColor || '#00ff87'

            const offset = index - activeIndex
            const absOffset = Math.abs(offset)
            const isCenter = offset === 0

            // 3D Arc Curve Equation (Google Labs Cylinder curvature)
            const cardSpacing = 415
            const translateX = offset * cardSpacing + (isDragging ? dragOffset * 0.8 : 0)
            const translateZ = -Math.pow(absOffset, 1.35) * 80
            const rotateY = -offset * 14.5
            const scale = Math.max(0.74, 1 - absOffset * 0.075)
            const opacity = absOffset > 3 ? 0 : Math.max(0.25, 1 - absOffset * 0.2)
            const zIndex = 30 - absOffset * 5

            return (
              <div
                key={product.id}
                onClick={() => {
                  if (!isCenter && !isDragging) {
                    setActiveIndex(index)
                  }
                }}
                className={`absolute w-[330px] sm:w-[380px] h-[550px] sm:h-[575px] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl transition-all duration-500 ease-out overflow-hidden ${
                  isCenter ? 'cursor-default ring-1 ring-white/20' : 'cursor-pointer hover:brightness-110'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity: absOffset > 3 ? 0 : opacity,
                  pointerEvents: absOffset > 2 ? 'none' : 'auto',
                  background:
                    'linear-gradient(135deg, rgba(13, 20, 36, 0.78) 0%, rgba(7, 11, 22, 0.92) 100%)',
                  border: `1.5px solid ${isCenter ? brandColor : `${brandColor}80`}`,
                  boxShadow: isCenter
                    ? `0 0 38px 2px ${brandColor}65, 0 25px 50px rgba(0, 0, 0, 0.8)`
                    : `0 0 24px -4px ${brandColor}38, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                {/* Soft Radial Gradient Highlight at Top-Right Corner */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-35 transition-opacity"
                  style={{ backgroundColor: brandColor }}
                />

                <div className="relative z-10">
                  {/* Top Meta: Pill Badge on Left, Version on Right */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase border backdrop-blur-md"
                      style={{
                        backgroundColor: `${brandColor}18`,
                        borderColor: `${brandColor}40`,
                        color: brandColor,
                      }}
                    >
                      <span>{product.badge}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          backgroundColor: brandColor,
                          boxShadow: `0 0 8px ${brandColor}`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400/90">
                      {product.version}
                    </span>
                  </div>

                  {/* Title & Modern 3D Neon Icon Row */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-none">
                      {product.name}
                    </h3>
                    <ProductIcon productId={product.id} color={brandColor} />
                  </div>

                  {/* Subtitle / Tagline */}
                  <p
                    className="text-xs font-semibold mb-3 tracking-wide"
                    style={{ color: brandColor }}
                  >
                    {product.tagline}
                  </p>

                  {/* Paragraph Description */}
                  <p className="text-xs text-slate-300/80 leading-relaxed mb-5 line-clamp-3 font-normal">
                    {product.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-4 border-t border-white/[0.08] pt-4">
                    {product.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200/90">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: brandColor }}
                        />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA Actions */}
                <div className="relative z-10 border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/product/${product.id}`)
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white group/btn transition-colors cursor-pointer"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-white/80" />
                  </button>

                  {latestApk ? (
                    <a
                      href={latestApk.downloadPath}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.45)] hover:shadow-[0_0_28px_rgba(0,255,135,0.65)]"
                      style={{
                        background: 'linear-gradient(135deg, #00ff87 0%, #00e5ff 100%)',
                      }}
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>APK ({latestApk.sizeFormatted || latestApk.fileSize || 'Verified'})</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${product.id}`)
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <span>Web Service</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Google Labs Style Side-by-Side Circular Navigation Buttons < > */}
      <div className="flex flex-col items-center justify-center gap-3 mt-4">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous card"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer backdrop-blur-md active:scale-90 shadow-lg hover:border-white/40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === products.length - 1}
            aria-label="Next card"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer backdrop-blur-md active:scale-90 shadow-lg hover:border-white/40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Minimal indicator dots */}
        <div className="flex items-center gap-1.5">
          {products.map((p, i) => {
            const pColor = BRAND_COLORS[p.id] || p.accentColor || '#00ff87'
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to ${p.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-6 shadow-[0_0_8px_currentColor]'
                    : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
                style={{
                  backgroundColor: activeIndex === i ? pColor : undefined,
                  color: pColor,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
