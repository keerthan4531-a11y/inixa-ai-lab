"use client"

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { motion } from "motion/react"
import { Rewind, FastForward, Activity, Sparkles, Play, Pause } from "lucide-react"

export interface RulerCarouselItem {
  id: number | string
  title: string
  subtitle?: string
  badge?: string
  spec?: string
}

export const DEFAULT_TECH_PILLARS: RulerCarouselItem[] = [
  {
    id: 1,
    title: "Android 15 Ready",
    subtitle: "API 35 Edge-to-Edge",
    badge: "CORE RUNTIME",
    spec: "Predictive back gestures, 16KB memory page size alignment & native HDR surfaces.",
  },
  {
    id: 2,
    title: "Jetpack Compose Multiplatform",
    subtitle: "100% Declarative UI",
    badge: "COMPOSE ARCHITECTURE",
    spec: "Hardware-accelerated Skiko shaders, reactive state hoisting & fluid micro-interactions.",
  },
  {
    id: 3,
    title: "Three.js WebGL 2.0",
    subtitle: "Spatial 3D Pipelines",
    badge: "GRAPHICS SHADER",
    spec: "Physically-based rendering, dynamic normal maps & custom fragment caustics at 60+ FPS.",
  },
  {
    id: 4,
    title: "ExoPlayer High Fidelity",
    subtitle: "Bit-Perfect Audio Engine",
    badge: "ALSA DIRECT DAC",
    spec: "32-bit floating-point audio pipeline bypassing OS mixers with direct USB DAC routing.",
  },
  {
    id: 5,
    title: "Liquid Glass Refraction",
    subtitle: "Real-time Dispersion",
    badge: "SURFACE DESIGN",
    spec: "Dynamic chromatic aberration, specular highlights & multi-layer backdrop blurs via Haze.",
  },
  {
    id: 6,
    title: "Zero Trackers / 100% Local",
    subtitle: "Air-Gapped Privacy",
    badge: "HARDENED SECURITY",
    spec: "0 analytics libraries, zero background beacons, strictly local offline-first execution.",
  },
  {
    id: 7,
    title: "60fps Physics Tweens",
    subtitle: "Inertial Spring Damping",
    badge: "MOTION SYSTEM",
    spec: "Kinetic scroll-velocity tracking, custom spring damping curves & zero frame drops.",
  },
  {
    id: 8,
    title: "Edge Neural Synthesis",
    subtitle: "Autonomous Agent Sandbox",
    badge: "LOCAL AI PROTOCOL",
    spec: "Private on-device GGUF / ONNX weights executed directly on physical NPU / GPU cores.",
  },
  {
    id: 9,
    title: "Kotlin 2.1 Native",
    subtitle: "Zero JNI Overhead",
    badge: "NATIVE COMPILATION",
    spec: "Low-latency coroutines, zero garbage-collection pauses in critical audio pipelines.",
  },
  {
    id: 10,
    title: "ColorOS & OneUI Tuned",
    subtitle: "OEM Flagship Calibrated",
    badge: "DEVICE OPTIMIZATION",
    spec: "Aquamorphic depth layers, Snapdragon 8 Elite high-refresh schedules & haptic drivers.",
  },
]

interface RulerLinesProps {
  top?: boolean
  totalLines?: number
  accentColor?: string
  compact?: boolean
}

