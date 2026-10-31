import React, { useEffect, useState } from 'react'
import { useRoute, navigate } from './router.jsx'
import { useLenis } from './hooks/useLenis'
import { InixaNav } from './components/navigation/InixaNav'
import { CommandMenu } from './components/navigation/CommandMenu'
import { InixaFooter } from './components/footer/InixaFooter'

// New Phase 6 Liquid Glass Pages
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/product-detail/ProductDetailPage'
import { DownloadsPage } from './pages/DownloadsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Legacy release & support pages
import Release from './pages/Release.jsx'
import ReleaseColorOS from './pages/ReleaseColorOS.jsx'
import Support from './pages/Support.jsx'
import { releaseByVersion, LATEST_RELEASE } from './releases.js'
import { PRODUCTS_BY_ID } from './data/products'

/**
 * Normalizes app ID aliases to ensure every URL lands on the correct product
 */
function normalizeProductId(rawId) {
  if (!rawId) return 'bearbox-ultra'
  const id = rawId.toLowerCase().trim()
  if (id === 'beat-box-ultra' || id === 'bear-box-ultra') return 'bearbox-ultra'
  if (id === 'beat-box-pro' || id === 'echo-music') return 'beatbox-pro'
  if (id === 'beat-box-lite' || id === 'ux-player') return 'beatbox-lite'
  if (id === 'my-tube' || id === 'mytube-music') return 'mytube'
  if (id === 'lumina-browser') return 'lumina'
  if (id === 'liquid-streaming') return 'liquid-stream'
  if (id === 'infopedia' || id === 'wikipedia' || id === 'wikipedia-app') return 'wikipedia-infopedia'
  if (id === 'inixa' || id === 'gemini-proxy') return 'inixa-ai'
  return id
}

export default function Site() {
  const path = useRoute()
  const [searchOpen, setSearchOpen] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  // Routing conditions
  const isHome = path === '/' || path === ''
  const isProducts = path === '/products' || path === '/catalog'
  const isProductDetail = path.startsWith('/product/') || path.startsWith('/app/')
  const isDownloads = path === '/downloads' || path === '/apks' || path === '/releases-all'
  const isAbout = path === '/about' || path === '/manifesto' || path === '/philosophy'
  const isContact = path === '/contact' || path === '/feedback'
  const isSupport = path === '/support' || path.startsWith('/support/')
  const isRelease = path === '/release' || path.startsWith('/release/')

  // Extract ID for product detail
  let activeProductId = ''
  if (isProductDetail) {
    const raw = path.replace(/^\/(product|app)\//, '')
    activeProductId = normalizeProductId(raw)
  }

  // Release lookup
  const releaseVersion = isRelease ? path.replace(/^\/release\/?/, '') : null
  const release = releaseVersion ? releaseByVersion[releaseVersion] || LATEST_RELEASE : LATEST_RELEASE

  // Update document title and OpenGraph metadata
  useEffect(() => {
    let title = 'INIXA LABS — Frontiers of AI & Flagship Mobile Software'
    let description =
      'Showcase of the INIXA mobile software ecosystem: Beat Box Ultra, INIXA AI, Lumina Browser, Liquid Stream, Clipster, and My Tube. Liquid Glass design language and zero tracking.'

    if (isProductDetail && PRODUCTS_BY_ID[activeProductId]) {
      const prod = PRODUCTS_BY_ID[activeProductId]
      title = `${prod.name} — ${prod.tagline} | INIXA LABS`
      description = prod.description
    } else if (isProducts) {
      title = 'Software Ecosystem & Catalog — INIXA LABS'
      description = 'Complete directory of 9 flagship mobile applications engineered by INIXA AI Labs.'
    } else if (isDownloads) {
      title = 'Direct APK Release Vault (15 Verified Builds) — INIXA LABS'
      description =
        'Direct cryptographic downloads for all INIXA Android packages with SHA-256 integrity verification.'
    } else if (isAbout) {
      title = 'Manifesto & Liquid Glass Philosophy — INIXA LABS'
      description = 'Our engineering creed: physical tactile instruments, zero telemetry, and 120Hz liquid glass optics.'
    } else if (isContact) {
      title = 'Contact & Engineering Dispatch — INIXA LABS'
      description = 'Bug reports, crash telemetry, and direct laboratory inquiries.'
    } else if (isSupport) {
      title = 'Documentation & Support — INIXA LABS'
    } else if (isRelease) {
      title = `Beat Box Ultra ${release.version} Release Notes — INIXA LABS`
      description = release.dek
    }

    document.title = title

    const set = (selector, attr, val) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr, val)
    }

    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:url"]', 'content', `https://inixa.ai${path}`)
  }, [path, isProductDetail, activeProductId, isProducts, isDownloads, isAbout, isContact, isSupport, isRelease, release])

  // Key combination listener for search modal (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Render Page Content
  const renderContent = () => {
    if (isHome) return <HomePage />
    if (isProducts) return <ProductsPage />
    if (isProductDetail) return <ProductDetailPage productId={activeProductId} />
    if (isDownloads) return <DownloadsPage />
    if (isAbout) return <AboutPage />
    if (isContact) return <ContactPage />
    if (isSupport) return <Support />
    if (isRelease) {
      if (release.layout === 'coloros') return <ReleaseColorOS release={release} key={release.version} />
      return <Release release={release} key={release.version} />
    }
    return <NotFoundPage />
  }

  // Legacy release and support pages handle their own header/footer chrome
  const isCustomChromePage = isRelease || isSupport

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Floating Liquid Glass Navigation */}
      {!isCustomChromePage && (
        <InixaNav onOpenSearch={() => setSearchOpen(true)} />
      )}

      {/* Ctrl+K Global Search & Quick Actions Modal */}
      <CommandMenu isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Liquid Glass Footer */}
      {!isCustomChromePage && <InixaFooter />}
    </div>
  )
}
