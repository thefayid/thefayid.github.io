import { motion } from 'framer-motion'
import {
  Terminal,
  Shield,
  Sparkles,
  Code2,
  CheckCircle2,
  Layers,
  GraduationCap,
  Activity,
  Radio,
  MapPin,
  Cpu,
} from 'lucide-react'
import { siteConfig, aboutBio, technicalFacts } from '@data/portfolio'
import { SectionLabel } from '@components/ui'
import { fadeUp, staggerContainer } from '@utils/animations'

export function About() {
  return (
    <section
      id="about"
      data-section="about"
      className="section-wrapper"
    >
      {/* Subtle background ambient depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-site relative z-10">
        {/* ── Section Header with Generous Clearance ── */}
        <div className="section-header-spacing">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionLabel className="mb-2.5">01 // Profile &amp; Background</SectionLabel>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] leading-[1.2]">
                Curious by nature.{' '}
                <span className="text-[var(--accent)]">Analytical by design.</span>
              </h2>
              <p className="font-display font-medium text-lg sm:text-xl text-[var(--text-secondary)] mt-3 leading-relaxed">
                Engineering security from the packet level up.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] shrink-0 self-start lg:self-auto py-2 px-4 rounded-full border border-[var(--border)] bg-[var(--bg-card)] shadow-sm"
            >
              <Terminal size={14} className="text-[var(--accent)]" />
              <span>SYS.PROFILE // DOSSIER</span>
            </motion.div>
          </div>
        </div>

        {/* ── Main Editorial Two-Column Dossier Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left Column (5 Cols): Identity HUD + Academic Dossier Cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Operator Identity HUD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-6 rounded-[var(--radius-2xl)] border border-[var(--border)] relative overflow-hidden shadow-md"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

              {/* Identity Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                  <Shield size={14} className="text-[var(--accent)]" />
                  <span>SYS.ID // OPERATOR</span>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE
                </span>
              </div>

              {/* Profile Bar */}
              <div className="flex items-center gap-4 py-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-display font-black text-white shrink-0 shadow-md relative"
                  style={{ background: 'var(--accent)', boxShadow: 'var(--glow-accent)' }}
                >
                  RF
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] tracking-tight truncate">
                    {siteConfig.name}
                  </h3>
                  <p className="font-mono text-xs text-[var(--accent)] font-semibold truncate mt-0.5">
                    {siteConfig.role}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-tertiary)] mt-1">
                    <MapPin size={12} className="shrink-0" />
                    <span className="truncate">Kasaragod, Kerala, India</span>
                  </div>
                </div>
              </div>

              {/* Quick Telemetry Strip */}
              <div
                className="p-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] font-mono text-[11px] space-y-1.5"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[var(--accent)]" />
                    <span>PRIMARY FOCUS:</span>
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold">Defensive · Packet Analysis</span>
                </div>
                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-[var(--accent)]" />
                    <span>ENGINEERING:</span>
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Python · Linux · WIDS</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Academic & Field Dossier */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-6 rounded-[var(--radius-2xl)] border border-[var(--border)] relative overflow-hidden shadow-md space-y-4"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Dossier Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                  <GraduationCap size={15} className="text-[var(--accent)]" />
                  <span>Academic Dossier</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                  ACCREDITED
                </span>
              </div>

              {/* Key-Value Dossier Fields */}
              <div className="space-y-3 font-mono text-xs">
                {/* Degree & Specialization */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[var(--text-tertiary)] tracking-wider block">
                    // Degree &amp; Specialization
                  </span>
                  <p className="font-bold text-[var(--text-primary)] text-sm leading-snug">
                    {aboutBio.degree}
                  </p>
                  <p className="text-[var(--accent)] font-medium text-xs">
                    Specialization: {aboutBio.specialization}
                  </p>
                </div>

                {/* University & Academic Status */}
                <div className="pt-2.5 border-t border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] uppercase text-[var(--text-tertiary)] tracking-wider block">
                    // University &amp; Status
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-medium">{aboutBio.university}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Final-Year Student
                    </span>
                  </div>
                </div>

                {/* Training Grounds */}
                <div className="pt-2.5 border-t border-[var(--border-subtle)] space-y-1.5">
                  <span className="text-[10px] uppercase text-[var(--text-tertiary)] tracking-wider block">
                    // Hands-on Platforms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {aboutBio.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="tech-badge"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Horizon */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[var(--text-tertiary)] uppercase text-[10px] tracking-wider block">
                    // Career Horizon:
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25 shrink-0">
                    Open to Opportunities
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column (7 Cols): Narrative Chapters & Discipline Chips ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7">
            {/* Act 1 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="text-[var(--accent)] uppercase font-mono tracking-wider text-[11px] font-bold block mb-2">
                01 // The Foundation
              </span>
              <p className="type-body text-base sm:text-lg text-[var(--text-primary)] leading-[1.7]">
                Hi, I'm <strong className="text-[var(--accent)] font-bold">Fayid</strong>, a final-year BCA student specializing in Cyber Security. I'm passionate about systems technology, defensive cybersecurity, network packet analysis, and Python engineering.
              </p>
            </motion.div>

            {/* Act 2 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="text-[var(--text-tertiary)] uppercase font-mono tracking-wider text-[11px] font-bold block mb-2">
                02 // Hands-on Practical Exploits
              </span>
              <p className="type-body text-sm sm:text-base text-[var(--text-secondary)] leading-[1.7]">
                I've been actively developing practical security skills through platforms like <strong className="text-[var(--text-primary)] font-semibold">Hack The Box</strong> and <strong className="text-[var(--text-primary)] font-semibold">TryHackMe</strong>, exploring real-world vulnerability patterns and learning how attacks unfold in live environments.
              </p>
            </motion.div>

            {/* Act 3 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="text-[var(--text-tertiary)] uppercase font-mono tracking-wider text-[11px] font-bold block mb-2">
                03 // Systems &amp; Engineering Scope
              </span>
              <p className="type-body text-sm sm:text-base text-[var(--text-secondary)] leading-[1.7]">
                I've worked on <span className="text-[var(--text-primary)] font-semibold">security tooling</span>, <span className="text-[var(--text-primary)] font-semibold">wireless intrusion detection (WIDS)</span>, <span className="text-[var(--text-primary)] font-semibold">DevSecOps pipelines</span>, <span className="text-[var(--text-primary)] font-semibold">SIEM implementations</span>, and <span className="text-[var(--text-primary)] font-semibold">Python automation</span>.
              </p>
            </motion.div>

            {/* Act 4 */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="text-[var(--text-tertiary)] uppercase font-mono tracking-wider text-[11px] font-bold block mb-2">
                04 // Emerging Tech &amp; AI
              </span>
              <p className="type-body text-sm sm:text-base text-[var(--text-secondary)] leading-[1.7]">
                Alongside core cybersecurity, I'm deeply interested in <strong className="text-[var(--accent)] font-semibold">Applied AI</strong> and exploring how intelligent automation can solve complex workflow bottlenecks and strengthen defensive telemetry.
              </p>
            </motion.div>

            {/* Mission Statement Callout */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-4 sm:p-5 rounded-[var(--radius-xl)] flex items-start gap-3.5 border border-[var(--accent-border)]"
              style={{ background: 'var(--accent-subtle)' }}
            >
              <Sparkles size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                Currently focused on expanding practical expertise, tackling challenging problems, and beginning a professional career where I can <span className="text-[var(--accent)] font-bold">learn, contribute, and build resilient systems</span>.
              </p>
            </motion.div>

            {/* 6 Disciplines Chips */}
            <div className="pt-2 space-y-3">
              <span className="text-[var(--text-tertiary)] uppercase font-mono tracking-wider text-[11px] font-bold block">
                // Disciplines &amp; Hands-on Areas
              </span>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={staggerContainer(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {aboutBio.coreAreas.map((area, idx) => (
                  <motion.div
                    key={area.label}
                    variants={fadeUp}
                    className="p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--bg-elevated)]"
                    style={{ background: 'var(--bg-card)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {idx === 0 && <Shield size={14} className="text-[var(--accent)] shrink-0" />}
                      {idx === 1 && <Radio size={14} className="text-[var(--accent)] shrink-0" />}
                      {idx === 2 && <Layers size={14} className="text-[var(--accent)] shrink-0" />}
                      {idx === 3 && <Activity size={14} className="text-[var(--accent)] shrink-0" />}
                      {idx === 4 && <Code2 size={14} className="text-[var(--accent)] shrink-0" />}
                      {idx === 5 && <Sparkles size={14} className="text-[var(--accent)] shrink-0" />}
                      <span className="text-xs font-display font-bold text-[var(--text-primary)]">
                        {area.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-tertiary)] leading-snug">
                      {area.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Deliberate Architectural Separation before Mindset Section ── */}
        <div
          className="border-t border-[var(--border)]"
          style={{
            marginTop: 'clamp(3rem, 5.5vh, 4.5rem)',
            paddingTop: 'clamp(2.5rem, 4.5vh, 3.5rem)',
          }}
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionLabel className="mb-2.5">Mindset &amp; Philosophy</SectionLabel>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] leading-[1.2]">
                Under the hood: How I operate
              </h3>
            </div>
            <p className="text-xs font-mono text-[var(--text-tertiary)]">
              Curious · Hands-on · Analytical · Constantly Learning
            </p>
          </div>

          {/* 4 Principle Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5% 0px' }}
          >
            {technicalFacts.map((fact) => (
              <motion.div
                key={fact.id}
                variants={fadeUp}
                className="p-6 rounded-[var(--radius-xl)] flex flex-col justify-between transition-all duration-300 border border-[var(--border)] hover:border-[var(--accent-border)] hover:-translate-y-1 shadow-sm"
                style={{ background: 'var(--bg-card)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono text-xs font-bold text-[var(--accent)]">
                      {fact.number}
                    </span>
                    <span
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded border uppercase text-[var(--text-tertiary)] font-medium"
                      style={{
                        background: 'var(--bg-elevated)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      {fact.tag}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-2.5">
                    {fact.title}
                  </h4>

                  <p className="type-body-sm text-xs text-[var(--text-secondary)] leading-relaxed">
                    {fact.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
                  <span>Principle</span>
                  <CheckCircle2 size={13} className="text-[var(--accent)] opacity-80" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>
    </section>
  )
}
