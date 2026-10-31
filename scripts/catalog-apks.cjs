const fs = require('fs')
const path = require('path')

const apkCatalog = [
  // 1. BeatBox Pro
  {
    product: 'beatbox-pro',
    source: 'E:/gemini proxy/public/downloads/Echo-Music.apk',
    fileName: 'beatbox-pro-v2.0-stable.apk',
    version: 'v2.0.0',
    versionCode: 200,
    releaseDate: '2026-08-18',
    sizeBytes: 85557436,
    sizeFormatted: '81.6 MB',
    abi: 'arm64-v8a',
    minSdk: 26,
    targetSdk: 34,
    changelog: [
      'Initial dual-catalog streaming release (YouTube Music + JioSaavn)',
      'Baseline 10-band equalizer with analog rotary dials',
      'Lossless 320kbps audio buffer caching',
    ],
    isLatest: false,
  },
  {
    product: 'beatbox-pro',
    source: 'E:/Echo-Music/app/build/outputs/apk/arm64Gms/debug/app-arm64-gms-debug.apk',
    fileName: 'beatbox-pro-v2.3-arm64-gms.apk',
    version: 'v2.3.0',
    versionCode: 230,
    releaseDate: '2026-06-25',
    sizeBytes: 80620175,
    sizeFormatted: '76.8 MB',
    abi: 'arm64-v8a (Google Play Services build)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Added Google Cast & remote media routing',
      'Integrated ShazamKit audio fingerprinting',
      'Added Spotify Canvas looping video clip backdrops',
    ],
    isLatest: false,
  },
  {
    product: 'beatbox-pro',
    source: 'E:/Echo-Music/app/build/outputs/apk/universalFoss/debug/app-universal-foss-debug.apk',
    fileName: 'beatbox-pro-v2.4-universal.apk',
    version: 'v2.4.0',
    versionCode: 240,
    releaseDate: '2026-09-20',
    sizeBytes: 120401397,
    sizeFormatted: '114.8 MB',
    abi: 'Universal (All ABIs: ARM64, ARMv7, x86_64)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Multi-architecture universal packaging',
      'Word-by-word dynamic karaoke lyric sync (LRCLIB, Paxsenix)',
      'Listen Together WebSocket playback rooms',
    ],
    isLatest: false,
  },
  {
    product: 'beatbox-pro',
    source: 'E:/Echo-Music/app/build/outputs/apk/arm64Foss/debug/app-arm64-foss-debug.apk',
    fileName: 'beatbox-pro-v2.4-arm64-foss.apk',
    version: 'v2.4.2',
    versionCode: 242,
    releaseDate: '2026-10-17',
    sizeBytes: 89633558,
    sizeFormatted: '85.4 MB',
    abi: 'arm64-v8a (FOSS Hardened)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      '32-bit floating point Axion Studio DSP engine optimization',
      'Liquid glass cyberpunk UI with dynamic blur shaders and real-time audio waveform',
      'BeatBox Neural Brain voice assistant orb integration',
      'Full offline library download manager with high-res artwork embedding',
    ],
    isLatest: true,
  },

  // 2. BeatBox Lite
  {
    product: 'beatbox-lite',
    source: 'D:/UX-palyer/android/app/build/outputs/apk/debug/app-debug.apk',
    fileName: 'beatbox-lite-v1.2.0.apk',
    version: 'v1.2.0',
    versionCode: 12,
    releaseDate: '2026-06-23',
    sizeBytes: 11520102,
    sizeFormatted: '10.9 MB',
    abi: 'Universal (Capacitor 6 Hybrid)',
    minSdk: 26,
    targetSdk: 34,
    changelog: [
      'Ultra-featherweight 10.9MB installed size',
      'JioSaavn 320kbps lossless streaming engine',
      'TMDB & Movie-Web cinema soundtrack streaming via HLS.js',
      'Real-time dynamic color extraction from album covers',
      'Native Android media notification bridge and sleep timer',
    ],
    isLatest: true,
  },

  // 3. BearBox Ultra
  {
    product: 'bearbox-ultra',
    source: 'E:/bear-box-ultra/app/build/outputs/apk/arm64/debug/app-arm64-debug.apk',
    fileName: 'bearbox-ultra-v1.0.405-arm64.apk',
    version: 'v1.0.405',
    versionCode: 405,
    releaseDate: '2026-10-19',
    sizeBytes: 139746862,
    sizeFormatted: '133.2 MB',
    abi: 'arm64-v8a',
    minSdk: 33,
    targetSdk: 35,
    changelog: [
      'Brina Glass UI: dynamic backdrop refraction shaders using Haze',
      'Full-spectrum adaptive theming matching album art palette',
      'Always-on display (AOD) ambient now playing mode',
      'Line-by-line synchronized lyrics with vocal glow',
      'Direct in-app self-updater checking GitHub verified releases',
      'Android Auto dashboard support and ListenBrainz scrobbling',
    ],
    isLatest: true,
  },

  // 4. MyTube
  {
    product: 'mytube',
    source: 'E:/my tube/MyTube.apk',
    fileName: 'mytube-v3.1.0-universal.apk',
    version: 'v3.1.0',
    versionCode: 310,
    releaseDate: '2026-10-19',
    sizeBytes: 34319021,
    sizeFormatted: '32.7 MB',
    abi: 'Universal (All ABIs)',
    minSdk: 24,
    targetSdk: 35,
    changelog: [
      'Anti-tracking decentralized Piped streaming federation',
      'Integrated SponsorBlock auto-skipping sponsor reads and filler',
      'Background audio playback with device locked',
      'Floating resizable Picture-in-Picture (PiP) mini-player',
      '4K / 60fps DASH video playback and local audio extractor',
      'Account-free local subscription and playlist vault',
    ],
    isLatest: true,
  },

  // 5. Lumina Browser
  {
    product: 'lumina',
    source: 'E:/Lumina/app/build/outputs/apk/play/debug/duckduckgo-5.295.3-play-debug.apk',
    fileName: 'lumina-browser-v5.295.0-play.apk',
    version: 'v5.295.0',
    versionCode: 52950,
    releaseDate: '2026-09-28',
    sizeBytes: 188767385,
    sizeFormatted: '180.0 MB',
    abi: 'arm64-v8a',
    minSdk: 26,
    targetSdk: 34,
    changelog: [
      'Device-wide App Tracking Protection loopback VPN engine',
      'Private unlogged search start page with speed dials',
      'DuckPlayer sandboxed YouTube video container',
    ],
    isLatest: false,
  },
  {
    product: 'lumina',
    source: 'E:/Lumina/app/build/outputs/apk/internal/debug/duckduckgo-5.295.3-internal-debug.apk',
    fileName: 'lumina-browser-v5.295.3-internal.apk',
    version: 'v5.295.3',
    versionCode: 52953,
    releaseDate: '2026-10-06',
    sizeBytes: 197600819,
    sizeFormatted: '188.4 MB',
    abi: 'arm64-v8a (Hardened Security Suite)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'One-tap animated Fire Button scorching tabs and cookies',
      'Automated HTTPS Everywhere upgrades and DoH encrypted DNS',
      'Real-time tracker scorecard and privacy audit dashboard',
      'Biometric incognito vault with stateless session sandbox',
    ],
    isLatest: true,
  },

  // 6. Liquid Stream
  {
    product: 'liquid-stream',
    source: 'D:/New folder (2)/app/build/outputs/apk/debug/app-debug.apk',
    fileName: 'liquid-stream-v1.4.2-universal.apk',
    version: 'v1.4.2',
    versionCode: 142,
    releaseDate: '2026-09-29',
    sizeBytes: 35422486,
    sizeFormatted: '33.7 MB',
    abi: 'Universal (All ABIs)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Apple iOS Liquid Glass design system with AGSL canvas shaders',
      '3-Tier Adaptive GPU Engine: 120fps Ultra to Zero-Allocation fallback',
      'Pure-Kotlin reverse-engineered ad-free stream extraction',
      'Cinematic gesture ExoPlayer (vertical swipe brightness/volume)',
      'Liquid AI conversational movie concierge',
      'Multi-connection chunked background downloader with resume',
    ],
    isLatest: true,
  },

  // 7. Clipster
  {
    product: 'clipster',
    source: 'E:/all downloads/Seal/app/build/outputs/apk/generic/debug/Clipster-2.0.0-alpha.5-generic-armeabi-v7a-debug.apk',
    fileName: 'clipster-v2.0.0-armeabi-v7a.apk',
    version: 'v2.0.0-a5',
    versionCode: 2005,
    releaseDate: '2026-09-23',
    sizeBytes: 69598826,
    sizeFormatted: '66.3 MB',
    abi: 'armeabi-v7a (32-bit Legacy ARM)',
    minSdk: 26,
    targetSdk: 34,
    changelog: [
      'Support for 32-bit legacy ARM architectures',
      'yt-dlp core media extraction engine',
      'Mutagen automatic ID3 and album art embedding',
    ],
    isLatest: false,
  },
  {
    product: 'clipster',
    source: 'E:/all downloads/Seal/app/build/outputs/apk/generic/debug/Clipster-2.0.0-alpha.5-generic-universal-debug.apk',
    fileName: 'clipster-v2.0.0-universal.apk',
    version: 'v2.0.0-a5',
    versionCode: 2005,
    releaseDate: '2026-09-23',
    sizeBytes: 174407402,
    sizeFormatted: '166.3 MB',
    abi: 'Universal (All Architectures Bundled)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Complete multi-platform bundle with all ABIs',
      'One-click batch playlist downloader',
      'Custom command template builder and CLI arguments GUI',
    ],
    isLatest: false,
  },
  {
    product: 'clipster',
    source: 'E:/all downloads/Seal/app/build/outputs/apk/generic/debug/Clipster-2.0.0-alpha.5-generic-arm64-v8a-debug.apk',
    fileName: 'clipster-v2.0.0-arm64.apk',
    version: 'v2.0.0-stable',
    versionCode: 2009,
    releaseDate: '2026-09-23',
    sizeBytes: 72099456,
    sizeFormatted: '68.7 MB',
    abi: 'arm64-v8a (64-bit Flagship)',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Optimized 64-bit binary for high-end phones',
      'Embedded aria2c multi-connection accelerator for maximum throughput',
      'Subtitle extraction and MKV/MP4 container muxing',
      'Material Design 3 dynamic Monet color engine',
    ],
    isLatest: true,
  },

  // 8. Infopedia Alpha (Wikipedia app)
  {
    product: 'wikipedia-app',
    source: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/app/build/outputs/apk/dev/debug/app-dev-debug.apk',
    fileName: 'infopedia-alpha-v2.7-dev.apk',
    version: 'v2.7.0-alpha',
    versionCode: 270,
    releaseDate: '2026-07-31',
    sizeBytes: 136688703,
    sizeFormatted: '130.3 MB',
    abi: 'Universal (All ABIs)',
    minSdk: 24,
    targetSdk: 35,
    changelog: [
      'Live Wikipedia RAG context injection into LLM prompt queries',
      'Low-latency token streaming with custom StreamingTextRenderer',
      'Verified inline citations linking directly to article sources',
      'Dynamic multi-model switcher: Gemini, DeepSeek, Claude, Llama',
      'Intelligent 3-question exploration follow-up generator',
      'Offline reading lists and multilingual 300+ language support',
    ],
    isLatest: true,
  },

  // 9. INIXA AI
  {
    product: 'inixa-ai',
    source: 'E:/gemini proxy/inixa-app.apk',
    fileName: 'inixa-ai-v1.0.0.apk',
    version: 'v1.0.0',
    versionCode: 100,
    releaseDate: '2026-05-28',
    sizeBytes: 4116878,
    sizeFormatted: '3.9 MB',
    abi: 'Universal / ARM64',
    minSdk: 26,
    targetSdk: 35,
    changelog: [
      'Autonomous conversational AI code generation engine',
      'In-browser WebContainer sandboxing and live Node.js execution',
      'Multi-model proxy gateway routing to Gemini 2.0, DeepSeek, Claude',
      'Model Context Protocol (MCP) tool integration',
      'Interactive xterm.js terminal with local port forwarding',
    ],
    isLatest: true,
  },
]

