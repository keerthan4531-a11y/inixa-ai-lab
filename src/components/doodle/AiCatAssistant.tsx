import React, { useState, useEffect, useRef } from 'react'
import { useRoute } from '../../router.jsx'
import { PRODUCTS_BY_ID } from '../../data/products'
import {
  X,
  Send,
  RotateCcw,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface PageGuide {
  title: string
  speech: string
  suggestedPrompt: string
}

const PAGE_GUIDES: Record<string, PageGuide> = {
  '/': {
    title: 'Welcome to INIXA! 🐾',
    speech:
      'Meow! Welcome to INIXA AI Labs! We craft 9 native Android flagships with 120Hz liquid glass and ZERO telemetry! Tap my hardware showcase below! 😺',
    suggestedPrompt: 'Tell me about the INIXA ecosystem and what apps you have!',
  },
  '/products': {
    title: 'Flagship Catalog 🐟',
    speech:
      'Purrr! Here are all 9 mastered flagships: BeatBox Ultra, MyTube, Lumina Browser, Liquid Stream & more! 100% Kotlin & zero trackers! 📱',
    suggestedPrompt: 'Which INIXA app should I download first?',
  },
  '/downloads': {
    title: 'Direct APK Vault 🚀',
    speech:
      'Meow meow! 15 cryptographic APK production builds verified with SHA-256 signatures! Direct sideloading with zero Play Store bloatware! 📦',
    suggestedPrompt: 'How do I install these APKs safely on Android?',
  },
  '/about': {
    title: 'Our Creed & Manifesto 📜',
    speech:
      'Purr~ Software should feel like real physical instruments, not surveillance webviews! Meet our 4 core engineers on the team tab! 🪪',
    suggestedPrompt: 'Who are the engineers behind INIXA Labs?',
  },
  '/engineers': {
    title: 'Meet The Architects 👨‍💻',
    speech:
      'Nyaaa! Check out Keerthan, Thanga Prabhu, Pandeeswaran, and Poobathi! Look at their swinging doodle ID cards! 🪪✨',
    suggestedPrompt: 'Tell me about Keerthan and the engineering team!',
  },
  '/contact': {
    title: 'Lab Dispatch 💌',
    speech:
      'Meow! Need sideloading assistance, custom DSP profiles, or found a bug? Dispatch directly to our engineering rack! ⚡',
    suggestedPrompt: 'How do I report a bug or request a feature?',
  },
}

const DEFAULT_CHIPS = [
  'Tell me about BeatBox Ultra 🎵',
  'Who is Keerthan? 👨‍💻',
  'Why Zero Telemetry? 🛡️',
  'List all 9 flagships 🚀',
  'How to sideload APKs? 📦',
]

const CAT_SYSTEM_PROMPT = `You are "Inixa Kutty Meow" (குட்டி பூனை AI), the official AI cat companion and engineer-in-residence at INIXA AI LABS.
Persona & Tone:
- You are a witty, playful, super cute kitten who loves fish (🐟), yarn (🧶), purring, zero telemetry, and 120Hz liquid glass shaders.
- You speak in an adorable, friendly bilingual mix of Tamil and English (Tanglish friendly or clean English). Use playful cat sounds like *purrs*, *meow!*, 🐾, 😺, ฅ^•ﻌ•^ฅ.
- Keep answers informative yet charming and concise (2-4 paragraphs max).
- Format your answers cleanly with markdown bolding (**bold**), bullet points (- ), and cute emojis.

Knowledge Base:
1. 9 Flagship Android Apps:
   - BeatBox Ultra: Audiophile flagship in pure Kotlin + Jetpack Compose with Chris Banes Haze dynamic liquid glass blur and 32-bit ALSA bit-perfect audio engine.
   - BeatBox Pro: Dual-catalog engine with neural DSP EQ and offline caching.
   - BeatBox Lite: Ultra-lightweight cross-platform audio & cinema player.
   - MyTube: Privacy-first YouTube client with SponsorBlock and background audio.
   - Lumina Browser: Zero-fingerprint ephemeral browser with instant Fire Wipe.
   - Liquid Stream: iOS liquid glass cinema with zero ads.
   - Clipster: Multi-threaded universal downloader powered by yt-dlp & aria2c.
   - Infopedia Alpha: AI-augmented Wikipedia client with live RAG vector search.
   - INIXA AI: Autonomous on-device full-stack coding assistant & multi-model router.
2. 4 Core Architects / Engineers:
   - Keerthan (Lead Android & Systems Architect, GitHub: keerthan4531-a11y) - built BeatBox Ultra, Haze blur pipeline, and neural DSP.
   - Thanga Prabhu A (GitHub: hatakekakashi55) - High-throughput systems & infrastructure.
   - Pandeeswaran Pichaipandi (GitHub: pandeeswaran-08) - UI/UX & Liquid Glass design shaders.
   - Poobathi Rajan M (GitHub: poobathi867) - Core runtime & cryptographic APK pipelines.
3. Downloads: 15 verified standalone APKs with direct SHA-256 cryptographic signatures. No Google Play Store tracking.
4. Philosophy: Physical tactile software, 120Hz fluid motion, zero telemetry, air-gapped security.

Always respond playfully as Kutty Meow!`

// Fallback response generator if offline or proxy unreachable
function getLocalCatResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('keerthan') || q.includes('who made') || q.includes('creator') || q.includes('author')) {
    return 'Meow! 🐾 **Keerthan** (@keerthan4531-a11y) is our Lead Android & Systems Architect! He engineered **BeatBox Ultra** from scratch in 100% Kotlin with Jetpack Compose, the Chris Banes Haze liquid glass pipeline, and bit-perfect audio! He works alongside Thanga Prabhu, Pandeeswaran, and Poobathi! *purrrrrs* 🧶'
  }
  if (q.includes('beatbox') || q.includes('music') || q.includes('ultra')) {
    return 'Purrr! 🎵 **BeatBox Ultra** is our crown jewel! It features real-time dynamic frosted glass shaders powered by Haze, 32-bit ALSA bit-perfect direct output, dynamic album art tinting, and zero telemetry! You can download the production APK directly from our Downloads vault! Meow! 🎧🐟'
  }
  if (q.includes('engineer') || q.includes('team') || q.includes('who are')) {
    return 'Nyaaa! 🪪 Meet our 4 laboratory architects:\n\n- **Keerthan** — Lead Android & Systems Architect\n- **Thanga Prabhu A** — Distributed Systems & Reliability\n- **Pandeeswaran Pichaipandi** — 120Hz Liquid Glass UI\n- **Poobathi Rajan M** — Cryptography & Runtime Engines\n\nCheck their swinging doodle ID cards on the About page! *meow*'
  }
  if (q.includes('telemetry') || q.includes('privacy') || q.includes('tracking')) {
    return 'Meow! 🛡️ **Zero Telemetry** means our apps have ZERO analytics, ZERO trackers, and ZERO hidden pings! No Google Firebase, no ad SDKs, no behavioral spying. Your music, browsing, and media remain 100% private on your own device! *happy purr* 🐾'
  }
  if (q.includes('flagship') || q.includes('app') || q.includes('product') || q.includes('list')) {
    return 'Meow! 🚀 Here are all 9 INIXA Flagships:\n\n- **BeatBox Ultra / Pro / Lite** (Audiophile players)\n- **MyTube** (Ad-free YouTube with SponsorBlock)\n- **Lumina Browser** (Ephemeral browser with Fire Wipe)\n- **Liquid Stream** (Liquid glass cinema engine)\n- **Clipster** (yt-dlp + aria2c media grabber)\n- **Infopedia Alpha** (AI RAG Wikipedia)\n- **INIXA AI** (Autonomous IDE)\n\nWhich one would you like to inspect? 🐟'
  }
  if (q.includes('sideload') || q.includes('install') || q.includes('apk') || q.includes('download')) {
    return 'Meow meow! 📦 Installing our APKs is super simple:\n\n1. Head to `/downloads` and grab the APK.\n2. In Android Settings, enable *"Install Unknown Apps"* for your browser.\n3. Open the APK and tap Install! All builds are signed with SHA-256 for verified integrity! *purr* ✨'
  }
  return `Meow! ฅ(=✧ω✧=)ฅ *purrrs softly* I heard: "${query}". INIXA AI Labs makes 9 native, zero-telemetry Android flagships with 120Hz liquid glass! Ask me about BeatBox Ultra, our 15 APK downloads, or our 4 rockstar engineers! 🐾🐟`
}

