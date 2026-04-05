import { motion } from 'framer-motion'
import { RiskReturnPlayground } from '../interactive/RiskReturnPlayground'

export function ProblemOverview() {
  return (
    <section id="problem" className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="deck-section-eyebrow text-violet-400">Problem</p>
          <h2 className="deck-section-title">
            Risk, return, and hard allocation rules
          </h2>
          <p className="deck-section-lead mt-4">
            Portfolio construction is the art of balancing expected return against variance while
            respecting investable budgets. When allocations must sit on a discrete grid—common in
            operational mandates—the search space becomes combinatorial. That is where structured
            optimizers, including quantum formulations, earn their keep.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel space-y-5 rounded-3xl p-8"
          >
            <h3 className="font-display text-xl font-semibold text-frost sm:text-2xl">What we optimize</h3>
            <ul className="space-y-4 text-sm leading-relaxed text-mist sm:text-base">
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-violet-400" />
                <span>
                  <strong className="text-frost">Risk–return tradeoff:</strong> maximize expected
                  return for a penalized variance term—your classic mean–variance spirit, expressed
                  in a form compatible with binary decision variables.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-glow" />
                <span>
                  <strong className="text-frost">Budget constraint:</strong> weights sum to one
                  investable unit; empty slots stay at zero exposure so the solution stays
                  deployable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-soft" />
                <span>
                  <strong className="text-frost">Discrete slices:</strong> each active asset picks
                  from a small set of allocation levels encoded with multiple qubits—here, two
                  qubits per name across four curated instruments.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <RiskReturnPlayground />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
