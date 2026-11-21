export type LabPlatform = 'Hack The Box' | 'TryHackMe' | 'CYLAB Academy'

export type LabDifficulty = 'Fundamental' | 'Easy' | 'Medium' | 'Hard'

export type LabStatus = 'Completed' | 'In Progress' | 'Active Lab' | 'Practice'

export interface SecurityLabItem {
  id: string
  title: string
  platform: LabPlatform
  category: string
  difficulty: LabDifficulty
  status: LabStatus
  description: string
  skillsLearned: string[]
  technologies: string[]
  writeupUrl?: string
  date?: string
  isPlaceholder?: boolean
}

export interface PlatformMetadata {
  id: LabPlatform
  name: string
  shortCode: string
  description: string
  focus: string
  accentColor: string
}

export const platformMetadata: Record<LabPlatform, PlatformMetadata> = {
  'Hack The Box': {
    id: 'Hack The Box',
    name: 'Hack The Box',
    shortCode: 'HTB',
    description: 'Practical penetration testing labs, machine enumeration, and vulnerability dissection in virtual environments.',
    focus: 'Machine Exploitation & Privilege Escalation',
    accentColor: '#10B981', // Emerald / Terminal Green
  },
  'TryHackMe': {
    id: 'TryHackMe',
    name: 'TryHackMe',
    shortCode: 'THM',
    description: 'Guided cybersecurity rooms, defensive SOC challenges, network security paths, and Web OWASP labs.',
    focus: 'Defensive Security & Network Analysis',
    accentColor: '#EF4444', // Red
  },
  'CYLAB Academy': {
    id: 'CYLAB Academy',
    name: 'CYLAB Academy',
    shortCode: 'CYLAB',
    description: 'Academic cybersecurity drills, structured protocol analysis, digital forensics, and systems hardening exercises.',
    focus: 'Forensics & Systems Hardening',
    accentColor: '#06B6D4', // Cyan
  },
}

/**
 * Structured Labs & CTF entries.
 * Note: Add your newly completed rooms or CTF challenges by copying an entry below.
 * No arbitrary points or rankings are invented.
 */
