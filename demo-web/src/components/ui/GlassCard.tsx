import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  selected?: boolean
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  onClick,
  selected,
}: GlassCardProps) {
  const interactive = Boolean(onClick)
  return (
    <motion.div
      initial={false}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive && onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      whileHover={
        hover || interactive
          ? {
              y: -2,
              transition: { type: 'spring', stiffness: 400, damping: 28 },
            }
          : undefined
      }
      className={`glass-panel rounded-2xl ${interactive ? 'cursor-pointer outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-violet-400/50' : ''} ${selected ? 'ring-2 ring-violet-400/45 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
