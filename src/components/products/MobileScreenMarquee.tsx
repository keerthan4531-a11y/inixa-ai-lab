import React from 'react'
import { navigate } from '../../router'
import { Sparkles, ArrowRight } from 'lucide-react'
import { DoodleIcon } from '../footer/DoodleCrewFooter'
import { DoodleCat } from '../doodle/DoodleCat'
import { DoodleBird } from '../doodle/DoodleCritters'

interface ScreenCard {
  id: string
  title: string
  badge: string
  subBadge: string
  image: string
  description: string
  accentColor: string
  productId: string
}

const SCREENS: ScreenCard[] = [
  {
    id: 'beatbox-ultra',
    title: 'BeatBox Ultra',
    badge: 'Flagship Audio →',
    subBadge: 'Liquid Glass UI',
    image: '/shots/beat-box-ultra/2f3b1fcc-0f44-4b3b-8e32-0c567eb5cf0d.jpg',
    description: 'Dynamic live backdrop blur with 32-bit audio pipeline & word-by-word lyric sync.',
    accentColor: '#00ff87',
    productId: 'beatbox-ultra',
  },
  {
    id: 'beatbox-pro',
    title: 'BeatBox Pro',
    badge: 'Audiophile DSP →',
    subBadge: 'Axion Studio',
    image: '/shots/beat-pro/9e4cfaf7-819b-46d3-b81f-613509ae3971.jpg',
    description: 'Dual-catalog lossless aggregation with surgical 10-band parametric studio rotary knobs.',
    accentColor: '#FF7A1A',
    productId: 'beatbox-pro',
  },
  {
    id: 'lumina',
    title: 'Lumina Browser',
    badge: 'Hardened Privacy →',
    subBadge: 'Fire Wipe',
    image: '/shots/lumina/1dbdeee2-29bd-428c-9a98-2ef080a1a015.jpg',
    description: 'Zero-telemetry mobile web browsing with one-tap instant animated tab scorching.',
    accentColor: '#00B4D8',
    productId: 'lumina',
  },
  {
    id: 'inixa-ai',
    title: 'INIXA AI',
    badge: 'Autonomous AI →',
    subBadge: 'Local LLM',
    image: '/shots/inixa-ai/image.png',
    description: 'Fluid streaming conversation view with adaptive glass bubbles and real-time token rendering.',
    accentColor: '#D946EF',
    productId: 'inixa-ai',
  },
  {
    id: 'liquid-stream',
    title: 'Liquid Stream',
    badge: 'Cinema Engine →',
    subBadge: 'Apple AGSL',
    image: '/shots/liquid-streaming/104338c6-3296-46a9-b63f-241c8ddbbda9.jpg',
    description: 'Apple iOS Liquid Glass Design System with real-time prism refraction & zero-ad extraction.',
    accentColor: '#A855F7',
    productId: 'liquid-stream',
  },
  {
    id: 'mytube',
    title: 'MyTube',
    badge: 'Privacy First →',
    subBadge: 'SponsorBlock',
    image: '/shots/my-tube/0dc8c448-f622-445e-9d91-3d369983fe0b.jpg',
    description: 'Background audio, picture-in-picture, and decentralized Piped engine without Google Play Services.',
    accentColor: '#FF2A55',
    productId: 'mytube',
  },
  {
    id: 'beatbox-lite',
    title: 'BeatBox Lite',
    badge: 'Featherweight Hub →',
    subBadge: 'Ultra Fast',
    image: '/shots/beat-box-lite/2968f3b4-4781-4414-9dba-ebe488859c3d.jpg',
    description: 'Sub-15MB streaming footprint engineered with JioSaavn lossless audio and movie mode.',
    accentColor: '#00D2FF',
    productId: 'beatbox-lite',
  },
  {
    id: 'clipster',
    title: 'Clipster',
    badge: 'Media Extractor →',
    subBadge: 'Universal',
    image: '/shots/clipster/089378e2-9f36-4469-9b1f-bb71b23e803d.jpg',
    description: 'High-speed media extraction pipeline with automatic audio and video muxing.',
    accentColor: '#10B981',
    productId: 'clipster',
  },
  {
    id: 'wikipedia-app',
    title: 'Infopedia Alpha',
    badge: 'AI Encyclopedia →',
    subBadge: 'Offline RAG',
    image: '/shots/wikipedia-app/1_en-US.png',
    description: 'AI-assisted offline reading and citation validation powered by grounded neural RAG.',
    accentColor: '#3B82F6',
    productId: 'wikipedia-app',
  },
  {
    id: 'beatbox-ultra-artists',
    title: 'BeatBox Ultra Artists',
    badge: 'Pro Discography →',
    subBadge: 'Artist Mode',
    image: '/shots/beat-box-ultra/07f9d788-7d1b-412d-a222-877738707aec.jpg',
    description: 'Full-bleed artist discography and custom parametric EQ with dynamic chroma tinting.',
    accentColor: '#00ff87',
    productId: 'beatbox-ultra',
  },
]

