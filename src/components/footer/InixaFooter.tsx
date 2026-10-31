import React from 'react'
import { ArrowUp, Sparkles, Shield, Code2, Heart, Layers, ExternalLink } from 'lucide-react'
import { ALL_PRODUCTS } from '../../data/products'
import { navigate } from '../../router'

export const InixaFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-64 bg-gradient-to-t from-cyan-900/20 via-blue-900/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brand Showcase Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 pb-16 border-b border-white/10">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-black text-xl bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                    IX
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-wider text-white">
                  INIXA <span className="text-cyan-400">LABS</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Frontiers of AI & Flagship Mobile Software
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
              Building ultra-fluid mobile software with liquid-glass design systems, hardware-accelerated audio pipelines, and zero-telemetry architectures.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300">
                <span className="font-bold text-white">9</span> <span className="text-neutral-500">• Products</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300">
                <span className="font-bold text-white">15</span> <span className="text-neutral-500">• Standalone APKs</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-neutral-300">
                <span className="font-bold text-white">0</span> <span className="text-neutral-500">• Ad Trackers</span>
              </div>
            </div>
          </div>

          {/* Product Directory */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Software Ecosystem
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {ALL_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => navigate(`/product/${prod.id}`)}
                  className="text-left text-xs text-neutral-400 hover:text-cyan-300 transition-colors py-1 truncate"
                >
                  {prod.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation & Resources */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Laboratory Index
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigate('/products')}
                  className="hover:text-white transition-colors"
                >
                  Product Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/downloads')}
                  className="hover:text-white transition-colors"
                >
                  Direct APK Vault (15 Builds)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  Manifesto & Liquid Glass Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Bug Reports & Engineering Dispatch
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and back-to-top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} INIXA AI Labs. Engineered with Liquid Glass.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
