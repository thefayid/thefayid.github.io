import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Sparkles,
  BookOpen,
  GraduationCap,
  Boxes,
  Flame,
} from 'lucide-react'
import {
  securityLabsData,
  platformMetadata,
  type SecurityLabItem,
  type LabPlatform,
  type LabDifficulty,
} from '@data/labs'
import { SectionLabel, Divider } from '@components/ui'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@utils/animations'
import { useReducedMotion } from '@hooks/useReducedMotion'

type PlatformFilter = 'all' | LabPlatform
type DifficultyFilter = 'all' | LabDifficulty

const platformIcons: Record<LabPlatform, typeof Shield> = {
  'Hack The Box': Boxes,
  'TryHackMe': Flame,
  'CYLAB Academy': GraduationCap,
}

export function Labs() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLabForModal, setActiveLabForModal] = useState<SecurityLabItem | null>(null)

  // Filtered labs list
  const filteredLabs = useMemo(() => {
    return securityLabsData.filter((lab) => {
      // Platform filter
      if (selectedPlatform !== 'all' && lab.platform !== selectedPlatform) {
        return false
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && lab.difficulty !== selectedDifficulty) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesTitle = lab.title.toLowerCase().includes(query)
        const matchesCategory = lab.category.toLowerCase().includes(query)
        const matchesDesc = lab.description.toLowerCase().includes(query)
        const matchesTech = lab.technologies.some((t) => t.toLowerCase().includes(query))
        const matchesSkills = lab.skillsLearned.some((s) => s.toLowerCase().includes(query))
        if (!matchesTitle && !matchesCategory && !matchesDesc && !matchesTech && !matchesSkills) {
          return false
        }
      }

      return true
    })
  }, [selectedPlatform, selectedDifficulty, searchQuery])

  // Count active non-placeholder labs
  const verifiedCount = useMemo(() => {
    return securityLabsData.filter((l) => !l.isPlaceholder).length
  }, [])

  return (
    <section
      id="labs"
      data-section="labs"
      className="section-wrapper"
    >
      <div className="container-site">
        {/* ── Section Header ── */}
        <div className="section-header-spacing">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SectionLabel className="mb-2.5">05 // Hands-on Security &amp; CTF</SectionLabel>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] leading-[1.2]">
                Cybersecurity Labs &amp; CTF
              </h2>
              <p className="type-body text-base sm:text-lg text-[var(--text-secondary)] mt-3.5 leading-relaxed">
                Practical vulnerability exploitation, network packet analysis, and digital forensics practiced hands-on across Hack The Box, TryHackMe, and CYLAB Academy.
              </p>
            </motion.div>

            {/* Telemetry Telemetry Pill */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)] self-start lg:self-auto"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                <Sparkles size={14} />
                <span>3 Training Grounds</span>
              </div>
              <span className="text-[var(--border-strong)]">|</span>
              <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>{verifiedCount} Practical Labs</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Three Platform Telemetry Overview Cards ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {(Object.keys(platformMetadata) as LabPlatform[]).map((platformKey) => {
            const meta = platformMetadata[platformKey]
            const PlatformIcon = platformIcons[platformKey]
            const isSelected = selectedPlatform === platformKey

            return (
              <button
                key={meta.id}
                type="button"
                onClick={() =>
                  setSelectedPlatform((prev) => (prev === platformKey ? 'all' : platformKey))
                }
                className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 text-left cursor-pointer group ${
                  isSelected
                    ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                    : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                }`}
                style={{
                  background: isSelected
                    ? 'color-mix(in srgb, var(--accent) 6%, var(--bg-card))'
                    : 'var(--bg-card)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2 rounded-lg border border-[var(--border)]"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: meta.accentColor,
                      }}
                    >
                      <PlatformIcon size={16} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-tertiary)]">
                        // PLATFORM
                      </span>
                      <h3 className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {meta.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-tertiary)]"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    {meta.shortCode}
                  </span>
                </div>

                <p className="type-body-sm text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {meta.description}
                </p>

                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[11px] gap-2">
                  <span className="text-[var(--text-tertiary)] shrink-0">Focus:</span>
                  <span className="text-[var(--accent)] font-semibold text-right leading-tight">
                    {meta.focus}
                  </span>
                </div>
              </button>
            )
          })}
        </motion.div>

        {/* ── Filter Controls Bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 p-2.5 rounded-[var(--radius-xl)] border border-[var(--border)]"
          style={{ background: 'var(--bg-elevated)' }}
        >
          {/* Platform Toggle Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSelectedPlatform('all')}
              className={`filter-pill ${selectedPlatform === 'all' ? 'filter-pill-active' : ''}`}
            >
              All Platforms ({securityLabsData.length})
            </button>

            {(Object.keys(platformMetadata) as LabPlatform[]).map((pKey) => {
              const count = securityLabsData.filter((l) => l.platform === pKey).length
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => setSelectedPlatform(pKey)}
                  className={`filter-pill ${selectedPlatform === pKey ? 'filter-pill-active' : ''}`}
                >
                  {pKey} ({count})
                </button>
              )
            })}
          </div>

          {/* Difficulty and Search Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto justify-between sm:justify-end">
            {/* Difficulty Filter */}
            <div className="flex flex-wrap items-center gap-1 border-b sm:border-b-0 sm:border-r border-[var(--border)] pb-2 sm:pb-0 sm:pr-3 font-mono text-xs text-[var(--text-tertiary)]">
              <span className="text-[11px] uppercase flex items-center gap-1 mr-1">
                <Filter size={11} />
                <span>Level:</span>
              </span>

              {(['all', 'Fundamental', 'Easy', 'Medium'] as DifficultyFilter[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    selectedDifficulty === level
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-bold'
                      : 'hover:text-[var(--text-primary)]'
                  }`}
                >
                  {level === 'all' ? 'All' : level}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-auto sm:min-w-[210px]">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search labs or tools..."
                className="w-full pl-7 pr-3 py-1.5 text-xs font-mono rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>
        </motion.div>

        <Divider className="mb-12" />

        {/* ── Labs Cards Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-5% 0px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredLabs.map((lab) => {
              const meta = platformMetadata[lab.platform]
              const PlatformIcon = platformIcons[lab.platform]

              return (
                <motion.div
                  key={lab.id}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className={`group h-full flex flex-col justify-between p-6 sm:p-7 rounded-[var(--radius-xl)] border transition-all duration-300 hover:border-[var(--border-strong)] ${
                    lab.isPlaceholder
                      ? 'border-dashed border-[var(--border-strong)] bg-opacity-60'
                      : 'border-[var(--border)]'
                  }`}
                  style={{
                    background: 'var(--bg-card)',
                  }}
                >
                  <div>
                    {/* Top Meta Header: Platform Badge, Status & Difficulty */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Platform Pill */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className="p-1 rounded-md border border-[var(--border-subtle)]"
                          style={{
                            background: 'var(--bg-elevated)',
                            color: meta.accentColor,
                          }}
                        >
                          <PlatformIcon size={12} />
                        </span>
                        <span className="font-mono text-xs text-[var(--text-secondary)] font-semibold">
                          {lab.platform}
                        </span>
                      </div>

                      {/* Status / Placeholder Tag */}
                      <div className="flex items-center gap-1.5">
                        {lab.isPlaceholder ? (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-amber-500/40 text-amber-400 bg-amber-500/10 font-bold uppercase">
                            [ Placeholder ]
                          </span>
                        ) : (
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                              lab.status === 'Completed'
                                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                                : 'border-blue-500/40 text-blue-400 bg-blue-500/10'
                            }`}
                          >
                            {lab.status === 'Completed' ? (
                              <CheckCircle2 size={10} />
                            ) : (
                              <Clock size={10} />
                            )}
                            <span>{lab.status}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category & Difficulty Row */}
                    <div className="flex items-center gap-2 mb-2 font-mono text-[11px] text-[var(--text-tertiary)]">
                      <span className="text-[var(--accent)] font-semibold">
                        // {lab.category}
                      </span>
                      <span>·</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          lab.difficulty === 'Fundamental'
                            ? 'text-cyan-400 bg-cyan-950/40'
                            : lab.difficulty === 'Easy'
                            ? 'text-emerald-400 bg-emerald-950/40'
                            : 'text-amber-400 bg-amber-950/40'
                        }`}
                      >
                        {lab.difficulty}
                      </span>
                    </div>

                    {/* Lab Title */}
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2.5">
                      {lab.title}
                    </h3>

                    {/* Practical Description */}
                    <p className="type-body-sm text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                      {lab.description}
                    </p>

                    {/* Skills Learned Checklist */}
                    <div className="mb-5 space-y-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] block mb-1">
                        Applied Competencies:
                      </span>
                      <div className="space-y-1">
                        {lab.skillsLearned.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)] font-mono"
                          >
                            <span className="text-[var(--accent)] font-bold">›</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer: Technologies & Write-up Trigger */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                    {/* Tool Badges */}
                    <div className="flex flex-wrap gap-2">
                      {lab.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="tech-badge"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Write-up Action or Details */}
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-[10px] text-[var(--text-tertiary)]">
                        {lab.date ? `Year: ${lab.date}` : 'Active Practice'}
                      </span>

                      {lab.writeupUrl && lab.writeupUrl !== '#' ? (
                        <a
                          href={lab.writeupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline cursor-pointer"
                        >
                          <BookOpen size={12} />
                          <span>View Write-up</span>
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveLabForModal(lab)}
                          className="inline-flex items-center gap-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                        >
                          <Terminal size={12} className="text-[var(--accent)]" />
                          <span>Lab Details</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredLabs.length === 0 && (
          <div
            className="p-10 rounded-[var(--radius-xl)] border border-[var(--border)] text-center text-xs font-mono text-[var(--text-tertiary)]"
            style={{ background: 'var(--bg-card)' }}
          >
            No labs match your filter criteria. Try clearing search or selecting &quot;All Platforms&quot;.
          </div>
        )}

        {/* ── Grounded Notice ── */}
        <div className="mt-12 p-4 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-tertiary)] flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: 'var(--bg-elevated)' }}>
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)] font-bold">// GROUNDED TELEMETRY:</span>
            <span>Focus on authentic hands-on challenge completion. Zero arbitrary vanity badges or points.</span>
          </div>
          <span className="text-[10px] uppercase text-[var(--accent)] font-semibold shrink-0">
            src/data/labs.ts Ready for Updates
          </span>
        </div>

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>

      {/* ── Optional Lab Details Modal ── */}
      <AnimatePresence>
        {activeLabForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLabForModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="relative w-full max-w-lg p-6 sm:p-7 rounded-[var(--radius-xl)] border border-[var(--border)] shadow-2xl z-10"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4 font-mono text-xs">
                <span className="text-[var(--accent)] font-bold">
                  // {activeLabForModal.platform} LAB DOSSIER
                </span>
                <span className="text-[var(--text-tertiary)]">
                  Level: {activeLabForModal.difficulty}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                {activeLabForModal.title}
              </h3>

              <p className="type-body-sm text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
                {activeLabForModal.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-mono text-xs uppercase text-[var(--accent)] font-semibold block mb-2">
                    Key Practical Takeaways:
                  </span>
                  <div className="space-y-1.5">
                    {activeLabForModal.skillsLearned.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]"
                      >
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs uppercase text-[var(--text-tertiary)] font-semibold block mb-2">
                    Technologies Evaluated:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLabForModal.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setActiveLabForModal(null)}
                  className="px-4 py-1.5 rounded-full border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
