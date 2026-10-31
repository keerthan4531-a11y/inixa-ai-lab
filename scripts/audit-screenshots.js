const fs = require('fs')
const path = require('path')

const mappings = [
  // 1. BeatBox Pro
  {
    product: 'beatbox-pro',
    feature: 'dual-catalog',
    src: 'E:/Echo-Music/Screenshots/device_home.png',
    clean: 'home-feed.png',
    what: 'Dual-Catalog Home Feed & Live Queue',
    alt: 'BeatBox Pro dynamic home feed with live playback bar and dual YouTube/JioSaavn catalog',
  },
  {
    product: 'beatbox-pro',
    feature: 'axion-dsp',
    src: 'E:/Echo-Music/Screenshots/sc_4.png',
    clean: 'equalizer-dsp.png',
    what: 'Axion Studio 10-Band Parametric EQ & Rotary Dials',
    alt: 'Axion Studio 10-band parametric equalizer with tactile rotary hardware knobs',
  },
  {
    product: 'beatbox-pro',
    feature: 'beats-feed',
    src: 'E:/Echo-Music/Screenshots/sc_3.png',
    clean: 'beats-reels.png',
    what: '"Beats" Vertical Short-Form Video Feed',
    alt: 'Vertical short-form music video reels with instant song jump transitions',
  },
  {
    product: 'beatbox-pro',
    feature: 'synced-lyrics',
    src: 'E:/Echo-Music/Screenshots/sc_2.png',
    clean: 'synced-lyrics.png',
    what: 'Syllable-Level Synchronized Karaoke Lyrics & Canvases',
    alt: 'Word-by-word synchronized karaoke lyrics with dynamic background canvas',
  },
  {
    product: 'beatbox-pro',
    feature: 'offline-vault',
    src: 'E:/Echo-Music/Screenshots/sc_5.png',
    clean: 'offline-downloads.png',
    what: 'High-Speed Offline Vault & Local Music Library',
    alt: 'Offline downloaded music vault rendering high-res artwork without internet',
  },
  {
    product: 'beatbox-pro',
    feature: 'neural-voice',
    src: 'E:/Echo-Music/Screenshots/sc_1.png',
    clean: 'neural-voice.png',
    what: 'BeatBox Neural Brain AI Voice Assistant & Orb',
    alt: 'Voice recognition orb and intelligent AI music concierge',
  },
  {
    product: 'beatbox-pro',
    feature: 'social-jam',
    src: 'E:/Echo-Music/Screenshots/em_profile_screen.png',
    clean: 'profile-scrobble.png',
    what: 'Audiophile Profile, Listen Together & Discord Scrobbling',
    alt: 'Listening statistics, artist history metrics, and Discord rich presence',
  },
  {
    product: 'beatbox-pro',
    feature: 'liquid-cyber-ui',
    src: 'E:/Echo-Music/Screenshots/about_screen_cyber.png',
    clean: 'cyber-liquid-ui.png',
    what: 'Liquid Glass Cyberpunk Design System & Telemetry',
    alt: 'Liquid glass cyberpunk UI with dynamic blur shaders and system telemetry',
  },

  // 2. BeatBox Lite
  {
    product: 'beatbox-lite',
    feature: 'lite-streaming',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg',
    clean: 'home-dashboard.jpg',
    what: 'Minimalist Music Dashboard & Fast Playback',
    alt: 'BeatBox Lite clean dashboard with quick access to regional and local music',
  },
  {
    product: 'beatbox-lite',
    feature: 'cinema-hub',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/60e10c8a-a0c1-49a2-a83e-cfaa604d34bf.jpg',
    clean: 'cinema-soundtracks.jpg',
    what: 'TMDB Movies & Cinema Soundtrack Browser',
    alt: 'Integrated TMDB cinema streaming hub and movie soundtrack browser',
  },
  {
    product: 'beatbox-lite',
    feature: 'liquid-ui',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/32a1e6bf-213f-4046-874d-83adda9d3bd0.jpg',
    clean: 'player-liquid.jpg',
    what: 'Lightweight Liquid UI Player Card & Colorizer',
    alt: 'Floating liquid glass player card with real-time album color tinting',
  },
  {
    product: 'beatbox-lite',
    feature: 'lyrics-panel',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/73d7a62b-1ba8-4973-8b9f-45e39bb1a6d6.jpg',
    clean: 'search-filter.jpg',
    what: 'Real-time Search & Instant Filter Bar',
    alt: 'High-speed character search filtering across thousands of song titles',
  },
  {
    product: 'beatbox-lite',
    feature: 'stories-clips',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/68b49f8c-9460-4dd6-a897-9b104d396ce4.jpg',
    clean: 'stories-clips.jpg',
    what: 'Music Stories & Community Clips',
    alt: 'Visual stories and community music clips feed',
  },
  {
    product: 'beatbox-lite',
    feature: 'sleep-timer',
    src: 'E:/inixa lab/website/public/shots/beat-box-lite/78b8464c-f726-4e4e-bf6e-1dae8d6de955.jpg',
    clean: 'queue-sleep-timer.jpg',
    what: 'Sleep Timer & Smart Queue Management',
    alt: 'Customizable sleep timer and queue controls with soft volume fade',
  },

  // 3. BearBox Ultra
  {
    product: 'bearbox-ultra',
    feature: 'brina-glass',
    src: 'E:/bear-box-ultra/website/public/shots/405-player.jpg',
    clean: 'player-brina-glass.jpg',
    what: 'Brina Glass Dynamic Backdrop Shaders with Haze',
    alt: 'BearBox Ultra player showcasing Brina Glass backdrop refraction',
  },
  {
    product: 'bearbox-ultra',
    feature: 'adaptive-theming',
    src: 'E:/bear-box-ultra/website/public/shots/player-color.jpg',
    clean: 'player-adaptive-color.jpg',
    what: 'Full-Spectrum Adaptive Theming from Album Art',
    alt: 'Player controls recoloring dynamically to warm amber album cover hues',
  },
  {
    product: 'bearbox-ultra',
    feature: 'synchronized-lyrics',
    src: 'E:/bear-box-ultra/website/public/shots/405-lyrics.jpg',
    clean: 'synced-lyrics.jpg',
    what: 'Real-Time Line-by-Line Synced Lyrics',
    alt: 'Synchronized lyrics with currently sung lines highlighted in glowing white',
  },
  {
    product: 'bearbox-ultra',
    feature: 'offline-downloads',
    src: 'E:/bear-box-ultra/website/public/shots/downloaded.jpg',
    clean: 'offline-vault.jpg',
    what: 'High-Resolution Offline Song Downloads & Vault',
    alt: 'Offline downloaded library ready to play without cellular network',
  },
  {
    product: 'bearbox-ultra',
    feature: 'artist-page',
    src: 'E:/bear-box-ultra/website/public/shots/405-artist.jpg',
    clean: 'artist-discography.jpg',
    what: 'Cinematic Full-Bleed Artist Discography Page',
    alt: 'Full bleed artist portrait, bio, latest releases, and top tracks',
  },
  {
    product: 'bearbox-ultra',
    feature: 'self-updater',
    src: 'E:/bear-box-ultra/website/public/shots/405-about.jpg',
    clean: 'self-updater.jpg',
    what: 'Direct Self-Updating Engine with Verified Binaries',
    alt: 'In-app update engine checking and installing APKs without app store friction',
  },

  // 4. MyTube
  {
    product: 'mytube',
    feature: 'zero-ads',
    src: 'E:/my tube/screen_feed_yt_verified.png',
    clean: 'ad-free-feed.png',
    what: 'Anti-Tracking Decentralized YouTube Feed',
    alt: 'MyTube clean home feed with zero advertisements or promoted banners',
  },
  {
    product: 'mytube',
    feature: 'sponsorblock',
    src: 'E:/my tube/screen_feed.png',
    clean: 'sponsorblock-skipping.png',
    what: 'Automatic SponsorBlock Segment Skipping',
    alt: 'SponsorBlock integration automatically skipping intros and promotional segments',
  },
  {
    product: 'mytube',
    feature: 'background-pip',
    src: 'E:/my tube/screen1.png',
    clean: 'background-pip.png',
    what: 'Background Audio Playback & Picture-in-Picture',
    alt: 'Picture-in-picture floating mini-player and background audio controls',
  },
  {
    product: 'mytube',
    feature: 'smart-library',
    src: 'E:/my tube/screen_library_user.png',
    clean: 'smart-library.png',
    what: 'Account-Free Smart Library & Profile Hub',
    alt: 'Local subscription manager and playlist organizer with zero Google login',
  },
  {
    product: 'mytube',
    feature: 'video-downloader',
    src: 'E:/my tube/screen_library_fixed.png',
    clean: 'media-extractor.png',
    what: '4K Video & High-Quality Audio Stream Extractor',
    alt: 'Multi-resolution video and audio downloader dialog',
  },
  {
    product: 'mytube',
    feature: 'custom-instances',
    src: 'E:/my tube/screen_about_verified.png',
    clean: 'federated-instances.png',
    what: 'Decentralized Piped Server Selector',
    alt: 'Decentralized Piped server network selector for censorship resistance',
  },

  // 5. Lumina Browser
  {
    product: 'lumina',
    feature: 'app-tracking-protection',
    src: 'E:/inixa lab/website/public/shots/lumina/21e8bad7-558f-4b2e-8922-4d879f811d03.jpg',
    clean: 'app-tracking-protection.jpg',
    what: 'Device-Wide App Tracking Protection & Local VPN',
    alt: 'Detailed dashboard tracking and blocking third-party telemetry requests',
  },
  {
    product: 'lumina',
    feature: 'fire-button',
    src: 'E:/inixa lab/website/public/shots/lumina/66fbb727-fb12-4a8d-8730-eecf0f0aa2b2.jpg',
    clean: 'fire-button-wipe.jpg',
    what: 'One-Tap Animated Fire Button Instant Session Scorcher',
    alt: 'Interactive tab manager and one-tap fire button wiping all tabs and data',
  },
  {
    product: 'lumina',
    feature: 'private-search',
    src: 'E:/inixa lab/website/public/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg',
    clean: 'private-search.jpg',
    what: 'Private Unlogged Start Page & Speed Dial',
    alt: 'Clean browser homepage with private bookmarks and zero search profiling',
  },
  {
    product: 'lumina',
    feature: 'duckplayer',
    src: 'E:/inixa lab/website/public/shots/lumina/51bc35cc-4fe7-4255-b54d-dcb53e461dc2.jpg',
    clean: 'duckplayer-sandbox.jpg',
    what: 'DuckPlayer Sandboxed Distraction-Free Video Container',
    alt: 'Distraction-free article reader mode and sandboxed video viewing',
  },
  {
    product: 'lumina',
    feature: 'smarter-encryption',
    src: 'E:/inixa lab/website/public/shots/lumina/6ec0d16b-6a36-48fa-a200-0c522cc6f149.jpg',
    clean: 'https-upgrades.jpg',
    what: 'Automated HTTPS Everywhere Upgrades & DoH DNS',
    alt: 'Automatic HTTPS encryption upgrades and secure DNS settings',
  },
  {
    product: 'lumina',
    feature: 'privacy-grade',
    src: 'E:/inixa lab/website/public/shots/lumina/69144ee4-e6af-4b9c-ad09-d386f10f7798.jpg',
    clean: 'privacy-grade.jpg',
    what: 'Real-Time Privacy Rating Dashboard & Tracker Audit',
    alt: 'Biometric private incognito vault with stateless session sandboxing',
  },

  // 6. Liquid Stream
  {
    product: 'liquid-stream',
    feature: 'prism-glass',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/42ef5c25-7aac-48ce-80d0-606989fba156.jpg',
    clean: 'prism-glass-ui.jpg',
    what: 'Apple iOS Liquid Glass UI with Prism Dispersion',
    alt: 'Live cinema stream catalog rendered in Apple iOS Liquid Glass UI',
  },
  {
    product: 'liquid-stream',
    feature: 'adaptive-tiers',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/510cb28e-7777-49db-85f3-65a9ea946276.jpg',
    clean: 'adaptive-tiers.jpg',
    what: '3-Tier Adaptive GPU Shaders (120fps to Zero Allocation)',
    alt: 'Dynamic resolution and bitrate selector with GPU-adaptive blur',
  },
  {
    product: 'liquid-stream',
    feature: 'zero-ad-pipeline',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/6c8accae-f5a9-4c25-840a-6f11a1b3b389.jpg',
    clean: 'zero-ad-resolver.jpg',
    what: 'Reverse-Engineered Zero-Ad Stream Extraction',
    alt: 'Clean movie categories streaming directly without pop-under ads or redirects',
  },
  {
    product: 'liquid-stream',
    feature: 'gesture-player',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/104338c6-3296-46a9-b63f-241c8ddbbda9.jpg',
    clean: 'gesture-player.jpg',
    what: 'Cinematic Gesture ExoPlayer with 1080p Quality Switcher',
    alt: 'Gesture-controlled video player with swipe brightness, volume, and seeking',
  },
  {
    product: 'liquid-stream',
    feature: 'liquid-ai',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/54cb38d1-b5a0-447c-87ad-a599b0cee316.jpg',
    clean: 'liquid-ai.jpg',
    what: 'Liquid AI Conversational Movie Concierge',
    alt: 'Audio track switcher, subtitle sync, and conversational movie recommendations',
  },
  {
    product: 'liquid-stream',
    feature: 'chunked-downloader',
    src: 'E:/inixa lab/website/public/shots/liquid-streaming/b50f38c2-a738-443a-a4fe-1c7708624c65.jpg',
    clean: 'chunked-downloader.jpg',
    what: 'High-Speed Offline Multi-Part Downloader',
    alt: 'Watch history and high-speed offline chunked video downloads',
  },

  // 7. Clipster
  {
    product: 'clipster',
    feature: 'universal-dl',
    src: 'E:/inixa lab/website/public/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg',
    clean: 'universal-downloader.jpg',
    what: '1,000+ Platform Media Downloader via yt-dlp',
    alt: 'Active download dashboard with live speed gauges and progress tracking',
  },
  {
    product: 'clipster',
    feature: 'aria2c-engine',
    src: 'E:/inixa lab/website/public/shots/clipster/19b0165f-2102-4044-b938-cca4d546c829.jpg',
    clean: 'format-selector.jpg',
    what: 'aria2c Multi-Connection Acceleration Dialog',
    alt: 'Format resolution picker from 720p to 4K with audio extraction options',
  },
  {
    product: 'clipster',
    feature: 'metadata-tagging',
    src: 'E:/inixa lab/website/public/shots/clipster/566782c8-d0e9-4462-8deb-3524dbfdafc1.jpg',
    clean: 'metadata-tagger.jpg',
    what: 'Automatic Metadata & Artwork Embedding via Mutagen',
    alt: 'Downloaded media vault with auto-tagged artwork, artist, and track metadata',
  },
  {
    product: 'clipster',
    feature: 'playlist-batch',
    src: 'E:/inixa lab/website/public/shots/clipster/5051e47d-12c0-4d5f-9222-4b5b5c522955.jpg',
    clean: 'batch-playlist.jpg',
    what: 'One-Click Batch Playlist Downloads',
    alt: 'Batch download manager queuing dozens of videos with one click',
  },
  {
    product: 'clipster',
    feature: 'command-templates',
    src: 'E:/inixa lab/website/public/shots/clipster/e6051c93-5d81-4636-b8de-f5bb7c02afc8.jpg',
    clean: 'command-templates.jpg',
    what: 'Custom Command Template Builder & Argument GUI',
    alt: 'Bandwidth thread controls and custom yt-dlp command templates',
  },
  {
    product: 'clipster',
    feature: 'subtitle-muxer',
    src: 'E:/inixa lab/website/public/shots/clipster/865e98b7-8fed-4c2c-87cc-78ae415722d5.jpg',
    clean: 'subtitle-muxer.jpg',
    what: 'Subtitle Extraction & Container Muxing',
    alt: 'Automatic clipboard link sniffer and subtitle download settings',
  },

  // 8. Infopedia Alpha (Wikipedia app)
  {
    product: 'wikipedia-app',
    feature: 'live-rag',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/5_en-US.png',
    clean: 'inixa-ai-rag.png',
    what: 'Live Wikipedia Context RAG Injection',
    alt: 'Inixa AI grounded RAG chat interface answering questions with active article context',
  },
  {
    product: 'wikipedia-app',
    feature: 'token-streaming',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/1_en-US.png',
    clean: 'explore-feed.png',
    what: 'Low-Latency Real-Time Markdown Token Streaming',
    alt: 'Wikipedia explore feed with trending articles and featured knowledge cards',
  },
  {
    product: 'wikipedia-app',
    feature: 'verified-citations',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/2_en-US.png',
    clean: 'article-citations.png',
    what: 'Interactive Inline Source Citations & References',
    alt: 'Article reading view with verified inline citations and typography controls',
  },
  {
    product: 'wikipedia-app',
    feature: 'multi-model',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/4_en-US.png',
    clean: 'multilingual-search.png',
    what: 'Dynamic Multi-Model Switching (Gemini, Claude, Llama)',
    alt: 'Search interface with fast multilingual Wikipedia language switching',
  },
  {
    product: 'wikipedia-app',
    feature: 'followups',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/3_en-US.png',
    clean: 'places-map.png',
    what: 'Intelligent Exploration & Places Map',
    alt: 'Geographic map showing location-tagged historical Wikipedia articles nearby',
  },
  {
    product: 'wikipedia-app',
    feature: 'offline-reading',
    src: 'E:/apps-android-wikipedia-main/apps-android-wikipedia-main/fastlane/metadata/android/en-US/images/phoneScreenshots/6_en-US.png',
    clean: 'offline-lists.png',
    what: 'Offline Reading Lists & Multilingual Hub',
    alt: 'Saved reading lists synchronized for offline reading with zero signal',
  },

  // 9. INIXA AI
  {
    product: 'inixa-ai',
    feature: 'webcontainer-ide',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/image.png',
    clean: 'webcontainer-ide.png',
    what: 'In-Browser WebContainer Sandboxing & Live Execution',
    alt: 'Autonomous AI coding chat interface with live token streaming and syntax highlighting',
  },
  {
    product: 'inixa-ai',
    feature: 'autonomous-gen',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/image copy.png',
    clean: 'autonomous-diff.png',
    what: 'Autonomous Code Generation & Multi-File Diff Viewer',
    alt: 'Model parameter configuration and prompt engineering studio',
  },
  {
    product: 'inixa-ai',
    feature: 'gateway-routing',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/image copy 2.png',
    clean: 'multi-model-gateway.png',
    what: 'Multi-Model High-Speed Cloudflare Inference Gateway',
    alt: 'System proxy gateway monitor tracking latency across Gemini, Claude, and DeepSeek',
  },
  {
    product: 'inixa-ai',
    feature: 'mcp-integration',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/373d0497-e6b1-4e11-aedf-13578c79edb6.jpg',
    clean: 'mcp-protocol.jpg',
    what: 'Model Context Protocol (MCP) Workstation',
    alt: 'Prompt template matrix for agentic workflows and tool integrations',
  },
  {
    product: 'inixa-ai',
    feature: 'cross-platform-desktop',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/4d267117-b4bc-40ff-a830-27c08292c662.jpg',
    clean: 'electron-desktop.jpg',
    what: 'Cross-Platform Desktop Architecture & Vision Studio',
    alt: 'Multimodal vision and document perception dashboard',
  },
  {
    product: 'inixa-ai',
    feature: 'live-terminal',
    src: 'E:/inixa lab/website/public/shots/inixa-ai/d8dd555c-f98a-41b2-9562-566b6191e0e9.jpg',
    clean: 'xterm-terminal.jpg',
    what: 'Live Embedded Terminal Shell (Xterm.js) & Port Forwarding',
    alt: 'Code generation workstation with syntax highlighting and instant file export',
  },
]

