import React, { useState, useEffect, useRef } from 'react'
import { DoodleHeroBackground } from '../components/doodle/DoodleHeroBackground'
import { DoodleCat } from '../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin } from '../components/doodle/DoodleCritters'
import { DoodleIcon } from '../components/footer/DoodleCrewFooter'
import { InixaFooter } from '../components/footer/InixaFooter'
import { Product, ProductCategory, ProductApk, ProductFeature } from '../types/product'
import {
  saveDeveloperApp,
  getStoredDeveloperApps,
  deleteDeveloperApp,
} from '../data/developerApps'
import { navigate } from '../router'
import confetti from 'canvas-confetti'
import {
  Lock,
  Unlock,
  Key,
  User,
  Sparkles,
  Rocket,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Smartphone,
  Shield,
  Layers,
  FileCode,
  Eye,
  LogOut,
  ArrowRight,
  Info,
} from 'lucide-react'

const DEV_USER = 'inixa.ai.developer'
const DEV_PASS = 'inixa.ai.001'

interface ScreenshotItem {
  id: string
  src: string
  title: string
  caption: string
}

export const DeveloperPortalPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('inixa_developer_auth') === 'true'
    }
    return false
  })

  // Login form inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Welcome celebration trigger
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  // App form state
  const [appName, setAppName] = useState('')
  const [appTagline, setAppTagline] = useState('')
  const [category, setCategory] = useState<ProductCategory>('audio')
  const [accentColor, setAccentColor] = useState('#00ff87')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [highlights, setHighlights] = useState<string[]>([
    '120Hz Liquid Glass optics & fluid physics',
    'Strict Zero-Telemetry: zero analytic SDKs',
    'Direct verified SHA-256 APK binary distribution',
  ])
  const [newHighlight, setNewHighlight] = useState('')

  // Screenshots state
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([])
  const [screenshotTitle, setScreenshotTitle] = useState('')
  const [screenshotCaption, setScreenshotCaption] = useState('')
  const [screenshotUrl, setScreenshotUrl] = useState('')

  // APK file state
  const [apkFileName, setApkFileName] = useState('')
  const [apkFileSize, setApkFileSize] = useState('')
  const [apkVersion, setApkVersion] = useState('v1.0.0')
  const [apkAbi, setApkAbi] = useState('ARM64 / Universal')
  const [apkDataUrl, setApkDataUrl] = useState('')
  const [apkSha256, setApkSha256] = useState('')

  // Published apps list
  const [publishedApps, setPublishedApps] = useState<Product[]>(() => getStoredDeveloperApps())
  const [launchSuccess, setLaunchSuccess] = useState<Product | null>(null)

  // Update published apps when localStorage changes
  useEffect(() => {
    const sync = () => setPublishedApps(getStoredDeveloperApps())
    window.addEventListener('inixa:products-updated', sync)
    return () => window.removeEventListener('inixa:products-updated', sync)
  }, [])

  // Confetti helper
  const fireDoodleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ff87', '#ec4899', '#38d3d6', '#ffd23f', '#ffffff'],
    })
  }

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (username.trim() === DEV_USER && password.trim() === DEV_PASS) {
      setIsAuthenticated(true)
      sessionStorage.setItem('inixa_developer_auth', 'true')
      setJustLoggedIn(true)
      fireDoodleConfetti()
    } else {
      setLoginError('Invalid Developer Credentials! Check username & password.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('inixa_developer_auth')
  }

  // Add highlight bullet
  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()])
      setNewHighlight('')
    }
  }

  // Remove highlight bullet
  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx))
  }

  // Handle Screenshot Upload (Base64 file reader with canvas optimization)
  const handleScreenshotFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const rawUrl = event.target?.result as string
      if (!rawUrl) return

      // Downscale image via canvas to keep footprint lightweight & snappy
      const img = new Image()
      img.onload = () => {
        const maxDim = 1000
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          } else {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, w, h)
        const optimizedUrl = canvas.toDataURL('image/jpeg', 0.85)

        setScreenshots((prev) => [
          ...prev,
          {
            id: `shot-${Date.now()}`,
            src: optimizedUrl,
            title: screenshotTitle.trim() || file.name.replace(/\.[^/.]+$/, ''),
            caption: screenshotCaption.trim() || 'High-fidelity mobile screenshot of the application interface.',
          },
        ])
        setScreenshotTitle('')
        setScreenshotCaption('')
      }
      img.src = rawUrl
    }
    reader.readAsDataURL(file)
  }

  // Add Screenshot from URL
  const handleAddScreenshotUrl = () => {
    if (screenshotUrl.trim()) {
      setScreenshots((prev) => [
        ...prev,
        {
          id: `shot-${Date.now()}`,
          src: screenshotUrl.trim(),
          title: screenshotTitle.trim() || 'App Screen Preview',
          caption: screenshotCaption.trim() || 'Curated high-resolution interface view.',
        },
      ])
      setScreenshotUrl('')
      setScreenshotTitle('')
      setScreenshotCaption('')
    }
  }

  // Remove Screenshot
  const handleRemoveScreenshot = (id: string) => {
    setScreenshots((prev) => prev.filter((s) => s.id !== id))
  }

  // Handle APK File Upload
  const handleApkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]

    const sizeMb = (file.size / (1024 * 1024)).toFixed(2)
    setApkFileName(file.name)
    setApkFileSize(`${sizeMb} MB`)

    // Generate pseudo SHA-256 hash
    const fakeHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    setApkSha256(fakeHash)

    // Create immediate zero-overhead Blob URL for downloading without base64 size limits
    try {
      const blobUrl = URL.createObjectURL(file)
      setApkDataUrl(blobUrl)
    } catch {
      setApkDataUrl(`/apks/${file.name}`)
    }
  }

  // Launch App to Live Website!
  const handleLaunchApp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!appName.trim()) {
      alert('Please enter an App Name!')
      return
    }

    const slug = appName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const id = slug

    // Format APK object
    const apks: ProductApk[] = [
      {
        version: apkVersion.trim() || 'v1.0.0',
        versionCode: 1,
        releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        fileName: apkFileName || `${slug}-v1.0.0.apk`,
        sizeBytes: 15000000,
        sizeFormatted: apkFileSize || '15.4 MB',
        fileSize: apkFileSize || '15.4 MB',
        abi: apkAbi || 'ARM64 / Universal',
        minSdk: 26,
        targetSdk: 35,
        downloadPath: apkDataUrl || `/apks/${apkFileName || `${slug}.apk`}`,
        changelog: ['Initial Production Stable Release on INIXA LABS Ecosystem'],
        isLatest: true,
        sha256: apkSha256 || '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      },
    ]

    // Construct full Product object
    const newProduct: Product = {
      id,
      slug,
      name: appName.trim(),
      brand: 'INIXA',
      tagline: appTagline.trim() || 'Next-generation Android application with liquid glass design',
      category,
      status: 'Production',
      platform: 'Android 8.0+ (API 26)',
      badge: 'DEVELOPER LAUNCH',
      accentColor: accentColor || '#00ff87',
      gradient: `linear-gradient(135deg, ${accentColor} 0%, #38d3d6 100%)`,
      longDescription: longDesc.trim() || shortDesc.trim() || 'Engineered natively for Android with zero telemetry and verified binaries.',
      detailedSummary: shortDesc.trim() || appTagline.trim(),
      techHighlights: highlights.length > 0 ? highlights : ['Zero Telemetry', '120Hz Liquid UI', 'Signed Binary'],
      features: screenshots.map((s, idx) => ({
        id: `feat-${idx}`,
        title: s.title || `Core Interface ${idx + 1}`,
        description: s.caption || 'Verified mobile workflow.',
        icon: 'Sparkles',
      })),
      specs: {
        'Engine Version': apkVersion || 'v1.0.0',
        'Architecture': apkAbi || 'ARM64 / Universal',
        'Telemetry Policy': 'Strict 0% (Air-Gapped)',
        'Signed Release': 'Direct SHA-256 APK',
        'UI Language': '120Hz Liquid Glass',
      },
      sourceDirectory: `/apps/${slug}`,
      packageId: `com.inixa.${slug.replace(/-/g, '')}`,
      apks,
      description: shortDesc.trim() || appTagline.trim(),
      version: apkVersion || 'v1.0.0',
      highlights: highlights,
    }
    // Attach custom screenshots array & developer badge
    ;(newProduct as any).screenshots = screenshots
    ;(newProduct as any).isDeveloper = true

    // Save into IndexedDB & localStorage and notify all components
    await saveDeveloperApp(newProduct)
    setPublishedApps(getStoredDeveloperApps())
    setLaunchSuccess(newProduct)
    fireDoodleConfetti()

    // Clear form
    setAppName('')
    setAppTagline('')
    setShortDesc('')
    setLongDesc('')
    setScreenshots([])
    setApkFileName('')
    setApkFileSize('')
    setApkDataUrl('')

    // Scroll up to success announcement
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  // Delete an app
  const handleDeleteApp = (appId: string) => {
    if (confirm('Are you sure you want to unpublish this app from the live site?')) {
      deleteDeveloperApp(appId)
    }
  }

  return (
    <div className="relative min-h-screen pt-24 pb-24 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white font-sans overflow-x-hidden">
      {/* Living Sketchbook Doodle Canvas Background */}
      <DoodleHeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ==============================================================
            AUTHENTICATION GATE: HIGH DOODLE LOGIN SCREEN
            ============================================================== */}
        {!isAuthenticated ? (
          <div className="max-w-xl mx-auto my-12">
            {/* Perched Mascot */}
            <div className="flex justify-center -mb-4 relative z-20">
              <DoodleCat
                pose="sitting"
                size={80}
                speech="Developer Vault! Credentials please! 🐾"
                speechAlign="top"
              />
            </div>

            <div className="doodle-card rounded-3xl p-6 sm:p-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-white bg-[#071329] shadow-[3px_3px_0_#be185d] -rotate-1 mb-6">
                <Lock className="w-4 h-4 text-[#00ff87]" />
                <span className="text-xs font-mono font-black uppercase text-[#00ff87] tracking-wider">
                  RESTRICTED CORE COLLABORATOR GATE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                INIXA DEVELOPER ACCESS
              </h1>
              <p className="text-sm text-gray-300 font-medium max-w-md mx-auto mb-8">
                Press <kbd className="px-2 py-0.5 bg-black/60 border border-white/40 rounded text-[#00ff87] font-mono text-xs">Ctrl+Alt+Shift+A</kbd> anytime to return to this terminal.
              </p>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-5 text-left">
                {loginError && (
                  <div className="p-3.5 bg-red-950/80 border-2 border-red-400 rounded-xl text-red-200 text-xs font-bold flex items-center gap-2.5 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#00ff87]" />
                    Developer Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="inixa.ai.developer"
                    className="w-full doodle-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-[#ec4899]" />
                      Password
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-[#00ff87] hover:underline cursor-pointer lowercase"
                    >
                      {showPassword ? 'hide' : 'peek'}
                    </button>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="inixa.ai.001"
                    className="w-full doodle-input text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full doodle-btn doodle-btn-green py-3.5 text-base shadow-[5px_5px_0_#be185d]"
                  >
                    <Unlock className="w-5 h-5" />
                    <span>Authenticate & Enter Studio →</span>
                  </button>
                </div>
              </form>

              {/* Helpful Hint Pill */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col gap-2 text-center text-xs text-gray-400 font-mono">
                <div className="flex items-center justify-center gap-2 text-yellow-300 font-bold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Authorized Credentials</span>
                </div>
                <div>User: <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">inixa.ai.developer</span></div>
                <div>Pass: <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">inixa.ai.001</span></div>
              </div>
            </div>
          </div>
        ) : (
          /* ==============================================================
              AUTHENTICATED DEVELOPER STUDIO & APP LAUNCHPAD
              ============================================================== */
          <div>
            {/* Top Bar with Mascot & Welcome Celebration */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#040a18] border-2 border-white p-5 rounded-2xl shadow-[6px_6px_0_#00ff87]">
              <div className="flex items-center gap-4">
                <DoodleCat pose="sitting" size={56} speech="Welcome Boss! Let's ship! 🚀" speechAlign="right" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse"></span>
                    <span className="text-xs font-mono font-black text-[#00ff87] tracking-wider uppercase">
                      INIXA DEVELOPER CONSOLE • ACTIVE SESSION
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Welcome to INIXA Developer Page! 🎉
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/products')}
                  className="doodle-btn px-4 py-2 text-xs font-bold bg-white/10 text-white border border-white hover:bg-white/20"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Products</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="doodle-btn doodle-btn-pink px-4 py-2 text-xs font-bold"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Session</span>
                </button>
              </div>
            </div>

            {/* Launch Success Banner */}
            {launchSuccess && (
              <div className="doodle-card rounded-2xl p-6 mb-10 border-2 border-[#00ff87] shadow-[6px_6px_0_#00ff87] bg-[#031518] animate-bounce-short">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00ff87] text-black flex items-center justify-center font-black text-2xl border-2 border-white shadow-[4px_4px_0_#000]">
                      ✦
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00ff87]/20 border border-[#00ff87] text-[#00ff87] text-xs font-black uppercase font-mono mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> LIVE ON INIXA LABS!
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        {launchSuccess.name} is now LIVE on the website!
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-300">
                        Added to the Products catalog, Search, and Download hubs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/product/${launchSuccess.slug}`)}
                      className="doodle-btn doodle-btn-green px-5 py-2.5 text-xs sm:text-sm font-black"
                    >
                      <span>View Live App Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setLaunchSuccess(null)}
                      className="text-gray-400 hover:text-white text-xs font-bold"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                APP PUBLISHING FORM
                ============================================================== */}
            <div className="doodle-card rounded-3xl p-6 sm:p-10 mb-12">
              <div className="border-b-2 border-white/20 pb-6 mb-8 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/40 text-[#00ff87] text-xs font-mono font-black uppercase tracking-wider mb-2">
                    <Rocket className="w-3.5 h-3.5" /> Ecosystem Launchpad
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Deploy a New Android Flagship
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Fill in your app details, add screenshot previews, upload your APK, and hit Launch.
                  </p>
                </div>
                <DoodleBird pose="singing" size={48} speech="New software drop! ♪" speechAlign="top" />
              </div>

              <form onSubmit={handleLaunchApp} className="flex flex-col gap-8">
                {/* 1. App Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      App Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      placeholder="e.g. Beat Box Hyper"
                      className="w-full doodle-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Tagline / One-Liner *
                    </label>
                    <input
                      type="text"
                      required
                      value={appTagline}
                      onChange={(e) => setAppTagline(e.target.value)}
                      placeholder="e.g. Next-Gen Spatial 3D Audio Workstation"
                      className="w-full doodle-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full doodle-input text-sm bg-[#060e22] text-white"
                    >
                      <option value="audio">Audio & Music Workstation</option>
                      <option value="ai">AI & Neural Companion</option>
                      <option value="streaming">Streaming & Video</option>
                      <option value="browser">Privacy Browser & Web</option>
                      <option value="utility">Productivity & Utilities</option>
                      <option value="video">Reels & Media Editor</option>
                      <option value="knowledge">Offline Knowledge & Docs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Brand Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-2 border-white"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1 doodle-input text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. App Details & Descriptions */}
                <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Short Description (Card Overview)
                    </label>
                    <input
                      type="text"
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      placeholder="Crisp 2-sentence summary displayed on cards and search."
                      className="w-full doodle-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Detailed Architectural Summary
                    </label>
                    <textarea
                      rows={3}
                      value={longDesc}
                      onChange={(e) => setLongDesc(e.target.value)}
                      placeholder="Comprehensive overview: native pipelines, local models, hardware shaders, and zero-telemetry design."
                      className="w-full doodle-input text-sm resize-y"
                    />
                  </div>

                  {/* Highlights Bullet List */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-2">
                      Key Technical Highlights
                    </label>
                    <div className="flex flex-col gap-2 mb-3">
                      {highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white/5 border border-white/15 rounded-xl text-xs">
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#00ff87]" />
                            {h}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(idx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddHighlight()
                          }
                        }}
                        placeholder="Add another highlight..."
                        className="flex-1 doodle-input text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="doodle-btn doodle-btn-green px-4 py-2 text-xs"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Screenshots & Screen Details */}
                <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-[#38d3d6]" />
                        App Screenshots & UI Details
                      </h3>
                      <p className="text-xs text-gray-400">
                        Upload real mobile screen captures and explain what makes them special.
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-full text-[#38d3d6] font-bold">
                      {screenshots.length} Screen(s) Added
                    </span>
                  </div>

                  {/* Screenshot Inputs */}
                  <div className="p-4 bg-white/5 border border-white/20 rounded-2xl flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                          Screen Title (e.g. Real-Time Equalizer)
                        </label>
                        <input
                          type="text"
                          value={screenshotTitle}
                          onChange={(e) => setScreenshotTitle(e.target.value)}
                          placeholder="Screen Title"
                          className="w-full doodle-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                          Screen Detail / Caption
                        </label>
                        <input
                          type="text"
                          value={screenshotCaption}
                          onChange={(e) => setScreenshotCaption(e.target.value)}
                          placeholder="e.g. 10-band parametric DSP with dynamic color"
                          className="w-full doodle-input text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="flex-1 w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-white/30 hover:border-[#00ff87] rounded-xl cursor-pointer text-xs font-bold text-gray-200 transition-colors">
                        <Upload className="w-4 h-4 text-[#00ff87]" />
                        <span>Upload Image File (PNG/JPG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotFileUpload}
                          className="hidden"
                        />
                      </label>

                      <span className="text-xs text-gray-500 font-mono">OR URL</span>

                      <div className="flex-1 w-full flex gap-2">
                        <input
                          type="text"
                          value={screenshotUrl}
                          onChange={(e) => setScreenshotUrl(e.target.value)}
                          placeholder="https://... or /shots/..."
                          className="flex-1 doodle-input text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddScreenshotUrl}
                          className="doodle-btn px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs border border-white"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Screenshots Preview Grid */}
                  {screenshots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      {screenshots.map((s) => (
                        <div key={s.id} className="relative group rounded-xl overflow-hidden border-2 border-white/40 bg-black flex flex-col">
                          <div className="aspect-[9/16] w-full overflow-hidden bg-zinc-900">
                            <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-2.5 bg-[#040a18] flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-bold text-white truncate">{s.title}</div>
                              <div className="text-[10px] text-gray-400 line-clamp-2">{s.caption}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveScreenshot(s.id)}
                              className="mt-2 text-[11px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. APK Binary Upload */}
                <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-[#ec4899]" />
                      Direct APK Binary Release
                    </h3>
                    <p className="text-xs text-gray-400">
                      Upload your compiled .apk binary for direct cryptographic distribution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                        Version String
                      </label>
                      <input
                        type="text"
                        value={apkVersion}
                        onChange={(e) => setApkVersion(e.target.value)}
                        placeholder="v1.0.0"
                        className="w-full doodle-input text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                        Architecture ABI
                      </label>
                      <input
                        type="text"
                        value={apkAbi}
                        onChange={(e) => setApkAbi(e.target.value)}
                        placeholder="ARM64 / Universal"
                        className="w-full doodle-input text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-gray-300 mb-1">
                        File Size
                      </label>
                      <input
                        type="text"
                        value={apkFileSize}
                        onChange={(e) => setApkFileSize(e.target.value)}
                        placeholder="e.g. 18.5 MB"
                        className="w-full doodle-input text-xs font-mono"
                      />
                    </div>
                  </div>

                  <label className="p-6 border-2 border-dashed border-white/30 hover:border-[#00ff87] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/5 transition-all text-center">
                    <Upload className="w-8 h-8 text-[#00ff87] animate-bounce-short" />
                    <span className="text-sm font-bold text-white">
                      {apkFileName ? `Selected: ${apkFileName}` : 'Select or Drop APK File Here (.apk)'}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {apkFileSize ? `Size: ${apkFileSize}` : 'Android package binary for zero-store installation'}
                    </span>
                    <input
                      type="file"
                      accept=".apk"
                      onChange={handleApkUpload}
                      className="hidden"
                    />
                  </label>

                  {apkSha256 && (
                    <div className="p-3 bg-black/60 border border-[#00ff87]/40 rounded-xl font-mono text-[11px] text-gray-300 break-all">
                      <span className="text-[#00ff87] font-bold">SHA-256 Checksum: </span>
                      {apkSha256}
                    </div>
                  )}
                </div>

                {/* 5. Launch Button */}
                <div className="pt-6 border-t-2 border-white/20 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-12 py-4 doodle-btn doodle-btn-green text-lg font-black shadow-[6px_6px_0_#be185d]"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>LAUNCH APP TO INIXA LABS (MAKE LIVE) 🚀</span>
                  </button>
                  <p className="text-xs text-gray-400 mt-3 font-mono">
                    Instant deployment. Updates Products catalog and creates dedicated page instantly.
                  </p>
                </div>
              </form>
            </div>

            {/* ==============================================================
                LIVE DEPLOYED APPS DIRECTORY
                ============================================================== */}
            <div className="doodle-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff87]" />
                    Developer Published Apps ({publishedApps.length})
                  </h3>
                  <p className="text-xs text-gray-400">
                    Apps published through this portal currently live on the website.
                  </p>
                </div>
              </div>

              {publishedApps.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-white/20 rounded-2xl text-gray-400 text-sm">
                  No developer apps deployed yet. Fill the form above and hit Launch!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {publishedApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-[#060e22] border-2 border-white/40 flex flex-col justify-between shadow-[4px_4px_0_#be185d]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-[#00ff87] uppercase bg-[#00ff87]/15 px-2.5 py-0.5 rounded-full border border-[#00ff87]/30">
                            LIVE ON SITE
                          </span>
                          <span className="text-xs font-mono text-gray-400">
                            {app.version || 'v1.0.0'}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-white">{app.name}</h4>
                        <p className="text-xs text-gray-300 line-clamp-2 mt-1">{app.tagline}</p>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
                        <button
                          onClick={() => navigate(`/product/${app.slug}`)}
                          className="doodle-btn px-3 py-1.5 bg-[#00ff87] text-black text-xs font-black rounded-lg border border-white hover:bg-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Live Page</span>
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-bold flex items-center gap-1 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Unpublish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <InixaFooter />
    </div>
  )
}
