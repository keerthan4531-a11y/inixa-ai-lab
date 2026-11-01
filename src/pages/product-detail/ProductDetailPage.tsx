import React, { useState } from 'react'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from '../../data/products'
import { SCREENSHOT_MAP } from '../../data/screenshotMap'
import { GlassCard } from '../../components/common/GlassCard'
import { GlassButton } from '../../components/common/GlassButton'
import { DeviceMockup } from '../../components/common/DeviceMockup'
import { copyToClipboard } from '../../utils/clipboard'
import { cn } from '../../utils/cn'
import {
  Download,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Cpu,
} from 'lucide-react'
import { navigate } from '../../router'
import { StrokeText } from '../../components/react-bits/StrokeText'
import { ScrambledText } from '../../components/react-bits/ScrambledText'

interface ProductDetailPageProps {
  productId: string
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const [copiedApkIndex, setCopiedApkIndex] = useState<number | null>(null)

  const product = PRODUCTS_BY_ID[productId] || ALL_PRODUCTS[0]
  const prodScreenshots = SCREENSHOT_MAP[product.id] || {}

  const handleCopyLink = async (downloadPath: string, index: number) => {
    const fullUrl = `${window.location.origin}${downloadPath}`
    const ok = await copyToClipboard(fullUrl)
    if (ok) {
      setCopiedApkIndex(index)
      setTimeout(() => setCopiedApkIndex(null), 2500)
    }
  }

  // Get primary showcase screenshot
  const screenshotKeys = Object.keys(prodScreenshots)
  const heroShot = prodScreenshots[screenshotKeys[0]]

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6">
      {/* Background Ambient Caustic */}
      <div
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 25%, ${product.accentColor}40 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Breadcrumb & Back Link */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Products
          </button>

          <span
            className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border"
            style={{
              backgroundColor: `${product.accentColor}25`,
              borderColor: `${product.accentColor}50`,
            }}
          >
            {product.badge}
          </span>
        </div>

        {/* HERO HEADER: Product Title, Badges, and Device Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 mb-4">
              <span
                className="h-2 w-2 rounded-full shadow-[0_0_8px]"
                style={{ backgroundColor: product.accentColor, boxShadow: `0 0 8px ${product.accentColor}` }}
              />
              <span>{product.version} • Verified Flagship Architecture</span>
            </div>

            <h1 className="sr-only">
              {product.name}
            </h1>
            <div className="mb-6">
              <StrokeText
                key={product.id}
                text={product.name}
                strokeColor={product.accentColor || '#00ff87'}
                fillColor="#ffffff"
                strokeWidth={2.4}
                drawDuration={1.3}
                fillDelay={0.2}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                fontSize={86}
                fontWeight={900}
                letterSpacing={-3}
                marching={false}
                hoverRedraw={true}
                shadow={true}
                shadowColor={product.accentColor ? `${product.accentColor}70` : '#00ff8770'}
                className="leading-tight"
                style={{
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              />
            </div>
            <p className="text-lg font-medium text-emerald-300 mb-6">
              {product.tagline}
            </p>
            <div className="mb-8">
              <ScrambledText
                key={product.id}
                className="text-base sm:text-lg text-white/75 leading-relaxed"
                effect="scramble"
                radius={110}
                strength={1}
                trail={0.6}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:*#_~[]<>"
                scrambleColor={product.accentColor || '#00ff87'}
                clickBurst
                intro
              >
                {product.detailedSummary
                  ? `${product.longDescription} ${product.detailedSummary}`
                  : product.longDescription}
              </ScrambledText>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {product.apks && product.apks.length > 0 && (
                <GlassButton
                  href={product.apks[product.apks.length - 1].downloadPath}
                  variant="primary"
                  className="!px-6 !py-3"
                  icon={<Download className="h-4 w-4" />}
                >
                  Download Latest ({product.apks[product.apks.length - 1].version})
                </GlassButton>
              )}

              {product.githubUrl && (
                <GlassButton
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!px-5 !py-3"
                  icon={<ExternalLink className="h-4 w-4 text-white/60" />}
                >
                  Source Repository
                </GlassButton>
              )}
            </div>

            {/* Platform & Target Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 border-t border-white/10 pt-6">
              <div>Platform: <span className="text-white font-medium">{product.platform}</span></div>
              <div>•</div>
              <div>Package: <span className="text-white font-mono">{product.packageId}</span></div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {heroShot ? (
              <DeviceMockup
                src={heroShot.assetPath}
                alt={heroShot.altText}
                glowColor={product.accentColor}
              />
            ) : (
              <div className="h-[460px] w-[260px] rounded-[36px] border border-white/20 bg-black/60 flex items-center justify-center text-white/40">
                No Preview
              </div>
            )}
          </div>
        </div>

        {/* FEATURE HIGHLIGHT ROWS: With Matching Real Screenshots */}
        <div className="space-y-16 mb-24">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Deep Architectural Features
            </h2>
            <p className="text-sm text-white/60 max-w-xl mx-auto">
              Each feature verified against real on-device execution with zero mocked components.
            </p>
          </div>

