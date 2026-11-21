import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, CheckCircle2, QrCode, RotateCw, Fingerprint, Lock, Cpu } from 'lucide-react'
import fayidPhoto from '@assets/fayid.jpg'
import { EASE_OUT_EXPO } from '@utils/animations'
import { useReducedMotion } from '@hooks/useReducedMotion'

interface EditorialPortraitProps {
  src?: string
  alt?: string
  className?: string
  caption?: string
  size?: 'sm' | 'md' | 'lg'
  aspectRatio?: string
}

export function EditorialPortrait({
  src = fayidPhoto,
  alt = 'Rahman Fayid PM — Cybersecurity & Systems Operator',
  className = '',
  caption = 'Rahman Fayid PM',
  size = 'md',
  aspectRatio: _aspectRatio,
}: EditorialPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isJiggling, setIsJiggling] = useState(false)
  const [flipAngle, setFlipAngle] = useState(0) // in degrees (multiples of 180)
  const [imgError, setImgError] = useState(false)
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' })
  const prefersReduced = useReducedMotion()

  const isBackSide = Math.abs(Math.round(flipAngle / 180)) % 2 !== 0

  // Compact size mapping specifically designed for an authentic hanging ID badge
  const sizeClasses = {
    sm: 'max-w-[190px]',
    md: 'max-w-[215px] sm:max-w-[230px]',
    lg: 'max-w-[260px]',
  }[size]

  // Trigger 180° Flip with real physics overshoot and settle
  const handleFlip = useCallback(() => {
    if (prefersReduced) {
      setFlipAngle((prev) => prev + 180)
      return
    }
    setIsJiggling(true)
    setFlipAngle((prev) => prev + 180)
  }, [prefersReduced])

  // Trigger full 360° spin with physics inertia
  const handleSpin360 = useCallback(() => {
    if (prefersReduced) {
      setFlipAngle((prev) => prev + 360)
      return
    }
    setIsJiggling(true)
    setFlipAngle((prev) => prev + 360)
  }, [prefersReduced])

  // Trigger rapid jiggle without flipping
  const triggerJiggle = useCallback(() => {
    if (prefersReduced) return
    setIsJiggling(true)
  }, [prefersReduced])

  // Initial greeting flip & settle when first scrolled into view
  useEffect(() => {
    if (!isInView || prefersReduced) return undefined
    const timer = setTimeout(() => {
      triggerJiggle()
    }, 600)
    return () => clearTimeout(timer)
  }, [isInView, prefersReduced, triggerJiggle])

  // Mouse move handler for interactive 3D twisting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || isJiggling) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full ${sizeClasses} ${className} flex flex-col items-center select-none pt-2`}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
      }}
    >
      {/* ── Soft Ambient Glow behind the Hanging Badge ── */}
      <div
        aria-hidden="true"
        className="absolute top-8 -inset-2 rounded-full opacity-35 dark:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, var(--accent) 0%, transparent 68%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ── Realistic Hanging Lanyard Ribbon & Swivel Clasp Anchor ── */}
      <div className="relative flex flex-col items-center z-20 pointer-events-none -mb-2.5">
        {/* Lanyard Fabric Ribbon */}
        <div
          className="w-4.5 sm:w-5 h-11 sm:h-12 relative overflow-hidden rounded-t-xs shadow-sm flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #090D16 0%, #172033 60%, #090D16 100%)',
            borderLeft: '1px solid rgba(59, 130, 246, 0.35)',
            borderRight: '1px solid rgba(59, 130, 246, 0.35)',
          }}
        >
          {/* Subtle Fabric Weave Pattern */}
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56, 189, 248, 0.4) 2px, rgba(56, 189, 248, 0.4) 4px)',
            }}
          />
          <span className="text-[6px] font-mono uppercase tracking-[0.2em] text-blue-300/90 font-extrabold -rotate-90 select-none whitespace-nowrap">
            SEC.PASS
          </span>
        </div>

        {/* Brushed Metallic Clip / Clamp */}
        <div
          className="w-7 h-3 rounded-xs relative z-10 flex items-center justify-center shadow-md -mt-0.5"
          style={{
            background: 'linear-gradient(180deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)',
            border: '1px solid rgba(255, 255, 255, 0.45)',
          }}
        >
          {/* Clamp Center Rivet Screw */}
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 border border-slate-600 shadow-inner" />
        </div>

        {/* Metal Swivel Ring Connecting to Card Punch Hole */}
        <div
          className="w-4 h-4 rounded-full -mt-0.5 border-2 border-slate-400 bg-transparent relative z-0 shadow-xs"
          style={{
            borderColor: '#64748B',
          }}
        />
      </div>

      {/* ── 3D Flipping & Twisting Suspended Card ── */}
      <motion.div
        className="w-full relative z-10 cursor-pointer origin-top"
        onClick={handleFlip}
        title="Click to flip badge 180°"
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
        }}
        animate={
          prefersReduced
            ? { rotateY: flipAngle }
            : isJiggling
            ? {
                // High-energy 3D flip with realistic physical overshoot & settling recoil
                rotateY: [
                  flipAngle - 180,
                  flipAngle + 20,
                  flipAngle - 14,
                  flipAngle + 8,
                  flipAngle - 4,
                  flipAngle + 1.5,
                  flipAngle,
                ],
                rotateZ: [0, -16, 14, -9, 6, -3, 1, 0],
                rotateX: [0, -10, 8, -5, 3, -1, 0],
                x: [0, -5, 4, -3, 2, -1, 0],
              }
            : isHovered
            ? {
                // Interactive 3D mouse tilt tracking (respects current face orientation)
                rotateY: flipAngle + (isBackSide ? -mousePos.x * 22 : mousePos.x * 22),
                rotateX: -mousePos.y * 18,
                rotateZ: mousePos.x * 5,
                x: mousePos.x * 3,
              }
            : {
                // Natural ambient pendulum sway
                rotateY: [flipAngle - 3, flipAngle + 3, flipAngle - 3],
                rotateZ: [-1.8, 1.8, -1.8],
                x: [-1, 1, -1],
              }
        }
        transition={
          prefersReduced
            ? { duration: 0.3 }
            : isJiggling
            ? {
                duration: 1.45,
                ease: [0.22, 1, 0.36, 1], // natural snappy physical decay
              }
            : isHovered
            ? {
                type: 'spring',
                stiffness: 280,
                damping: 22,
                mass: 0.5,
              }
            : {
                repeat: Infinity,
                duration: 5.6,
                ease: 'easeInOut',
              }
        }
        onAnimationComplete={() => {
          if (isJiggling) setIsJiggling(false)
        }}
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.97,
        }}
      >
        {/* ══════════════════════════════════════════════════════════════
            FRONT FACE OF THE BADGE (Photo & Identity Credentials)
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-2xl p-3 overflow-hidden transition-shadow duration-300"
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border)',
            boxShadow: isHovered
              ? '0 20px 40px -10px rgba(15, 23, 42, 0.22), 0 0 0 1px var(--accent-border)'
              : '0 12px 28px -8px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(1px)',
          }}
        >
          {/* Dynamic Specular Sheen (Glides Across Card on Mouse Move) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered && !isBackSide ? 0.35 : 0,
              background: `linear-gradient(${115 + mousePos.x * 45}deg, transparent 25%, rgba(255,255,255,0.45) 50%, transparent 75%)`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Top Punched Badge Hole (Where the Clip Loops Through) */}
          <div className="flex justify-center -mt-1 mb-2">
            <div
              className="w-7 h-1.5 rounded-full border border-[var(--border)] shadow-inner"
              style={{
                background: 'var(--bg-elevated)',
              }}
            />
          </div>

          {/* Top Card Telemetry Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-[8.5px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>PASS: SEC</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
              LVL 04
            </span>
          </div>

          {/* Middle Section: Portrait Photograph Frame with Cyber Security Reticles */}
          <div className="relative mt-2 mb-2.5 group/photo">
            {/* Photo Container */}
            <div
              className="relative aspect-square w-full rounded-xl overflow-hidden border border-[var(--border)] shadow-xs"
              style={{
                background: 'var(--bg-elevated)',
              }}
            >
              {!imgError ? (
                <img
                  src={src}
                  alt={alt}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/photo:scale-105"
                  style={{
                    filter: isHovered ? 'contrast(1.02) brightness(1.01)' : 'contrast(1.0)',
                  }}
                />
              ) : (
                /* Monogram Fallback */
                <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-elevated)] text-[var(--accent)]">
                  <Shield size={30} className="mb-2" />
                  <span className="font-display font-extrabold text-lg text-[var(--text-primary)]">RF</span>
                </div>
              )}

              {/* Cyber Security Corner Reticle Accents */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-sky-400 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-sky-400 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-sky-400 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-sky-400 pointer-events-none" />

              {/* Bottom depth vignette */}
              <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* RFID Smart Chip Mockup (Overlayed at bottom right of photo) */}
              <div
                className="absolute bottom-1.5 right-1.5 w-5.5 h-4 rounded-[2px] border border-amber-300/70 shadow-xs overflow-hidden flex flex-col justify-between p-0.5 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)',
                }}
                title="Smart RFID Security Chip"
              >
                <div className="w-full h-[1px] bg-amber-950/40 my-auto" />
                <div className="w-[1px] h-full bg-amber-950/40 mx-auto -mt-2" />
              </div>
            </div>
          </div>

          {/* Operator Details & Credentials */}
          <div className="space-y-0.5 text-center">
            <h3 className="font-display font-extrabold text-sm text-[var(--text-primary)] tracking-tight">
              {caption}
            </h3>
            <p className="font-mono text-[10px] text-[var(--accent)] font-bold tracking-wide">
              Cybersecurity &amp; Systems
            </p>
            <p className="font-mono text-[8.5px] text-[var(--text-tertiary)] pt-0.5">
              BCA &bull; Jain University, Kochi
            </p>
          </div>

          {/* Card Footer: Security Barcode & Hologram Foil */}
          <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
            {/* Scannable Barcode SVG */}
            <div className="flex flex-col items-start gap-0.5">
              <svg width="68" height="13" viewBox="0 0 68 13" fill="currentColor" className="text-[var(--text-primary)] opacity-70">
                <rect x="0" y="0" width="1.8" height="13" />
                <rect x="3" y="0" width="1" height="13" />
                <rect x="5.5" y="0" width="2.2" height="13" />
                <rect x="9" y="0" width="1" height="13" />
                <rect x="11.5" y="0" width="1.8" height="13" />
                <rect x="15" y="0" width="3" height="13" />
                <rect x="19.5" y="0" width="1" height="13" />
                <rect x="22" y="0" width="2.2" height="13" />
                <rect x="25.5" y="0" width="1" height="13" />
                <rect x="28" y="0" width="1.8" height="13" />
                <rect x="31.5" y="0" width="2.2" height="13" />
                <rect x="35" y="0" width="1" height="13" />
                <rect x="38" y="0" width="3" height="13" />
                <rect x="42.5" y="0" width="1" height="13" />
                <rect x="45" y="0" width="1.8" height="13" />
                <rect x="48.5" y="0" width="2.2" height="13" />
                <rect x="52" y="0" width="1" height="13" />
                <rect x="54.5" y="0" width="1.8" height="13" />
                <rect x="58" y="0" width="3" height="13" />
                <rect x="62.5" y="0" width="1.8" height="13" />
              </svg>
              <span className="text-[7px] text-[var(--text-tertiary)] tracking-widest font-mono">
                RF-2026-BCA
              </span>
            </div>

            {/* Holographic Security Foil Badge */}
            <div
              className="px-1.5 py-0.5 rounded border border-[var(--border)] text-[8px] font-mono font-bold flex items-center gap-1 shadow-2xs"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(168, 85, 247, 0.16) 50%, rgba(34, 197, 94, 0.12) 100%)',
                color: 'var(--text-primary)',
              }}
            >
              <CheckCircle2 size={9} className="text-[var(--accent)]" />
              <span>VERIFIED</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BACK FACE OF THE BADGE (Magnetic Stripe, QR Code, Spec Key)
            ══════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl p-3 flex flex-col justify-between overflow-hidden transition-shadow duration-300"
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border)',
            boxShadow: isHovered
              ? '0 20px 40px -10px rgba(15, 23, 42, 0.22), 0 0 0 1px var(--accent-border)'
              : '0 12px 28px -8px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
          }}
        >
          {/* Dynamic Specular Sheen for Back */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered && isBackSide ? 0.35 : 0,
              background: `linear-gradient(${115 - mousePos.x * 45}deg, transparent 25%, rgba(255,255,255,0.45) 50%, transparent 75%)`,
              mixBlendMode: 'overlay',
            }}
          />

          <div>
            {/* Top Punched Badge Hole (Mirrored) */}
            <div className="flex justify-center -mt-1 mb-2">
              <div
                className="w-7 h-1.5 rounded-full border border-[var(--border)] shadow-inner"
                style={{
                  background: 'var(--bg-elevated)',
                }}
              />
            </div>

            {/* Magnetic Stripe Track */}
            <div className="-mx-3 mb-2.5 h-6 bg-slate-900 border-y border-slate-700/60 flex items-center justify-between px-3 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #64748B, #64748B 2px, transparent 2px, transparent 6px)',
                }}
              />
              <span className="text-[7px] font-mono text-slate-400 tracking-widest relative z-10">
                MAGNETIC ENCODED TRACK // ISO-7810
              </span>
              <Lock size={8} className="text-slate-400 relative z-10" />
            </div>

            {/* QR Code & Access Matrix Box */}
            <div className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center gap-2.5 mb-2.5">
              <div className="p-1 rounded-lg bg-white text-slate-950 shadow-inner flex items-center justify-center shrink-0">
                <QrCode size={38} className="text-slate-950" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5 font-mono text-[8px] text-[var(--text-tertiary)]">
                <div className="flex items-center gap-1 text-[var(--accent)] font-bold">
                  <Fingerprint size={10} />
                  <span className="truncate">AUTH_TOKEN: RF-7F9B</span>
                </div>
                <div className="truncate">ENC: AES-256-GCM</div>
                <div className="truncate">SYS: DEFENSE_SIEM</div>
                <div className="text-emerald-500 font-bold truncate">STATUS: AUTHORIZED</div>
              </div>
            </div>

            {/* Authorized Signature Strip */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[7px] font-mono uppercase text-[var(--text-tertiary)]">
                <span>Authorized Signature</span>
                <span className="text-[var(--accent)] flex items-center gap-0.5">
                  <Cpu size={8} /> PKI VALID
                </span>
              </div>
              <div
                className="w-full h-6 rounded border border-[var(--border)] px-2 flex items-center justify-between shadow-inner"
                style={{
                  background: 'linear-gradient(90deg, rgba(248, 250, 252, 0.08) 0%, rgba(241, 245, 249, 0.14) 100%)',
                }}
              >
                <span className="font-mono italic font-bold text-[10px] text-[var(--accent)] tracking-wider">
                  Rahman Fayid PM
                </span>
                <span className="text-[7.5px] font-mono text-[var(--text-tertiary)]">
                  0x7F9B::SEC
                </span>
              </div>
            </div>
          </div>

          {/* Back Card Footer: Security Dispatch Disclaimer */}
          <div className="pt-2 border-t border-[var(--border-subtle)] text-[7px] font-mono text-[var(--text-tertiary)] leading-tight flex items-center justify-between">
            <span className="truncate">IF FOUND, RETURN TO SECURITY LABS</span>
            <div className="flex items-center gap-1 text-emerald-500 font-bold shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PASS VALID</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Interactive Physical Action Controls ── */}
      <div className="mt-2.5 flex items-center gap-2">
        {/* Flip 180° Button */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleFlip()
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/75 cursor-pointer hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] transition-all select-none shadow-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Flip badge to see credentials back / front"
        >
          <RotateCw size={9} className={`text-[var(--accent)] ${isJiggling ? 'animate-spin' : ''}`} />
          <span>{isBackSide ? 'Flip to Front' : 'Flip to Back'}</span>
        </motion.button>

        {/* 360° Spin Button */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleSpin360()
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-mono text-[var(--text-tertiary)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 cursor-pointer hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] transition-all select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Spin 360 degrees with inertia"
        >
          <span>360° Spin</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
