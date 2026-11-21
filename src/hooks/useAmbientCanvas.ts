import { useEffect, useRef } from 'react'

/**
 * Orb definition — each orb is a soft radial light blob drifting slowly.
 * All math is kept as simple circular paths so the browser only does
 * trig + composite — no layout, no paint.
 */
interface Orb {
  x: number       // current x (0–1 of canvas width)
  y: number       // current y (0–1 of canvas height)
  r: number       // radius in px
  opacity: number
  // Lissajous-style drift params
  ax: number; ay: number   // amplitude (0–1 fraction of canvas)
  fx: number; fy: number   // frequency (radians/ms)
  px: number; py: number   // phase offset
  ox: number; oy: number   // origin (centre of drift path)
  color: { r: number; g: number; b: number }
}

const TAU = Math.PI * 2

function makeOrbs(w: number, h: number, isDark: boolean): Orb[] {
  // Dark: electric blue family. Light: soft indigo/lavender.
  const palette = isDark
    ? [
        { r: 59,  g: 130, b: 246 },  // blue-400
        { r: 99,  g: 102, b: 241 },  // indigo-500
        { r: 14,  g: 165, b: 233 },  // sky-500
      ]
    : [
        { r: 99,  g: 102, b: 241 },  // indigo
        { r: 148, g: 163, b: 184 },  // slate-400
        { r: 125, g: 211, b: 252 },  // sky-300
      ]

  return [
    // Large ambient orb — upper right
    {
      ox: 0.75, oy: 0.18,
      ax: 0.08, ay: 0.06,
      fx: TAU / 28000, fy: TAU / 22000,
      px: 0, py: Math.PI * 0.6,
      x: 0, y: 0,
      r: Math.min(w, h) * 0.55,
      opacity: isDark ? 0.045 : 0.035,
      color: palette[0]!,
    },
    // Mid orb — left side
    {
      ox: 0.18, oy: 0.55,
      ax: 0.07, ay: 0.08,
      fx: TAU / 34000, fy: TAU / 26000,
      px: Math.PI * 0.4, py: 0,
      x: 0, y: 0,
      r: Math.min(w, h) * 0.38,
      opacity: isDark ? 0.030 : 0.022,
      color: palette[1]!,
    },
    // Small accent — lower center
    {
      ox: 0.55, oy: 0.82,
      ax: 0.09, ay: 0.05,
      fx: TAU / 20000, fy: TAU / 31000,
      px: Math.PI, py: Math.PI * 0.3,
      x: 0, y: 0,
      r: Math.min(w, h) * 0.26,
      opacity: isDark ? 0.028 : 0.018,
      color: palette[2]!,
    },
  ]
}

export function useAmbientCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isDark: boolean,
  disabled: boolean,
) {
  const rafRef   = useRef<number | null>(null)
  const orbsRef  = useRef<Orb[]>([])
  const startRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Sizing ──────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) // cap DPR for perf
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      orbsRef.current = makeOrbs(canvas.offsetWidth, canvas.offsetHeight, isDark)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Draw loop ────────────────────────────────────────────────────────────
    const draw = (now: number) => {
      if (!startRef.current) startRef.current = now
      const t = now - startRef.current

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      // Calculate scroll progress (0..1) for subtle background atmospheric changes
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / docH))
      const scrollShiftY = (scrollProgress - 0.5) * 0.12 * H

      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < orbsRef.current.length; i++) {
        const orb = orbsRef.current[i]
        if (!orb) continue

        // Lissajous position + subtle continuous scroll atmosphere shift
        const cx = (orb.ox + Math.sin(orb.fx * t + orb.px) * orb.ax) * W
        const cy = (orb.oy + Math.cos(orb.fy * t + orb.py) * orb.ay) * H + scrollShiftY

        // Dynamic atmospheric hue modulation based on section depth
        let { r, g, b } = orb.color
        if (isDark) {
          if (scrollProgress > 0.3 && scrollProgress <= 0.65) {
            // Mid-sections (Skills & Projects): deeper contrast cyan/sapphire
            r = Math.round(r * 0.8 + 6 * 0.2)
            g = Math.round(g * 0.85 + 182 * 0.15)
            b = Math.round(b * 0.9 + 212 * 0.1)
          } else if (scrollProgress > 0.65) {
            // Lower sections (Experience & Contact): subtle indigo defense hue
            r = Math.round(r * 0.85 + 99 * 0.15)
            g = Math.round(g * 0.85 + 102 * 0.15)
            b = Math.round(b * 0.9 + 241 * 0.1)
          }
        }

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        grad.addColorStop(0,   `rgba(${r},${g},${b},${orb.opacity})`)
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${orb.opacity * 0.4})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, TAU)
        ctx.fillStyle = grad
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    if (!disabled) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      // Static single frame for reduced-motion
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      for (const orb of orbsRef.current) {
        const cx = orb.ox * W
        const cy = orb.oy * H
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r)
        const { r, g, b } = orb.color
        grad.addColorStop(0,   `rgba(${r},${g},${b},${orb.opacity})`)
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${orb.opacity * 0.3})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, orb.r, 0, TAU)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    return () => {
      ro.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // Re-run when theme or motion preference changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark, disabled])
}
