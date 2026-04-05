import { motion } from 'framer-motion'
import { Boxes, Cpu, Landmark, Orbit } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

const cards = [
  {
    icon: Boxes,
    title: 'Discrete decisions, native encoding',
    body: 'Many mandates force coarse allocation steps. QUBO formulations treat those steps as first-class variables instead of rounding continuous relaxations after the fact.',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
  },
  {
    icon: Cpu,
    title: 'New optimization surfaces',
    body: 'Quantum and quantum-inspired heuristics explore nonconvex energy landscapes that trap classical greedy solvers—especially when constraints interact.',
    accent: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    icon: Landmark,
    title: 'Constrained capital in practice',
    body: 'Insurance and institutional portfolios operate with sleeve limits, liquidity rules, and liability-aware risk budgets. Discrete allocation grids match how those books are actually traded and reported.',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: Orbit,
    title: 'Hardware and finance, linked',
    body: 'Eight qubits keep the circuit story tangible while mapping cleanly to economic weights—so technical depth and portfolio outcomes stay in the same narrative.',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
] as const

export function WhyItMatters() {
  return (
    <section id="why" className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="deck-section-eyebrow text-fuchsia-400">Why it matters</p>
          <h2 className="deck-section-title">
            Beyond the benchmark table
          </h2>
          <p className="deck-section-lead mt-4">
            The goal is intuition as well as metrics: how discrete quantum formulations connect to
            real constraints and to classical alternatives.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(({ icon: Icon, title, body, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <GlassCard className="relative h-full overflow-hidden p-6 sm:p-7">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
                />
                <div className="relative">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 sm:size-12">
                    <Icon className="size-5 text-frost sm:size-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-frost sm:text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{body}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
