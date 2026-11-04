import React, { useState, useRef } from 'react'

export type CatPose = 'sitting' | 'peeking' | 'sleeping' | 'stretching' | 'loaf'

interface DoodleCatProps {
  pose?: CatPose
  size?: number
  flip?: boolean
  className?: string
  speech?: string
  speechAlign?: 'top' | 'left' | 'right' | 'bottom'
}

const CAT_MEOWS = [
  'Meow! 🐾',
  'Purr... zero telemetry!',
  '120Hz smooth fur! ✨',
  'Bit-perfect audio tuned! 🎧',
  'Snapdragon powered cat! ⚡',
  'Pet me again! 😺',
  'Air-gapped nap time... zZz',
  'Nyaaa! 🧶',
]

export const DoodleCat: React.FC<DoodleCatProps> = ({
  pose = 'sitting',
  size = 64,
  flip = false,
  className = '',
  speech,
  speechAlign = 'top',
}) => {
  const [talking, setTalking] = useState(false)
  const [meowText, setMeowText] = useState(speech || CAT_MEOWS[0])
  const [isHop, setIsHop] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const randomMeow = speech || CAT_MEOWS[Math.floor(Math.random() * CAT_MEOWS.length)]
    setMeowText(randomMeow)
    setTalking(true)
    setIsHop(true)

    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setIsHop(false)
    }, 600)
    timerRef.current = window.setTimeout(() => {
      setTalking(false)
    }, 3200)
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none cursor-pointer group transition-transform duration-200 ${
        isHop ? '-translate-y-2.5 scale-110' : 'hover:-translate-y-1 hover:scale-105'
      } ${className}`}
      title="Click the cat!"
      style={{
        transform: `${flip ? 'scaleX(-1)' : ''} ${isHop ? 'translateY(-10px) scale(1.1)' : ''}`,
      }}
    >
      {/* Speech Bubble */}
      {talking && (
        <div
          className={`absolute z-40 pointer-events-none whitespace-nowrap bg-[#040a18] text-[#00ff87] border-2 border-[#00ff87] rounded-2xl px-3 py-1.5 text-xs font-bold shadow-[3px_3px_0_#be185d] animate-in fade-in zoom-in duration-200 ${
            flip ? 'scale-x-[-1]' : ''
          } ${
            speechAlign === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              : speechAlign === 'left'
              ? 'bottom-full right-0 mb-2'
              : speechAlign === 'right'
              ? 'bottom-full left-0 mb-2'
              : 'top-full left-1/2 -translate-x-1/2 mt-2'
          }`}
        >
          <span>{meowText}</span>
          <div
            className={`absolute w-2.5 h-2.5 bg-[#040a18] border-[#00ff87] rotate-45 ${
              speechAlign === 'bottom'
                ? '-top-1.5 left-1/2 -translate-x-1/2 border-t-2 border-l-2'
                : '-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2'
            }`}
          />
        </div>
      )}

      {/* RENDER CAT BASED ON POSE */}
      {pose === 'sitting' && <SittingCat size={size} />}
      {pose === 'peeking' && <PeekingCat size={size} />}
      {pose === 'sleeping' && <SleepingCat size={size} />}
      {pose === 'stretching' && <StretchingCat size={size} />}
      {pose === 'loaf' && <LoafCat size={size} />}
    </div>
  )
}

/** 1. Classic Sitting Cat (tail wags, whiskers, eyes) */
const SittingCat: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -115 100 125"
    width={size}
    height={size}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes catTailWag {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-16deg); }
      }
      @keyframes catEarTwitch {
        0%, 90%, 100% { transform: rotate(0deg); }
        94% { transform: rotate(-8deg); }
        98% { transform: rotate(4deg); }
      }
      .anim-cat-tail {
        transform-origin: 18px -4px;
        animation: catTailWag 2.6s ease-in-out infinite;
      }
      .anim-cat-ear {
        transform-origin: -22px -86px;
        animation: catEarTwitch 4s ease-in-out infinite;
      }
    `}</style>
    <g className="dcf-art">
      <ellipse className="dcf-shadow" cx="4" cy="2" rx="32" ry="4" fill="rgba(255,255,255,0.15)" />

      {/* Animated Wagging Tail */}
      <g className="anim-cat-tail">
        <path
          d="M18 -4 C42 -4 52 -24 46 -44 C44 -51 36 -53 34 -46 C40 -30 34 -16 16 -14 Z"
          fill="#060d22"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <path d="M40 -16 l5 4 M45 -30 l6 1 M43 -42 l6 -3" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      {/* Cat Body */}
      <path
        d="M-22 0 C-28 -18 -24 -42 -14 -52 L14 -52 C24 -42 28 -18 22 0 C10 3 -10 3 -22 0 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <path d="M-8 -30 L-9 -1 M8 -30 L9 -1" stroke="#ffffff" strokeWidth="2.2" />

      {/* Front Paws */}
      <path d="M-16 1 C-16 -5 -3 -5 -3 1 Z M3 1 C3 -5 16 -5 16 1 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />

      {/* Mint Collar */}
      <path d="M-18 -55 C-6 -49 6 -49 18 -55 L17 -46 C6 -40 -6 -40 -17 -46 Z" fill="#00ff87" stroke="#ffffff" strokeWidth="2.2" />
      <circle cx="0" cy="-44" r="3.5" fill="#be185d" stroke="#ffffff" strokeWidth="1.5" />

      {/* Ears */}
      <g className="anim-cat-ear">
        <path d="M-22 -86 L-25 -107 L-7 -96 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      </g>
      <path d="M8 -96 L23 -108 L22 -86 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />

      {/* Head */}
      <path
        d="M-26 -70 C-28 -88 -16 -98 0 -98 C16 -98 28 -88 26 -70 C24 -56 12 -50 0 -50 C-12 -50 -24 -56 -26 -70 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />

      {/* Big Cute Eyes */}
      <circle cx="-10" cy="-74" r="7" fill="#ffffff" />
      <circle cx="-10" cy="-74" r="3.8" fill="#020612" />
      <circle cx="-8.5" cy="-76" r="1.5" fill="#ffffff" />

      <circle cx="10" cy="-74" r="7" fill="#ffffff" />
      <circle cx="10" cy="-74" r="3.8" fill="#020612" />
      <circle cx="11.5" cy="-76" r="1.5" fill="#ffffff" />

      {/* Nose & Mouth */}
      <path d="M-2.5 -65 L2.5 -65 L0 -62 Z" fill="#be185d" />
      <path d="M0 -62 C-1 -58 -5 -58 -6 -60 M0 -62 C1 -58 5 -58 6 -60" fill="none" stroke="#ffffff" strokeWidth="2" />

      {/* Whiskers */}
      <path d="M-15 -64 L-30 -66 M-15 -61 L-29 -57 M15 -64 L30 -66 M15 -61 L29 -57" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  </svg>
)

