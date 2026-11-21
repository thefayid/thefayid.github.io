export const siteConfig = {
  name: 'Rahman Fayid PM',
  alias: 'Fayid',
  brand: 'FAYID',
  role: 'Cybersecurity & Systems',
  focus: 'Systems · Security · Networks',
  headline: {
    line1: 'Defensive security.',
    line2: 'Engineered from the packet up.',
  },
  introduction: "Final-year BCA student building open-source security tools, Wi-Fi intrusion detection systems, and automated DevSecOps pipelines.",
  tagline: "Defensive security engineered from the packet level up.",
  email: 'rahmanfayidpm@gmail.com',
  location: 'Remote — Worldwide',
  availability: 'Open to opportunities & research',
  resumeUrl: '/resume.pdf',
  year: new Date().getFullYear(),
} as const

export interface NavLink {
  id: string
  label: string
  href: string
}

export const navLinks: readonly NavLink[] = [
  { id: 'home',       label: 'Home',       href: '#home' },
  { id: 'about',      label: 'About',      href: '#about' },
  { id: 'skills',     label: 'Skills',     href: '#skills' },
  { id: 'projects',   label: 'Projects',   href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'labs',       label: 'Labs',       href: '#labs' },
  { id: 'contact',    label: 'Contact',    href: '#contact' },
] as const

export interface SocialLink {
  label: string
  href: string
  handle?: string
}

export const socialLinks: readonly SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/thefayid',                     handle: '@thefayid' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/rahmanfayid/',        handle: 'in/rahmanfayid' },
  { label: 'Instagram', href: 'https://www.instagram.com/fayid.7/',              handle: '@fayid.7' },
] as const

export interface TechnicalFact {
  id: string
  number: string
  title: string
  description: string
  tag: string
}

export const technicalFacts: TechnicalFact[] = [
  {
    id: 'fact-1',
    number: '01',
    title: 'Hands-on Labs First',
    description: 'Active problem solver on Hack The Box and TryHackMe. Believes in dissecting real CVEs and packet captures over passive memorization.',
    tag: 'HTB / THM',
  },
  {
    id: 'fact-2',
    number: '02',
    title: 'Python Automation Obsession',
    description: 'If a workflow or vulnerability check takes more than three manual passes, a custom Python tool is already being scripted.',
    tag: 'Python 3',
  },
  {
    id: 'fact-3',
    number: '03',
    title: 'Systems & Security Fusion',
    description: 'Practical experience spanning wireless security, DevSecOps principles, and SIEM monitoring to understand the entire defensive perimeter.',
    tag: 'DevSecOps & SIEM',
  },
  {
    id: 'fact-4',
    number: '04',
    title: 'AI & Next-Gen Tooling',
    description: 'Deeply curious about applying AI and LLMs to solve real-world problems and accelerate vulnerability analysis.',
    tag: 'Applied AI',
  },
]

export const aboutBio = {
  education: 'Final-Year BCA (Cyber Security)',
  degree: 'Bachelor of Computer Applications',
  specialization: 'Cyber Security',
  university: 'Jain University, Kochi',
  status: 'Starting Career / Open to Roles',
  platforms: ['Hack The Box', 'TryHackMe'],
  passions: ['Cybersecurity', 'Networking', 'Python Programming', 'Applied AI'],
  coreAreas: [
    { label: 'Security Tooling', desc: 'Custom scripts, scanners & vulnerability parsers' },
    { label: 'Wireless Security', desc: 'Packet inspection, WPA analysis & Rogue AP mitigation' },
    { label: 'DevSecOps Concepts', desc: 'Secure CI/CD pipelines, container isolation & code linting' },
    { label: 'SIEM Implementations', desc: 'Log aggregation, telemetry correlation & alerting' },
    { label: 'Automation Projects', desc: 'End-to-end task automation with Python & Bash' },
    { label: 'Applied AI', desc: 'Exploring how technology solves complex real-world challenges' },
  ],
}

import { projectsData } from './projects'

export { projectsData, getAllProjects, getFeaturedProjects, getProjectBySlug, getProjectsByCategory } from './projects'
export type { ProjectItem } from './projects'

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  tags: string[]
  year: string
  href: string
  featured: boolean
}

export const projects: Project[] = projectsData.map((p) => ({
  id: p.id,
  index: p.index,
  title: p.name,
  subtitle: p.shortDescription,
  tags: p.technologies,
  year: p.year,
  href: p.githubUrl,
  featured: p.featured,
}))

export interface Experience {
  id: string
  period: string
  year: string
  role: string
  company: string
  type: 'Internship'
  location: string
  category: string
  description: string
  exposure: string[]
  technologies: string[]
  tags: string[]
  achievements?: string[]
}

export interface Activity {
  id: string
  title: string
  role: string
  period: string
  year: string
  category: 'Hackathon' | 'Conference' | 'Volunteering'
  description: string
  tags: string[]
  location?: string
  highlights?: string[]
}