export const securityLabsData: SecurityLabItem[] = [
  {
    id: 'lab-htb-linux-privesc',
    title: 'Linux Fundamentals & Privilege Escalation',
    platform: 'Hack The Box',
    category: 'Systems & PrivEsc',
    difficulty: 'Easy',
    status: 'Completed',
    description:
      'Hands-on lab exploring Linux file permissions, SUID binaries, cron job misconfigurations, and privilege escalation vectors.',
    skillsLearned: [
      'SUID binary auditing',
      'Linux capability enumeration',
      'Sudo privilege analysis',
      'Cron job inspection',
    ],
    technologies: ['Linux', 'Bash', 'LinPEAS', 'GTFOBins'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-thm-network-traffic',
    title: 'Network Traffic Analysis & PCAP Forensics',
    platform: 'TryHackMe',
    category: 'Network Security',
    difficulty: 'Fundamental',
    status: 'Completed',
    description:
      'Capturing and dissecting malicious traffic streams, protocol anomalies, handshake analysis, and DNS tunneling traces.',
    skillsLearned: [
      'Packet stream reconstruction',
      'Wireshark display filters',
      'DNS query inspection',
      'TCP handshake verification',
    ],
    technologies: ['Wireshark', 'TCP/IP', 'TShark', 'NetworkMiner'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-thm-web-owasp',
    title: 'Web Application Security & OWASP Vectors',
    platform: 'TryHackMe',
    category: 'Web Security',
    difficulty: 'Easy',
    status: 'Completed',
    description:
      'Laboratory exploration of core web vulnerabilities including SQL injection, cross-site scripting (XSS), and insecure direct object references (IDOR).',
    skillsLearned: [
      'OWASP Top 10 methodology',
      'Burp Suite request tampering',
      'SQL injection detection',
      'Session token analysis',
    ],
    technologies: ['Burp Suite', 'SQLMap', 'Firefox DevTools', 'Python'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-cylab-digital-forensics',
    title: 'Digital Evidence & Artifact Analysis',
    platform: 'CYLAB Academy',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    status: 'Completed',
    description:
      'Structured academic laboratory analyzing disk images, file system metadata, chain of custody procedures, and timeline reconstruction.',
    skillsLearned: [
      'Forensic disk imaging',
      'File system timeline reconstruction',
      'Evidence integrity hashing',
      'Investigative reporting',
    ],
    technologies: ['Autopsy', 'FTK Imager', 'Sleuth Kit', 'SHA-256 Verification'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-htb-network-scanning',
    title: 'Host Enumeration & Service Auditing',
    platform: 'Hack The Box',
    category: 'Reconnaissance',
    difficulty: 'Fundamental',
    status: 'Completed',
    description:
      'Active network scanning, open port enumeration, service version detection, and NSE script vulnerability probing in controlled subnets.',
    skillsLearned: [
      'Nmap scan tuning & timing',
      'Banner grabbing techniques',
      'NSE script automation',
      'Attack surface mapping',
    ],
    technologies: ['Nmap', 'Netcat', 'Linux', 'Bash'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-thm-siem-elk',
    title: 'SOC & SIEM Telemetry with ELK Stack',
    platform: 'TryHackMe',
    category: 'SOC & Telemetry',
    difficulty: 'Medium',
    status: 'In Progress',
    description:
      'Setting up Filebeat log ingestion, configuring Elasticsearch index patterns, and constructing Kibana security monitoring dashboards.',
    skillsLearned: [
      'SIEM event ingestion',
      'KQL (Kibana Query Language)',
      'Security alert thresholds',
      'Log normalization',
    ],
    technologies: ['ELK Stack', 'Elasticsearch', 'Kibana', 'Filebeat'],
    date: '2024',
    isPlaceholder: false,
  },
  {
    id: 'lab-cylab-wireless-defense',
    title: '802.11 Wireless Protocol Inspection',
    platform: 'CYLAB Academy',
    category: 'Wireless Defense',
    difficulty: 'Medium',
    status: 'Active Lab',
    description:
      'Laboratory evaluation of wireless 802.11 management frames, detecting rogue access points, deauthentication attacks, and WPA handshakes.',
    skillsLearned: [
      '802.11 frame inspection',
      'Monitor mode packet capture',
      'Rogue AP identification',
      'Deauthentication anomaly detection',
    ],
    technologies: ['Aircrack-ng', 'Scapy', 'Wireshark', 'Python'],
    date: '2024',
    isPlaceholder: false,
  },
  // Template Placeholder Entry (Clearly marked so Fayid can easily add his next lab)
  {
    id: 'lab-template-next-ctf',
    title: '[Placeholder Template] Upcoming CTF Challenge',
    platform: 'Hack The Box',
    category: 'CTF Challenge',
    difficulty: 'Medium',
    status: 'Practice',
    description:
      'Template entry for upcoming capture-the-flag challenge write-up and key methodology notes.',
    skillsLearned: [
      'Replace with challenge skill 1',
      'Replace with challenge skill 2',
      'Replace with challenge skill 3',
    ],
    technologies: ['Tooling Placeholder'],
    writeupUrl: '#',
    date: 'Upcoming',
    isPlaceholder: true,
  },
]

export function getAllLabs(): SecurityLabItem[] {
  return securityLabsData
}

export function getLabsByPlatform(platform: LabPlatform | 'all'): SecurityLabItem[] {
  if (platform === 'all') return securityLabsData
  return securityLabsData.filter((lab) => lab.platform === platform)
}

export function getPlatformStats() {
  const total = securityLabsData.filter((l) => !l.isPlaceholder).length
  const completed = securityLabsData.filter((l) => l.status === 'Completed' && !l.isPlaceholder).length
  const inProgress = securityLabsData.filter((l) => (l.status === 'In Progress' || l.status === 'Active Lab') && !l.isPlaceholder).length

  return {
    totalActiveEntries: total,
    completed,
    inProgress,
    platformsCount: 3,
  }
}
