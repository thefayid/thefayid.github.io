export interface ProjectItem {
  id: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  problemAddressed: string
  approach: string
  category: string
  technologies: string[]
  githubUrl: string
  featured: boolean
  displayOrder: number
  thumbnail: string
  keyFeatures: string[]
  challenges: string
  whatILearned: string
  year: string
  index: string
}

export const projectsData: ProjectItem[] = [
  {
    id: 'aeroguard',
    name: 'AeroGuard',
    slug: 'aeroguard-wids',
    shortDescription: 'Enterprise-grade Wireless Intrusion Detection and Prevention System for 802.11 networks.',
    fullDescription: 'AeroGuard is an enterprise-grade Wireless Intrusion Detection and Prevention System. It passively monitors 802.11 wireless networks to detect potential threats such as Evil Twin activity and deauthentication-related attacks. It provides a wireless security monitoring and defense framework.',
    problemAddressed: '802.11 wireless local area networks are inherently broadcast-based and susceptible to stealthy radio-layer threats. Attackers can deploy Evil Twin rogue access points to mimic authorized SSIDs or inject deauthentication frame floods to disconnect clients without triggering standard wired firewall alarms.',
    approach: 'Engineered a modular, containerized monitoring framework using Python and Shell scripts. The system operates network interfaces in passive monitor mode, analyzes 802.11 management frames in real time, computes deauthentication anomaly frequencies, and raises defensive alerts when suspicious AP fingerprints are detected.',
    category: 'Wireless Security',
    technologies: ['Python', 'JavaScript', 'HTML', 'CSS', 'Shell', 'Docker'],
    githubUrl: 'https://github.com/thefayid/AeroGuard-WIDS',
    featured: true,
    displayOrder: 1,
    thumbnail: '/projects/aeroguard.png',
    keyFeatures: [
      'Passive 802.11 wireless network monitoring',
      'Evil Twin activity detection and alert triggers',
      'Deauthentication attack pattern recognition',
      'Wireless security monitoring and defense framework',
      'Containerized deployment pipeline using Docker',
    ],
    challenges: 'Accurately isolating malicious deauthentication frame bursts from legitimate network re-associations while maintaining high-throughput passive monitoring without packet drops.',
    whatILearned: 'Deep packet inspection using raw 802.11 radio headers, Linux wireless extension configuration, containerizing hardware-level network tools in Docker, and crafting resilient Python backend monitoring daemons.',
    year: '2024',
    index: '01',
  },
  {
    id: 'phoenixsec',
    name: 'PhoenixSec',
    slug: 'phoenixsec',
    shortDescription: 'Open-source DevSecOps methodology framework and reference implementation.',
    fullDescription: 'PhoenixSec is an open-source DevSecOps methodology framework and reference implementation. It demonstrates secure software development lifecycle patterns, security pipelines, and security guardrails. It includes a CLI reference implementation and experimental security automation capabilities.',
    problemAddressed: 'Modern software development cycles prioritize deployment velocity, which frequently causes security reviews to be deferred until late in release testing. Without integrated guardrails, code repositories accumulate misconfigurations, exposed secrets, and unvalidated dependencies.',
    approach: 'Designed a standardized DevSecOps methodology and CLI reference implementation. PhoenixSec demonstrates how to weave continuous security validation directly into software pipelines through automated policy evaluations, security guardrails, and reproducible CLI commands across multiple development runtimes.',
    category: 'DevSecOps & Automation',
    technologies: ['Python', 'TypeScript', 'JavaScript', 'PowerShell'],
    githubUrl: 'https://github.com/thefayid/PhoenixSec',
    featured: true,
    displayOrder: 2,
    thumbnail: '/projects/phoenixsec.png',
    keyFeatures: [
      'Secure Software Development Lifecycle (SSDLC) patterns',
      'Automated security pipelines and continuous guardrails',
      'CLI reference implementation for developer environments',
      'Experimental security automation capabilities',
    ],
    challenges: 'Balancing stringent policy enforcement against developer velocity, ensuring that automated guardrails provide actionable remediations rather than noisy false positives.',
    whatILearned: 'Designing extensible DevSecOps policies, building multi-runtime CLI tooling across Python, TypeScript, and PowerShell, and embedding static security checks directly into automated CI/CD workflows.',
    year: '2024',
    index: '02',
  },
  {
    id: 'neo',
    name: 'NEO — Autonomous Computer Operator & Voice AI',
    slug: 'neo-autonomous-computer-operator',
    shortDescription: 'Autonomous computer operator and real-time voice AI assistant powered by multimodal AI.',
    fullDescription: 'An autonomous computer operator and real-time voice AI assistant powered by multimodal AI. It can understand visual screen context, interact with applications, and support voice-based operation. It includes an optional local AI pipeline.',
    problemAddressed: 'Traditional voice assistants are confined to canned skills and cannot interpret what is currently displayed on a user screen. Operating desktop software hands-free or orchestrating multi-application workflows requires visual grounding that standard voice APIs cannot provide.',
    approach: 'Combined multimodal vision reasoning with real-time speech processing. The agent captures desktop screen context to ground interface elements, translates natural voice instructions into precise UI interactions, and provides an optional local offline model pipeline for private, offline-first execution.',
    category: 'Multimodal AI & Automation',
    technologies: ['Python', 'Gemini API', 'Whisper', 'Ollama', 'Piper'],
    githubUrl: 'https://github.com/thefayid/NEO-Autonomous-Computer-Operator-Voice-AI',
    featured: true,
    displayOrder: 3,
    thumbnail: '/projects/neo.png',
    keyFeatures: [
      'Visual screen context understanding and coordinate mapping',
      'Autonomous system navigation and desktop application interaction',
      'Real-time low-latency voice-based operator control',
      'Multimodal intelligence powered by the Gemini API',
      'Optional local, privacy-first AI pipeline (Whisper, Ollama, Piper)',
    ],
    challenges: 'Minimizing end-to-end voice latency from speech input to model reasoning and execution, while providing a seamless transition to offline-only local LLM pipelines.',
    whatILearned: 'Orchestrating multimodal vision prompts for GUI automation, managing real-time audio streams with Whisper and Piper, and integrating local model runners via Ollama.',
    year: '2024',
    index: '03',
  },
  {
    id: 'pantherpos',
    name: 'PantherPOS',
    slug: 'pantherpos',
    shortDescription: 'Offline-first Point of Sale system with inventory, barcode handling, and AI-powered insights.',
    fullDescription: 'An offline-first Point of Sale system designed to simplify retail operations through billing, inventory management, barcode handling, analytics, and AI-powered insights.',
    problemAddressed: 'Retail checkout counters cannot tolerate point-of-sale downtime caused by internet outages, cloud server disruptions, or network latency spikes. Many existing retail systems are either cloud-dependent or lack modern analytical features.',
    approach: 'Developed an offline-first architecture running on Vite, packaged for desktop via Electron and mobile devices via Capacitor. The application maintains all billing, barcode lookups, and inventory changes in a local database while providing automated analytical insights directly on the device.',
    category: 'Offline-First Systems & AI',
    technologies: ['JavaScript', 'Vite', 'Electron', 'Capacitor', 'AI integration'],
    githubUrl: 'https://github.com/thefayid/PantherPOS',
    featured: true,
    displayOrder: 4,
    thumbnail: '/projects/pantherpos.png',
    keyFeatures: [
      'Offline-first retail transaction processing and receipt generation',
      'Comprehensive product catalog and real-time inventory management',
      'Hardware barcode scanner input handling and rapid item lookup',
      'Sales analytics reporting with AI-powered trend insights',
      'Cross-platform desktop & mobile packaging (Electron & Capacitor)',
    ],
    challenges: 'Designing a zero-latency local database architecture that guarantees transaction consistency and fast barcode lookups completely detached from the internet.',
    whatILearned: 'Building offline-first client databases, wrapping modern Vite applications into desktop (Electron) and mobile (Capacitor) runtimes, and designing resilient local-first workflows.',
    year: '2024',
    index: '04',
  },
]

// Helper functions for retrieval and filtering
export function getAllProjects(): ProjectItem[] {
  return [...projectsData].sort((a, b) => a.displayOrder - b.displayOrder)
}

export function getFeaturedProjects(): ProjectItem[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  if (!slug) return undefined
  const clean = slug.toLowerCase().trim().replace(/^#\/?/, '').replace(/^project[=/]/, '')
  return projectsData.find(
    (p) =>
      p.slug.toLowerCase() === clean ||
      p.id.toLowerCase() === clean ||
      clean.includes(p.slug.toLowerCase()) ||
      clean.includes(p.id.toLowerCase())
  )
}

export function getProjectsByCategory(category: string): ProjectItem[] {
  return getAllProjects().filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getAdjacentProjects(currentSlug: string): {
  prev: ProjectItem
  next: ProjectItem
} {
  const all = getAllProjects()
  const currentIndex = all.findIndex((p) => p.slug === currentSlug || p.id === currentSlug)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  const prevIndex = (safeIndex - 1 + all.length) % all.length
  const nextIndex = (safeIndex + 1) % all.length

  return {
    prev: all[prevIndex]!,
    next: all[nextIndex]!,
  }
}