export const experiences: Experience[] = [
  {
    id: 'exp-cyber-police',
    role: 'Cyber Crime Intern',
    company: 'Cyber Crime Police Station, Kasaragod',
    type: 'Internship',
    period: '22 July – 4 August 2026',
    year: '2026',
    location: 'Kasaragod, Kerala',
    category: 'Digital Forensics & Investigation',
    description:
      'Exposure to cybercrime investigation procedures, digital evidence analysis, case file study, online activity tracing, documentation, investigative methodologies, and digital forensics fundamentals.',
    exposure: [
      'Cybercrime investigation procedures',
      'Digital evidence analysis',
      'Case file study & documentation',
      'Online activity tracing',
      'Investigative methodologies',
      'Digital forensics fundamentals',
    ],
    technologies: [
      'Digital Forensics',
      'Evidence Analysis',
      'Activity Tracing',
      'Case Documentation',
      'Investigative Methodologies',
      'Chain of Custody',
    ],
    tags: [
      'Cybercrime Investigation',
      'Digital Forensics',
      'Evidence Analysis',
      'Activity Tracing',
      'Case Study',
    ],
  },
  {
    id: 'exp-elevance',
    role: 'Cybersecurity Intern',
    company: 'Elevance Skill',
    type: 'Internship',
    period: '2024',
    year: '2024',
    location: 'Virtual / Practical Lab',
    category: 'SIEM & Threat Monitoring',
    description:
      'Worked on practical cybersecurity tasks involving security monitoring, threat detection, log analysis, and security tool development.',
    exposure: [
      'SIEM implementation using ELK Stack',
      'Security event analysis',
      'Detection logic',
      'Suspicious activity investigation',
      'Python security utilities',
      'Network analysis',
    ],
    technologies: [
      'Python',
      'ELK Stack',
      'Elasticsearch',
      'Kibana',
      'Filebeat',
      'Linux',
      'Wireshark',
    ],
    tags: [
      'SIEM',
      'ELK Stack',
      'Elasticsearch',
      'Kibana',
      'Log Analysis',
      'Threat Detection',
      'Wireshark',
      'Python',
    ],
  },
]

export const activities: Activity[] = [
  {
    id: 'act-summit',
    title: 'Summit of the Future',
    role: 'Volunteer',
    period: '2024 & 2025',
    year: '2025',
    category: 'Volunteering',
    description:
      'Contributed to event operations, coordination, and participant support across multiple consecutive editions of the Summit of the Future.',
    tags: ['Event Operations', 'Volunteer Coordination', 'Participant Support'],
    location: 'Regional Summit',
  },
  {
    id: 'act-cocon',
    title: 'cOcOn (Cyber Security & Hacking Conference)',
    role: 'Conference Attendee',
    period: '2024',
    year: '2024',
    category: 'Conference',
    description:
      'Attended an international cybersecurity conference, gaining exposure to emerging security trends, threats, and industry practices from global infosec leaders.',
    tags: ['Cyber Security', 'Hacking Conference', 'Threat Trends', 'Industry Practices'],
    location: 'Kochi, Kerala',
  },
  {
    id: 'act-sih',
    title: 'Smart India Hackathon',
    role: 'Participant — Internal Level',
    period: '2024',
    year: '2024',
    category: 'Hackathon',
    description:
      'Participated in an internal-level Smart India Hackathon conducted at college, collaborating on rapid technical prototyping and solution design.',
    tags: ['Smart India Hackathon', 'Rapid Prototyping', 'Team Collaboration'],
    location: 'College Campus',
  },
]

export interface LabItem {
  id: string
  title: string
  category: string
  date: string
  summary: string
  status: 'Live' | 'Beta' | 'Experiment'
  tags: string[]
  link?: string
}

export const labExperiments: LabItem[] = [
  {
    id: 'lab-1',
    title: '802.11 Frame Anomaly Detector',
    category: 'Wireless Defense',
    date: '2024',
    summary: 'Passive packet inspection script parsing 802.11 management frames to detect Rogue APs and abnormal deauth bursts.',
    status: 'Live',
    tags: ['Python', 'Docker', '802.11'],
    link: 'https://github.com/thefayid/AeroGuard-WIDS',
  },
  {
    id: 'lab-2',
    title: 'DevSecOps Pipeline Guardrails',
    category: 'Security Automation',
    date: '2024',
    summary: 'CLI reference implementation and automated workflows demonstrating secure software development lifecycle patterns.',
    status: 'Beta',
    tags: ['DevSecOps', 'CI/CD', 'Python'],
    link: 'https://github.com/thefayid/PhoenixSec',
  },
  {
    id: 'lab-3',
    title: 'Multimodal Screen & Voice Assistant',
    category: 'Applied AI',
    date: '2024',
    summary: 'Autonomous computer operator integrating multimodal vision and Whisper speech recognition for voice-based navigation.',
    status: 'Experiment',
    tags: ['Gemini API', 'Whisper', 'Python'],
    link: 'https://github.com/thefayid/NEO-Autonomous-Computer-Operator-Voice-AI',
  },
]
