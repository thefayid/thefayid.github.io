import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@data/portfolio'
import { useIntroSession } from '@hooks/useIntroSession'

/* ─────────────────────────────────────────────────────────────────────────────
   TIMING  (seconds)
   Full sequence:
     0.15s  → accent line slides in
     0.55s  → "FAYID" letters rise + un-blur, one by one
     1.00s  → role label fades in
     1.65s  → auto-exit starts (curtain lifts)
     +0.72s → curtain fully gone → onComplete fires
   Max wall-clock: ~2.37s. With skip: as low as ~0.72s.
───────────────────────────────────────────────────────────────────────────── */
const T = {
  lineEnter:    0.15,
  nameEnter:    0.52,
  roleEnter:    1.00,
  holdAfter:    1.65,
  curtainSpeed: 0.68,
  skipFade:     0.22,
} as const

const EXPO_OUT = [0.16, 1,    0.3,  1] as const
const EXPO_IN  = [0.7,  0,    0.84, 0] as const

/* ─────────────────────────────────────────────────────────────────────────────
   Public handle — exposed via ref from App.tsx
───────────────────────────────────────────────────────────────────────────── */
export interface IntroOverlayHandle {
  skip: () => void
}

interface IntroOverlayProps {
  onComplete: () => void
}

/* ─────────────────────────────────────────────────────────────────────────────
   IntroOverlay
───────────────────────────────────────────────────────────────────────────── */
export const IntroOverlay = forwardRef<IntroOverlayHandle, IntroOverlayProps>(
  function IntroOverlay({ onComplete }, ref) {
    const { shouldShow, markDone } = useIntroSession()
    const [mounted, setMounted]   = useState(shouldShow)
    const [phase, setPhase]       = useState<'scene' | 'curtain'>('scene')
    const autoExitRef             = useRef<ReturnType<typeof setTimeout> | null>(null)
    const exitingRef              = useRef(false)

    // ── Trigger exit (idempotent) ─────────────────────────────────────────
    const triggerExit = useCallback(() => {
      if (exitingRef.current) return
      exitingRef.current = true
      if (autoExitRef.current) clearTimeout(autoExitRef.current)
      markDone()
      setPhase('curtain')
    }, [markDone])

    // ── Expose skip() imperatively ────────────────────────────────────────
    useImperativeHandle(ref, () => ({ skip: triggerExit }), [triggerExit])

    // ── Auto-exit timer ───────────────────────────────────────────────────
    useEffect(() => {
      if (!mounted) return
      autoExitRef.current = setTimeout(triggerExit, T.holdAfter * 1000)
      return () => { if (autoExitRef.current) clearTimeout(autoExitRef.current) }
    // triggerExit is stable (useCallback with no deps that change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted])

    // ── Keyboard skip: Escape or Space ────────────────────────────────────
    useEffect(() => {
      if (!mounted) return
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); triggerExit() }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }, [mounted, triggerExit])

    // ── Lock scroll ───────────────────────────────────────────────────────
    useEffect(() => {
      if (!mounted) return
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }, [mounted])

    if (!mounted) return null

    return (
      <>
        {/* ── Scene: static black + content ───────────────────────────── */}
        <AnimatePresence>
          {phase === 'scene' && (
            <motion.div
              key="intro-scene"
              className="intro-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.01 } }}
              role="region"
              aria-label="Portfolio intro animation"
            >
              {/* Accent line */}
              <motion.div
                className="intro-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: T.lineEnter, duration: 0.52, ease: EXPO_OUT }}
                style={{ transformOrigin: 'left center' }}
              />

              {/* FAYID — per-character reveal */}
              <div className="intro-name-wrap" aria-label="Fayid">
                {'FAYID'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="intro-name-char"
                    initial={{ opacity: 0, y: '105%', filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: '0%',   filter: 'blur(0px)' }}
                    transition={{
                      delay:    T.nameEnter + i * 0.07,
                      duration: 0.72,
                      ease:     EXPO_OUT,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Role label */}
              <motion.p
                className="intro-role"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: T.roleEnter, duration: 0.55, ease: EXPO_OUT }}
              >
                {siteConfig.role}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Curtain: two panels that fly apart ──────────────────────── */}
        <AnimatePresence onExitComplete={() => setMounted(false)}>
          {phase === 'curtain' && (
            <>
              <motion.div
                key="curtain-top"
                className="intro-curtain intro-curtain-top"
                initial={{ y: 0 }}
                animate={{ y: '-101%' }}
                exit={{}}
                transition={{ duration: T.curtainSpeed, ease: EXPO_IN }}
                onAnimationComplete={onComplete}
              />
              <motion.div
                key="curtain-bottom"
                className="intro-curtain intro-curtain-bottom"
                initial={{ y: 0 }}
                animate={{ y: '101%' }}
                exit={{}}
                transition={{ duration: T.curtainSpeed, ease: EXPO_IN }}
              />
            </>
          )}
        </AnimatePresence>
      </>
    )
  }
)

/* ─────────────────────────────────────────────────────────────────────────────
   IntroSkipButton — rendered by App, sits at z=1000 above overlay
───────────────────────────────────────────────────────────────────────────── */
interface SkipProps {
  show:   boolean
  onSkip: () => void
}

export function IntroSkipButton({ show, onSkip }: SkipProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={onSkip}
          className="intro-skip"
          aria-label="Skip intro animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ delay: T.skipFade, duration: 0.4 }}
        >
          Skip
        </motion.button>
      )}
    </AnimatePresence>
  )
}
