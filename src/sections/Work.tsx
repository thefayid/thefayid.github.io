import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderGit2, Info, Terminal } from 'lucide-react'
import { projectsData, type ProjectItem } from '@data/projects'
import { Reveal, SectionLabel } from '@components/ui'
import { ProjectDetailOverlay } from '@components/ProjectDetailOverlay'
import { ProjectVisualArtwork } from '@components/ProjectVisualArtworks'
import { useProjectRouting } from '@hooks/useProjectRouting'
import { fadeUp, EASE_OUT_EXPO } from '@utils/animations'

interface ProjectCardProps {
  project: ProjectItem
  idx: number
  openProject: (slug: string) => void
}

function ProjectCard({ project, idx, openProject }: ProjectCardProps) {
  const isEven = idx % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="project-card-item group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Artwork Showcase Column */}
        <div
          data-cursor="view"
          className={`lg:col-span-7 cursor-pointer ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
          onClick={() => openProject(project.slug)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-6% 0px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="transform transition-transform duration-500 group-hover:scale-[1.015]"
          >
            <ProjectVisualArtwork slug={project.slug} />
          </motion.div>
        </div>

        {/* Content & Details Column */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            {/* Project Number & Category Header */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-mono text-sm font-bold text-[var(--accent)] tracking-wider">
                // {project.index}
              </span>
              <span
                className="type-label text-[10px] px-3 py-1 rounded-full border border-[var(--border)] uppercase"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                }}
              >
                {project.category}
              </span>
              <span className="font-mono text-xs text-[var(--text-tertiary)] ml-auto">
                {project.year}
              </span>
            </div>

            {/* Project Title */}
            <h3
              onClick={() => openProject(project.slug)}
              className="font-display font-extrabold text-2xl sm:text-3xl lg:text-3xl text-[var(--text-primary)] leading-[1.2] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
            >
              {project.name}
            </h3>

            {/* Short Description */}
            <p className="type-body text-sm sm:text-base text-[var(--text-secondary)] mt-3.5 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="tech-badge"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Actions Row (Magnetic / Tactile) */}
          <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3.5">
            {/* Details / Dossier Trigger Button */}
            <motion.button
              type="button"
              onClick={() => openProject(project.slug)}
              className="btn btn-primary btn-md inline-flex items-center gap-2 cursor-pointer text-xs"
              style={{
                background: 'var(--accent)',
                color: '#ffffff',
                boxShadow: 'var(--glow-accent)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Info size={14} />
              <span>Inspect Dossier</span>
            </motion.button>

            {/* Direct GitHub Link */}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-md inline-flex items-center gap-2 cursor-pointer text-xs"
              aria-label={`Open ${project.name} repository on GitHub`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FolderGit2 size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={13} className="opacity-75" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Work() {
  const { activeProject, openProject, closeProject } = useProjectRouting()

  return (
    <>
      <section id="projects" data-section="projects" className="section-wrapper">
        {/* Subtle background ambient depth */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-40 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="container-site relative z-10">
          {/* ── Section Header ── */}
          <Reveal className="section-header-spacing flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel className="mb-2.5">03 // Featured Projects</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="type-display-md"
                style={{ color: 'var(--text-primary)' }}
              >
                Systems, Security &amp; AI
              </motion.h2>
            </div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)] pb-1">
              <Terminal size={14} className="text-[var(--accent)]" />
              <span>{projectsData.length} FLAGSHIP REPOSITORIES</span>
            </motion.div>
          </Reveal>

          {/* ── Large Featured Project Panels (Alternating Layouts) ── */}
          <div className="projects-showcase-list">
            {projectsData.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                openProject={openProject}
              />
            ))}
          </div>

          {/* Section End Chapter Divider */}
          <div className="section-divider" />
        </div>
      </section>

      {/* ── Full-Screen Editorial Project Detail Overlay with Deep-Link Support ── */}
      <ProjectDetailOverlay
        project={activeProject}
        onClose={closeProject}
        onNavigate={openProject}
      />
    </>
  )
}
