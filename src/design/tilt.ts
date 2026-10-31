/**
 * INIXA AI LABS — 3D Perspective Card Tilt & Parallax Glare
 * Physics-based 3D tilt tracking cursor coordinates, setting CSS custom properties
 * (--tilt-x, --tilt-y, --glare-x, --glare-y) for butter-smooth GPU rendering.
 */

import { useEffect, useRef } from 'react'

export interface TiltOptions {
  maxTilt?: number // Maximum rotation in degrees (default 12)
  perspective?: number // 3D perspective in px (default 1000)
  scale?: number // Scale multiplier on hover (default 1.025)
  speed?: number // Transition reset speed in ms (default 400)
  glare?: boolean // Enable specular spotlight glare (default true)
  glareOpacity?: number // Max glare opacity (default 0.35)
}

export function useTiltCard<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T | null>(null)
  const {
    maxTilt = 12,
    perspective = 1000,
    scale = 1.025,
    speed = 400,
    glare = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Accessibility check: disable tilt if prefers-reduced-motion is active
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let rafId = 0
    let targetRotateX = 0
    let targetRotateY = 0
    let targetGlareX = 50
    let targetGlareY = 50

    el.style.transformStyle = 'preserve-3d'
    el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`

    const updateTransform = () => {
      rafId = 0
      el.style.transform = `perspective(${perspective}px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.setProperty('--glare-x', `${targetGlareX}%`)
      el.style.setProperty('--glare-y', `${targetGlareY}%`)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate tilt angles
      const percentX = (x - centerX) / centerX
      const percentY = (y - centerY) / centerY

      targetRotateX = -(percentY * maxTilt)
      targetRotateY = percentX * maxTilt

      if (glare) {
        targetGlareX = (x / rect.width) * 100
        targetGlareY = (y / rect.height) * 100
      }

      el.style.transition = 'transform 100ms cubic-bezier(0.16, 1, 0.3, 1)'
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform)
      }
    }

    const onMouseEnter = () => {
      el.style.willChange = 'transform'
    }

    const onMouseLeave = () => {
      targetRotateX = 0
      targetRotateY = 0
      el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      el.style.setProperty('--glare-x', '50%')
      el.style.setProperty('--glare-y', '50%')
      el.style.willChange = 'auto'
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    el.addEventListener('mousemove', onMouseMove, { passive: true })
    el.addEventListener('mouseenter', onMouseEnter, { passive: true })
    el.addEventListener('mouseleave', onMouseLeave, { passive: true })

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [maxTilt, perspective, scale, speed, glare])

  return ref
}