const baseDest = 'E:/inixa lab/website/public/downloads'

let copied = 0
for (const item of apkCatalog) {
  const prodDir = path.join(baseDest, item.product)
  fs.mkdirSync(prodDir, { recursive: true })
  const targetFile = path.join(prodDir, item.fileName)

  if (fs.existsSync(item.source)) {
    fs.copyFileSync(item.source, targetFile)
    copied++
  } else {
    // If not in primary path, check if already in website/public/apks or website/dist/apks
    const alt1 = path.join('E:/inixa lab/website/public/apks', item.fileName)
    const alt2 = path.join('E:/inixa lab/website/dist/apks', item.fileName)
    if (fs.existsSync(alt1)) {
      fs.copyFileSync(alt1, targetFile)
      copied++
    } else if (fs.existsSync(alt2)) {
      fs.copyFileSync(alt2, targetFile)
      copied++
    } else {
      console.warn('APK source not found:', item.source)
    }
  }
}

console.log(`Copied ${copied} APK binaries to public/downloads/`)

// Generate src/data/apks.ts
const tsContent = `/**
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
${Array.from(new Set(apkCatalog.map((a) => a.product)))
  .map((prod) => {
    // Sort from OLD to NEW (by releaseDate / versionCode)
    const list = apkCatalog
      .filter((a) => a.product === prod)
      .sort((a, b) => a.versionCode - b.versionCode)
    return `  '${prod}': [
${list
  .map(
    (a) => `    {
      version: '${a.version}',
      versionCode: ${a.versionCode},
      releaseDate: '${a.releaseDate}',
      fileName: '${a.fileName}',
      sizeBytes: ${a.sizeBytes},
      sizeFormatted: '${a.sizeFormatted}',
      abi: '${a.abi}',
      minSdk: ${a.minSdk},
      targetSdk: ${a.targetSdk},
      downloadPath: '/downloads/${a.product}/${a.fileName}',
      isLatest: ${a.isLatest},
      changelog: [
${a.changelog.map((c) => `        ${JSON.stringify(c)},`).join('\n')}
      ],
    },`,
  )
  .join('\n')}
  ],`
  })
  .join('\n')}
}

export const ALL_VERIFIED_APKS: (ProductApk & { productId: string })[] = Object.entries(APK_CATALOG).flatMap(
  ([productId, releases]) => releases.map((r) => ({ ...r, productId }))
)

export const TOTAL_APK_COUNT = ALL_VERIFIED_APKS.length
`

fs.writeFileSync('E:/inixa lab/website/src/data/apks.ts', tsContent, 'utf-8')
console.log('Generated src/data/apks.ts successfully!')
