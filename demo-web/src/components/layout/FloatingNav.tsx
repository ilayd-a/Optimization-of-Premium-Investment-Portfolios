import { motion } from 'framer-motion'
import { Layers, LineChart, Sparkles, Target, Zap } from 'lucide-react'

const links = [
  { id: 'problem', label: 'Problem', icon: Target },
  { id: 'method', label: 'Pipeline', icon: Layers },
  { id: 'comparison', label: 'Results', icon: LineChart },
  { id: 'stress', label: 'Stress', icon: Zap },
  { id: 'why', label: 'Why', icon: Sparkles },
] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function FloatingNav() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-5"
      aria-label="Section navigation"
    >
      <div className="pointer-events-auto glass-panel flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full px-2 py-1.5 sm:gap-1 sm:px-3">
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-frost/80 transition-colors hover:bg-white/5 hover:text-frost sm:text-sm"
          >
            <Icon className="size-3.5 opacity-70 sm:size-4" aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  )
}
