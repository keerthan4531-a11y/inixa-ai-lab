import React, { useState } from 'react'
import { ALL_APKS, APK_BY_PRODUCT } from '../data/apks'
import { ALL_PRODUCTS } from '../data/products'
import { GlassCard } from '../components/common/GlassCard'
import { GlassButton } from '../components/common/GlassButton'
import { copyToClipboard } from '../utils/clipboard'
import {
  Download,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Smartphone,
  HardDrive,
  Cpu,
  Sparkles,
  Search,
  Layers,
} from 'lucide-react'

export const DownloadsPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const filteredApks = ALL_APKS.filter((apk) => {
    return (
      apk.productName.toLowerCase().includes(search.toLowerCase()) ||
      apk.version.toLowerCase().includes(search.toLowerCase()) ||
      apk.fileName.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-[#020612] text-white selection:bg-pink-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-25">
        <div className="w-[900px] h-[550px] bg-gradient-to-br from-emerald-600/20 via-pink-600/15 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Cryptographically Verified Direct APKs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            INIXA Release Vault & <br />
            <span className="bg-gradient-to-r from-[#00ff87] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
              Binary Distribution Hub
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            All 15 standalone binaries compiled directly from our source repositories. No Google Play Services dependencies, no telemetry tracking, and signed with official developer certificates.
          </p>
        </div>

        {/* Security & Installation Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard glassLevel="card" className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">SHA-256 Verification</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every build includes an exact SHA-256 cryptographic digest. Verify checksums in terminal or package managers before installation.
            </p>
          </GlassCard>

          <GlassCard glassLevel="card" className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-pink-400" />
              <h3 className="text-sm font-bold text-white">Universal & ARM64-v8a</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Engineered with optimized 64-bit native binaries for Snapdragon 8 Elite, Dimensity 9400, and Google Tensor silicon.
            </p>
          </GlassCard>

          <GlassCard glassLevel="card" className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Zero Store Wrappers</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Self-contained APK packages that run offline forever. Direct installation on Android 8.0 through Android 15.
            </p>
          </GlassCard>
        </div>

        {/* Search filter */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search release vault by product or version..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
            />
          </div>
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Showing {filteredApks.length} of {ALL_APKS.length} verified packages
          </span>
        </div>

        {/* APK Table / Card List */}
        <div className="space-y-4">
          {filteredApks.map((apk, idx) => {
            const copyId = `hash-${idx}`
            const downloadCopyId = `url-${idx}`

            return (
              <GlassCard
                key={`${apk.productId}-${apk.version}-${idx}`}
                glassLevel="card"
                className="p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 border-white/10 hover:border-emerald-500/40 transition-colors"
              >
                {/* Left Information */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {apk.productName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      v{apk.version}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono bg-white/5 px-2.5 py-0.5 rounded-md">
                      {apk.abi}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono bg-white/5 px-2.5 py-0.5 rounded-md">
                      {apk.fileSize}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono bg-white/5 px-2.5 py-0.5 rounded-md">
                      Min SDK {apk.minSdk}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-mono break-all text-neutral-400">
                    File: <span className="text-neutral-200">{apk.fileName}</span>
                  </p>

                  {apk.sha256 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-neutral-500">SHA-256:</span>
                      <code className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20 max-w-md truncate">
                        {apk.sha256}
                      </code>
                      <button
                        onClick={() => handleCopy(apk.sha256!, copyId)}
                        className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                        title="Copy SHA-256 Hash"
                      >
                        {copiedId === copyId ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}

                  {apk.changelog && apk.changelog.length > 0 && (
                    <div className="pt-2 border-t border-white/5 text-xs text-neutral-400 space-y-1">
                      <span className="font-semibold text-neutral-300">Release Notes:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-neutral-400">
                        {apk.changelog.slice(0, 2).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() =>
                      handleCopy(`${window.location.origin}${apk.downloadPath}`, downloadCopyId)
                    }
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    title="Copy Direct Download Link"
                  >
                    {copiedId === downloadCopyId ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <GlassButton
                    href={apk.downloadPath}
                    variant="primary"
                    className="!py-3 !px-6 shadow-md shadow-emerald-500/20"
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download APK
                  </GlassButton>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
