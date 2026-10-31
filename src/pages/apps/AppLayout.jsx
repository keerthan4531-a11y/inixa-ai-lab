import { useState, useEffect } from 'react'
import { Link } from '../../router.jsx'
import Words from '../../components/Words.jsx'
import confetti from 'canvas-confetti'

export function AppLayout({ app, children }) {
  const [activeShot, setActiveShot] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${app.name} — INIXA LABS Official Dossier`
  }, [app.name])

  const handleDownload = (url) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#f59e0b', '#a855f7'],
    })
    window.location.href = url
  }

  const screenshots = app.screenshots || []
  const currentShot = screenshots[activeShot] || screenshots[0]

  return (
    <div style={{ minHeight: '100vh', background: '#020408', color: '#fff', position: 'relative' }}>
      {/* Dynamic ambient backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '600px',
          background: `radial-gradient(circle at 50% 20%, ${app.color}26 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Header */}
      <header
        style={{
          position: 'sticky',
          top: '16px',
          zIndex: 100,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            borderRadius: '9999px',
            background: 'rgba(10, 15, 24, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            <span style={{ color: 'var(--inixa-cyan)', fontSize: '18px' }}>←</span>
            <span>INIXA LABS HUB</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: app.accentGradient,
                color: '#fff',
              }}
            >
              {app.badge}
            </span>
            <button
              type="button"
              onClick={() => handleDownload(app.apks[0]?.downloadUrl)}
              className="inixa-btn-download"
              style={{ padding: '8px 18px', fontSize: '12px' }}
            >
              Get APK ({app.apks[0]?.size})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="shell" style={{ position: 'relative', zIndex: 1, paddingTop: '60px', paddingBottom: '100px' }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 50px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>{app.iconGlyph}</div>
          <h1 className="bigtitle" style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: '16px' }}>
            <Words text={app.name} />
          </h1>
          <p style={{ color: 'var(--inixa-cyan)', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
            {app.tagline}
          </p>
          <p style={{ color: 'var(--grey)', fontSize: '16px', lineHeight: 1.7, margin: '0 auto 30px' }}>
            {app.longDesc}
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {app.apks.map((apk, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDownload(apk.downloadUrl)}
                className="btn"
                style={{ padding: '14px 28px', fontSize: '14px' }}
              >
                <span>Download {apk.fileName}</span>
                <span style={{ opacity: 0.7, marginLeft: '8px' }}>({apk.size})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Device & Captured Screenshots Section */}
        <div
          style={{
            background: 'rgba(15, 20, 32, 0.6)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            padding: '40px',
            marginBottom: '60px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>
                High-Resolution Screen Gallery ({screenshots.length} Captures)
              </h2>
              <p style={{ color: 'var(--grey)', fontSize: '13px', margin: '6px 0 0' }}>
                Tap any thumbnail to preview on the device mockup or click the screen to enlarge.
              </p>
            </div>
            <span style={{ fontFamily: 'monospace', color: app.color, fontWeight: 700 }}>
              {activeShot + 1} / {screenshots.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 420px) 1fr',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Mockup screen */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="inixa-phone-mockup"
                style={{ cursor: 'pointer', maxWidth: '340px' }}
                onClick={() => setLightbox(currentShot)}
              >
                <div className="inixa-phone-screen">
                  {currentShot && (
                    <img
                      className="inixa-phone-img"
                      src={currentShot.src}
                      alt={currentShot.title}
                      loading="lazy"
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.92), transparent)',
                    }}
                  >
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700, margin: 0 }}>{currentShot?.title}</p>
                    <p style={{ color: 'var(--grey)', fontSize: '11px', margin: '4px 0 0' }}>{currentShot?.caption}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails list */}
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '12px',
                  maxHeight: '560px',
                  overflowY: 'auto',
                  paddingRight: '8px',
                }}
              >
                {screenshots.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveShot(idx)}
                    style={{
                      borderRadius: '12px',
                      border: idx === activeShot ? `2px solid ${app.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      aspectRatio: '9 / 16',
                      background: '#04070d',
                      position: 'relative',
                      boxShadow: idx === activeShot ? `0 0 20px ${app.color}40` : 'none',
                      transition: 'transform 0.2s, border-color 0.2s',
                    }}
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        insetInline: 0,
                        padding: '6px',
                        background: 'rgba(0,0,0,0.7)',
                        fontSize: '10px',
                        color: '#fff',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Application Deep Dive Body */}
        {children}

        {/* APK Architecture & Specs Matrix */}
        <div
          style={{
            marginTop: '60px',
            padding: '36px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
            Production Binary Specification
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--grey)', textTransform: 'uppercase', marginBottom: '4px' }}>Version</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{app.version}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--grey)', textTransform: 'uppercase', marginBottom: '4px' }}>Release Channel</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--inixa-cyan)' }}>{app.channel}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--grey)', textTransform: 'uppercase', marginBottom: '4px' }}>Binary Architecture</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{app.apks[0]?.arch}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px' }}>
              <div style={{ fontSize: '11px', color: 'var(--grey)', textTransform: 'uppercase', marginBottom: '4px' }}>Minimum Android OS</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{app.apks[0]?.minSdk}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2, 4, 8, 0.94)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: '-44px',
                right: '0',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              style={{
                maxHeight: '75vh',
                maxWidth: '100%',
                borderRadius: '18px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px', maxWidth: '600px' }}>
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: '0 0 6px' }}>{lightbox.title}</h4>
              <p style={{ color: 'var(--grey)', fontSize: '13px', margin: 0 }}>{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
