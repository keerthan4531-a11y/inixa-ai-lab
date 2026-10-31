import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function BeatBoxLitePage() {
  const app = PRODUCTS.find((p) => p.id === 'beat-box-lite') || PRODUCTS[3]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🍃</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Sub-11MB APK Footprint</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Compiled with ProGuard dead-code elimination and native C++ media decoders. Extremely lean binary that installs instantly on devices with scarce internal storage.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(5, 150, 105, 0.05)', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>60ms Cold Launch Time</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            No heavy dependency injection frameworks or background tracking services. Tapping the launcher icon launches playback controls faster than native system apps.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔋</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Under 1% Battery Per Hour</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            OLED black theme shuts off display subpixels completely. Audio decoding offloaded to low-power DSP hardware coprocessors for marathon listening sessions.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
