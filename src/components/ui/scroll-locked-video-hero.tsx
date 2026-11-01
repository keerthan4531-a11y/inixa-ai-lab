"use client"

import React, { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// INIXA LABS — Locked Scroll-Scrub Video Hero
// The page cannot move while this is active — body is pinned
// with position:fixed. Wheel/touch input is captured and used
// purely to drive video.currentTime forward and backward. Once
// the train arrives and the doors slide open, the cinematic
// INIXA Wolf & Moon video is revealed, and the page unlocks
// smoothly into the flagship software catalog.
// ─────────────────────────────────────────────────────────────

export interface MetroHeroProps {
  videoSrc?: string
  wolfVideoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
  onUnlock?: () => void
}

const DEFAULT_VIDEO = "/media/train-metro.mp4"
const DEFAULT_WOLF_VIDEO = "/media/hero-showcase.mp4"
const DEFAULT_SIGNATURE = { name: "INIXA LABS", url: "https://inixa.ai" }
const SANS = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#020612"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  wolfVideoSrc = DEFAULT_WOLF_VIDEO,
  title = "WELCOME TO INIXA LABS",
  scrollHint = "SCROLL TO ENTER",
  tagline = "Frontiers of Tactile Mobile Software & Autonomous AI",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 2600,
  className = "",
  style,
  onUnlock,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const wolfVideoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [isUnlockedState, setIsUnlockedState] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    const wolfVideo = wolfVideoRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
      if (wolfVideo) {
        wolfVideo.play().catch(() => {})
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    function engageLock() {
      if (locked || typeof document === "undefined") return
      // Only engage lock if user is near top of page
      if (window.scrollY > 40) return
      locked = true
      lockedScrollY = 0
      const b = document.body.style
      b.position = "fixed"
      b.top = "0px"
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.height = "100%"
      b.overscrollBehavior = "none"
      setIsUnlockedState(false)
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return
      locked = false
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.height = ""
      b.overscrollBehavior = ""
      setIsUnlockedState(true)
      onUnlock?.()
    }

    engageLock()

    function addDelta(deltaY: number) {
      if (!locked) {
        // If user scrolled back up to top, re-engage
        if (window.scrollY <= 5 && deltaY < 0) {
          engageLock()
          targetProgress = 0.95
          return true
        }
        return false
      }

      if (targetProgress >= 0.97 && deltaY > 0) {
        // Video finished! Unlock and allow smooth downward scroll
        releaseLock()
        window.scrollBy({ top: 120, behavior: "smooth" })
        return true
      }

      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      targetProgress = next
      if (targetProgress > 0.001) hasStartedScrolling = true
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (addDelta(e.deltaY)) {
        if (locked) e.preventDefault()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      if (addDelta(deltaY)) {
        if (locked) e.preventDefault()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    section.addEventListener("wheel", onWheel, { passive: false, capture: true })
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      const dur = (videoRef.current && videoRef.current.duration) || duration || 0
      if (dur > 0) {
        seekTo(currentProgress * dur)
      }

      // 1. Crossfade from train city to wolf video as doors slide open
      const fadeStart = 0.55
      const fadeEnd = 0.82

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.08
        videoRef.current.style.transform = `scale(${scale})`
        const trainOpacity = currentProgress >= fadeStart
          ? clamp(1 - (currentProgress - fadeStart) / (fadeEnd - fadeStart), 0, 1)
          : 1
        videoRef.current.style.opacity = String(ready ? trainOpacity : 0)
      }

      // 2. Wolf & Moon Hero Video reveal through opening doors
      if (wolfVideoRef.current) {
        const wolfOpacity = currentProgress >= fadeStart
          ? clamp((currentProgress - fadeStart) / (fadeEnd - fadeStart), 0, 1)
          : 0
        wolfVideoRef.current.style.opacity = String(wolfOpacity)
        wolfVideoRef.current.style.transform = `scale(${1.06 - currentProgress * 0.06})`
      }

      // 3. Welcome title fading out as train moves
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -32}px) scale(${0.95 + t * 0.05})`
        titleRef.current.style.filter = `blur(${(1 - t) * 12}px)`
      }

      // 4. Scroll hint
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }

      // 5. Inixa tagline payoff once doors reveal the wolf video
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.78) / 0.2, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 24}px) scale(${0.96 + t * 0.04})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      // 6. Scrub progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      section.removeEventListener("wheel", onWheel, true)
      section.removeEventListener("touchstart", onTouchStart, true)
      section.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance, onUnlock, ready])

  const handleSkipOrEnter = () => {
    // Smoothly scroll down past MetroHero
    const section = sectionRef.current
    if (section) {
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.height = ""
      b.overscrollBehavior = ""
      setIsUnlockedState(true)
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <div
      ref={sectionRef}
      className={`metro-hero-container ${className}`}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      {/* 1. Underlying Cinematic Wolf & Moon Video Layer */}
      <video
        ref={wolfVideoRef}
        src={wolfVideoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 25%",
          opacity: 0,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          touchAction: "none",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* 2. Primary Train Scrub Video Layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          touchAction: "none",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* 3. Ambient Vignette Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,6,18,0.55) 0%, rgba(2,6,18,0) 25%, rgba(2,6,18,0.2) 70%, rgba(2,6,18,0.75) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* 4. Title: Welcome to INIXA Labs */}
      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: "clamp(32px, 7.5vw, 92px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: COL_TEXT,
            textShadow: "0 8px 36px rgba(0,0,0,0.8), 0 0 40px rgba(0,255,135,0.25)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginTop: "16px",
            fontSize: "clamp(13px, 1.8vw, 18px)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#00ff87",
            textShadow: "0 2px 16px rgba(0,255,135,0.4)",
          }}
        >
          Autonomous AI & Flagship Mobile Software
        </span>
      </div>

      {/* 5. Tagline: Revealed as doors slide open */}
      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(24px, 4.5vw, 54px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,255,135,0.35)",
            }}
          >
            {tagline}
          </span>
          <span
            style={{
              marginTop: "14px",
              fontSize: "clamp(12px, 1.5vw, 15px)",
              color: "#00ff87",
              letterSpacing: "0.15em",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Entering INIXA Autonomous Neural Laboratories
          </span>
        </div>
      )}

      {/* 6. Scroll to enter hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(24px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          color: "rgba(240,244,248,0.85)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.3vw, 12px)",
          fontWeight: 700,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <span>{scrollHint}</span>
        <svg
          width="16"
          height="20"
          viewBox="0 0 14 18"
          style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(6px); opacity: 1; }
            }
          `}</style>
          <path
            d="M7 1 L7 17 M2 12 L7 17 L12 12"
            stroke="#00ff87"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 7. Thin progress line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          background: "rgba(255,255,255,0.12)",
          zIndex: 5,
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, #00ff87, #06b6d4)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* 8. Quick Skip / Enter Button for accessibility */}
      <div
        style={{
          position: "absolute",
          top: "clamp(16px, 3vh, 28px)",
          right: "clamp(16px, 3vw, 32px)",
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={handleSkipOrEnter}
          className="px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs font-semibold text-white/80 hover:text-white hover:border-[#00ff87]/60 hover:bg-black/60 transition-all flex items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          <span>{isUnlockedState ? "Scroll to Explore" : "Skip Intro"}</span>
          <span style={{ color: "#00ff87" }}>↓</span>
        </button>
      </div>

      {/* 9. Signature */}
      {signature && (
        <span
          style={{
            position: "absolute",
            left: "clamp(16px, 2.5vw, 28px)",
            bottom: "clamp(12px, 2vw, 20px)",
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: "clamp(10px, 1.2vw, 12px)",
            letterSpacing: "0.08em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 5,
          }}
        >
          ENGINEERED BY{" "}
          <a
            href={signature.url}
            style={{
              color: "#00ff87",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}

export default MetroHero