          {product.features.map((feat, index) => {
            const shot = feat.screenshotKey ? prodScreenshots[feat.id] || prodScreenshots[feat.screenshotKey] : null
            const isEven = index % 2 === 0

            return (
              <GlassCard
                key={feat.id}
                glowColor={product.accentColor}
                className={cn(
                  'p-8 md:p-10 flex flex-col gap-8 items-center',
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                {/* Text Side */}
                <div className="flex-1 space-y-4">
                  {feat.badge && (
                    <span className="inline-block rounded-full bg-pink-500/20 px-3 py-1 text-[10px] font-bold tracking-wider text-pink-300 border border-pink-500/30">
                      {feat.badge}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white">{feat.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{feat.description}</p>
                </div>

                {/* Screenshot Side: Real Titanium Device Mockup */}
                {shot && (
                  <div className="w-full sm:w-[280px] md:w-[320px] shrink-0 flex flex-col items-center">
                    <DeviceMockup
                      src={shot.assetPath}
                      alt={shot.altText}
                      glowColor={product.accentColor}
                    />
                    <div className="text-xs font-medium text-white/50 text-center mt-3 truncate max-w-[260px]">
                      {shot.whatItShows}
                    </div>
                  </div>
                )}
              </GlassCard>
            )
          })}
        </div>

        {/* SPECIFICATIONS & SYSTEM TELEMETRY */}
        <div className="mb-24">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-pink-400" />
              <span>Technical Specifications &amp; Architecture</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([label, val]) => (
                <div key={label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm font-semibold text-white">{val}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* APK RELEASE TIMELINE (OLD -> NEW) */}
        <div id="downloads">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
              Verified Binary Releases
            </h2>
            <p className="text-sm text-white/60">
              Download verified APKs directly to your Android device from oldest to newest release.
            </p>
          </div>

          <div className="space-y-4">
            {product.apks && product.apks.length > 0 ? (
              product.apks.map((apk, index) => (
                <GlassCard
                  key={index}
                  className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border ${
                    apk.isLatest ? 'border-emerald-400/40 bg-emerald-950/20' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-white">{apk.version}</span>
                      {apk.isLatest && (
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-emerald-400 border border-emerald-500/30">
                          LATEST TAGGED
                        </span>
                      )}
                      <span className="text-xs text-white/40">{apk.releaseDate}</span>
                    </div>

                    <div className="text-xs font-mono text-white/60">
                      {apk.fileName} • <span className="text-emerald-300 font-semibold">{apk.sizeFormatted}</span> • {apk.abi}
                    </div>

                    {/* Changelog Bullets */}
                    <div className="space-y-1 pt-1">
                      {apk.changelog.map((change, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-xs text-white/70">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shrink-0" />
                          <span>{change}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleCopyLink(apk.downloadPath, index)}
                      className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                      title="Copy Direct Link"
                    >
                      {copiedApkIndex === index ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    <GlassButton
                      href={apk.downloadPath}
                      download
                      variant={apk.isLatest ? 'primary' : 'default'}
                      icon={<Download className="h-4 w-4" />}
                    >
                      Download APK
                    </GlassButton>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="p-8 rounded-3xl border border-white/10 text-center text-white/40">
                This project distributes as an Electron Desktop application or serverless Cloudflare Edge package.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
