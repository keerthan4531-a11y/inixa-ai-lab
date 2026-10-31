import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function BeatBoxProPage() {
  const app = PRODUCTS.find((p) => p.id === 'beat-pro') || PRODUCTS[2]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎧</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Direct USB Audio DAC Access</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Bypasses the Android AudioFlinger sound server completely, streaming bit-perfect 24-bit/192kHz PCM and DSD256 master streams directly to external audiophile DACs.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(217, 70, 239, 0.05)', border: '1px solid rgba(217, 70, 239, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎛</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>32-Band Parametric Equalizer</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Comprehensive parametric studio equalizer with variable Q, pre-gain clipping prevention, AutoEq headphone profile imports, and individual channel phase alignment.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📊</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Real-time FFT Spectrum Analyzer</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Hardware accelerated Fast Fourier Transform (FFT) visualizer rendering uncompressed audio dynamics, phase meters, and stereo separation matrices in locked 120 FPS.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
