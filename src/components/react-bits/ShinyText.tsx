import React from 'react'
import { cn } from '../../utils/cn'

interface ShinyTextProps {
  text: string
  className?: string
  shimmerColor?: string
}

/**
 * ShinyText from React Bits:
 * A subtle, elegant light sheen that passes across the text.
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
}) => {
  return (
    <span
      className={cn(
        'relative inline-block bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shine_4s_linear_infinite]',
        className
      )}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  )
}
