import React from 'react'

/**
 * Hand-drawn sketchbook doodles for the Hero background canvas.
 * Pure vector SVG with authentic wobbly ink strokes, playful doodles,
 * paper airplanes, planets, rockets, musical notes, and engineering sketches.
 * Lightweight, zero-lag, pointer-events-none.
 */
export const DoodleHeroBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Engineering Sketchbook Graph Paper Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="doodle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#00ff87"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.2" fill="#be185d" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#doodle-grid)" />
      </svg>

      {/* 2. Soft Ambient Color Backing Glows */}
      <div className="absolute top-12 left-10 w-[420px] h-[420px] rounded-full bg-emerald-500/[0.08] blur-[150px]" />
      <div className="absolute top-1/3 right-10 w-[460px] h-[460px] rounded-full bg-pink-600/[0.09] blur-[160px]" />
      <div className="absolute bottom-10 left-1/3 w-[380px] h-[380px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />

      {/* 3. Hand-Drawn Living Sketchbook Vector Doodles Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      >
        {/* ========================================================= */}
        {/* TOP LEFT: Rocket, Saturn Planet, Constellations & Stars   */}
        {/* ========================================================= */}

        {/* Hand-Drawn Retro Rocket Blasting Off */}
        <g transform="translate(70, 90) rotate(-18) scale(0.95)" opacity="0.65">
          {/* Rocket Body */}
          <path
            d="M 28 4 C 18 18 16 46 16 64 L 40 64 C 40 46 38 18 28 4 Z"
            stroke="#00ff87"
            strokeWidth="2.2"
            fill="#040a18"
          />
          {/* Nosecone Tip */}
          <path d="M 23 18 L 33 18" stroke="#be185d" strokeWidth="2" />
          {/* Porthole */}
          <circle cx="28" cy="34" r="6" stroke="#00d2ff" strokeWidth="2" fill="#060e24" />
          <circle cx="29" cy="33" r="2" fill="#00d2ff" />
          {/* Left Fin */}
          <path d="M 16 48 L 4 64 L 16 62 Z" stroke="#be185d" strokeWidth="2" fill="#040a18" />
          {/* Right Fin */}
          <path d="M 40 48 L 52 64 L 40 62 Z" stroke="#be185d" strokeWidth="2" fill="#040a18" />
          {/* Flame Exhaust / Scribble fire */}
          <path
            d="M 20 66 C 18 78 22 86 28 92 C 34 86 38 78 36 66 C 32 72 30 74 28 70 C 26 74 24 72 20 66 Z"
            stroke="#ffd23f"
            strokeWidth="2.2"
            fill="#ffd23f33"
          />
          {/* Speed smoke rings */}
          <path d="M 22 96 C 26 99 32 99 36 96" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 18 102 C 24 106 34 106 40 102" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Hand-Drawn Saturn Planet with Rings */}
        <g transform="translate(195, 65) scale(0.85)" opacity="0.55">
          {/* Planet Sphere */}
          <circle cx="36" cy="36" r="22" stroke="#00d2ff" strokeWidth="2.2" fill="#040a18" />
          <path d="M 20 28 C 28 32 44 32 52 28" stroke="#00d2ff" strokeWidth="1.6" />
          <path d="M 17 38 C 26 44 46 44 55 38" stroke="#00d2ff" strokeWidth="1.6" />
          {/* Saturn Ring Ellipse (tilted) */}
          <ellipse
            cx="36"
            cy="36"
            rx="38"
            ry="11"
            transform="rotate(-24 36 36)"
            stroke="#ffd23f"
            strokeWidth="2.4"
          />
          {/* Crater Dots */}
          <circle cx="28" cy="22" r="1.5" fill="#00d2ff" />
          <circle cx="44" cy="46" r="2" fill="#00d2ff" />
        </g>

        {/* Top-Left Sketch Annotation Arrow pointing toward INIXA LAB */}
        <g transform="translate(265, 125)" opacity="0.55">
          <path
            d="M 10 10 C 35 15 65 30 85 55"
            stroke="#be185d"
            strokeWidth="2.2"
            strokeDasharray="4 4"
          />
          <path d="M 75 52 L 87 56 L 82 44" stroke="#be185d" strokeWidth="2.2" />
          <text
            x="0"
            y="-2"
            fill="#be185d"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            {"// 100% on-device"}
          </text>
        </g>

        {/* ========================================================= */}
        {/* TOP RIGHT: Paper Airplane, Storm Cloud, Moon & Notes       */}
        {/* ========================================================= */}

        {/* Swooping Paper Airplane with Loop Trail */}
        <g transform="translate(1180, 85)" opacity="0.65">
          {/* Loop-de-loop flight trail */}
          <path
            d="M -120 70 C -80 30 -50 90 -20 50 C -5 30 15 20 40 25"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeDasharray="4 4"
          />
          {/* Paper Airplane Body */}
          <g transform="translate(42, 22) rotate(-14) scale(0.9)">
            <polygon
              points="0,18 48,0 24,36"
              stroke="#00ff87"
              strokeWidth="2.2"
              fill="#040a18"
            />
            <polygon
              points="24,36 48,0 16,22"
              stroke="#00ff87"
              strokeWidth="2"
              fill="#060e24"
            />
            <line x1="16" y1="22" x2="48" y2="0" stroke="#00ff87" strokeWidth="1.8" />
          </g>
        </g>

        {/* Hand-Drawn Scribbly Cloud with Lightning & Raindrops */}
        <g transform="translate(1260, 160) scale(0.85)" opacity="0.6">
          {/* Cloud Outline */}
          <path
            d="M 18 36 C 8 36 2 28 6 18 C 10 8 22 8 28 12 C 34 2 50 2 58 10 C 66 6 78 12 76 22 C 84 26 84 36 74 36 Z"
            stroke="#00d2ff"
            strokeWidth="2.2"
            fill="#040a18"
          />
          {/* Lightning Bolt */}
          <path
            d="M 40 38 L 32 50 L 42 50 L 30 68"
            stroke="#ffd23f"
            strokeWidth="2.4"
          />
          {/* Raindrops */}
          <line x1="18" y1="44" x2="14" y2="52" stroke="#00d2ff" strokeWidth="1.8" />
          <line x1="58" y1="44" x2="54" y2="54" stroke="#00d2ff" strokeWidth="1.8" />
          <line x1="68" y1="42" x2="64" y2="50" stroke="#00d2ff" strokeWidth="1.8" />
        </g>

        {/* Crescent Moon with Sleepy Zzz */}
        <g transform="translate(1330, 70) scale(0.8)" opacity="0.55">
          <path
            d="M 28 8 C 14 14 10 32 20 44 C 10 38 6 22 16 10 C 20 6 24 6 28 8 Z"
            stroke="#ffd23f"
            strokeWidth="2"
            fill="#ffd23f22"
          />
          <text x="32" y="16" fill="#ffffff" fontSize="11" fontFamily="monospace" opacity="0.8">z</text>
          <text x="38" y="10" fill="#ffffff" fontSize="14" fontFamily="monospace" opacity="0.9">Z</text>
        </g>

        {/* ========================================================= */}
        {/* CENTER BACKGROUND: INIXA LAB Aura, Hatching, Sparkles     */}
        {/* ========================================================= */}

        {/* Diagonal Crosshatch Marks behind Main Title */}
        <g transform="translate(560, 110)" opacity="0.25">
          <line x1="0" y1="0" x2="20" y2="20" stroke="#00ff87" strokeWidth="1.5" />
          <line x1="10" y1="0" x2="30" y2="20" stroke="#00ff87" strokeWidth="1.5" />
          <line x1="20" y1="0" x2="40" y2="20" stroke="#00ff87" strokeWidth="1.5" />
          <line x1="30" y1="0" x2="50" y2="20" stroke="#00ff87" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="20" y2="0" stroke="#be185d" strokeWidth="1.5" />
          <line x1="10" y1="20" x2="30" y2="0" stroke="#be185d" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="40" y2="0" stroke="#be185d" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="50" y2="0" stroke="#be185d" strokeWidth="1.5" />
        </g>

        {/* Isometric 3D Doodle Cube floating */}
        <g transform="translate(930, 110) scale(0.85)" opacity="0.5">
          <path d="M 24 6 L 44 16 L 24 26 L 4 16 Z" stroke="#00ff87" strokeWidth="2" fill="#040a18" />
          <path d="M 4 16 L 4 38 L 24 48 L 24 26 Z" stroke="#00ff87" strokeWidth="2" fill="#060e24" />
          <path d="M 44 16 L 44 38 L 24 48 L 24 26 Z" stroke="#00ff87" strokeWidth="2" fill="#040a18" />
        </g>

        {/* Floating Musical Notes Cluster */}
        <g transform="translate(1020, 190)" opacity="0.6">
          {/* Eighth Note */}
          <g transform="rotate(12)">
            <ellipse cx="10" cy="22" rx="5" ry="4" transform="rotate(-15 10 22)" fill="#00ff87" />
            <line x1="14" y1="22" x2="14" y2="6" stroke="#00ff87" strokeWidth="2" />
            <path d="M 14 6 C 18 7 21 11 20 15" stroke="#00ff87" strokeWidth="2" />
          </g>
          {/* Beamed Double Note */}
          <g transform="translate(28, -8) rotate(-8)">
            <ellipse cx="6" cy="20" rx="4.5" ry="3.5" transform="rotate(-15 6 20)" fill="#ffd23f" />
            <ellipse cx="22" cy="18" rx="4.5" ry="3.5" transform="rotate(-15 22 18)" fill="#ffd23f" />
            <line x1="9" y1="20" x2="9" y2="4" stroke="#ffd23f" strokeWidth="2" />
            <line x1="25" y1="18" x2="25" y2="2" stroke="#ffd23f" strokeWidth="2" />
            <line x1="9" y1="5" x2="26" y2="3" stroke="#ffd23f" strokeWidth="3" />
          </g>
        </g>

        {/* ========================================================= */}
        {/* MID-LEFT (Behind Title & Text): Lightbulb, Crown, Heart   */}
        {/* ========================================================= */}

        {/* Hand-Drawn Doodle Lightbulb (Idea / Innovation) */}
        <g transform="translate(48, 310) scale(0.9)" opacity="0.6">
          {/* Bulb Outline */}
          <path
            d="M 26 8 C 14 8 6 18 8 28 C 10 34 16 38 18 44 L 34 44 C 36 38 42 34 44 28 C 46 18 38 8 26 8 Z"
            stroke="#ffd23f"
            strokeWidth="2.2"
            fill="#ffd23f18"
          />
          {/* Screw Base */}
          <path d="M 19 47 L 33 47" stroke="#ffffff" strokeWidth="2" />
          <path d="M 21 51 L 31 51" stroke="#ffffff" strokeWidth="2" />
          <path d="M 23 55 L 29 55" stroke="#ffffff" strokeWidth="2" />
          {/* Filament */}
          <path d="M 22 34 L 24 24 L 28 24 L 30 34" stroke="#ffd23f" strokeWidth="1.8" fill="none" />
          {/* Radiating Light Rays */}
          <line x1="26" y1="0" x2="26" y2="4" stroke="#ffd23f" strokeWidth="2" />
          <line x1="10" y1="6" x2="13" y2="9" stroke="#ffd23f" strokeWidth="2" />
          <line x1="42" y1="6" x2="39" y2="9" stroke="#ffd23f" strokeWidth="2" />
          <line x1="2" y1="24" x2="6" y2="24" stroke="#ffd23f" strokeWidth="2" />
          <line x1="50" y1="24" x2="46" y2="24" stroke="#ffd23f" strokeWidth="2" />
        </g>

        {/* Doodle Crown */}
        <g transform="translate(85, 450) rotate(-14) scale(0.85)" opacity="0.6">
          <polygon
            points="4,32 10,12 20,24 30,8 40,24 50,12 56,32"
            stroke="#00ff87"
            strokeWidth="2.2"
            fill="#040a18"
          />
          <line x1="4" y1="32" x2="56" y2="32" stroke="#00ff87" strokeWidth="2.2" />
          <circle cx="10" cy="11" r="2" fill="#ffd23f" />
          <circle cx="30" cy="7" r="2.5" fill="#ffd23f" />
          <circle cx="50" cy="11" r="2" fill="#ffd23f" />
        </g>

        {/* Wobbly Heart Doodle */}
        <g transform="translate(38, 560) rotate(10) scale(0.8)" opacity="0.55">
          <path
            d="M 24 10 C 20 2 8 2 4 12 C 0 24 16 34 24 44 C 32 34 48 24 44 12 C 40 2 28 2 24 10 Z"
            stroke="#be185d"
            strokeWidth="2.2"
            fill="#be185d26"
          />
        </g>

        {/* Hand-Drawn Audio Equalizer Bars */}
        <g transform="translate(140, 565)" opacity="0.5">
          <line x1="4" y1="28" x2="4" y2="12" stroke="#00ff87" strokeWidth="3" />
          <line x1="12" y1="28" x2="12" y2="4" stroke="#00ff87" strokeWidth="3" />
          <line x1="20" y1="28" x2="20" y2="18" stroke="#00ff87" strokeWidth="3" />
          <line x1="28" y1="28" x2="28" y2="2" stroke="#00ff87" strokeWidth="3" />
          <line x1="36" y1="28" x2="36" y2="10" stroke="#00ff87" strokeWidth="3" />
          <line x1="44" y1="28" x2="44" y2="20" stroke="#00ff87" strokeWidth="3" />
          <line x1="52" y1="28" x2="52" y2="6" stroke="#00ff87" strokeWidth="3" />
        </g>

        {/* ========================================================= */}
        {/* MID-RIGHT / BEHIND PHONE: Radiating Sound Waves, Target   */}
        {/* ========================================================= */}

        {/* Concentric Audio Radar Waves radiating behind phone */}
        <g transform="translate(770, 410)" opacity="0.45">
          <path d="M 0 0 C 18 -15 18 35 0 20" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M -12 -12 C 30 -28 30 52 -12 36" stroke="#00d2ff" strokeWidth="2.2" />
          <path d="M -24 -24 C 42 -42 42 70 -24 52" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 4" />
        </g>

        {/* Playful Sketch Arrow pointing toward 3D Phone */}
        <g transform="translate(1220, 430) rotate(-10)" opacity="0.65">
          <path
            d="M 60 10 C 30 20 10 50 -30 65"
            stroke="#00ff87"
            strokeWidth="2.4"
            strokeDasharray="4 4"
          />
          <path d="M -20 54 L -32 66 L -16 68" stroke="#00ff87" strokeWidth="2.4" />
          <text
            x="-40"
            y="92"
            fill="#00ff87"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            {"120Hz Liquid Glass!"}
          </text>
        </g>

        {/* Hand-Drawn Retro Gamepad / Arcade D-Pad */}
        <g transform="translate(1310, 520) scale(0.85)" opacity="0.55">
          <rect
            x="4"
            y="10"
            width="64"
            height="38"
            rx="12"
            stroke="#be185d"
            strokeWidth="2.2"
            fill="#040a18"
          />
          {/* D-Pad Cross */}
          <path
            d="M 18 20 H 24 V 16 H 28 V 20 H 34 V 24 H 28 V 28 H 24 V 24 H 18 Z"
            stroke="#be185d"
            strokeWidth="1.6"
            fill="#be185d33"
          />
          {/* Action Buttons */}
          <circle cx="48" cy="20" r="3.5" fill="#00ff87" />
          <circle cx="56" cy="26" r="3.5" fill="#ffd23f" />
        </g>

        {/* Hand-Drawn Steaming Coffee Mug */}
        <g transform="translate(1270, 670) scale(0.85)" opacity="0.6">
          {/* Mug Cup */}
          <path
            d="M 8 16 L 10 44 C 10 48 30 48 30 44 L 32 16 Z"
            stroke="#00d2ff"
            strokeWidth="2.2"
            fill="#040a18"
          />
          {/* Mug Handle */}
          <path
            d="M 32 20 C 40 20 40 34 31 36"
            stroke="#00d2ff"
            strokeWidth="2.2"
          />
          {/* Steam Swirls */}
          <path d="M 14 12 C 14 6 18 6 18 0" stroke="#ffffff" strokeWidth="1.8" />
          <path d="M 22 12 C 22 6 26 6 26 0" stroke="#ffffff" strokeWidth="1.8" />
        </g>

        {/* ========================================================= */}
        {/* SPARKLES, 4-POINT STARS & WONKY SPIRALS SCATTERED ALL OVER */}
        {/* ========================================================= */}

        {/* Sparkle 1 - Near Top Left */}
        <g transform="translate(140, 210)" opacity="0.7">
          <path
            d="M 12 0 C 12 6 6 12 0 12 C 6 12 12 18 12 24 C 12 18 18 12 24 12 C 18 12 12 6 12 0 Z"
            fill="#00ff87"
          />
        </g>

        {/* Sparkle 2 - Top Center-Right */}
        <g transform="translate(860, 60)" opacity="0.65">
          <path
            d="M 10 0 C 10 5 5 10 0 10 C 5 10 10 15 10 20 C 10 15 15 10 20 10 C 15 10 10 5 10 0 Z"
            fill="#ffd23f"
          />
        </g>

        {/* Sparkle 3 - Middle Center */}
        <g transform="translate(510, 240)" opacity="0.55">
          <path
            d="M 8 0 C 8 4 4 8 0 8 C 4 8 8 12 8 16 C 8 12 12 8 16 8 C 12 8 8 4 8 0 Z"
            fill="#be185d"
          />
        </g>

        {/* Sparkle 4 - Lower Left */}
        <g transform="translate(230, 680)" opacity="0.65">
          <path
            d="M 14 0 C 14 7 7 14 0 14 C 7 14 14 21 14 28 C 14 21 21 14 28 14 C 21 14 14 7 14 0 Z"
            fill="#00ff87"
          />
        </g>

        {/* Sparkle 5 - Lower Right */}
        <g transform="translate(1120, 720)" opacity="0.65">
          <path
            d="M 11 0 C 11 5.5 5.5 11 0 11 C 5.5 11 11 16.5 11 22 C 11 16.5 16.5 11 22 11 C 16.5 11 11 5.5 11 0 Z"
            fill="#00d2ff"
          />
        </g>

        {/* 5-Point Hand-Drawn Stars */}
        {/* Star 1 */}
        <g transform="translate(420, 80) scale(0.8)" opacity="0.6">
          <polygon
            points="12,2 15,9 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,9"
            stroke="#ffd23f"
            strokeWidth="2"
            fill="#ffd23f33"
          />
        </g>

        {/* Star 2 */}
        <g transform="translate(760, 160) scale(0.75)" opacity="0.55">
          <polygon
            points="12,2 15,9 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,9"
            stroke="#00ff87"
            strokeWidth="2"
            fill="#00ff8722"
          />
        </g>

        {/* Star 3 */}
        <g transform="translate(1380, 380) scale(0.8)" opacity="0.6">
          <polygon
            points="12,2 15,9 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,9"
            stroke="#be185d"
            strokeWidth="2"
            fill="#be185d22"
          />
        </g>

        {/* Star 4 */}
        <g transform="translate(90, 720) scale(0.75)" opacity="0.55">
          <polygon
            points="12,2 15,9 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,9"
            stroke="#00d2ff"
            strokeWidth="2"
            fill="#00d2ff22"
          />
        </g>

        {/* Wonky Spirals */}
        {/* Spiral 1 */}
        <g transform="translate(320, 270)" opacity="0.45">
          <path
            d="M 15 15 A 3 3 0 0 1 12 12 A 6 6 0 0 1 18 6 A 10 10 0 0 1 25 18 A 15 15 0 0 1 8 28"
            stroke="#be185d"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Spiral 2 */}
        <g transform="translate(1080, 310)" opacity="0.45">
          <path
            d="M 15 15 A 3 3 0 0 1 12 12 A 6 6 0 0 1 18 6 A 10 10 0 0 1 25 18 A 15 15 0 0 1 8 28"
            stroke="#00ff87"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Doodle Crosshair '+' and 'x' marks scattered */}
        <g stroke="#ffffff" strokeWidth="1.6" opacity="0.35">
          {/* Plus 1 */}
          <line x1="80" y1="230" x2="90" y2="230" />
          <line x1="85" y1="225" x2="85" y2="235" />

          {/* Cross 2 */}
          <line x1="480" y1="60" x2="490" y2="70" />
          <line x1="490" y1="60" x2="480" y2="70" />

          {/* Plus 3 */}
          <line x1="680" y1="80" x2="690" y2="80" />
          <line x1="685" y1="75" x2="685" y2="85" />

          {/* Cross 4 */}
          <line x1="1040" y1="80" x2="1050" y2="90" />
          <line x1="1050" y1="80" x2="1040" y2="90" />

          {/* Plus 5 */}
          <line x1="1390" y1="260" x2="1400" y2="260" />
          <line x1="1395" y1="255" x2="1395" y2="265" />

          {/* Cross 6 */}
          <line x1="70" y1="660" x2="80" y2="670" />
          <line x1="80" y1="660" x2="70" y2="670" />

          {/* Plus 7 */}
          <line x1="1200" y1="620" x2="1210" y2="620" />
          <line x1="1205" y1="615" x2="1205" y2="625" />
        </g>
      </svg>
    </div>
  )
}

