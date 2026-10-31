import React, { useState, useEffect } from 'react'
import { Link, useRoute } from '../../router'
import { MAIN_NAV_ITEMS } from '../../types/route'
import { GlassButton } from '../common/GlassButton'
import { Search, Download, Sparkles } from 'lucide-react'

interface InixaNavProps {
  onOpenSearch: () => void
}

export const InixaNav: React.FC<InixaNavProps> = ({ onOpenSearch }) => {
  const currentPath = useRoute()
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex justify-center p-3 sm:p-5 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 transition-all duration-500 liquid-glass-nav ${
          scrolled ? 'scrolled max-w-4xl shadow-2xl' : 'max-w-5xl'
        } w-full`}
      >
        {/* Brand Mark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#060a12]">
              <Sparkles className="h-4 w-4 text-cyan-400 transition-transform group-hover:rotate-12" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
              INIXA <span className="text-cyan-400 font-semibold text-xs tracking-wider">LABS</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 no-underline ${
                  isActive
                    ? 'text-cyan-300 bg-white/10 shadow-inner'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 rounded-full bg-cyan-400/20 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300 border border-cyan-400/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-cyan-400/40 hover:text-white"
            title="Search (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-white/40">
              ⌘K
            </kbd>
          </button>

          {/* Sideload APKs Direct Button */}
          <GlassButton
            href="/downloads"
            variant="primary"
            className="!px-3.5 !py-1.5 !text-xs"
            icon={<Download className="h-3.5 w-3.5" />}
          >
            <span className="hidden sm:inline">Get</span> APKs
          </GlassButton>
        </div>
      </nav>
    </header>
  )
}
