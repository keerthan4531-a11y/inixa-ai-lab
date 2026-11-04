import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Product } from '../../types/product'
import { ProductIcon } from './ProductIcons'
import { navigate } from '../../router'
import {
  Download,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
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
  autoPlay?: boolean
}

export const ArcCarousel: React.FC<ArcCarouselProps> = ({ products, autoPlay = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([])

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1400
  )
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay)
  const [activeDotIndex, setActiveDotIndex] = useState(0)

  // Mutable refs for high-fps RAF loop (0 React re-renders per frame)
  const scrollOffsetRef = useRef(0)
  const targetOffsetRef = useRef(0)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const isAutoPlayRef = useRef(true)
  isAutoPlayRef.current = isAutoPlay

  const lastActiveDotIndexRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Card spacing & responsive sizing
  const isMobile = viewportWidth < 640
  const cardSpacing = isMobile ? 320 : 405

  // Generate virtual infinite array to wrap seamlessly across widescreen monitors
  const repeatCount = useMemo(() => {
    if (!products || products.length === 0) return 1
    return Math.max(3, Math.ceil(18 / products.length))
  }, [products])

  const virtualCards = useMemo(() => {
    if (!products || products.length === 0) return []
    return Array.from({ length: repeatCount }, (_, setIdx) =>
      products.map((product, prodIdx) => ({
        product,
        originalIndex: prodIdx,
        virtualKey: `${product.id}-s${setIdx}-i${prodIdx}`,
      }))
    ).flat()
  }, [products, repeatCount])

  // Continuous 60fps/120fps 3D Curved Cylindrical RAF Loop
  useEffect(() => {
    if (virtualCards.length === 0) return

    const totalItems = virtualCards.length
    const trackWidth = totalItems * cardSpacing
    const halfTrack = trackWidth / 2

    // Auto-scroll speed: cards move right-to-left (~0.95px per frame = ~57px/sec)
    const baseAutoSpeed = isMobile ? 0.75 : 0.95
    let lastTime = performance.now()

    const tick = (now: number) => {
      const delta = Math.min(32, now - lastTime)
      lastTime = now
      const frameScale = delta / 16.666

      if (!isDraggingRef.current) {
        // If user nudged with < or > button or clicked a side card: smooth lerp to target
        const offsetDiff = targetOffsetRef.current - scrollOffsetRef.current
        if (Math.abs(offsetDiff) > 0.4) {
          scrollOffsetRef.current += offsetDiff * 0.1 * frameScale
        } else {
          // Normal right-to-left auto-scroll
          if (!isHoveredRef.current && isAutoPlayRef.current) {
            scrollOffsetRef.current += baseAutoSpeed * frameScale
            targetOffsetRef.current = scrollOffsetRef.current
          }
        }
      }

      // Keep offset in positive modular range
      scrollOffsetRef.current = ((scrollOffsetRef.current % trackWidth) + trackWidth) % trackWidth
      targetOffsetRef.current = ((targetOffsetRef.current % trackWidth) + trackWidth) % trackWidth

      let closestDist = Infinity
      let closestProdIdx = 0

      // Update every card directly on the DOM for 120fps GPU performance
      for (let i = 0; i < totalItems; i++) {
        const el = cardElementsRef.current[i]
        if (!el) continue

        const baseX = i * cardSpacing
        let dist = (baseX - scrollOffsetRef.current) % trackWidth
        if (dist < 0) dist += trackWidth
        if (dist > halfTrack) dist -= trackWidth

        const absDist = Math.abs(dist)

        if (absDist < closestDist) {
          closestDist = absDist
          closestProdIdx = virtualCards[i].originalIndex
        }

        // Google Labs 3D Cylindrical Arc Transformations:
        // 1. rotateY: right cards curve towards left, left cards curve towards right
        const rotateY = -dist * 0.038

        // 2. translateZ: push into depth as distance from center increases
        const translateZ = -Math.pow(absDist / 340, 1.45) * 68

        // 3. translateY: subtle natural arc curvature
        const translateY = Math.pow(absDist / 480, 1.8) * 12

        // 4. scale: center card is 100%, sides gracefully scale down
        const scale = Math.max(0.74, 1 - absDist / 3300)

        // 5. opacity: fade cards at extreme screen edges
        const maxVisible = viewportWidth * 0.85 + cardSpacing
        const opacity =
          absDist > maxVisible
            ? Math.max(0, 1 - (absDist - maxVisible) / 260)
            : Math.max(0.2, 1 - Math.pow(absDist / (viewportWidth * 0.95), 2))

        // 6. z-index: center cards always overlay outer cards
        const zIndex = Math.max(1, Math.round(100 - absDist * 0.05))

        el.style.transform = `translateX(${dist}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
        el.style.zIndex = `${zIndex}`
        el.style.opacity = `${opacity}`
        // Keep all visible cards interactive wherever they are on the screen
        el.style.pointerEvents = absDist > (viewportWidth * 0.85 + cardSpacing) ? 'none' : 'auto'

        // Center card neon glow highlight
        const isCenter = absDist < cardSpacing * 0.45
        const brandColor =
          BRAND_COLORS[virtualCards[i].product.id] ||
          virtualCards[i].product.accentColor ||
          '#00ff87'

        if (isCenter) {
          el.style.boxShadow = `0 0 45px 3px ${brandColor}75, 0 30px 60px rgba(0, 0, 0, 0.85)`
          el.style.borderColor = brandColor
        } else {
          el.style.boxShadow = `0 0 20px -3px ${brandColor}35, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          el.style.borderColor = `${brandColor}65`
        }
      }

      // Update dot indicator only when centered card product changes
      if (closestProdIdx !== lastActiveDotIndexRef.current) {
        lastActiveDotIndexRef.current = closestProdIdx
        setActiveDotIndex(closestProdIdx)
      }

      animationFrameRef.current = requestAnimationFrame(tick)
    }

    animationFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [virtualCards, cardSpacing, viewportWidth, isMobile])

  // Nudge Controls (< and >)
  const handlePrev = useCallback(() => {
    targetOffsetRef.current -= cardSpacing
  }, [cardSpacing])

  const handleNext = useCallback(() => {
    targetOffsetRef.current += cardSpacing
  }, [cardSpacing])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Mouse / Touch Drag Scrubbing Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // If the click is on an action button or link, DO NOT start dragging!
    const target = e.target as HTMLElement | null
    if (target && target.closest('[data-carousel-action="true"], button, a')) {
      return
    }

    isDraggingRef.current = true
    hasDraggedRef.current = false
    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = scrollOffsetRef.current
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const diff = e.clientX - dragStartXRef.current
    if (Math.abs(diff) > 8) {
      hasDraggedRef.current = true
      // Dragging right moves cards right, dragging left advances
      scrollOffsetRef.current = dragStartOffsetRef.current - diff
      targetOffsetRef.current = scrollOffsetRef.current
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  // Guaranteed direct action trigger regardless of 3D rotation, movement, or browser hit-testing
  const handleInspectClick = (productId: string, e: React.SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    navigate(`/product/${productId}`)
  }

  const handleApkClick = (downloadPath: string, e: React.SyntheticEvent) => {
    e.stopPropagation()
    // Trigger download cleanly
    const a = document.createElement('a')
    a.href = downloadPath
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-16 text-center text-slate-400">
        No experiments or products found matching criteria.
      </div>
    )
  }

  return (
    <div
      className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-6 select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
    >
      {/* 3D Arc Stage Container - Full screen viewport with cylindrical perspective */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[620px] sm:h-[660px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{
          perspective: isMobile ? '1100px' : '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {virtualCards.map((item, index) => {
            const { product } = item
            const latestApk =
              product.apks && product.apks.length > 0
                ? product.apks[product.apks.length - 1]
                : null
            const brandColor = BRAND_COLORS[product.id] || product.accentColor || '#00ff87'

            return (
              <div
                key={item.virtualKey}
                ref={(el) => {
                  cardElementsRef.current[index] = el
                }}
                onMouseEnter={() => {
                  isHoveredRef.current = true
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false
                }}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    // Smoothly center this clicked card
                    const totalItems = virtualCards.length
                    const trackWidth = totalItems * cardSpacing
                    const halfTrack = trackWidth / 2
                    const baseX = index * cardSpacing
                    let dist = (baseX - scrollOffsetRef.current) % trackWidth
                    if (dist < 0) dist += trackWidth
                    if (dist > halfTrack) dist -= trackWidth
                    if (Math.abs(dist) > 30) {
                      targetOffsetRef.current = scrollOffsetRef.current + dist
                    }
                  }
                }}
                className="absolute w-[310px] sm:w-[370px] h-[535px] sm:h-[570px] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl overflow-hidden cursor-pointer will-change-transform select-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13, 20, 36, 0.88) 0%, rgba(7, 11, 22, 0.96) 100%)',
                  border: `1.5px solid ${brandColor}70`,
                  boxShadow: `0 0 20px -3px ${brandColor}35, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                {/* Soft Radial Gradient Highlight at Top-Right Corner */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-35"
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

                  {/* Title & 3D Neon Icon Row */}
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

                {/* Footer CTA Actions - Guaranteed instant click hit-target anywhere on screen */}
                <div
                  className="relative z-40 border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3 pointer-events-auto"
                  data-carousel-action="true"
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    data-carousel-action="true"
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onPointerUp={(e) => handleInspectClick(product.id, e)}
                    onClick={(e) => handleInspectClick(product.id, e)}
                    className="relative z-40 inline-flex items-center gap-1.5 px-3 py-2 -ml-1 rounded-xl text-xs font-bold text-white/95 hover:text-white hover:bg-white/15 active:scale-95 group/btn transition-all cursor-pointer pointer-events-auto select-none"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-white/90" />
                  </button>

                  {latestApk ? (
                    <button
                      type="button"
                      data-carousel-action="true"
                      onPointerDown={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onPointerUp={(e) => handleApkClick(latestApk.downloadPath, e)}
                      onClick={(e) => handleApkClick(latestApk.downloadPath, e)}
                      className="relative z-40 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-black transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto select-none shadow-[0_0_20px_rgba(0,255,135,0.45)] hover:shadow-[0_0_28px_rgba(0,255,135,0.7)]"
                      style={{
                        background: 'linear-gradient(135deg, #00ff87 0%, #00e5ff 100%)',
                      }}
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>APK ({latestApk.sizeFormatted || latestApk.fileSize || 'Verified'})</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-carousel-action="true"
                      onPointerDown={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onPointerUp={(e) => handleInspectClick(product.id, e)}
                      onClick={(e) => handleInspectClick(product.id, e)}
                      className="relative z-40 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-white/15 hover:bg-white/25 active:scale-95 transition-all cursor-pointer pointer-events-auto select-none"
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

      {/* Living Sketchbook Doodle Controls (< > and Play/Pause) centered at bottom */}
      <div className="flex flex-col items-center justify-center gap-3 mt-4">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous card"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#040a18] hover:bg-[#060e24] border-2 border-white text-white transition-all cursor-pointer active:scale-95 shadow-[3px_3px_0_#be185d] hover:shadow-[4px_4px_0_#00ff87]"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            type="button"
            onClick={() => setIsAutoPlay((prev) => !prev)}
            aria-label={isAutoPlay ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            title={isAutoPlay ? 'Auto-scroll is ON (Click to pause)' : 'Auto-scroll is OFF (Click to start)'}
            className={`w-11 h-11 rounded-full flex items-center justify-center border-2 border-white transition-all cursor-pointer active:scale-95 shadow-[3px_3px_0_#ffd23f] ${
              isAutoPlay
                ? 'bg-[#00ff87] text-[#020612] font-black'
                : 'bg-[#040a18] text-slate-300 hover:text-white'
            }`}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next card"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[#040a18] hover:bg-[#060e24] border-2 border-white text-white transition-all cursor-pointer active:scale-95 shadow-[3px_3px_0_#be185d] hover:shadow-[4px_4px_0_#00ff87]"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Minimal indicator dots for unique products */}
        <div className="flex items-center gap-2">
          {products.map((p, i) => {
            const pColor = BRAND_COLORS[p.id] || p.accentColor || '#00ff87'
            const isActive = activeDotIndex === i
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  // Find nearest virtual card matching this product index
                  const totalItems = virtualCards.length
                  const trackWidth = totalItems * cardSpacing
                  const halfTrack = trackWidth / 2
                  let closestI = 0
                  let minDiff = Infinity
                  for (let ci = 0; ci < totalItems; ci++) {
                    if (virtualCards[ci].originalIndex === i) {
                      const baseX = ci * cardSpacing
                      let d = (baseX - scrollOffsetRef.current) % trackWidth
                      if (d < 0) d += trackWidth
                      if (d > halfTrack) d -= trackWidth
                      if (Math.abs(d) < minDiff) {
                        minDiff = Math.abs(d)
                        closestI = ci
                      }
                    }
                  }
                  const baseX = closestI * cardSpacing
                  let d = (baseX - scrollOffsetRef.current) % trackWidth
                  if (d < 0) d += trackWidth
                  if (d > halfTrack) d -= trackWidth
                  targetOffsetRef.current = scrollOffsetRef.current + d
                }}
                className={`transition-all duration-200 cursor-pointer rounded-full ${
                  isActive
                    ? 'w-7 h-2.5 rounded-full border border-white shadow-[2px_2px_0_#be185d]'
                    : 'w-2.5 h-2.5 rounded-full border border-white/40 hover:border-white'
                }`}
                style={{
                  backgroundColor: isActive ? pColor : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Go to ${p.name}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
