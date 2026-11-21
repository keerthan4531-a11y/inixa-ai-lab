import React, { useEffect, useState } from 'react'
import { useRoute, navigate } from './router.jsx'
import { useLenis } from './hooks/useLenis'
import { InixaNav } from './components/navigation/InixaNav'
import { CommandMenu } from './components/navigation/CommandMenu'
import { InixaFooter } from './components/footer/InixaFooter'
import { AiCatAssistant } from './components/doodle/AiCatAssistant'
import CursorGrid from './components/CursorGrid'

// New Phase 6 Liquid Glass Pages
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/product-detail/ProductDetailPage'
import { DownloadsPage } from './pages/DownloadsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { DeveloperPortalPage } from './pages/DeveloperPortalPage'

// Legacy release & support pages
import Release from './pages/Release.jsx'
import ReleaseColorOS from './pages/ReleaseColorOS.jsx'
import Support from './pages/Support.jsx'
import { releaseByVersion, LATEST_RELEASE } from './releases.js'
import { PRODUCTS_BY_ID } from './data/products'
import { useAllProductsMap } from './data/developerApps'

/**
 * Normalizes app ID aliases to ensure every URL lands on the correct product
 */
function normalizeProductId(rawId) {
  if (!rawId) return 'beatbox-ultra'
  const id = rawId.toLowerCase().trim()
  if (id === 'beat-box-ultra' || id === 'bear-box-ultra') return 'beatbox-ultra'
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
  const allProductsMap = useAllProductsMap()

  // Initialize smooth scrolling
  useLenis()

  // Routing conditions
  const isHome = path === '/' || path === ''
  const isProducts = path === '/products' || path === '/catalog'
  const isProductDetail = path.startsWith('/product/') || path.startsWith('/app/')
  const isDownloads = path === '/downloads' || path === '/apks' || path === '/releases-all'
  const isAbout = path === '/about' || path === '/manifesto' || path === '/philosophy' || path === '/engineers' || path === '/team' || path === '/about/engineers'
  const isContact = path === '/contact' || path === '/feedback'
  const isSupport = path === '/support' || path.startsWith('/support/')
  const isRelease = path === '/release' || path.startsWith('/release/')
  const isDeveloper = path === '/developer' || path === '/admin' || path === '/collaborators'

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

    if (isProductDetail && allProductsMap[activeProductId]) {
      const prod = allProductsMap[activeProductId]
      title = `${prod.name} — ${prod.tagline} | INIXA LABS`
      description = prod.description || prod.longDescription
    } else if (isProducts) {
      title = 'Software Ecosystem & Catalog — INIXA LABS'
      description = 'Complete directory of flagship mobile applications engineered by INIXA AI Labs.'
    } else if (isDownloads) {
      title = 'Direct APK Release Vault (15 Verified Builds) — INIXA LABS'
      description =
        'Direct cryptographic downloads for all INIXA Android packages with SHA-256 integrity verification.'
    } else if (isAbout) {
      title = 'Manifesto & Liquid Glass Philosophy — INIXA LABS'
      description = 'Our engineering creed: physical tactile instruments, zero telemetry, and 120Hz liquid glass optics.'
    } else if (isDeveloper) {
      title = 'Developer Portal & Collaborator Studio — INIXA LABS'
      description = 'Core developer gate for binary distribution and ecosystem application launches.'
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
    set('meta[property="og:url"]', 'content', `https://inixalab.vercel.app${path}`)
    set('meta[name="twitter:title"]', 'content', title)
    set('meta[name="twitter:description"]', 'content', description)
  }, [path, isProductDetail, activeProductId, isProducts, isDownloads, isAbout, isContact, isSupport, isRelease, isDeveloper, release, allProductsMap])

  // Key combination listener:
  // 1. Ctrl + Alt + Shift + A -> Hidden Admin & Collaborator Developer Portal
  // 2. Ctrl + K or Cmd + K -> Search Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret Admin / Collaborator Page: Ctrl + Alt + Shift + A
      if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault()
        navigate('/developer')
        return
      }

      // Quick Search Modal: Ctrl + K / Cmd + K
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
    if (isDeveloper) return <DeveloperPortalPage />
    if (isHome) return <HomePage onOpenSearch={() => setSearchOpen(true)} />
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

  // Legacy release and support pages handle their own header/footer chrome,
  // and all main pages (Products, Downloads, About, Contact, Developer) render their dedicated full-width footer inline
  const isCustomChromePage = isRelease || isSupport || isDeveloper
  const hasDedicatedFooter = isRelease || isSupport || isProducts || isDownloads || isAbout || isContact || isDeveloper

  return (
    <div className="min-h-screen bg-[#020612] text-white flex flex-col selection:bg-pink-600 selection:text-white relative w-full max-w-[100vw] overflow-x-clip">
      {/* Floating Liquid Glass Navigation */}
      {!isCustomChromePage && (
        <InixaNav onOpenSearch={() => setSearchOpen(true)} />
      )}

      {/* Ctrl+K Global Search & Quick Actions Modal */}
      <CommandMenu isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Floating Kutty AI Cat Assistant with Page Cloud Guide & Chat Window */}
      <AiCatAssistant />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10 w-full max-w-full overflow-x-clip">
        {renderContent()}
      </main>

      {/* Liquid Glass Footer */}
      {!hasDedicatedFooter && <InixaFooter />}
    </div>
  )
}
