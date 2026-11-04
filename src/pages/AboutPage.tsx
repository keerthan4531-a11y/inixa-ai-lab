import React, { useState, useEffect } from 'react'
import { DoodleHeroBackground } from '../components/doodle/DoodleHeroBackground'
import { HangingIdCard, EngineerProfile } from '../components/doodle/HangingIdCard'
import { InixaFooter } from '../components/footer/InixaFooter'
import { DoodleIcon, ART, CrewKind } from '../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin, DoodleSketchArrow } from '../components/doodle/DoodleCritters'
import { useRoute, navigate } from '../router'
import {
  Sparkles,
  Shield,
  Layers,
  Cpu,
  Eye,
  Zap,
  Globe,
  Heart,
  Terminal,
  ArrowRight,
  Code2,
  CheckCircle2,
  ExternalLink,
  Users,
  ScrollText,
  BadgeCheck,
  Smartphone,
  HardDrive,
  Lock,
} from 'lucide-react'

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

// Core Engineering Team Roster
const ENGINEERS: EngineerProfile[] = [
  {
    id: 'keerthan',
    name: 'Keerthan',
    handle: 'keerthan4531-a11y',
    githubUrl: 'https://github.com/keerthan4531-a11y',
    role: 'Founder & Chief Systems Architect',
    clearance: 'LEVEL 5 ARCHITECT',
    badgeId: 'INIXA-ARCH-001',
    avatar: '/team/keerthan.jpeg', // Verified photo provided by Keerthan
    bio: 'AI/ML Engineer & Full Stack Dev building systems that think. Leading EduSync and the INIXA mobile software ecosystem. Specializes in autonomous RAG pipelines, LangChain architectures, local neural models, and bit-perfect Android engineering.',
    responsibilities: [
      'Architected the INIXA AI multi-agent neural sandbox with local quantized LLM inference via Android Vulkan and NNAPI compute shaders.',
      'Engineered BeatBox Pro and BeatBox Ultra 32-bit floating-point ALSA audio pipelines with parametric equalizers and synchronized kinetic lyrics.',
      'Designed the Living Sketchbook Doodle UI, tactile physics engine, and physical device verification methodology.',
      'Enforces the 100% Zero-Surveillance architecture — strictly zero Google Play dependencies, zero telemetry SDKs, and published SHA-256 integrity signatures across all 15 APKs.',
    ],
    skills: [
      'AI/ML Systems',
      'Autonomous RAG',
      'LangChain',
      'Local LLMs',
      'Android Jetpack',
      'FastAPI',
      'Kotlin Coroutines',
      'Zero Telemetry',
      'Full Stack',
    ],
    reposCount: 23,
    accentColor: '#00ff87',
    shadowColor: '#be185d',
    mascotQuote: 'Lead Architect! Crafting software that thinks and breathes.',
  },
  {
    id: 'thanga-prabhu',
    name: 'Thanga Prabhu A',
    handle: 'hatakekakashi55',
    githubUrl: 'https://github.com/hatakekakashi55',
    role: 'Core Systems & Graphics Architect',
    clearance: 'LEVEL 4 SYSTEMS',
    badgeId: 'INIXA-ENG-002',
    avatar: 'https://avatars.githubusercontent.com/u/192487286?v=4',
    bio: 'Core Systems & Graphics Engineer specializing in low-latency rendering, Android graphics pipelines, and native execution efficiency.',
    responsibilities: [
      'Researches low-level shader compilers and 120Hz liquid glass refractive optics using Android Graphics Shading Language (AGSL).',
      'Optimizes media streaming buffers and cross-platform native execution cores for Lumina Browser and Liquid Stream.',
      'Maintains reproducible compilation toolchains for direct-to-device APK builds with zero cloud telemetry hooks.',
    ],
    skills: [
      'Android Native',
      'Graphics Shaders',
      'AGSL & Skia',
      'Systems Architecture',
      'C++ / NDK',
      'Java/Kotlin',
      'Hardware Acceleration',
    ],
    reposCount: 15,
    accentColor: '#00d2ff',
    shadowColor: '#ffd23f',
    mascotQuote: 'Zero bloatware. High-octane native performance!',
  },
  {
    id: 'pandeeswaran',
    name: 'Pandeeswaran Pichaipandi',
    handle: 'pandeeswaran-08',
    githubUrl: 'https://github.com/pandeeswaran-08',
    role: 'AI & Data Science Engineer | MERN & Python Dev',
    clearance: 'LEVEL 4 NEURAL',
    badgeId: 'INIXA-ENG-003',
    avatar: 'https://avatars.githubusercontent.com/u/231992542?v=4',
    bio: 'AI & Data Science Learner, Python & MERN Stack Developer building frontier LLM and RAG applications. B.Tech AI & DS (3rd Year) @ NSCET.',
    responsibilities: [
      'Develops high-throughput retrieval pipelines, vector embeddings, and LangChain autonomous agents for knowledge containment.',
      'Engineers FastAPI backend services and MERN-stack administrative interfaces for laboratory dispatch.',
      'Benchmarks model quantization, inference latencies, and knowledge grounding for Infopedia Alpha and INIXA AI.',
    ],
    skills: [
      'AI & Data Science',
      'RAG & LLMs',
      'LangChain',
      'FastAPI',
      'Python',
      'MERN Stack',
      'Vector DBs',
      'REST APIs',
    ],
    reposCount: 30,
    accentColor: '#ffd23f',
    shadowColor: '#be185d',
    mascotQuote: 'Grounding neural agents with verified real-time data!',
  },
  {
    id: 'poobathi',
    name: 'POOBATHI RAJAN M',
    handle: 'poobathi867',
    githubUrl: 'https://github.com/poobathi867',
    role: 'Software Systems Engineer',
    clearance: 'LEVEL 3 CORE',
    badgeId: 'INIXA-ENG-004',
    avatar: 'https://avatars.githubusercontent.com/u/228177018?v=4',
    bio: 'Software Systems Engineer focused on disciplined goal-driven software craft, system stability, and dependable mobile workflows.',
    responsibilities: [
      'Implements robust state management and offline cache synchronization for Clipster and MyTube.',
      'Executes rigorous hardware compatibility verification across Snapdragon, Dimensity, and Tensor silicon.',
      'Maintains data integrity checks, memory release monitors, and clean component lifecycle guarantees.',
    ],
    skills: [
      'Software Systems',
      'Full Stack Dev',
      'Android Diagnostics',
      'Quality Assurance',
      'Git Workflows',
      'Offline Caching',
    ],
    reposCount: 7,
    accentColor: '#ec4899',
    shadowColor: '#00ff87',
    mascotQuote: 'Laser focus on goals and rock-solid system stability!',
  },
]

