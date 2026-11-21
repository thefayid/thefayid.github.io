import React from 'react'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { SceneBackground } from '@components/SceneBackground'
import { PortfolioTerminal } from '@components/PortfolioTerminal'
import { CustomCursor } from '@components/CustomCursor'

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * RootLayout — composes the persistent chrome:
 *   SceneBackground (z-0, fixed) → Header (z-60) → main → Footer → PortfolioTerminal (z-50) → CustomCursor (z-[9999])
 *
 * Content sits above the background via z-index: 1 on main.
 */
export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* Fixed environment layer — behind everything */}
      <SceneBackground />

      {/* Page shell — sits above background, below cursor */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      {/* Interactive portfolio terminal floating drawer */}
      <PortfolioTerminal />

      {/* Refined custom cursor & interaction feedback layer */}
      <CustomCursor />
    </>
  )
}
