import React, { ReactNode } from 'react'
import { useTiltCard, TiltOptions } from '../../design/tilt'
import { useCursorLight } from '../../design/cursor'
import { cn } from '../../utils/cn'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tilt?: boolean
  enableTilt?: boolean
  tiltOptions?: TiltOptions
  className?: string
  glowColor?: string
  glassLevel?: 'card' | 'panel' | 'specular' | 'pill' | string
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  tilt = true,
  enableTilt,
  tiltOptions,
  className = '',
  glowColor,
  glassLevel,
  style,
  ...rest
}) => {
  const shouldTilt = enableTilt !== undefined ? enableTilt : tilt
  const tiltRef = useTiltCard<HTMLDivElement>(shouldTilt ? tiltOptions : { maxTilt: 0, scale: 1 })
  const cursorRef = useCursorLight<HTMLDivElement>()

  // Combined ref callback
  const setRef = (node: HTMLDivElement | null) => {
    tiltRef.current = node
    cursorRef.current = node
  }

  const dynamicStyles = glowColor
    ? ({
        ...style,
        '--lg-border-glow': glowColor,
      } as React.CSSProperties)
    : style

  const levelClass =
    glassLevel === 'panel'
      ? 'liquid-glass-panel'
      : glassLevel === 'specular'
      ? 'liquid-glass-specular'
      : glassLevel === 'pill'
      ? 'liquid-glass-pill'
      : 'liquid-glass-card'

  return (
    <div
      ref={setRef}
      className={cn(levelClass, 'tilt-card-container', className)}
      style={dynamicStyles}
      {...rest}
    >
      {/* Specular Glare Layer */}
      <div className="tilt-glare" />

      {/* Surface Light Reflection */}
      <div className="liquid-glass-light-layer" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}
