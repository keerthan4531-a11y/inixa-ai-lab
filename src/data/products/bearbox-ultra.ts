import { Product } from '../../types/product'

export const bearboxUltra: Product = {
  id: 'bearbox-ultra',
  slug: 'bearbox-ultra',
  name: 'BearBox Ultra',
  brand: 'INIXA',
  tagline: 'Brina Glass Elegance & Audiophile Android Experience',
  category: 'audio',
  status: 'Flagship',
  platform: 'Android 13+ (API 33+) | Universal & ARM64',
  badge: 'FLAGSHIP DESIGN',
  accentColor: '#FFBA4A',
  gradient: 'linear-gradient(135deg, #FFBA4A 0%, #D66E00 100%)',
  sourceDirectory: 'E:\\bear-box-ultra',
  packageId: 'com.inixa.bearbox.ultra',
  githubUrl: 'https://github.com/ozyern/Exhale',
  longDescription:
    'BearBox Ultra combines the fluid, glassy elegance of Apple Music with the simplicity of Spotify, powered by an advanced Brina Glass dynamic backdrop shader engine and 120fps motion design.',
  detailedSummary:
    'Written 100% in Kotlin with pure Jetpack Compose, BearBox Ultra features live dynamic backdrop blurs powered by Chris Banes’ Haze library. The interface breathes with organic liquid caustics, adaptive album tinting, tactile analog volume dials, synchronized lyrics, Android Auto integration, Discord Rich Presence, and a built-in self-updating engine that downloads verified builds without app store intermediaries.',
  techHighlights: [
    'Brina Glass UI: Real-time dynamic frosted glass shader pipeline using Haze',
    'Adaptive Chromatic Theming: UI surfaces continually adapt to album art palettes',
    'Always-On Display (AOD): Ambient low-power now-playing display mode for OLED screens',
    'Full Offline Engine: Local track caching with edge-to-edge artwork rendering',
    'Android Auto: Native in-car dashboard navigation and media playback',
    'Audiophile Sound: Built-in parametric equalizer and spatial sound enhancement',
    'Self-Updating Engine: Direct GitHub release updates with in-app installation',
    'Social Sync: Discord Rich Presence, Last.fm & ListenBrainz scrobbling, Music Together',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Ambient Glass Now Playing",
        "description": "Player interface dynamically saturated with the album's warm tones and waveform seekbar.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Artist Page & Top Tracks",
        "description": "Full bleed portrait photography with discography, albums, and curated top hits.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "Live Synced Lyrics",
        "description": "Interactive lyric canvas where words light up to the tempo of the performance.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Translucent Library",
        "description": "Grouped frosted glass tables organizing artists, saved songs, and personal playlists.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Offline Vault",
        "description": "Offline downloaded high-res tracks available anytime without cellular connectivity.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Trending Charts & Discover",
        "description": "Daily curated global playlists, viral regional tracks, and newly mastered singles.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "Audio DSP & Equalizer",
        "description": "10-band studio frequency calibration with spatial audio virtualization.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Soundstage Controls",
        "description": "Custom bass booster, treble shaper, and headphone impedance compensator.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-9",
        "title": "Instant Global Search",
        "description": "Search across millions of songs, regional Indian albums, and international artists.",
        "icon": "Smartphone",
        "screenshotKey": "shot-9",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-10",
        "title": "Self-Updating Engine",
        "description": "Seamless in-app version verification and auto-installer.",
        "icon": "Smartphone",
        "screenshotKey": "shot-10",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'UI Framework': '100% Jetpack Compose (Zero Legacy Views)',
    'Glass Engine': 'Haze Dynamic Shaders (Chris Banes)',
    'Minimum OS': 'Android 13 (API 33)',
    'Target OS': 'Android 15 (API 35)',
    'Architectures': 'Universal, arm64-v8a, armeabi-v7a, x86_64',
  },
}
