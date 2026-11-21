import { motion } from 'framer-motion'
import { Reveal, Divider, SectionLabel } from '@components/ui'
import { fadeUp, staggerContainer } from '@utils/animations'

const steps = [
  {
    index: '01',
    title: 'Probe & Recon',
    description:
      'Map the surface, inspect packet flows, and dissect system architecture to discover where implicit trust breaks down.',
  },
  {
    index: '02',
    title: 'Dissect & Model',
    description:
      'Recreate vectors in controlled lab environments (Hack The Box, TryHackMe, Docker sandboxes) to isolate the root cause.',
  },
  {
    index: '03',
    title: 'Engineer Guardrails',
    description:
      'Build defensive countermeasures, automated detection rules, DevSecOps pipelines, or custom Python analysis tooling.',
  },
  {
    index: '04',
    title: 'Harden & Telemetry',
    description:
      'Integrate SIEM log pipelines, enforce least privilege, and automate repetitive audits for continuous resilience.',
  },
]

export function Process() {
  return (
    <section id="process" className="section-wrapper">
      <div className="container-site">
        <Reveal className="section-header-spacing">
          <motion.div variants={fadeUp}>
            <SectionLabel className="mb-2.5">How I Work</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="type-display-md"
            style={{ color: 'var(--text-primary)' }}
          >
            The process
          </motion.h2>
        </Reveal>

        <Divider />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.index}
              variants={fadeUp}
              className={`group py-8 sm:py-10 px-0 md:px-6 lg:px-8 flex flex-col justify-between border-b md:border-b-0 ${
                i % 2 === 0 ? 'md:border-r' : 'md:border-r-0'
              } ${
                i < steps.length - 1 ? 'lg:border-r' : 'lg:border-r-0'
              } ${
                i < 2 ? 'md:border-b' : 'md:border-b-0'
              } border-[var(--border)]`}
            >
              <div>
                <span className="type-num type-label block mb-4 sm:mb-6" style={{ color: 'var(--text-tertiary)' }}>
                  {step.index}
                </span>
                <h3
                  className="type-display-sm mb-3 sm:mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>
                <p className="type-body-sm text-xs sm:text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                  {step.description}
                </p>
              </div>
              {/* Accent marker on hover */}
              <motion.div
                className="mt-6 sm:mt-8 h-px w-6"
                style={{ background: 'var(--accent)' }}
                initial={{ width: '0.375rem', opacity: 0.3 }}
                whileHover={{ width: '2.5rem', opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Section End Chapter Divider */}
        <div className="section-divider" />
      </div>
    </section>
  )
}
