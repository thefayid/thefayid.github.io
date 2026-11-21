/**
 * useIntroSession
 *
 * Returns whether the intro should be shown this session.
 * Rules:
 *   - sessionStorage key 'fayid-intro-done' controls first-visit logic.
 *   - prefers-reduced-motion → intro skipped entirely (accessibility).
 *   - If sessionStorage is unavailable (e.g. private mode quota), intro is skipped.
 *
 * Calling `markDone()` persists the flag and re-evaluates.
 */
export function useIntroSession(): { shouldShow: boolean; markDone: () => void } {
  // Synchronous read — no useState needed, computed once at module evaluation
  // during the first render.
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true

  if (reduced) {
    return { shouldShow: false, markDone: () => {} }
  }

  let alreadySeen = false
  try {
    alreadySeen = sessionStorage.getItem('fayid-intro-done') === '1'
  } catch {
    // sessionStorage unavailable → skip gracefully
    return { shouldShow: false, markDone: () => {} }
  }

  const markDone = () => {
    try { sessionStorage.setItem('fayid-intro-done', '1') } catch { /* noop */ }
  }

  return { shouldShow: !alreadySeen, markDone }
}