// Duplicate array for seamless infinite marquee loop
const MARQUEE_ITEMS = [...SCREENS, ...SCREENS]

export const MobileScreenMarquee: React.FC = () => {
  return (
    <section className="relative w-full pt-16 pb-8 overflow-hidden select-none">
      <style>{`
        @keyframes mobileMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-mobile-marquee {
          display: flex;
          width: max-content;
          animation: mobileMarquee 42s linear infinite;
        }
        .animate-mobile-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Section with Doodle Critters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center relative">
        <div className="flex justify-center -mb-2">
          <DoodleBird pose="flying" size={48} speech="56 live device captures! 🐦" speechAlign="top" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#040a18] px-4 py-1.5 text-xs font-mono font-black uppercase tracking-widest text-[#00ff87] shadow-[3px_3px_0_#be185d] -rotate-1 mb-3">
          <DoodleIcon kind="sparkle" size={14} />
          <span>VERIFIED HARDWARE SCREENS • LIVE PRODUCTION</span>
          <DoodleIcon kind="bolt" size={14} />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Physical Mobile Software in{' '}
          <span className="text-[#00ff87] relative inline-block">
            Action
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 8" preserveAspectRatio="none">
              <path d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-medium max-w-2xl mx-auto mt-2">
          Real production screenshots extracted directly from our 9 physical mobile apps. Click any card to inspect details.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Stream */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-mobile-marquee gap-6 py-6 px-4">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => navigate(`/product/${item.productId}`)}
              className="group relative w-[290px] sm:w-[320px] h-[490px] sm:h-[520px] rounded-[28px] p-5 flex flex-col justify-between bg-[#040a18] border-2 border-white shadow-[5px_5px_0_#be185d] hover:shadow-[7px_7px_0_#00ff87] transition-all duration-200 hover:-translate-y-1.5 cursor-pointer overflow-hidden shrink-0"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top Pill Badges matching doodle stamp */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-[#060e24] border border-white text-white shadow-[2px_2px_0_#be185d]">
                      <span>{item.badge}</span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#060e24] border border-white/40 text-neutral-300">
                      <span>{item.subBadge}</span>
                    </span>
                  </div>

                  {/* Real Smartphone Screen Frame */}
                  <div className="relative w-full h-[240px] sm:h-[260px] rounded-[20px] overflow-hidden bg-black/80 border-2 border-white shadow-inner group-hover:scale-[1.02] transition-transform">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="eager"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Bottom Copy & Action Button */}
                <div className="mt-4 pt-2 border-t border-white/10">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#00ff87] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium line-clamp-2 mt-1 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="doodle-btn doodle-btn-green px-4 py-2 text-xs font-black text-[#020612]"
                    >
                      <span>Inspect App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: item.accentColor,
                        boxShadow: `0 0 8px ${item.accentColor}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
