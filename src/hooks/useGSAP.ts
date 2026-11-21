import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAP – thin wrapper that registers a GSAP context scoped to a container ref,
 * cleans up on unmount, and respects prefers-reduced-motion.
 */
export function useGSAP<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      callback(ctx)
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
