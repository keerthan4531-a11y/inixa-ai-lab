import { useState, useEffect } from 'react'
import { Product, ProductApk } from '../types/product'
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from './products'
import { ALL_APKS } from './apks'

export const DEVELOPER_APPS_STORAGE_KEY = 'inixa_custom_developer_apps'
const DB_NAME = 'inixa_dev_portal_db'
const DB_VERSION = 1
const STORE_NAME = 'apps'

// -----------------------------------------------------------------------------
// IndexedDB Helper (Handles large files, APK binaries, and full-res screenshots)
// -----------------------------------------------------------------------------
function openDatabase(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null)
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result as IDBDatabase
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => {
        console.warn('IndexedDB failed to open, falling back to localStorage')
        resolve(null)
      }
    } catch {
      resolve(null)
    }
  })
}

async function getAppsFromIndexedDB(): Promise<Product[]> {
  const db = await openDatabase()
  if (!db) return []
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.getAll()
      req.onsuccess = () => resolve((req.result as Product[]) || [])
      req.onerror = () => resolve([])
    } catch {
      resolve([])
    }
  })
}

async function putAppInIndexedDB(app: Product): Promise<void> {
  const db = await openDatabase()
  if (!db) return
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.put(app)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}

async function removeAppFromIndexedDB(id: string): Promise<void> {
  const db = await openDatabase()
  if (!db) return
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.delete(id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => resolve()
    } catch {
      resolve()
    }
  })
}

// -----------------------------------------------------------------------------
// Safe LocalStorage Cache (Sanitizes heavy binary URLs to avoid quota limit)
// -----------------------------------------------------------------------------
function sanitizeForLocalStorage(app: Product): Product {
  const clean = { ...app }
  if (clean.apks && clean.apks.length > 0) {
    clean.apks = clean.apks.map((apk) => {
      // If downloadPath is a massive base64 string, don't stuff it into localStorage
      if (apk.downloadPath && apk.downloadPath.length > 5000) {
        return {
          ...apk,
          downloadPath: `/downloads/${clean.slug || clean.id}/${apk.fileName || `${clean.slug}.apk`}`,
          hasStoredBlob: true,
        }
      }
      return apk
    })
  }
  return clean
}

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

// In-memory memory cache
let cachedApps: Product[] = getStoredDeveloperApps()

// Load from IndexedDB on startup
if (typeof window !== 'undefined') {
  getAppsFromIndexedDB().then((idbApps) => {
    if (idbApps && idbApps.length > 0) {
      // Merge with localStorage
      const idbMap = new Map<string, Product>()
      idbApps.forEach((a) => idbMap.set(a.id, a))
      cachedApps.forEach((a) => {
        if (!idbMap.has(a.id)) idbMap.set(a.id, a)
      })
      cachedApps = Array.from(idbMap.values())
      window.dispatchEvent(new CustomEvent('inixa:products-updated'))
    }
  })

  // Also fetch from API endpoint if available
  fetch('/api/developer-apps')
    .then((r) => (r.ok ? r.json() : null))
    .then((serverApps) => {
      if (Array.isArray(serverApps) && serverApps.length > 0) {
        const merged = new Map<string, Product>()
        serverApps.forEach((a) => merged.set(a.id, a))
        cachedApps.forEach((a) => {
          if (!merged.has(a.id)) merged.set(a.id, a)
        })
        cachedApps = Array.from(merged.values())
        window.dispatchEvent(new CustomEvent('inixa:products-updated'))
      }
    })
    .catch(() => {})
}

/**
 * Saves or updates a developer app in both IndexedDB (full blob) & LocalStorage (metadata),
 * and syncs to /api/developer-apps
 */
export async function saveDeveloperApp(app: Product): Promise<void> {
  if (typeof window === 'undefined') return

  // 1. Save full object to IndexedDB
  await putAppInIndexedDB(app)

  // 2. Update in-memory cache
  const filtered = cachedApps.filter((p) => p.id !== app.id && p.slug !== app.slug)
  cachedApps = [app, ...filtered]

  // 3. Save safe sanitized version to localStorage
  try {
    const sanitizedList = cachedApps.map(sanitizeForLocalStorage)
    localStorage.setItem(DEVELOPER_APPS_STORAGE_KEY, JSON.stringify(sanitizedList))
  } catch (err) {
    console.warn('LocalStorage save failed, using IndexedDB storage:', err)
  }

  // 4. Fire reactive event across all open pages & tabs
  window.dispatchEvent(new CustomEvent('inixa:products-updated'))

  // 5. Asynchronously notify backend API
  fetch('/api/developer-apps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sanitizeForLocalStorage(app)),
  }).catch(() => {})
}

/**
 * Deletes a developer app by ID
 */
export async function deleteDeveloperApp(appId: string): Promise<void> {
  if (typeof window === 'undefined') return

  await removeAppFromIndexedDB(appId)
  cachedApps = cachedApps.filter((p) => p.id !== appId && p.slug !== appId)

  try {
    const sanitizedList = cachedApps.map(sanitizeForLocalStorage)
    localStorage.setItem(DEVELOPER_APPS_STORAGE_KEY, JSON.stringify(sanitizedList))
  } catch {}

  window.dispatchEvent(new CustomEvent('inixa:products-updated'))

  fetch(`/api/developer-apps?id=${encodeURIComponent(appId)}`, {
    method: 'DELETE',
  }).catch(() => {})
}

/**
 * Returns all products combined: developer launched custom apps + official flagships
 */
export function getAllCombinedProducts(): Product[] {
  return [...cachedApps, ...ALL_PRODUCTS]
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
 * Returns all APKs combined: official releases + developer launched binaries
 */
export function getAllCombinedApks() {
  const devApks = cachedApps.flatMap((app) =>
    (app.apks || []).map((apk) => ({
      ...apk,
      productId: app.id,
      productName: app.name,
      fileSize: apk.sizeFormatted || apk.fileSize || '15 MB',
    }))
  )
  return [...devApks, ...ALL_APKS]
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

/**
 * React hook to reactively consume all APK releases including newly uploaded developer APKs
 */
export function useAllApks() {
  const [apks, setApks] = useState(() => getAllCombinedApks())

  useEffect(() => {
    const sync = () => setApks(getAllCombinedApks())
    window.addEventListener('inixa:products-updated', sync)
    return () => window.removeEventListener('inixa:products-updated', sync)
  }, [])

  return apks
}
