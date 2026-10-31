export interface ProductFeature {
  id: string
  title: string
  description: string
  icon: string
  screenshotKey?: string
  badge?: string
}

export interface ProductApk {
  version: string
  versionCode: number
  releaseDate: string
  fileName: string
  sizeBytes: number
  sizeFormatted: string
  fileSize?: string
  abi: string
  minSdk: number
  targetSdk: number
  downloadPath: string
  changelog: string[]
  isLatest?: boolean
  sha256?: string
}

export type ProductCategory =
  | 'audio'
  | 'streaming'
  | 'video'
  | 'browser'
  | 'utility'
  | 'ai'
  | 'knowledge'

export interface Product {
  id: string
  slug: string
  name: string
  brand: 'INIXA'
  tagline: string
  category: ProductCategory
  status: 'Flagship' | 'Production' | 'Experimental' | 'Pro'
  platform: string
  badge: string
  accentColor: string
  gradient: string
  longDescription: string
  detailedSummary: string
  techHighlights: string[]
  features: ProductFeature[]
  specs: Record<string, string>
  sourceDirectory: string
  packageId: string
  githubUrl?: string
  apks?: ProductApk[]

  // Convenience aliases for UI components
  description?: string
  version?: string
  highlights?: string[]
}
