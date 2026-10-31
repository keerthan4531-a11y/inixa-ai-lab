import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Changelog from './components/Changelog.jsx'
import { AnnounceBar, RELEASE_PATH, SiteFooter, TopBar } from './components/Chrome.jsx'
import Dock from './components/Dock.jsx'
import Features from './components/Features.jsx'
import Words from './components/Words.jsx'
import HighlightSlider from './components/HighlightSlider.jsx'
import Segments from './components/Segments.jsx'
import KeyHero from './components/KeyHero.jsx'
import {
  ABOUT_FACTS,
  APK_URL,
  FEATURES,
  LYRICS_VIDEO,
  OPEN_FACTS,
  SHOT304,
  SHOTS_304,
  VERSION,
} from './content.js'
import { MasterGallery } from './components/MasterGallery.jsx'
import { APP_HIGHLIGHTS } from './data/appHighlights.js'
import { PRODUCTS, ALL_APKS, CATEGORIES } from './data/inixaProducts.js'
import { useHeroScroll, useOnScreen, useReveals, prefersReducedMotion } from './hooks.js'
import { Link } from './router.jsx'
import confetti from 'canvas-confetti'

/** Verified mobile captures for Beat Box Ultra. */
const SHOT_405 = {
  artist: { src: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg', alt: "Artist page: full bleed portrait, discography, and top songs." },
  settings: { src: '/shots/beat-box-ultra/40df8515-0ee9-4b7b-882a-e52e01e4ffed.jpg', alt: 'Library: playlists, artists, albums as grouped glass tables.' },
  about: { src: '/shots/beat-box-ultra/f2261d8f-11de-4007-bea3-c214bffd989a.jpg', alt: 'Self-Updating Engine: direct verified APK builds without store wrappers.' },
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'labs', label: 'INIXA Labs' },
  { id: 'showcase', label: '3D Hardware' },
  { id: 'highlights', label: 'Get Highlights' },
  { id: 'gallery', label: '76 Screens' },
  { id: 'film', label: 'Ultra fluid' },
  { id: 'lyrics', label: 'Lyrics' },
  { id: 'apks', label: 'All 13 APKs' },
  { id: 'features', label: 'Architecture' },
  { id: 'download', label: 'Get Started' },
]

/* ------------------------------------------------------------------ bars */

