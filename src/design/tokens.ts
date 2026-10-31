/**
 * INIXA AI LABS — Design System Tokens
 * Master design tokens defining the Liquid Glass aesthetic, spatial hierarchy,
 * optical blurs, specular highlights, and motion physics.
 */

export const TOKENS = {
  colors: {
    // Deep Base Backgrounds
    bgVoid: '#020408',
    bgDark: '#060a12',
    bgSurface: '#0b1220',
    bgSurfaceElevated: '#101a2e',
    
    // INIXA Brand Gradients & Accents
    cyan: '#00f2fe',
    blue: '#3b82f6',
    indigo: '#6366f1',
    purple: '#8b5cf6',
    violet: '#a855f7',
    amber: '#f59e0b',
    emerald: '#10b981',
    rose: '#f43f5e',

    // Glass Translucency Levels
    glassBase: 'rgba(10, 16, 28, 0.65)',
    glassElevated: 'rgba(14, 22, 38, 0.78)',
    glassUltra: 'rgba(20, 32, 54, 0.88)',
    glassSubtle: 'rgba(255, 255, 255, 0.04)',
    glassHighlight: 'rgba(255, 255, 255, 0.12)',
    glassGleam: 'rgba(255, 255, 255, 0.28)',

    // Borders & Edge Rims
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.15)',
    borderStrong: 'rgba(255, 255, 255, 0.25)',
    borderGlow: 'rgba(0, 242, 254, 0.35)',

    // Text & Foregrounds
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.78)',
    textMuted: 'rgba(255, 255, 255, 0.52)',
    textDim: 'rgba(255, 255, 255, 0.32)',
  },

  blur: {
    none: '0px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '36px',
    xl: '48px',
    ultra: '64px',
  },

  saturation: {
    default: '180%',
    high: '200%',
    ultra: '220%',
  },

  shadows: {
    glassSm: '0 4px 16px 0 rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
    glassMd: '0 12px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.20)',
    glassLg: '0 24px 64px 0 rgba(0, 0, 0, 0.55), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.28)',
    neonCyan: '0 0 32px -4px rgba(0, 242, 254, 0.35)',
    neonBlue: '0 0 32px -4px rgba(59, 130, 246, 0.35)',
    neonPurple: '0 0 32px -4px rgba(139, 92, 246, 0.35)',
    neonAmber: '0 0 32px -4px rgba(245, 158, 11, 0.35)',
  },

  typography: {
    fontDisplay: '"Google Sans", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontBody: '"Google Sans Text", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: '"JetBrains Mono", "Fira Code", monospace',
    
    scale: {
      hero: 'clamp(3rem, 7vw, 6.5rem)',
      display1: 'clamp(2.5rem, 5vw, 4.5rem)',
      display2: 'clamp(2rem, 3.5vw, 3.25rem)',
      h1: 'clamp(1.75rem, 2.5vw, 2.5rem)',
      h2: 'clamp(1.35rem, 2vw, 1.85rem)',
      h3: '1.25rem',
      bodyLg: '1.125rem',
      body: '1rem',
      caption: '0.875rem',
      micro: '0.6875rem',
    },

    tracking: {
      tighter: '-0.04em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.04em',
      wider: '0.08em',
      widest: '0.12em',
    },
  },

  motion: {
    // Easing functions
    easeSmooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
    easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
    easeFluid: 'cubic-bezier(0.25, 1, 0.5, 1)',

    // Durations
    instant: '150ms',
    fast: '250ms',
    normal: '450ms',
    slow: '750ms',
    deliberate: '1100ms',

    // Framer Motion Spring Presets
    springSnappy: { type: 'spring', stiffness: 350, damping: 25 },
    springGentle: { type: 'spring', stiffness: 200, damping: 22 },
    springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
    springFloat: { type: 'spring', stiffness: 80, damping: 18 },
  },

  radius: {
    sm: '12px',
    md: '18px',
    lg: '24px',
    xl: '32px',
    pill: '9999px',
  },
} as const

export type DesignTokens = typeof TOKENS
