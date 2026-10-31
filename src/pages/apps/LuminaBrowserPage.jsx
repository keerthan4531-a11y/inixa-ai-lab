import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function LuminaBrowserPage() {
  const app = PRODUCTS.find((p) => p.id === 'lumina') || PRODUCTS[6]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🛡</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Native Rust Ad &amp; Tracker Shield</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Compiled with native Brave/uBlock style ad-blocking lists. Intercepts ad banners, crypto-miners, and telemetry beacons at the raw socket layer for 3x faster page loads.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(2, 132, 199, 0.05)', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔒</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Anti-Fingerprinting Noise Generator</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Injects subtle microscopic noise into Canvas 2D, WebGL shaders, and AudioContext APIs, rendering cross-site tracking scripts unable to identify your physical device.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📖</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Editorial Glass Reader Mode</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Transforms noisy news sites and technical blogs into clean, typographic masterpieces with serif fonts, customized line spacing, and zero annoying popups.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
