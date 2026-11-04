import React, { useState, useRef } from 'react'

/* =========================================================================
 * 1. DOODLE BIRD (Pip & friends: Perching, Singing, Flying, Peeking)
 * ========================================================================= */
export type BirdPose = 'perching' | 'singing' | 'flying' | 'peeking'

interface DoodleBirdProps {
  pose?: BirdPose
  size?: number
  flip?: boolean
  className?: string
  speech?: string
  speechAlign?: 'top' | 'left' | 'right' | 'bottom'
}

const BIRD_CHIRPS = [
  'Chirp! 🎵 Bit-perfect ALSA!',
  'Tweet! 0 telemetry in the air!',
  'Peck peck... 120Hz smooth!',
  'Flying high on Snapdragon silicon! ⚡',
  'Pip approved! 🐥',
  'Tweet tweet! 🎧',
]

export const DoodleBird: React.FC<DoodleBirdProps> = ({
  pose = 'perching',
  size = 54,
  flip = false,
  className = '',
  speech,
  speechAlign = 'top',
}) => {
  const [talking, setTalking] = useState(false)
  const [chirpText, setChirpText] = useState(speech || BIRD_CHIRPS[0])
  const [isHop, setIsHop] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const randomChirp = speech || BIRD_CHIRPS[Math.floor(Math.random() * BIRD_CHIRPS.length)]
    setChirpText(randomChirp)
    setTalking(true)
    setIsHop(true)

    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setIsHop(false), 600)
    timerRef.current = window.setTimeout(() => setTalking(false), 3000)
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none cursor-pointer group transition-transform duration-200 ${
        isHop ? '-translate-y-2.5 scale-110' : 'hover:-translate-y-1 hover:scale-105'
      } ${className}`}
      title="Click the bird!"
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
          <span>{chirpText}</span>
          <div
            className={`absolute w-2.5 h-2.5 bg-[#040a18] border-[#00ff87] rotate-45 ${
              speechAlign === 'bottom'
                ? '-top-1.5 left-1/2 -translate-x-1/2 border-t-2 border-l-2'
                : '-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2'
            }`}
          />
        </div>
      )}

      {/* RENDER BIRD */}
      {pose === 'perching' && <PerchingBirdSVG size={size} />}
      {pose === 'singing' && <SingingBirdSVG size={size} />}
      {pose === 'flying' && <FlyingBirdSVG size={size} />}
      {pose === 'peeking' && <PeekingBirdSVG size={size} />}
    </div>
  )
}

const PerchingBirdSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -65 80 75"
    width={size}
    height={size}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes birdPeck {
        0%, 70%, 100% { transform: rotate(0deg); }
        74% { transform: rotate(14deg) translateY(2px); }
        78% { transform: rotate(0deg); }
        82% { transform: rotate(12deg) translateY(2px); }
        86% { transform: rotate(0deg); }
      }
      .anim-bird-peck {
        transform-origin: 0px -4px;
        animation: birdPeck 5s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-bird-peck">
      {/* Feet perching */}
      <path d="M-6 0 L-6 -8 M-10 0 L-2 0 M6 0 L6 -8 M2 0 L10 0" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tail feathers */}
      <path d="M-18 -18 C-28 -20 -34 -16 -36 -10 C-28 -11 -21 -9 -16 -12 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      {/* Bird Body */}
      <path
        d="M-19 -16 C-22 -32 -11 -42 2 -42 C17 -42 24 -30 22 -17 C20 -7 10 -4 1 -4 C-9 -4 -17 -8 -19 -16 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Wing */}
      <path d="M-12 -27 C-4 -28 0 -20 -4 -14 C-10 -13 -16 -18 -12 -27 Z" fill="#00ff87" stroke="#ffffff" strokeWidth="2" />
      {/* Beak */}
      <path d="M21 -31 L32 -28 L21 -24 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
      {/* Head Crest */}
      <path d="M-3 -40 L4 -58 L12 -38 Z" fill="#be185d" stroke="#ffffff" strokeWidth="2" />
      <circle cx="4" cy="-59" r="3" fill="#ffd23f" stroke="#ffffff" strokeWidth="1.5" />
      {/* Cute Big Eye */}
      <circle cx="9" cy="-30" r="5" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="10" cy="-30" r="2.6" fill="#020612" />
      <circle cx="11" cy="-31.5" r="1.2" fill="#ffffff" />
    </g>
  </svg>
)

const SingingBirdSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -70 85 80"
    width={size}
    height={size}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(255,210,63,0.35))',
    }}
  >
    <style>{`
      @keyframes noteFloat {
        0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translate(16px, -24px) scale(1.2); }
      }
      .anim-note-1 { animation: noteFloat 2.4s ease-out infinite; }
      .anim-note-2 { animation: noteFloat 2.4s ease-out 1s infinite; }
    `}</style>
    {/* Floating Notes */}
    <g className="anim-note-1" style={{ transformOrigin: '30px -40px' }}>
      <text x="28" y="-40" fill="#00ff87" fontSize="14" fontWeight="bold">♪</text>
    </g>
    <g className="anim-note-2" style={{ transformOrigin: '36px -54px' }}>
      <text x="34" y="-54" fill="#ffd23f" fontSize="16" fontWeight="bold">♫</text>
    </g>

    {/* Feet */}
    <path d="M-5 0 L-5 -7 M-9 0 L-1 0 M5 0 L5 -7 M1 0 L9 0" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" />
    {/* Body angled upwards singing */}
    <path
      d="M-18 -14 C-20 -30 -10 -40 2 -40 C16 -40 22 -28 20 -16 C18 -6 8 -4 0 -4 C-10 -4 -17 -8 -18 -14 Z"
      fill="#060d22"
      stroke="#ffffff"
      strokeWidth="2.5"
    />
    {/* Wing */}
    <path d="M-11 -25 C-3 -26 1 -18 -3 -13 C-9 -12 -15 -17 -11 -25 Z" fill="#be185d" stroke="#ffffff" strokeWidth="2" />
    {/* Open Singing Beak */}
    <path d="M20 -33 L32 -33 L21 -29 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
    <path d="M21 -28 L30 -24 L20 -24 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
    {/* Eye singing (happy arc) */}
    <path d="M6 -29 C8 -33 13 -33 15 -29" fill="none" stroke="#00ff87" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

const FlyingBirdSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-45 -50 90 70"
    width={size}
    height={size * 0.78}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes birdFly {
        0%, 100% { transform: translateY(0) rotate(-3deg); }
        50% { transform: translateY(-6px) rotate(4deg); }
      }
      .anim-bird-fly { animation: birdFly 1.8s ease-in-out infinite; }
    `}</style>
    <g className="anim-bird-fly">
      {/* Extended Flight Wings */}
      <path d="M-6 -10 C-12 -34 -4 -42 14 -32 C4 -26 0 -18 -4 -8 Z" fill="#00ff87" stroke="#ffffff" strokeWidth="2.5" />
      {/* Body */}
      <ellipse cx="0" cy="-4" rx="18" ry="11" transform="rotate(-15)" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Tail Feathers */}
      <path d="M-16 2 L-28 6 L-24 0 L-29 -6 L-16 -3 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />
      {/* Beak forward */}
      <path d="M16 -9 L28 -12 L18 -4 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
      {/* Eye */}
      <circle cx="10" cy="-8" r="3.5" fill="#ffffff" />
      <circle cx="11" cy="-8" r="1.8" fill="#020612" />
    </g>
  </svg>
)

const PeekingBirdSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-30 -50 60 55"
    width={size}
    height={size * 0.9}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <g>
      {/* Head Peeking */}
      <path d="M-16 0 C-18 -24 -6 -34 8 -34 C22 -34 26 -22 22 0 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Crest */}
      <path d="M0 -34 L4 -46 L10 -32 Z" fill="#ffd23f" stroke="#ffffff" strokeWidth="2" />
      {/* Beak */}
      <path d="M18 -18 L28 -16 L18 -12 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
      {/* Eye looking down */}
      <circle cx="8" cy="-18" r="5" fill="#ffffff" />
      <circle cx="9" cy="-17" r="2.6" fill="#020612" />
      {/* Two tiny feet hooked over top */}
      <path d="M-8 0 L-8 4 M-4 0 L-4 4 M8 0 L8 4 M12 0 L12 4" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
)

/* =========================================================================
 * 2. DOODLE PENGUIN (Waddling, Headphones, Belly-Sliding, Peeking)
 * ========================================================================= */
export type PenguinPose = 'waddling' | 'headphones' | 'sliding' | 'peeking'

interface DoodlePenguinProps {
  pose?: PenguinPose
  size?: number
  flip?: boolean
  className?: string
  speech?: string
  speechAlign?: 'top' | 'left' | 'right' | 'bottom'
}

