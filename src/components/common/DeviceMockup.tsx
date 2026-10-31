import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'

export interface DeviceMockupProps {
  src?: string
  assetPath?: string
  alt?: string
  altText?: string
  className?: string
  glowColor?: string
  priority?: boolean
  frame?: string
  notch?: string
  shadow?: boolean
  interactiveTilt?: boolean
}

const DEFAULT_FALLBACK_SHOT = '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg'

/**
 * Ultra-high-end physical device chassis with React Bits tactile 3D tilt.
 * Displays genuine on-device captures edge-to-edge with pure OLED optics.
 * Directly mounts <img> with absolute inset-0 and object-cover object-top
 * to guarantee 100% full-screen display without black bars or letterboxing.
 */
export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  src,
  assetPath,
  alt,
  altText,
  className = '',
  glowColor = '#00f2fe',
  interactiveTilt = true,
}) => {
  const resolvedSrc = src || assetPath || DEFAULT_FALLBACK_SHOT
  const resolvedAlt = alt || altText || 'Flagship Android Device Capture'

  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // Gentle, tactile tilt (-8 to +8 degrees)
    setRotateX((py - 0.5) * -16)
    setRotateY((px - 0.5) * 16)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn('relative mx-auto flex items-center justify-center select-none', className)}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic back-glow aura */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[48px] opacity-40 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      {/* Phone Outer Chassis with smooth 3D transform */}
      <div
        className="relative overflow-hidden rounded-[42px] border-[3.5px] border-white/20 bg-[#080d1a] p-2 shadow-2xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: `
            0 24px 60px -12px rgba(0, 0, 0, 0.9),
            0 0 30px -5px ${glowColor}25,
            inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px 0 rgba(0, 0, 0, 0.6)
          `,
        }}
      >
        {/* Subtle camera punch hole */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-3.5 w-24 -translate-x-1/2 rounded-full bg-black/95 shadow-inner flex items-center justify-end pr-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#1e293b]" />
        </div>

        {/* Inner Glass Display Area: Strict 9/19.5 aspect ratio matching modern Android phones */}
        <div className="relative aspect-[9/19.5] w-[260px] sm:w-[280px] md:w-[300px] overflow-hidden rounded-[34px] bg-[#020408]">
          <img
            src={encodeURI(resolvedSrc)}
            alt={resolvedAlt}
            loading="eager"
            decoding="sync"
            draggable={false}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
            onError={(e) => {
              if (e.currentTarget.src !== DEFAULT_FALLBACK_SHOT) {
                e.currentTarget.src = DEFAULT_FALLBACK_SHOT
              }
            }}
          />

          {/* Diagonal Glass Reflection Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-25"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 48%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
