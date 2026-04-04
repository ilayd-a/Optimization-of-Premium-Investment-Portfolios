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
    title: 'Constrained capital in the real world',
    body: 'Budgets, lot sizes, and sleeve limits show up in production books. A pipeline that respects them end-to-end is closer to deployable research.',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: Orbit,
    title: 'Bridge hardware and finance',
    body: 'Eight qubits are enough to demo coherent physics while staying interpretable on stage—linking circuit depth to P&L stories judges can repeat.',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
] as const

export function WhyItMatters() {
  return (
    <section id="why" className="scroll-mt-28 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-fuchsia-400 uppercase">
            Why it matters
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-frost sm:text-4xl">
            Beyond the benchmark table
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-mist">
            The demo is intentionally visual: judges should leave with intuition, not just
            coefficients.
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
              <GlassCard className="relative h-full overflow-hidden p-7">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
                />
                <div className="relative">
                  <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <Icon className="size-6 text-frost" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-frost">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{body}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
