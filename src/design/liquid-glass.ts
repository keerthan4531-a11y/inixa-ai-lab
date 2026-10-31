/**
 * INIXA AI LABS — Liquid Glass Refraction Engine
 * Apple iOS / Google Labs style liquid glass with optical rim refraction,
 * chromatic aberration fringes, and frosted blur fallbacks.
 */

import { useEffect, useRef } from 'react'

export interface LiquidGlassOptions {
  scale?: number // Displacement strength (-180 dramatic, -112 default, -60 subtle)
  chroma?: number // Chromatic aberration spread in px (default 6)
  border?: number // Inset border fraction (default 0.08)
  mapBlur?: number // Blur radius of the displacement map (default 14)
  blur?: number // Backdrop blur in px (default 18)
  saturate?: number // Backdrop saturation in % (default 190)
  radius?: number // Corner radius in px
  fallbackBlur?: number // Fallback blur for non-Chromium (default 28)
}

export interface LiquidGlassHandle {
  supported: boolean
  refresh: () => void
  destroy: () => void
}

const SVG_NS = 'http://www.w3.org/2000/svg'
let uid = 0
let svgDefs: SVGDefsElement | null = null

// Check if browser supports SVG filters in backdrop-filter
export const isRefractionSupported = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua)
  const isFirefox = /Firefox/.test(ua)
  if (isSafari || isFirefox) return false
  if (!window.CSS || !window.CSS.supports || !CSS.supports('backdrop-filter', 'url(#test)')) {
    return false
  }
  return true
}

function ensureDefs(): SVGDefsElement {
  if (svgDefs) return svgDefs
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.position = 'absolute'
  svg.style.pointerEvents = 'none'
  svg.style.opacity = '0'
  svgDefs = document.createElementNS(SVG_NS, 'defs')
  svg.appendChild(svgDefs)
  document.body.appendChild(svg)
  return svgDefs
}

function makeMap(
  w: number,
  h: number,
  radius: number,
  border: number,
  mapBlur: number
): string {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(16, Math.floor(w))
  canvas.height = Math.max(16, Math.floor(h))
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Gradient difference method: X displacement in Red, Y displacement in Blue
  const gx = ctx.createLinearGradient(0, 0, canvas.width, 0)
  gx.addColorStop(0, 'rgb(0,0,0)')
  gx.addColorStop(1, 'rgb(255,0,0)')
  ctx.fillStyle = gx
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const gy = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gy.addColorStop(0, 'rgb(0,0,0)')
  gy.addColorStop(1, 'rgb(0,0,255)')
  ctx.globalCompositeOperation = 'difference'
  ctx.fillStyle = gy
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Inset neutral gray rounded rect confines refraction bulge to rim
  ctx.globalCompositeOperation = 'source-over'
  const inset = border * Math.min(canvas.width, canvas.height)
  ctx.filter = `blur(${mapBlur}px)`
  ctx.fillStyle = 'rgba(128,128,128,0.94)'
  ctx.beginPath()
  const r = Math.max(radius - inset, 4)
  ctx.roundRect(inset, inset, canvas.width - inset * 2, canvas.height - inset * 2, r)
  ctx.fill()
  ctx.filter = 'none'

  return canvas.toDataURL()
}

