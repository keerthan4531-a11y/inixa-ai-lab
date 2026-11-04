import React, { useState, useRef } from 'react'

interface DoodleCatToggleProps {
  enabled: boolean
  onToggle: (nextState: boolean) => void
}

/**
 * Hand-drawn Doodle Cat Toggle Switch.
 * Features an animated hand-drawn SVG Cat that changes pose,
 * hops across the toggle track, and performs lively actions
 * with speech bubbles when toggled.
 */
export const DoodleCatToggle: React.FC<DoodleCatToggleProps> = ({
  enabled,
  onToggle,
}) => {
  const [talking, setTalking] = useState(false)
  const [justToggled, setJustToggled] = useState(false)
  const bubbleTimerRef = useRef<number | null>(null)

  const handleToggle = () => {
    const next = !enabled
    onToggle(next)
    setJustToggled(true)
    setTalking(true)

    if (bubbleTimerRef.current) {
      window.clearTimeout(bubbleTimerRef.current)
    }
    bubbleTimerRef.current = window.setTimeout(() => {
      setTalking(false)
      setJustToggled(false)
    }, 2800)
  }

  return (
    <div className="relative inline-flex flex-col items-center select-none z-30">
      {/* Playful Comic Speech Bubble */}
      {talking && (
        <div
          className={`absolute -top-12 z-40 whitespace-nowrap bg-[#040a18] border-2 rounded-2xl px-3 py-1 text-xs font-black transition-all animate-in fade-in zoom-in-95 duration-200 pointer-events-none ${
            enabled
              ? 'border-[#00ff87] text-[#00ff87] shadow-[3px_3px_0_#be185d]'
              : 'border-[#ffd23f] text-[#ffd23f] shadow-[3px_3px_0_#be185d]'
          }`}
        >
          <span>
            {enabled
              ? 'Meow! Cat is awake: Kinetic text animated! 🐾✨'
              : 'Purr... Cat is resting: Clean static text! 💤'}
          </span>
          <div
            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#040a18] border-r-2 border-b-2 rotate-45 ${
              enabled ? 'border-[#00ff87]' : 'border-[#ffd23f]'
            }`}
          />
        </div>
      )}

      {/* Main Tactile Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={enabled}
        title={enabled ? 'Click to turn OFF text animations' : 'Click to turn ON text animations'}
        className={`group relative flex items-center h-12 w-[190px] sm:w-[210px] rounded-full border-2 border-white p-1 transition-all duration-300 cursor-pointer ${
          enabled
            ? 'bg-[#060e24] shadow-[4px_4px_0_#00ff87] hover:shadow-[5px_5px_0_#ffd23f]'
            : 'bg-[#040a18] shadow-[4px_4px_0_#be185d] hover:shadow-[5px_5px_0_#00ff87]'
        } hover:-translate-y-0.5 active:translate-y-0.5`}
      >
        {/* Toggle Track Labels */}
        <div className="w-full flex items-center justify-between px-3 text-[11px] font-mono font-black pointer-events-none">
          <span
            className={`transition-colors duration-200 ${
              !enabled ? 'text-white' : 'text-slate-500'
            }`}
          >
            REST 💤
          </span>
          <span
            className={`transition-colors duration-200 ${
              enabled ? 'text-[#00ff87]' : 'text-slate-500'
            }`}
          >
            ACTIVE 🐾
          </span>
        </div>

        {/* Sliding Doodle Cat Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            justToggled ? 'scale-110' : 'scale-100'
          } ${
            enabled
              ? 'left-[calc(100%-46px)] bg-[#00ff87] shadow-[2px_2px_0_#be185d]'
              : 'left-1 bg-[#101b38] border-2 border-white/60 shadow-[2px_2px_0_#ffd23f]'
          }`}
        >
          {enabled ? (
            /* ======================================================== */
            /* AWAKE ACTIVE CAT (Eyes open, glowing, ears up, happy)   */
            /* ======================================================== */
            <svg
              viewBox="0 0 36 36"
              className="w-8 h-8 select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cat Ears */}
              <polygon points="8,14 11,4 16,11" fill="#020612" stroke="#020612" strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="10,12 12,6 15,10" fill="#be185d" />
              <polygon points="28,14 25,4 20,11" fill="#020612" stroke="#020612" strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="26,12 24,6 21,10" fill="#be185d" />

              {/* Cat Head */}
              <ellipse cx="18" cy="18" rx="11" ry="9" fill="#020612" />

              {/* Big Awake Eyes */}
              <circle cx="14" cy="17" r="2.8" fill="#ffffff" />
              <circle cx="22" cy="17" r="2.8" fill="#ffffff" />
              <circle cx="14.5" cy="16.8" r="1.5" fill="#00ff87" />
              <circle cx="21.5" cy="16.8" r="1.5" fill="#00ff87" />
              <circle cx="14.8" cy="16.4" r="0.6" fill="#ffffff" />
              <circle cx="21.8" cy="16.4" r="0.6" fill="#ffffff" />

              {/* Cute Nose & Mouth */}
              <polygon points="18,20 17,21.5 19,21.5" fill="#be185d" />
              <path d="M 16 23 C 17 24 18 24 18 23 C 18 24 19 24 20 23" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

              {/* Whiskers */}
              <line x1="6" y1="18" x2="11" y2="19" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
              <line x1="6" y1="21" x2="11" y2="21" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
              <line x1="30" y1="18" x2="25" y2="19" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
              <line x1="30" y1="21" x2="25" y2="21" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

              {/* Playful raised paw */}
              <circle cx="26" cy="27" r="2.5" fill="#020612" stroke="#ffffff" strokeWidth="1" />
            </svg>
          ) : (
            /* ======================================================== */
            /* SLEEPING RESTING CAT (Eyes curved closed, peaceful Zzz) */
            /* ======================================================== */
            <svg
              viewBox="0 0 36 36"
              className="w-8 h-8 select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cat Ears relaxed */}
              <polygon points="9,15 12,6 16,13" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="11,13 13,8 15,12" fill="#be185d" />
              <polygon points="27,15 24,6 20,13" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
              <polygon points="25,13 23,8 21,12" fill="#be185d" />

              {/* Cat Head */}
              <ellipse cx="18" cy="19" rx="11" ry="9" fill="#ffffff" />

              {/* Sleeping Curved Eyes (⌒  ⌒) */}
              <path d="M 12 18 C 13.5 16.5 15.5 16.5 17 18" stroke="#040a18" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 19 18 C 20.5 16.5 22.5 16.5 24 18" stroke="#040a18" strokeWidth="1.6" strokeLinecap="round" />

              {/* Cute Pink Nose */}
              <polygon points="18,21 17,22.5 19,22.5" fill="#be185d" />

              {/* Sleeping Smile */}
              <path d="M 16 23.5 C 17 24.5 18 24.5 18 23.5 C 18 24.5 19 24.5 20 23.5" stroke="#040a18" strokeWidth="1.2" strokeLinecap="round" />

              {/* Tucked Paws */}
              <ellipse cx="15" cy="27" rx="3.5" ry="2" fill="#ffffff" stroke="#040a18" strokeWidth="1" />
              <ellipse cx="21" cy="27" rx="3.5" ry="2" fill="#ffffff" stroke="#040a18" strokeWidth="1" />

              {/* Floating Zzz */}
              <text x="25" y="10" fill="#ffd23f" fontSize="8" fontFamily="monospace" fontWeight="bold">z</text>
              <text x="29" y="7" fill="#ffd23f" fontSize="10" fontFamily="monospace" fontWeight="bold">Z</text>
            </svg>
          )}
        </div>
      </button>

      {/* Helper Subtitle under Toggle */}
      <span className="mt-1.5 text-[10px] font-mono text-neutral-400 font-semibold tracking-wide">
        {enabled ? '⚡ Text effects active' : '💤 Text animations paused (Default)'}
      </span>
    </div>
  )
}

