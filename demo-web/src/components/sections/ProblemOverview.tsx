import { motion } from 'framer-motion'
import { RiskReturnPlayground } from '../interactive/RiskReturnPlayground'

export function ProblemOverview() {
  return (
    <section id="problem" className="px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="deck-section-eyebrow text-violet-400">Problem</p>
          <h2 className="deck-section-title">Risk, return, and hard allocation rules</h2>
          <p className="deck-section-lead mt-3">
            Balancing expected return against risk under investable budgets. When allocations are
            discrete—as they often are in mandates—the search space is combinatorial. Structured
            optimizers, including quantum formulations, are built for that geometry.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel space-y-4 rounded-2xl p-6 sm:rounded-3xl sm:p-7"
          >
            <h3 className="font-display text-base font-semibold text-frost sm:text-lg">What we optimize</h3>
            <ul className="space-y-3 text-xs leading-relaxed text-mist sm:text-sm">
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-violet-400 sm:size-2" />
                <span>
                  <strong className="text-frost">Risk–return tradeoff:</strong> expected return net of
                  a variance penalty, written so binary decisions slot cleanly into a QUBO.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan-glow sm:size-2" />
                <span>
                  <strong className="text-frost">Budget constraint:</strong> weights respect a fixed
                  investable total; assets can be off or on within asset-specific caps.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-soft sm:size-2" />
                <span>
                  <strong className="text-frost">Discrete assets:</strong> in the primary model, one
                  binary decision per asset (one qubit per asset). A two-qubits-per-asset extension
                  adds finer grids and is referenced as a secondary benchmark.
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
