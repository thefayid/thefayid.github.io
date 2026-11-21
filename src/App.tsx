import { useRef, useState, useCallback, useEffect } from 'react'
import { RootLayout } from '@layouts/RootLayout'
import { Hero, Work, About, Skills, Process, Experience, Labs, Credentials, Contact } from '@sections/index'
import {
  IntroOverlay,
  IntroSkipButton,
  type IntroOverlayHandle,
} from '@components/IntroOverlay'
import { useIntroSession } from '@hooks/useIntroSession'

export default function App() {
  const { shouldShow }  = useIntroSession()
  const [done, setDone] = useState(!shouldShow)
  const overlayRef      = useRef<IntroOverlayHandle>(null)

  const handleComplete  = useCallback(() => setDone(true), [])
  const handleSkip      = useCallback(() => overlayRef.current?.skip(), [])

  // Fail-safe: Guarantee intro curtain never blocks page content or causes a blank screen
  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => setDone(true), 2200)
    return () => clearTimeout(timer)
  }, [done])

  return (
    <>
      {/* ── Cinematic intro — rendered until it calls onComplete ── */}
      {!done && (
        <>
          <IntroOverlay ref={overlayRef} onComplete={handleComplete} />
          <IntroSkipButton show onSkip={handleSkip} />
        </>
      )}

      {/* ── Main site — always rendered; sits behind intro while active ── */}
      <RootLayout>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Process />
        <Experience />
        <Labs />
        <Credentials />
        <Contact />
      </RootLayout>
    </>
  )
}