function Bars({ active, onSelect }) {
  return (
    <>
      <AnnounceBar />
      <TopBar />
      <div className="segbar">
        <Segments items={SECTIONS} active={active} onSelect={onSelect} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------ highlights */

const HIGHLIGHTS = [
  { shot: { src: '/shots/beat-box-ultra/8eb12ee5-c42f-41e5-8c91-d06b78bb0975.jpg', alt: 'Discover & Trending: curated regional and global tracks.' }, lead: 'Home leads with what you play.', rest: 'Curated playlists and trending hits adapt to your personal listening habits.' },
  { shot: { src: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg', alt: 'The player tinted from the cover: controls in warm amber tone.' }, lead: 'The song brings its own color.', rest: 'The cover fills the player, and the controls take their tint dynamically from it.' },
  { shot: { src: '/shots/beat-box-ultra/2fad8277-eb9b-4086-8987-8fc10994c123.jpg', alt: 'Live synchronized word-by-word lyrics.' }, lead: 'Lyrics land on the word.', rest: 'The line being sung lights up as it is sung, and the rest fall out of focus.' },
  { shot: { src: '/shots/beat-box-ultra/771e40e7-49f2-45f4-9e66-44dd9be635b8.jpg', alt: 'Offline Vault: songs saved to the phone, ready with no network.' }, lead: 'It plays with the radio off.', rest: 'Downloads play with no network at all, cover edge to edge.' },
  { shot: SHOT_405.artist, lead: 'Artists, the way they should look.', rest: 'Portrait, story and the songs that matter, on one page.' },
  { shot: SHOT_405.settings, lead: 'One material, everywhere.', rest: 'Grouped glass tables all the way down to Settings.' },
  { shot: SHOT_405.about, lead: 'It updates itself.', rest: 'Check, download and install without leaving the app.' },
]

/* ------------------------------------------------------------------ film */

function Film({ running }) {
  const section = useRef(null)
  const video = useRef(null)
  const live = useOnScreen(section, '0px')

  useEffect(() => {
    const node = section.current
    if (!node) return undefined
    const reduced = prefersReducedMotion()
    let frame = 0

    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const run = Math.max(1, rect.height - window.innerHeight)
      const p = Math.min(1, Math.max(0, -rect.top / run))
      node.style.setProperty('--scroll-p', p.toFixed(4))
    }

    if (reduced) {
      node.style.setProperty('--scroll-p', '1')
    } else {
      update()
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        if (frame) cancelAnimationFrame(frame)
      }
    }
  }, [])

  useEffect(() => {
    const el = video.current
    if (!el) return
    if (live && running && !prefersReducedMotion()) {
      const p = el.play()
      if (p?.catch) p.catch(() => {})
    } else {
      el.pause()
    }
  }, [live, running])

  return (
    <section className="film" id="film" ref={section}>
      <div className="film-pin">
        <div className="film-card">
          <video
            ref={video}
            className="film-video"
            src="/media/film-405.mp4"
            poster="/media/film-405-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="film-overlay">
            <p className="kicker">Liquid Glass Engine</p>
            <h2 className="headline">
              <Words text="Ultra fluid. Smooth to the touch." />
            </h2>
            <p className="lede">
              Hardware-accelerated ColorOS blur shaders running at a locked 120Hz display refresh rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ lyrics panel */

function LyricsPanel({ running }) {
  const [active, setActive] = useState(2)

  return (
    <div className="lyrics-panel" id="lyrics">
      <div className="lyrics-copy">
        <p className="kicker">Synchronized Typography</p>
        <h2 className="headline">
          <Words text="Lyrics that land on the beat." />
        </h2>
        <p className="lede">
          Synced word by word. The line being sung lights up in warm gold, while the rest fall into soft focus.
        </p>
        <div className="btnrow" style={{ marginTop: '24px' }}>
          <a className="btn" href="/apks/beat-box-ultra-v1.0.405-arm64.apk" download>
            Download Beat Box Ultra
          </a>
        </div>
      </div>

      <div className="lyrics-stage">
        <video
          className="lyrics-video"
          src={LYRICS_VIDEO.src}
          poster={LYRICS_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- main App component */

export default function App() {
  const [ambient, setAmbient] = useState(!prefersReducedMotion())
  const [section, setSection] = useState(0)
  const [notes, setNotes] = useState(false)

  // INIXA Labs interactive state
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStageApp, setActiveStageApp] = useState(0)
  const [activeStageShot, setActiveStageShot] = useState(0)
  const [lightboxShot, setLightboxShot] = useState(null)
  const [highlightAppKey, setHighlightAppKey] = useState('beat-box-ultra')

  const currentHighlightsData = APP_HIGHLIGHTS[highlightAppKey] || APP_HIGHLIGHTS['beat-box-ultra']

  const closeNotes = useCallback(() => setNotes(false), [])
  const openNotes = useCallback(() => setNotes(true), [])

  useReveals()
  useHeroScroll()

  // Scroll spy
  const pending = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (pending.current) {
            if (entry.target.id !== pending.current) return
            pending.current = null
          }
          const index = SECTIONS.findIndex((s) => s.id === entry.target.id)
          if (index >= 0) setSection(index)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    SECTIONS.forEach(({ id }) => {
      const node = document.getElementById(id)
      if (node) io.observe(node)
    })
    return () => io.disconnect()
  }, [])

  const goToSection = (index) => {
    pending.current = SECTIONS[index]?.id ?? null
    setSection(index)
    const el = document.getElementById(SECTIONS[index]?.id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => {
      pending.current = null
    }, 1400)
  }

  // Filter products for Google Labs grid
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCat === 'all' || p.category === activeCat
      const q = searchQuery.toLowerCase().trim()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [activeCat, searchQuery])

  const stageApp = PRODUCTS[activeStageApp] || PRODUCTS[0]
  const stageShots = stageApp.screenshots || []
  const currentStageShot = stageShots[activeStageShot] || stageShots[0]

  const triggerDownload = (url) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#3b82f6', '#f59e0b', '#a855f7'],
    })
    window.location.href = url
  }

  return (
    <div id="top">
      <Bars active={section} onSelect={goToSection} />

      <main>
        {/* 1. KEY HERO */}
        <KeyHero
          id="overview"
          version="2.4"
          fullVersion="INIXA LABS"
          name="INIXA LABS"
          line="Frontiers of AI & Flagship Mobile Software."
          title="Where Generative AI Meets Flagship Craftsmanship."
          body="Explore 8 production-grade mobile applications and 13 direct APK binaries. Engineered with liquid glass aesthetics, uncompressed audio engines, and zero telemetry."
          primary={
            <a className="kh-pill" href="#apks">
              Download All 13 APKs
            </a>
          }
          secondary={
            <a className="kh-link" href="#labs">
              Explore INIXA Labs ›
            </a>
          }
        />

        {/* 2. GOOGLE LABS INSPIRED EXPERIMENT DIRECTORY */}
        <section className="tour shell" id="labs" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div>
            <div className="inixa-kicker">
              ✦ GOOGLE LABS INSPIRED DIRECTORY
            </div>
            <h2 className="inixa-title">
              <Words text="8 Flagship Applications & AI Models." />
            </h2>
            <p className="inixa-desc">
              Every application below is built natively for Android with production-grade performance, verified screenshots, and direct APK download binaries.
            </p>

            {/* Category filter pills */}
            <div className="inixa-filter-row">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`inixa-pill ${activeCat === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="inixa-pill-count">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="inixa-grid">
              {filteredProducts.map((app) => (
                <article key={app.id} className="inixa-card">
                  <span
                    className="inixa-card-accent"
                    style={{ background: app.accentGradient }}
                  />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        className="inixa-badge"
                        style={{ background: app.accentGradient }}
                      >
                        {app.badge}
                      </span>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--grey)' }}>
                        {app.version}
                      </span>
                    </div>

                    {/* Screenshot Preview */}
                    <div
                      className="inixa-screen-box"
                      onClick={() => setLightboxShot(app.screenshots[0])}
                    >
                      <img
                        className="inixa-screen-img"
                        src={app.screenshots[0]?.src}
                        alt={app.name}
                        loading="lazy"
                      />
                      <span className="inixa-screen-count">
                        {app.screenshots.length} Screens 🔍
                      </span>
                    </div>

                    <h3 className="inixa-card-title">{app.name}</h3>
                    <p className="inixa-card-tagline">{app.tagline}</p>
                    <p className="inixa-card-desc">{app.shortDesc}</p>

                    {/* Highlights */}
                    <div className="inixa-bullets">
                      {app.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="inixa-bullet-item">
                          <span className="inixa-bullet-dot">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="inixa-card-actions">
                    <button
                      type="button"
                      className="inixa-btn-view"
                      onClick={() => setLightboxShot(app.screenshots[0])}
                    >
                      Inspect Gallery
                    </button>

                    <button
                      type="button"
                      className="inixa-btn-download"
                      onClick={() => triggerDownload(app.apks[0].downloadUrl)}
                    >
                      <span>Get APK ({app.apks[0].size})</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE 3D HARDWARE DISPLAY STAGE */}
        <section className="shell" id="showcase" style={{ paddingBottom: '90px' }}>
          <div className="inixa-stage-box">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="inixa-kicker">
                📱 INTERACTIVE HARDWARE SHOWCASE
              </div>
              <h2 className="headline">
                <Words text="Experience our apps in simulated 3D." />
              </h2>
              <p className="lede" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
                Toggle through any of our 8 flagship applications to inspect the actual software running on an Android device.
              </p>
            </div>

            {/* App switcher */}
            <div className="inixa-app-switcher">
              {PRODUCTS.map((app, idx) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setActiveStageApp(idx)
                    setActiveStageShot(0)
                  }}
                  className={`inixa-switch-btn ${idx === activeStageApp ? 'active' : ''}`}
                >
                  <span>{app.iconGlyph}</span>
                  <span style={{ marginLeft: '6px' }}>{app.name}</span>
                </button>
              ))}
            </div>

            {/* Phone layout */}
            <div className="inixa-phone-layout">
              {/* Left details */}
              <div>
                <span className="inixa-badge" style={{ background: stageApp.accentGradient }}>
                  {stageApp.badge}
                </span>
                <h3 className="headline-sm" style={{ color: 'var(--ink)', marginBottom: '8px' }}>
                  {stageApp.name}
                </h3>
                <p style={{ color: 'var(--inixa-cyan)', fontSize: '14px', fontWeight: 600, marginBottom: '14px' }}>
                  {stageApp.tagline}
                </p>
                <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {stageApp.longDesc}
                </p>

                <div className="btnrow">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => triggerDownload(stageApp.apks[0].downloadUrl)}
                  >
                    Download {stageApp.apks[0].fileName} ({stageApp.apks[0].size})
                  </button>
                </div>
              </div>

              {/* Center phone */}
              <div className="inixa-phone-mockup">
                <div className="inixa-phone-screen">
                  {currentStageShot && (
                    <img
                      className="inixa-phone-img"
                      src={currentStageShot.src}
                      alt={currentStageShot.title}
                      onClick={() => setLightboxShot(currentStageShot)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    }}
                  >
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                      {currentStageShot?.title}
                    </p>
                    <p style={{ color: 'var(--grey)', fontSize: '11px' }}>
                      {currentStageShot?.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right thumbnail strip */}
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--grey)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Captured Screens ({stageShots.length})
                </p>
                <div className="inixa-screen-strip">
                  {stageShots.map((shot, idx) => (
                    <div
                      key={idx}
                      className={`inixa-thumb-card ${idx === activeStageShot ? 'active' : ''}`}
                      onClick={() => setActiveStageShot(idx)}
                    >
                      <img src={shot.src} alt={shot.title} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MULTI-APP GET THE HIGHLIGHTS SHOWCASE */}
        <section id="highlights" style={{ paddingTop: '50px', paddingBottom: '30px' }}>
          <div className="shell" style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="inixa-kicker">✨ GET THE HIGHLIGHTS · SELECT ANY APP</div>
            <h2 className="headline" style={{ color: 'var(--ink)' }}>
              <Words text={`Explore ${currentHighlightsData.appName} Feature Reel.`} />
            </h2>
            <p className="lede" style={{ maxWidth: '680px', margin: '10px auto 20px' }}>
              {currentHighlightsData.lede}
            </p>

            {/* App Selector Switcher */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setHighlightAppKey(prod.id)}
                  className={`inixa-switch-btn ${highlightAppKey === prod.id ? 'active' : ''}`}
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  <span>{prod.iconGlyph}</span>
                  <span style={{ marginLeft: '6px' }}>{prod.name}</span>
                </button>
              ))}
            </div>

            {/* Direct Link to Dedicated App Dossier Page */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <Link
                to={
                  highlightAppKey === 'beat-box-ultra'
                    ? '/app/beat-box-ultra'
                    : highlightAppKey === 'inixa-ai'
                    ? '/app/inixa-ai'
                    : highlightAppKey === 'beat-pro'
                    ? '/app/beat-box-pro'
                    : highlightAppKey === 'beat-box-lite'
                    ? '/app/beat-box-lite'
                    : highlightAppKey === 'liquid-streaming'
                    ? '/app/liquid-stream'
                    : highlightAppKey === 'clipster'
                    ? '/app/clipster'
                    : highlightAppKey === 'lumina'
                    ? '/app/lumina'
                    : '/app/my-tube'
                }
                className="inixa-btn-view"
                style={{ padding: '10px 24px', fontSize: '13px', textDecoration: 'none' }}
              >
                Open {currentHighlightsData.appName} Full Dossier &amp; Page →
              </Link>
            </div>
          </div>

          <HighlightSlider items={currentHighlightsData.highlights} key={highlightAppKey} />
        </section>

        {/* 5. MASTER 76-SCREENSHOT ARCHIVE EXPO */}
        <MasterGallery onInspect={(shot) => setLightboxShot(shot)} />

        {/* 5. ULTRA FLUID FILM */}
        <Film running={ambient} />

        {/* 6. SYNCHRONIZED LYRICS */}
        <div className="tour shell">
          <LyricsPanel running={ambient} />
        </div>

        {/* 7. ALL 13 APK DOWNLOADS REPOSITORY */}
        <section className="shell" id="apks" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div>
            <div className="inixa-kicker">
              ⬇ DIRECT ANDROID BINARY REPOSITORY
            </div>
            <h2 className="inixa-title">
              <Words text="All 13 Official APK Releases." />
            </h2>
            <p className="inixa-desc">
              Download any architecture variant (ARM64-v8a, Universal, or FOSS) directly without app stores, trackers, or middleman wrappers.
            </p>

            <div className="inixa-table-wrap">
              <table className="inixa-table">
                <thead>
                  <tr>
                    <th>Application & Binary</th>
                    <th>Architecture</th>
                    <th>Type / Channel</th>
                    <th>Size</th>
                    <th>Min OS</th>
                    <th style={{ textAlign: 'right' }}>Direct Download</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_APKS.map((apk, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '18px', color: apk.appColor }}>
                            {apk.iconGlyph}
                          </span>
                          <div>
                            <div className="inixa-apk-name">{apk.appName}</div>
                            <div className="inixa-apk-file">{apk.fileName}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="inixa-arch-badge">{apk.arch}</span>
                      </td>
                      <td>
                        <span style={{ color: 'var(--grey)', fontSize: '12px' }}>{apk.type}</span>
                      </td>
                      <td>
                        <span className="inixa-size">{apk.size}</span>
                      </td>
                      <td>
                        <span style={{ color: 'var(--grey)', fontFamily: 'monospace' }}>{apk.minSdk}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="inixa-btn-download"
                          style={{ padding: '8px 14px', fontSize: '11px' }}
                          onClick={() => triggerDownload(apk.downloadUrl)}
                        >
                          Download APK
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. ECOSYSTEM FEATURES */}
        <section className="tour-features shell" id="features">
          <h2 className="bigtitle">
            <Words text="Engineered for Performance." />
          </h2>
          <Features items={FEATURES} />
        </section>

        {/* 9. FINALE DOWNLOAD SECTION */}
        <section className="finale shell" id="download">
          <div className="getit">
            <img className="getit-icon reveal" src="/logo.svg" alt="INIXA LABS" width="96" height="96" />
            <h2 className="headline">
              <Words text="Put INIXA on your phone." />
            </h2>
            <p className="lede reveal" style={{ '--d': '160ms' }}>
              8 high-performance applications. 13 verified APK binaries.
              No account, no ads, and nothing phoning home.
            </p>

            <div className="btnrow reveal" style={{ '--d': '240ms' }}>
              <a className="btn" href="#apks">
                Download All APKs
              </a>
              <button type="button" className="btn btn-ghost" onClick={openNotes}>
                What&rsquo;s new in 2026
              </button>
            </div>

            <dl className="facts reveal" style={{ '--d': '300ms' }}>
              {ABOUT_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="open">
            <div className="open-copy reveal">
              <p className="ft-kicker">Open Architecture</p>
              <h3 className="ft-title">Crafted for Freedom & Privacy.</h3>
              <dl className="open-facts">
                {OPEN_FACTS.map((fact) => (
                  <div key={fact.value}>
                    <dt>{fact.value}</dt>
                    <dd>{fact.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="open-build reveal" style={{ '--d': '90ms' }}>
              <p className="ft-kicker">Build it yourself</p>
              <pre className="code">
                <b>git</b> clone https://github.com/inixa-labs/core.git{'\n'}
                <b>cd</b> inixa-labs{'\n'}
                <b>./gradlew</b> assembleRelease
              </pre>
              <p className="subnote">
                Sideloading asks for permission once; all INIXA applications update seamlessly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <SiteFooter onNotes={openNotes} />

      {/* CHANGELOG SHEET */}
      <Changelog open={notes} onClose={closeNotes} />

      {/* LIGHTBOX MODAL */}
      {lightboxShot && (
        <div
          className="inixa-modal-backdrop"
          onClick={() => setLightboxShot(null)}
        >
          <div
            className="inixa-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inixa-modal-header">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                  {lightboxShot.title || 'Screenshot Preview'}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--grey)' }}>
                  {lightboxShot.caption}
                </p>
              </div>
              <button
                type="button"
                className="inixa-close-btn"
                onClick={() => setLightboxShot(null)}
              >
                ✕ Close
              </button>
            </div>

            <div className="inixa-modal-body" style={{ textAlign: 'center' }}>
              <img
                src={lightboxShot.src}
                alt={lightboxShot.title}
                style={{
                  maxHeight: '70vh',
                  maxWidth: '100%',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                  display: 'inline-block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
