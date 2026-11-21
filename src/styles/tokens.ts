/**
 * Design Tokens — single source of truth for all design decisions.
 * Everything flows from here: CSS variables, Tailwind theme, component logic.
 */

// ─── Color Primitives ───────────────────────────────────────────────────────

export const colorPrimitives = {
  // Neutrals
  neutral950: '#08090B',
  neutral900: '#101216',
  neutral800: '#15171B',
  neutral700: '#1E2026',
  neutral600: '#2A2D35',
  neutral500: '#3D4149',
  neutral400: '#5C6070',
  neutral300: '#92959D',
  neutral200: '#C4C6CC',
  neutral100: '#E5E6E8',
  neutral50:  '#F5F5F3',

  // Accent — electric blue
  blue600: '#1A56DB',
  blue500: '#2563EB',
  blue400: '#3B82F6',
  blue300: '#93C5FD',
  blue200: '#BFDBFE',
  blue100: '#DBEAFE',

  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error:   '#EF4444',
} as const

// ─── Semantic Tokens ─────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light'

export const semanticTokens = {
  dark: {
    // Backgrounds
    bgPrimary:    colorPrimitives.neutral950,
    bgSecondary:  colorPrimitives.neutral900,
    bgCard:       colorPrimitives.neutral800,
    bgElevated:   colorPrimitives.neutral700,
    bgSubtle:     colorPrimitives.neutral600,

    // Text
    textPrimary:   '#F5F5F5',
    textSecondary: colorPrimitives.neutral300,
    textTertiary:  colorPrimitives.neutral400,
    textDisabled:  colorPrimitives.neutral500,

    // Accent
    accentPrimary: colorPrimitives.blue400,
    accentHover:   colorPrimitives.blue300,
    accentSubtle:  'rgba(59,130,246,0.10)',
    accentBorder:  'rgba(59,130,246,0.30)',

    // Borders
    borderDefault: 'rgba(255,255,255,0.09)',
    borderSubtle:  'rgba(255,255,255,0.05)',
    borderStrong:  'rgba(255,255,255,0.18)',

    // Shadows
    shadowSm:   '0 1px 3px rgba(0,0,0,0.5)',
    shadowMd:   '0 4px 16px rgba(0,0,0,0.6)',
    shadowLg:   '0 16px 48px rgba(0,0,0,0.7)',
    glowAccent: '0 0 24px rgba(59,130,246,0.18)',
    glowSubtle: '0 0 48px rgba(59,130,246,0.08)',

    // Misc
    success:    colorPrimitives.success,
    overlay:    'rgba(8,9,11,0.80)',
  },
  light: {
    bgPrimary:    colorPrimitives.neutral50,
    bgSecondary:  '#ECECE9',
    bgCard:       '#FFFFFF',
    bgElevated:   '#F0F0ED',
    bgSubtle:     '#E4E4E0',

    textPrimary:   '#151515',
    textSecondary: '#6F7075',
    textTertiary:  '#9A9BA0',
    textDisabled:  '#B8B9BD',

    accentPrimary: colorPrimitives.blue600,
    accentHover:   colorPrimitives.blue500,
    accentSubtle:  'rgba(37,99,235,0.08)',
    accentBorder:  'rgba(37,99,235,0.25)',

    borderDefault: 'rgba(0,0,0,0.09)',
    borderSubtle:  'rgba(0,0,0,0.05)',
    borderStrong:  'rgba(0,0,0,0.18)',

    shadowSm:   '0 1px 3px rgba(0,0,0,0.08)',
    shadowMd:   '0 4px 16px rgba(0,0,0,0.10)',
    shadowLg:   '0 16px 48px rgba(0,0,0,0.14)',
    glowAccent: '0 0 24px rgba(37,99,235,0.14)',
    glowSubtle: '0 0 48px rgba(37,99,235,0.06)',

    success:    colorPrimitives.success,
    overlay:    'rgba(245,245,243,0.80)',
  },
} as const

// ─── Spacing Scale ────────────────────────────────────────────────────────────

export const spacing = {
  px:  '1px',
  0:   '0',
  0.5: '0.125rem',   //  2px
  1:   '0.25rem',    //  4px
  1.5: '0.375rem',   //  6px
  2:   '0.5rem',     //  8px
  3:   '0.75rem',    // 12px
  4:   '1rem',       // 16px
  5:   '1.25rem',    // 20px
  6:   '1.5rem',     // 24px
  8:   '2rem',       // 32px
  10:  '2.5rem',     // 40px
  12:  '3rem',       // 48px
  16:  '4rem',       // 64px
  20:  '5rem',       // 80px
  24:  '6rem',       // 96px
  32:  '8rem',       // 128px
  40:  '10rem',      // 160px
  section: 'clamp(5rem, 10vw, 10rem)',
} as const

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  none: '0',
  xs:   '0.25rem',   //  4px
  sm:   '0.5rem',    //  8px
  md:   '0.75rem',   // 12px
  lg:   '1rem',      // 16px
  xl:   '1.5rem',    // 24px
  '2xl':'2rem',      // 32px
  full: '9999px',
} as const

// ─── Typography ────────────────────────────────────────────────────────────

export const typography = {
  fontDisplay: "'Manrope Variable', 'Helvetica Neue', Arial, sans-serif",
  fontBody:    "'Manrope Variable', 'Helvetica Neue', Arial, sans-serif",
  fontMono:    "'Geist Mono Variable', 'JetBrains Mono', 'Fira Code', monospace",

  // Fluid scale via clamp
  sizeDisplayXl: 'clamp(3.5rem, 9vw, 10rem)',
  sizeDisplayLg: 'clamp(2.75rem, 6.5vw, 7rem)',
  sizeDisplayMd: 'clamp(2rem, 4vw, 4.5rem)',
  sizeDisplaySm: 'clamp(1.5rem, 2.5vw, 2.5rem)',
  sizeXl:        '1.25rem',
  sizeLg:        '1.125rem',
  sizeMd:        '1rem',
  sizeSm:        '0.875rem',
  sizeXs:        '0.75rem',
  sizeLabel:     '0.6875rem',

  weightLight:    '300',
  weightRegular:  '400',
  weightMedium:   '500',
  weightSemibold: '600',
  weightBold:     '700',
  weightExtrabold:'800',

  lineHeightTight:   '0.95',
  lineHeightSnug:    '1.1',
  lineHeightNormal:  '1.5',
  lineHeightRelaxed: '1.65',

  trackingTightest: '-0.04em',
  trackingTight:    '-0.025em',
  trackingNormal:   '0em',
  trackingWide:     '0.06em',
  trackingWidest:   '0.14em',
} as const

// ─── Z-index ────────────────────────────────────────────────────────────────

export const zIndex = {
  base:    0,
  raised:  10,
  overlay: 20,
  drawer:  30,
  modal:   40,
  toast:   50,
  header:  60,
  cursor:  100,
} as const

// ─── Transitions ─────────────────────────────────────────────────────────────

export const transitions = {
  fast:    '150ms',
  base:    '250ms',
  slow:    '400ms',
  verySlow:'700ms',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInExpo:  'cubic-bezier(0.7, 0, 0.84, 0)',
  easeInOut:   'cubic-bezier(0.87, 0, 0.13, 1)',
  spring:      'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const breakpoints = {
  xs:  '375px',
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
} as const
