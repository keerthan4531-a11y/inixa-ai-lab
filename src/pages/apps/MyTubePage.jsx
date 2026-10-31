import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function MyTubePage() {
  const app = PRODUCTS.find((p) => p.id === 'my-tube') || PRODUCTS[7]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🚫</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Ad-Free Native Client</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Bypasses video ad injects, mid-roll commercial breaks, and sponsored banner overlays without requiring subscription sign-ups or Google Play services.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(185, 28, 28, 0.05)', border: '1px solid rgba(185, 28, 28, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⏭</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Automated SponsorBlock</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Crowdsourced community timestamps automatically skip embedded promotions, sponsored segments, channel intros, and non-content filler silently.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(248, 113, 113, 0.05)', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎧</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Screen-Off Background Playback</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Stream music, live podcasts, and audio commentary with your phone screen locked or while utilizing other mobile applications without interruption.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
