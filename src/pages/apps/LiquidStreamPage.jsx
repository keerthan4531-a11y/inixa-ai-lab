import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function LiquidStreamPage() {
  const app = PRODUCTS.find((p) => p.id === 'liquid-streaming') || PRODUCTS[4]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🌊</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Bufferless Segment Chunking</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Predictive network lookahead requests and parallel chunk downloads ensure continuous playback without freezing or buffering spinning wheels even on weak cellular reception.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📺</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Picture-in-Picture &amp; Background Audio</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Seamlessly pop out any video into a floating resizable desktop window while using messaging or navigation apps, with dedicated playback controls.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(251, 113, 133, 0.05)', border: '1px solid rgba(251, 113, 133, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚙</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Multi-Protocol Parsing (HLS &amp; DASH)</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Native parser for m3u8 playlists, dynamic DASH MPD manifests, RTMP streams, and WebM containers with embedded subtitle extraction.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
