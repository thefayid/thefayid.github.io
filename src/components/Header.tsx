import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, FileText, ArrowUpRight } from 'lucide-react'
import { navLinks, siteConfig } from '@data/portfolio'
import { useScrolled } from '@hooks/useScrolled'
import { useActiveSection } from '@hooks/useActiveSection'
import { useThemeContext } from '@contexts/ThemeContext'
import { EASE_OUT_EXPO } from '@utils/animations'
import { cn } from '@utils/cn'

export function Header() {
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useThemeContext()
  const { activeSection, scrollToSection } = useActiveSection({
    sectionIds: ['home', 'about', 'skills', 'projects', 'experience', 'labs', 'contact'],
  })

  const mobileNavRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('home')
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
          scrolled ? 'header-blur py-3.5' : 'bg-transparent py-5 md:py-6',
        )}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
      >
        <div className="container-site flex items-center justify-between">
          {/* ── Brand Logo: FAYID. ── */}
          <a
            href="#home"
            onClick={handleLogoClick}
            aria-label="Fayid — Home"
            className="group flex items-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[var(--radius-xs)] py-1"
          >
            <span
              className="font-display font-extrabold text-xl md:text-2xl tracking-[-0.03em] transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              FAYID
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full mt-1.5 ml-0.5 transition-transform duration-300 group-hover:scale-125"
              style={{ background: 'var(--accent)' }}
            />
          </a>

          {/* ── Desktop & Tablet Navigation: Floating Pill ── */}
          <nav
            className="hidden md:flex items-center gap-1 p-1 rounded-full nav-floating-pill"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.12em] transition-colors duration-200 rounded-full select-none',
                    isActive
                      ? 'text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active sliding indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full z-0"
                      style={{
                        background: theme === 'light' ? '#FFFFFF' : 'var(--bg-elevated)',
                        border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid var(--border-strong)',
                        boxShadow: theme === 'light' ? '0 1px 4px rgba(15, 23, 42, 0.08)' : '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </nav>

          {/* ── Right Side Cluster: Theme Switcher & Resume Button ── */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full border border-[var(--border)] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                background: scrolled ? 'var(--bg-elevated)' : 'color-mix(in srgb, var(--bg-card) 60%, transparent)',
                color: 'var(--text-secondary)',
              }}
              whileHover={{ scale: 1.05, color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    className="block"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    className="block"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Resume Button */}
            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Rahman_Fayid_Resume.pdf"
              aria-label="Open or download resume"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.1em] border transition-all duration-200 cursor-pointer select-none"
              style={{
                background: 'var(--accent-subtle)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent)',
              }}
              whileHover={{
                scale: 1.03,
                borderColor: 'var(--accent)',
                boxShadow: 'var(--glow-accent)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={13} className="shrink-0" />
              <span>Resume</span>
              <ArrowUpRight size={12} className="opacity-75 shrink-0" />
            </motion.a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-menu"
              className="md:hidden p-2 rounded-full border border-[var(--border)] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Navigation Drawer & Backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 z-[70] md:hidden"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: 'var(--overlay)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              ref={mobileNavRef}
              className="absolute top-0 right-0 bottom-0 w-[84%] max-w-sm flex flex-col justify-between p-6 sm:p-8 shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border)]">
                  <a
                    href="#home"
                    onClick={handleLogoClick}
                    className="flex items-center gap-0.5"
                  >
                    <span
                      className="font-display font-extrabold text-xl tracking-[-0.03em]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      FAYID
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 ml-0.5"
                      style={{ background: 'var(--accent)' }}
                    />
                  </a>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1.5" aria-label="Mobile Menu Links">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.id
                    return (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={cn(
                          'flex items-center justify-between py-3 px-4 rounded-[var(--radius-md)] transition-colors duration-200 group',
                          isActive
                            ? 'bg-[var(--bg-elevated)] border border-[var(--border-strong)]'
                            : 'hover:bg-[var(--bg-elevated)]',
                        )}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + idx * 0.05, duration: 0.35, ease: EASE_OUT_EXPO }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="type-label type-num text-[var(--text-tertiary)]">
                            0{idx + 1}
                          </span>
                          <span
                            className={cn(
                              'text-lg font-display tracking-tight transition-colors',
                              isActive
                                ? 'text-[var(--accent)] font-semibold'
                                : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]',
                            )}
                          >
                            {link.label}
                          </span>
                        </div>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--accent)' }}
                          />
                        )}
                      </motion.a>
                    )
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-6 border-t border-[var(--border)] space-y-4">
                {/* Mobile Resume CTA */}
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Rahman_Fayid_Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-mono uppercase tracking-[0.12em] border transition-all duration-200"
                  style={{
                    background: 'var(--accent)',
                    borderColor: 'var(--accent)',
                    color: '#ffffff',
                    boxShadow: 'var(--glow-accent)',
                  }}
                >
                  <FileText size={14} />
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} />
                </a>

                {/* Status & Availability Info */}
                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="type-label" style={{ color: 'var(--text-tertiary)' }}>
                      {siteConfig.availability}
                    </span>
                  </div>
                  <span className="type-label" style={{ color: 'var(--text-tertiary)' }}>
                    {siteConfig.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
