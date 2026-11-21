import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Calendar,
  MapPin,
  ChevronDown,
  Shield,
  Search,
  CheckCircle2,
  Terminal,
  Award,
  Users,
  Sparkles,
  Filter,
} from 'lucide-react'
import { experiences, activities, type Experience, type Activity } from '@data/portfolio'
import { SectionLabel, Divider } from '@components/ui'
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from '@utils/animations'
import { useReducedMotion } from '@hooks/useReducedMotion'

type FilterCategory = 'all' | 'internships' | 'activities'
type FilterYear = 'all' | '2026' | '2025' | '2024'

interface UnifiedTimelineItem {
  id: string
  kind: 'internship' | 'activity'
  year: string
  period: string
  title: string
  subtitle: string
  badgeLabel: string
  badgeType: 'internship' | 'hackathon' | 'conference' | 'volunteering'
  location?: string | undefined
  description: string
  exposure?: string[] | undefined
  technologies?: string[] | undefined
  tags: string[]
  category: string
  icon: typeof Shield
}

export function Experience() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
  const [selectedYear, setSelectedYear] = useState<FilterYear>('all')

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  })
  const timelineHeight = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    restDelta: 0.001,
  })

  // Track expanded state for detailed exposure dossiers
  // Default first internship (Cyber Crime Police Station) open for immediate depth
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-cyber-police': true,
  })

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Combine experiences and activities into a unified chronological stream
  const unifiedItems: UnifiedTimelineItem[] = useMemo(() => {
    const list: UnifiedTimelineItem[] = []

    // 1. Map Internships (Explicitly tagged)
    experiences.forEach((exp: Experience) => {
      list.push({
        id: exp.id,
        kind: 'internship',
        year: exp.year,
        period: exp.period,
        title: exp.role,
        subtitle: exp.company,
        badgeLabel: 'INTERNSHIP',
        badgeType: 'internship',
        location: exp.location,
        description: exp.description,
        exposure: exp.exposure,
        technologies: exp.technologies,
        tags: exp.tags,
        category: exp.category,
        icon: exp.id === 'exp-cyber-police' ? Search : Shield,
      })
    })

    // 2. Map Activities
    activities.forEach((act: Activity) => {
      let icon = Sparkles
      let bType: 'hackathon' | 'conference' | 'volunteering' = 'conference'

      if (act.category === 'Hackathon') {
        icon = Award
        bType = 'hackathon'
      } else if (act.category === 'Volunteering') {
        icon = Users
        bType = 'volunteering'
      }

      list.push({
        id: act.id,
        kind: 'activity',
        year: act.year.includes('2025') ? '2025' : act.year,
        period: act.period,
        title: act.title,
        subtitle: act.role,
        badgeLabel: act.category.toUpperCase(),
        badgeType: bType,
        location: act.location,
        description: act.description,
        tags: act.tags,
        category: act.category,
        icon,
      })
    })

    // Order: 2026 -> 2025 -> 2024
    return list.sort((a, b) => {
      const yearA = parseInt(a.year.slice(0, 4), 10) || 0
      const yearB = parseInt(b.year.slice(0, 4), 10) || 0
      return yearB - yearA
    })
  }, [])

  // Filter items by category and year
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      // Category filter
      if (selectedCategory === 'internships' && item.kind !== 'internship') return false
      if (selectedCategory === 'activities' && item.kind !== 'activity') return false

      // Year filter
      if (selectedYear !== 'all') {
        if (!item.year.includes(selectedYear) && !item.period.includes(selectedYear)) {
          return false
        }
      }
      return true
    })
  }, [unifiedItems, selectedCategory, selectedYear])

  return (
    <section
      id="experience"
      data-section="experience"
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
            <SectionLabel className="mb-2.5">04 // Trajectory &amp; Fieldwork</SectionLabel>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2
                className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] leading-[1.2]"
              >
                Experience &amp; Activities
              </h2>
              <p
                className="type-body text-base sm:text-lg text-[var(--text-secondary)] mt-3.5 leading-relaxed"
              >
                Practical cybersecurity internships, law enforcement digital investigation exposure, and active participation across international cyber conferences and hackathons.
              </p>
            </motion.div>

            {/* Trajectory Highlights Pill */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3.5 rounded-[var(--radius-lg)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)] self-start lg:self-auto"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                <Shield size={14} />
                <span>2 Field Internships</span>
              </div>
              <span className="text-[var(--border-strong)]">|</span>
              <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                <Award size={14} />
                <span>3 Key Engagements</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Date & Category Navigation Controls ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 sm:p-2.5 rounded-[var(--radius-xl)] border border-[var(--border)]"
          style={{ background: 'var(--bg-elevated)' }}
        >
          {/* Primary View Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`filter-pill ${selectedCategory === 'all' ? 'filter-pill-active' : ''}`}
            >
              All Records ({unifiedItems.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('internships')}
              className={`filter-pill ${selectedCategory === 'internships' ? 'filter-pill-active' : ''}`}
            >
              Internships (2)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('activities')}
              className={`filter-pill ${selectedCategory === 'activities' ? 'filter-pill-active' : ''}`}
            >
              Activities &amp; Summits (3)
            </button>
          </div>

          {/* Date-Based Navigation Pills */}
          <div className="flex items-center gap-1.5 border-t md:border-t-0 md:border-l border-[var(--border)] pt-2 md:pt-0 md:pl-3">
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase flex items-center gap-1 mr-1">
              <Filter size={11} />
              <span>Year:</span>
            </span>

            {(['all', '2026', '2025', '2024'] as FilterYear[]).map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'border border-[var(--accent-border)] bg-[var(--accent-subtle)] text-[var(--accent)] font-bold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                }`}
              >
                {yr === 'all' ? 'All' : yr}
              </button>
            ))}
          </div>
        </motion.div>

        <Divider className="mb-14" />

        {/* ── Vertical Timeline Track ── */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 md:pl-12">
          {/* Subtle Animated Axis Line with Scroll Progression */}
          <div
            className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-4 bottom-8 w-[2px] rounded-full overflow-hidden bg-[var(--border)]"
          >
            {/* Real-time scroll progression tracking beam */}
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--accent)] via-blue-400 to-indigo-500 origin-top shadow-[0_0_12px_var(--accent-glow)]"
              style={{
                height: '100%',
                scaleY: shouldReduceMotion ? 1 : timelineHeight,
              }}
            />
          </div>

          {/* Timeline Items List */}
          <motion.div
            className="space-y-10 sm:space-y-12"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5% 0px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isExpanded = !!expandedIds[item.id]
                const IconComponent = item.icon

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="relative group"
                  >
                    {/* Milestone Hub Reticle on the Timeline Axis */}
                    <div
                      className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] top-6 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] group-hover:border-[var(--accent)] transition-all duration-300 shadow-sm"
                      style={{
                        boxShadow: '0 0 0 4px var(--bg-primary)',
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{
                          background:
                            item.kind === 'internship'
                              ? 'var(--accent)'
                              : 'var(--text-tertiary)',
                          boxShadow:
                            item.kind === 'internship'
                              ? '0 0 10px var(--accent-glow)'
                              : 'none',
                        }}
                      />
                    </div>

                    {/* Timeline Item Card */}
                    <div
                      className="rounded-[var(--radius-xl)] border border-[var(--border)] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--border-strong)]"
                      style={{
                        background: 'var(--bg-card)',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    >
                      {/* Top Meta Header: Year, Duration, Category & Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* Duration / Period */}
                          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] font-semibold">
                            <Calendar size={13} />
                            <span>{item.period}</span>
                          </div>

                          <span className="text-[var(--text-tertiary)]">·</span>

                          {/* Location */}
                          {item.location && (
                            <div className="flex items-center gap-1 font-mono text-xs text-[var(--text-tertiary)]">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Explicit Non-Full-Time Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                              item.kind === 'internship'
                                ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]'
                                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
                            }`}
                          >
                            [ {item.badgeLabel} ]
                          </span>
                        </div>
                      </div>

                      {/* Main Title & Organization */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-[1.25]">
                              {item.title}
                            </h3>
                            <p className="font-mono text-sm sm:text-base text-[var(--text-secondary)] font-medium mt-1.5">
                              {item.subtitle}
                            </p>
                          </div>

                          <div
                            className="hidden sm:flex p-2.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-[var(--accent)]"
                            style={{ background: 'var(--bg-elevated)' }}
                          >
                            <IconComponent size={20} />
                          </div>
                        </div>
                      </div>

                      {/* Summary Description */}
                      <p className="type-body-sm text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Quick Tag Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tech-badge"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* ── Expandable Exposure & Technologies (For Internships) ── */}
                      {item.kind === 'internship' && item.exposure && (
                        <div className="border-t border-[var(--border)] pt-5">
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            className="w-full flex items-center justify-between gap-2 py-2 px-3 sm:px-4 rounded-[var(--radius-md)] border border-[var(--border)] hover:border-[var(--accent-border)] text-left transition-all cursor-pointer"
                            style={{ background: 'var(--bg-elevated)' }}
                            aria-expanded={isExpanded}
                            aria-label={`Toggle detailed exposure for ${item.title}`}
                          >
                            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] font-semibold">
                              <Terminal size={14} className="text-[var(--accent)]" />
                              <span>
                                {isExpanded
                                  ? 'Collapse Investigation & Exposure Dossier'
                                  : 'Explore Key Exposure & Applied Tooling'}
                              </span>
                            </div>

                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="text-[var(--accent)]"
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                key="dossier-content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 space-y-6">
                                  {/* Detailed Exposure Points */}
                                  <div>
                                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold mb-3 flex items-center gap-2">
                                      <span>// Operational Exposure &amp; Tasks</span>
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                      {item.exposure.map((expPoint, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)]"
                                          style={{ background: 'var(--bg-card)' }}
                                        >
                                          <CheckCircle2
                                            size={14}
                                            className="text-[var(--accent)] shrink-0 mt-0.5"
                                          />
                                          <span className="text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                                            {expPoint}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Technologies & Software Stack */}
                                  {item.technologies && item.technologies.length > 0 && (
                                    <div>
                                      <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold mb-3">
                                        // Tooling &amp; Technical Environment
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {item.technologies.map((tech) => (
                                          <span
                                            key={tech}
                                            className="tech-badge tech-badge-accent"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Clarification Note confirming Educational Internship nature */}
                                  <div
                                    className="p-3.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] flex items-center gap-2"
                                    style={{ background: 'var(--bg-elevated)' }}
                                  >
                                    <span className="text-[var(--accent)] font-bold">NOTE:</span>
                                    <span>
                                      Completed as a specialized practical internship focused on core security procedures, digital forensics, and investigative methodologies.
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>
    </section>
  )
}
