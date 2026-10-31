import { Product } from '../../types/product'

export const beatboxPro: Product = {
  id: 'beatbox-pro',
  slug: 'beatbox-pro',
  name: 'BeatBox Pro',
  brand: 'INIXA',
  tagline: 'Dual-Catalog Audiophile Streaming & Neural DSP Engine',
  category: 'audio',
  status: 'Flagship',
  platform: 'Android 8.0+ (ARM64 / Universal)',
  badge: 'FLAGSHIP AUDIO',
  accentColor: '#FF6B00',
  gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF2E93 100%)',
  sourceDirectory: 'E:\\Echo-Music',
  packageId: 'com.inixa.beatbox.pro',
  githubUrl: 'https://github.com/keerthan4531-a11y/beat-box-Alpha-Alpha',
  longDescription:
    'BeatBox Pro is an uncompromising, dual-catalog mobile audio player engineered with surgical 32-bit floating-point DSP, simultaneous YouTube Music and JioSaavn lossless aggregation, and real-time Spotify/Apple Music canvas video looping.',
  detailedSummary:
    'Engineered in Kotlin with Jetpack Compose and AndroidX Media3 (ExoPlayer 1.5+), BeatBox Pro solves the streaming fragmentation problem. It merges YouTube Music and JioSaavn into a unified, ad-free catalog offering 320kbps AAC and 24-bit/16-bit FLAC streams. It houses the proprietary Axion Studio 10-band parametric equalizer with tactile rotary studio knobs, live acoustic waveform analysis, syllable-level synchronized karaoke lyrics with multi-provider fallbacks, and a neural AI assistant for conversational playlist curation.',
  techHighlights: [
    'Dual-Catalog Aggregation: YouTube Music (InnerTube API) + JioSaavn Lossless FLAC/320kbps',
    'AndroidX Media3 ExoPlayer audio pipeline with custom 32-bit floating-point DSP sink',
    'Axion Studio 10-Band Parametric EQ with hardware rotary knob emulation and haptics',
    'Spotify Canvas & Apple Music looping video backdrop integration via Cloudflare worker',
    'Real-time syllable and word-by-word synchronized karaoke lyrics (LRCLIB, Paxsenix, KuGou)',
    'BeatBox Neural Brain AI voice assistant and smart conversational concierge',
    'Listen Together peer-to-peer playback rooms over low-latency WebSockets',
    'Built-in ShazamKit ambient music acoustic fingerprinting',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Pro Library Explorer",
        "description": "Hierarchical folder and artist tree browsing with instant index sorting.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Hi-Res Now Playing",
        "description": "Precision playback interface displaying bitrate, sample rate, and codec indicators.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "Multi-Band Parametric EQ",
        "description": "Studio-grade frequency response adjustment with customizable Q-factor.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Queue & Playlist Manager",
        "description": "Drag-and-drop queue reordering with non-destructive playlist editing.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Metadata & Tag Editor",
        "description": "Batch edit track names, artist credits, album year, and high-res cover art.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Smart Sleep Timer",
        "description": "Configurable sleep countdown with automatic gentle audio fade-out.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "Audio Routing & Cast",
        "description": "Wireless streaming to Bluetooth LDAC, Chromecast, and UPnP renderers.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Dark OLED Theme",
        "description": "True black aesthetic optimized for battery conservation on AMOLED displays.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-9",
        "title": "Lyrics Timing Sync",
        "description": "Manual offset slider for precision synchronization on custom LRC files.",
        "icon": "Smartphone",
        "screenshotKey": "shot-9",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-10",
        "title": "Playback Statistics",
        "description": "In-depth analytics on favorite genres, most-played tracks, and listening hours.",
        "icon": "Smartphone",
        "screenshotKey": "shot-10",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-11",
        "title": "Audio Engine Presets",
        "description": "Rock, Jazz, Basshead, Vocal, and Audiophile Acoustic frequency curves.",
        "icon": "Smartphone",
        "screenshotKey": "shot-11",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-12",
        "title": "Custom Widgets & Lockscreen",
        "description": "Full-width home screen widgets with album artwork and scrub controls.",
        "icon": "Smartphone",
        "screenshotKey": "shot-12",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-13",
        "title": "Backup & Settings Sync",
        "description": "Export your playlists and sound profiles as portable JSON backups.",
        "icon": "Smartphone",
        "screenshotKey": "shot-13",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-14",
        "title": "Version & Build Info",
        "description": "Verified release build credentials and security checksums.",
        "icon": "Smartphone",
        "screenshotKey": "shot-14",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Audio Pipeline': 'AndroidX Media3 (ExoPlayer 1.5+) + 32-bit Float DSP',
    'Streaming Codecs': 'FLAC (24-bit/96kHz), AAC (320kbps), Opus (160kbps)',
    'UI Framework': 'Jetpack Compose + Material 3 + Custom Shaders',
    'Target Architecture': 'arm64-v8a, armeabi-v7a, x86_64',
    'Local Storage': 'Room ORM + SQLite + DataStore',
  },
}
