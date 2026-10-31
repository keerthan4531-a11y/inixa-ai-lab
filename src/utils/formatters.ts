export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function getPlatformBadge(platform: string): { label: string; color: string } {
  if (platform.toLowerCase().includes('electron') || platform.toLowerCase().includes('desktop')) {
    return { label: 'DESKTOP / CLOUD', color: '#a855f7' }
  }
  if (platform.toLowerCase().includes('capacitor') || platform.toLowerCase().includes('web')) {
    return { label: 'HYBRID / PWA', color: '#00f2fe' }
  }
  return { label: 'ANDROID NATIVE', color: '#10b981' }
}
