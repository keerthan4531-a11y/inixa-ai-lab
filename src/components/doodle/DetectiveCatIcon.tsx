import React from 'react'

interface DetectiveCatIconProps {
  size?: number
  className?: string
  animated?: boolean
}

/**
 * Hand-drawn Doodle Cat holding a Bhoothakannadi (Magnifying Glass).
 * Designed for the Search Box and Command Palette.
 * The curious cat peers through a magnifying glass with authentic ink strokes.
 */
export const DetectiveCatIcon: React.FC<DetectiveCatIconProps> = ({
  size = 42,
  className = '',
  animated = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className} ${
        animated ? 'group-hover:scale-110 transition-transform duration-200' : ''
      }`}
      style={{ width: size, height: size }}
      title="Detective Cat searching..."
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Cat Left Ear */}
        <polygon
          points="8,18 12,5 18,14"
          fill="#040a18"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <polygon points="10,16 13,8 17,13" fill="#be185d" />

        {/* Cat Right Ear */}
        <polygon
          points="32,18 28,5 22,14"
          fill="#040a18"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <polygon points="30,16 27,8 23,13" fill="#be185d" />

        {/* Cat Head */}
        <ellipse
          cx="20"
          cy="22"
          rx="14"
          ry="11"
          fill="#040a18"
          stroke="#ffffff"
          strokeWidth="2.4"
        />

        {/* Cat Left Eye (Normal curious eye) */}
        <ellipse cx="14" cy="20" rx="3" ry="3.5" fill="#ffffff" />
        <circle cx="14.5" cy="20" r="1.8" fill="#00ff87" />
        <circle cx="15" cy="19.2" r="0.8" fill="#ffffff" />

        {/* Cat Nose & Mouth */}
        <polygon points="19,24 17.5,25.8 20.5,25.8" fill="#be185d" />
        <path
          d="M 16.5 27 C 17.8 28 19 28 19 27 C 19 28 20.2 28 21.5 27"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Whiskers Left */}
        <line x1="4" y1="22" x2="10" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="25" x2="10" y2="25" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

        {/* ======================================================= */}
        {/* BHOOTHAKANNADI (Magnifying Glass) held over Right Eye!  */}
        {/* ======================================================= */}

        {/* Magnifying Glass Lens Outer Rim (Neon Mint + Thick White Ink) */}
        <circle
          cx="27"
          cy="20"
          r="9.5"
          fill="#06122c"
          fillOpacity="0.85"
          stroke="#00ff87"
          strokeWidth="2.6"
        />
        {/* Lens Inner Glass Reflection Tint */}
        <circle
          cx="27"
          cy="20"
          r="8"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="8 6"
          fill="#00ff87"
          fillOpacity="0.18"
        />

        {/* Magnified Right Eye (Enlarged peering through the Bhoothakannadi!) */}
        <ellipse cx="27" cy="20" rx="4.5" ry="5.2" fill="#ffffff" />
        <circle cx="27.8" cy="20" r="2.8" fill="#00ff87" />
        <circle cx="28.5" cy="18.8" r="1.3" fill="#ffffff" />
        <circle cx="26.8" cy="21.5" r="0.6" fill="#020612" />

        {/* Specular White Glare on Magnifying Glass Rim */}
        <path
          d="M 21 15 C 23 13 27 12 30 13"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Magnifying Glass Sturdy Handle held at 45 degree angle */}
        <path
          d="M 34 27 L 44 38"
          stroke="#ffd23f"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 34 27 L 44 38"
          stroke="#040a18"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Cat Paw clutching the handle */}
        <ellipse
          cx="34"
          cy="27"
          rx="3.5"
          ry="3"
          transform="rotate(-20 34 27)"
          fill="#040a18"
          stroke="#ffffff"
          strokeWidth="1.8"
        />
        <line x1="33" y1="26" x2="35" y2="28" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

        {/* Little Sparkle on the lens */}
        <path
          d="M 33 13 L 34 10 L 35 13 L 38 14 L 35 15 L 34 18 L 33 15 L 30 14 Z"
          fill="#ffd23f"
        />
      </svg>
    </div>
  )
}