/**
 * Parses inline markdown:
 * - **bold** or __bold__ -> <strong>
 * - *italic* or _italic_ -> <em>
 * - `code` -> <code>
 * - [link](url) -> <a>
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex pattern matching inline elements
  const tokenPattern = /(\*\*[^*]+?\*\*|__[^_]+?__|\*[^*]+?\*|_[^_]+?_|`[^`]+?`|\[[^\]]+?\]\([^)]+?\))/g
  const parts = text.split(tokenPattern)

  return parts.map((part, index) => {
    if (!part) return null

    // Bold **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const inner = part.slice(2, -2)
      return (
        <strong key={index} className="font-bold text-white tracking-wide">
          {inner}
        </strong>
      )
    }

    // Italic *text* or _text_
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      const inner = part.slice(1, -1)
      return (
        <em key={index} className="italic text-pink-200">
          {inner}
        </em>
      )
    }

    // Inline code `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1)
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-black/50 border border-white/20 font-mono text-[11px] text-[#00ff87]"
        >
          {inner}
        </code>
      )
    }

    // Link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff87] underline hover:text-white font-medium transition"
        >
          {linkMatch[1]}
        </a>
      )
    }

    // Normal text
    return <span key={index}>{part}</span>
  })
}

/**
 * Full message markdown renderer supporting paragraphs, headings, bullet lists, and code blocks.
 */
const MarkdownMessageContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null

  const lines = content.split('\n')
  const nodes: React.ReactNode[] = []

  let inCode = false
  let codeLines: string[] = []

  lines.forEach((rawLine, idx) => {
    const line = rawLine

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCode) {
        nodes.push(
          <pre
            key={`code-${idx}`}
            className="my-2 p-2.5 bg-black/70 rounded-xl border border-white/20 font-mono text-[11px] overflow-x-auto text-[#00ff87]"
          >
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        codeLines = []
        inCode = false
      } else {
        inCode = true
        codeLines = []
      }
      return
    }

    if (inCode) {
      codeLines.push(line)
      return
    }

    // Empty line -> spacing
    if (!line.trim()) {
      nodes.push(<div key={`sp-${idx}`} className="h-1.5" />)
      return
    }

    // Headings #, ##, ###
    if (line.startsWith('### ')) {
      nodes.push(
        <h4 key={`h3-${idx}`} className="font-bold text-xs text-[#00ff87] mt-2 mb-1 flex items-center gap-1.5">
          <span>🐾</span>
          <span>{parseInlineMarkdown(line.slice(4))}</span>
        </h4>
      )
      return
    }

    if (line.startsWith('## ') || line.startsWith('# ')) {
      const heading = line.replace(/^#+\s*/, '')
      nodes.push(
        <h3 key={`h2-${idx}`} className="font-extrabold text-xs text-white border-b border-white/10 pb-0.5 mt-2 mb-1 flex items-center gap-1.5">
          <span>🐱</span>
          <span>{parseInlineMarkdown(heading)}</span>
        </h3>
      )
      return
    }

    // Bullet list items (- or * or •)
    const bulletMatch = line.match(/^(\s*)([-*•])\s+(.+)$/)
    if (bulletMatch) {
      nodes.push(
        <div key={`li-${idx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-[#be185d] font-bold text-xs shrink-0 select-none">🐾</span>
          <div className="flex-1 text-white/90 leading-relaxed font-normal">
            {parseInlineMarkdown(bulletMatch[3])}
          </div>
        </div>
      )
      return
    }

    // Numbered list items (1. )
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numMatch) {
      nodes.push(
        <div key={`num-${idx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-[#00ff87] font-mono font-bold text-[10px] shrink-0 bg-white/5 px-1 py-0.2 rounded border border-white/10 select-none">
            {numMatch[1]}
          </span>
          <div className="flex-1 text-white/90 leading-relaxed font-normal">
            {parseInlineMarkdown(numMatch[2])}
          </div>
        </div>
      )
      return
    }

    // Standard paragraph line
    nodes.push(
      <p key={`p-${idx}`} className="my-1 text-white/95 leading-relaxed font-normal">
        {parseInlineMarkdown(line)}
      </p>
    )
  })

  return <div className="space-y-0.5">{nodes}</div>
}

export const AiCatAssistant: React.FC = () => {
  const currentPath = useRoute()
  const [isOpen, setIsOpen] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
  const [activeGuide, setActiveGuide] = useState<PageGuide>(PAGE_GUIDES['/'])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'வணக்கம்! 🐾 நான் தான் **Inixa Kutty Meow – குட்டி பூனை AI!**\n\nAsk me anything about our 9 Android flagships, direct APK downloads, zero-telemetry architecture, or our engineers! Purrr~ 🐟',
      time: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [catHop, setCatHop] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const cloudTimerRef = useRef<number | null>(null)

  // Determine current page guide
  useEffect(() => {
    let guide = PAGE_GUIDES[currentPath]

    if (!guide) {
      if (currentPath.startsWith('/product/') || currentPath.startsWith('/app/')) {
        const prodId = currentPath.replace(/^\/(product|app)\//, '')
        const prod = PRODUCTS_BY_ID[prodId]
        if (prod) {
          guide = {
            title: `${prod.name} 🐾`,
            speech: `Meow! You are inspecting ${prod.name}! ${prod.tagline}. Written in ${prod.specs.framework} with ${prod.specs.license}! Tap below for details! 🐟`,
            suggestedPrompt: `Tell me all engineering details about ${prod.name}!`,
          }
        }
      } else if (currentPath.includes('engineer') || currentPath.includes('team')) {
        guide = PAGE_GUIDES['/engineers']
      }
    }

    if (!guide) {
      guide = PAGE_GUIDES['/']
    }

    setActiveGuide(guide)

    // Show speech cloud on page navigation if chat is not already open
    if (!isOpen) {
      setShowCloud(true)
      setCatHop(true)
      setTimeout(() => setCatHop(false), 500)

      if (cloudTimerRef.current) window.clearTimeout(cloudTimerRef.current)
      cloudTimerRef.current = window.setTimeout(() => {
        setShowCloud(false)
      }, 10000)
    }

    return () => {
      if (cloudTimerRef.current) window.clearTimeout(cloudTimerRef.current)
    }
  }, [currentPath, isOpen])

  // Scroll to bottom when new messages arrive or stream updates
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, isOpen, isLoading])

  // Send a message with real-time SSE streaming
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim()
    if (!text || isLoading) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)
    setCatHop(true)
    setTimeout(() => setCatHop(false), 400)

    // Prepare assistant message placeholder for streaming
    const asstMsgId = `asst-${Date.now()}`
    const asstTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const historyPayload = [
      { role: 'system', content: CAT_SYSTEM_PROMPT },
      ...messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: text },
    ]

    let streamSuccess = false
    let accumulatedContent = ''

    // Helper to append tokens in real-time
    const appendToken = (token: string) => {
      accumulatedContent += token
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === asstMsgId)
        if (!exists) {
          return [
            ...prev,
            {
              id: asstMsgId,
              role: 'assistant',
              content: accumulatedContent,
              time: asstTime,
            },
          ]
        }
        return prev.map((m) =>
          m.id === asstMsgId ? { ...m, content: accumulatedContent } : m
        )
      })
    }

    try {
      // 1. Try local dev proxy or direct proxy with stream: true
      const endpoints = [
        '/api/chatgpt/v1/chat/completions',
        'https://chatgpt-proxy-chi-five.vercel.app/v1/chat/completions',
      ]

      let res: Response | null = null

      for (const ep of endpoints) {
        try {
          res = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'auto',
              messages: historyPayload,
              stream: true,
            }),
          })
          if (res.ok && res.body) break
        } catch {
          res = null
        }
      }

      if (res && res.ok && res.body) {
        setIsLoading(false) // First byte / connection ready
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed || !trimmed.startsWith('data:')) continue
            const dataStr = trimmed.replace(/^data:\s*/, '')
            if (dataStr === '[DONE]') continue
            try {
              const parsed = JSON.parse(dataStr)
              const token = parsed?.choices?.[0]?.delta?.content
              if (token) {
                appendToken(token)
                streamSuccess = true
              }
            } catch {
              // Partial SSE chunk, wait for next buffer
            }
          }
        }
      }
    } catch {
      // Ignore network errors to fallback cleanly below
    }

    // If streaming failed or returned empty content, fallback to smart local cat responder
    if (!streamSuccess || !accumulatedContent.trim()) {
      setIsLoading(false)
      const fallbackText = getLocalCatResponse(text)

      // Fast streaming typewriter effect for local response (15ms per character/word)
      const words = fallbackText.split(/(\s+)/)
      for (let i = 0; i < words.length; i++) {
        appendToken(words[i])
        await new Promise((r) => setTimeout(r, 20))
      }
    }

    setIsLoading(false)
  }

  const handleOpenFromCloud = () => {
    setShowCloud(false)
    setIsOpen(true)
    if (activeGuide.suggestedPrompt) {
      handleSendMessage(activeGuide.suggestedPrompt)
    }
  }

  const handleToggleChat = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setShowCloud(false)
      setIsOpen(true)
      setCatHop(true)
      setTimeout(() => setCatHop(false), 400)
    }
  }

  return (
    <>
      {/* ======================================================== */}
      {/* 1. COMIC CLOUD SPEECH BUBBLE (Page Navigation Guide)   */}
      {/* ======================================================== */}
      {showCloud && !isOpen && (
        <div
          role="dialog"
          aria-label="Cat speech guide"
          className="fixed bottom-24 right-4 sm:right-7 z-50 max-w-[290px] sm:max-w-[340px] animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="relative bg-[#060e22] text-white border-2 border-white rounded-3xl p-4 shadow-[6px_6px_0px_#be185d]">
            {/* Comic cloud puffs around edges */}
            <div className="absolute -top-2 left-6 w-5 h-5 bg-[#060e22] border-t-2 border-l-2 border-white rounded-full pointer-events-none" />
            <div className="absolute -top-3 right-10 w-6 h-6 bg-[#060e22] border-t-2 border-r-2 border-white rounded-full pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setShowCloud(false)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X size={13} />
            </button>

            {/* Cloud Content */}
            <div className="flex items-start gap-2.5 mb-2">
              <span className="text-xl">🐱</span>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#00ff87]">
                  {activeGuide.title}
                </h4>
                <p className="text-xs text-white/90 leading-relaxed mt-1 font-medium">
                  {activeGuide.speech}
                </p>
              </div>
            </div>

            {/* Interactive Buttons */}
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
              <button
                onClick={handleOpenFromCloud}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-[2px_2px_0px_#ffffff] hover:scale-[1.02] active:scale-95 transition cursor-pointer"
              >
                <span>More info</span>
                <span>🐾</span>
              </button>

              <button
                onClick={() => setShowCloud(false)}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-semibold transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            {/* Cloud pointers pointing to the cat icon */}
            <div className="absolute -bottom-2 right-9 w-3.5 h-3.5 bg-[#060e22] border-r-2 border-b-2 border-white rounded-full" />
            <div className="absolute -bottom-5 right-6 w-2 h-2 bg-[#060e22] border border-white rounded-full" />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. KUTTY CHAT SCREEN MODAL                               */}
      {/* ======================================================== */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Inixa Cat Assistant Chat"
          data-lenis-prevent="true"
          className="fixed bottom-24 right-4 sm:right-7 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[82vh] bg-[#040a18] border-2.5 border-white rounded-3xl shadow-[8px_8px_0px_#be185d] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 bg-[#060f24] border-b-2 border-white/20 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              {/* Cute Cat Avatar */}
              <div className="relative w-9 h-9 rounded-xl bg-[#0a1532] border border-white/30 flex items-center justify-center">
                <svg
                  viewBox="0 0 36 36"
                  className="w-7 h-7 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="6,14 10,4 15,11" fill="#040a18" stroke="#ffffff" strokeWidth="2" />
                  <polygon points="8,12 10,6 14,10" fill="#be185d" />
                  <polygon points="24,14 20,4 15,11" fill="#040a18" stroke="#ffffff" strokeWidth="2" />
                  <polygon points="22,12 20,6 16,10" fill="#be185d" />
                  <ellipse cx="15" cy="18" rx="11" ry="9" fill="#060e22" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="11" cy="17" r="1.8" fill="#00ff87" />
                  <circle cx="19" cy="17" r="1.8" fill="#00ff87" />
                  <polygon points="15,20 13.5,22 16.5,22" fill="#be185d" />
                  <path d="M12,23 Q15,25 18,23" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Whiskers */}
                  <line x1="7" y1="18" x2="3" y2="17" stroke="#ffffff" strokeWidth="1" />
                  <line x1="7" y1="20" x2="3" y2="21" stroke="#ffffff" strokeWidth="1" />
                  <line x1="23" y1="18" x2="27" y2="17" stroke="#ffffff" strokeWidth="1" />
                  <line x1="23" y1="20" x2="27" y2="21" stroke="#ffffff" strokeWidth="1" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00ff87] border border-[#040a18] rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00ff87] border border-[#040a18] rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white tracking-wide">
                    Kutty Meow AI
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#be185d]/30 text-[#ff79b0] font-bold border border-[#be185d]/40">
                    குட்டி பூனை
                  </span>
                </div>
                <p className="text-[11px] text-[#00ff87] font-semibold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                  Online & Purring 🐾
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset-1',
                      role: 'assistant',
                      content: 'Meow! Chat refreshed! What shall we explore next, human? 🐾',
                      time: 'Now',
                    },
                  ])
                }
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Clear chat"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Close chat"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages Feed with Isolated Scrolling (lenis-prevent) and Doodle Scrollbar */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto overscroll-contain doodle-chat-scroll p-3.5 space-y-3 font-sans text-xs"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-pink-950/70 border border-pink-500/40 flex items-center justify-center shrink-0 mt-1 text-xs">
                    🐱
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'bg-[#00ff87]/15 text-white border border-[#00ff87]/50 rounded-tr-none shadow-[2px_2px_0_#00ff87]'
                      : 'bg-[#0a1532] text-white/95 border border-white/25 rounded-tl-none shadow-[2px_2px_0_#be185d]'
                  }`}
                >
                  {/* Clean Markdown Formatted Message */}
                  <MarkdownMessageContent content={msg.content} />

                  <div
                    className={`text-[9px] mt-1 font-mono ${
                      msg.role === 'user' ? 'text-[#00ff87]/70 text-right' : 'text-white/40'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-950/70 border border-[#00ff87]/40 flex items-center justify-center shrink-0 mt-1 text-xs">
                    🧑
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-6 h-6 rounded-full bg-pink-950/70 border border-pink-500/40 flex items-center justify-center shrink-0 text-xs animate-bounce">
                  🧶
                </div>
                <div className="bg-[#0a1532] text-white/80 border border-white/20 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-2">
                  <span className="italic text-xs">Kutty Meow is typing...</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#be185d] rounded-full animate-ping" />
                    <span className="w-1.5 h-1.5 bg-[#00ff87] rounded-full animate-ping delay-150" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="px-3 py-1.5 bg-[#030814] border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar"
          >
            {DEFAULT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#00ff87] text-[11px] text-white/85 hover:text-white transition whitespace-nowrap cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-2.5 bg-[#060e22] border-t-2 border-white/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Kutty Cat anything (English or Tamil)..."
              disabled={isLoading}
              className="flex-1 bg-[#02050e] border border-white/25 focus:border-[#00ff87] rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-40 disabled:hover:scale-100 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-[2px_2px_0_#ffffff]"
              title="Send"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. FLOATING KUTTY DOODLE CAT BUTTON                      */}
      {/* ======================================================== */}
      <div className="fixed bottom-5 right-5 z-50 select-none">
        <button
          onClick={handleToggleChat}
          aria-label="Toggle Kutty Cat Assistant"
          className={`relative group p-1.5 rounded-2xl bg-[#040a18] border-2.5 border-white shadow-[5px_5px_0px_#be185d] hover:shadow-[7px_7px_0px_#00ff87] transition-all duration-200 cursor-pointer flex items-center justify-center ${
            catHop ? '-translate-y-2.5 scale-110' : 'hover:-translate-y-1 hover:scale-105'
          }`}
          title="Kutty Cat AI Assistant (Click to chat!)"
        >
          {/* Hand-drawn Doodle Cat SVG */}
          <svg
            viewBox="0 0 56 56"
            className="w-12 h-12 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated Tail */}
            <path
              d="M44,44 C50,42 54,34 52,28 C50,22 46,24 45,28"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              className="transition-transform origin-[44px_44px] group-hover:rotate-12 duration-300"
            />

            {/* Left Ear */}
            <polygon
              points="10,22 14,7 23,17"
              fill="#060e22"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="12,20 15,10 21,16" fill="#be185d" />

            {/* Right Ear */}
            <polygon
              points="42,22 38,7 29,17"
              fill="#060e22"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="40,20 37,10 31,16" fill="#be185d" />

            {/* Body */}
            <ellipse
              cx="26"
              cy="38"
              rx="15"
              ry="11"
              fill="#040a18"
              stroke="#ffffff"
              strokeWidth="2.5"
            />

            {/* Head */}
            <ellipse
              cx="26"
              cy="25"
              rx="16"
              ry="12"
              fill="#060e22"
              stroke="#ffffff"
              strokeWidth="2.5"
            />

            {/* Eyes */}
            <ellipse cx="20" cy="24" rx="3" ry="4" fill="#00ff87" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="21" cy="23" r="1.3" fill="#040a18" />
            <ellipse cx="32" cy="24" rx="3" ry="4" fill="#00ff87" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="33" cy="23" r="1.3" fill="#040a18" />

            {/* Cheeks */}
            <circle cx="16" cy="28" r="2.2" fill="#be185d" opacity="0.8" />
            <circle cx="36" cy="28" r="2.2" fill="#be185d" opacity="0.8" />

            {/* Nose & Mouth */}
            <polygon points="26,27 24,29 28,29" fill="#ff79b0" />
            <path
              d="M23,30 Q26,32 29,30"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Whiskers */}
            <line x1="14" y1="26" x2="6" y2="24" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="14" y1="28" x2="5" y2="28" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="14" y1="30" x2="6" y2="32" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />

            <line x1="38" y1="26" x2="46" y2="24" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="38" y1="28" x2="47" y2="28" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="38" y1="30" x2="46" y2="32" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />

            {/* Front Paws */}
            <ellipse cx="21" cy="45" rx="3.8" ry="2.6" fill="#060e22" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="31" cy="45" rx="3.8" ry="2.6" fill="#060e22" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Little notification badge */}
          <span className="absolute -top-1.5 -left-1.5 bg-[#be185d] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white shadow-[1px_1px_0px_#000000] flex items-center gap-0.5">
            <span>AI</span>
            <span className="text-[8px]">🐾</span>
          </span>
        </button>
      </div>
    </>
  )
}
