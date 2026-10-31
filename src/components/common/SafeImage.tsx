import React, { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../../utils/cn'

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  alt: string
  /** Short label shown (instead of raw alt text) when the image cannot load. */
  fallbackLabel?: string
  accentColor?: string
  wrapperClassName?: string
  eager?: boolean
}

/**
 * An <img> that can never look broken.
 *  - keeps the <img> invisible until it has actually decoded a frame,
 *  - shows a neutral skeleton while loading,
 *  - swaps to a branded gradient placeholder on error (no broken icon, no alt-text spill),
 *  - encodeURI()s the path so asset names with spaces don't 404,
 *  - ensures edge-to-edge fill with `block h-full w-full object-cover object-top`.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackLabel,
  accentColor = '#00f2fe',
  wrapperClassName,
  eager = false,
  className,
  ...rest
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(src ? 'loading' : 'error')

  useEffect(() => {
    setStatus(src ? 'loading' : 'error')
  }, [src])

  const label = fallbackLabel || alt
  const initial = label?.trim()?.charAt(0)?.toUpperCase() || 'I'

  return (
    <span
      className={cn('relative block h-full w-full overflow-hidden bg-white/[0.04]', wrapperClassName)}
      aria-busy={status === 'loading'}
    >
      {status === 'loading' && (
        <span className="absolute inset-0 animate-pulse bg-gradient-to-b from-white/[0.07] to-white/[0.02]" aria-hidden="true" />
      )}

      {src && status !== 'error' ? (
        <img
          src={encodeURI(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'block h-full w-full object-cover object-top transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...rest}
        />
      ) : (
        /* Graceful placeholder — deliberately does NOT print the raw alt paragraph. */
        <span
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
          style={{
            background: `linear-gradient(160deg, ${accentColor}26 0%, rgba(8,13,26,0.95) 55%, rgba(2,4,8,1) 100%)`,
          }}
          role="img"
          aria-label={alt}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl border text-base font-extrabold text-white"
            style={{ borderColor: `${accentColor}55`, backgroundColor: `${accentColor}22` }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <span className="line-clamp-2 text-xs font-semibold text-white/80">{label}</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-white/45">
            <ImageOff className="h-3 w-3" aria-hidden="true" /> Preview unavailable
          </span>
        </span>
      )}
    </span>
  )
}
