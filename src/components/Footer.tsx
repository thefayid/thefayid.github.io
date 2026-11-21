import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react'
import { siteConfig, socialLinks } from '@data/portfolio'
import { Magnetic } from '@components/CustomCursor'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@components/icons/SocialIcons'
import { fadeUp, staggerContainer } from '@utils/animations'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const socialIconMap = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
  }

  return (
    <footer
      className="relative overflow-hidden border-t border-[var(--border)] pt-24 pb-16"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background ambient gradient accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40"
      />

      <div className="container-site">
        {/* Main Footer Upper Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Col 1: Brand & Philosophy (5 Cols) */}
          <motion.div variants={fadeUp} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-0.5">
              <span className="font-display font-extrabold text-2xl tracking-[-0.03em] text-[var(--text-primary)]">
                FAYID
              </span>
              <span
                className="w-2 h-2 rounded-full mt-2 ml-0.5"
                style={{ background: 'var(--accent)' }}
              />
            </div>

            <p className="type-body-sm text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              Cybersecurity student &amp; systems enthusiast. Exploring defensive architectures, network protocols, and applied AI automation.
            </p>

            {/* Design Signature */}
            <div className="pt-2">
              <span className="font-mono text-[11px] text-[var(--text-tertiary)] italic block">
                Designed &amp; engineered with precision for systems, security, and the open web.
              </span>
            </div>
          </motion.div>

          {/* Col 2: Navigation & Quick Jump (3 Cols) */}
          <motion.div variants={fadeUp} className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] block">
              // ARCHITECTURE
            </span>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <a
                  href="#about"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  01 // About &amp; Focus
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  02 // Skills &amp; Ecosystem
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  03 // Flagship Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  04 // Internships &amp; Timeline
                </a>
              </li>
              <li>
                <a
                  href="#labs"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  05 // Cybersecurity Labs
                </a>
              </li>
              <li>
                <a
                  href="#credentials"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  06 // Accreditations &amp; Work
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-block"
                >
                  07 // Transmission Portal
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 3: Connectivity & Back To Top (4 Cols) */}
          <motion.div variants={fadeUp} className="md:col-span-4 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] block">
                // EXTERNAL NODES
              </span>
              <div className="flex flex-col gap-2.5">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.label as keyof typeof socialIconMap] || GitHubIcon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-elevated)] transition-all group font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      style={{ background: 'var(--bg-card)' }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" />
                        <span>{link.label}</span>
                        {link.handle && (
                          <span className="text-[var(--text-tertiary)] text-[10px]">
                            ({link.handle})
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        size={12}
                        className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Back to top magnetic trigger */}
            <div className="pt-2">
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] transition-all inline-flex items-center justify-center gap-2 font-mono text-xs text-[var(--text-primary)] cursor-pointer group"
                  aria-label="Scroll to top of page"
                >
                  <ArrowUp size={13} className="text-[var(--accent)] transition-transform group-hover:-translate-y-0.5" />
                  <span>Return to Top</span>
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Lower Telemetry & Dynamic Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <span>© {CURRENT_YEAR} {siteConfig.name}.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* Real-time Environment / System Telemetry */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={12} />
              <span>TLS 1.3 SECURED</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5 text-[var(--accent)]">
              <Terminal size={12} />
              <span>INTERACTIVE CLI READY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
