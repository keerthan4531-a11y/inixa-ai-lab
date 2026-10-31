import { Product } from '../../types/product'

export const mytube: Product = {
  id: 'mytube',
  slug: 'mytube',
  name: 'MyTube',
  brand: 'INIXA',
  tagline: 'Privacy-First YouTube Client with SponsorBlock & Background Audio',
  category: 'video',
  status: 'Production',
  platform: 'Android 7.0+ (API 24+) | Universal',
  badge: 'PRIVACY FIRST',
  accentColor: '#FF0033',
  gradient: 'linear-gradient(135deg, #FF0033 0%, #FF5E3A 100%)',
  sourceDirectory: 'E:\\my tube',
  packageId: 'com.inixa.mytube',
  githubUrl: 'https://github.com/libre-tube/LibreTube',
  longDescription:
    'MyTube is a privacy-hardened alternative YouTube frontend for Android, routing through decentralized Piped instances without Google telemetry, tracking, or advertisements.',
  detailedSummary:
    'Rebuilt from the ground up on top of LibreTube and Piped, MyTube lets users explore YouTube videos, channels, and playlists without requiring a Google account or official proprietary APIs. It embeds SponsorBlock to automatically skip sponsored segments, intros, and self-promotions, features Picture-in-Picture (PiP), background audio playback with screen locked, 4K/60fps video streaming, and multi-format audio/video local extraction.',
  techHighlights: [
    'Decentralized Piped Backend: Zero Google Play Services dependency or account tracking',
    'Integrated SponsorBlock: Automatic skipping of sponsors, intros, outros, and subscription reminders',
    'Background Audio & Picture-in-Picture (PiP) multitasking',
    '4K Ultra HD & 60fps video playback with DASH format selection',
    'Local subscriptions & playlists exportable without user accounts',
    'Smart Library Profile Hub with unified settings and download history',
    'Media Downloader: Direct extraction of video (MKV/MP4) and audio (M4A/Opus)',
    'Instance Switcher: Choose from hundreds of verified community Piped servers',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Trending Feed & Home",
        "description": "Clean algorithmic feed without sponsored clickbait or promoted video banners.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Full 4K Player View",
        "description": "Immersive 4K 60fps playback with gesture controls for volume and brightness.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "SponsorBlock Settings",
        "description": "Customize segment types to skip: sponsors, intros, self-promotion, and music breaks.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Channel & Playlist View",
        "description": "Explore creator channels, complete video discographies, and community posts.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Audio Only Mode",
        "description": "Toggle single-tap audio mode to conserve 90% bandwidth and battery power.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Floating Mini-Player",
        "description": "Smooth PiP player floating over your home screen or social chat apps.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "Search & Filter Hub",
        "description": "Precision search by upload date, duration, video quality, and live status.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Local Bookmarks & Playlists",
        "description": "Create private local playlists without signing into Google accounts.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-9",
        "title": "Player Engine Options",
        "description": "Configure default playback speed, HDR color mapping, and VP9 video codec.",
        "icon": "Smartphone",
        "screenshotKey": "shot-9",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Backend Engine': 'Decentralized Piped API Federation',
    'Video Pipeline': 'ExoPlayer DASH / HLS Stream Decoders',
    'Supported Codecs': 'AV1, VP9, H.264, Opus, AAC',
    'Target OS': 'Android 7.0 (API 24) to Android 15 (API 35)',
  },
}
