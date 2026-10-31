import { useState, useMemo } from 'react'
import { PRODUCTS } from '../data/inixaProducts.js'
import Words from '../components/Words.jsx'

export function MasterGallery({ onInspect }) {
  const [selectedApp, setSelectedApp] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Flatten all 76 screenshots with parent app metadata
  const allScreenshots = useMemo(() => {
    const list = []
    PRODUCTS.forEach((product) => {
      (product.screenshots || []).forEach((shot, idx) => {
        list.push({
          ...shot,
          appId: product.id,
          appName: product.name,
          appBadge: product.badge,
          appColor: product.color,
          accentGradient: product.accentGradient,
          apkUrl: product.apks[0]?.downloadUrl,
          index: idx + 1,
          total: product.screenshots.length,
        })
      })
    })
    return list
  }, [])

  const filteredScreenshots = useMemo(() => {
    return allScreenshots.filter((item) => {
      const matchApp = selectedApp === 'all' || item.appId === selectedApp
      const query = searchQuery.toLowerCase().trim()
      const matchQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.caption.toLowerCase().includes(query) ||
        item.appName.toLowerCase().includes(query)
      return matchApp && matchQuery
    })
  }, [allScreenshots, selectedApp, searchQuery])

  return (
    <section className="shell" id="gallery" style={{ paddingTop: '80px', paddingBottom: '90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="inixa-kicker">📸 THE COMPLETE 76-SCREENSHOT ARCHIVE</div>
        <h2 className="headline" style={{ color: 'var(--ink)' }}>
          <Words text="Every pixel captured from live devices." />
        </h2>
        <p className="lede" style={{ maxWidth: '720px', margin: '14px auto 0' }}>
          Explore all 76 real, unedited screenshots captured directly from physical Android hardware across our entire 8-application ecosystem.
        </p>
      </div>

      {/* App Filter Selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedApp('all')}
          className={`inixa-pill ${selectedApp === 'all' ? 'active' : ''}`}
        >
          <span>All Apps</span>
          <span className="inixa-pill-count">{allScreenshots.length}</span>
        </button>

        {PRODUCTS.map((prod) => (
          <button
            key={prod.id}
            type="button"
            onClick={() => setSelectedApp(prod.id)}
            className={`inixa-pill ${selectedApp === prod.id ? 'active' : ''}`}
          >
            <span>{prod.name}</span>
            <span className="inixa-pill-count">{prod.screenshots?.length || 0}</span>
          </button>
        ))}
      </div>

      {/* Live Search Bar */}
      <div style={{ maxWidth: '460px', margin: '0 auto 36px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter 76 screens by feature (e.g. lyrics, equalizer, proxy, 4K)..."
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#fff',
            fontSize: '13px',
            outline: 'none',
            backdropFilter: 'blur(16px)',
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--grey)',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Screenshot Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredScreenshots.map((item, i) => (
          <div
            key={item.src + i}
            onClick={() => onInspect(item)}
            style={{
              background: 'rgba(15, 20, 30, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '14px',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.borderColor = item.appColor || 'rgba(6, 182, 212, 0.6)'
              e.currentTarget.style.boxShadow = `0 16px 36px -12px ${item.appColor}33`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Top Bar with Badge & Screen Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  background: item.accentGradient,
                  color: '#fff',
                }}
              >
                {item.appName}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--grey)' }}>
                {item.index} / {item.total}
              </span>
            </div>

            {/* Thumbnail Box */}
            <div
              style={{
                width: '100%',
                aspectRatio: '9 / 16',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#04070d',
                position: 'relative',
                marginBottom: '12px',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '12px',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>🔍 Inspect in Lightbox</span>
              </div>
            </div>

            {/* Text description */}
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
            <p style={{ fontSize: '12px', color: 'var(--grey)', lineHeight: 1.5, margin: 0, flexGrow: 1 }}>{item.caption}</p>
          </div>
        ))}
      </div>

      {filteredScreenshots.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
          <p style={{ fontSize: '16px', fontWeight: 600 }}>No screenshots match "{searchQuery}"</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedApp('all')
            }}
            className="inixa-btn-view"
            style={{ marginTop: '12px' }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  )
}
