import { motion } from 'framer-motion'
import {
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Wifi,
  BarChart3,
} from 'lucide-react'

// ─── 1. AeroGuard Visual Artwork: Wireless Radar & Passive Network Monitoring ───
export function AeroGuardVisual() {
  return (
    <div
      className="relative w-full h-[240px] sm:h-[275px] md:h-[305px] rounded-[var(--radius-xl)] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-slate-700/60 shadow-xl transition-all duration-500"
      style={{
        background: 'linear-gradient(145deg, #090D1A 0%, #0F172A 100%)',
      }}
    >
      {/* Background Radar Circles & Grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[110px] h-[110px] rounded-full border border-sky-500/25" />
        <div className="w-[190px] h-[190px] rounded-full border border-sky-500/20" />
        <div className="w-[270px] h-[270px] rounded-full border border-sky-500/15" />
        <div className="absolute w-full h-[1px] bg-sky-500/20" />
        <div className="absolute h-full w-[1px] bg-sky-500/20" />

        {/* Rotating Radar Sweep Beam */}
        <motion.div
          className="absolute w-[270px] h-[270px] rounded-full pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(56, 189, 248, 0.35) 0deg, transparent 65deg, transparent 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />
      </div>

      {/* Top Console Title Bar with Hardware Dots */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-700/60 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-200 font-semibold tracking-wide">AEROGUARD // WIDS SENSOR</span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
          LIVE · 2.4G &amp; 5GHz
        </span>
      </div>

      {/* Simulated Live Detection Nodes */}
      <div className="relative z-10 my-auto flex items-center justify-around px-1 gap-2">
        {/* Node 1: Monitored AP */}
        <div className="flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-lg border border-sky-500/30 bg-slate-900/80 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 font-medium">
            <Wifi size={13} />
            <span>BSSID: MON-01</span>
          </div>
          <span className="text-[10px] font-mono text-slate-300">-52 dBm · CH 36</span>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
            AUTHENTIC
          </span>
        </div>

        {/* Node 2: Defense Telemetry */}
        <div className="flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-lg border border-blue-500/30 bg-slate-900/80 backdrop-blur-md shadow-md">
          <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 font-medium">
            <ShieldCheck size={13} />
            <span>DEAUTH GUARD</span>
          </div>
          <span className="text-[10px] font-mono text-slate-300">Burst Ratio: Normal</span>
          <span className="text-[9px] font-mono text-sky-400 bg-sky-500/20 px-1.5 py-0.5 rounded font-bold">
            GUARDRAIL ACTIVE
          </span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] pt-2 border-t border-slate-700/60 text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Docker Containerized</span>
        </span>
        <span className="text-slate-300">Packet Loss: 0.00%</span>
      </div>
    </div>
  )
}

// ─── 2. PhoenixSec Visual Artwork: DevSecOps Pipeline Architecture ───
export function PhoenixSecVisual() {
  const steps = [
    { title: 'Source', tag: 'Commit attestation', status: 'PASS' },
    { title: 'SAST Scan', tag: 'Ast-grep & static rules', status: 'PASS' },
    { title: 'Guardrails', tag: 'Secret & policy check', status: 'VERIFIED' },
    { title: 'Deploy', tag: 'Signed artifact output', status: 'READY' },
  ]

  return (
    <div
      className="relative w-full h-[240px] sm:h-[275px] md:h-[305px] rounded-[var(--radius-xl)] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-slate-700/60 shadow-xl transition-all duration-500"
      style={{
        background: 'linear-gradient(145deg, #090D1A 0%, #0F172A 100%)',
      }}
    >
      {/* Top Console Title Bar with Hardware Dots */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-200 font-semibold tracking-wide">PHOENIXSEC // PIPELINE HARNESS</span>
        </div>
        <span className="text-amber-400 font-mono text-[10px] bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
          CI/CD GUARDRAILS
        </span>
      </div>

      {/* Pipeline Stage Architecture Flow */}
      <div className="my-auto space-y-2.5 sm:space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map((st, i) => (
            <div
              key={st.title}
              className="p-2 sm:p-2.5 rounded-lg border border-slate-700/60 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-400 font-bold">0{i + 1}</span>
                <CheckCircle2 size={12} className="text-emerald-400" />
              </div>
              <h5 className="font-display font-bold text-xs text-slate-100 mb-0.5">{st.title}</h5>
              <span className="text-[9px] font-mono text-slate-400 leading-tight truncate">{st.tag}</span>
            </div>
          ))}
        </div>

        {/* Abstract CLI Terminal Snip */}
        <div
          className="p-2.5 sm:p-3 rounded-lg border border-slate-700/60 font-mono text-[11px] text-slate-300 space-y-1 shadow-inner"
          style={{ background: 'rgba(6, 9, 18, 0.9)' }}
        >
          <div className="flex items-center gap-2 text-sky-400 text-[10px]">
            <Terminal size={12} />
            <span>$ phoenixsec evaluate --pipeline --strict</span>
          </div>
          <p className="text-[10px] text-emerald-400/90 pl-3">✔ 0 vulnerabilities above policy threshold</p>
          <p className="text-[10px] text-slate-400 pl-3">✔ Security guardrail integrity: 100% verified</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-slate-700/60 text-slate-400">
        <span>Multi-runtime: Python · TS · PowerShell</span>
        <span className="text-emerald-400 font-medium">Guardrails: Enforced</span>
      </div>
    </div>
  )
}

