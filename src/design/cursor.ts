/**
 * INIXA AI LABS — Cursor-Reactive Light & Spotlight System
 * Injects dynamic coordinates (--mouse-x, --mouse-y) to render moving specular
 * reflections, glass edge luminescence, and ambient cursor glows.
 */

import { useEffect, useRef } from 'react'

export function useCursorLight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current || document.documentElement
    let frame = 0

    const update = (clientX: number, clientY: number) => {
      frame = 0
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        ref.current.style.setProperty('--mouse-x', `${x}px`)
        ref.current.style.setProperty('--mouse-y', `${y}px`)
      } else {
        document.documentElement.style.setProperty('--cursor-x', `${clientX}px`)
        document.documentElement.style.setProperty('--cursor-y', `${clientY}px`)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => update(e.clientX, e.clientY))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
