import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  FolderGit2,
} from 'lucide-react'
import { type ProjectItem } from '@data/projects'
import { EASE_OUT_EXPO } from '@utils/animations'

interface ProjectDetailModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Lock body scroll while modal is active
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

  // Escape key listener to close modal
  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} Project Details`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
        >
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 backdrop-blur-md"
            style={{ background: 'var(--overlay)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Card / Dossier Panel */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[var(--radius-2xl)] p-6 sm:p-8 md:p-10 z-10 shadow-2xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            {/* Top Bar: Category & Close */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                  // {project.index}
                </span>
                <span
                  className="type-label text-[10px] px-2.5 py-0.5 rounded-full border border-[var(--border)]"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                >
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[var(--text-tertiary)] hidden sm:inline">
                  {project.year}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="p-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Short Summary */}
            <div className="mt-6 mb-8">
              <h2 className="type-display-sm text-2xl sm:text-3xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
                {project.name}
              </h2>
              <p className="type-body mt-2 text-[var(--text-secondary)] leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Full Project Description */}
            <div
              className="p-5 rounded-[var(--radius-lg)] mb-8"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="type-label text-[10px] uppercase font-mono tracking-wider text-[var(--text-tertiary)] block mb-2">
                Project Overview
              </span>
              <p className="type-body-sm text-[var(--text-primary)] leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features Section */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="mb-8">
                <span className="type-label text-[10px] uppercase font-mono tracking-wider text-[var(--text-tertiary)] block mb-3">
                  Key Capabilities &amp; Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)]"
                      style={{ background: 'color-mix(in srgb, var(--bg-card) 60%, transparent)' }}
                    >
                      <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-xs text-[var(--text-secondary)] leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Grid */}
            <div className="mb-8">
              <span className="type-label text-[10px] uppercase font-mono tracking-wider text-[var(--text-tertiary)] block mb-3">
                Technologies &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-primary)]"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & What I Learned (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Challenges */}
              <div
                className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-subtle)]"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={14} className="text-[var(--accent)]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                    Engineering Challenge
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              {/* What I Learned */}
              <div
                className="p-4 rounded-[var(--radius-lg)] border border-[var(--border-subtle)]"
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={14} className="text-[var(--accent)]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                    What I Learned
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {project.whatILearned}
                </p>
              </div>
            </div>

            {/* Footer Actions: GitHub Link */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
                <FolderGit2 size={14} className="text-[var(--accent)]" />
                <span>Open Source Reference</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                    boxShadow: 'var(--glow-accent)',
                  }}
                >
                  <span>View Repository</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
