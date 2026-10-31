export type AppRoute =
  | '/'
  | '/products'
  | '/products/beatbox-pro'
  | '/products/beatbox-lite'
  | '/products/beatbox-ultra'
  | '/products/mytube'
  | '/products/lumina'
  | '/products/liquid-stream'
  | '/products/clipster'
  | '/products/wikipedia-app'
  | '/products/inixa-ai'
  | '/downloads'
  | '/about'
  | '/contact'

export interface NavItem {
  label: string
  href: string
  badge?: string
  isExternal?: boolean
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Ecosystem', href: '/' },
  { label: 'Products', href: '/products', badge: '9' },
  { label: 'Downloads', href: '/downloads', badge: '15 APKs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
