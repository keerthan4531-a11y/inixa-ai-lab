/**
 * INIXA AI LABS — Magnetic Physics Hook
 * Applies spring-damped magnetic pull to buttons and interactive pills as the cursor hovers nearby.
 */

import { useEffect, useRef } from 'react'

export interface MagneticOptions {
  strength?: number // Magnetic pull factor (0.15 subtle to 0.45 strong, default 0.28)
  radius?: number // Activation distance in px (default 80)
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T | null>(null)
  const { strength = 0.28, radius = 80 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let frame = 0
    let targetX = 0
    let targetY = 0

    const apply = () => {
      frame = 0
      el.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.hypot(distX, distY)

      if (distance < radius) {
        targetX = distX * strength
        targetY = distY * strength
        el.style.transition = 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)'
      } else {
        targetX = 0
        targetY = 0
        el.style.transition = 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)'
      }

      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
      el.style.transition = 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)'
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength, radius])

  return ref
}
