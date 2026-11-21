import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { type ProjectItem, getAdjacentProjects } from '@data/projects'
import { ProjectVisualArtwork } from '@components/ProjectVisualArtworks'
import { EASE_OUT_EXPO } from '@utils/animations'

interface ProjectDetailOverlayProps {
  project: ProjectItem | null
  onClose: () => void
  onNavigate: (slug: string) => void
}

export function ProjectDetailOverlay({
  project,
  onClose,
  onNavigate,
}: ProjectDetailOverlayProps) {
  // Lock body scroll while project overlay is visible
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  // Keyboard navigation: Escape to close, Left/Right arrows for adjacent projects
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        const { prev } = getAdjacentProjects(project.slug)
        onNavigate(prev.slug)
      } else if (e.key === 'ArrowRight') {
        const { next } = getAdjacentProjects(project.slug)
        onNavigate(next.slug)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose, onNavigate])

  if (!project) return null

  const { prev, next } = getAdjacentProjects(project.slug)

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} Dossier`}
        className="fixed inset-0 z-[95] overflow-y-auto select-none"
        style={{
          background: 'var(--bg-primary)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      >
        {/* ── Fixed Floating Top Control Bar ── */}
        <header
          className="sticky top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 border-b border-[var(--border)] backdrop-blur-xl"
          style={{
            background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-[var(--border)] hover:border-[var(--border-strong)]"
              style={{ background: 'var(--bg-elevated)' }}
              aria-label="Back to projects list"
            >
              <ArrowLeft size={14} className="text-[var(--accent)]" />
              <span>Back to Projects</span>
              <span className="hidden sm:inline-block text-[10px] text-[var(--text-tertiary)] ml-1 font-mono">
                [ESC]
              </span>
            </button>

            {/* Pagination & Deep-Link Index */}
            <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs text-[var(--text-tertiary)]">
              <span className="text-[var(--accent)] font-semibold hidden md:inline">
                // {project.index} OF 04
              </span>

              {/* Prev / Next Mini Navigation */}
              <div className="flex items-center gap-1 border border-[var(--border)] rounded-full p-1" style={{ background: 'var(--bg-elevated)' }}>
                <button
                  type="button"
                  onClick={() => onNavigate(prev.slug)}
                  title={`Previous: ${prev.name}`}
                  className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                  aria-label="Navigate to previous project"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[10px] px-1.5 text-[var(--text-tertiary)]">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate(next.slug)}
                  title={`Next: ${next.name}`}
                  className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                  aria-label="Navigate to next project"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Direct GitHub Link */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm inline-flex items-center gap-1.5 text-xs"
                style={{
                  background: 'var(--accent)',
                  color: '#ffffff',
                }}
              >
                <FolderGit2 size={13} />
                <span className="hidden sm:inline">GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </header>

        {/* ── Main Editorial Content Body ── */}
        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">

          {/* 1. Header Metadata & Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-[var(--accent)]">
                // PROJECT {project.index}
              </span>
              <span
                className="type-label text-[10px] px-3 py-1 rounded-full border border-[var(--border)] uppercase"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs text-[var(--text-tertiary)]">
                {project.year}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.05]">
              {project.name}
            </h1>

            <p className="type-body-lg text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl pt-2">
              {project.shortDescription}
            </p>
          </div>

          {/* 2. Full-Width Visual Artwork Showcase */}
          <div className="w-full rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border)] shadow-2xl">
            <ProjectVisualArtwork slug={project.slug} />
          </div>

          {/* 3. Overview Box */}
          <div
            className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)]"
            style={{ background: 'var(--bg-card)' }}
          >
            <span className="type-label text-[11px] uppercase font-mono tracking-wider text-[var(--accent)] block mb-3">
              01 // Project Overview
            </span>
            <p className="type-body text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* 4. Problem Addressed & Engineering Approach (Two-Column Editorial) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Problem Addressed */}
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)] flex flex-col justify-between"
              style={{ background: 'var(--bg-card)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4 text-[var(--accent)]">
                  <ShieldCheck size={18} />
                  <span className="type-label font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                    02 // Problem Addressed
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                  The Operational Need
                </h3>
                <p className="type-body-sm text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.problemAddressed}
                </p>
              </div>
            </div>

            {/* Approach */}
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)] flex flex-col justify-between"
              style={{ background: 'var(--bg-card)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4 text-[var(--accent)]">
                  <Terminal size={18} />
                  <span className="type-label font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                    03 // Technical Approach
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                  Engineering Solution
                </h3>
                <p className="type-body-sm text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.approach}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Key Features Breakdown */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 size={18} className="text-[var(--accent)]" />
                <span className="type-label font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  04 // Verified Capabilities &amp; Features
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)]"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] mt-0.5">
                      {idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-[var(--text-primary)] leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Technologies Used */}
          <div
            className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)]"
            style={{ background: 'var(--bg-card)' }}
          >
            <span className="type-label font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] block mb-4">
              05 // Technology Stack &amp; Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="tech-badge tech-badge-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Challenges & Learning Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Challenges */}
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <span className="type-label font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] block mb-3">
                06 // Technical Challenges
              </span>
              <p className="type-body-sm text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* What I Learned */}
            <div
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--border)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <span className="type-label font-mono text-[11px] uppercase tracking-wider text-emerald-400 block mb-3">
                07 // Learning Outcomes &amp; Growth
              </span>
              <p className="type-body-sm text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.whatILearned}
              </p>
            </div>
          </div>

          {/* 8. Bottom Navigation: Adjacent Project Cards & Back */}
          <div className="pt-10 border-t border-[var(--border)] space-y-8">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
              <span>EXPLORE ADJACENT PROJECTS</span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Back to All Projects ↑
              </button>
            </div>

            {/* Previous & Next Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Previous Project Card */}
              <button
                type="button"
                onClick={() => onNavigate(prev.slug)}
                className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all text-left group cursor-pointer"
                style={{ background: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] mb-2">
                  <ArrowLeft size={13} className="text-[var(--accent)] transition-transform group-hover:-translate-x-1" />
                  <span>PREVIOUS PROJECT // {prev.index}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {prev.name}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">
                  {prev.category}
                </p>
              </button>

              {/* Next Project Card */}
              <button
                type="button"
                onClick={() => onNavigate(next.slug)}
                className="p-6 rounded-[var(--radius-xl)] border border-[var(--border)] hover:border-[var(--accent-border)] transition-all text-right group cursor-pointer"
                style={{ background: 'var(--bg-card)' }}
              >
                <div className="flex items-center justify-end gap-2 text-xs font-mono text-[var(--text-tertiary)] mb-2">
                  <span>NEXT PROJECT // {next.index}</span>
                  <ArrowRight size={13} className="text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                </div>
                <h4 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {next.name}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">
                  {next.category}
                </p>
              </button>
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}
