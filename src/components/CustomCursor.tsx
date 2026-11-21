import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

export type CursorMode = 'default' | 'pointer' | 'view' | 'text' | 'hidden'

export function CustomCursor() {
  const prefersReduced = useReducedMotion()
  const [isTouch, setIsTouch] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorMode, setCursorMode] = useState<CursorMode>('default')
  const [isPressed, setIsPressed] = useState(false)
  const [cursorLabel, setCursorLabel] = useState<string>('')

  // DOM Refs for direct 120fps/60fps transform manipulation (no React re-renders on move!)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  // Position and Physics Refs
  const mousePos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const targetScale = useRef(1)
  const currentScale = useRef(1)

  // Detect touch or pointer: coarse device on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkTouch = () => {
      const coarseMedia = window.matchMedia('(pointer: coarse)')
      const hasTouch = coarseMedia.matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouch(hasTouch)
    }

    checkTouch()
    const coarseMql = window.matchMedia('(pointer: coarse)')
    const handler = () => checkTouch()
    coarseMql.addEventListener('change', handler)

    return () => coarseMql.removeEventListener('change', handler)
  }, [])

  // Main Event Listeners & Animation Loop
  useEffect(() => {
    // Disable custom cursor if on touch or reduced motion
    if (isTouch || prefersReduced) {
      document.documentElement.classList.remove('custom-cursor-active')
      return
    }

    // Activate custom cursor class on html
    document.documentElement.classList.add('custom-cursor-active')

    // Animation Loop via requestAnimationFrame
    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Dot follows with tight responsiveness (0.9 lerp)
        dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.9
        dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.9

        // Trailing ring follows with luxurious inertia (0.18 lerp)
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18

        // Lerp scale
        currentScale.current += (targetScale.current - currentScale.current) * 0.22

        // Apply GPU-accelerated transforms
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${currentScale.current})`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    // Start RAF loop
    rafId.current = requestAnimationFrame(animate)

    // Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    // Mouse Enter / Leave Window
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Mouse Down / Up (Click feedback)
    const handleMouseDown = () => {
      setIsPressed(true)
      targetScale.current = 0.8
    }
    const handleMouseUp = () => {
      setIsPressed(false)
      targetScale.current = cursorMode === 'pointer' ? 1.45 : cursorMode === 'view' ? 2.1 : 1
    }

    // Interactive Target Detection via Event Delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // 1. Text input / contenteditable (Hide custom cursor to preserve native text caret)
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input, textarea, [contenteditable="true"]')
      ) {
        setCursorMode('text')
        targetScale.current = 0.5
        setCursorLabel('')
        return
      }

      // 2. Project card / dossier inspection triggers
      const viewTarget = target.closest('[data-cursor="view"], .project-card, [data-project-visual]')
      if (viewTarget) {
        setCursorMode('view')
        targetScale.current = 2.1
        setCursorLabel('VIEW')
        return
      }

      // 3. Interactive controls (links, buttons, nav items, tabs, sliders, chips)
      const interactiveTarget = target.closest(
        'a, button, [role="button"], [data-cursor="pointer"], .cursor-pointer, input[type="submit"], input[type="button"], select, summary'
      )
      if (interactiveTarget) {
        setCursorMode('pointer')
        targetScale.current = 1.45
        setCursorLabel('')
        return
      }

      // 4. Default state
      setCursorMode('default')
      targetScale.current = 1
      setCursorLabel('')
    }

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId.current)
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isTouch, prefersReduced, isVisible, cursorMode])

  // Don't render if touch device or prefers reduced motion
  if (isTouch || prefersReduced) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* ── Central Micro Dot (Tracks tightly) ── */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 will-change-transform ${
          cursorMode === 'text'
            ? 'w-1 h-3.5 bg-[var(--accent)] rounded-none opacity-80'
            : cursorMode === 'view'
            ? 'w-1.5 h-1.5 bg-[var(--accent)] opacity-0'
            : isPressed
            ? 'w-2.5 h-2.5 bg-[var(--accent)] shadow-md'
            : 'w-1.5 h-1.5 bg-[var(--accent)]'
        }`}
        style={{
          boxShadow:
            cursorMode !== 'text'
              ? '0 0 10px var(--glow-accent)'
              : 'none',
        }}
      />

      {/* ── Smooth Trailing Ring (Spring & Scale physics) ── */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-colors duration-200 will-change-transform ${
          cursorMode === 'text'
            ? 'w-6 h-6 border border-[var(--border)] opacity-0'
            : cursorMode === 'view'
            ? 'w-16 h-16 border border-[var(--accent)] backdrop-blur-[2px]'
            : cursorMode === 'pointer'
            ? 'w-10 h-10 border border-[var(--accent)] shadow-[0_0_15px_var(--glow-accent)]'
            : isPressed
            ? 'w-7 h-7 border-2 border-[var(--accent)] bg-[var(--accent-subtle)]'
            : 'w-8 h-8 border border-[var(--text-tertiary)] opacity-60'
        }`}
        style={{
          background:
            cursorMode === 'view'
              ? 'color-mix(in srgb, var(--accent) 25%, transparent)'
              : cursorMode === 'pointer'
              ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
              : 'transparent',
        }}
      >
        {/* Label for special view state */}
        <AnimatePresence>
          {cursorLabel && cursorMode === 'view' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[9px] font-bold text-white uppercase tracking-widest pointer-events-none select-none"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Reusable Magnetic Component Wrapper
 * Subtly attracts its children towards the cursor on hover for a tactile, magnetic feel.
 */
interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: MagneticProps) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setOffset({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
