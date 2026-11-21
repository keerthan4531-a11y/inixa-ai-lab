import { useState, useEffect } from 'react'
import { Product, ProductApk } from '../types/product'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from './products'

export const DEVELOPER_APPS_STORAGE_KEY = 'inixa_custom_developer_apps'

/**
 * Reads developer-submitted apps from browser localStorage
 */
export function getStoredDeveloperApps(): Product[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DEVELOPER_APPS_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Product[]
  } catch (err) {
    console.error('Failed to parse developer apps from localStorage:', err)
    return []
  }
}

/**
 * Saves or updates a developer app in localStorage and notifies active listeners
 */
export function saveDeveloperApp(app: Product): void {
  if (typeof window === 'undefined') return
  const current = getStoredDeveloperApps()
  const filtered = current.filter((p) => p.id !== app.id && p.slug !== app.slug)
  const updated = [app, ...filtered]
  try {
    localStorage.setItem(DEVELOPER_APPS_STORAGE_KEY, JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to save to localStorage (quota exceeded?):', err)
  }
  window.dispatchEvent(new CustomEvent('inixa:products-updated'))
}

/**
 * Deletes a developer app by ID
 */
export function deleteDeveloperApp(appId: string): void {
  if (typeof window === 'undefined') return
  const current = getStoredDeveloperApps()
  const updated = current.filter((p) => p.id !== appId && p.slug !== appId)
  localStorage.setItem(DEVELOPER_APPS_STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new CustomEvent('inixa:products-updated'))
}

/**
 * Returns all products combined: developer launched custom apps + official flagships
 */
export function getAllCombinedProducts(): Product[] {
  const custom = getStoredDeveloperApps()
  return [...custom, ...ALL_PRODUCTS]
}

/**
 * Returns dictionary map of all products including developer launched apps
 */
export function getAllCombinedProductsMap(): Record<string, Product> {
  const all = getAllCombinedProducts()
  const map: Record<string, Product> = { ...PRODUCTS_BY_ID }
  all.forEach((p) => {
    map[p.id] = p
    map[p.slug] = p
  })
  return map
}

/**
 * React hook to reactively consume all products (updates in real-time when new apps launch)
 */
export function useAllProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(() => getAllCombinedProducts())

  useEffect(() => {
    const sync = () => setProducts(getAllCombinedProducts())
    window.addEventListener('inixa:products-updated', sync)
    return () => window.removeEventListener('inixa:products-updated', sync)
  }, [])

  return products
}

/**
 * React hook for dictionary lookup of products including newly launched apps
 */
export function useAllProductsMap(): Record<string, Product> {
  const [productMap, setProductMap] = useState<Record<string, Product>>(() => getAllCombinedProductsMap())

  useEffect(() => {
    const sync = () => setProductMap(getAllCombinedProductsMap())
    window.addEventListener('inixa:products-updated', sync)
    return () => window.removeEventListener('inixa:products-updated', sync)
  }, [])

  return productMap
}