const PENGUIN_HONKS = [
  'Noot noot! 🐧 Direct APK vault!',
  'Waddling on Snapdragon 8 Elite! ❄️',
  'Audiophile flippers tuned! 🎧',
  'Sliding through 120Hz frames!',
  'Cool air-gapped penguin! 🧊',
  'Zero tracking on my ice berg! 🐧',
]

export const DoodlePenguin: React.FC<DoodlePenguinProps> = ({
  pose = 'waddling',
  size = 60,
  flip = false,
  className = '',
  speech,
  speechAlign = 'top',
}) => {
  const [talking, setTalking] = useState(false)
  const [honkText, setHonkText] = useState(speech || PENGUIN_HONKS[0])
  const [isHop, setIsHop] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const randomHonk = speech || PENGUIN_HONKS[Math.floor(Math.random() * PENGUIN_HONKS.length)]
    setHonkText(randomHonk)
    setTalking(true)
    setIsHop(true)

    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setIsHop(false), 600)
    timerRef.current = window.setTimeout(() => setTalking(false), 3000)
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none cursor-pointer group transition-transform duration-200 ${
        isHop ? '-translate-y-2.5 scale-110' : 'hover:-translate-y-1 hover:scale-105'
      } ${className}`}
      title="Click the penguin!"
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
          <span>{honkText}</span>
          <div
            className={`absolute w-2.5 h-2.5 bg-[#040a18] border-[#00ff87] rotate-45 ${
              speechAlign === 'bottom'
                ? '-top-1.5 left-1/2 -translate-x-1/2 border-t-2 border-l-2'
                : '-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2'
            }`}
          />
        </div>
      )}

      {/* RENDER PENGUIN */}
      {pose === 'waddling' && <WaddlingPenguinSVG size={size} />}
      {pose === 'headphones' && <HeadphonesPenguinSVG size={size} />}
      {pose === 'sliding' && <SlidingPenguinSVG size={size} />}
      {pose === 'peeking' && <PeekingPenguinSVG size={size} />}
    </div>
  )
}

const WaddlingPenguinSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-40 -70 80 80"
    width={size}
    height={size}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <style>{`
      @keyframes penguinWaddle {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
      .anim-penguin-waddle {
        transform-origin: 0px 4px;
        animation: penguinWaddle 1.6s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-penguin-waddle">
      {/* Orange Waddling Feet */}
      <ellipse cx="-12" cy="4" rx="10" ry="4" fill="#ff9f1c" stroke="#ffffff" strokeWidth="2" />
      <ellipse cx="12" cy="4" rx="10" ry="4" fill="#ff9f1c" stroke="#ffffff" strokeWidth="2" />

      {/* Chubby Body */}
      <path
        d="M-22 0 C-26 -24 -20 -52 0 -52 C20 -52 26 -24 22 0 C16 4 -16 4 -22 0 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />

      {/* White Belly Oval */}
      <ellipse cx="0" cy="-18" rx="13" ry="18" fill="#ffffff" />

      {/* Flippers flapping on sides */}
      <path d="M-20 -30 C-30 -22 -32 -10 -22 -4" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 -30 C30 -22 32 -10 22 -4" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cute Beak */}
      <path d="M-4 -36 L4 -36 L0 -30 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />

      {/* Two Round Eyes */}
      <circle cx="-7" cy="-42" r="4.5" fill="#ffffff" />
      <circle cx="-7" cy="-42" r="2.3" fill="#020612" />
      <circle cx="-6" cy="-43" r="0.9" fill="#ffffff" />

      <circle cx="7" cy="-42" r="4.5" fill="#ffffff" />
      <circle cx="7" cy="-42" r="2.3" fill="#020612" />
      <circle cx="8" cy="-43" r="0.9" fill="#ffffff" />
    </g>
  </svg>
)

const HeadphonesPenguinSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-45 -75 90 85"
    width={size}
    height={size}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.4))',
    }}
  >
    <style>{`
      @keyframes headBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      .anim-penguin-bob {
        animation: headBob 1.2s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-penguin-bob">
      {/* Orange Feet */}
      <ellipse cx="-12" cy="4" rx="9" ry="4" fill="#ff9f1c" stroke="#ffffff" strokeWidth="2" />
      <ellipse cx="12" cy="4" rx="9" ry="4" fill="#ff9f1c" stroke="#ffffff" strokeWidth="2" />

      {/* Body */}
      <path
        d="M-22 0 C-26 -24 -20 -52 0 -52 C20 -52 26 -24 22 0 C16 4 -16 4 -22 0 Z"
        fill="#060d22"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      {/* Belly */}
      <ellipse cx="0" cy="-18" rx="13" ry="18" fill="#ffffff" />

      {/* Flippers */}
      <path d="M-20 -28 C-30 -20 -30 -6 -20 -4" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      <path d="M20 -28 C30 -20 30 -6 22 -4" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />

      {/* Cute Beak */}
      <path d="M-4 -36 L4 -36 L0 -30 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />

      {/* Closed Happy Eyes listening to Lossless Music */}
      <path d="M-10 -40 C-8 -43 -5 -43 -3 -40" fill="none" stroke="#00ff87" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M3 -40 C5 -43 8 -43 10 -40" fill="none" stroke="#00ff87" strokeWidth="2.4" strokeLinecap="round" />

      {/* Audiophile Neon Green Headband & Earcups */}
      <path d="M-18 -42 C-20 -64 20 -64 18 -42" fill="none" stroke="#00ff87" strokeWidth="3.5" strokeLinecap="round" />
      {/* Left Earcup */}
      <rect x="-25" y="-48" width="9" height="15" rx="4" fill="#be185d" stroke="#ffffff" strokeWidth="2" />
      {/* Right Earcup */}
      <rect x="16" y="-48" width="9" height="15" rx="4" fill="#be185d" stroke="#ffffff" strokeWidth="2" />

      {/* Music Note floating */}
      <text x="22" y="-56" fill="#00ff87" fontSize="13" fontWeight="bold">♫</text>
    </g>
  </svg>
)

const SlidingPenguinSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-50 -45 100 60"
    width={size}
    height={size * 0.65}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,210,255,0.35))',
    }}
  >
    <style>{`
      @keyframes iceSlide {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(6px); }
      }
      .anim-penguin-slide {
        animation: iceSlide 2s ease-in-out infinite;
      }
    `}</style>
    <g className="anim-penguin-slide">
      {/* Ice Speed Whoosh Lines */}
      <line x1="-45" y1="6" x2="-25" y2="6" stroke="#00d2ff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="-38" y1="11" x2="-18" y2="11" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" />

      {/* Sliding Belly Down Body */}
      <ellipse cx="2" cy="0" rx="26" ry="12" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      <ellipse cx="2" cy="4" rx="20" ry="7" fill="#ffffff" />

      {/* Tail in rear */}
      <path d="M-22 -2 L-32 -4 L-24 4 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2" />

      {/* Sliding Flippers out for balance */}
      <path d="M-6 -6 C-6 -18 6 -18 8 -6" fill="#060d22" stroke="#ffffff" strokeWidth="2.2" />

      {/* Head Forward */}
      <circle cx="22" cy="-4" r="11" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* Beak forward */}
      <path d="M30 -5 L40 -2 L30 1 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />
      {/* Eye excited */}
      <circle cx="24" cy="-6" r="3.5" fill="#ffffff" />
      <circle cx="25" cy="-6" r="1.8" fill="#020612" />
    </g>
  </svg>
)

const PeekingPenguinSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="-35 -55 70 60"
    width={size}
    height={size * 0.85}
    className="overflow-visible"
    style={{
      filter: 'drop-shadow(2px 3px 0px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(0,255,135,0.3))',
    }}
  >
    <g>
      {/* Head Peeking */}
      <path d="M-18 2 C-20 -28 -14 -42 0 -42 C14 -42 20 -28 18 2 Z" fill="#060d22" stroke="#ffffff" strokeWidth="2.5" />
      {/* White face mask */}
      <path d="M-12 2 C-14 -16 -8 -26 0 -26 C8 -26 14 -16 12 2 Z" fill="#ffffff" />

      {/* Beak */}
      <path d="M-3 -22 L3 -22 L0 -16 Z" fill="#ff9f1c" stroke="#ffffff" strokeWidth="1.8" />

      {/* Eyes */}
      <circle cx="-6" cy="-28" r="3.5" fill="#020612" />
      <circle cx="-5" cy="-29" r="1.2" fill="#ffffff" />
      <circle cx="6" cy="-28" r="3.5" fill="#020612" />
      <circle cx="7" cy="-29" r="1.2" fill="#ffffff" />

      {/* Two flipper tips on ledge */}
      <ellipse cx="-16" cy="2" rx="5" ry="3" fill="#060d22" stroke="#ffffff" strokeWidth="2" />
      <ellipse cx="16" cy="2" rx="5" ry="3" fill="#060d22" stroke="#ffffff" strokeWidth="2" />
    </g>
  </svg>
)

/* =========================================================================
 * 3. HAND-DRAWN DOODLE SKETCH ARROWS & DECORATIVE CALLOUTS
 * ========================================================================= */
export const DoodleSketchArrow: React.FC<{
  direction?: 'down-right' | 'down-left' | 'up-right' | 'curved-left' | 'curved-right'
  label?: string
  color?: string
  className?: string
}> = ({ direction = 'down-right', label, color = '#00ff87', className = '' }) => {
  return (
    <div className={`inline-flex flex-col items-center select-none pointer-events-none ${className}`}>
      {label && (
        <span
          className="text-xs font-mono font-black tracking-wide mb-0.5 px-2 py-0.5 rounded-full border border-dashed text-white shadow-[2px_2px_0_#be185d]"
          style={{ borderColor: color, backgroundColor: '#040a18' }}
        >
          {label}
        </span>
      )}
      <svg viewBox="0 0 50 35" width="46" height="32" className="overflow-visible">
        {direction === 'down-right' && (
          <path
            d="M5 5 C15 5 35 10 38 24 M38 24 L30 18 M38 24 L38 14"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === 'down-left' && (
          <path
            d="M45 5 C35 5 15 10 12 24 M12 24 L20 18 M12 24 L12 14"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === 'curved-right' && (
          <path
            d="M6 28 C12 6 36 6 42 18 M42 18 L34 14 M42 18 L40 26"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === 'curved-left' && (
          <path
            d="M44 28 C38 6 14 6 8 18 M8 18 L16 14 M8 18 L10 26"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  )
}

