import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  color: string
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Palette of subtle cosmic star colors
    const colors = [
      '#ffffff',
      '#67e8f9', // cyan
      '#f472b6', // pink
      '#a78bfa', // purple
      '#fde047', // soft yellow
      '#00ff87', // emerald
    ]

    // Generate ~65 delicate celestial stars
    const stars: Star[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.025 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    let time = 0

    const render = () => {
      time += 1
      ctx.clearRect(0, 0, width, height)

      // Draw each star with soft glow and gentle twinkle
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        const currentAlpha =
          star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.25
        const alpha = Math.max(0.1, Math.min(0.95, currentAlpha))

        ctx.save()
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = alpha

        // Subtle glow halo for larger stars
        if (star.radius > 1.3) {
          ctx.shadowBlur = 8
          ctx.shadowColor = star.color
        }

        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep Space Background Tint */}
      <div className="absolute inset-0 bg-[#020612]" />

      {/* Cosmic Nebula Color Blooms (Cyan, Purple, Pink, Emerald) */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-cyan-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-[35%] right-[-10%] w-[700px] h-[700px] bg-purple-600/12 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[600px] bg-pink-600/10 rounded-full blur-[160px]" />
      <div className="absolute top-[60%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px]" />

      {/* Twinkling Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  )
}

