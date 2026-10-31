import { Product } from '../../types/product'

export const inixaAi: Product = {
  id: 'inixa-ai',
  slug: 'inixa-ai',
  name: 'INIXA AI',
  brand: 'INIXA',
  tagline: 'Autonomous Full-Stack AI IDE & High-Speed Multi-Model Gateway',
  category: 'ai',
  status: 'Flagship',
  platform: 'Electron Desktop (macOS / Windows / Linux) & Cloudflare Edge',
  badge: 'FLAGSHIP AI',
  accentColor: '#A855F7',
  gradient: 'linear-gradient(135deg, #A855F7 0%, #6366F1 100%)',
  sourceDirectory: 'E:\\gemini proxy',
  packageId: 'com.inixa.ai.studio',
  githubUrl: 'https://github.com/keerthan4531-a11y/vibe-studio-bolt',
  longDescription:
    'INIXA AI is an autonomous, conversational full-stack AI development environment and unified multi-model proxy gateway capable of generating, executing, diffing, and deploying full web applications directly in browser and desktop sandboxes.',
  detailedSummary:
    'INIXA AI merges an interactive Bolt/Remix web and Electron desktop studio with a distributed Cloudflare Workers inference gateway. It powers conversational code generation using WebContainer virtualization, full Node.js sandboxed in-browser execution, live terminal shells, syntax-highlighted multi-file diffing, git synchronization, and unified routing across Gemini, Claude, DeepSeek, Grok, Qwen, and Perplexity with zero-latency streaming.',
  techHighlights: [
    'WebContainer Virtualization: Boots a complete Node.js operating system inside the browser/Electron runtime',
    'Full-Stack App Scaffolding: Generates React, Vite, Next.js, Vue, and backend services from plain English',
    'Interactive Multi-File Diff Viewer: Inspect, accept, or reject granular AI code alterations',
    'Live Embedded Terminal (Xterm.js) with real-time process monitoring and port forwarding',
    'Unified Inference Gateway: Distributed Cloudflare Worker routing to 15+ state-of-the-art LLMs',
    'Model Context Protocol (MCP) Support: Tool calling, resource inspection, and autonomous agent loops',
    'Dual Packaging: Web browser cloud deployment + cross-platform Electron native desktop build',
    'Zero-Token Caching & Rate-Limit Bypasses for uninterrupted enterprise development',
  ],
  features: [
    {
        "id": "feature-1",
        "title": "AI Chat Interface",
        "description": "Fluid streaming conversation view with adaptive glass bubbles and real-time token rendering.",
        "icon": "Smartphone",
        "screenshotKey": "shot-1",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-2",
        "title": "Model & Parameter Config",
        "description": "Fine-grained control over neural parameters, context windows, and persona directives.",
        "icon": "Smartphone",
        "screenshotKey": "shot-2",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-3",
        "title": "System Proxy & Tunnels",
        "description": "Live inspection of local proxy connections, latency telemetry, and API status.",
        "icon": "Smartphone",
        "screenshotKey": "shot-3",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-4",
        "title": "Prompt Template Matrix",
        "description": "Curated prompt templates for instant code refactoring, translation, and creative synthesis.",
        "icon": "Smartphone",
        "screenshotKey": "shot-4",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-5",
        "title": "Multimodal Studio View",
        "description": "Visual perception dashboard analyzing complex charts and UI screenshots with zero delay.",
        "icon": "Smartphone",
        "screenshotKey": "shot-5",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-6",
        "title": "Neural Engine Settings",
        "description": "Hardware acceleration preferences and local fallback model settings.",
        "icon": "Smartphone",
        "screenshotKey": "shot-6",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-7",
        "title": "Context Memory Inspector",
        "description": "Inspect active context tokens and optimize long-range conversational threads.",
        "icon": "Smartphone",
        "screenshotKey": "shot-7",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-8",
        "title": "Code Generation View",
        "description": "Syntax highlighted snippets with one-tap copy, formatting, and file export.",
        "icon": "Smartphone",
        "screenshotKey": "shot-8",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-9",
        "title": "Conversation History",
        "description": "Searchable chronological archive with automatic tagging and cloud-free storage.",
        "icon": "Smartphone",
        "screenshotKey": "shot-9",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-10",
        "title": "Privacy & Encryption Settings",
        "description": "Toggle cryptographic storage keys and clear cached memories at will.",
        "icon": "Smartphone",
        "screenshotKey": "shot-10",
        "badge": "VERIFIED HARDWARE"
    },
    {
        "id": "feature-11",
        "title": "About INIXA AI",
        "description": "Build info, runtime environment, and open protocol details.",
        "icon": "Smartphone",
        "screenshotKey": "shot-11",
        "badge": "VERIFIED HARDWARE"
    }
],
  specs: {
    'Core Studio': 'Remix + Vite + WebContainers API + Electron',
    'Gateway Core': 'Cloudflare Workers + V8 Edge Isolate',
    'Supported Models': 'Gemini 2.0, Claude 3.5, DeepSeek R1, Grok 2, Qwen 2.5',
    'Terminal Engine': 'xterm.js + Web Links Addon',
  },
}