/** 2. Peeking Cat (clutching edge with paws, curious eyes) */
const PeekingCat: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -65 80 70"
    width={size}
    height={size * 0.88}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes catPeekBob {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      .anim-cat-peek {
        animation: catPeekBob 3.5s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-cat-peek">
      {/* Ears */}
      <path d="M-24 -36 L-28 -58 L-8 -46 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M8 -46 L28 -58 L24 -36 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />

      {/* Head Peeking */}
      <path
        d="M-26 -20 C-28 -42 -16 -48 0 -48 C16 -48 28 -42 26 -20 C24 -8 16 0 0 0 C-16 0 -24 -8 -26 -20 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />

      {/* Big Eyes looking over edge */}
      <circle cx="-10" cy="-24" r="7" fill="#ffffff" />
      <circle cx="-10" cy="-22" r="3.8" fill="#020612" />
      <circle cx="-8.5" cy="-24" r="1.5" fill="#ffffff" />

      <circle cx="10" cy="-24" r="7" fill="#ffffff" />
      <circle cx="10" cy="-22" r="3.8" fill="#020612" />
      <circle cx="11.5" cy="-24" r="1.5" fill="#ffffff" />

      {/* Nose */}
      <path d="M-2 -13 L2 -13 L0 -10 Z" fill="#be185d" />

      {/* Whiskers */}
      <path d="M-13 -13 L-26 -15 M-13 -10 L-25 -7 M13 -13 L26 -15 M13 -10 L25 -7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

      {/* Two Paws Hooked Over Ledge */}
      <ellipse cx="-16" cy="2" rx="7" ry="5" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      <line x1="-18" y1="-1" x2="-18" y2="4" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="-14" y1="-1" x2="-14" y2="4" stroke="#ffffff" strokeWidth="1.5" />

      <ellipse cx="16" cy="2" rx="7" ry="5" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      <line x1="14" y1="-1" x2="14" y2="4" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="18" y1="-1" x2="18" y2="4" stroke="#ffffff" strokeWidth="1.5" />
    </g>
  </svg>
)

/** 3. Sleeping Cat (curled up loaf with floating zZz) */
const SleepingCat: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-45 -45 90 60"
    width={size}
    height={size * 0.68}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(255,210,63,0.3))',
    }}
  >
    <style>{`
      @keyframes catBreathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03, 0.97); }
      }
      @keyframes zzzFloat {
        0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translate(14px, -24px) scale(1.2); }
      }
      .anim-cat-breathe {
        transform-origin: 0px 0px;
        animation: catBreathe 3.8s ease-in-out infinite;
      }
      .anim-zzz-1 { animation: zzzFloat 2.8s ease-out infinite; }
      .anim-zzz-2 { animation: zzzFloat 2.8s ease-out 1.2s infinite; }
    `}</style>
    {/* Floating z Z Z */}
    <g className="anim-zzz-1" style={{ transformOrigin: '15px -20px' }}>
      <text x="12" y="-20" fill="#00ff87" fontSize="11" fontWeight="bold" fontFamily="sans-serif">z</text>
    </g>
    <g className="anim-zzz-2" style={{ transformOrigin: '22px -30px' }}>
      <text x="20" y="-30" fill="#ffd23f" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Z</text>
    </g>

    <g className="anim-cat-breathe">
      {/* Curled Body */}
      <path
        d="M-28 6 C-34 -14 -18 -26 6 -26 C28 -26 36 -10 32 6 C28 14 -18 16 -28 6 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Curled Tail Wrapped Around */}
      <path
        d="M26 4 C24 16 -12 18 -24 12 C-32 8 -30 2 -26 4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Head Tucked In */}
      <circle cx="-16" cy="-4" r="13" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Ears Folded */}
      <path d="M-26 -12 L-29 -22 L-19 -16 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M-15 -17 L-8 -23 L-8 -13 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />

      {/* Sleeping Eyes (Happy Curved Arcs) */}
      <path d="M-22 -4 C-20 -7 -16 -7 -14 -4" fill="none" stroke="#00ff87" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-12 -4 C-10 -7 -6 -7 -4 -4" fill="none" stroke="#00ff87" strokeWidth="2.2" strokeLinecap="round" />

      {/* Tiny Whiskers */}
      <line x1="-24" y1="-1" x2="-32" y2="-2" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="-23" y1="2" x2="-31" y2="4" stroke="#ffffff" strokeWidth="1.5" />
    </g>
  </svg>
)

