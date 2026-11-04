import React, { useState } from 'react'
import {
  ShieldCheck,
  Cpu,
  Radio,
  RefreshCw,
  Sparkles,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import { DoodleIcon, ART, CrewKind } from '../footer/DoodleCrewFooter'
import { DoodleCat } from '../doodle/DoodleCat'
import { DoodlePenguin } from '../doodle/DoodleCritters'
import { navigate } from '../../router'

interface FAQItem {
  id: string
  number: string
  question: string
  badge: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  accentColor: string
  answer: string
  highlights?: string[]
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'safety',
    number: '01',
    question: 'Are these apps safe to install without Play Store?',
    badge: 'SECURITY & AUDIT',
    icon: ShieldCheck,
    accentColor: '#00ff87', // Neon emerald
    answer:
      'Yes, 100% verified and transparent. Every binary distributed through the INIXA Labs portal is compiled in reproducible CI pipelines and cryptographically signed with our private developer keys. Each release comes with a published SHA-256 checksum so you can independently verify package integrity before sideloading. Our apps contain zero advertising networks, zero third-party telemetry trackers (no Google Firebase, Facebook SDK, or Adjust), and zero obfuscated code.',
    highlights: [
      'Zero third-party trackers or ad SDKs',
      'Published SHA-256 cryptographic hashes for every build',
      'Reproducible CI builds direct from laboratory source',
    ],
  },
  {
    id: 'ai-runtime',
    number: '02',
    question: 'Does INIXA AI require an internet connection or root?',
    badge: 'AI RUNTIME & PERMISSIONS',
    icon: Cpu,
    accentColor: '#D946EF', // Cyber magenta
    answer:
      'No root access is ever required. INIXA AI operates strictly within standard sandboxed Android permission boundaries. It features a hybrid execution runtime: for lightweight summaries, offline embeddings, and drafting, on-device quantized neural models execute locally through Android NNAPI and Vulkan compute shaders with zero data leaving your phone. For heavy frontier reasoning tasks, it connects directly through encrypted, zero-logging proxies without storing user prompts or training on your conversations.',
    highlights: [
      'No root or system modifications required',
      'On-device neural inference via Vulkan & NNAPI',
      'Zero server logging, zero prompt retention',
    ],
  },
  {
    id: 'audio-pipeline',
    number: '03',
    question: 'How does the dual-catalog lossless audio pipeline work?',
    badge: 'AXION DSP & AUDIO',
    icon: Radio,
    accentColor: '#FF7A1A', // Amber glow
    answer:
      'Engineered on top of AndroidX Media3 (ExoPlayer 1.5+) and our proprietary Axion Studio audio core, BeatBox Pro seamlessly aggregates streams across YouTube Music and JioSaavn lossless audio catalogs. Audio decodes directly into a 32-bit floating-point buffer, allowing the 10-band parametric equalizer, dynamic bass exciter, and real-time word-by-word lyric parser to process audio with zero digital clipping, jitter, or downsampling.',
    highlights: [
      'Direct 32-bit float audio buffer decoding',
      'Surgical 10-band parametric EQ with studio rotary knobs',
      'Zero-delay word-by-word synced kinetic lyrics',
    ],
  },
  {
    id: 'background-updates',
    number: '04',
    question: 'How do background updates work?',
    badge: 'AUTONOMOUS OTA ENGINE',
    icon: RefreshCw,
    accentColor: '#00D2FF', // Sky cyan
    answer:
      'Because INIXA apps are independent of store gatekeepers, each app integrates our autonomous background update daemon. When a new signed release drops on the laboratory distribution server, the app verifies the cryptographic signature against its internal ledger, downloads the incremental binary diff silently or via one-tap prompt, and invokes standard Android PackageInstaller with zero manual browser navigation required.',
    highlights: [
      'Direct peer-to-cloud cryptographic signature checks',
      'Incremental delta downloads to conserve cellular data',
      'One-tap background installation without app stores',
    ],
  },
  {
    id: 'liquid-glass',
    number: '05',
    question: 'What is the Liquid Glass Design System?',
    badge: 'OPTICS & SHADERS',
    icon: Sparkles,
    accentColor: '#A855F7', // Royal violet
    answer:
      'Liquid Glass is our signature tactile mobile design language. Built using native Android AGSL (Android Graphics Shading Language) and Skia shaders, it simulates real-world physical glass optics: 120Hz gesture physics, dynamic edge refraction, chromatic aberration around interactive surfaces, and real-time backdrop blur that adapts to content without causing thermal throttling or battery drain.',
    highlights: [
      'Real-time physical prism refraction via AGSL shaders',
      '120Hz gesture physics with spring momentum',
      'Thermal-optimized GPU rendering for all-day battery life',
    ],
  },
]

