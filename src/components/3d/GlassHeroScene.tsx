import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface GlassHeroSceneProps {
  className?: string
}

export const GlassHeroScene: React.FC<GlassHeroSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Accessibility check: disable continuous rendering if prefers-reduced-motion is active
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const cyanPoint = new THREE.PointLight(0x00f2fe, 8, 20)
    cyanPoint.position.set(4, 3, 4)
    scene.add(cyanPoint)

    const purplePoint = new THREE.PointLight(0x8b5cf6, 8, 20)
    purplePoint.position.set(-4, -2, 3)
    scene.add(purplePoint)

    const amberPoint = new THREE.PointLight(0xf59e0b, 5, 15)
    amberPoint.position.set(0, 4, 2)
    scene.add(amberPoint)

    // Glass Material: High transmission and physical roughness for frosted liquid glass look
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.12,
      transmission: 0.92,
      thickness: 1.8,
      ior: 1.52,
      color: new THREE.Color(0xffffff),
      specularColor: new THREE.Color(0x00f2fe),
      specularIntensity: 1.2,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.9,
    })

    // Central Glass Icosahedron (Prism)
    const prismGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const centralPrism = new THREE.Mesh(prismGeo, glassMaterial)
    scene.add(centralPrism)

    // Orbiting Satellite Glass Spheres
    const satellites: THREE.Mesh[] = []
    const satelliteCount = 5
    const satGeo = new THREE.SphereGeometry(0.38, 32, 32)

    for (let i = 0; i < satelliteCount; i++) {
      const angle = (i / satelliteCount) * Math.PI * 2
      const radius = 3.2
      const satMaterial = glassMaterial.clone()
      const colors = [0x00f2fe, 0x3b82f6, 0x8b5cf6, 0xf59e0b, 0x10b981]
      satMaterial.color = new THREE.Color(colors[i % colors.length])
      
      const sat = new THREE.Mesh(satGeo, satMaterial)
      sat.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * 1.5,
        Math.sin(angle) * radius * 0.5
      )
      scene.add(sat)
      satellites.push(sat)
    }

    // Floating Ambient Dust Particles
    const particleGeo = new THREE.BufferGeometry()
    const particleCount = 70
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12
      positions[i + 1] = (Math.random() - 0.5) * 8
      positions[i + 2] = (Math.random() - 0.5) * 6
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Mouse Tracking Coordinates
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0

    const onPointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onPointerMove, { passive: true })

    // Resize Handler
    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId = 0
    let clock = new THREE.Clock()

    const animate = () => {
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(animate)
      }

      const elapsed = clock.getElapsedTime()

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Rotate Central Prism
      centralPrism.rotation.x = elapsed * 0.25 + mouseY * 0.5
      centralPrism.rotation.y = elapsed * 0.35 + mouseX * 0.5
      centralPrism.position.y = Math.sin(elapsed * 0.8) * 0.15

      // Orbit Satellites
      satellites.forEach((sat, i) => {
        const offset = (i / satelliteCount) * Math.PI * 2
        const currentAngle = elapsed * 0.4 + offset
        sat.position.x = Math.cos(currentAngle) * 3.0
        sat.position.y = Math.sin(currentAngle * 1.5) * 1.2
        sat.position.z = Math.sin(currentAngle) * 1.5
        sat.rotation.x = elapsed
        sat.rotation.y = elapsed * 0.5
      })

      // Particle Drift
      particleSystem.rotation.y = elapsed * 0.03

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('resize', onResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      style={{ overflow: 'hidden' }}
    />
  )
}
