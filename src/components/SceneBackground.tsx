import { useRef } from 'react'
import { useThemeContext } from '@contexts/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useAmbientCanvas } from '@hooks/useAmbientCanvas'

/**
 * SceneBackground
 *
 * A fixed, full-viewport background layer composed of:
 *   1. Base fill   — solid bg-primary (from CSS token, theme-aware)
 *   2. Canvas      — slow-drifting ambient orbs (3 orbs, Lissajous paths)
 *   3. SVG grid    — razor-thin perspective grid lines (static, no JS)
 *   4. Noise       — SVG feTurbulence grain via CSS mask (fixed, no repaints)
 *   5. Vignette    — radial darkening toward screen edges
 *
 * All animation runs on the compositor thread (canvas uses only fillStyle/arc).
 * Reduced-motion: canvas is drawn once (static). SVG and CSS layers always static.
 * Light mode: orb opacity and grid opacity both drop ~40%; background uses warm white.
 */
export function SceneBackground() {
  const { isDark } = useThemeContext()
  const reduced    = useReducedMotion()
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useAmbientCanvas(canvasRef, isDark, reduced)

  return (
    <div
      aria-hidden="true"
      className="scene-bg"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Background fill transitions with theme
        background: 'var(--bg-primary)',
        transition: 'background 400ms cubic-bezier(0.87,0,0.13,1)',
      }}
    >
      {/* ── Layer 1: Ambient orbs (canvas) ─────────────────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* ── Layer 2: Perspective grid ───────────────────────────────── */}
      <GridLines isDark={isDark} />

      {/* ── Layer 3: Film grain / noise ─────────────────────────────── */}
      <div
        className="noise-texture"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.028 : 0.018,
          mixBlendMode: 'overlay',
          transition: 'opacity 400ms',
        }}
      />

      {/* ── Layer 4: Vignette ───────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(5,6,8,0.65) 100%)'
            : 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(230,230,228,0.55) 100%)',
          transition: 'background 400ms cubic-bezier(0.87,0,0.13,1)',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   GridLines — SVG perspective grid. Pure CSS, no animation.
   Two sets of lines: horizontal (subtle) + a vanishing-point vertical fan.
───────────────────────────────────────────────────────────────────────────── */
function GridLines({ isDark }: { isDark: boolean }) {
  const lineColor = isDark
    ? 'rgba(255,255,255,0.028)'
    : 'rgba(0,0,0,0.028)'

  // Vertical vanishing lines fanning from bottom-center
  const vanishX = 50       // percent
  const vanishY = 108      // percent (below viewport)
  const fanCount = 9
  const spread   = 110     // how wide the fan opens at top (degrees worth of spread in %)

  const fanLines = Array.from({ length: fanCount }, (_, i) => {
    const t  = i / (fanCount - 1)           // 0..1
    const topX = -spread / 2 + t * spread   // top x in %
    return { topX, bottomX: vanishX, topY: -5, bottomY: vanishY }
  })

  // Horizontal lines (evenly spaced, progressively more opaque toward top — depth cue)
  const hLines = [0.18, 0.32, 0.46, 0.60, 0.74, 0.88].map((y, i, arr) => ({
    y,
    opacity: 0.3 + (i / arr.length) * 0.7,
  }))

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Vertical fade mask: fully visible at top, invisible at ~65% */}
        <linearGradient id="bgGridFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.9" />
          <stop offset="55%"  stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="bgGridMask">
          <rect x="0" y="0" width="100" height="100" fill="url(#bgGridFade)" />
        </mask>
      </defs>

      <g mask="url(#bgGridMask)">
        {/* Vanishing fan lines */}
        {fanLines.map((l, i) => (
          <line
            key={`fan-${i}`}
            x1={`${l.topX}%`}    y1={`${l.topY}%`}
            x2={`${l.bottomX}%`} y2={`${l.bottomY}%`}
            stroke={lineColor}
            strokeWidth="0.15"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Horizontal depth lines */}
        {hLines.map((l, i) => (
          <line
            key={`h-${i}`}
            x1="0%"  y1={`${l.y * 100}%`}
            x2="100%" y2={`${l.y * 100}%`}
            stroke={lineColor}
            strokeWidth="0.1"
            strokeOpacity={l.opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  )
}
