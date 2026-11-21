import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  FolderGit2,
  MapPin,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { siteConfig, socialLinks } from '@data/portfolio'
import { EASE_OUT_EXPO } from '@utils/animations'
import { EditorialPortrait } from '@components/EditorialPortrait'
import { Magnetic } from '@components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

// Concept 3: Grounded Technical Identity
// Line 1: "Defensive security."
// Line 2: "Engineered from the packet up."
const HEADLINE_LINE_1 = 'Defensive security.'.split(' ')
const HEADLINE_LINE_2 = 'Engineered from the packet up.'.split(' ')

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  // GSAP subtle parallax scrub on the headline & portrait when scrolling out of hero
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Subtle headline drift
      gsap.to(headlineRef.current, {
        y: -42,
        opacity: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      // Subtle portrait depth drift
      gsap.to(portraitRef.current, {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth mouse-following ambient spotlight within hero bounds
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    let raf: number
    let tx = -999, ty = -999
    let cx = -999, cy = -999

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
    }

    const onMouseLeave = () => {
      tx = -999
      ty = -999
    }

    const tick = () => {
      cx += (tx - cx) * 0.05
      cy += (ty - cy) * 0.05
      spotlight.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    section.addEventListener('mousemove', onMouseMove, { passive: true })
    section.addEventListener('mouseleave', onMouseLeave, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 110
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      data-section="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden select-none"
      style={{
        background: 'transparent',
        paddingTop: 'clamp(5.5rem, 10vh, 7.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
      }}
    >
      {/* ── Ambient Radial Lighting Layer ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% -10%, rgba(59, 130, 246, 0.12) 0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 85% 45%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Interactive Cursor Spotlight ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[550px] h-[550px] rounded-full z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.065) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* ── Main Container ── */}
      <div className="container-site relative z-10 w-full flex-1 flex flex-col justify-center">

        {/* ── Meta / Identity Strip ── */}
        <motion.div
          className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          {/* Active Status Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[0.6875rem] uppercase tracking-wider font-semibold text-[var(--text-primary)]">
              {siteConfig.brand}
            </span>
            <span className="text-[var(--border-strong)] hidden sm:inline">/</span>
            <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--text-tertiary)] hidden sm:inline">
              {siteConfig.name}
            </span>
          </div>

          {/* Focus Domain Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[0.6875rem] font-mono uppercase tracking-wider"
            style={{
              background: 'var(--accent-subtle)',
              borderColor: 'var(--accent-border)',
              color: 'var(--accent)',
            }}
          >
            <ShieldCheck size={12} className="shrink-0" />
            <span>{siteConfig.focus}</span>
          </div>

          {/* Location Badge */}
          <div
            className="hidden md:inline-flex items-center gap-1.5 text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--text-tertiary)]"
          >
            <MapPin size={11} className="shrink-0" />
            <span>{siteConfig.location}</span>
          </div>
        </motion.div>

        {/* ── Editorial Grid: Headline + Reserved Portrait Space ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left / Primary Column (Headline & Narrative) */}
          <div className="lg:col-span-8 flex flex-col justify-center">

            {/* ── Concept 3: Developer Terminal Init Block ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
              className="mb-5 sm:mb-6 max-w-xl rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden shadow-sm"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Terminal Window Bar */}
              <div
                className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--border-subtle)] font-mono text-[11px]"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[var(--text-tertiary)] pl-1">operator.init()</span>
                </div>
                <span className="text-emerald-500 dark:text-emerald-400 font-semibold flex items-center gap-1.5 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE
                </span>
              </div>

              {/* Code Payload */}
              <div className="p-3 sm:p-3.5 font-mono text-xs leading-relaxed space-y-1">
                <p className="text-[var(--text-secondary)]">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{' '}
                  <span className="text-[var(--text-primary)] font-bold">fayid</span> = &#123;
                </p>
                <p className="pl-4 text-[var(--text-tertiary)]">
                  discipline: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">&quot;Defensive Cyber Security&quot;</span>,
                </p>
                <p className="pl-4 text-[var(--text-tertiary)]">
                  engineering: <span className="text-blue-600 dark:text-blue-400 font-semibold">[&quot;Packet Analysis&quot;, &quot;WIDS Sensors&quot;, &quot;DevSecOps&quot;]</span>
                </p>
                <p className="text-[var(--text-secondary)]">&#125;;</p>
              </div>
            </motion.div>

            {/* Headline — The Primary Visual Focus */}
            <h1
              ref={headlineRef}
              className="font-display font-extrabold text-[var(--text-primary)]"
              style={{
                fontSize: 'clamp(2rem, 5.2vw, 4.75rem)',
                lineHeight: 1.18,
                letterSpacing: '-0.015em',
              }}
              aria-label="Defensive security. Engineered from the packet up."
            >
              {/* Line 1 */}
              <span className="block overflow-hidden pb-1">
                {HEADLINE_LINE_1.map((word, i) => (
                  <span
                    key={`l1-${i}`}
                    style={{
                      display: 'inline-block',
                      marginRight: i < HEADLINE_LINE_1.length - 1 ? '0.3em' : '0',
                    }}
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.9,
                        ease: EASE_OUT_EXPO,
                        delay: 0.2 + i * 0.05,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>

              {/* Line 2 */}
              <span className="block overflow-hidden pb-1 mt-1 sm:mt-1.5">
                {HEADLINE_LINE_2.map((word, i) => {
                  const isHighlight = word.toLowerCase().includes('packet') || word.toLowerCase().includes('up')
                  return (
                    <span
                      key={`l2-${i}`}
                      style={{
                        display: 'inline-block',
                        marginRight: i < HEADLINE_LINE_2.length - 1 ? '0.3em' : '0',
                      }}
                    >
                      <motion.span
                        className={`inline-block ${
                          isHighlight ? 'text-[var(--accent)] font-black' : ''
                        }`}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{
                          duration: 0.9,
                          ease: EASE_OUT_EXPO,
                          delay: 0.45 + i * 0.05,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  )
                })}
              </span>
            </h1>

            {/* Short Introduction */}
            <motion.p
              className="type-body text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.7 }}
            >
              {siteConfig.introduction}
            </motion.p>

            {/* Call to Actions (CTAs) */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.85 }}
            >
              {/* Explore Projects CTA */}
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => scrollTo('projects')}
                  className="btn btn-primary btn-lg inline-flex items-center gap-2 group cursor-pointer"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                  }}
                >
                  <FolderGit2 size={16} />
                  <span>Explore Projects</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </Magnetic>

              {/* Contact CTA */}
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="btn btn-outline btn-lg inline-flex items-center gap-2 cursor-pointer"
                >
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </button>
              </Magnetic>

              {/* Terminal status pill */}
              <div className="hidden xl:flex items-center gap-2 pl-2 text-xs font-mono text-[var(--text-tertiary)]">
                <Terminal size={14} className="text-[var(--accent)]" />
                <span>$ fayid --security-audit</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Profile Photograph Frame */}
          <div ref={portraitRef} className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <EditorialPortrait
              size="md"
              aspectRatio="4/5"
              caption={siteConfig.name}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Strip: Social Links & Kinetic Scroll Cue ── */}
      <div className="container-site relative z-10 pt-10 sm:pt-12 border-t border-[var(--border-subtle)]">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {/* Social Links with custom high-precision icons */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-tertiary)] hidden xs:inline">
              Connect:
            </span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <span>{social.label}</span>
                <ArrowUpRight
                  size={12}
                  className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>
            ))}
          </div>

          {/* Kinetic Scroll Cue */}
          <button
            type="button"
            onClick={() => scrollTo('about')}
            aria-label="Scroll to about section"
            className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
          >
            <span>Scroll to explore</span>
            <span
              className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:translate-y-1"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <ArrowDown size={13} className="transition-transform group-hover:translate-y-0.5" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
