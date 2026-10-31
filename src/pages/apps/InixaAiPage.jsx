import { AppLayout } from './AppLayout.jsx'
import { PRODUCTS } from '../../data/inixaProducts.js'

export function InixaAiPage() {
  const app = PRODUCTS.find((p) => p.id === 'inixa-ai') || PRODUCTS[0]

  return (
    <AppLayout app={app}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔒</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Cryptographic Ephemeral Vault</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Every AI chat query, token stream, and multimodal context window is encrypted with client-side keys and stored in isolated SQLite tables. No diagnostic logs, telemetry, or training telemetry ever leave your device.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Direct Neural Proxy Engine</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Route API calls through custom upstream Gemini proxies or self-hosted endpoint gateways with automatic token compression, rate-limit bypassing, and high-throughput Server-Sent Events (SSE) streaming.
          </p>
        </div>

        <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>👁</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Multimodal Vision &amp; OCR</h3>
          <p style={{ color: 'var(--grey)', fontSize: '14px', lineHeight: 1.6 }}>
            Instantly ingest handwritten mathematical formulas, source code snippets, and research paper schematics directly into your conversational context with high-precision visual OCR.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
