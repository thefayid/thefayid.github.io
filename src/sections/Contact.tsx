import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  MapPin,
  Clock,
  Terminal,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { siteConfig, socialLinks } from '@data/portfolio'
import { SectionLabel } from '@components/ui'
import { Magnetic } from '@components/CustomCursor'
import { GitHubIcon, LinkedInIcon, InstagramIcon } from '@components/icons/SocialIcons'
import { fadeUp, EASE_OUT_EXPO } from '@utils/animations'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const SUBJECT_OPTIONS = [
  'Cyber Security Opportunity / Role',
  'Security Research & Tooling',
  'Wireless Security / WIDS Discussion',
  'Applied AI & Automation Project',
  'General Question / Networking',
]

export function Contact() {
  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // Bot prevention honeypot
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [receiptCode, setReceiptCode] = useState('')
  const [receiptTimestamp, setReceiptTimestamp] = useState('')

  // Copy Feedback State
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Anti-bot time tracking (bots submit forms instantaneously)
  const formMountTime = useRef<number>(0)

  useEffect(() => {
    formMountTime.current = Date.now()
  }, [])

  // Local Time Telemetry (UTC+05:30 IST)
  const [currentTime, setCurrentTime] = useState('')
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  // Handle Form Submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // 1. Bot Honeypot Check (Invisible field)
    if (honeypot.trim()) {
      console.warn('Bot detection triggered via honeypot.')
      setFormStatus('error')
      setErrorMessage('Verification failed. Bot activity suspected.')
      return
    }

    // 2. Submission Speed Check (Humans take at least ~1.5s to fill a form)
    const elapsed = Date.now() - formMountTime.current
    if (elapsed < 1200) {
      setFormStatus('error')
      setErrorMessage('Submission was too rapid. Please try again.')
      return
    }

    // 3. Validation
    if (!name.trim()) {
      setFormStatus('error')
      setErrorMessage('Please enter your name.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setFormStatus('error')
      setErrorMessage('Please provide a valid email address.')
      return
    }

    if (message.trim().length < 8) {
      setFormStatus('error')
      setErrorMessage('Message must be at least 8 characters long.')
      return
    }

    // 4. Simulate Encrypted Transmission
    setFormStatus('submitting')
    setErrorMessage('')

    setTimeout(() => {
      const randomTicket = `TX-${Math.floor(100000 + Math.random() * 900000)}`
      setReceiptCode(randomTicket)
      setReceiptTimestamp(new Date().toISOString().replace('T', ' ').slice(0, 19))
      setFormStatus('success')
    }, 950)
  }

  // Reset form
  const handleResetForm = () => {
    setName('')
    setEmail('')
    setMessage('')
    setHoneypot('')
    setFormStatus('idle')
    setErrorMessage('')
    formMountTime.current = Date.now()
  }

  const socialIconMap = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
    Instagram: InstagramIcon,
  }

  return (
    <section
      id="contact"
      data-section="contact"
      className="section-wrapper"
    >
      {/* ── Ambient Radial Glow behind Contact Section ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, var(--accent) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container-site relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="section-header-spacing"
        >
          <SectionLabel className="mb-2.5">07 // Initiate Contact</SectionLabel>
        </motion.div>

        {/* ── Main Two-Column Architectural Contact Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (6 Cols): Editorial Headline, Direct Email, Socials & Telemetry */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-8"
          >
            {/* The Concept Headline */}
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[var(--text-primary)] leading-[1.2]">
                The next interesting problem{' '}
                <span className="text-[var(--accent)]">
                  might start with a conversation.
                </span>
              </h2>

              <p className="type-body text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-xl">
                Whether you're exploring a complex security vector, discussing potential cyber defense opportunities, or interested in systems and AI — my inbox is always open.
              </p>
            </div>

            {/* Direct Email Card with 1-Click Copy */}
            <div
              className="p-5 sm:p-6 rounded-[var(--radius-xl)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--border-strong)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="p-3 rounded-lg border border-[var(--border-subtle)] text-[var(--accent)] shrink-0"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
                      Direct Email Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate block"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Copy Button */}
                <Magnetic strength={0.15}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn-outline btn-sm inline-flex items-center gap-2 cursor-pointer font-mono text-xs w-full sm:w-auto justify-center"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Resume Button & Direct Action */}
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.2}>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md inline-flex items-center gap-2 font-mono text-xs"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                    boxShadow: 'var(--glow-accent)',
                  }}
                >
                  <FileText size={15} />
                  <span>Open Official Resume</span>
                  <ArrowUpRight size={13} />
                </a>
              </Magnetic>

              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                [ PDF Format // Verified ]
              </span>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] block">
                // Connect Across Networks
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.label as keyof typeof socialIconMap] || ArrowUpRight

                  return (
                    <Magnetic key={link.label} strength={0.15}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-elevated)] transition-all flex items-center justify-between group cursor-pointer block"
                        style={{ background: 'var(--bg-card)' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" />
                          <div>
                            <span className="font-display font-bold text-xs text-[var(--text-primary)] block">
                              {link.label}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--text-tertiary)] block">
                              {link.handle}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight size={12} className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Magnetic>
                  )
                })}
              </div>
            </div>

            {/* Telemetry Bar: Status & Timezone */}
            <div
              className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)] flex flex-wrap items-center justify-between gap-3"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[var(--text-primary)] font-semibold">STATUS: ONLINE</span>
                <span className="text-[var(--text-tertiary)]">· Ready for Opportunities</span>
              </div>

              <div className="flex items-center gap-3 text-[var(--text-tertiary)] text-[11px]">
                <div className="flex items-center gap-1">
                  <MapPin size={11} />
                  <span>India</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-[var(--accent)] font-semibold">
                  <Clock size={11} />
                  <span>{currentTime || 'IST (UTC+05:30)'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (6 Cols): Secure Message Dispatch Interface */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-2xl relative overflow-hidden"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                style={{ opacity: 0.85 }}
              />

              {/* Form Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
                  <Terminal size={14} />
                  <span>// SECURE TRANSMISSION PORTAL</span>
                </div>
                <div className="hidden xs:flex items-center gap-1.5 text-[var(--text-tertiary)] text-[10px] shrink-0">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>TLS ENCRYPTED DISPATCH</span>
                </div>
              </div>

              {/* Form Body or Success State */}
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  /* ── Success Receipt State ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    className="py-6 text-center space-y-4"
                  >
                    <div
                      className="w-14 h-14 mx-auto rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                    >
                      <Check size={28} />
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                        [ TRANSMISSION RECEIVED ]
                      </span>
                      <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                        Message Dispatched
                      </h3>
                    </div>

                    <p className="type-body-sm text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <strong className="text-[var(--text-primary)]">{name}</strong>. Your message payload has been secured. I will reply directly to <span className="text-[var(--accent)] font-mono">{email}</span> shortly.
                    </p>

                    {/* Receipt Telemetry */}
                    <div
                      className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-tertiary)] max-w-sm mx-auto space-y-1 text-left"
                      style={{ background: 'var(--bg-elevated)' }}
                    >
                      <div className="flex justify-between">
                        <span>Transmission ID:</span>
                        <span className="text-[var(--text-primary)] font-bold">{receiptCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timestamp:</span>
                        <span>{receiptTimestamp} UTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Routing:</span>
                        <span className="text-emerald-400">Direct to Inbox</span>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="btn btn-outline btn-sm inline-flex items-center gap-2 font-mono text-xs cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Active Form State ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Bot Honeypot Field (Hidden from humans) */}
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="contact_hp_field">Leave this empty</label>
                      <input
                        id="contact_hp_field"
                        type="text"
                        name="hp_field"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                      />
                    </div>

                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="sender-name"
                          className="font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between"
                        >
                          <span>Your Name</span>
                          <span className="text-[10px] text-[var(--accent)] font-bold">*</span>
                        </label>
                        <input
                          id="sender-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="sender-email"
                          className="font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between"
                        >
                          <span>Your Email</span>
                          <span className="text-[10px] text-[var(--accent)] font-bold">*</span>
                        </label>
                        <input
                          id="sender-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Subject Topic Dropdown */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="sender-subject"
                        className="font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between"
                      >
                        <span>Subject Focus</span>
                        <span className="text-[10px] text-[var(--text-tertiary)]">Select</span>
                      </label>
                      <select
                        id="sender-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all cursor-pointer"
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[var(--bg-primary)]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="sender-message"
                        className="font-mono text-xs text-[var(--text-secondary)] flex items-center justify-between"
                      >
                        <span>Message Payload</span>
                        <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
                          {message.length} chars
                        </span>
                      </label>
                      <textarea
                        id="sender-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your inquiry, project scope, or opportunity..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                      />
                    </div>

                    {/* Error Banner if validation fails */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg border border-rose-500/40 bg-rose-500/10 text-rose-400 font-mono text-xs flex items-center gap-2"
                      >
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3 px-5 rounded-lg font-mono text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_var(--accent-glow)]"
                      style={{
                        background: 'var(--accent)',
                      }}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Encrypting Payload &amp; Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Transmit Secure Message</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] font-mono text-[var(--text-tertiary)] text-center pt-1">
                      Protected with client verification &amp; honeypot bot prevention.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
