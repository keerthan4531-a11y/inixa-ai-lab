import { Product } from '../../types/product'
import { APK_CATALOG } from '../apks'
import { beatboxPro } from './beatbox-pro'
import { beatboxLite } from './beatbox-lite'
import { bearboxUltra } from './bearbox-ultra'
import { mytube } from './mytube'
import { lumina } from './lumina'
import { liquidStream } from './liquid-stream'
import { clipster } from './clipster'
import { wikipediaInfopedia } from './wikipedia-infopedia'
import { inixaAi } from './inixa-ai'

export type { Product }

// Enrich products with their audited APK releases and UI convenience fields
const rawProducts: Product[] = [
  beatboxPro,
  beatboxLite,
  bearboxUltra,
  mytube,
  lumina,
  liquidStream,
  clipster,
  wikipediaInfopedia,
  inixaAi,
]

export const ALL_PRODUCTS: Product[] = rawProducts.map((p) => {
  const apks = APK_CATALOG[p.id] || []
  const latestApk = apks.length > 0 ? apks[apks.length - 1] : null
  const version = latestApk ? latestApk.version : p.specs['Engine Version'] || 'v1.0'

  return {
    ...p,
    apks,
    version,
    description: p.detailedSummary || p.longDescription,
    highlights: p.techHighlights,
  }
})

export const PRODUCTS_BY_ID: Record<string, Product> = ALL_PRODUCTS.reduce(
  (acc, p) => {
    acc[p.id] = p
    acc[p.slug] = p
    return acc
  },
  {} as Record<string, Product>,
)

export {
  beatboxPro,
  beatboxLite,
  bearboxUltra,
  mytube,
  lumina,
  liquidStream,
  clipster,
  wikipediaInfopedia,
  inixaAi,
}
