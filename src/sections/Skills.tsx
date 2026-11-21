import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Network,
  Terminal,
  Code2,
  Wrench,
  Sparkles,
  Search,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Info,
} from 'lucide-react'
import {
  skillCategories,
  allSkills,
  getSkillById,
  type SkillItem,
  type SkillCategory,
} from '@data/skills'
import { SectionLabel, Divider } from '@components/ui'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@utils/animations'

const categoryIcons = {
  security: Shield,
  networking: Network,
  systems: Terminal,
  development: Code2,
  tools: Wrench,
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Default active skill to 'web-security' or first skill
  const [selectedSkillId, setSelectedSkillId] = useState<string>('web-security')
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)

  // Active skill being inspected is either hovered or selected
  const inspectedSkill: SkillItem = useMemo(() => {
    const activeId = hoveredSkillId || selectedSkillId
    const found = getSkillById(activeId)
    if (found) return found
    return allSkills[0] as SkillItem
  }, [hoveredSkillId, selectedSkillId])

  // Set of skills related to the current inspected skill
  const relatedSkillIdSet = useMemo(() => {
    return new Set(inspectedSkill.relatedSkillIds)
  }, [inspectedSkill])

  // Filtered categories and skills
  const filteredCategories: SkillCategory[] = useMemo(() => {
    return skillCategories
      .map((cat) => {
        // If specific category selected and doesn't match, return empty
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null
        }

        // Search query filter
        if (!searchQuery.trim()) return cat

        const query = searchQuery.toLowerCase().trim()
        const matchingSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.context.toLowerCase().includes(query) ||
            s.applications.some((app) => app.toLowerCase().includes(query))
        )

        if (matchingSkills.length === 0) return null

        return {
          ...cat,
          skills: matchingSkills,
        }
      })
      .filter((cat): cat is SkillCategory => cat !== null)
  }, [activeCategory, searchQuery])

  return (
    <section
      id="skills"
      data-section="skills"
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
            <SectionLabel className="mb-2.5">02 // Technical Ecosystem</SectionLabel>
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
                Skills &amp; Capabilities
              </h2>
              <p className="type-body text-base sm:text-lg text-[var(--text-secondary)] mt-3 leading-relaxed">
                An interconnected technical ecosystem spanning defensive security, network traffic analysis, systems administration, Python engineering, and telemetry tooling.
              </p>
            </motion.div>

            {/* Practical Focus Highlight */}
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
                <span>Ecosystem Model</span>
              </div>
              <span className="text-[var(--border-strong)]">|</span>
              <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <span>{allSkills.length} Verified Capabilities</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Filter & Search Controls ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 rounded-[var(--radius-xl)] border border-[var(--border)]"
          style={{ background: 'var(--bg-elevated)' }}
        >
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`filter-pill ${activeCategory === 'all' ? 'filter-pill-active' : ''}`}
            >
              All Clusters ({allSkills.length})
            </button>

            {skillCategories.map((cat) => {
              const Icon = categoryIcons[cat.id]
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`filter-pill ${activeCategory === cat.id ? 'filter-pill-active' : ''}`}
                >
                  <Icon size={12} />
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-auto md:min-w-[220px]">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter capabilities..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        <Divider className="mb-8" />

        {/* ── Main Two-Column Ecosystem: Clusters Grid + Live Skill Inspector ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Skill Clusters (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              className="space-y-6"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-5% 0px' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((cat) => {
                  const Icon = categoryIcons[cat.id]

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="p-5 sm:p-6 rounded-[var(--radius-xl)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-300"
                      style={{ background: 'var(--bg-card)' }}
                    >
                      {/* Cluster Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="p-2 rounded-lg border border-[var(--border)] text-[var(--accent)]"
                            style={{ background: 'var(--bg-elevated)' }}
                          >
                            <Icon size={16} />
                          </div>
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                              // {cat.index} CLUSTER
                            </span>
                            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] leading-tight">
                              {cat.name}
                            </h3>
                          </div>
                        </div>

                        <span className="font-mono text-[11px] text-[var(--text-tertiary)]">
                          {cat.skills.length} nodes
                        </span>
                      </div>

                      <p className="type-body-sm text-xs text-[var(--text-secondary)] mb-4">
                        {cat.tagline}
                      </p>

                      {/* Interactive Skill Tags Cluster */}
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => {
                          const isSelected = skill.id === inspectedSkill.id
                          const isRelated = relatedSkillIdSet.has(skill.id)

                          return (
                            <button
                              key={skill.id}
                              type="button"
                              onClick={() => setSelectedSkillId(skill.id)}
                              onMouseEnter={() => setHoveredSkillId(skill.id)}
                              onMouseLeave={() => setHoveredSkillId(null)}
                              onFocus={() => setSelectedSkillId(skill.id)}
                              aria-pressed={isSelected}
                              aria-label={`Inspect ${skill.name} capability`}
                              className={`relative px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-mono transition-all duration-200 cursor-pointer text-left border ${
                                isSelected
                                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] font-bold'
                                  : isRelated
                                  ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)] font-semibold shadow-sm'
                                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                {isRelated && !isSelected && (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"
                                    title="Connected companion skill"
                                  />
                                )}
                                <span>{skill.name}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {filteredCategories.length === 0 && (
                <div
                  className="p-8 rounded-[var(--radius-xl)] border border-[var(--border)] text-center text-xs font-mono text-[var(--text-tertiary)]"
                  style={{ background: 'var(--bg-card)' }}
                >
                  No capabilities match your query &quot;{searchQuery}&quot;. Try a different keyword or reset filters.
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Sticky Live Skill Inspector Dossier (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 z-20">
            <div
              className="p-5 sm:p-6 rounded-[var(--radius-xl)] border border-[var(--border)] shadow-xl relative overflow-hidden max-h-[calc(100vh-8.5rem)] overflow-y-auto"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Top Reticle Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                style={{ opacity: 0.9 }}
              />

              {/* Header Telemetry */}
              <div className="flex items-center justify-between gap-2 mb-3 font-mono text-xs text-[var(--text-tertiary)]">
                <div className="flex items-center gap-1.5 text-[var(--accent)]">
                  <Sliders size={13} />
                  <span className="uppercase tracking-wider font-semibold">
                    // Capability Dossier
                  </span>
                </div>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-elevated)]">
                  {inspectedSkill.categoryId}
                </span>
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  {inspectedSkill.name}
                </h3>
              </div>

              {/* Context Description */}
              <div
                className="p-3.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] mb-4"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] mb-1.5 font-semibold">
                  <Info size={13} />
                  <span>Practical Context</span>
                </div>
                <p className="type-body-sm text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {inspectedSkill.context}
                </p>
              </div>

              {/* Operational Applications */}
              <div className="mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold block mb-2">
                  // Applied Workflows &amp; Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedSkill.applications.map((app) => (
                    <div
                      key={app}
                      className="tech-badge"
                    >
                      <CheckCircle2 size={12} className="text-[var(--accent)]" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Companion Skills */}
              {inspectedSkill.relatedSkillIds.length > 0 && (
                <div className="pt-3.5 border-t border-[var(--border)]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold block mb-2">
                    // Connected Ecosystem Nodes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectedSkill.relatedSkillIds.map((relId) => {
                      const relSkill = getSkillById(relId)
                      if (!relSkill) return null

                      return (
                        <button
                          key={relId}
                          type="button"
                          onClick={() => {
                            setSelectedSkillId(relId)
                            setHoveredSkillId(null)
                          }}
                          className="tech-badge hover:border-[var(--accent-border)] hover:text-[var(--accent)] cursor-pointer"
                          aria-label={`Jump to companion capability ${relSkill.name}`}
                        >
                          <span>{relSkill.name}</span>
                          <ArrowRight size={10} className="text-[var(--accent)]" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Grounded Notice: No Arbitrary Percentages */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
                <span>Ecosystem Mapping</span>
                <span className="text-[var(--accent)] font-semibold">Zero Vanity % Bars</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>
    </section>
  )
}
