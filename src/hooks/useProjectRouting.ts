import { useState, useEffect, useCallback } from 'react'
import { getProjectBySlug, getAdjacentProjects, type ProjectItem } from '@data/projects'

function parseProjectFromUrl(): ProjectItem | null {
  if (typeof window === 'undefined') return null

  // 1. Check query parameter: ?project=slug
  const searchParams = new URLSearchParams(window.location.search)
  const querySlug = searchParams.get('project')
  if (querySlug) {
    const found = getProjectBySlug(querySlug)
    if (found) return found
  }

  // 2. Check hash parameter: #project/slug or #project=slug
  const hash = window.location.hash
  if (hash.includes('project')) {
    const match = hash.match(/project[=/]([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      const found = getProjectBySlug(match[1])
      if (found) return found
    }
  }

  return null
}

export function useProjectRouting() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(() => parseProjectFromUrl())

  // Synchronize on browser Back/Forward (popstate & hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      const project = parseProjectFromUrl()
      setActiveProject(project)
    }

    window.addEventListener('popstate', handleUrlChange)
    window.addEventListener('hashchange', handleUrlChange)

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
      window.removeEventListener('hashchange', handleUrlChange)
    }
  }, [])

  const openProject = useCallback((slug: string) => {
    const project = getProjectBySlug(slug)
    if (!project) return

    setActiveProject(project)
    try {
      const newUrl = `${window.location.pathname}?project=${project.slug}`
      window.history.pushState({ project: project.slug }, '', newUrl)
    } catch {
      // Fallback to hash if pushState fails
      window.location.hash = `project/${project.slug}`
    }
  }, [])

  const closeProject = useCallback(() => {
    setActiveProject(null)
    try {
      // Revert to main page at #projects anchor
      const cleanUrl = `${window.location.pathname}#projects`
      window.history.pushState(null, '', cleanUrl)
    } catch {
      window.location.hash = 'projects'
    }
  }, [])

  const adjacent = activeProject ? getAdjacentProjects(activeProject.slug) : null

  return {
    activeProject,
    openProject,
    closeProject,
    adjacent,
  }
}
