import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  CornerDownLeft,
  Trash2,
} from 'lucide-react'
import { siteConfig } from '@data/portfolio'
import { projectsData } from '@data/projects'
import { skillCategories } from '@data/skills'
import { experiences, activities } from '@data/portfolio'
import { securityLabsData } from '@data/labs'
import { credentialsData } from '@data/credentials'
import { EASE_OUT_EXPO } from '@utils/animations'

interface CommandEntry {
  id: string
  command: string
  timestamp: string
  output: React.ReactNode
  rawText?: string
}

const SUPPORTED_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'experience',
  'labs',
  'certs',
  'contact',
  'resume',
  'github',
  'linkedin',
  'instagram',
  'whoami',
  'ls',
  'clear',
] as const

const QUICK_COMMANDS = ['help', 'projects', 'skills', 'experience', 'labs', 'about', 'clear']

export function PortfolioTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [entries, setEntries] = useState<CommandEntry[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const execRef = useRef<(cmd: string) => void>(() => { })

  // Track if any full-page modal/overlay has locked body scroll
  const [isModalActive, setIsModalActive] = useState(false)
  useEffect(() => {
    const checkModal = () => {
      setIsModalActive(document.body.style.overflow === 'hidden')
    }
    checkModal()
    const observer = new MutationObserver(checkModal)
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
    return () => observer.disconnect()
  }, [])

  // Format current timestamp HH:MM:SS
  const getTimestamp = () => {
    const now = new Date()
    return now.toTimeString().split(' ')[0] || '12:00:00'
  }

  // Auto-scroll to bottom of terminal output
  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Delay focus slightly to let animation start
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, entries, scrollToBottom])

  // Global hotkey: backtick (`) to toggle terminal
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      // Don't trigger if user is typing in another input/textarea
      const activeEl = document.activeElement
      const isInput =
        activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement

      if (e.key === '`' && (!isInput || activeEl === inputRef.current)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [isOpen])

  // Execute safe simulated command
  const executeCommand = useCallback((cmdRaw: string) => {
    const trimmed = cmdRaw.trim()
    if (!trimmed) return

    const [cmd] = trimmed.split(' ')
    const commandLower = cmd?.toLowerCase() || ''
    const entryId = Math.random().toString(36).substring(2, 9)
    const time = getTimestamp()

    // Add to history
    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInputVal('')

    // Handle clear immediately
    if (commandLower === 'clear') {
      setEntries([])
      return
    }

    // Handle exit
    if (commandLower === 'exit' || commandLower === 'quit') {
      setIsOpen(false)
      return
    }

    let outputNode: React.ReactNode = null
    let rawText = ''

    switch (commandLower) {
      case 'help': {
        rawText = `FAYID TERMINAL // Available Commands:
  help        Show this command list
  about       Display biography and academic focus
  projects    List verified projects with repository links
  skills      Display categorized technical capabilities
  experience  Show cybersecurity internships & activities
  contact     Show email, social links & connectivity
  resume      Open / download PDF resume
  github      Navigate to GitHub profile (@thefayid)
  linkedin    Navigate to LinkedIn profile
  instagram   Navigate to Instagram profile (@fayid.7)
  whoami      Display current session identity
  ls          List simulated directory contents
  clear       Clear terminal output`

        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              FAYID TERMINAL // Available Commands
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[var(--text-secondary)]">
              <div>
                <span className="text-emerald-400 font-bold">about</span>
                <span className="text-[var(--text-tertiary)]"> — Bio &amp; academic focus</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">projects</span>
                <span className="text-[var(--text-tertiary)]"> — Verified projects list</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">skills</span>
                <span className="text-[var(--text-tertiary)]"> — Capability clusters</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">experience</span>
                <span className="text-[var(--text-tertiary)]"> — Fieldwork &amp; internships</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">labs</span>
                <span className="text-[var(--text-tertiary)]"> — Cybersecurity labs &amp; CTFs</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">contact</span>
                <span className="text-[var(--text-tertiary)]"> — Email &amp; social profiles</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">resume</span>
                <span className="text-[var(--text-tertiary)]"> — Open/download PDF resume</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">github</span>
                <span className="text-[var(--text-tertiary)]"> — Open GitHub (@thefayid)</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">linkedin</span>
                <span className="text-[var(--text-tertiary)]"> — Open LinkedIn profile</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">instagram</span>
                <span className="text-[var(--text-tertiary)]"> — Open Instagram (@fayid.7)</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">whoami</span>
                <span className="text-[var(--text-tertiary)]"> — Session user identity</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">ls</span>
                <span className="text-[var(--text-tertiary)]"> — Simulated file list</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">clear</span>
                <span className="text-[var(--text-tertiary)]"> — Clear terminal buffer</span>
              </div>
            </div>
            <div className="text-[11px] text-[var(--text-tertiary)] pt-1">
              Tip: Click quick commands below or press <kbd className="px-1 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]">Tab</kbd> for auto-completion.
            </div>
          </div>
        )
        break
      }

      case 'about': {
        rawText = `${siteConfig.name} (${siteConfig.alias})
Final-year BCA student specializing in Cyber Security. Passionate about technology, cybersecurity, networking, and Python programming.
Actively developing practical skills through Hack The Box and TryHackMe. Worked on wireless intrusion detection (AeroGuard), DevSecOps frameworks (PhoenixSec), AI assistants (NEO), and offline systems.`

        outputNode = (
          <div className="space-y-2 font-mono text-xs text-[var(--text-secondary)]">
            <div className="text-[var(--text-primary)] font-bold text-sm">
              {siteConfig.name} <span className="text-[var(--accent)]">({siteConfig.alias})</span>
            </div>
            <div className="text-emerald-400">
              Final-Year BCA (Cyber Security Specialization) · Systems &amp; Security
            </div>
            <p className="leading-relaxed">
              Passionate about technology, cybersecurity, networking, and Python programming. Actively developing practical skills through platforms like Hack The Box and TryHackMe, exploring hands-on security challenges and vulnerability mechanics.
            </p>
            <p className="leading-relaxed">
              Core interests span defensive tooling, wireless security, DevSecOps principles, SIEM telemetry, and applied AI. Currently focused on expanding technical knowledge and building impactful solutions.
            </p>
          </div>
        )
        break
      }

      case 'projects': {
        rawText = projectsData
          .map(
            (p) =>
              `[${p.index}] ${p.name} (${p.category})\n    ${p.shortDescription}\n    Stack: ${p.technologies.join(', ')}\n    URL: ${p.githubUrl}`
          )
          .join('\n\n')

        outputNode = (
          <div className="space-y-4 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Verified Projects ({projectsData.length})
            </div>
            <div className="space-y-3">
              {projectsData.map((p) => (
                <div
                  key={p.slug}
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <span className="text-[var(--accent)]">[{p.index}]</span>
                      <span>{p.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-tertiary)] uppercase">
                      {p.category}
                    </span>
                  </div>

                  <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                    {p.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-[10px] text-[var(--text-tertiary)]">
                      Stack: {p.technologies.join(', ')}
                    </div>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>repo ↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'skills': {
        rawText = skillCategories
          .map(
            (cat) =>
              `[${cat.index}] ${cat.name}:\n  ${cat.skills.map((s) => s.name).join(', ')}`
          )
          .join('\n\n')

        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Technical Skill Ecosystem (No Arbitrary % Bars)
            </div>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="text-emerald-400 font-bold">
                    [{cat.index}] {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pl-4">
                    {cat.skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] text-[11px]"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'experience': {
        rawText = `FIELD INTERNSHIPS:
1. Cyber Crime Intern — Cyber Crime Police Station, Kasaragod (22 July – 4 August 2026)
   Exposure: Investigation procedures, digital evidence analysis, case file study, activity tracing.
2. Cybersecurity Intern — Elevance Skill (2024)
   Exposure: SIEM ELK Stack, security monitoring, threat detection, log analysis, Python utilities.

ACTIVITIES:
- Smart India Hackathon: Internal college hackathon participant
- cOcOn: International Cybersecurity Conference attendee
- Summit of the Future: Volunteer (2024 & 2025)`

        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Field Internships &amp; Professional Activities
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text-primary)]">{exp.role}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-subtle)] font-bold">
                      [ INTERNSHIP ]
                    </span>
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    {exp.company} · {exp.period}
                  </div>
                  <p className="text-[var(--text-secondary)] text-[11px]">
                    {exp.description}
                  </p>
                </div>
              ))}

              <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1.5">
                <span className="text-[var(--text-primary)] font-bold">// Key Engagements:</span>
                <ul className="list-disc list-inside text-[var(--text-secondary)] text-[11px] space-y-0.5">
                  {activities.map((act) => (
                    <li key={act.id}>
                      <span className="text-[var(--text-primary)] font-semibold">{act.title}</span> ({act.period}) — {act.role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
        break
      }

      case 'labs': {
        const activeLabs = securityLabsData.filter((l) => !l.isPlaceholder)
        rawText = `CYBERSECURITY LABS & CTF (${activeLabs.length} Entries):
${activeLabs
            .map(
              (l) =>
                `• [${l.platform}] ${l.title} (${l.difficulty} - ${l.status})\n  Category: ${l.category}\n  Skills: ${l.skillsLearned.join(', ')}`
            )
            .join('\n\n')}`

        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Cybersecurity Labs &amp; CTF ({activeLabs.length} Verified Entries)
            </div>
            <div className="space-y-2">
              {activeLabs.map((l) => (
                <div
                  key={l.id}
                  className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[var(--text-primary)]">{l.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-tertiary)] uppercase">
                      {l.platform}
                    </span>
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    {l.category} · Level: {l.difficulty} · Status: {l.status}
                  </div>
                  <div className="text-[var(--text-secondary)] text-[11px]">
                    Skills: {l.skillsLearned.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'certs':
      case 'credentials': {
        const certs = credentialsData.filter((c) => c.type === 'certification')
        const other = credentialsData.filter((c) => c.type !== 'certification')
        rawText = `CREDENTIALS & MILESTONES:
Formal Certifications: ${certs.length > 0
            ? certs.map((c) => c.title).join(', ')
            : 'Pending verification (view src/data/credentials.ts)'
          }
Documented Engagements:
${other.map((o) => `• [${o.type.toUpperCase()}] ${o.title} (${o.issueDate}) - ${o.issuer}`).join('\n')}`

        outputNode = (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Accreditations &amp; Milestones
            </div>
            {certs.length === 0 ? (
              <div className="p-2.5 rounded border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-tertiary)] text-[11px] leading-relaxed">
                Formal professional certifications: <span className="text-amber-400 font-bold">Pending Verification</span>.
                Easily editable in <code className="text-emerald-400">src/data/credentials.ts</code>.
              </div>
            ) : (
              <div className="space-y-1">
                {certs.map((c) => (
                  <div key={c.id} className="text-emerald-400 font-bold">
                    ✓ {c.title} ({c.issuer} · {c.issueDate})
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-1.5 pt-1">
              <span className="text-[var(--text-primary)] font-bold">// Documented Engagements:</span>
              {other.map((o) => (
                <div key={o.id} className="text-[var(--text-secondary)] text-[11px]">
                  • <span className="text-[var(--text-primary)] font-semibold">{o.title}</span> ({o.issueDate}) — {o.issuer}
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'contact': {
        rawText = `Email:     ${siteConfig.email}
GitHub:    https://github.com/thefayid
LinkedIn:  https://www.linkedin.com/in/rahmanfayid/
Instagram: https://www.instagram.com/fayid.7/
Location:  ${siteConfig.location}
Status:    ${siteConfig.availability}`

        outputNode = (
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[var(--accent)] font-semibold">
              // Connectivity &amp; Contact Details
            </div>
            <div className="space-y-1.5 text-[var(--text-secondary)]">
              <div>
                <span className="text-[var(--text-tertiary)]">Email: </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-emerald-400 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">GitHub: </span>
                <a
                  href="https://github.com/thefayid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://github.com/thefayid
                </a>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">LinkedIn: </span>
                <a
                  href="https://www.linkedin.com/in/rahmanfayid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://www.linkedin.com/in/rahmanfayid/
                </a>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">Instagram: </span>
                <a
                  href="https://www.instagram.com/fayid.7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  https://www.instagram.com/fayid.7/
                </a>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">Status: </span>
                <span className="text-emerald-400">{siteConfig.availability}</span>
              </div>
            </div>
          </div>
        )
        break
      }

      case 'resume': {
        window.open(siteConfig.resumeUrl, '_blank')
        rawText = `Initiating resume view / download: ${siteConfig.resumeUrl}`
        outputNode = (
          <div className="font-mono text-xs space-y-1">
            <div className="text-emerald-400 font-semibold">
              [✓] Opening resume in new window...
            </div>
            <div className="text-[var(--text-tertiary)] text-[11px]">
              Direct file link:{' '}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {siteConfig.resumeUrl}
              </a>
            </div>
          </div>
        )
        break
      }

      case 'github': {
        window.open('https://github.com/thefayid', '_blank')
        rawText = 'Opening GitHub profile: https://github.com/thefayid'
        outputNode = (
          <div className="font-mono text-xs text-emerald-400">
            [✓] Navigating to https://github.com/thefayid...
          </div>
        )
        break
      }

      case 'linkedin': {
        window.open('https://www.linkedin.com/in/rahmanfayid/', '_blank')
        rawText = 'Opening LinkedIn profile: https://www.linkedin.com/in/rahmanfayid/'
        outputNode = (
          <div className="font-mono text-xs text-emerald-400">
            [✓] Navigating to https://www.linkedin.com/in/rahmanfayid/...
          </div>
        )
        break
      }

      case 'instagram': {
        window.open('https://www.instagram.com/fayid.7/', '_blank')
        rawText = 'Opening Instagram profile: https://www.instagram.com/fayid.7/'
        outputNode = (
          <div className="font-mono text-xs text-emerald-400">
            [✓] Navigating to https://www.instagram.com/fayid.7/...
          </div>
        )
        break
      }

      case 'whoami': {
        rawText =
          'fayid@portfolio:uid=1000(fayid) gid=1000(infosec) groups=1000(infosec),27(sudo),4(adm)\nRole: Cybersecurity & Systems Explorer | Final-Year BCA\nFocus: Systems · Security · Networks · Applied AI'
        outputNode = (
          <div className="font-mono text-xs space-y-1 text-[var(--text-secondary)]">
            <div className="text-emerald-400">
              fayid@portfolio:uid=1000(fayid) gid=1000(infosec) groups=1000(infosec),27(sudo)
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Identity: </span>
              <span className="text-[var(--text-primary)] font-bold">Rahman Fayid PM</span> (Fayid)
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Degree: </span>
              <span>Final-Year BCA (Cyber Security Specialization)</span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Core Focus: </span>
              <span className="text-[var(--accent)]">Systems · Security · Networks · Applied AI</span>
            </div>
          </div>
        )
        break
      }

      case 'ls': {
        rawText = `drwxr-xr-x 4 fayid infosec 4096 Nov 21 2026 projects/
drwxr-xr-x 5 fayid infosec 4096 Nov 21 2026 skills/
drwxr-xr-x 2 fayid infosec 4096 Nov 21 2026 experience/
-rw-r--r-- 1 fayid infosec 1024 Nov 21 2026 about.md
-rw-r--r-- 1 fayid infosec 2048 Nov 21 2026 resume.pdf
-rw-r--r-- 1 fayid infosec  512 Nov 21 2026 contact.vcf
-rwxr-xr-x 1 fayid infosec 8192 Nov 21 2026 aeroguard.py*
-rwxr-xr-x 1 fayid infosec 4096 Nov 21 2026 phoenixsec.sh*`

        outputNode = (
          <div className="font-mono text-xs space-y-1 text-[var(--text-secondary)]">
            <div className="text-[var(--text-tertiary)] text-[11px] mb-1">
              total 32 (simulated portfolio directory)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <span className="text-[var(--accent)] font-bold">drwxr-xr-x</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('projects')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  projects/
                </button>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">drwxr-xr-x</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('skills')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  skills/
                </button>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">drwxr-xr-x</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('experience')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  experience/
                </button>
              </div>
              <div>
                <span className="text-[var(--accent)] font-bold">drwxr-xr-x</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('labs')}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  labs/
                </button>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">-rw-r--r--</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('about')}
                  className="text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  about.md
                </button>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">-rw-r--r--</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('resume')}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  resume.pdf
                </button>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">-rw-r--r--</span>{' '}
                <button
                  type="button"
                  onClick={() => execRef.current('contact')}
                  className="text-[var(--text-primary)] hover:underline cursor-pointer"
                >
                  contact.vcf
                </button>
              </div>
              <div>
                <span className="text-emerald-500 font-bold">-rwxr-xr-x</span>{' '}
                <span className="text-emerald-400">aeroguard.py*</span>
              </div>
              <div>
                <span className="text-emerald-500 font-bold">-rwxr-xr-x</span>{' '}
                <span className="text-emerald-400">phoenixsec.sh*</span>
              </div>
            </div>
          </div>
        )
        break
      }

      default: {
        rawText = `zsh: command not found: ${commandLower}. Type 'help' to see available commands.`
        outputNode = (
          <div className="font-mono text-xs text-rose-400">
            <span>zsh: command not found: </span>
            <span className="font-bold text-[var(--text-primary)]">{commandLower}</span>
            <div className="text-[var(--text-tertiary)] text-[11px] mt-1">
              Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to view all supported commands.
            </div>
          </div>
        )
        break
      }
    }

    setEntries((prev) => [
      ...prev,
      {
        id: entryId,
        command: trimmed,
        timestamp: time,
        output: outputNode,
        rawText,
      },
    ])
  }, [])

  useEffect(() => {
    execRef.current = executeCommand
  }, [executeCommand])

  // Input keyboard handlers: Enter to execute, Up/Down for command history, Tab for autocomplete
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInputVal(commandHistory[nextIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInputVal('')
      } else {
        setHistoryIndex(nextIndex)
        setInputVal(commandHistory[nextIndex] || '')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const current = inputVal.toLowerCase().trim()
      if (!current) return
      const match = SUPPORTED_COMMANDS.find((c) => c.startsWith(current))
      if (match) {
        setInputVal(match)
      }
    }
  }

  // Copy output to clipboard
  const copyEntryText = (entry: CommandEntry) => {
    if (!entry.rawText) return
    navigator.clipboard.writeText(entry.rawText)
    setCopiedId(entry.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      {/* ── Persistent Floating Terminal Launcher Dock Pill (Hidden when terminal or modal active) ── */}
      {!isOpen && !isModalActive && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none">
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[var(--border)] transition-all duration-300 cursor-pointer hover:border-[var(--accent-border)] hover:shadow-[0_0_20px_var(--glow-accent)]"
            style={{
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow-md)',
            }}
            aria-label="Toggle Interactive Portfolio Terminal"
            title="Toggle Terminal (Hotkey: `)"
          >
            {/* Status Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            {/* Terminal Label */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <TerminalIcon size={13} className="text-[var(--accent)]" />
              <span className="hidden xs:inline text-[var(--text-primary)] font-semibold">
                fayid@portfolio
              </span>
              <span className="xs:hidden text-[var(--text-primary)] font-semibold text-[11px]">
                fayid
              </span>
              <span className="hidden sm:inline-block text-[10px] text-[var(--text-tertiary)] ml-1 px-1 rounded border border-[var(--border)] bg-[var(--bg-elevated)]">
                `
              </span>
            </div>
          </motion.button>
        </div>
      )}

      {/* ── Interactive Terminal Window Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className={`fixed z-50 flex flex-col rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden backdrop-blur-2xl ${isMaximized
              ? 'inset-3 sm:inset-6'
              : 'bottom-20 right-4 sm:right-6 left-4 sm:left-auto sm:w-[580px] md:w-[650px] h-[520px] max-h-[80vh]'
              }`}
            style={{
              background: 'color-mix(in srgb, var(--bg-primary) 96%, transparent)',
              boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--border)',
            }}
            role="dialog"
            aria-label="Interactive Portfolio Terminal Window"
          >
            {/* ── Window Titlebar ── */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] select-none shrink-0"
              style={{ background: 'var(--bg-elevated)' }}
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer"
                  aria-label="Close terminal"
                  title="Close Terminal"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
                  aria-label="Minimize terminal"
                  title="Minimize Terminal"
                />
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
                  aria-label="Toggle full size"
                  title="Maximize / Restore"
                />
              </div>

              {/* Title & Host Info */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-tertiary)]">
                <TerminalIcon size={12} className="text-emerald-400" />
                <span className="text-[var(--text-primary)] font-semibold">fayid@portfolio</span>
                <span>: ~ (zsh simulation)</span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEntries([])}
                  className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                  title="Clear Terminal Output"
                  aria-label="Clear Terminal Output"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                  title={isMaximized ? 'Restore size' : 'Maximize window'}
                  aria-label="Toggle window size"
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                  title="Close Terminal"
                  aria-label="Close Terminal"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Terminal Output Body ── */}
            <div
              ref={terminalBodyRef}
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-mono text-xs select-text focus:outline-none"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome Banner */}
              <div className="pb-3 border-b border-[var(--border-subtle)] space-y-1.5 text-[var(--text-tertiary)]">
                <div className="text-[var(--text-primary)] font-bold">
                  FAYID DIGITAL WORKSPACE // SHELL v1.4.2
                </div>
                <div>
                  Simulated environment for Rahman Fayid PM · Type{' '}
                  <span className="text-emerald-400 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('help')}>
                    &apos;help&apos;
                  </span>{' '}
                  for commands.
                </div>
              </div>

              {/* Historical Commands and Output */}
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-2">
                  {/* Prompt Line */}
                  <div className="flex items-center justify-between gap-2 group">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-emerald-400 font-bold">fayid@portfolio</span>
                      <span className="text-[var(--text-tertiary)]">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-[var(--text-tertiary)]">$</span>
                      <span className="text-[var(--text-primary)] font-semibold">
                        {entry.command}
                      </span>
                    </div>

                    {/* Copy Button for Entry */}
                    {entry.rawText && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyEntryText(entry)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] cursor-pointer text-[10px] flex items-center gap-1"
                        title="Copy command output"
                      >
                        {copiedId === entry.id ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Output Block */}
                  <div className="pl-3 border-l-2 border-[var(--border)] py-0.5">
                    {entry.output}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Touch Quick Command Chips (Mobile Friendly) ── */}
            <div
              className="px-4 py-2 border-t border-[var(--border-subtle)] flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase shrink-0 mr-1">
                Quick:
              </span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] hover:bg-[var(--bg-card)] transition-colors shrink-0 cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* ── Interactive Command Input Prompt ── */}
            <div
              className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2 select-none shrink-0"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
                <span className="text-emerald-400 font-bold">fayid@portfolio</span>
                <span className="text-[var(--text-tertiary)]">:</span>
                <span className="text-blue-400 font-semibold">~</span>
                <span className="text-[var(--text-tertiary)]">$</span>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'help', 'projects', 'skills')..."
                className="flex-1 bg-transparent font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />

              <button
                type="button"
                onClick={() => executeCommand(inputVal)}
                className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                aria-label="Execute command"
                title="Execute (Enter)"
              >
                <CornerDownLeft size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
