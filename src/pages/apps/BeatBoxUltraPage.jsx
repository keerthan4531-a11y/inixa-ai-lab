import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'
import { LYRICS_VIDEO } from '../../content.js'

export function BeatBoxUltraPage() {
  const app = PRODUCTS.find((p) => p.id === 'beat-box-ultra') || PRODUCTS[1]

  return (
    <AppLayout app={app}>
      {/* Featured Video Visualizer Section */}
      <div
        style={{
          margin: '50px 0',
          padding: '40px',
          borderRadius: '32px',
          background: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.15) 0%, rgba(10, 14, 22, 0.8) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#f59e0b', textTransform: 'uppercase' }}>
            Live Visual Engine
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#fff', margin: '12px 0' }}>
            Synchronized Lyrics &amp; Video Backgrounds
          </h2>
          <p style={{ color: 'var(--grey)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
            Beat Box Ultra blends full-bleed Spotify Canvas dynamic video loops with word-by-word synchronized typography. Every syllable illuminates in molten gold with zero audio latency.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>320 kbps</div>
              <div style={{ fontSize: '11px', color: 'var(--grey)' }}>JioSaavn Studio Master</div>
            </div>
            <div style={{ padding: '12px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f59e0b' }}>120 Hz</div>
              <div style={{ fontSize: '11px', color: 'var(--grey)' }}>ColorOS GPU Shaders</div>
            </div>
          </div>
        </div>

        <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}>
          <video
            src={LYRICS_VIDEO.src}
            poster={LYRICS_VIDEO.poster}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>✨</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>ColorOS Liquid Glass Shaders</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Directly derived from OPPO/OnePlus ColorOS dynamic wallpaper engines, delivering real-time bilateral blur filtering that tracks finger inertia seamlessly.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📻</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Studio Grade DSP Engine</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            64-bit floating point audio signal processing with parametric band pass, psychoacoustic bass virtualization, and high-frequency harmonic restoration.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Zero Store Dependency</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Self-updating APK pipeline: receives cryptographically signed patch deltas in background, verifying checksums without Google Play Services or proprietary stores.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
