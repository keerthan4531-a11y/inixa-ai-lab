import { Product } from '../../types/product'

export const lumina: Product = {
  id: 'lumina',
  slug: 'lumina',
  name: 'Lumina Browser',
  brand: 'INIXA',
  tagline: 'Hardened Privacy Web Browser with Fire Wipe & App Tracking Protection',
  category: 'browser',
  status: 'Flagship',
  platform: 'Android 8.0+ (API 26+) | Multi-Arch',
  badge: 'HARDENED PRIVACY',
  accentColor: '#36C5F0',
  gradient: 'linear-gradient(135deg, #36C5F0 0%, #2EB67D 100%)',
  sourceDirectory: 'E:\\Lumina',
  packageId: 'com.inixa.lumina.browser',
  githubUrl: 'https://github.com/duckduckgo/android',
  longDescription:
    'Lumina Browser is an enterprise-grade private web browser with built-in device-wide App Tracking Protection, native VPN network encryption, instant Fire button session wiping, and automatic HTTPS enforcement.',
  detailedSummary:
    'Built upon a security-hardened Android browser core, Lumina shields your digital identity across the web and inside installed third-party apps. It blocks hidden tracking scripts before they load, evaluates site privacy grades in real-time, features a private DuckPlayer YouTube shielding container, and includes a one-tap Fire Button that completely scorches your active tabs, cache, cookies, and session data in an animated burn.',
  techHighlights: [
    'App Tracking Protection: Local VPN-based filter blocking third-party tracker packets across all Android apps',
    'One-Tap Fire Button: Instant animated scorching of tabs, cookies, cache, and session memory',
    'Third-Party Cookie Blocking & GPC (Global Privacy Control) automatic broadcast',
    'DuckPlayer Integration: Sandboxed YouTube player eliminating tracking cookies and behavioral targeting',
    'Smarter Encryption: Forces HTTPS on insecure web targets automatically',
    'Voice Search: Private, unlogged on-device voice queries',
    'Site Privacy Grades: Real-time visual score of tracker prevalence on visited websites',
    'Biometric Lock: Secure app access with fingerprint or face authentication',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "Start Page & Speed Dial",
        "description": "Minimalist homepage with customizable private bookmarks and search shortcuts.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Shield & Ad Tracker Stats",
        "description": "Detailed inspection of blocked trackers, saved megabytes, and time saved per session.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "Article Reader Mode",
        "description": "Clean typography with dark paper styling and adjustable font sizes.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Visual Tab Manager",
        "description": "Interactive 3D tab switcher with quick swipe-to-close gestures.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Biometric Incognito Vault",
        "description": "Separate sandbox for private browsing that leaves zero cache traces on exit.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Download Acceleration",
        "description": "Built-in download manager with file category sorting and pause resumption.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "HTTPS Everywhere & DNS",
        "description": "Enforce DNS-over-HTTPS (DoH) with Cloudflare, Quad9, or custom resolvers.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Cookie & Cache Controls",
        "description": "Auto-purge cookies when exiting the browser for guaranteed stateless privacy.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-9",
        "title": "Build & Release Credentials",
        "description": "Security audit compliance, Chromium engine revision, and package signatures.",
        "icon": "Smartphone",
        "screenshotKey": "shot-9",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Engine Architecture': 'Hardened Chromium WebView + OkHttp Security Sink',
    'Protection Layer': 'VpnService Loopback Packet Inspection',
    'Default Search': 'Private Zero-Profile Query Engine',
    'Target OS': 'Android 8.0 (API 26) through Android 15 (API 35)',
  },
}
