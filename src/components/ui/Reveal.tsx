import React from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '@utils/animations'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
}

/**
 * Reveal – stagger container that fires once elements enter the viewport.
 */
export function Reveal({ children, className, delay = 0, stagger = 0.08 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * RevealLine – single line that slides up from overflow hidden.
 */
export function RevealLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <span className="line-reveal block overflow-hidden">
      <motion.span
        className={`block ${className ?? ''}`}
        variants={fadeUp}
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
