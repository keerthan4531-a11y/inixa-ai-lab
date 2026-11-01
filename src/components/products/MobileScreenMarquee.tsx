import React from 'react'
import { navigate } from '../../router'
import { Sparkles, ArrowRight } from 'lucide-react'

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

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-950/40 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-pink-300 backdrop-blur-md mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Verified Hardware Screens • Live Production Snapshots</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Physical Mobile Software in Action
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mt-2">
          Real production screenshots extracted directly from our 9 physical mobile apps. Hover any card to inspect details.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Stream */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-mobile-marquee gap-6 py-4 px-4">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => navigate(`/product/${item.productId}`)}
              className="group relative w-[290px] sm:w-[320px] h-[480px] sm:h-[510px] rounded-[32px] p-5 flex flex-col justify-between bg-[#080d1a]/85 border border-white/10 hover:border-white/30 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden shrink-0"
              style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Subtle Ambient Color Glow at Card Top Corner */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.accentColor }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top Pill Badges matching Google Labs screenshot */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15 text-white/90 backdrop-blur-md">
                      <span>{item.badge}</span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-neutral-300 backdrop-blur-md">
                      <span>{item.subBadge}</span>
                    </span>
                  </div>

                  {/* Real Smartphone Screen Frame */}
                  <div className="relative w-full h-[240px] sm:h-[260px] rounded-[22px] overflow-hidden bg-black/60 border border-white/10 shadow-inner group-hover:border-white/25 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="eager"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle glass reflection overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-white/5 opacity-60" />
                  </div>
                </div>

                {/* Bottom Copy & Action Button */}
                <div className="mt-4 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 group-hover:bg-white/20 border border-white/15 text-white transition-all shadow-md group-hover:border-white/30"
                    >
                      <span>Try It Now</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <span
                      className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                      style={{
                        backgroundColor: item.accentColor,
                        color: item.accentColor,
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
