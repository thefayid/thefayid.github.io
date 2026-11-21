export type CredentialCategory =
  | 'certification'
  | 'course'
  | 'achievement'
  | 'conference'
  | 'hackathon'

export interface CredentialItem {
  id: string
  type: CredentialCategory
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
  verificationUrl?: string
  previewImage?: string
  description?: string
  skills?: string[]
  location?: string
  isPlaceholder?: boolean
}

/**
 * ── Credential Data Directory ──
 *
 * NOTE: As requested, no fake or unverified professional certifications are invented.
 * Formal certifications start as an empty list (triggering an elegant empty state in the UI).
 * When you receive your certifications, simply add them to `credentialsData` below!
 */
export const credentialsData: CredentialItem[] = [
  // ── Formal Certifications (Empty until verified by user) ──
  // Example format to uncomment when adding your official certificates:
  /*
  {
    id: 'cert-sample',
    type: 'certification',
    title: 'Certified SOC Analyst (CSA)',
    issuer: 'EC-Council',
    issueDate: '2025',
    credentialId: 'ECC-00000000',
    verificationUrl: 'https://aspen.eccouncil.org/verify',
    description: 'Security operations, SIEM telemetry, and incident response procedures.',
    skills: ['SIEM', 'Log Analysis', 'Incident Triage'],
  },
  */

  // ── Conference Engagements ──
  {
    id: 'conf-cocon-2024',
    type: 'conference',
    title: 'cOcOn International Cybersecurity Conference',
    issuer: 'Kerala Police & ISRA',
    issueDate: '2024',
    location: 'Kochi, Kerala',
    description:
      'Attended premier international cybersecurity and hacking conference, gaining deep exposure to emerging attack vectors, threat intelligence, and defensive enterprise practices.',
    skills: ['Threat Intelligence', 'Defensive Architecture', 'Infosec Trends'],
    verificationUrl: 'https://cocon.org',
  },
  {
    id: 'conf-summit-future',
    type: 'conference',
    title: 'Summit of the Future — Volunteer Operations',
    issuer: 'Summit Organizing Committee',
    issueDate: '2024 & 2025',
    location: 'Regional Summit',
    description:
      'Contributed across consecutive editions to large-scale event operations, participant technical assistance, and logistics coordination.',
    skills: ['Operations Support', 'Technical Coordination', 'Event Logistics'],
  },

  // ── Hackathon Participation ──
  {
    id: 'hack-sih-2024',
    type: 'hackathon',
    title: 'Smart India Hackathon (Internal Selection)',
    issuer: 'Ministry of Education Innovation Cell / College',
    issueDate: '2024',
    location: 'College Campus',
    description:
      'Participated in the internal-level Smart India Hackathon, collaborating on rapid technical prototyping, problem formulation, and solution architecture.',
    skills: ['Rapid Prototyping', 'System Design', 'Collaborative Engineering'],
  },

  // ── Academic Achievements & Specialized Milestones ──
  {
    id: 'achieve-bca-cyber',
    type: 'achievement',
    title: 'BCA Cyber Security Specialization',
    issuer: 'Undergraduate Academic Program',
    issueDate: '2022 — 2025',
    location: 'India',
    description:
      'Final-year undergraduate candidate focusing on computer networks, systems architecture, cryptography, and defensive security tooling.',
    skills: ['Computer Networks', 'Operating Systems', 'Python Tooling', 'Relational Databases'],
  },
]

export function getCredentialsByType(type: CredentialCategory | 'all'): CredentialItem[] {
  if (type === 'all') return credentialsData
  return credentialsData.filter((item) => item.type === type)
}

export function getCertificationsCount(): {
  certifications: number
  conferences: number
  hackathons: number
  courses: number
  total: number
} {
  return {
    certifications: credentialsData.filter((c) => c.type === 'certification').length,
    conferences: credentialsData.filter((c) => c.type === 'conference').length,
    hackathons: credentialsData.filter((c) => c.type === 'hackathon').length,
    courses: credentialsData.filter((c) => c.type === 'course').length,
    total: credentialsData.length,
  }
}