/** 4. Stretching Cat (front paws forward, rear raised) */
const StretchingCat: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-45 -60 90 70"
    width={size}
    height={size * 0.78}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(190,24,93,0.3))',
    }}
  >
    <style>{`
      @keyframes catStretch {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06, 0.94); }
      }
      .anim-cat-stretch {
        animation: catStretch 4s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-cat-stretch">
      {/* High Tail in Air */}
      <path
        d="M26 -16 C34 -32 38 -50 32 -54 C28 -56 24 -46 22 -30 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Stretched Body Curve: High rear, dipping middle, front paws forward */}
      <path
        d="M24 -14 C18 -26 0 -10 -16 -2 L-32 8 C-36 10 -36 14 -30 14 L-12 10 C6 8 20 6 26 -6 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Front Paws Stretched Forward */}
      <path d="M-34 10 L-42 12 C-45 13 -44 16 -40 16 L-30 14 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />

      {/* Head Down low stretching */}
      <circle cx="-24" cy="0" r="10" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Ears Back */}
      <path d="M-22 -8 L-25 -18 L-15 -10 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2" />
      <path d="M-14 -6 L-10 -16 L-8 -6 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2" />

      {/* Content eye */}
      <path d="M-27 0 C-25 -2 -22 -2 -20 0" fill="none" stroke="#ffffff" strokeWidth="1.8" />
    </g>
  </svg>
)

/** 5. Loaf Cat (all paws tucked in, alert ears) */
const LoafCat: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -55 80 65"
    width={size}
    height={size * 0.82}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes catBlink {
        0%, 92%, 100% { transform: scaleY(1); }
        96% { transform: scaleY(0.1); }
      }
      .anim-cat-eyes {
        transform-origin: 0px -18px;
        animation: catBlink 4.2s infinite;
      }
    `}</style>
    <g>
      {/* Loaf Body */}
      <ellipse cx="2" cy="0" rx="26" ry="16" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Tail Wrapped on side */}
      <path d="M22 6 C28 4 30 -2 26 -6" fill="none" stroke="#ffffff" strokeWidth="2.2" />

      {/* Head */}
      <circle cx="-12" cy="-18" r="14" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Ears */}
      <path d="M-22 -26 L-26 -44 L-12 -32 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      <path d="M-6 -30 L4 -42 L0 -24 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />

      {/* Eyes with blinking animation */}
      <g className="anim-cat-eyes">
        <circle cx="-16" cy="-18" r="4.5" fill="#ffffff" />
        <circle cx="-16" cy="-18" r="2.4" fill="#020612" />
        <circle cx="-15" cy="-19" r="1" fill="#ffffff" />

        <circle cx="-4" cy="-18" r="4.5" fill="#ffffff" />
        <circle cx="-4" cy="-18" r="2.4" fill="#020612" />
        <circle cx="-3" cy="-19" r="1" fill="#ffffff" />
      </g>

      {/* Nose & Whiskers */}
      <path d="M-11 -12 L-9 -12 L-10 -10 Z" fill="#be185d" />
      <line x1="-18" y1="-12" x2="-28" y2="-13" stroke="#ffffff" strokeWidth="1.6" />
      <line x1="-18" y1="-9" x2="-27" y2="-7" stroke="#ffffff" strokeWidth="1.6" />
      <line x1="-2" y1="-12" x2="8" y2="-13" stroke="#ffffff" strokeWidth="1.6" />
      <line x1="-2" y1="-9" x2="7" y2="-7" stroke="#ffffff" strokeWidth="1.6" />
    </g>
  </svg>
)

