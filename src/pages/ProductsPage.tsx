import React, { useState, useMemo } from 'react'
import { ALL_PRODUCTS, Product } from '../data/products'
import { ParticleText } from '../components/react-bits/ParticleText'
import { CosmicBackground } from '../components/products/CosmicBackground'
import { ProductIcon } from '../components/products/ProductIcons'
import { navigate } from '../router'
import {
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const CATEGORIES = ['All Products', 'Audio Systems', 'Video & Streaming', 'System & AI Utilities']

// Precision neon brand colors matching the screenshot mockup
const BRAND_COLORS: Record<string, string> = {
  'beatbox-pro': '#FF7A1A', // Warm glowing amber/orange
  'beatbox-lite': '#00D2FF', // Electric sky cyan
  'beatbox-ultra': '#00FF87', // Neon mint emerald
  'mytube': '#FF2A55', // Crimson / Coral pink
  'lumina': '#00B4D8', // Electric cyber cyan-blue
  'liquid-stream': '#A855F7', // Royal purple / violet
  'clipster': '#10B981', // Emerald green
  'wikipedia-app': '#3B82F6', // Azure blue
  'inixa-ai': '#D946EF', // Cyber magenta
}

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === 'All Products'
          ? true
          : selectedCategory === 'Audio Systems'
          ? p.category.toLowerCase().includes('audio') || p.category.toLowerCase().includes('music')
          : selectedCategory === 'Video & Streaming'
          ? p.category.toLowerCase().includes('video') || p.category.toLowerCase().includes('stream')
          : p.category.toLowerCase().includes('ai') ||
            p.category.toLowerCase().includes('browser') ||
            p.category.toLowerCase().includes('utility') ||
            p.category.toLowerCase().includes('knowledge')

      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCat && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="relative min-h-screen pt-28 pb-28 px-4 sm:px-6 bg-[#020612] text-white selection:bg-pink-600 selection:text-white overflow-hidden">
      {/* Immersive Cosmic Space & Glowing Star Particles Background */}
      <CosmicBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-6xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#00ff87]" />
            <span>Complete INIXA Software Catalog</span>
          </div>

          <div className="w-full h-[240px] sm:h-[300px] lg:h-[340px] mx-auto flex items-center justify-center my-2">
            <ParticleText
              text={"Flagship Applications &\nLaboratory Experiments"}
              particleSize={3}
              density={2}
              color="#ffffff"
              highlightColor="#00ff87"
              highlightMode="motion"
              shape="circle"
              intro="gather"
              scatter={160}
              gatherDuration={1400}
              stagger={360}
              clickBurst={true}
              burstStrength={1.2}
              pointerRepel={55}
              repelRadius={150}
              idleDrift={0.5}
              trigger="mount"
              fontSize="clamp(3.2rem, 7.5vw, 6.2rem)"
              fontWeight={900}
              fontFamily="'Inter', -apple-system, sans-serif"
              glow={true}
            />
          </div>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl mx-auto">
            Every product engineered at INIXA Labs is built with custom graphics pipelines, real-time hardware audio rendering, and zero-telemetry architectures.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#00ff87] to-emerald-400 text-black font-extrabold shadow-[0_0_15px_rgba(0,255,135,0.4)]'
                    : 'bg-white/[0.03] border border-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400/50 backdrop-blur-md transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid with Glowing Borders, Glassmorphism, and Modern 3D Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const latestApk =
              product.apks && product.apks.length > 0 ? product.apks[product.apks.length - 1] : null
            const brandColor = BRAND_COLORS[product.id] || product.accentColor || '#00ff87'

            return (
              <div
                key={product.id}
                className="group relative rounded-[26px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-2xl overflow-hidden hover:-translate-y-1.5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13, 20, 36, 0.72) 0%, rgba(7, 11, 22, 0.88) 100%)',
                  border: `1.5px solid ${brandColor}80`,
                  boxShadow: `0 0 24px -4px ${brandColor}38, inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 38px 2px ${brandColor}65, 0 20px 40px rgba(0, 0, 0, 0.7)`
                  e.currentTarget.style.borderColor = `${brandColor}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 24px -4px ${brandColor}38, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
                  e.currentTarget.style.borderColor = `${brandColor}80`
                }}
              >
                {/* Soft Radial Gradient Highlight at Top-Right Corner */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: brandColor }}
                />

                <div className="relative z-10">
                  {/* Top Meta: Pill Badge on Left, Version on Right */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase border backdrop-blur-md"
                      style={{
                        backgroundColor: `${brandColor}18`,
                        borderColor: `${brandColor}40`,
                        color: brandColor,
                      }}
                    >
                      <span>{product.badge}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          backgroundColor: brandColor,
                          boxShadow: `0 0 8px ${brandColor}`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400/90">
                      {product.version}
                    </span>
                  </div>

                  {/* Title & Modern 3D Neon Icon Row */}
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-none group-hover:text-white transition-colors">
                      {product.name}
                    </h3>
                    <ProductIcon productId={product.id} color={brandColor} />
                  </div>

                  {/* Subtitle / Tagline */}
                  <p
                    className="text-xs font-semibold mb-3 tracking-wide"
                    style={{ color: brandColor }}
                  >
                    {product.tagline}
                  </p>

                  {/* Paragraph Description */}
                  <p className="text-xs text-slate-300/80 leading-relaxed mb-5 line-clamp-3 font-normal">
                    {product.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6 border-t border-white/[0.08] pt-4">
                    {product.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200/90">
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: brandColor }}
                        />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA Actions */}
                <div className="relative z-10 border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white group/btn transition-colors cursor-pointer"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-white/80" />
                  </button>

                  {latestApk ? (
                    <a
                      href={latestApk.downloadPath}
                      download
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.45)] hover:shadow-[0_0_28px_rgba(0,255,135,0.65)]"
                      style={{
                        background: 'linear-gradient(135deg, #00ff87 0%, #00e5ff 100%)',
                      }}
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>APK ({latestApk.sizeFormatted || latestApk.fileSize || 'Verified'})</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <span>Web Service</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-base">No products match your search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}
