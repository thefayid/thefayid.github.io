export interface SkillItem {
  id: string
  name: string
  categoryId: 'security' | 'networking' | 'systems' | 'development' | 'tools'
  context: string
  applications: string[]
  relatedSkillIds: string[]
  iconName?: string
}

export interface SkillCategory {
  id: 'security' | 'networking' | 'systems' | 'development' | 'tools'
  name: string
  index: string
  tagline: string
  accentColor: string
  icon: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'security',
    name: 'Security',
    index: '01',
    tagline: 'Defensive principles, vulnerability analysis & threat detection',
    accentColor: '#3B82F6', // Blue
    icon: 'Shield',
    skills: [
      {
        id: 'web-security',
        name: 'Web security',
        categoryId: 'security',
        context:
          'Analysis of web application vulnerabilities, OWASP Top 10 vectors, authentication flaws, and client-server security headers.',
        applications: ['OWASP analysis', 'Authentication review', 'Header inspection'],
        relatedSkillIds: ['burp-suite', 'security-testing', 'javascript'],
      },
      {
        id: 'vulnerability-assessment',
        name: 'Vulnerability assessment',
        categoryId: 'security',
        context:
          'Systematic identification and evaluation of security weaknesses across network hosts, services, and software layers.',
        applications: ['Host audits', 'Misconfiguration discovery', 'Attack surface mapping'],
        relatedSkillIds: ['nmap', 'threat-detection', 'cybersecurity-fundamentals'],
      },
      {
        id: 'security-testing',
        name: 'Security testing',
        categoryId: 'security',
        context:
          'Hands-on exploration in controlled lab environments (Hack The Box, TryHackMe) to dissect attack methodologies and validate defenses.',
        applications: ['CTF challenges', 'Defensive validation', 'Controlled exploit tests'],
        relatedSkillIds: ['web-security', 'burp-suite', 'nmap', 'python'],
      },
      {
        id: 'threat-detection',
        name: 'Threat detection',
        categoryId: 'security',
        context:
          'Formulating detection logic, monitoring anomalous telemetry, and identifying indicators of compromise across systems.',
        applications: ['SIEM rules', 'Anomaly detection', 'Log correlation'],
        relatedSkillIds: ['elasticsearch', 'kibana', 'wireshark', 'vulnerability-assessment'],
      },
      {
        id: 'cybersecurity-fundamentals',
        name: 'Cybersecurity fundamentals',
        categoryId: 'security',
        context:
          'Core defensive tenets including CIA triad, least privilege, zero trust concepts, threat modeling, and defense-in-depth architecture.',
        applications: ['Security architecture', 'Access control models', 'Threat modeling'],
        relatedSkillIds: ['vulnerability-assessment', 'sysadmin-fundamentals', 'linux'],
      },
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    index: '02',
    tagline: 'Protocol inspection, network traffic dissection & troubleshooting',
    accentColor: '#06B6D4', // Cyan
    icon: 'Network',
    skills: [
      {
        id: 'tcp-ip',
        name: 'TCP/IP',
        categoryId: 'networking',
        context:
          'Understanding packet framing, three-way handshakes, routing mechanisms, socket abstractions, and transport reliability.',
        applications: ['Handshake analysis', 'Packet structure', 'Socket communication'],
        relatedSkillIds: ['network-traffic-analysis', 'wireshark', 'network-fundamentals'],
      },
      {
        id: 'network-fundamentals',
        name: 'Network fundamentals',
        categoryId: 'networking',
        context:
          'Subnetting, switching, routing protocols, OSI model interactions, and the mechanics of local and wide-area networks.',
        applications: ['Subnet calculation', 'Routing topologies', 'OSI layer mapping'],
        relatedSkillIds: ['tcp-ip', 'dns', 'networking-troubleshooting'],
      },
      {
        id: 'network-traffic-analysis',
        name: 'Network traffic analysis',
        categoryId: 'networking',
        context:
          'Deep packet inspection, packet stream reconstruction, and identifying suspicious frame sequences and anomalous payloads.',
        applications: ['PCAP inspection', 'Protocol decoding', 'Traffic anomaly triage'],
        relatedSkillIds: ['wireshark', 'tcp-ip', 'threat-detection'],
      },
      {
        id: 'dns',
        name: 'DNS',
        categoryId: 'networking',
        context:
          'Domain resolution hierarchies, DNS record structures, troubleshooting name resolution errors, and inspecting potential tunneling.',
        applications: ['Record lookup', 'Zone analysis', 'Resolution debugging'],
        relatedSkillIds: ['network-fundamentals', 'networking-troubleshooting', 'wireshark'],
      },
      {
        id: 'networking-troubleshooting',
        name: 'Networking troubleshooting',
        categoryId: 'networking',
        context:
          'Diagnosing packet drops, routing loops, latency bottlenecks, configuration conflicts, and protocol anomalies.',
        applications: ['Connectivity diagnostics', 'Latency isolation', 'Routing fixes'],
        relatedSkillIds: ['network-fundamentals', 'tcp-ip', 'dns', 'wireshark'],
      },
    ],
  },
  {
    id: 'systems',
    name: 'Systems',
    index: '03',
    tagline: 'Operating system internals, Linux administration & shell automation',
    accentColor: '#10B981', // Emerald
    icon: 'Terminal',
    skills: [
      {
        id: 'linux',
        name: 'Linux',
        categoryId: 'systems',
        context:
          'Primary working environment for security tooling, process management, kernel log review, and containerized deployments.',
        applications: ['System configuration', 'Service management', 'File permission hardening'],
        relatedSkillIds: ['bash', 'sysadmin-fundamentals', 'python'],
      },
      {
        id: 'windows',
        name: 'Windows',
        categoryId: 'systems',
        context:
          'Navigating Windows administration, service architectures, Event Viewer telemetry, and endpoint security mechanisms.',
        applications: ['Event log inspection', 'Registry navigation', 'Service management'],
        relatedSkillIds: ['sysadmin-fundamentals', 'cybersecurity-fundamentals'],
      },
      {
        id: 'bash',
        name: 'Bash',
        categoryId: 'systems',
        context:
          'Shell scripting for automated task execution, pipeline data parsing, text manipulation (grep/awk/sed), and environment setup.',
        applications: ['Shell scripting', 'Log extraction', 'Workflow automation'],
        relatedSkillIds: ['linux', 'automation', 'git'],
      },
      {
        id: 'sysadmin-fundamentals',
        name: 'System administration fundamentals',
        categoryId: 'systems',
        context:
          'Privilege separation, user access controls, process monitoring, package lifecycle, and baseline host hardening.',
        applications: ['User management', 'Access auditing', 'Daemon monitoring'],
        relatedSkillIds: ['linux', 'windows', 'cybersecurity-fundamentals'],
      },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    index: '04',
    tagline: 'Defensive tooling, scripting, database interaction & version control',
    accentColor: '#8B5CF6', // Purple
    icon: 'Code2',
    skills: [
      {
        id: 'python',
        name: 'Python',
        categoryId: 'development',
        context:
          'Primary language for crafting custom security tools, automation scripts, packet parsers (AeroGuard), and AI assistants (NEO).',
        applications: ['Security tooling', 'Automation pipelines', 'API & AI integration'],
        relatedSkillIds: ['automation', 'git', 'security-testing'],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        categoryId: 'development',
        context:
          'Frontend script execution, DOM manipulation, asynchronous communication, and evaluating client-side application logic.',
        applications: ['Frontend interfaces', 'Interactive tools', 'Client security review'],
        relatedSkillIds: ['web-security', 'git'],
      },
      {
        id: 'sql',
        name: 'SQL',
        categoryId: 'development',
        context:
          'Relational database querying, structured data modeling, transactional queries, and understanding injection vectors.',
        applications: ['Data queries', 'Schema structure', 'Injection defense'],
        relatedSkillIds: ['web-security', 'python'],
      },
      {
        id: 'git',
        name: 'Git',
        categoryId: 'development',
        context:
          'Distributed source control, branch isolation, code review workflows, and commit management across security repositories.',
        applications: ['Version tracking', 'Branch workflows', 'Repository management'],
        relatedSkillIds: ['python', 'bash', 'automation'],
      },
      {
        id: 'automation',
        name: 'Automation',
        categoryId: 'development',
        context:
          'Eliminating repetitive operational steps through automated scripts, scheduled telemetry checks, and data parsers.',
        applications: ['Task scripting', 'Log batch parsing', 'Test automation'],
        relatedSkillIds: ['python', 'bash', 'filebeat'],
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    index: '05',
    tagline: 'Practical utilities for inspection, scanning & enterprise telemetry',
    accentColor: '#F59E0B', // Amber
    icon: 'Wrench',
    skills: [
      {
        id: 'burp-suite',
        name: 'Burp Suite',
        categoryId: 'tools',
        context:
          'HTTP/HTTPS proxying, request/response intercept and manipulation, endpoint mapping, and security testing.',
        applications: ['Request tampering', 'Proxy interception', 'Parameter fuzzing'],
        relatedSkillIds: ['web-security', 'security-testing'],
      },
      {
        id: 'nmap',
        name: 'Nmap',
        categoryId: 'tools',
        context:
          'Network discovery, active port auditing, service and OS fingerprinting, and automated NSE vulnerability checks.',
        applications: ['Port discovery', 'Service detection', 'Network inventory'],
        relatedSkillIds: ['vulnerability-assessment', 'network-fundamentals'],
      },
      {
        id: 'wireshark',
        name: 'Wireshark',
        categoryId: 'tools',
        context:
          'Protocol dissection, live interface packet capture, display filtering, and wireless 802.11 frame inspection.',
        applications: ['PCAP inspection', 'Filter expressions', 'Protocol debugging'],
        relatedSkillIds: ['network-traffic-analysis', 'tcp-ip', 'threat-detection'],
      },
      {
        id: 'elasticsearch',
        name: 'Elasticsearch',
        categoryId: 'tools',
        context:
          'Distributed indexing and real-time search engine for aggregating, querying, and analyzing security event telemetry.',
        applications: ['Log indexing', 'JSON telemetry queries', 'SIEM backend'],
        relatedSkillIds: ['kibana', 'filebeat', 'threat-detection'],
      },
      {
        id: 'kibana',
        name: 'Kibana',
        categoryId: 'tools',
        context:
          'Visualizing SIEM dashboards, building telemetry charts, and monitoring alerts generated from security logs.',
        applications: ['Security dashboards', 'Visual analytics', 'Alert visualization'],
        relatedSkillIds: ['elasticsearch', 'filebeat', 'threat-detection'],
      },
      {
        id: 'filebeat',
        name: 'Filebeat',
        categoryId: 'tools',
        context:
          'Lightweight log shipper harvesting system and audit events and forwarding them reliably into the ELK cluster.',
        applications: ['Log harvesting', 'Telemetry forwarding', 'System auditing'],
        relatedSkillIds: ['elasticsearch', 'kibana', 'linux'],
      },
    ],
  },
]

export const allSkills: SkillItem[] = skillCategories.flatMap((cat) => cat.skills)

export function getSkillById(id: string): SkillItem | undefined {
  return allSkills.find((s) => s.id === id)
}

export function getCategoryById(id: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.id === id)
}
