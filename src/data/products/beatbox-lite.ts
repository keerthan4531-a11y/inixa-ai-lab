import { Product } from '../../types/product'

export const beatboxLite: Product = {
  id: 'beatbox-lite',
  slug: 'beatbox-lite',
  name: 'BeatBox Lite',
  brand: 'INIXA',
  tagline: 'Ultra-Featherweight Cross-Platform Streaming & Cinema Hub',
  category: 'audio',
  status: 'Production',
  platform: 'Android 8.0+ (Capacitor 6) & Web PWA',
  badge: 'FEATHERWEIGHT HYBRID',
  accentColor: '#00F0FF',
  gradient: 'linear-gradient(135deg, #00F0FF 0%, #0072FF 100%)',
  sourceDirectory: 'D:\\UX-palyer',
  packageId: 'com.inixa.beatbox.lite',
  githubUrl: 'https://github.com/keerthan4531-a11y/ux-palyer',
  longDescription:
    'BeatBox Lite is an ultra-fast, cross-platform media streaming application delivering JioSaavn 320kbps lossless audio, TMDB cinema streaming via HLS, and native Android integration with near-zero memory footprint.',
  detailedSummary:
    'Built on React 19 and Capacitor 6, BeatBox Lite delivers high-end streaming performance to low-spec hardware without sacrificing aesthetics. It features an adaptive Liquid UI with real-time album color extraction, synchronized lyrics drawer, integrated TMDB/Movie-Web video pipeline for movie trailers and cinema soundtracks, native hardware media controls with Android notification bridges, and an offline song cache.',
  techHighlights: [
    'Cross-Platform Architecture: React 19 + TypeScript + Capacitor 6 Android Runtime',
    'Dual Media Mode: JioSaavn Hi-Res Audio + Movie-Web/TMDB HLS Video Streaming',
    'Ultra-Lightweight footprint: < 15MB installed size with instant cold boot time',
    'Capacitor Native Media Bridge: System notification controls and haptic feedback',
    'Real-time dynamic color extraction from album covers using canvas quantization',
    'Offline caching with IndexedDB and local storage synchronization',
    'Interactive Stories & Music Clips short-form feed',
    'Sleep timer and low-battery background optimization mode',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Minimalist Main Dashboard",
        "description": "Clean overview with quick access to all local songs, albums, and recent tracks.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Streamlined Player Card",
        "description": "High-contrast playback controls with responsive scrubber bar and loop modes.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "Fast Folder Navigation",
        "description": "Browse music strictly by your phone's folder structure for rapid file location.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Compact Playlist Editor",
        "description": "Create quick playlists without complex menus or database bloat.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Low-Power Audio Output",
        "description": "Hardware-level decoding maximizing battery endurance on low-spec chipsets.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Search & Filter Bar",
        "description": "Real-time character filtering across thousands of titles with zero stutter.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "Settings & Sound Engine",
        "description": "Simple toggle switches for headset controls and auto-pause on disconnect.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Build Diagnostics",
        "description": "Memory usage statistics and lightweight runtime information.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Runtime Engine': 'Capacitor 6 + React 19 + HLS.js',
    'Supported Platforms': 'Android APK, Mobile Web, Desktop PWA',
    'Audio Bitrates': '320kbps, 160kbps, 96kbps AAC/MP3',
    'Footprint': '< 15MB APK, < 65MB RAM during playback',
  },
}
