import { useState, useEffect, useCallback } from 'react'

const DEFAULT_SECTIONS = ['home', 'about', 'projects', 'experience', 'labs', 'contact']

interface UseActiveSectionOptions {
  sectionIds?: string[]
  offset?: number
}

export function useActiveSection({
  sectionIds = DEFAULT_SECTIONS,
  offset = 110,
}: UseActiveSectionOptions = {}) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home')

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const docHeight = document.documentElement.scrollHeight

        // Top of page check
        if (scrollY < 100) {
          setActiveSection(sectionIds[0] || 'home')
          ticking = false
          return
        }

        // Bottom of page check
        if (windowHeight + scrollY >= docHeight - 80) {
          setActiveSection(sectionIds[sectionIds.length - 1] || 'contact')
          ticking = false
          return
        }

        // Mid-page intersection
        const triggerPoint = scrollY + offset
        let current = sectionIds[0] || 'home'

        for (const id of sectionIds) {
          // Allow fallback for sections that might use alternate IDs
          const el = document.getElementById(id) || (id === 'home' ? document.getElementById('hero') : null) || (id === 'projects' ? document.getElementById('work') : null)
          if (!el) continue

          const top = el.offsetTop
          const height = el.offsetHeight

          if (triggerPoint >= top && triggerPoint < top + height) {
            current = id
            break
          } else if (triggerPoint >= top) {
            current = id
          }
        }

        setActiveSection(current)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  const scrollToSection = useCallback((id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      try {
        window.history.pushState(null, '', '#home')
      } catch {}
      return
    }

    const target = document.getElementById(id) || (id === 'projects' ? document.getElementById('work') : null)
    if (!target) return

    const headerOffset = 110
    const elementPosition = target.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    })

    try {
      window.history.pushState(null, '', `#${id}`)
    } catch {
      // Ignore in restricted environments
    }
  }, [])

  return { activeSection, scrollToSection }
}
