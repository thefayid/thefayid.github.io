import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ── Badge / Tag ───────────────────────────────────────────────────────────── */
interface BadgeProps {
  label: string
  accent?: boolean
  dot?: boolean
  className?: string
}

export function Badge({ label, accent, dot, className }: BadgeProps) {
  return (
    <span className={cn('badge', accent && 'badge-accent', className)}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: accent ? 'var(--accent)' : 'var(--color-success)' }}
        />
      )}
      {label}
    </span>
  )
}

/* Keep old name as alias for gradual migration */
export { Badge as Tag }

/* ── Divider ────────────────────────────────────────────────────────────────── */
interface DividerProps {
  className?: string
  vertical?: boolean
  animate?: boolean
}

export function Divider({ className, vertical, animate = true }: DividerProps) {
  if (!animate) {
    return (
      <div
        className={cn(
          vertical ? 'divider-vertical' : 'divider',
          className,
        )}
      />
    )
  }
  return (
    <motion.div
      className={cn(
        vertical ? 'divider-vertical' : 'divider',
        className,
      )}
      initial={vertical ? { scaleY: 0, opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={vertical ? { scaleY: 1, opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: vertical ? 'top' : 'left' }}
    />
  )
}

/* ── Status Dot ─────────────────────────────────────────────────────────────── */
interface StatusDotProps {
  status?: 'available' | 'busy' | 'away'
  label?: string
  className?: string
}

const statusColors = {
  available: '#22C55E',
  busy:      '#EF4444',
  away:      '#F59E0B',
}

export function StatusDot({ status = 'available', label, className }: StatusDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
          style={{ background: statusColors[status] }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ background: statusColors[status] }}
        />
      </span>
      {label && (
        <span className="type-label" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
    </span>
  )
}

/* ── Section Label ────────────────────────────────────────────────────────── */
interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn('section-index type-label', className)}
      style={{ color: 'var(--text-secondary)' }}>
      {children}
    </span>
  )
}