// ─── 3. NEO Visual Artwork: Multimodal AI & Autonomous Operator ───
export function NEOVisual() {
  return (
    <div
      className="relative w-full h-[240px] sm:h-[275px] md:h-[305px] rounded-[var(--radius-xl)] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-slate-700/60 shadow-xl transition-all duration-500"
      style={{
        background: 'linear-gradient(145deg, #090D1A 0%, #0F172A 100%)',
      }}
    >
      {/* Top Console Title Bar with Hardware Dots */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-200 font-semibold tracking-wide">NEO // MULTIMODAL OPERATOR</span>
        </div>
        <span className="text-indigo-400 font-mono text-[10px] bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/30">
          VISION + OS AUTOMATION
        </span>
      </div>

      {/* Core AI Orchestration Diagram */}
      <div className="my-auto space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg border border-indigo-500/30 bg-slate-900/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-indigo-400 font-bold block mb-1">// REAL-TIME VISION</span>
            <p className="text-xs text-slate-200">PyAutoGUI + MSS Screen Capture Pipeline</p>
          </div>
          <div className="p-2.5 rounded-lg border border-purple-500/30 bg-slate-900/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">// SPEECH PIPELINE</span>
            <p className="text-xs text-slate-200">Faster-Whisper STT + Edge TTS Synthesis</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-slate-700/60 text-slate-400">
        <span>Dual Pipeline: Gemini API + Local Ollama</span>
        <span className="text-indigo-400 font-medium">Autonomous Execution</span>
      </div>
    </div>
  )
}

// ─── 4. PantherPOS Visual Artwork: Offline-First Retail Interface ───
export function PantherPOSVisual() {
  return (
    <div
      className="relative w-full h-[240px] sm:h-[275px] md:h-[305px] rounded-[var(--radius-xl)] overflow-hidden p-4 sm:p-5 flex flex-col justify-between border border-slate-700/60 shadow-xl transition-all duration-500"
      style={{
        background: 'linear-gradient(145deg, #090D1A 0%, #0F172A 100%)',
      }}
    >
      {/* Top Console Title Bar with Hardware Dots */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-200 font-semibold tracking-wide">PANTHER POS // TERMINAL</span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
          OFFLINE-FIRST SYNC
        </span>
      </div>

      {/* Retail Interface & Analytics Mock */}
      <div className="my-auto space-y-2.5">
        <div className="p-3 rounded-lg border border-slate-700/60 bg-slate-900/80 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Active Transaction #08942</span>
            <span className="font-semibold text-emerald-400">Processed (Local Store)</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <BarChart3 size={13} className="text-sky-400" />
              <span>Real-Time Inventory</span>
            </span>
            <span className="text-slate-200 font-medium">99.8% Sync Efficiency</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-slate-700/60 text-slate-400">
        <span>Electron Desktop · Capacitor Mobile</span>
        <span className="text-emerald-400 font-medium">AI Analytics Ready</span>
      </div>
    </div>
  )
}

// ─── Dispatcher ───
export function ProjectVisualArtwork({ slug }: { slug: string }) {
  switch (slug) {
    case 'aeroguard-wids':
      return <AeroGuardVisual />
    case 'phoenixsec':
      return <PhoenixSecVisual />
    case 'neo-autonomous-computer-operator':
      return <NEOVisual />
    case 'pantherpos':
      return <PantherPOSVisual />
    default:
      return <AeroGuardVisual />
  }
}
