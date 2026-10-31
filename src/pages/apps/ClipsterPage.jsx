import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function ClipsterPage() {
  const app = PRODUCTS.find((p) => p.id === 'clipster') || PRODUCTS[5]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>16-Thread Accelerated Engine</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Multi-threaded TCP chunking maximizes carrier throughput, downloading uncompressed 4K video files and audio streams up to 16x faster than stock mobile browsers.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎵</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>One-Touch Audio Demuxer</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Automatically strips video streams and encodes pristine 320kbps MP3, AAC, and FLAC audio files with complete ID3 tags, artist names, and high-res cover art.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔐</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Biometric Encrypted Safe</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Sensitive downloads can be locked behind hardware biometric sensors (fingerprint &amp; face unlock) with invisible media-store flags preventing gallery exposure.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
