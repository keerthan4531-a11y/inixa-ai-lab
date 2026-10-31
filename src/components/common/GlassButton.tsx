import React, { ReactNode } from 'react'
import { useMagnetic, MagneticOptions } from '../../design/magnetic'
import { useCursorLight } from '../../design/cursor'
import { navigate } from '../../router'
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

/** File downloads must stay real navigations — the SPA router must not eat them. */
const FILE_HREF = /\.(apk|zip|dmg|exe|pdf|mp4|json)(\?.*)?$/i

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'default',
  // Opt-in: magnetic pull on every pill (including the tiny nav button)
  // just makes the chrome feel unstable, and it does nothing on touch.
  magnetic = false,
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
      <span className="liquid-glass-light-layer" aria-hidden="true" />
      {icon && <span className="relative z-10 inline-flex shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    const isInternalRoute = href.startsWith('/') && !download && !FILE_HREF.test(href) && !target

    const onAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      ;(onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(event)
      if (
        !isInternalRoute ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return // modified clicks (⌘/ctrl/middle) keep native behaviour
      }
      // Internal routes go through the SPA router — previously this was a
      // plain <a>, so hero CTAs triggered a full reload of the ~1 MB bundle.
      event.preventDefault()
      navigate(href)
    }

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={cn('liquid-glass-btn group', variantClass, className)}
        onClick={onAnchorClick}
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