const RulerLines: React.FC<RulerLinesProps> = ({
  top = true,
  totalLines = 81,
  accentColor = "#00ff87",
  compact = false,
}) => {
  const lines = useMemo(() => {
    const list = []
    const lineSpacing = 100 / (totalLines - 1)
    const centerIndex = Math.floor(totalLines / 2)

    for (let i = 0; i < totalLines; i++) {
      const isCenter = i === centerIndex
      const isFifth = i % 5 === 0
      const isTenth = i % 10 === 0

      let height = compact ? "h-1.5" : "h-2.5"
      let colorClass = "bg-white/15"
      let style: React.CSSProperties = {}

      if (isCenter) {
        height = compact ? "h-6" : "h-8"
        colorClass = ""
        style = {
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${accentColor}`,
          width: "2.5px",
        }
      } else if (isTenth) {
        height = compact ? "h-3.5" : "h-5"
        colorClass = "bg-white/45"
      } else if (isFifth) {
        height = compact ? "h-2.5" : "h-3.5"
        colorClass = "bg-white/25"
      }

      const positionClass = top ? "top-0" : "bottom-0"

      list.push(
        <div
          key={i}
          className={`absolute w-[1.5px] rounded-full transition-colors ${height} ${colorClass} ${positionClass}`}
          style={{
            left: `${i * lineSpacing}%`,
            transform: "translateX(-50%)",
            ...style,
          }}
        />
      )
    }
    return list
  }, [totalLines, top, accentColor, compact])

  const containerHeight = compact ? "h-6" : "h-8"

  return (
    <div className={`relative w-full ${containerHeight} px-4 pointer-events-none select-none`}>
      {lines}
    </div>
  )
}

export interface RulerCarouselProps {
  originalItems?: RulerCarouselItem[]
  className?: string
  accentColor?: string
  secondaryColor?: string
  compact?: boolean
  showHeader?: boolean
  autoScroll?: boolean
  autoScrollInterval?: number
  pauseOnHover?: boolean
}

export const RulerCarousel: React.FC<RulerCarouselProps> = ({
  originalItems = DEFAULT_TECH_PILLARS,
  className = "",
  accentColor = "#00ff87",
  secondaryColor = "#be185d",
  compact = false,
  showHeader = true,
  autoScroll = true,
  autoScrollInterval = 2500,
  pauseOnHover = true,
}) => {
  const itemsPerSet = originalItems.length

  // Triplicate the array for seamless infinite looping
  const infiniteItems = useMemo(() => {
    const items: Array<RulerCarouselItem & { uniqueKey: string; originalIndex: number }> = []
    for (let set = 0; set < 3; set++) {
      originalItems.forEach((item, index) => {
        items.push({
          ...item,
          uniqueKey: `${set}-${item.id}-${index}`,
          originalIndex: index,
        })
      })
    }
    return items
  }, [originalItems])

  const initialIndex = itemsPerSet + 0
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isResetting, setIsResetting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoScroll)

  // Carousel layout metrics — dynamically scaled when compact
  const ITEM_WIDTH = compact ? 320 : 440
  const GAP = compact ? 40 : 80
  const STRIDE = ITEM_WIDTH + GAP

  // Precise mathematical centering:
  const targetX = -(activeIndex * STRIDE + ITEM_WIDTH / 2)

  // Current active item metadata
  const currentOriginalIndex = activeIndex % itemsPerSet
  const currentItem = originalItems[currentOriginalIndex] || originalItems[0]

  const handleItemClick = useCallback(
    (clickedIndex: number) => {
      if (isResetting) return

      const targetOriginalIndex = clickedIndex % itemsPerSet
      const possibleIndices = [
        targetOriginalIndex,
        targetOriginalIndex + itemsPerSet,
        targetOriginalIndex + itemsPerSet * 2,
      ]

      let closestIndex = possibleIndices[0]
      let smallestDistance = Math.abs(possibleIndices[0] - activeIndex)

      for (const idx of possibleIndices) {
        const distance = Math.abs(idx - activeIndex)
        if (distance < smallestDistance) {
          smallestDistance = distance
          closestIndex = idx
        }
      }

      setActiveIndex(closestIndex)
    },
    [activeIndex, isResetting, itemsPerSet]
  )

  const handlePrevious = useCallback(() => {
    if (isResetting) return
    setActiveIndex((prev) => prev - 1)
  }, [isResetting])

  const handleNext = useCallback(() => {
    if (isResetting) return
    setActiveIndex((prev) => prev + 1)
  }, [isResetting])

  // Continuous auto-scroll timer
  useEffect(() => {
    if (!isPlaying || isResetting || (pauseOnHover && isHovered)) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1)
    }, autoScrollInterval)

    return () => clearInterval(timer)
  }, [isPlaying, isResetting, pauseOnHover, isHovered, autoScrollInterval])

  // Infinite wrapping bounds checking
  useEffect(() => {
    if (isResetting) return

    if (activeIndex < itemsPerSet) {
      setIsResetting(true)
      const timer = setTimeout(() => {
        setActiveIndex((curr) => curr + itemsPerSet)
        setIsResetting(false)
      }, 20)
      return () => clearTimeout(timer)
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true)
      const timer = setTimeout(() => {
        setActiveIndex((curr) => curr - itemsPerSet)
        setIsResetting(false)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [activeIndex, itemsPerSet, isResetting])

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isResetting) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setActiveIndex((prev) => prev - 1)
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        setActiveIndex((prev) => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isResetting])

  const currentPage = currentOriginalIndex + 1
  const totalPages = itemsPerSet

  return (
    <div
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center text-white select-none ${
        compact ? "py-4 sm:py-6" : "py-20"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive Ruler Carousel"
    >
      {/* Ambient background glow behind the ruler slider */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-25"
        style={{
          width: compact ? "450px" : "700px",
          height: compact ? "200px" : "350px",
          background: `radial-gradient(circle, ${accentColor} 0%, ${secondaryColor} 70%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Optional Header Badge & Title */}
      {showHeader && (
        <div className="relative z-10 mb-3 text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-950/70 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-emerald-300 shadow-[0_0_20px_rgba(0,255,135,0.18)] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] animate-ping" />
            <Activity className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>INIXA LABS BENCHMARK • 10 NATIVE PILLARS</span>
          </div>
          <h3
            className={`font-black tracking-tight text-white mt-2 ${
              compact ? "text-xl sm:text-3xl" : "text-2xl sm:text-4xl md:text-5xl"
            }`}
          >
            Precision Architecture &amp;{" "}
            <span className="bg-gradient-to-r from-[#00ff87] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
              Runtime Stream
            </span>
          </h3>
        </div>
      )}

      {/* Main Ruler Carousel Container */}
      <div
        className={`w-full max-w-5xl flex flex-col justify-center relative ${
          compact ? "my-2" : "my-6"
        }`}
      >
        {/* Top Ruler Indicator */}
        <div className="flex items-center justify-center relative">
          <RulerLines top totalLines={81} accentColor={accentColor} compact={compact} />
          {/* Center tick neon marker */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full pointer-events-none"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
        </div>

        {/* Center Sliding Text Track with Motion Physics */}
        <div
          className={`flex items-center justify-center w-full relative overflow-hidden ${
            compact ? "h-[110px] sm:h-[130px]" : "h-[180px] sm:h-[220px]"
          }`}
        >
          {/* Subtle edge fades for infinite depth */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#020612] via-[#020612]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#020612] via-[#020612]/80 to-transparent z-10" />

          {/* Center Precision Target Guidelines */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 z-20 opacity-30"
            style={{
              background: `linear-gradient(to bottom, ${accentColor}, transparent 40%, transparent 60%, ${accentColor})`,
            }}
          />

          <motion.div
            className="flex items-center"
            style={{
              position: "absolute",
              left: "50%",
              gap: `${GAP}px`,
            }}
            animate={{
              x: targetX,
            }}
            transition={
              isResetting
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                    mass: 0.8,
                  }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <motion.button
                  key={item.uniqueKey}
                  type="button"
                  onClick={() => handleItemClick(index)}
                  className={`group relative text-center flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 p-0 transition-colors duration-200 outline-none select-none ${
                    isActive ? "text-white" : "text-white/35 hover:text-white/65"
                  }`}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 380,
                          damping: 26,
                        }
                  }
                  style={{
                    width: `${ITEM_WIDTH}px`,
                  }}
                >
                  {/* Active Pillar Pill Badge */}
                  {item.badge && (
                    <span
                      className={`mb-1.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-emerald-400/50 bg-emerald-950/80 text-emerald-300 shadow-[0_0_12px_rgba(0,255,135,0.25)]"
                          : "border-transparent bg-transparent text-white/20"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Main Title */}
                  <h4
                    className={`font-black tracking-tight whitespace-nowrap transition-all duration-300 ${
                      compact
                        ? "text-xl sm:text-2xl md:text-3xl"
                        : "text-2xl sm:text-4xl md:text-5xl"
                    } ${
                      isActive
                        ? "text-transparent bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text drop-shadow-[0_4px_20px_rgba(0,255,135,0.35)]"
                        : "text-white/40"
                    }`}
                  >
                    {item.title}
                  </h4>

                  {/* Active Subtitle Spec */}
                  {item.subtitle && (
                    <span
                      className={`mt-1 text-xs font-semibold tracking-wide transition-opacity duration-300 ${
                        isActive ? "text-pink-400 opacity-95" : "text-white/20 opacity-0"
                      }`}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Ruler Indicator */}
        <div className="flex items-center justify-center relative">
          <RulerLines top={false} totalLines={81} accentColor={accentColor} compact={compact} />
          {/* Bottom tick neon marker */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full pointer-events-none"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
        </div>
      </div>

      {/* Active Pillar Detailed Spec Callout Card */}
      {currentItem.spec && (
        <div
          className={`relative z-10 max-w-lg mx-auto px-4 py-2 rounded-xl border border-white/10 bg-[#040a18]/90 backdrop-blur-xl shadow-lg text-center transition-all duration-300 ${
            compact ? "mb-2" : "mb-4"
          }`}
        >
          <div className="text-[11px] sm:text-xs leading-relaxed text-white/75 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00ff87]" />
            <span>{currentItem.spec}</span>
          </div>
        </div>
      )}

      {/* Compact Control Bar: Rewind, Page Indicator, Play/Pause, FastForward */}
      <div
        className={`flex items-center justify-center gap-4 relative z-10 ${
          compact ? "mt-1" : "mt-4"
        }`}
      >
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isResetting}
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(190,24,93,0.3)] active:scale-95 cursor-pointer disabled:opacity-40"
          aria-label="Previous tech pillar"
          title="Previous Pillar (Arrow Left)"
        >
          <Rewind className="w-4 h-4 text-white/80 transition-colors group-hover:text-pink-400" />
        </button>

        {/* Page Counter & Progress Indicator */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#040a18]/80 backdrop-blur-md">
          <span className="text-xs font-mono font-bold text-[#00ff87]">
            {String(currentPage).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono text-white/30">/</span>
          <span className="text-xs font-mono font-medium text-white/60">
            {String(totalPages).padStart(2, "0")}
          </span>

          {/* Mini progress dots */}
          <div className="hidden sm:flex items-center gap-1 ml-1.5 border-l border-white/10 pl-2">
            {originalItems.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === currentOriginalIndex
                    ? "w-3 bg-[#00ff87]"
                    : "w-1 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Auto-scroll active indicator */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-1 flex items-center gap-1 text-[9px] font-mono text-emerald-400/80 hover:text-emerald-300 transition-colors cursor-pointer"
            title={isPlaying ? "Pause Auto-scroll" : "Resume Auto-scroll"}
          >
            {isPlaying ? (
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                <span className="text-[8px] uppercase tracking-wider text-emerald-300">AUTO</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-white/40">
                <Play className="w-2.5 h-2.5" />
                <span className="text-[8px] uppercase tracking-wider">PAUSED</span>
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isResetting}
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(0,255,135,0.3)] active:scale-95 cursor-pointer disabled:opacity-40"
          aria-label="Next tech pillar"
          title="Next Pillar (Arrow Right)"
        >
          <FastForward className="w-4 h-4 text-white/80 transition-colors group-hover:text-[#00ff87]" />
        </button>
      </div>
    </div>
  )
}

export default RulerCarousel
