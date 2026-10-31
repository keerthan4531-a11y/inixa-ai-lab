import { Product } from '../../types/product'

export const clipster: Product = {
  id: 'clipster',
  slug: 'clipster',
  name: 'Clipster',
  brand: 'INIXA',
  tagline: 'Universal High-Speed Media Downloader Powered by yt-dlp & aria2c',
  category: 'utility',
  status: 'Production',
  platform: 'Android 8.0+ (ARM64 / ARMv7 / x86_64)',
  badge: 'UNIVERSAL EXTRACTOR',
  accentColor: '#10B981',
  gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  sourceDirectory: 'E:\\all downloads',
  packageId: 'com.junkfood.seal',
  githubUrl: 'https://github.com/JunkFood02/Seal',
  longDescription:
    'Clipster is a powerful, modern Android video and audio downloader powered by yt-dlp and aria2c, featuring 1,000+ supported video platforms, automatic metadata embedding, and Material Design 3 dynamic color theming.',
  detailedSummary:
    'Engineered in pure Kotlin using Modern Android Development (MAD) practices and Jetpack Compose, Clipster bridges command-line yt-dlp power with an intuitive touch UI. It extracts video and audio streams from thousands of platforms, downloads full playlists in a single tap, integrates the aria2c high-speed multi-connection engine, embeds ID3 metadata and album art using Mutagen, embeds multi-language subtitles, and provides customizable yt-dlp command templates.',
  techHighlights: [
    'Engineered on yt-dlp (formerly youtube-dl) supporting 1,000+ online video & audio platforms',
    'Embedded aria2c multi-thread connection downloader for maximum network throughput',
    'Full metadata, track details, and high-resolution thumbnail embedding via Mutagen',
    'One-click full playlist batch download and queuing system',
    'Custom command template builder for advanced yt-dlp execution arguments',
    'Subtitle embedding: Burn-in or soft subtitle muxing in multiple languages',
    'Material Design 3 UI with dynamic system Monet color theming',
    'Pure Jetpack Compose single-activity architecture (Zero legacy fragments)',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Download Dashboard & Queue",
        "description": "Active transfer list with live speed meters, progress rings, and pause/resume buttons.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Format & Quality Dialog",
        "description": "Choose resolution from 720p to 4K, video codec, or standalone audio extraction.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "Batch Download Manager",
        "description": "Queue dozens of video files simultaneously with automatic queue prioritization.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Downloaded Media Vault",
        "description": "Organized library categorizing saved videos, music, and documents.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Auto-Sniffer Settings",
        "description": "Configure clipboard monitoring rules and silent background downloads.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Bandwidth & Thread Settings",
        "description": "Tune maximum concurrent connection threads and WiFi-only download locks.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Download Core': 'yt-dlp + youtubedl-android wrapper',
    'Network Accelerator': 'Embedded aria2c multi-connection binary',
    'Metadata Engine': 'Python Mutagen bindings',
    'Target Architectures': 'arm64-v8a, armeabi-v7a, x86, x86_64',
  },
}
