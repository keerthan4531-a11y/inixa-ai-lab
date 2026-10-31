/**
 * INIXA AI LABS — Verified Physical Screenshot Registry
 * Strictly sourced from actual project directories:
 * E:\inixa lab\BEAT-BOX-LITE
 * E:\inixa lab\BEAT-BOX-ULTRA
 * E:\inixa lab\BEAT-PRO
 * E:\inixa lab\CLIPSTER
 * E:\inixa lab\INIXA AI
 * E:\inixa lab\LIQUID-STREAMING
 * E:\inixa lab\MY TUBE
 * E:\inixa lab\LUMINA
 */

export interface ScreenshotMeta {
  product: string
  featureId: string
  originalFile: string
  assetPath: string
  whatItShows: string
  altText: string
}

export const SCREENSHOT_MAP: Record<string, Record<string, ScreenshotMeta>> = {
  "inixa-ai": {
    "shot-1": {
      "product": "inixa-ai",
      "featureId": "shot-1",
      "originalFile": "image.png",
      "assetPath": "/shots/inixa-ai/image.png",
      "whatItShows": "AI Chat Interface",
      "altText": "Fluid streaming conversation view with adaptive glass bubbles and real-time token rendering."
    },
    "shot-2": {
      "product": "inixa-ai",
      "featureId": "shot-2",
      "originalFile": "image copy.png",
      "assetPath": "/shots/inixa-ai/image copy.png",
      "whatItShows": "Model & Parameter Config",
      "altText": "Fine-grained control over neural parameters, context windows, and persona directives."
    },
    "shot-3": {
      "product": "inixa-ai",
      "featureId": "shot-3",
      "originalFile": "image copy 2.png",
      "assetPath": "/shots/inixa-ai/image copy 2.png",
      "whatItShows": "System Proxy & Tunnels",
      "altText": "Live inspection of local proxy connections, latency telemetry, and API status."
    },
    "shot-4": {
      "product": "inixa-ai",
      "featureId": "shot-4",
      "originalFile": "373d0497-e6b1-4e11-aedf-13578c79edb6.jpg",
      "assetPath": "/shots/inixa-ai/373d0497-e6b1-4e11-aedf-13578c79edb6.jpg",
      "whatItShows": "Prompt Template Matrix",
      "altText": "Curated prompt templates for instant code refactoring, translation, and creative synthesis."
    },
    "shot-5": {
      "product": "inixa-ai",
      "featureId": "shot-5",
      "originalFile": "4d267117-b4bc-40ff-a830-27c08292c662.jpg",
      "assetPath": "/shots/inixa-ai/4d267117-b4bc-40ff-a830-27c08292c662.jpg",
      "whatItShows": "Multimodal Studio View",
      "altText": "Visual perception dashboard analyzing complex charts and UI screenshots with zero delay."
    },
    "shot-6": {
      "product": "inixa-ai",
      "featureId": "shot-6",
      "originalFile": "4d717346-66f9-4597-9640-b87ae4d15926.jpg",
      "assetPath": "/shots/inixa-ai/4d717346-66f9-4597-9640-b87ae4d15926.jpg",
      "whatItShows": "Neural Engine Settings",
      "altText": "Hardware acceleration preferences and local fallback model settings."
    },
    "shot-7": {
      "product": "inixa-ai",
      "featureId": "shot-7",
      "originalFile": "5a5353ee-afa6-4f7f-844e-fba873e64e0f.jpg",
      "assetPath": "/shots/inixa-ai/5a5353ee-afa6-4f7f-844e-fba873e64e0f.jpg",
      "whatItShows": "Context Memory Inspector",
      "altText": "Inspect active context tokens and optimize long-range conversational threads."
    },
    "shot-8": {
      "product": "inixa-ai",
      "featureId": "shot-8",
      "originalFile": "d8dd555c-f98a-41b2-9562-566b6191e0e9.jpg",
      "assetPath": "/shots/inixa-ai/d8dd555c-f98a-41b2-9562-566b6191e0e9.jpg",
      "whatItShows": "Code Generation View",
      "altText": "Syntax highlighted snippets with one-tap copy, formatting, and file export."
    },
    "shot-9": {
      "product": "inixa-ai",
      "featureId": "shot-9",
      "originalFile": "d90e5be4-4c53-42b4-9ae2-cad265ca31f6.jpg",
      "assetPath": "/shots/inixa-ai/d90e5be4-4c53-42b4-9ae2-cad265ca31f6.jpg",
      "whatItShows": "Conversation History",
      "altText": "Searchable chronological archive with automatic tagging and cloud-free storage."
    },
    "shot-10": {
      "product": "inixa-ai",
      "featureId": "shot-10",
      "originalFile": "e86d3384-20dc-4b1a-80aa-1d3105f40a53.jpg",
      "assetPath": "/shots/inixa-ai/e86d3384-20dc-4b1a-80aa-1d3105f40a53.jpg",
      "whatItShows": "Privacy & Encryption Settings",
      "altText": "Toggle cryptographic storage keys and clear cached memories at will."
    },
    "shot-11": {
      "product": "inixa-ai",
      "featureId": "shot-11",
      "originalFile": "feb650b6-8e60-42f2-87e5-d4fbcf1d2478.jpg",
      "assetPath": "/shots/inixa-ai/feb650b6-8e60-42f2-87e5-d4fbcf1d2478.jpg",
      "whatItShows": "About INIXA AI",
      "altText": "Build info, runtime environment, and open protocol details."
    }
  },
  "bearbox-ultra": {
    "shot-1": {
      "product": "bearbox-ultra",
      "featureId": "shot-1",
      "originalFile": "07f9d788-7d1b-412d-a222-877738707aec.jpg",
      "assetPath": "/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg",
      "whatItShows": "Artist Page & Top Tracks",
      "altText": "Full bleed portrait photography with discography, albums, and curated top hits."
    },
    "shot-2": {
      "product": "bearbox-ultra",
      "featureId": "shot-2",
      "originalFile": "2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg",
      "assetPath": "/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg",
      "whatItShows": "Ambient Glass Now Playing",
      "altText": "Player interface dynamically saturated with the album's warm tones and waveform seekbar."
    },
    "shot-3": {
      "product": "bearbox-ultra",
      "featureId": "shot-3",
      "originalFile": "2fad8277-eb9b-4086-8987-8fc10994c123.jpg",
      "assetPath": "/shots/beat-box-ultra/2fad8277-eb9b-4086-8987-8fc10994c123.jpg",
      "whatItShows": "Live Synced Lyrics",
      "altText": "Interactive lyric canvas where words light up to the tempo of the performance."
    },
    "shot-4": {
      "product": "bearbox-ultra",
      "featureId": "shot-4",
      "originalFile": "40df8515-0ee9-4b7b-882a-e52e01e4ffed.jpg",
      "assetPath": "/shots/beat-box-ultra/40df8515-0ee9-4b7b-882a-e52e01e4ffed.jpg",
      "whatItShows": "Translucent Library",
      "altText": "Grouped frosted glass tables organizing artists, saved songs, and personal playlists."
    },
    "shot-5": {
      "product": "bearbox-ultra",
      "featureId": "shot-5",
      "originalFile": "771e40e7-49f2-45f4-9e66-44dd9be635b8.jpg",
      "assetPath": "/shots/beat-box-ultra/771e40e7-49f2-45f4-9e66-44dd9be635b8.jpg",
      "whatItShows": "Offline Vault",
      "altText": "Offline downloaded high-res tracks available anytime without cellular connectivity."
    },
    "shot-6": {
      "product": "bearbox-ultra",
      "featureId": "shot-6",
      "originalFile": "8eb12ee5-c42f-41e5-8c91-d06b78bb0975.jpg",
      "assetPath": "/shots/beat-box-ultra/8eb12ee5-c42f-41e5-8c91-d06b78bb0975.jpg",
      "whatItShows": "Trending Charts & Discover",
      "altText": "Daily curated global playlists, viral regional tracks, and newly mastered singles."
    },
    "shot-7": {
      "product": "bearbox-ultra",
      "featureId": "shot-7",
      "originalFile": "9cb3fc7d-d586-48d0-b92e-f5ae3d663807.jpg",
      "assetPath": "/shots/beat-box-ultra/9cb3fc7d-d586-48d0-b92e-f5ae3d663807.jpg",
      "whatItShows": "Audio DSP & Equalizer",
      "altText": "10-band studio frequency calibration with spatial audio virtualization."
    },
    "shot-8": {
      "product": "bearbox-ultra",
      "featureId": "shot-8",
      "originalFile": "b323766a-edea-4d3d-8399-571297e49f3b.jpg",
      "assetPath": "/shots/beat-box-ultra/b323766a-edea-4d3d-8399-571297e49f3b.jpg",
      "whatItShows": "Soundstage Controls",
      "altText": "Custom bass booster, treble shaper, and headphone impedance compensator."
    },
    "shot-9": {
      "product": "bearbox-ultra",
      "featureId": "shot-9",
      "originalFile": "ddbc0ed1-2cf6-4fb7-b90e-42adf490e85e.jpg",
      "assetPath": "/shots/beat-box-ultra/ddbc0ed1-2cf6-4fb7-b90e-42adf490e85e.jpg",
      "whatItShows": "Instant Global Search",
      "altText": "Search across millions of songs, regional Indian albums, and international artists."
    },
    "shot-10": {
      "product": "bearbox-ultra",
      "featureId": "shot-10",
      "originalFile": "f2261d8f-11de-4007-bea3-c214bffd989a.jpg",
      "assetPath": "/shots/beat-box-ultra/f2261d8f-11de-4007-bea3-c214bffd989a.jpg",
      "whatItShows": "Self-Updating Engine",
      "altText": "Seamless in-app version verification and auto-installer."
    }
  },
  "beatbox-pro": {
    "shot-1": {
      "product": "beatbox-pro",
      "featureId": "shot-1",
      "originalFile": "01ee4605-24f3-4202-9a6d-65439547f437.jpg",
      "assetPath": "/shots/beat-pro/01ee4605-24f3-4202-9a6d-65439547f437.jpg",
      "whatItShows": "Pro Library Explorer",
      "altText": "Hierarchical folder and artist tree browsing with instant index sorting."
    },
    "shot-2": {
      "product": "beatbox-pro",
      "featureId": "shot-2",
      "originalFile": "19db6341-8988-4fb8-ba73-41f97dc665ed.jpg",
      "assetPath": "/shots/beat-pro/19db6341-8988-4fb8-ba73-41f97dc665ed.jpg",
      "whatItShows": "Hi-Res Now Playing",
      "altText": "Precision playback interface displaying bitrate, sample rate, and codec indicators."
    },
    "shot-3": {
      "product": "beatbox-pro",
      "featureId": "shot-3",
      "originalFile": "2d50300e-01b1-428f-8d40-e3c76f673322.jpg",
      "assetPath": "/shots/beat-pro/2d50300e-01b1-428f-8d40-e3c76f673322.jpg",
      "whatItShows": "Multi-Band Parametric EQ",
      "altText": "Studio-grade frequency response adjustment with customizable Q-factor."
    },
    "shot-4": {
      "product": "beatbox-pro",
      "featureId": "shot-4",
      "originalFile": "31031e0e-1853-409b-ae3b-e8017f365d7b.jpg",
      "assetPath": "/shots/beat-pro/31031e0e-1853-409b-ae3b-e8017f365d7b.jpg",
      "whatItShows": "Queue & Playlist Manager",
      "altText": "Drag-and-drop queue reordering with non-destructive playlist editing."
    },
    "shot-5": {
      "product": "beatbox-pro",
      "featureId": "shot-5",
      "originalFile": "31cc6239-be8d-43b4-b7af-6133cd348abc.jpg",
      "assetPath": "/shots/beat-pro/31cc6239-be8d-43b4-b7af-6133cd348abc.jpg",
      "whatItShows": "Metadata & Tag Editor",
      "altText": "Batch edit track names, artist credits, album year, and high-res cover art."
    },
    "shot-6": {
      "product": "beatbox-pro",
      "featureId": "shot-6",
      "originalFile": "3c3bb101-defa-43f9-a2da-ee23c0722992.jpg",
      "assetPath": "/shots/beat-pro/3c3bb101-defa-43f9-a2da-ee23c0722992.jpg",
      "whatItShows": "Smart Sleep Timer",
      "altText": "Configurable sleep countdown with automatic gentle audio fade-out."
    },
    "shot-7": {
      "product": "beatbox-pro",
      "featureId": "shot-7",
      "originalFile": "4e5ba204-657b-4256-bd20-cd296b2e0d4e.jpg",
      "assetPath": "/shots/beat-pro/4e5ba204-657b-4256-bd20-cd296b2e0d4e.jpg",
      "whatItShows": "Audio Routing & Cast",
      "altText": "Wireless streaming to Bluetooth LDAC, Chromecast, and UPnP renderers."
    },
    "shot-8": {
      "product": "beatbox-pro",
      "featureId": "shot-8",
      "originalFile": "63e5d56d-1ade-4d90-b77d-c24caaefa7a0.jpg",
      "assetPath": "/shots/beat-pro/63e5d56d-1ade-4d90-b77d-c24caaefa7a0.jpg",
      "whatItShows": "Dark OLED Theme",
      "altText": "True black aesthetic optimized for battery conservation on AMOLED displays."
    },
    "shot-9": {
      "product": "beatbox-pro",
      "featureId": "shot-9",
      "originalFile": "9bd72341-c186-4167-acfa-1021c16150af.jpg",
      "assetPath": "/shots/beat-pro/9bd72341-c186-4167-acfa-1021c16150af.jpg",
      "whatItShows": "Lyrics Timing Sync",
      "altText": "Manual offset slider for precision synchronization on custom LRC files."
    },
    "shot-10": {
      "product": "beatbox-pro",
      "featureId": "shot-10",
      "originalFile": "9e4cfaf7-819b-46d3-b81f-613509ae3971.jpg",
      "assetPath": "/shots/beat-pro/9e4cfaf7-819b-46d3-b81f-613509ae3971.jpg",
      "whatItShows": "Playback Statistics",
      "altText": "In-depth analytics on favorite genres, most-played tracks, and listening hours."
    },
    "shot-11": {
      "product": "beatbox-pro",
      "featureId": "shot-11",
      "originalFile": "b98ea0e6-da7b-44c9-8765-4992d2b1a8ed.jpg",
      "assetPath": "/shots/beat-pro/b98ea0e6-da7b-44c9-8765-4992d2b1a8ed.jpg",
      "whatItShows": "Audio Engine Presets",
      "altText": "Rock, Jazz, Basshead, Vocal, and Audiophile Acoustic frequency curves."
    },
    "shot-12": {
      "product": "beatbox-pro",
      "featureId": "shot-12",
      "originalFile": "d735675c-0aee-4e68-b169-0033b9cd25dd.jpg",
      "assetPath": "/shots/beat-pro/d735675c-0aee-4e68-b169-0033b9cd25dd.jpg",
      "whatItShows": "Custom Widgets & Lockscreen",
      "altText": "Full-width home screen widgets with album artwork and scrub controls."
    },
    "shot-13": {
      "product": "beatbox-pro",
      "featureId": "shot-13",
      "originalFile": "dbcc7e15-47a2-4250-a814-b9e45b037c0c.jpg",
      "assetPath": "/shots/beat-pro/dbcc7e15-47a2-4250-a814-b9e45b037c0c.jpg",
      "whatItShows": "Backup & Settings Sync",
      "altText": "Export your playlists and sound profiles as portable JSON backups."
    },
    "shot-14": {
      "product": "beatbox-pro",
      "featureId": "shot-14",
      "originalFile": "e490a982-20da-4cab-be98-cffcffbc7301.jpg",
      "assetPath": "/shots/beat-pro/e490a982-20da-4cab-be98-cffcffbc7301.jpg",
      "whatItShows": "Version & Build Info",
      "altText": "Verified release build credentials and security checksums."
    }
  },
  "beatbox-lite": {
    "shot-1": {
      "product": "beatbox-lite",
      "featureId": "shot-1",
      "originalFile": "2968f3b4-4781-4414-9dba-ebe488859c3d.jpg",
      "assetPath": "/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg",
      "whatItShows": "Minimalist Main Dashboard",
      "altText": "Clean overview with quick access to all local songs, albums, and recent tracks."
    },
    "shot-2": {
      "product": "beatbox-lite",
      "featureId": "shot-2",
      "originalFile": "32a1e6bf-213f-4046-874d-83adda9d3bd0.jpg",
      "assetPath": "/shots/beat-box-lite/32a1e6bf-213f-4046-874d-83adda9d3bd0.jpg",
      "whatItShows": "Streamlined Player Card",
      "altText": "High-contrast playback controls with responsive scrubber bar and loop modes."
    },
    "shot-3": {
      "product": "beatbox-lite",
      "featureId": "shot-3",
      "originalFile": "60e10c8a-a0c1-49a2-a83e-cfaa604d34bf.jpg",
      "assetPath": "/shots/beat-box-lite/60e10c8a-a0c1-49a2-a83e-cfaa604d34bf.jpg",
      "whatItShows": "Fast Folder Navigation",
      "altText": "Browse music strictly by your phone's folder structure for rapid file location."
    },
    "shot-4": {
      "product": "beatbox-lite",
      "featureId": "shot-4",
      "originalFile": "68b49f8c-9460-4dd6-a897-9b104d396ce4.jpg",
      "assetPath": "/shots/beat-box-lite/68b49f8c-9460-4dd6-a897-9b104d396ce4.jpg",
      "whatItShows": "Compact Playlist Editor",
      "altText": "Create quick playlists without complex menus or database bloat."
    },
    "shot-5": {
      "product": "beatbox-lite",
      "featureId": "shot-5",
      "originalFile": "6d23a051-404c-4699-86d2-38fd00e862e9.jpg",
      "assetPath": "/shots/beat-box-lite/6d23a051-404c-4699-86d2-38fd00e862e9.jpg",
      "whatItShows": "Low-Power Audio Output",
      "altText": "Hardware-level decoding maximizing battery endurance on low-spec chipsets."
    },
    "shot-6": {
      "product": "beatbox-lite",
      "featureId": "shot-6",
      "originalFile": "73d7a62b-1ba8-4973-8b9f-45e39bb1a6d6.jpg",
      "assetPath": "/shots/beat-box-lite/73d7a62b-1ba8-4973-8b9f-45e39bb1a6d6.jpg",
      "whatItShows": "Search & Filter Bar",
      "altText": "Real-time character filtering across thousands of titles with zero stutter."
    },
    "shot-7": {
      "product": "beatbox-lite",
      "featureId": "shot-7",
      "originalFile": "78b8464c-f726-4e4e-bf6e-1dae8d6de955.jpg",
      "assetPath": "/shots/beat-box-lite/78b8464c-f726-4e4e-bf6e-1dae8d6de955.jpg",
      "whatItShows": "Settings & Sound Engine",
      "altText": "Simple toggle switches for headset controls and auto-pause on disconnect."
    },
    "shot-8": {
      "product": "beatbox-lite",
      "featureId": "shot-8",
      "originalFile": "90eed623-bdad-4156-9621-864af278e1b6.jpg",
      "assetPath": "/shots/beat-box-lite/90eed623-bdad-4156-9621-864af278e1b6.jpg",
      "whatItShows": "Build Diagnostics",
      "altText": "Memory usage statistics and lightweight runtime information."
    }
  },
  "liquid-stream": {
    "shot-1": {
      "product": "liquid-stream",
      "featureId": "shot-1",
      "originalFile": "104338c6-3296-46a9-b63f-241c8ddbbda9.jpg",
      "assetPath": "/shots/liquid-streaming/104338c6-3296-46a9-b63f-241c8ddbbda9.jpg",
      "whatItShows": "Cinema Video Player",
      "altText": "Edge-to-edge playback with intuitive on-screen gesture controllers."
    },
    "shot-2": {
      "product": "liquid-stream",
      "featureId": "shot-2",
      "originalFile": "42ef5c25-7aac-48ce-80d0-606989fba156.jpg",
      "assetPath": "/shots/liquid-streaming/42ef5c25-7aac-48ce-80d0-606989fba156.jpg",
      "whatItShows": "Live Stream Hub",
      "altText": "Interactive catalog of high-definition streaming channels and live broadcasts."
    },
    "shot-3": {
      "product": "liquid-stream",
      "featureId": "shot-3",
      "originalFile": "510cb28e-7777-49db-85f3-65a9ea946276.jpg",
      "assetPath": "/shots/liquid-streaming/510cb28e-7777-49db-85f3-65a9ea946276.jpg",
      "whatItShows": "Quality & Bitrate Selector",
      "altText": "Switch dynamically from 360p mobile mode to full 4K UHD 60fps streaming."
    },
    "shot-4": {
      "product": "liquid-stream",
      "featureId": "shot-4",
      "originalFile": "54cb38d1-b5a0-447c-87ad-a599b0cee316.jpg",
      "assetPath": "/shots/liquid-streaming/54cb38d1-b5a0-447c-87ad-a599b0cee316.jpg",
      "whatItShows": "Subtitles & Audio Tracks",
      "altText": "Multi-language audio selector with subtitle synchronization controls."
    },
    "shot-5": {
      "product": "liquid-stream",
      "featureId": "shot-5",
      "originalFile": "5667b4e7-8ce2-4c48-a577-9238d79ec565.jpg",
      "assetPath": "/shots/liquid-streaming/5667b4e7-8ce2-4c48-a577-9238d79ec565.jpg",
      "whatItShows": "Adaptive Buffer Monitor",
      "altText": "Real-time statistics displaying buffered seconds and connection throughput."
    },
    "shot-6": {
      "product": "liquid-stream",
      "featureId": "shot-6",
      "originalFile": "59fc6972-19d0-415d-966c-bc84ba7e2f15.jpg",
      "assetPath": "/shots/liquid-streaming/59fc6972-19d0-415d-966c-bc84ba7e2f15.jpg",
      "whatItShows": "Floating PiP Mode",
      "altText": "Continue watching favorite streams in a compact corner window while using other apps."
    },
    "shot-7": {
      "product": "liquid-stream",
      "featureId": "shot-7",
      "originalFile": "6c8accae-f5a9-4c25-840a-6f11a1b3b389.jpg",
      "assetPath": "/shots/liquid-streaming/6c8accae-f5a9-4c25-840a-6f11a1b3b389.jpg",
      "whatItShows": "Category Channels",
      "altText": "Browse sports, esports, educational documentaries, and trending entertainment."
    },
    "shot-8": {
      "product": "liquid-stream",
      "featureId": "shot-8",
      "originalFile": "b50f38c2-a738-443a-a4fe-1c7708624c65.jpg",
      "assetPath": "/shots/liquid-streaming/b50f38c2-a738-443a-a4fe-1c7708624c65.jpg",
      "whatItShows": "Playback History & Resuming",
      "altText": "Resume videos precisely where you left off across sessions with cloud-free state saving."
    },
    "shot-9": {
      "product": "liquid-stream",
      "featureId": "shot-9",
      "originalFile": "e8d10f0c-e9d6-4456-89f2-08cf05e6fea1.jpg",
      "assetPath": "/shots/liquid-streaming/e8d10f0c-e9d6-4456-89f2-08cf05e6fea1.jpg",
      "whatItShows": "Decoder Configuration",
      "altText": "Toggle between software and hardware acceleration for optimal battery life."
    }
  },
  "clipster": {
    "shot-1": {
      "product": "clipster",
      "featureId": "shot-1",
      "originalFile": "089378e2-9f36-4469-9b1f-bb71b23e803d.jpg",
      "assetPath": "/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg",
      "whatItShows": "Download Dashboard & Queue",
      "altText": "Active transfer list with live speed meters, progress rings, and pause/resume buttons."
    },
    "shot-2": {
      "product": "clipster",
      "featureId": "shot-2",
      "originalFile": "19b0165f-2102-4044-b938-cca4d546c829.jpg",
      "assetPath": "/shots/clipster/19b0165f-2102-4044-b938-cca4d546c829.jpg",
      "whatItShows": "Format & Quality Dialog",
      "altText": "Choose resolution from 720p to 4K, video codec, or standalone audio extraction."
    },
    "shot-3": {
      "product": "clipster",
      "featureId": "shot-3",
      "originalFile": "5051e47d-12c0-4d5f-9222-4b5b5c522955.jpg",
      "assetPath": "/shots/clipster/5051e47d-12c0-4d5f-9222-4b5b5c522955.jpg",
      "whatItShows": "Batch Download Manager",
      "altText": "Queue dozens of video files simultaneously with automatic queue prioritization."
    },
    "shot-4": {
      "product": "clipster",
      "featureId": "shot-4",
      "originalFile": "566782c8-d0e9-4462-8deb-3524dbfdafc1.jpg",
      "assetPath": "/shots/clipster/566782c8-d0e9-4462-8deb-3524dbfdafc1.jpg",
      "whatItShows": "Downloaded Media Vault",
      "altText": "Organized library categorizing saved videos, music, and documents."
    },
    "shot-5": {
      "product": "clipster",
      "featureId": "shot-5",
      "originalFile": "865e98b7-8fed-4c2c-87cc-78ae415722d5.jpg",
      "assetPath": "/shots/clipster/865e98b7-8fed-4c2c-87cc-78ae415722d5.jpg",
      "whatItShows": "Auto-Sniffer Settings",
      "altText": "Configure clipboard monitoring rules and silent background downloads."
    },
    "shot-6": {
      "product": "clipster",
      "featureId": "shot-6",
      "originalFile": "e6051c93-5d81-4636-b8de-f5bb7c02afc8.jpg",
      "assetPath": "/shots/clipster/e6051c93-5d81-4636-b8de-f5bb7c02afc8.jpg",
      "whatItShows": "Bandwidth & Thread Settings",
      "altText": "Tune maximum concurrent connection threads and WiFi-only download locks."
    }
  },
  "lumina": {
    "shot-1": {
      "product": "lumina",
      "featureId": "shot-1",
      "originalFile": "1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg",
      "assetPath": "/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg",
      "whatItShows": "Start Page & Speed Dial",
      "altText": "Minimalist homepage with customizable private bookmarks and search shortcuts."
    },
    "shot-2": {
      "product": "lumina",
      "featureId": "shot-2",
      "originalFile": "21e8bad7-558f-4b2e-8922-4d879f811d03.jpg",
      "assetPath": "/shots/lumina/21e8bad7-558f-4b2e-8922-4d879f811d03.jpg",
      "whatItShows": "Shield & Ad Tracker Stats",
      "altText": "Detailed inspection of blocked trackers, saved megabytes, and time saved per session."
    },
    "shot-3": {
      "product": "lumina",
      "featureId": "shot-3",
      "originalFile": "51bc35cc-4fe7-4255-b54d-dcb53e461dc2.jpg",
      "assetPath": "/shots/lumina/51bc35cc-4fe7-4255-b54d-dcb53e461dc2.jpg",
      "whatItShows": "Article Reader Mode",
      "altText": "Clean typography with dark paper styling and adjustable font sizes."
    },
    "shot-4": {
      "product": "lumina",
      "featureId": "shot-4",
      "originalFile": "66fbb727-fb12-4a8d-8730-eecf0f0aa2b2.jpg",
      "assetPath": "/shots/lumina/66fbb727-fb12-4a8d-8730-eecf0f0aa2b2.jpg",
      "whatItShows": "Visual Tab Manager",
      "altText": "Interactive 3D tab switcher with quick swipe-to-close gestures."
    },
    "shot-5": {
      "product": "lumina",
      "featureId": "shot-5",
      "originalFile": "69144ee4-e6af-4b9c-ad09-d386f10f7798.jpg",
      "assetPath": "/shots/lumina/69144ee4-e6af-4b9c-ad09-d386f10f7798.jpg",
      "whatItShows": "Biometric Incognito Vault",
      "altText": "Separate sandbox for private browsing that leaves zero cache traces on exit."
    },
    "shot-6": {
      "product": "lumina",
      "featureId": "shot-6",
      "originalFile": "6ceac216-b3aa-41d1-ae2b-2c5cdd476bfe.jpg",
      "assetPath": "/shots/lumina/6ceac216-b3aa-41d1-ae2b-2c5cdd476bfe.jpg",
      "whatItShows": "Download Acceleration",
      "altText": "Built-in download manager with file category sorting and pause resumption."
    },
    "shot-7": {
      "product": "lumina",
      "featureId": "shot-7",
      "originalFile": "6ec0d16b-6a36-48fa-a200-0c522cc6f149.jpg",
      "assetPath": "/shots/lumina/6ec0d16b-6a36-48fa-a200-0c522cc6f149.jpg",
      "whatItShows": "HTTPS Everywhere & DNS",
      "altText": "Enforce DNS-over-HTTPS (DoH) with Cloudflare, Quad9, or custom resolvers."
    },
    "shot-8": {
      "product": "lumina",
      "featureId": "shot-8",
      "originalFile": "a9726bd1-6c06-4c02-85d7-64200db4dee5.jpg",
      "assetPath": "/shots/lumina/a9726bd1-6c06-4c02-85d7-64200db4dee5.jpg",
      "whatItShows": "Cookie & Cache Controls",
      "altText": "Auto-purge cookies when exiting the browser for guaranteed stateless privacy."
    },
    "shot-9": {
      "product": "lumina",
      "featureId": "shot-9",
      "originalFile": "fa7ee88e-b595-49f1-b537-63e19c12eb45.jpg",
      "assetPath": "/shots/lumina/fa7ee88e-b595-49f1-b537-63e19c12eb45.jpg",
      "whatItShows": "Build & Release Credentials",
      "altText": "Security audit compliance, Chromium engine revision, and package signatures."
    }
  },
  "mytube": {
    "shot-1": {
      "product": "mytube",
      "featureId": "shot-1",
      "originalFile": "0dc8c448-f622-445e-9d91-3d369983fe0b.jpg",
      "assetPath": "/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg",
      "whatItShows": "Trending Feed & Home",
      "altText": "Clean algorithmic feed without sponsored clickbait or promoted video banners."
    },
    "shot-2": {
      "product": "mytube",
      "featureId": "shot-2",
      "originalFile": "7a5397cb-7e56-4576-8b3f-94743ad77412.jpg",
      "assetPath": "/shots/my-tube/7a5397cb-7e56-4576-8b3f-94743ad77412.jpg",
      "whatItShows": "Full 4K Player View",
      "altText": "Immersive 4K 60fps playback with gesture controls for volume and brightness."
    },
    "shot-3": {
      "product": "mytube",
      "featureId": "shot-3",
      "originalFile": "8fdbbaf8-676f-47f8-9f0a-4412070f248d.jpg",
      "assetPath": "/shots/my-tube/8fdbbaf8-676f-47f8-9f0a-4412070f248d.jpg",
      "whatItShows": "SponsorBlock Settings",
      "altText": "Customize segment types to skip: sponsors, intros, self-promotion, and music breaks."
    },
    "shot-4": {
      "product": "mytube",
      "featureId": "shot-4",
      "originalFile": "c6b52167-7767-4a8b-8089-81839d791790.jpg",
      "assetPath": "/shots/my-tube/c6b52167-7767-4a8b-8089-81839d791790.jpg",
      "whatItShows": "Channel & Playlist View",
      "altText": "Explore creator channels, complete video discographies, and community posts."
    },
    "shot-5": {
      "product": "mytube",
      "featureId": "shot-5",
      "originalFile": "db3666bc-b72b-424c-8458-dbf921364153.jpg",
      "assetPath": "/shots/my-tube/db3666bc-b72b-424c-8458-dbf921364153.jpg",
      "whatItShows": "Audio Only Mode",
      "altText": "Toggle single-tap audio mode to conserve 90% bandwidth and battery power."
    },
    "shot-6": {
      "product": "mytube",
      "featureId": "shot-6",
      "originalFile": "dc7d8287-2b77-4d9c-8d6c-d22bafc21880.jpg",
      "assetPath": "/shots/my-tube/dc7d8287-2b77-4d9c-8d6c-d22bafc21880.jpg",
      "whatItShows": "Floating Mini-Player",
      "altText": "Smooth PiP player floating over your home screen or social chat apps."
    },
    "shot-7": {
      "product": "mytube",
      "featureId": "shot-7",
      "originalFile": "de689228-82cc-4d6a-bfe1-b190c645bb9d.jpg",
      "assetPath": "/shots/my-tube/de689228-82cc-4d6a-bfe1-b190c645bb9d.jpg",
      "whatItShows": "Search & Filter Hub",
      "altText": "Precision search by upload date, duration, video quality, and live status."
    },
    "shot-8": {
      "product": "mytube",
      "featureId": "shot-8",
      "originalFile": "e696c9f2-33a7-4f34-afb1-ce82190d91aa.jpg",
      "assetPath": "/shots/my-tube/e696c9f2-33a7-4f34-afb1-ce82190d91aa.jpg",
      "whatItShows": "Local Bookmarks & Playlists",
      "altText": "Create private local playlists without signing into Google accounts."
    },
    "shot-9": {
      "product": "mytube",
      "featureId": "shot-9",
      "originalFile": "f5a01bca-b769-483e-b09a-045bf770c91a.jpg",
      "assetPath": "/shots/my-tube/f5a01bca-b769-483e-b09a-045bf770c91a.jpg",
      "whatItShows": "Player Engine Options",
      "altText": "Configure default playback speed, HDR color mapping, and VP9 video codec."
    }
  },
  // Infopedia Alpha (id "wikipedia-app") had 8 real captures in
  // public/shots/wikipedia-app but NO registry entry, so its hardware
  // showcase rendered a "No Preview" box and its lab card had no image.
  "wikipedia-app": {
    "sc_cite": {
      "product": "wikipedia-app",
      "featureId": "sc_cite",
      "originalFile": "1_en-US.png",
      "assetPath": "/shots/wikipedia-app/1_en-US.png",
      "whatItShows": "Save Articles to Reading Lists",
      "altText": "Save your favorite articles to personal reading lists for later study."
    },
    "sc_offline": {
      "product": "wikipedia-app",
      "featureId": "sc_offline",
      "originalFile": "2_en-US.png",
      "assetPath": "/shots/wikipedia-app/2_en-US.png",
      "whatItShows": "Read Wikipedia Offline",
      "altText": "Downloaded Space reading list: five articles available fully offline."
    },
    "sc_model": {
      "product": "wikipedia-app",
      "featureId": "sc_model",
      "originalFile": "3_en-US.png",
      "assetPath": "/shots/wikipedia-app/3_en-US.png",
      "whatItShows": "Explore Feed & Discovery",
      "altText": "Daily explore feed with featured articles, images and trending topics."
    },
    "sc_stream": {
      "product": "wikipedia-app",
      "featureId": "sc_stream",
      "originalFile": "4_en-US.png",
      "assetPath": "/shots/wikipedia-app/4_en-US.png",
      "whatItShows": "Multilingual Search",
      "altText": "Search millions of articles across 300+ Wikipedia language editions."
    },
    "sc_rag": {
      "product": "wikipedia-app",
      "featureId": "sc_rag",
      "originalFile": "5_en-US.png",
      "assetPath": "/shots/wikipedia-app/5_en-US.png",
      "whatItShows": "AI Research Assistant",
      "altText": "Inixa AI answers grounded in the article you are reading, with citations."
    },
    "sc_follow": {
      "product": "wikipedia-app",
      "featureId": "sc_follow",
      "originalFile": "6_en-US.png",
      "assetPath": "/shots/wikipedia-app/6_en-US.png",
      "whatItShows": "Reading Lists & Bookmarks",
      "altText": "Organize saved research into themed lists, synced to your account."
    }
  }
}

export const ALL_AUDITED_SCREENSHOTS: ScreenshotMeta[] = Object.values(SCREENSHOT_MAP).flatMap(
  (prodMap) => Object.values(prodMap)
)