// The 4 Core Engineering Pillars
const PILLARS = [
  {
    icon: <Eye className="w-6 h-6 text-[#00d2ff]" />,
    title: 'Liquid Glass Optics & 120Hz Physics',
    tag: 'AGSL & SKIA',
    description:
      'We treat user interfaces as optical physics. Light refracts through chromatic layers, specular edges highlight active surfaces, and motion follows physical spring tension with 120Hz frame pacing.',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#00ff87]" />,
    title: 'Zero Surveillance Architecture',
    tag: 'AIR-GAPPED',
    description:
      'No third-party SDK trackers, no telemetry hooks, no advertising beacons. Your audio files, bookmarks, search queries, and local LLM prompts stay strictly local on device hardware.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#ffd23f]" />,
    title: 'Bit-Perfect Native Acceleration',
    tag: 'ALSA & VULKAN',
    description:
      'Custom ExoPlayer 32-bit floating-point pipelines, Vulkan compute shaders for local AI, GPU displacement, and direct memory streaming engineered for peak mobile efficiency without thermal throttling.',
  },
  {
    icon: <Terminal className="w-6 h-6 text-[#ec4899]" />,
    title: 'Direct Cryptographic Releases',
    tag: 'SHA-256 VAULT',
    description:
      'We release software with rapid iteration. Unfettered by app store bureaucratic delays and censorship, each binary is digitally signed and distributed directly to power users with published SHA-256 sums.',
  },
]

