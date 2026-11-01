import React, { useState, useEffect } from 'react'
import { Link, useRoute, navigate } from '../../router'
import GooeyNav from '../GooeyNav'
import { MAIN_NAV_ITEMS } from '../../types/route'
import { GlassButton } from '../common/GlassButton'
import ElectricLogo from '../ElectricLogo'
import { Search, Download, Sparkles, Menu, X } from 'lucide-react'

interface InixaNavProps {
  onOpenSearch: () => void
}

export const InixaNav: React.FC<InixaNavProps> = ({ onOpenSearch }) => {
  const currentPath = useRoute()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const activeNavIndex = MAIN_NAV_ITEMS.findIndex((item) => {
    if (item.href === '/') return currentPath === '/'
    return currentPath.startsWith(item.href)
  })

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > 20)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  /* Close the mobile sheet whenever the route changes / on Escape */
  useEffect(() => {
    setMenuOpen(false)
  }, [currentPath])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex justify-center p-3 sm:p-5">
      {/* Width no longer changes on scroll — max-w-5xl → 4xl made the whole bar jump */}
      <nav
        className={`liquid-glass-nav pointer-events-auto relative flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2.5 transition-shadow duration-500 sm:px-6 ${
          scrolled ? 'scrolled shadow-2xl' : ''
        }`}
        aria-label="Primary"
      >
        {/* Brand Mark */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5 no-underline">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#040a18] border border-emerald-400/40 p-0.5 shadow-md shadow-emerald-500/25 overflow-hidden group-hover:border-pink-500/60 transition-colors">
            <ElectricLogo
              src="/inixa-brand-electric.svg"
              color="#00ff87"
              glowColor="#be185d"
              scale={0.82}
              strands={3}
              bend={0.5}
              crackle={1.2}
              arcs={1}
              speed={2.2}
              interactive
            />
          </div>
          <span className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-white">
            INIXA <span className="text-xs font-semibold tracking-wider text-[#00ff87]">LABS</span>
          </span>
        </Link>

        {/* Desktop Nav Links with Gooey Physics in Light Green + Dark Pink Droplets */}
        <div className="hidden items-center md:flex">
          <GooeyNav
            items={MAIN_NAV_ITEMS}
            activeIndex={activeNavIndex >= 0 ? activeNavIndex : 0}
            onChange={(_, item) => {
              if (item.href) navigate(item.href)
            }}
            size="sm"
            frame={false}
            theme="dark"
            color="#00ff87"
            activeTextColor="#020612"
            colors={['#00ff87', '#10b981', '#ec4899', '#be185d']}
          />
        </div>

        {/* Right Action Tools */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-emerald-400/50 hover:text-white"
            title="Search (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/40 sm:inline">
              ⌘K
            </kbd>
          </button>

          <span className="hidden sm:inline-flex">
            <GlassButton
              href="/downloads"
              variant="primary"
              className="!px-3.5 !py-1.5 !text-xs"
              icon={<Download className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              Get APKs
            </GlassButton>
          </span>

          {/* Mobile menu toggle — without this, phone users had NO way to
              reach Products / About / Contact except the footer. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="inixa-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:text-white md:hidden"
          >
            {menuOpen ? <X className="h-4.5 w-4.5" aria-hidden="true" /> : <Menu className="h-4.5 w-4.5" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile sheet */}
        {menuOpen && (
          <div
            id="inixa-mobile-menu"
            className="absolute inset-x-0 top-[calc(100%+10px)] rounded-[24px] border border-white/12 bg-[#040a18]/97 p-2 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onNavigate={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold no-underline ${
                    isActive ? 'bg-white/10 text-emerald-300' : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full border border-pink-500/30 bg-pink-500/15 px-2 py-0.5 text-[10px] font-bold text-pink-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
            <Link
              to="/downloads"
              onNavigate={() => setMenuOpen(false)}
              className="mt-1 flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-4 py-2.5 text-sm font-bold text-black no-underline shadow-lg shadow-emerald-500/25"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Get APKs
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
