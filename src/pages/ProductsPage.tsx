import React from 'react'
import { ALL_PRODUCTS } from '../data/products'
import { DoodleHeroBackground } from '../components/doodle/DoodleHeroBackground'
import { ArcCarousel } from '../components/products/ArcCarousel'
import { MobileScreenMarquee } from '../components/products/MobileScreenMarquee'
import { ProductsFAQ } from '../components/products/ProductsFAQ'
import { InixaFooter } from '../components/footer/InixaFooter'
import { DoodleIcon } from '../components/footer/DoodleCrewFooter'
import { DoodleCat } from '../components/doodle/DoodleCat'
import { DoodleBird, DoodlePenguin } from '../components/doodle/DoodleCritters'
import { Sparkles, ArrowDown } from 'lucide-react'

export const ProductsPage: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-28 bg-[#020612] text-white selection:bg-[#be185d] selection:text-white overflow-hidden font-sans">
      {/* Living Sketchbook Doodle Canvas Background (Graph paper grid, rockets, paper airplanes, stars) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section with Living Sketchbook Doodle Crew */}
        <div className="text-center max-w-4xl mx-auto mb-8 relative pt-4">
          {/* Animated Doodle Critters perched atop header */}
          <div className="flex items-center justify-center gap-6 -mb-2 relative z-20 pointer-events-auto">
            <DoodleBird pose="singing" size={50} speech="Browse all 9 flagships! ♪" speechAlign="top" />
            <DoodleCat pose="sitting" size={58} speech="Swipe or click cards to inspect! 🐾" speechAlign="top" />
            <DoodlePenguin pose="headphones" size={52} speech="Auto-scroll is paused! Jamming FLAC 🐧" speechAlign="top" />
          </div>

          {/* Stamped Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border-2 border-white bg-[#040a18] shadow-[3px_3px_0_#be185d] -rotate-1 mb-5">
            <DoodleIcon kind="bolt" size={14} />
            <span className="text-xs font-mono font-black tracking-widest uppercase text-[#00ff87]">
              INIXA LABS REPOSITORY • 9 MASTERED FLAGSHIPS
            </span>
            <DoodleIcon kind="sparkle" size={14} />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-4">
            Flagship Applications & <br />
            <span className="text-[#00ff87] relative inline-block">
              Laboratory Experiments
              {/* Hand-drawn squiggly underline */}
              <svg
                className="absolute -bottom-3 left-0 w-full h-4"
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

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-medium mt-6">
            Every product engineered at INIXA Labs is built with custom graphics pipelines, real-time hardware audio rendering, and zero-telemetry architectures.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 bg-[#040a18] px-3.5 py-1.5 rounded-full border border-white/20">
            <span>Drag, swipe, or click controls below</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#00ff87] animate-bounce" />
          </div>
        </div>

        {/* 3D Arc Curved Carousel with AUTO-SCROLL DISABLED (static & interactive) */}
        <ArcCarousel products={ALL_PRODUCTS} autoPlay={false} />
      </div>

      {/* Verified Mobile Hardware Screens Infinite Marquee Showcase (Doodle styled) */}
      <MobileScreenMarquee />

      {/* Interactive Laboratory Dispatch & Architecture FAQ Accordion (Doodle styled) */}
      <ProductsFAQ />

      {/* Official INIXA Living Sketchbook Doodle Crew Footer */}
      <InixaFooter />
    </div>
  )
}
