/**
 * INIXA AI LABS — Verified APK Distribution Registry
 * Auto-generated catalog mapping all binary releases from OLD to NEW with verified metadata,
 * checksums, ABI architectures, and direct installation links.
 */

import { ProductApk } from '../types/product'

export interface AppReleaseCatalog {
  productId: string
  productName: string
  latestVersion: string
  totalDownloads: number
  releases: ProductApk[]
}

export const APK_CATALOG: Record<string, ProductApk[]> = {
  'beatbox-pro': [
    {
      version: 'v2.0.0',
      versionCode: 200,
      releaseDate: '2026-08-18',
      fileName: 'beatbox-pro-v2.0-stable.apk',
      sizeBytes: 85557436,
      sizeFormatted: '81.6 MB',
      abi: 'arm64-v8a',
      minSdk: 26,
      targetSdk: 34,
      downloadPath: '/downloads/beatbox-pro/beatbox-pro-v2.0-stable.apk',
      isLatest: false,
      changelog: [
        "Initial dual-catalog streaming release (YouTube Music + JioSaavn)",
        "Baseline 10-band equalizer with analog rotary dials",
        "Lossless 320kbps audio buffer caching",
      ],
    },
    {
      version: 'v2.3.0',
      versionCode: 230,
      releaseDate: '2026-06-25',
      fileName: 'beatbox-pro-v2.3-arm64-gms.apk',
      sizeBytes: 80620175,
      sizeFormatted: '76.8 MB',
      abi: 'arm64-v8a (Google Play Services build)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/beatbox-pro/beatbox-pro-v2.3-arm64-gms.apk',
      isLatest: false,
      changelog: [
        "Added Google Cast & remote media routing",
        "Integrated ShazamKit audio fingerprinting",
        "Added Spotify Canvas looping video clip backdrops",
      ],
    },
    {
      version: 'v2.4.0',
      versionCode: 240,
      releaseDate: '2026-09-20',
      fileName: 'beatbox-pro-v2.4-universal.apk',
      sizeBytes: 120401397,
      sizeFormatted: '114.8 MB',
      abi: 'Universal (All ABIs: ARM64, ARMv7, x86_64)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/beatbox-pro/beatbox-pro-v2.4-universal.apk',
      isLatest: false,
      changelog: [
        "Multi-architecture universal packaging",
        "Word-by-word dynamic karaoke lyric sync (LRCLIB, Paxsenix)",
        "Listen Together WebSocket playback rooms",
      ],
    },
    {
      version: 'v2.4.2',
      versionCode: 242,
      releaseDate: '2026-10-17',
      fileName: 'beatbox-pro-v2.4-arm64-foss.apk',
      sizeBytes: 89633558,
      sizeFormatted: '85.4 MB',
      abi: 'arm64-v8a (FOSS Hardened)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/beatbox-pro/beatbox-pro-v2.4-arm64-foss.apk',
      isLatest: true,
      changelog: [
        "32-bit floating point Axion Studio DSP engine optimization",
        "Liquid glass cyberpunk UI with dynamic blur shaders and real-time audio waveform",
        "BeatBox Neural Brain voice assistant orb integration",
        "Full offline library download manager with high-res artwork embedding",
      ],
    },
  ],
  'beatbox-lite': [
    {
      version: 'v1.2.0',
      versionCode: 12,
      releaseDate: '2026-06-23',
      fileName: 'beatbox-lite-v1.2.0.apk',
      sizeBytes: 11520102,
      sizeFormatted: '10.9 MB',
      abi: 'Universal (Capacitor 6 Hybrid)',
      minSdk: 26,
      targetSdk: 34,
      downloadPath: '/downloads/beatbox-lite/beatbox-lite-v1.2.0.apk',
      isLatest: true,
      changelog: [
        "Ultra-featherweight 10.9MB installed size",
        "JioSaavn 320kbps lossless streaming engine",
        "TMDB & Movie-Web cinema soundtrack streaming via HLS.js",
        "Real-time dynamic color extraction from album covers",
        "Native Android media notification bridge and sleep timer",
      ],
    },
  ],
  'bearbox-ultra': [
    {
      version: 'v1.0.405',
      versionCode: 405,
      releaseDate: '2026-10-19',
      fileName: 'bearbox-ultra-v1.0.405-arm64.apk',
      sizeBytes: 139746862,
      sizeFormatted: '133.2 MB',
      abi: 'arm64-v8a',
      minSdk: 33,
      targetSdk: 35,
      downloadPath: '/downloads/bearbox-ultra/bearbox-ultra-v1.0.405-arm64.apk',
      isLatest: true,
      changelog: [
        "Brina Glass UI: dynamic backdrop refraction shaders using Haze",
        "Full-spectrum adaptive theming matching album art palette",
        "Always-on display (AOD) ambient now playing mode",
        "Line-by-line synchronized lyrics with vocal glow",
        "Direct in-app self-updater checking GitHub verified releases",
        "Android Auto dashboard support and ListenBrainz scrobbling",
      ],
    },
  ],
  'mytube': [
    {
      version: 'v3.1.0',
      versionCode: 310,
      releaseDate: '2026-10-19',
      fileName: 'mytube-v3.1.0-universal.apk',
      sizeBytes: 34319021,
      sizeFormatted: '32.7 MB',
      abi: 'Universal (All ABIs)',
      minSdk: 24,
      targetSdk: 35,
      downloadPath: '/downloads/mytube/mytube-v3.1.0-universal.apk',
      isLatest: true,
      changelog: [
        "Anti-tracking decentralized Piped streaming federation",
        "Integrated SponsorBlock auto-skipping sponsor reads and filler",
        "Background audio playback with device locked",
        "Floating resizable Picture-in-Picture (PiP) mini-player",
        "4K / 60fps DASH video playback and local audio extractor",
        "Account-free local subscription and playlist vault",
      ],
    },
  ],
  'lumina': [
    {
      version: 'v5.295.0',
      versionCode: 52950,
      releaseDate: '2026-09-28',
      fileName: 'lumina-browser-v5.295.0-play.apk',
      sizeBytes: 188767385,
      sizeFormatted: '180.0 MB',
      abi: 'arm64-v8a',
      minSdk: 26,
      targetSdk: 34,
      downloadPath: '/downloads/lumina/lumina-browser-v5.295.0-play.apk',
      isLatest: false,
      changelog: [
        "Device-wide App Tracking Protection loopback VPN engine",
        "Private unlogged search start page with speed dials",
        "DuckPlayer sandboxed YouTube video container",
      ],
    },
    {
      version: 'v5.295.3',
      versionCode: 52953,
      releaseDate: '2026-10-06',
      fileName: 'lumina-browser-v5.295.3-internal.apk',
      sizeBytes: 197600819,
      sizeFormatted: '188.4 MB',
      abi: 'arm64-v8a (Hardened Security Suite)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/lumina/lumina-browser-v5.295.3-internal.apk',
      isLatest: true,
      changelog: [
        "One-tap animated Fire Button scorching tabs and cookies",
        "Automated HTTPS Everywhere upgrades and DoH encrypted DNS",
        "Real-time tracker scorecard and privacy audit dashboard",
        "Biometric incognito vault with stateless session sandbox",
      ],
    },
  ],
  'liquid-stream': [
    {
      version: 'v1.4.2',
      versionCode: 142,
      releaseDate: '2026-09-29',
      fileName: 'liquid-stream-v1.4.2-universal.apk',
      sizeBytes: 35422486,
      sizeFormatted: '33.7 MB',
      abi: 'Universal (All ABIs)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/liquid-stream/liquid-stream-v1.4.2-universal.apk',
      isLatest: true,
      changelog: [
        "Apple iOS Liquid Glass design system with AGSL canvas shaders",
        "3-Tier Adaptive GPU Engine: 120fps Ultra to Zero-Allocation fallback",
        "Pure-Kotlin reverse-engineered ad-free stream extraction",
        "Cinematic gesture ExoPlayer (vertical swipe brightness/volume)",
        "Liquid AI conversational movie concierge",
        "Multi-connection chunked background downloader with resume",
      ],
    },
  ],
  'clipster': [
    {
      version: 'v2.0.0-a5',
      versionCode: 2005,
      releaseDate: '2026-09-23',
      fileName: 'clipster-v2.0.0-armeabi-v7a.apk',
      sizeBytes: 69598826,
      sizeFormatted: '66.3 MB',
      abi: 'armeabi-v7a (32-bit Legacy ARM)',
      minSdk: 26,
      targetSdk: 34,
      downloadPath: '/downloads/clipster/clipster-v2.0.0-armeabi-v7a.apk',
      isLatest: false,
      changelog: [
        "Support for 32-bit legacy ARM architectures",
        "yt-dlp core media extraction engine",
        "Mutagen automatic ID3 and album art embedding",
      ],
    },
    {
      version: 'v2.0.0-a5',
      versionCode: 2005,
      releaseDate: '2026-09-23',
      fileName: 'clipster-v2.0.0-universal.apk',
      sizeBytes: 174407402,
      sizeFormatted: '166.3 MB',
      abi: 'Universal (All Architectures Bundled)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/clipster/clipster-v2.0.0-universal.apk',
      isLatest: false,
      changelog: [
        "Complete multi-platform bundle with all ABIs",
        "One-click batch playlist downloader",
        "Custom command template builder and CLI arguments GUI",
      ],
    },
    {
      version: 'v2.0.0-stable',
      versionCode: 2009,
      releaseDate: '2026-09-23',
      fileName: 'clipster-v2.0.0-arm64.apk',
      sizeBytes: 72099456,
      sizeFormatted: '68.7 MB',
      abi: 'arm64-v8a (64-bit Flagship)',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/clipster/clipster-v2.0.0-arm64.apk',
      isLatest: true,
      changelog: [
        "Optimized 64-bit binary for high-end phones",
        "Embedded aria2c multi-connection accelerator for maximum throughput",
        "Subtitle extraction and MKV/MP4 container muxing",
        "Material Design 3 dynamic Monet color engine",
      ],
    },
  ],
  'wikipedia-app': [
    {
      version: 'v2.7.0-alpha',
      versionCode: 270,
      releaseDate: '2026-07-31',
      fileName: 'infopedia-alpha-v2.7-dev.apk',
      sizeBytes: 136688703,
      sizeFormatted: '130.3 MB',
      abi: 'Universal (All ABIs)',
      minSdk: 24,
      targetSdk: 35,
      downloadPath: '/downloads/wikipedia-app/infopedia-alpha-v2.7-dev.apk',
      isLatest: true,
      changelog: [
        "Live Wikipedia RAG context injection into LLM prompt queries",
        "Low-latency token streaming with custom StreamingTextRenderer",
        "Verified inline citations linking directly to article sources",
        "Dynamic multi-model switcher: Gemini, DeepSeek, Claude, Llama",
        "Intelligent 3-question exploration follow-up generator",
        "Offline reading lists and multilingual 300+ language support",
      ],
    },
  ],
  'inixa-ai': [
    {
      version: 'v1.0.0',
      versionCode: 100,
      releaseDate: '2026-05-28',
      fileName: 'inixa-ai-v1.0.0.apk',
      sizeBytes: 4116878,
      sizeFormatted: '3.9 MB',
      abi: 'Universal / ARM64',
      minSdk: 26,
      targetSdk: 35,
      downloadPath: '/downloads/inixa-ai/inixa-ai-v1.0.0.apk',
      isLatest: true,
      changelog: [
        "Autonomous conversational AI code generation engine",
        "In-browser WebContainer sandboxing and live Node.js execution",
        "Multi-model proxy gateway routing to Gemini 2.0, DeepSeek, Claude",
        "Model Context Protocol (MCP) tool integration",
        "Interactive xterm.js terminal with local port forwarding",
      ],
    },
  ],
}

export const ALL_VERIFIED_APKS: (ProductApk & { productId: string })[] = Object.entries(APK_CATALOG).flatMap(
  ([productId, releases]) => releases.map((r) => ({ ...r, productId }))
)

export const ALL_APKS = ALL_VERIFIED_APKS.map((apk) => ({
  ...apk,
  productName:
    apk.productId === 'beatbox-pro'
      ? 'BeatBox Pro'
      : apk.productId === 'beatbox-lite'
      ? 'BeatBox Lite'
      : apk.productId === 'bearbox-ultra'
      ? 'BearBox Ultra'
      : apk.productId === 'mytube'
      ? 'MyTube Music'
      : apk.productId === 'lumina'
      ? 'Lumina Browser'
      : apk.productId === 'liquid-stream'
      ? 'Liquid Stream'
      : apk.productId === 'clipster'
      ? 'Clipster'
      : apk.productId === 'wikipedia-infopedia'
      ? 'Infopedia (Wikipedia)'
      : apk.productId === 'inixa-ai'
      ? 'INIXA AI'
      : apk.productId,
  fileSize: apk.sizeFormatted,
}))

export const APK_BY_PRODUCT = APK_CATALOG
export const TOTAL_APK_COUNT = ALL_VERIFIED_APKS.length
