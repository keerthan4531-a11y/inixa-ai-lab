import React, { useEffect, useRef, useState } from 'react'
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
 * An <img> that can never look broken or get stuck invisible.
 *  - Checks image completeness immediately on mount to prevent cache onLoad misses,
 *  - Renders directly with smooth opacity without locking behind opacity-0,
 *  - Swaps to a branded placeholder ONLY when onError fires or src is missing,
 *  - Guarantees full edge-to-edge fill with `block h-full w-full object-cover object-top`.
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
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [src])

  const label = fallbackLabel || alt
  const initial = label?.trim()?.charAt(0)?.toUpperCase() || 'I'

  return (
    <span
      className={cn('relative block h-full w-full overflow-hidden bg-[#050811]', wrapperClassName)}
    >
      {src && !hasError ? (
        <img
          ref={imgRef}
          src={encodeURI(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'block h-full w-full object-cover object-top transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-90',
            className,
          )}
          {...rest}
        />
      ) : (
        /* Graceful placeholder — shown only if src is invalid or failed to load */
        <span
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center select-none"
          style={{
            background: `linear-gradient(160deg, ${accentColor}26 0%, rgba(8,13,26,0.95) 55%, rgba(2,4,8,1) 100%)`,
          }}
          role="img"
          aria-label={alt}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl border text-base font-extrabold text-white shadow-lg"
            style={{ borderColor: `${accentColor}55`, backgroundColor: `${accentColor}22` }}
            aria-hidden="true"
          >
            {initial}
          </span>
          <span className="line-clamp-2 text-xs font-semibold text-white/80">{label}</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-white/45">
            <ImageOff className="h-3 w-3" aria-hidden="true" /> Live Preview
          </span>
        </span>
      )}
    </span>
  )
}
