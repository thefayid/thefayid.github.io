import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  label:     string
  href?:     string
  onClick?:  () => void
  variant?:  ButtonVariant
  size?:     ButtonSize
  className?: string
  external?: boolean
  icon?:     React.ReactNode
  iconEnd?:  React.ReactNode
  disabled?: boolean
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const variantMap: Record<ButtonVariant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  ghost:     'btn-ghost',
}

export function Button({
  label, href, onClick, variant = 'outline', size = 'md',
  className, external, icon, iconEnd, disabled,
}: ButtonProps) {
  const classes = cn('btn', sizeMap[size], variantMap[variant], className)

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap:   { scale: disabled ? 1 : 0.97 },
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
  }

  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
      {iconEnd && <span className="shrink-0">{iconEnd}</span>}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
        {...motionProps}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...motionProps}
    >
      {inner}
    </motion.button>
  )
}
