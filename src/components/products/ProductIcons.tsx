import React from 'react'

interface ProductIconProps {
  productId: string
  color: string
}

export const ProductIcon: React.FC<ProductIconProps> = ({ productId, color }) => {
  switch (productId) {
    case 'beatbox-pro':
      // Sound wave equalizer bars (like screenshot)
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 12px ${color}bb)` }}
        >
          <rect x="3" y="16" width="4.5" height="12" rx="2.25" fill={color} fillOpacity="0.7" />
          <rect x="10.5" y="10" width="4.5" height="24" rx="2.25" fill={color} />
          <rect x="18" y="4" width="4.5" height="34" rx="2.25" fill={color} />
          <rect x="25.5" y="11" width="4.5" height="21" rx="2.25" fill={color} />
          <rect x="33" y="7" width="4.5" height="28" rx="2.25" fill={color} />
          <rect x="40.5" y="15" width="4.5" height="14" rx="2.25" fill={color} fillOpacity="0.7" />
        </svg>
      )

    case 'beatbox-lite':
      // Cyan sound frequency wave bars
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 12px ${color}bb)` }}
        >
          <rect x="4" y="17" width="4" height="10" rx="2" fill={color} fillOpacity="0.65" />
          <rect x="11.5" y="11" width="4" height="21" rx="2" fill={color} />
          <rect x="19" y="5" width="4" height="32" rx="2" fill={color} />
          <rect x="26.5" y="13" width="4" height="17" rx="2" fill={color} />
          <rect x="34" y="9" width="4" height="25" rx="2" fill={color} />
          <rect x="41.5" y="16" width="4" height="12" rx="2" fill={color} fillOpacity="0.65" />
        </svg>
      )

    case 'beatbox-ultra':
      // 3D glowing music note ♫ with beam and sphere heads
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 14px ${color}cc)` }}
        >
          <defs>
            <linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor={color} />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path
            d="M16 28C16 31.3 13.3 34 10 34C6.7 34 4 31.3 4 28C4 24.7 6.7 22 10 22C11.6 22 13.1 22.6 14.2 23.6L16 23.3V9L38 4V22"
            stroke="url(#noteGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 25C38 28.3 35.3 31 32 31C28.7 31 26 28.3 26 25C26 21.7 28.7 19 32 19C33.6 19 35.1 19.6 36.2 20.6L38 20.3V4"
            stroke="url(#noteGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="10" cy="28" rx="5.5" ry="4" fill="url(#noteGrad)" />
          <ellipse cx="32" cy="25" rx="5.5" ry="4" fill="url(#noteGrad)" />
          <path d="M16 11L38 6V11L16 16V11Z" fill="url(#noteGrad)" />
        </svg>
      )

    case 'mytube':
      // Glowing rounded video monitor with play triangle
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 14px ${color}cc)` }}
        >
          <rect
            x="4"
            y="7"
            width="38"
            height="28"
            rx="9"
            stroke={color}
            strokeWidth="3"
            fill={`${color}1a`}
          />
          <path d="M20 15L29.5 21L20 27V15Z" fill={color} />
        </svg>
      )

    case 'lumina':
      // Glowing cyber wireframe globe with security shield
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 14px ${color}cc)` }}
        >
          <circle cx="23" cy="21" r="15" stroke={color} strokeWidth="2.4" fill={`${color}12`} />
          <ellipse cx="23" cy="21" rx="7.5" ry="15" stroke={color} strokeWidth="2" />
          <line x1="8" y1="21" x2="38" y2="21" stroke={color} strokeWidth="2" />
          <line
            x1="11"
            y1="13.5"
            x2="35"
            y2="13.5"
            stroke={color}
            strokeWidth="1.6"
            strokeOpacity="0.85"
          />
          <line
            x1="11"
            y1="28.5"
            x2="35"
            y2="28.5"
            stroke={color}
            strokeWidth="1.6"
            strokeOpacity="0.85"
          />
        </svg>
      )

    case 'liquid-stream':
      // Glowing liquid stream / jellyfish glass droplet
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 15px ${color}cc)` }}
        >
          <path
            d="M23 4C14 13 8 20 8 27C8 35.284 14.716 42 23 42C31.284 42 38 35.284 38 27C38 20 32 13 23 4Z"
            stroke={color}
            strokeWidth="2.8"
            fill={`${color}1a`}
          />
          <path
            d="M17.5 23C17.5 20.5 20.5 17.5 23 17.5C25.5 17.5 28.5 20.5 28.5 23C28.5 26.5 25.5 30 23 33C20.5 30 17.5 26.5 17.5 23Z"
            fill={color}
          />
        </svg>
      )

    case 'clipster':
      // Glowing media extraction scissors and beam
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 14px ${color}cc)` }}
        >
          <circle cx="12" cy="13" r="5.5" stroke={color} strokeWidth="2.4" />
          <circle cx="12" cy="29" r="5.5" stroke={color} strokeWidth="2.4" />
          <path d="M16 16.5L34 32" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M16 25.5L34 10" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="25" cy="21" r="3" fill={color} />
        </svg>
      )

    case 'wikipedia-app':
      // Open AI knowledge encyclopedia book
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 14px ${color}cc)` }}
        >
          <path
            d="M6 10C11 8 17 8 23 11C29 8 35 8 40 10V32C35 30 29 30 23 33C17 30 11 30 6 32V10Z"
            stroke={color}
            strokeWidth="2.6"
            fill={`${color}15`}
          />
          <line x1="23" y1="11" x2="23" y2="33" stroke={color} strokeWidth="2.4" />
          <path d="M11 17H18M11 23H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M28 17H35M28 23H35" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'inixa-ai':
      // Neural brain spark / hexagonal AI matrix core
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 15px ${color}cc)` }}
        >
          <path
            d="M23 5L36 12.5V28.5L23 36L10 28.5V12.5L23 5Z"
            stroke={color}
            strokeWidth="2.6"
            fill={`${color}1a`}
          />
          <circle cx="23" cy="20.5" r="5" fill={color} />
          <line x1="23" y1="5" x2="23" y2="15.5" stroke={color} strokeWidth="2.2" />
          <line x1="23" y1="25.5" x2="23" y2="36" stroke={color} strokeWidth="2.2" />
          <line x1="10" y1="12.5" x2="19" y2="18" stroke={color} strokeWidth="2.2" />
          <line x1="27" y1="23" x2="36" y2="28.5" stroke={color} strokeWidth="2.2" />
        </svg>
      )

    default:
      return (
        <svg
          width="46"
          height="42"
          viewBox="0 0 46 42"
          fill="none"
          className="shrink-0"
          style={{ filter: `drop-shadow(0 0 12px ${color}aa)` }}
        >
          <rect
            x="8"
            y="6"
            width="30"
            height="30"
            rx="8"
            stroke={color}
            strokeWidth="2.5"
            fill={`${color}15`}
          />
          <circle cx="23" cy="21" r="5" fill={color} />
        </svg>
      )
  }
}

