import React, { useState } from 'react'
import { DoodleHeroBackground } from '../components/doodle/DoodleHeroBackground'
import { InixaFooter } from '../components/footer/InixaFooter'
import { DoodleIcon } from '../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin } from '../components/doodle/DoodleCritters'
import { ALL_PRODUCTS } from '../data/products'
import { navigate } from '../router'
import {
  Mail,
  Send,
  CheckCircle,
  Code2,
  MessageSquare,
  Sparkles,
  Bug,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Users,
  Terminal,
  Cpu,
  Smartphone,
  ChevronDown,
  HelpCircle,
  Radio,
  Clock,
  Lock,
  Layers,
  FileCode,
  AlertTriangle,
} from 'lucide-react'

// Sideloading & Installation FAQ Data
const CONTACT_FAQS = [
  {
    q: 'How do I grant "Install Unknown Apps" permission on Android?',
    badge: 'SIDELOADING GUIDE',
    accent: '#00ff87',
    answer:
      'When you tap Download APK on Android, your browser will prompt: "For your security, your phone is not allowed to install unknown apps from this source." Tap Settings on the prompt, toggle "Allow from this source", and return to complete installation. On Samsung OneUI: Settings → Security & Privacy → Install Unknown Apps. On Google Pixel: Settings → Apps → Special app access → Install unknown apps.',
  },
  {
    q: 'Why does Google Play Protect display a warning on installation?',
    badge: 'PLAY PROTECT EXPLAINED',
    accent: '#ffd23f',
    answer:
      'Because INIXA apps are independent open-source binaries distributed directly without Google Play Console intermediaries or Google advertising SDKs. Google Play Protect flags any high-performance binary that lacks Google telemetry identifiers. Tap "More details" and then "Install anyway". You can independently verify our published SHA-256 checksums to prove the binary is untouched.',
  },
  {
    q: 'How do I verify the cryptographic SHA-256 hash before installing?',
    badge: 'SECURITY AUDIT',
    accent: '#00d2ff',
    answer:
      'Every APK card on our Downloads page lists an exact 64-character SHA-256 fingerprint. On Windows: run `certutil -hashfile filename.apk SHA256`. On macOS / Linux / Android Termux: run `sha256sum filename.apk`. If the hash matches character-for-character, the APK is mathematically proven to be 100% genuine and untampered.',
  },
  {
    q: 'How do background automatic updates work without Google Play?',
    badge: 'OTA ARCHITECTURE',
    accent: '#be185d',
    answer:
      'Each INIXA flagship app features an autonomous peer-to-cloud update check. When a new stable version is tagged on our repository, the app checks the cryptographic signature, downloads the incremental APK package in the background, and prompts you to update in one tap with zero Play Store account required.',
  },
]

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Bug Telemetry',
    targetApp: 'BeatBox Ultra',
    androidVersion: 'Android 14 (API 34)',
    chipset: 'Qualcomm Snapdragon 8 Gen 3',
    message: '',
    includeLogcat: false,
    logcatText: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 pb-16 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white overflow-hidden font-sans">
      {/* Living Sketchbook Doodle Canvas Background */}
      <DoodleHeroBackground />

      {/* Living Sketchbook Doodle Styles */}
      <style>{`
        .doodle-card {
          position: relative;
          background: #040a18;
          border: 2px solid #ffffff;
          box-shadow: 5px 5px 0 #be185d;
          transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.2s cubic-bezier(0.3, 1.4, 0.5, 1);
        }
        @media (min-width: 640px) {
          .doodle-card {
            border-width: 2.5px;
            box-shadow: 6px 6px 0 #be185d;
          }
        }
        .doodle-card:hover {
          transform: translateY(-2px) rotate(-0.3deg);
          box-shadow: 7px 7px 0 #00ff87;
        }
        .doodle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          font-weight: 850;
          letter-spacing: -0.01em;
          transition: transform 0.18s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.18s cubic-bezier(0.3, 1.4, 0.5, 1);
          cursor: pointer;
        }
        .doodle-btn-green {
          background: linear-gradient(135deg, #00ff87, #10b981);
          color: #020612;
          border: 2px solid #ffffff;
          box-shadow: 3px 3px 0 #be185d;
        }
        .doodle-btn-green:hover {
          transform: translateY(-2px) rotate(-1.2deg);
          box-shadow: 5px 5px 0 #ffd23f;
        }
        .doodle-btn-green:active {
          transform: translateY(2px);
          box-shadow: 1px 1px 0 #be185d;
        }
        .doodle-btn-outline {
          background: #040a18;
          color: #ffffff;
          border: 2px solid #ffffff;
          box-shadow: 3px 3px 0 #00ff87;
        }
        .doodle-btn-outline:hover {
          transform: translateY(-2px) rotate(1.2deg);
          border-color: #00ff87;
          box-shadow: 5px 5px 0 #be185d;
        }
        .doodle-stamp {
          border: 2px dashed #00ff87;
          transform: rotate(-1.5deg);
          font-weight: 900;
          text-transform: uppercase;
        }
        .doodle-input {
          width: 100%;
          background: #060e24;
          border: 2px solid #ffffff;
          border-radius: 14px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          box-shadow: 3px 3px 0 #be185d;
          transition: all 0.2s ease;
        }
        @media (min-width: 640px) {
          .doodle-input {
            border-radius: 16px;
            padding: 12px 16px;
          }
        }
        .doodle-input:focus {
          border-color: #00ff87;
          box-shadow: 4px 4px 0 #00ff87;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* ======================================================== */}
        {/* HERO SECTION: Title, Stamped Badge & Mascot Critters     */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative pt-2">
          {/* Animated Doodle Critters perched atop header (hidden on very small screens to avoid clutter) */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 -mb-2 relative z-20 pointer-events-auto">
            <DoodleBird pose="singing" size={44} speech="Send logs or say hi! ♪" speechAlign="top" />
            <DoodleCat pose="sitting" size={52} speech="Engineers reply in 24h! 🐾" speechAlign="top" />
            <div className="hidden sm:block">
              <DoodlePenguin pose="waddling" size={48} speech="Zero spam guaranteed 🐧" speechAlign="top" />
            </div>
          </div>

          {/* Stamped Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-white bg-[#040a18] shadow-[3px_3px_0_#be185d] -rotate-1 mb-4 sm:mb-5">
            <DoodleIcon kind="bolt" size={13} />
            <span className="text-[11px] sm:text-xs font-mono font-black tracking-widest uppercase text-[#00ff87]">
              INIXA LABS DISPATCH &bull; 24H ENGINEER SLA
            </span>
            <DoodleIcon kind="sparkle" size={13} />
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-3 sm:mb-4">
            Connect With <br />
            <span className="text-[#00ff87] relative inline-block">
              INIXA Engineers
              {/* Hand-drawn squiggly underline */}
              <svg
                className="absolute -bottom-2.5 sm:-bottom-3 left-0 w-full h-3 sm:h-4"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4"
                  fill="none"
                  stroke="#be185d"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto font-medium mt-4 sm:mt-6 px-2">
            No support bots, no bureaucratic ticketing mazes. Communicate directly with Keerthan, Thanga Prabhu, Pandeeswaran, and Poobathi regarding system architectures, crash telemetry, and custom builds.
          </p>

          {/* Live SLA & Engineering Guarantees Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono font-bold">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060e24] border border-white/30 text-emerald-300">
              <Clock className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>&lt;24 Hour Response</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060e24] border border-white/30 text-neutral-200">
              <Lock className="w-3.5 h-3.5 text-[#ffd23f]" />
              <span>Zero-Spam Air-Gap</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060e24] border border-white/30 text-pink-300">
              <Users className="w-3.5 h-3.5 text-[#be185d]" />
              <span>100% Human Engineers</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4 IN-DEPTH LABORATORY CHANNELS GRID                      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-16">
          {/* Channel 1: Core Architecture */}
          <div className="doodle-card rounded-[22px] p-5 sm:p-6 border-2 border-white shadow-[4px_4px_0_#00ff87] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#00ff87]">
                  <Cpu className="w-5 h-5 text-[#00ff87]" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#00ff87] uppercase border border-white/40 px-2 py-0.5 rounded-full">
                  SYSTEMS &bull; 01
                </span>
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mb-1">
                Architecture &amp; Core
              </h3>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-4">
                Discuss custom ALSA audio pipelines, local LLM quantization on Vulkan compute, and 120Hz AGSL shaders directly with lead architect Keerthan.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15">
              <span className="text-[11px] font-mono font-bold text-[#00ff87]">
                inixa.labs@gmail.com
              </span>
            </div>
          </div>

          {/* Channel 2: Hardware Bug Telemetry */}
          <div className="doodle-card rounded-[22px] p-5 sm:p-6 border-2 border-white shadow-[4px_4px_0_#be185d] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#be185d]">
                  <Bug className="w-5 h-5 text-[#be185d]" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#be185d] uppercase border border-white/40 px-2 py-0.5 rounded-full">
                  LOGCAT &bull; 02
                </span>
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mb-1">
                Hardware Bug Telemetry
              </h3>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-4">
                Report playback stutters, memory release faults, or vendor GPU crashes on Samsung OneUI, Pixel, HyperOS, or ColorOS flagships.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15">
              <span className="text-[11px] font-mono font-bold text-[#be185d]">
                Include SoC &amp; Android API
              </span>
            </div>
          </div>

          {/* Channel 3: Security & Cryptographic Audits */}
          <div className="doodle-card rounded-[22px] p-5 sm:p-6 border-2 border-white shadow-[4px_4px_0_#ffd23f] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#ffd23f]">
                  <ShieldCheck className="w-5 h-5 text-[#ffd23f]" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#ffd23f] uppercase border border-white/40 px-2 py-0.5 rounded-full">
                  AUDIT &bull; 03
                </span>
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mb-1">
                Cryptographic Audits
              </h3>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-4">
                Verify published SHA-256 build signatures, air-gap containment proofs, and independently validate zero-telemetry network isolation.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15">
              <span className="text-[11px] font-mono font-bold text-[#ffd23f]">
                100% Offline Assurance
              </span>
            </div>
          </div>

          {/* Channel 4: Open Source Community */}
          <div className="doodle-card rounded-[22px] p-5 sm:p-6 border-2 border-white shadow-[4px_4px_0_#00d2ff] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#00d2ff]">
                  <Code2 className="w-5 h-5 text-[#00d2ff]" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#00d2ff] uppercase border border-white/40 px-2 py-0.5 rounded-full">
                  GITHUB &bull; 04
                </span>
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mb-1">
                Open Repositories
              </h3>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-4">
                Inspect source repositories, submit pull requests, and contribute to RAG indexing or hardware shader algorithms across 23+ repos.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15">
              <a
                href="https://github.com/keerthan4531-a11y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono font-bold text-[#00d2ff] hover:underline flex items-center gap-1"
              >
                <span>@keerthan4531-a11y</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN FORM & SIDEBAR DISPATCH CONSOLE                     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20">
          {/* Left Column: Direct Engineer Cards & Office Hours */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Engineers Roster Banner */}
            <div className="doodle-card rounded-[26px] p-6 border-2 border-white shadow-[5px_5px_0_#ffd23f]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#ffd23f]" />
                  <h3 className="font-black text-white text-lg">Core Lab Roster</h3>
                </div>
                <span className="doodle-stamp px-2.5 py-0.5 rounded-full text-[10px] bg-[#ffd23f] text-black">
                  4 ARCHITECTS
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-4">
                Want to learn about individual credentials, specializations, and hanging lanyard ID badges?
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-[#060e24] border border-white/20">
                  <span className="font-bold text-white">Keerthan</span>
                  <span className="text-[#00ff87]">Lead Architect</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-[#060e24] border border-white/20">
                  <span className="font-bold text-white">Thanga Prabhu A</span>
                  <span className="text-[#00d2ff]">Systems &amp; AGSL</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-[#060e24] border border-white/20">
                  <span className="font-bold text-white">Pandeeswaran P</span>
                  <span className="text-[#ffd23f]">AI &amp; RAG MERN</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-[#060e24] border border-white/20">
                  <span className="font-bold text-white">Poobathi Rajan M</span>
                  <span className="text-pink-400">Software Systems</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/engineers')}
                className="doodle-btn doodle-btn-green w-full justify-center py-2.5 text-xs font-black text-[#020612]"
              >
                <span>Inspect Hanging ID Badges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hardware Testing Matrix Card */}
            <div className="doodle-card rounded-[26px] p-6 border-2 border-white shadow-[5px_5px_0_#be185d]">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-[#00ff87]" />
                <h3 className="font-black text-white text-base">Physical Test Lab Rack</h3>
              </div>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-3">
                Our physical test rack runs 56 unedited hardware captures across flagship silicon:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-[#060e24] border border-white/20 text-neutral-200">
                  &bull; Snapdragon 8 Gen 1&ndash;3
                </div>
                <div className="p-2 rounded-lg bg-[#060e24] border border-white/20 text-neutral-200">
                  &bull; Google Tensor G2&ndash;G4
                </div>
                <div className="p-2 rounded-lg bg-[#060e24] border border-white/20 text-neutral-200">
                  &bull; Dimensity 9000&ndash;9300
                </div>
                <div className="p-2 rounded-lg bg-[#060e24] border border-white/20 text-neutral-200">
                  &bull; Android 8.0 &ndash; 15+
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Terminal (Form) */}
          <div className="lg:col-span-7">
            <div className="doodle-card rounded-[28px] sm:rounded-[34px] p-6 sm:p-10 border-2 border-white shadow-[7px_7px_0_#00ff87]">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#00ff87] border-2 border-white shadow-[4px_4px_0_#be185d] flex items-center justify-center text-[#020612]">
                    <CheckCircle className="w-9 h-9 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Dispatch Logged Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-medium leading-relaxed">
                    Thank you! Your dispatch has been routed to the INIXA engineering inbox. Lead architect Keerthan or a core systems engineer will review the parameters and reply to <span className="font-mono text-[#00ff87]">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        category: 'Bug Telemetry',
                        targetApp: 'BeatBox Ultra',
                        androidVersion: 'Android 14 (API 34)',
                        chipset: 'Qualcomm Snapdragon 8 Gen 3',
                        message: '',
                        includeLogcat: false,
                        logcatText: '',
                      })
                    }}
                    className="mt-4 doodle-btn doodle-btn-outline px-6 py-2.5 text-xs font-black text-white"
                  >
                    Transmit Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-dashed border-white/20">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-[#00ff87]" />
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        Laboratory Dispatch Console
                      </h2>
                    </div>
                    <span className="doodle-stamp px-2.5 py-0.5 rounded-full text-[10px] bg-[#00ff87] text-[#020612]">
                      DIRECT TO METAL
                    </span>
                  </div>

                  {/* Dispatch Category Selector Pills */}
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-2">
                      1. Dispatch Category:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Bug Telemetry',
                        'Architecture Inquiry',
                        'Audio DSP Pipeline',
                        'Local AI & RAG',
                        'Security Audit',
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black transition-all cursor-pointer ${
                            formData.category === cat
                              ? 'bg-[#00ff87] text-[#020612] border-2 border-white shadow-[2px_2px_0_#be185d] scale-105'
                              : 'bg-[#060e24] text-neutral-300 border border-white/40 hover:border-white hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Identity: Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                        Your Name / Handle:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera (@dev)"
                        className="doodle-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                        Return Email Address:
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="doodle-input"
                      />
                    </div>
                  </div>

                  {/* Target Product App Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                        Target App:
                      </label>
                      <select
                        value={formData.targetApp}
                        onChange={(e) => setFormData({ ...formData, targetApp: e.target.value })}
                        className="doodle-input cursor-pointer"
                      >
                        {ALL_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.name} className="bg-[#040a18] text-white">
                            {p.name}
                          </option>
                        ))}
                        <option value="General Ecosystem" className="bg-[#040a18] text-white">
                          General Ecosystem
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                        Android OS:
                      </label>
                      <select
                        value={formData.androidVersion}
                        onChange={(e) => setFormData({ ...formData, androidVersion: e.target.value })}
                        className="doodle-input cursor-pointer"
                      >
                        <option value="Android 15 (Vanilla Ice Cream)">Android 15 (API 35)</option>
                        <option value="Android 14 (Upside Down Cake)">Android 14 (API 34)</option>
                        <option value="Android 13 (Tiramisu)">Android 13 (API 33)</option>
                        <option value="Android 12 / 12L">Android 12 (API 31/32)</option>
                        <option value="Android 10 - 11">Android 10 - 11 (API 29/30)</option>
                        <option value="Android 8.0 - 9.0">Android 8.0 - 9.0 (API 26-28)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                        Device Silicon:
                      </label>
                      <select
                        value={formData.chipset}
                        onChange={(e) => setFormData({ ...formData, chipset: e.target.value })}
                        className="doodle-input cursor-pointer"
                      >
                        <option value="Snapdragon 8 Gen 1-3">Snapdragon 8 Gen 1-3</option>
                        <option value="Snapdragon 7 / 6 Series">Snapdragon Midrange</option>
                        <option value="Google Tensor G2-G4">Google Tensor G2-G4</option>
                        <option value="MediaTek Dimensity 9000+">MediaTek Dimensity Flagship</option>
                        <option value="Samsung Exynos">Samsung Exynos</option>
                        <option value="Other / Emulator">Other Silicon / PC</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-mono font-black uppercase text-neutral-300 mb-1.5">
                      Technical Dispatch Details:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the issue, requested shader feature, audio routing question, or architecture proposal..."
                      className="doodle-input resize-none"
                    />
                  </div>

                  {/* Optional Logcat Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, includeLogcat: !formData.includeLogcat })
                      }
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00ff87] hover:underline cursor-pointer"
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>
                        {formData.includeLogcat ? '[-] Hide Logcat Snippet' : '[+] Attach Logcat / Stack Trace'}
                      </span>
                    </button>

                    {formData.includeLogcat && (
                      <div className="mt-2 animate-in fade-in duration-200">
                        <textarea
                          rows={3}
                          value={formData.logcatText}
                          onChange={(e) => setFormData({ ...formData, logcatText: e.target.value })}
                          placeholder="Paste adb logcat snippet or exception trace here..."
                          className="doodle-input font-mono text-xs bg-[#020612]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="doodle-btn doodle-btn-green w-full justify-center py-3.5 text-xs sm:text-sm font-black text-[#020612] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Dispatch to INIXA Engineering</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ANDROID SIDELOADING & INSTALLATION HELP FAQ ACCORDION     */}
        {/* ======================================================== */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="doodle-stamp px-3 py-1 rounded-full text-xs bg-[#00d2ff] text-[#020612] shadow-[2px_2px_0_#be185d]">
              INSTALLATION &amp; TROUBLESHOOTING
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              Direct Sideloading Help &amp; FAQ
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-medium">
              Common solutions regarding Android unknown sources, Google Play Protect prompts, and SHA-256 verification.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div
                  key={idx}
                  className={`rounded-[22px] border-2 border-white bg-[#040a18] transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'shadow-[6px_6px_0_#00ff87] -translate-y-0.5'
                      : 'shadow-[4px_4px_0_#be185d] hover:shadow-[5px_5px_0_#ffd23f]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span
                        className="doodle-stamp px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black"
                        style={{ backgroundColor: `${faq.accent}20`, color: faq.accent }}
                      >
                        {faq.badge}
                      </span>
                      <h3
                        className={`text-base sm:text-lg font-black transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-200 hover:text-[#00ff87]'
                        }`}
                      >
                        {faq.q}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-white transition-transform duration-200 shadow-[2px_2px_0_#be185d] ${
                        isOpen ? 'rotate-180 bg-[#00ff87] text-[#020612]' : 'bg-[#060e24] text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t-2 border-dashed border-white/20 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Official Living Sketchbook Footer (Rendered once cleanly) */}
      <InixaFooter />
    </div>
  )
}
