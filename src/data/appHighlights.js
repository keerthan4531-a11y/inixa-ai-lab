/**
 * Detailed highlight reels for all 8 INIXA applications.
 * Powers the interactive multi-app Highlights showcase.
 */

export const APP_HIGHLIGHTS = {
  'beat-box-ultra': {
    appName: 'Beat Box Ultra',
    badge: 'AUDIO FLAGSHIP',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    tagline: 'Liquid Glass Audiophile Engine & Live Visuals',
    lede: 'Direct 320kbps JioSaavn streaming, Spotify Canvas full-bleed video visualizers, word-synced lyrics, and 120Hz ColorOS blur shaders.',
    highlights: [
      {
        shot: { src: '/shots/beat-box-ultra/8eb12ee5-c42f-41e5-8c91-d06b78bb0975.jpg', alt: 'Discover & Trending: curated regional and global tracks.' },
        lead: 'Home leads with what you play.',
        rest: 'Curated playlists and trending regional charts adapt dynamically to your personal listening habits without tracking.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg', alt: 'The player tinted from the cover: controls in warm amber tone.' },
        lead: 'The song brings its own color.',
        rest: 'The cover fills the player, and controls extract their tint dynamically from artwork hues in real-time.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/2fad8277-eb9b-4086-8987-8fc10994c123.jpg', alt: 'Live synchronized word-by-word lyrics.' },
        lead: 'Lyrics land on the word.',
        rest: 'Interactive lyric canvas where words light up to the tempo of the performance while inactive lines soften.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/771e40e7-49f2-45f4-9e66-44dd9be635b8.jpg', alt: 'Offline Vault: songs saved to the phone, ready with no network.' },
        lead: 'It plays with the radio off.',
        rest: 'Uncompressed cached tracks play with zero network connectivity, displaying edge-to-edge album covers.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg', alt: 'Artist page: full bleed portrait and discography.' },
        lead: 'Artists, the way they should look.',
        rest: 'Studio portrait, biographical background, and full discography organized on one seamless liquid page.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/40df8515-0ee9-4b7b-882a-e52e01e4ffed.jpg', alt: 'Grouped glass tables all the way down to Settings.' },
        lead: 'One material, everywhere.',
        rest: 'Frosted glass translucent layers with calibrated blur depth across all menus, library views, and preferences.',
      },
      {
        shot: { src: '/shots/beat-box-ultra/f2261d8f-11de-4007-bea3-c214bffd989a.jpg', alt: 'Self-updating engine: check, download and install seamlessly.' },
        lead: 'It updates itself.',
        rest: 'Check, download, and install verified binaries directly without reliance on proprietary app stores.',
      },
    ],
  },

  'inixa-ai': {
    appName: 'INIXA AI',
    badge: 'MULTIMODAL INTELLIGENCE',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    tagline: 'Self-Hosted AI Companion & Multimodal Proxy Hub',
    lede: 'Zero-latency local neural inference, cryptographic session vaults, dynamic memory graphs, and high-throughput Gemini streaming.',
    highlights: [
      {
        shot: { src: '/shots/inixa-ai/image.png', alt: 'INIXA AI Neural Console with real-time streaming tokens.' },
        lead: 'Multimodal thoughts, rendered in real time.',
        rest: 'Dynamic token streaming with code highlighting, image comprehension, and zero cloud memory leaks.',
      },
      {
        shot: { src: '/shots/inixa-ai/image copy.png', alt: 'Model orchestrator and neural proxy configuration.' },
        lead: 'Your models, on your own terms.',
        rest: 'Switch between Gemini 1.5 Pro, local on-device LLMs, and private proxy servers with cryptographic key isolation.',
      },
      {
        shot: { src: '/shots/inixa-ai/4d267117-b4bc-40ff-a830-27c08292c662.jpg', alt: 'Cryptographic session vault and memory inspector.' },
        lead: 'Zero surveillance. 100% ephemeral.',
        rest: 'All conversational context resides exclusively in RAM and local AES-256 SQLite tables. Nothing is sent to advertisers.',
      },
      {
        shot: { src: '/shots/inixa-ai/5a5353ee-afa6-4f7f-844e-fba873e64e0f.jpg', alt: 'Vision and document analysis workstation.' },
        lead: 'Multimodal document intelligence.',
        rest: 'Extract tables, analyze research papers, and parse source code directly from camera snaps or PDF uploads.',
      },
      {
        shot: { src: '/shots/inixa-ai/feb650b6-8e60-42f2-87e5-d4fbcf1d2478.jpg', alt: 'About INIXA AI architecture & open protocols.' },
        lead: 'Engineered for complete transparency.',
        rest: 'Open specifications, verifiable binaries, and unbundled direct APK updates for complete digital sovereignty.',
      },
    ],
  },

  'beat-pro': {
    appName: 'Beat Box Pro',
    badge: 'AUDIOPHILE WORKSTATION',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    tagline: 'Bit-Perfect FLAC & Studio Master DAC Player',
    lede: 'Direct USB DAC bit-perfect bypass, 32-band parametric equalization, and pristine 192kHz uncompressed audio decoders.',
    highlights: [
      {
        shot: { src: '/shots/beat-pro/01ee4605-24f3-4202-9a6d-65439547f437.jpg', alt: 'Studio master DAC playback with 32-bit floating point engine.' },
        lead: 'Pure bit-perfect master output.',
        rest: 'Bypasses the Android audio mixer completely, delivering pure unadulterated PCM to external USB DACs.',
      },
      {
        shot: { src: '/shots/beat-pro/31031e0e-1853-409b-ae3b-e8017f365d7b.jpg', alt: '32-band parametric studio equalizer.' },
        lead: 'Surgical parametric frequency tuning.',
        rest: 'Fine-tune Q-factors, high-shelf rolloffs, and room reverberation curves for electrostatic and planar headphones.',
      },
      {
        shot: { src: '/shots/beat-pro/9e4cfaf7-819b-46d3-b81f-613509ae3971.jpg', alt: 'Uncompressed local FLAC library manager.' },
        lead: 'High-res metadata cataloging.',
        rest: 'Instantaneous indexing of 100,000+ local lossless audio files with embedded cue sheets and album art caching.',
      },
      {
        shot: { src: '/shots/beat-pro/4e5ba204-657b-4256-bd20-cd296b2e0d4e.jpg', alt: 'Dynamic waveform and oscilloscope visualizer.' },
        lead: 'Real-time frequency analytics.',
        rest: 'Hardware-accelerated OpenGL audio visualizer displaying live peak spectrums and dynamic harmonic distortion.',
      },
      {
        shot: { src: '/shots/beat-pro/63e5d56d-1ade-4d90-b77d-c24caaefa7a0.jpg', alt: 'Audiophile audio device output selector.' },
        lead: 'Low-latency hardware switching.',
        rest: 'Seamless toggle between USB Type-C DACs, balanced 4.4mm jacks, and LDAC/aptX Lossless Bluetooth codecs.',
      },
    ],
  },

  'beat-box-lite': {
    appName: 'Beat Box Lite',
    badge: 'ULTRA LIGHTWEIGHT',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tagline: 'Sub-11MB Minimalist Music Player',
    lede: 'Zero bloat, under 11MB install footprint, instant cold-starts in 60ms, and battery consumption below 1% per hour.',
    highlights: [
      {
        shot: { src: '/shots/beat-box-lite/60e10c8a-a0c1-49a2-a83e-cfaa604d34bf.jpg', alt: 'Minimalist glass player with featherweight RAM footprint.' },
        lead: 'Featherweight footprint, heavyweight sound.',
        rest: 'Engineered entirely in optimized C++ and lightweight Java with zero third-party telemetry libraries.',
      },
      {
        shot: { src: '/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg', alt: 'Fast file browser and folder playback.' },
        lead: 'Instantaneous directory playback.',
        rest: 'Play music straight from folders without waiting for bulky database scanning or background indexing.',
      },
      {
        shot: { src: '/shots/beat-box-lite/68b49f8c-9460-4dd6-a897-9b104d396ce4.jpg', alt: 'Battery-saving pure dark mode interface.' },
        lead: 'Under 1% battery drain per hour.',
        rest: 'Deep OLED true-black theme shuts off screen pixels, making it the perfect endurance audio player.',
      },
      {
        shot: { src: '/shots/beat-box-lite/73d7a62b-1ba8-4973-8b9f-45e39bb1a6d6.jpg', alt: 'Offline local equalizer and bass booster.' },
        lead: 'Built-in 5-band hardware equalizer.',
        rest: 'Delivers punchy bass and crystal vocals even on low-end budget smartphones with 2GB of RAM.',
      },
    ],
  },

  'liquid-stream': {
    appName: 'Liquid Stream',
    badge: 'BUFFERLESS STREAMING',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    tagline: 'Bufferless Adaptive HLS/DASH Video Engine',
    lede: 'Sub-200ms TTFB, predictive segment chunking, Picture-in-Picture floating windows, and zero-stutter 4K HDR playback.',
    highlights: [
      {
        shot: { src: '/shots/liquid-streaming/42ef5c25-7aac-48ce-80d0-606989fba156.jpg', alt: 'Liquid Stream 4K HDR playback with dynamic bitrate switcher.' },
        lead: 'Adaptive bitrate without buffer drops.',
        rest: 'Predictive stream chunking maintains pristine 60FPS video playback even across fluctuating cellular connections.',
      },
      {
        shot: { src: '/shots/liquid-streaming/6c8accae-f5a9-4c25-840a-6f11a1b3b389.jpg', alt: 'Floating Picture-in-Picture video player.' },
        lead: 'Multitasking Picture-in-Picture.',
        rest: 'Float live videos over any application with pinch-to-resize gestures and background audio playback.',
      },
      {
        shot: { src: '/shots/liquid-streaming/b50f38c2-a738-443a-a4fe-1c7708624c65.jpg', alt: 'HLS/DASH custom manifest parser.' },
        lead: 'Universal stream protocol support.',
        rest: 'Plays direct m3u8, MPD, RTMP, and WebM streams with automatic hardware decoder hardware acceleration.',
      },
      {
        shot: { src: '/shots/liquid-streaming/54cb38d1-b5a0-447c-87ad-a599b0cee316.jpg', alt: 'Liquid gesture controls for volume and brightness.' },
        lead: 'Natural gesture navigation.',
        rest: 'Swipe edges for smooth volume and brightness scaling; double-tap anywhere for intelligent chapter jumps.',
      },
    ],
  },

  'clipster': {
    appName: 'Clipster',
    badge: 'UNIVERSAL EXTRACTOR',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    tagline: 'High-Speed 4K Media Extractor & Vault',
    lede: 'Multi-threaded segmented downloads, automatic audio extraction, direct link parsing, and encrypted offline storage.',
    highlights: [
      {
        shot: { src: '/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg', alt: 'Multi-threaded segmented download manager in action.' },
        lead: '16x accelerated download pipelines.',
        rest: 'Splits media files into simultaneous encrypted chunks to maximize bandwidth over 5G and Wi-Fi networks.',
      },
      {
        shot: { src: '/shots/clipster/19b0165f-2102-4044-b938-cca4d546c829.jpg', alt: 'One-click audio extraction to lossless M4A / MP3.' },
        lead: 'Instant lossless audio extraction.',
        rest: 'Convert 4K music videos directly into 320kbps audio files with preserved artist and album metadata.',
      },
      {
        shot: { src: '/shots/clipster/5051e47d-12c0-4d5f-9222-4b5b5c522955.jpg', alt: 'Encrypted media vault protected with biometric lock.' },
        lead: 'Biometrically protected offline vault.',
        rest: 'Keep downloaded files private behind biometric fingerprint authentication and hidden gallery flags.',
      },
      {
        shot: { src: '/shots/clipster/e6051c93-5d81-4636-b8de-f5bb7c02afc8.jpg', alt: 'Batch queue and background worker status.' },
        lead: 'Uninterrupted background processing.',
        rest: 'Downloads continue seamlessly in the background without battery killers or system notification spam.',
      },
    ],
  },

  'lumina': {
    appName: 'Lumina Browser',
    badge: 'PRIVACY BROWSER',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    tagline: 'Zero-Telemetry Browser with Native Ad-Shield',
    lede: 'Native uBlock-grade content filters, anti-fingerprinting shields, DNS-over-HTTPS routing, and zero tracking logs.',
    highlights: [
      {
        shot: { src: '/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg', alt: 'Lumina clean homepage with zero sponsored bloat or news feed.' },
        lead: 'The cleanest web viewport ever made.',
        rest: 'Zero sponsored junk, zero algorithmic news feeds. Just a pristine omnibox and your encrypted shortcuts.',
      },
      {
        shot: { src: '/shots/lumina/51bc35cc-4fe7-4255-b54d-dcb53e461dc2.jpg', alt: 'Hardware-level content blocker and tracker shield statistics.' },
        lead: 'Built-in shields block 99.4% of trackers.',
        rest: 'Native Rust filter engine strips tracking pixels, crypto miners, and annoying cookie popups at the network level.',
      },
      {
        shot: { src: '/shots/lumina/69144ee4-e6af-4b9c-ad09-d386f10f7798.jpg', alt: 'Encrypted DNS over HTTPS & fingerprint randomizer.' },
        lead: 'Cryptographic identity obfuscation.',
        rest: 'Randomizes canvas fingerprints and audio contexts on every session to prevent cross-site profiling.',
      },
      {
        shot: { src: '/shots/lumina/6ceac216-b3aa-41d1-ae2b-2c5cdd476bfe.jpg', alt: 'Reader mode with customizable serif typography.' },
        lead: 'Distraction-free liquid typography.',
        rest: 'Turns messy web articles into clean editorial pages with custom font sizes, dark mode, and zero clutter.',
      },
    ],
  },

  'my-tube': {
    appName: 'My Tube',
    badge: 'CLEAN YOUTUBE CLIENT',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    tagline: 'Ad-Free Client with SponsorBlock & Background Audio',
    lede: 'Zero sponsor segments, background audio playback with screen locked, dislike count restorations, and zero Google services dependency.',
    highlights: [
      {
        shot: { src: '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg', alt: 'Clean trending feed with zero video ads or banner promotions.' },
        lead: 'Zero ads. Pure unadulterated video.',
        rest: 'Skip all pre-roll, mid-roll, and post-roll video advertisements without paying subscription fees.',
      },
      {
        shot: { src: '/shots/my-tube/7a5397cb-7e56-4576-8b3f-94743ad77412.jpg', alt: 'Community-driven SponsorBlock skipping sponsor shoutouts automatically.' },
        lead: 'Automated SponsorBlock skip.',
        rest: 'Intelligently skips paid sponsorships, intro fluff, subscriber reminders, and non-music video sections.',
      },
      {
        shot: { src: '/shots/my-tube/8fdbbaf8-676f-47f8-9f0a-4412070f248d.jpg', alt: 'Background playback with screen turned off or while multitasking.' },
        lead: 'Background audio with screen locked.',
        rest: 'Listen to podcasts, lectures, and concerts with your screen turned completely off to preserve battery life.',
      },
      {
        shot: { src: '/shots/my-tube/c6b52167-7767-4a8b-8089-81839d791790.jpg', alt: 'Return YouTube Dislike integration and comment filter.' },
        lead: 'Restored real community ratings.',
        rest: 'View accurate dislike counts and filter spam comments using decentralized community APIs.',
      },
    ],
  },
}
