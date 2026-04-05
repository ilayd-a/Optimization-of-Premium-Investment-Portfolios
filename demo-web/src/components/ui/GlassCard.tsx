import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={
        hover
          ? {
              y: -2,
              transition: { type: 'spring', stiffness: 400, damping: 28 },
            }
          : undefined
      }
      className={`glass-panel rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