const destBase = 'E:/inixa lab/website/public/assets'

// 1. Copy files to public/assets/<product>/
let copiedCount = 0
for (const m of mappings) {
  const prodDir = path.join(destBase, m.product)
  fs.mkdirSync(prodDir, { recursive: true })
  const targetPath = path.join(prodDir, m.clean)
  if (fs.existsSync(m.src)) {
    fs.copyFileSync(m.src, targetPath)
    copiedCount++
  } else {
    console.warn('Source file not found:', m.src)
  }
}
console.log('Successfully copied ' + copiedCount + ' images to public/assets/')

// 2. Generate src/data/screenshotMap.ts
const uniqueProds = Array.from(new Set(mappings.map((m) => m.product)))

let tsCode = `/**
 * INIXA AI LABS - Screenshot Feature Mapping
 * Auto-generated clean screenshot registry mapping products and features to verified visual assets.
 */

export interface ScreenshotMeta {
  product: string
  featureId: string
  originalFile: string
  assetPath: string
  whatItShows: string
  altText: string
}

export const SCREENSHOT_MAP: Record<string, Record<string, ScreenshotMeta>> = {\n`

for (const prod of uniqueProds) {
  const items = mappings.filter((m) => m.product === prod)
  tsCode += `  '${prod}': {\n`
  for (const m of items) {
    const origBase = path.basename(m.src)
    tsCode += `    '${m.feature}': {
      product: '${m.product}',
      featureId: '${m.feature}',
      originalFile: '${origBase}',
      assetPath: '/assets/${m.product}/${m.clean}',
      whatItShows: ${JSON.stringify(m.what)},
      altText: ${JSON.stringify(m.alt)},
    },\n`
  }
  tsCode += `  },\n`
}

tsCode += `}

export const ALL_AUDITED_SCREENSHOTS: ScreenshotMeta[] = Object.values(SCREENSHOT_MAP).flatMap(
  (prodMap) => Object.values(prodMap)
)
`

fs.writeFileSync('E:/inixa lab/website/src/data/screenshotMap.ts', tsCode, 'utf-8')
console.log('Generated src/data/screenshotMap.ts successfully!')