export const AboutPage: React.FC = () => {
  const currentPath = useRoute()
  const isEngineersRoute =
    currentPath === '/engineers' ||
    currentPath === '/team' ||
    currentPath === '/about/engineers'

  const [activeTab, setActiveTab] = useState<'manifesto' | 'engineers'>(
    isEngineersRoute ? 'engineers' : 'manifesto'
  )

  useEffect(() => {
    if (isEngineersRoute) {
      setActiveTab('engineers')
    }
  }, [isEngineersRoute])

  return (
    <div className="relative min-h-screen pt-28 pb-24 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white overflow-hidden font-sans">
      {/* Living Sketchbook Doodle Canvas Background (Graph paper, rockets, paper airplanes, stars) */}
      <DoodleHeroBackground />

      {/* Living Sketchbook Doodle Styles */}
      <style>{`
        .doodle-card {
          position: relative;
          background: #040a18;
          border: 2.5px solid #ffffff;
          box-shadow: 6px 6px 0 #be185d;
          transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.2s cubic-bezier(0.3, 1.4, 0.5, 1);
        }
        .doodle-card:hover {
          transform: translateY(-3px) rotate(-0.3deg);
          box-shadow: 8px 8px 0 #00ff87;
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
          box-shadow: 4px 4px 0 #be185d;
        }
        .doodle-btn-green:hover {
          transform: translateY(-2px) rotate(-1.5deg);
          box-shadow: 6px 6px 0 #ffd23f;
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
          transform: rotate(-2deg);
          font-weight: 900;
          text-transform: uppercase;
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* HEADER SECTION with Critters */}
        <div className="text-center max-w-4xl mx-auto mb-10 pt-2 relative">
          <div className="flex items-center justify-center gap-6 -mb-2 relative z-20 pointer-events-auto">
            <DoodleBird pose="singing" size={48} speech="Meet the minds behind INIXA! ♪" speechAlign="top" />
            <DoodleCat pose="sitting" size={56} speech="All code audited & signed! 🐾" speechAlign="top" />
            <DoodlePenguin pose="waddling" size={50} speech="4 Engineers • 15 APKs 🐧" speechAlign="top" />
          </div>

          {/* Stamped Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border-2 border-white bg-[#040a18] shadow-[3px_3px_0_#be185d] -rotate-1 mb-5">
            <DoodleIcon kind="bolt" size={14} />
            <span className="text-xs font-mono font-black tracking-widest uppercase text-[#00ff87]">
              INIXA AI LABS • THE LIVING MANIFESTO & CORE CREW
            </span>
            <DoodleIcon kind="sparkle" size={14} />
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-4">
            Engineering Software as <br />
            <span className="text-[#00ff87] relative inline-block">
              Physical Tactile Instruments
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

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto font-medium mt-4 sm:mt-6 px-2">
            INIXA AI Labs was founded on a simple conviction: modern mobile software has become bloated, predatory, and visually stagnant. We build software that feels alive, respects privacy, and honors hardware.
          </p>
        </div>

        {/* TACTILE DOODLE TAB SWITCHER: Manifesto vs Core Engineers (Responsive Mobile & Desktop) */}
        <div className="flex items-center justify-center gap-2 mb-10 sm:mb-14 px-2">
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full border-2 border-white bg-[#040a18] shadow-[4px_4px_0_#00ff87] max-w-full">
            <button
              type="button"
              onClick={() => {
                setActiveTab('manifesto')
                navigate('/about')
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'manifesto'
                  ? 'bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d] -rotate-1'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <ScrollText className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>The Manifesto</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('engineers')
                navigate('/engineers')
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === 'engineers'
                  ? 'bg-[#00ff87] text-[#020612] shadow-[2px_2px_0_#be185d] -rotate-1'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Core Engineers (4)</span>
              <span className="w-2 h-2 rounded-full bg-[#be185d] animate-pulse" />
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* VIEW 1: CORE ENGINEERS ROSTER WITH HANGING DOODLE ID CARDS   */}
        {/* ============================================================= */}
        {activeTab === 'engineers' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Section Eyebrow Banner */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="doodle-stamp px-4 py-1 rounded-full text-xs bg-[#be185d] text-white shadow-[2px_2px_0_#00ff87]">
                OFFICIAL LABORATORY PERSONNEL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                The Architects Behind the Metal
              </h2>
              <p className="text-sm text-neutral-300 mt-2 font-medium">
                Every line of Kotlin, AGSL shader, Python agent, and audio pipeline is handcrafted by our core engineering team. Hover each hanging ID card to inspect credentials.
              </p>
            </div>

            {/* Engineer Profile Cards: Hanging Lanyard ID Card on Left, Detailed Dossier on Right */}
            <div className="space-y-14">
              {ENGINEERS.map((eng, idx) => (
                <div
                  key={eng.id}
                  className="doodle-card rounded-[32px] p-6 sm:p-10 border-2 border-white relative overflow-hidden"
                  style={{
                    boxShadow: `7px 7px 0 ${eng.shadowColor}`,
                  }}
                >
                  {/* Subtle Corner Ambient Aura */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25"
                    style={{ backgroundColor: eng.accentColor }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    {/* Column 1: Hanging Doodle Lanyard ID Card Badge */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                      <HangingIdCard engineer={eng} />
                    </div>

                    {/* Column 2: Detailed Architectural Dossier */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Top Badges: Role and Clearance */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="doodle-stamp px-3 py-1 rounded-full text-xs font-black"
                          style={{
                            backgroundColor: eng.accentColor,
                            color: '#020612',
                            boxShadow: `2px 2px 0 ${eng.shadowColor}`,
                          }}
                        >
                          {eng.role}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#060e24] border border-white/40 text-neutral-300">
                          {eng.badgeId}
                        </span>

                        <a
                          href={eng.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#060e24] border border-white text-white hover:text-[#00ff87] hover:border-[#00ff87] transition-all shadow-[2px_2px_0_#be185d]"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>{eng.reposCount} Repositories</span>
                          <ExternalLink className="w-3 h-3 text-[#00ff87]" />
                        </a>
                      </div>

                      {/* Name and Handle Header */}
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                          {eng.name}
                        </h3>
                        <p className="text-sm font-mono text-[#00ff87] font-bold mt-1">
                          @{eng.handle}
                        </p>
                      </div>

                      {/* Bio Statement */}
                      <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium bg-[#020612] p-4 rounded-2xl border border-white/20 shadow-inner">
                        {eng.bio}
                      </p>

                      {/* Engineering Contributions & Systems Built */}
                      <div className="space-y-2 pt-2 border-t-2 border-dashed border-white/20">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#00ff87] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Key Systems Engineered at INIXA Labs:</span>
                        </h4>
                        <div className="space-y-2">
                          {eng.responsibilities.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-medium">
                              <span className="text-[#00ff87] font-black shrink-0 mt-0.5">✔</span>
                              <span className="leading-relaxed">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Core Technical Stack Skills */}
                      <div className="pt-2 border-t-2 border-dashed border-white/20">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-neutral-400 mb-2.5">
                          Specialized Tooling &amp; Paradigms:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {eng.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#060e24] border border-white/30 text-white shadow-[2px_2px_0_rgba(255,255,255,0.15)] hover:border-white transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Direct GitHub Profile Action */}
                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={eng.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doodle-btn doodle-btn-green px-6 py-2.5 text-xs font-black text-[#020612]"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>View {eng.name}&apos;s GitHub</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => navigate('/products')}
                          className="doodle-btn doodle-btn-outline px-5 py-2.5 text-xs font-black text-white hover:text-[#00ff87]"
                        >
                          <span>Explore Built Products</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW 2: THE MANIFESTO, LAB CREED & HARDWARE PHILOSOPHY       */}
        {/* ============================================================= */}
        {activeTab === 'manifesto' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Manifesto Deep Narrative */}
            <div className="doodle-card rounded-[32px] p-8 sm:p-12 border-2 border-white shadow-[7px_7px_0_#00ff87]">
              {/* Peeking Mascot atop card */}
              <div className="absolute -top-10 right-10 z-20 hidden sm:block">
                <DoodleBird pose="flying" size={60} speech="Living Sketchbook manifesto! 📜" speechAlign="left" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white bg-[#060e24] px-3.5 py-1 text-xs font-mono font-bold text-[#00ff87] mb-4 shadow-[2px_2px_0_#be185d]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DECLARATION OF INDEPENDENT SOFTWARE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-6">
                The Philosophy of Tactile Physical Software
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
                <p>
                  In an era dominated by sanitized web-view wrappers, slow electron bundles, and aggressive data-harvesting SDKs, INIXA AI Labs reimagines mobile software as an optical, physical substance. We build instruments for users who care about bit-perfect fidelity, low-level execution speed, and absolute device ownership.
                </p>
                <p>
                  When you slide an equalizer knob in BeatBox Pro, the audio decodes directly into a 32-bit floating-point buffer without digital clipping. When you browse in Lumina Browser, every temporary tab memory is scorched cleanly without leaving cookies or telemetry footprints. When you converse with INIXA AI, quantized neural weights execute strictly on local Snapdragon silicon.
                </p>
                <p>
                  This isn&apos;t just visual polish — it is an architectural contract. We refuse app store surveillance gates, telemetry frameworks, and rent-seeking subscriptions. Every release is an independent binary compiled with verifiable cryptographic integrity.
                </p>
              </div>
            </div>

            {/* Core 4 Pillars Grid */}
            <div>
              <div className="text-center mb-10">
                <span className="doodle-stamp px-3 py-1 rounded-full text-xs bg-[#ffd23f] text-[#020612] shadow-[2px_2px_0_#be185d]">
                  UNCOMPROMISING FOUNDATIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                  Our Engineering Creed
                </h2>
                <p className="text-sm text-neutral-300 mt-2 font-medium">
                  Four structural pillars that govern every line of code written in our laboratory.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PILLARS.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="doodle-card rounded-[26px] p-7 border-2 border-white shadow-[5px_5px_0_#be185d] hover:shadow-[7px_7px_0_#00ff87] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#060e24] border-2 border-white flex items-center justify-center shadow-[3px_3px_0_#00ff87]">
                        {pillar.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black border border-white bg-[#060e24] text-neutral-300">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white">{pillar.title}</h3>
                    <p className="text-sm text-neutral-300 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Zero-Surveillance Anti-Telemetry Charter */}
            <div className="doodle-card rounded-[32px] p-8 sm:p-10 border-2 border-white shadow-[7px_7px_0_#ffd23f]">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-[#00ff87]" />
                <h3 className="text-2xl font-black text-white">The Zero-Telemetry Charter</h3>
              </div>
              <p className="text-sm text-neutral-300 font-medium mb-6 leading-relaxed">
                We maintain an absolute zero-tolerance policy against digital tracking. Here is what you will NEVER find inside any INIXA APK release:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#020612] border-2 border-white shadow-[3px_3px_0_#be185d]">
                  <div className="text-xs font-mono font-black text-[#be185d] mb-1">0 TRACKER BEACONS</div>
                  <div className="text-xs text-neutral-300 font-medium">
                    Zero Google Analytics, Firebase, Facebook SDK, Adjust, or AppsFlyer telemetry hooks.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#020612] border-2 border-white shadow-[3px_3px_0_#00ff87]">
                  <div className="text-xs font-mono font-black text-[#00ff87] mb-1">0 SURVEILLANCE ADS</div>
                  <div className="text-xs text-neutral-300 font-medium">
                    Zero AdMob or behavioral programmatic auction engines injecting bloat into your device.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#020612] border-2 border-white shadow-[3px_3px_0_#ffd23f]">
                  <div className="text-xs font-mono font-black text-[#ffd23f] mb-1">100% AIR-GAPPED CODE</div>
                  <div className="text-xs text-neutral-300 font-medium">
                    Local audio decoding, local Wikipedia ZIM indexing, and local neural model inference.
                  </div>
                </div>
              </div>
            </div>

            {/* Real Ecosystem Hardware Metrics */}
            <div className="doodle-card rounded-[32px] p-8 sm:p-10 border-2 border-white shadow-[6px_6px_0_#be185d]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#00ff87]">9</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-300 font-black font-mono mt-1">
                    Flagship Apps
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#be185d]">15</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-300 font-black font-mono mt-1">
                    Verified APKs
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#ffd23f]">56</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-300 font-black font-mono mt-1">
                    Audited Screens
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#00d2ff]">0</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-300 font-black font-mono mt-1">
                    Ad Trackers
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="text-center space-y-6 pt-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Experience the laboratory in your hands
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="doodle-btn doodle-btn-green px-8 py-3.5 text-sm font-black text-[#020612]"
                >
                  <DoodleIcon kind="sparkle" size={17} />
                  <span>Explore 9 Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/downloads')}
                  className="doodle-btn doodle-btn-outline px-8 py-3.5 text-sm font-black text-white hover:text-[#00ff87]"
                >
                  <DoodleIcon kind="bolt" size={17} />
                  <span>Direct Binary Vault (15 APKs)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('engineers')}
                  className="doodle-btn doodle-btn-outline px-6 py-3.5 text-xs font-black text-neutral-300 hover:text-white"
                >
                  <Users className="w-4 h-4 text-[#00ff87]" />
                  <span>Meet the 4 Engineers</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Living Sketchbook Footer */}
      <InixaFooter />
    </div>
  )
}