function buildFilter(id: string, scales: [number, number, number]): SVGFilterElement {
  const filter = document.createElementNS(SVG_NS, 'filter')
  filter.setAttribute('id', id)
  filter.setAttribute('x', '0')
  filter.setAttribute('y', '0')
  filter.setAttribute('width', '100%')
  filter.setAttribute('height', '100%')
  filter.setAttribute('color-interpolation-filters', 'sRGB')

  const feImage = document.createElementNS(SVG_NS, 'feImage')
  feImage.setAttribute('id', `${id}-map`)
  feImage.setAttribute('result', 'map')
  feImage.setAttribute('preserveAspectRatio', 'none')
  filter.appendChild(feImage)

  // Three passes at staggered scales (Red, Green, Blue) for chromatic aberration
  const channels = ['R', 'G', 'B'] as const
  channels.forEach((ch, i) => {
    const disp = document.createElementNS(SVG_NS, 'feDisplacementMap')
    disp.setAttribute('in', 'SourceGraphic')
    disp.setAttribute('in2', 'map')
    disp.setAttribute('scale', String(scales[i]))
    disp.setAttribute('xChannelSelector', 'R')
    disp.setAttribute('yChannelSelector', 'B')
    disp.setAttribute('result', `disp${ch}`)
    filter.appendChild(disp)

    const mat = document.createElementNS(SVG_NS, 'feColorMatrix')
    mat.setAttribute('in', `disp${ch}`)
    mat.setAttribute('type', 'matrix')
    const rRow = ch === 'R' ? '1 0 0 0 0' : '0 0 0 0 0'
    const gRow = ch === 'G' ? '0 1 0 0 0' : '0 0 0 0 0'
    const bRow = ch === 'B' ? '0 0 1 0 0' : '0 0 0 0 0'
    mat.setAttribute('values', `${rRow}  ${gRow}  ${bRow}  0 0 0 1 0`)
    mat.setAttribute('result', `color${ch}`)
    filter.appendChild(mat)
  })

  // Blend Red and Green
  const blend1 = document.createElementNS(SVG_NS, 'feBlend')
  blend1.setAttribute('in', 'colorR')
  blend1.setAttribute('in2', 'colorG')
  blend1.setAttribute('mode', 'screen')
  blend1.setAttribute('result', 'blendRG')
  filter.appendChild(blend1)

  // Blend RG and Blue
  const blend2 = document.createElementNS(SVG_NS, 'feBlend')
  blend2.setAttribute('in', 'blendRG')
  blend2.setAttribute('in2', 'colorB')
  blend2.setAttribute('mode', 'screen')
  filter.appendChild(blend2)

  return filter
}

export function applyLiquidGlass(
  el: HTMLElement,
  options: LiquidGlassOptions = {}
): LiquidGlassHandle {
  const {
    scale = -112,
    chroma = 6,
    border = 0.08,
    mapBlur = 14,
    blur = 16,
    saturate = 190,
    radius = 24,
    fallbackBlur = 28,
  } = options

  const supported = isRefractionSupported()

  if (!supported) {
    el.style.backdropFilter = `blur(${fallbackBlur}px) saturate(${saturate}%)`
    ;(el.style as any).webkitBackdropFilter = `blur(${fallbackBlur}px) saturate(${saturate}%)`
    return {
      supported: false,
      refresh: () => {},
      destroy: () => {
        el.style.backdropFilter = ''
        ;(el.style as any).webkitBackdropFilter = ''
      },
    }
  }

  const defs = ensureDefs()
  const filterId = `inixa-lg-${++uid}`
  const scales: [number, number, number] = [scale - chroma, scale, scale + chroma]
  const filterNode = buildFilter(filterId, scales)
  defs.appendChild(filterNode)

  const feImage = filterNode.querySelector(`#${filterId}-map`) as SVGElement

  const update = () => {
    const rect = el.getBoundingClientRect()
    if (rect.width < 8 || rect.height < 8) return
    const mapUrl = makeMap(rect.width, rect.height, radius, border, mapBlur)
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapUrl)
    feImage.setAttribute('href', mapUrl)
    el.style.backdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate}%)`
    ;(el.style as any).webkitBackdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate}%)`
  }

  update()

  const ro = new ResizeObserver(() => update())
  ro.observe(el)

  return {
    supported: true,
    refresh: update,
    destroy: () => {
      ro.disconnect()
      if (filterNode.parentNode) {
        filterNode.parentNode.removeChild(filterNode)
      }
      el.style.backdropFilter = ''
      ;(el.style as any).webkitBackdropFilter = ''
    },
  }
}

/**
 * React Hook for applying Apple-style Liquid Glass effect
 */
export function useLiquidGlass<T extends HTMLElement>(
  options: LiquidGlassOptions = {}
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const handle = applyLiquidGlass(ref.current, options)
    return () => handle.destroy()
  }, [
    options.scale,
    options.chroma,
    options.border,
    options.mapBlur,
    options.blur,
    options.saturate,
    options.radius,
  ])

  return ref
}
