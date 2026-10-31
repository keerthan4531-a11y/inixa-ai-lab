import React, { ReactNode } from 'react'
import { useMagnetic, MagneticOptions } from '../../design/magnetic'
import { useCursorLight } from '../../design/cursor'
import { cn } from '../../utils/cn'

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline'
  magnetic?: boolean
  magneticOptions?: MagneticOptions
  href?: string
  className?: string
  icon?: ReactNode
  target?: string
  rel?: string
  download?: boolean | string
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'default',
  magnetic = true,
  magneticOptions,
  href,
  className = '',
  icon,
  onClick,
  target,
  rel,
  download,
  ...rest
}) => {
  const magRef = useMagnetic<HTMLButtonElement>(magnetic ? magneticOptions : { strength: 0 })
  const cursorRef = useCursorLight<HTMLButtonElement>()

  const setRef = (node: HTMLButtonElement | null) => {
    magRef.current = node
    cursorRef.current = node
  }

  const variantClass =
    variant === 'primary'
      ? 'liquid-glass-btn-primary'
      : variant === 'secondary'
      ? 'liquid-glass-btn-secondary'
      : variant === 'ghost'
      ? 'border-transparent bg-transparent hover:bg-white/5'
      : variant === 'outline'
      ? 'border-white/20 bg-transparent hover:bg-white/10'
      : ''

  const content = (
    <>
      <span className="liquid-glass-light-layer" />
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={cn('liquid-glass-btn group', variantClass, className)}
        onClick={onClick as any}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={setRef}
      className={cn('liquid-glass-btn group', variantClass, className)}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  )
}
