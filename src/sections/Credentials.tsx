import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  ShieldCheck,
  Calendar,
  ExternalLink,
  MapPin,
  Users,
  Flame,
  GraduationCap,
  FileCheck,
  X,
  Copy,
  Check,
} from 'lucide-react'
import {
  credentialsData,
  type CredentialItem,
  type CredentialCategory,
  getCertificationsCount,
} from '@data/credentials'
import { SectionLabel, Divider } from '@components/ui'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@utils/animations'
import { useReducedMotion } from '@hooks/useReducedMotion'

type FilterTab = 'all' | CredentialCategory

const categoryIcons: Record<CredentialCategory, typeof Award> = {
  certification: ShieldCheck,
  conference: Users,
  hackathon: Flame,
  course: GraduationCap,
  achievement: Award,
}

const categoryLabels: Record<CredentialCategory, string> = {
  certification: 'Certification',
  conference: 'Conference',
  hackathon: 'Hackathon',
  course: 'Course',
  achievement: 'Academic Milestone',
}

export function Credentials() {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [activeModalItem, setActiveModalItem] = useState<CredentialItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const counts = useMemo(() => getCertificationsCount(), [])

  // Filtered items
  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return credentialsData
    return credentialsData.filter((item) => item.type === activeTab)
  }, [activeTab])

  // Copy credential ID to clipboard
  const handleCopyId = (idString: string) => {
    navigator.clipboard.writeText(idString)
    setCopiedId(idString)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section
      id="credentials"
      data-section="credentials"
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
            <SectionLabel className="mb-2.5">06 // Accreditations &amp; Milestones</SectionLabel>
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
                Certifications &amp; Achievements
              </h2>
              <p className="type-body text-base sm:text-lg text-[var(--text-secondary)] mt-3.5 leading-relaxed">
                Formal accreditations, international cybersecurity summits, academic recognitions, and collaborative technical hackathons.
              </p>
            </motion.div>

            {/* Telemetry Counter */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)] self-start lg:self-auto"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                <ShieldCheck size={14} />
                <span>
                  {counts.certifications > 0
                    ? `${counts.certifications} Certifications`
                    : 'Accreditation Gallery'}
                </span>
              </div>
              <span className="text-[var(--border-strong)]">|</span>
              <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <span>{credentialsData.length} Documented Milestones</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Filter Tabs Bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center gap-2 p-2 sm:p-2.5 rounded-[var(--radius-xl)] border border-[var(--border)]"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`filter-pill ${activeTab === 'all' ? 'filter-pill-active' : ''}`}
          >
            All Milestones ({credentialsData.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certification')}
            className={`filter-pill ${activeTab === 'certification' ? 'filter-pill-active' : ''}`}
          >
            Certifications ({counts.certifications})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conference')}
            className={`filter-pill ${activeTab === 'conference' ? 'filter-pill-active' : ''}`}
          >
            Conferences ({counts.conferences})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hackathon')}
            className={`filter-pill ${activeTab === 'hackathon' ? 'filter-pill-active' : ''}`}
          >
            Hackathons ({counts.hackathons})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievement')}
            className={`filter-pill ${activeTab === 'achievement' ? 'filter-pill-active' : ''}`}
          >
            Academic Specialization
          </button>
        </motion.div>

        <Divider className="mb-14" />

        {/* ── Main Gallery Grid OR Elegant Empty State ── */}
        {filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5% 0px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const CategoryIcon = categoryIcons[item.type]
                const typeLabel = categoryLabels[item.type]

                return (
                  <motion.div
                    key={item.id}
                    layout={!shouldReduceMotion}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-300 flex flex-col justify-between group"
                    style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-md)' }}
                  >
                    <div>
                      {/* Top Header: Category Tag & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span
                          className={`font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                            item.type === 'certification'
                              ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]'
                              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
                          }`}
                        >
                          [ {typeLabel} ]
                        </span>

                        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-tertiary)]">
                          <Calendar size={12} className="text-[var(--accent)]" />
                          <span>{item.issueDate}</span>
                        </div>
                      </div>

                      {/* Title & Issuer */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-[1.25]">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] mt-1.5">
                            <span className="font-semibold text-emerald-500 dark:text-emerald-400">{item.issuer}</span>
                            {item.location && (
                              <>
                                <span>·</span>
                                <span className="text-[var(--text-tertiary)] flex items-center gap-1">
                                  <MapPin size={11} />
                                  <span>{item.location}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div
                          className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-[var(--accent)] shrink-0"
                          style={{ background: 'var(--bg-elevated)' }}
                        >
                          <CategoryIcon size={18} />
                        </div>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="type-body-sm text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-5">
                          {item.description}
                        </p>
                      )}

                      {/* Skills Chips */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="tech-badge"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                      {item.credentialId ? (
                        <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                          <span>ID: {item.credentialId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyId(item.credentialId!)}
                            className="hover:text-[var(--text-primary)] cursor-pointer"
                            title="Copy Credential ID"
                          >
                            {copiedId === item.credentialId ? (
                              <Check size={11} className="text-emerald-400" />
                            ) : (
                              <Copy size={11} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[var(--text-tertiary)]">
                          Verified Engagement
                        </span>
                      )}

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveModalItem(item)}
                          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                        >
                          <FileCheck size={13} className="text-[var(--accent)]" />
                          <span>Inspect</span>
                        </button>

                        {item.verificationUrl && (
                          <a
                            href={item.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline cursor-pointer font-semibold"
                          >
                            <span>Verify ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── Elegant Editorial Empty State (When Certifications is empty) ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="p-8 sm:p-12 rounded-[var(--radius-2xl)] border border-[var(--border)] text-center relative overflow-hidden"
            style={{
              background: 'color-mix(in srgb, var(--bg-card) 70%, transparent)',
            }}
          >
            {/* Top Reticle Glow */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
              style={{ opacity: 0.8 }}
            />

            <div className="max-w-lg mx-auto space-y-4">
              <div
                className="w-12 h-12 mx-auto rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--accent)]"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <ShieldCheck size={24} />
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  // VAULT DIRECTORY: PENDING VERIFICATION
                </span>
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mt-1">
                  Certifications in Progress
                </h3>
              </div>

              <p className="type-body-sm text-sm text-[var(--text-secondary)] leading-relaxed">
                Formal cybersecurity industry accreditations and verified certificates will be published here with verifiable digital credential IDs upon official completion.
              </p>

              {/* Developer Configuration Note */}
              <div
                className="p-3.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] text-left"
                style={{ background: 'var(--bg-card)' }}
              >
                <span className="text-[var(--accent)] font-bold block mb-1">
                  // HOW TO ADD CERTIFICATIONS:
                </span>
                <span>
                  Open <code className="text-[var(--text-primary)]">src/data/credentials.ts</code> and add your certified credential object to <code className="text-[var(--text-primary)]">credentialsData</code>. The gallery updates automatically!
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="px-4 py-2 rounded-full border border-[var(--border)] font-mono text-xs text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                >
                  ← View All Confirmed Engagements &amp; Summits
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>

      {/* ── Expandable Credential Details Modal ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)] shadow-2xl z-10 space-y-6"
              style={{ background: 'var(--bg-card)' }}
              role="dialog"
              aria-modal="true"
              aria-label={activeModalItem.title}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[var(--accent)] font-bold">
                    // CREDENTIAL DOSSIER
                  </span>
                  <span className="text-[var(--text-tertiary)]">
                    [{categoryLabels[activeModalItem.type]}]
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  {activeModalItem.title}
                </h3>
                <p className="font-mono text-xs text-emerald-400 mt-1">
                  Issued by: {activeModalItem.issuer} · {activeModalItem.issueDate}
                </p>
              </div>

              {/* Certificate Preview Frame (Architectural / Editorial) */}
              <div
                className="w-full p-6 rounded-[var(--radius-lg)] border border-[var(--border-strong)] text-center space-y-3 relative overflow-hidden"
                style={{
                  background: 'color-mix(in srgb, var(--bg-elevated) 80%, transparent)',
                }}
              >
                <div className="w-10 h-10 mx-auto rounded-full border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)]">
                  <ShieldCheck size={20} />
                </div>
                <div className="font-display font-bold text-base text-[var(--text-primary)]">
                  Official Verification Dossier
                </div>
                <p className="font-mono text-[11px] text-[var(--text-tertiary)]">
                  Documented under Rahman Fayid PM // Systems &amp; Cyber Defense
                </p>
                {activeModalItem.credentialId && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)] font-mono text-xs text-[var(--accent)]">
                    <span>ID: {activeModalItem.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {activeModalItem.description && (
                <p className="type-body-sm text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activeModalItem.description}
                </p>
              )}

              {/* Competencies */}
              {activeModalItem.skills && activeModalItem.skills.length > 0 && (
                <div>
                  <span className="font-mono text-xs uppercase text-[var(--text-tertiary)] font-semibold block mb-2">
                    Skills &amp; Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalItem.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                {activeModalItem.verificationUrl ? (
                  <a
                    href={activeModalItem.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    <span>Verify Authenticity</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    Academic / Event Record
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
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
