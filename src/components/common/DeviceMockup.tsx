import React from 'react'
import { cn } from '../../utils/cn'
import { SafeImage } from './SafeImage'

interface DeviceMockupProps {
  src: string
  alt: string
  className?: string
  glowColor?: string
  priority?: boolean
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  src,
  alt,
  className = '',
  glowColor = '#00f2fe',
}) => {
  return (
    <div
      className={cn('relative mx-auto flex items-center justify-center', className)}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Dynamic back-glow aura */}
      <div
        className="absolute -inset-4 rounded-[48px] opacity-40 blur-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Phone Outer Chassis */}
      <div
        className="relative overflow-hidden rounded-[42px] border-[3.5px] border-white/20 bg-[#080d1a] p-2 shadow-2xl"
        style={{
          boxShadow: `
            0 24px 60px -12px rgba(0, 0, 0, 0.85),
            inset 0 1px 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px 0 rgba(0, 0, 0, 0.6)
          `,
        }}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute left-1/2 top-3 z-20 h-4 w-28 -translate-x-1/2 rounded-full bg-black/90 shadow-inner">
          <div className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#151c2e]" />
        </div>

        {/* Inner Glass Display Area */}
        <div className="relative aspect-[9/19.5] w-[260px] sm:w-[280px] md:w-[300px] overflow-hidden rounded-[34px] bg-[#020408]">
          <SafeImage
            src={src}
            alt={alt}
            fallbackLabel={alt}
            accentColor={glowColor}
            className="h-full w-full object-cover object-top"
          />

          {/* Diagonal Glass Reflection Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, transparent 45%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