export const ProductsFAQ: React.FC = () => {
  // Open the first item by default
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    safety: true,
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section className="relative w-full pt-16 pb-10 overflow-hidden select-none">
      {/* Subtle Glow Lighting in Dark Blue + Neon Emerald */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Badge & Title with Doodle Critters */}
        <div className="text-center mb-14 space-y-3.5 relative">
          {/* Peeking Penguin on FAQ */}
          <div className="flex justify-center -mb-2">
            <DoodlePenguin pose="waddling" size={54} speech="Have questions? Ask the crew! 🐧" speechAlign="top" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs font-mono font-black uppercase tracking-widest text-[#00ff87] shadow-[3px_3px_0_#be185d] -rotate-1">
            <DoodleIcon kind="bolt" size={14} />
            <span>LABORATORY DISPATCH • FAQ</span>
            <DoodleIcon kind="sparkle" size={14} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything You{' '}
            <span className="text-[#00ff87] relative inline-block">
              Need to Know
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Direct architectural answers regarding cryptographic verification, hardware permissions, custom audio DSP pipelines, and zero-telemetry foundations.
          </p>
        </div>

        {/* Collapsible FAQ Accordion List (Doodle Card Style) */}
        <div className="space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = !!openItems[item.id]
            const IconComponent = item.icon

            return (
              <div
                key={item.id}
                className={`rounded-[24px] border-2 border-white bg-[#040a18] transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'shadow-[6px_6px_0_#00ff87] -translate-y-0.5'
                    : 'shadow-[4px_4px_0_#be185d] hover:shadow-[6px_6px_0_#ffd23f] hover:-translate-y-0.5'
                }`}
              >
                {/* Accordion Question Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 sm:p-7 flex items-start sm:items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                    {/* Index Number Stamp */}
                    <span
                      className="font-mono text-sm sm:text-base font-black px-2.5 py-1 rounded-lg border-2 border-white bg-[#060e24] shadow-[2px_2px_0_#be185d] shrink-0 mt-0.5 sm:mt-0 text-[#00ff87]"
                    >
                      {item.number}
                    </span>

                    {/* Question and Badge Header */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="doodle-stamp inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border border-white"
                          style={{
                            backgroundColor: `${item.accentColor}25`,
                            color: item.accentColor,
                          }}
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{item.badge}</span>
                        </span>
                      </div>

                      <h3
                        className={`text-lg sm:text-xl font-black tracking-tight transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-100 hover:text-[#00ff87]'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Animated Chevron Button */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white transition-transform duration-200 shadow-[2px_2px_0_#be185d] ${
                      isOpen
                        ? 'rotate-180 bg-[#00ff87] text-[#020612]'
                        : 'rotate-0 bg-[#060e24] text-white hover:bg-white/10'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t-2 border-dashed border-white/20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-medium mb-5">
                      {item.answer}
                    </p>

                    {/* Key Technical Highlights Pills */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/15">
                        {item.highlights.map((hl, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060e24] border border-white/30 text-xs text-slate-200 font-bold shadow-[2px_2px_0_rgba(255,255,255,0.15)]"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: item.accentColor,
                                boxShadow: `0 0 6px ${item.accentColor}`,
                              }}
                            />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Support & Help Dispatch Banner */}
        <div className="mt-12 rounded-[28px] p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-purple-950/40 border border-white/10 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Have deeper technical inquiries or discovered an edge case?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Our engineering team publishes daily patch changelogs and reviews issue dispatches directly from the community.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/downloads')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-black bg-[#00ff87] hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Binary Vault</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Dispatch Ticket</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

