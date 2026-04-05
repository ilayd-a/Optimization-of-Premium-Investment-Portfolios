import { motion } from 'framer-motion'
import { Activity, Layers, ShieldAlert } from 'lucide-react'
import {
  DISCRETE_STRESS,
  QAOA_4F1Q_GROUND_TRUTH_ENERGY,
  QUBO_4F4Q_RANKED,
} from '../../data/presentationData'
import { STRESS_SECTION_FIGURE } from '../../data/notebookFigures'
import { NotebookFigure } from '../notebook/NotebookFigure'
import { GlassCard } from '../ui/GlassCard'

export function StressTestSection() {
  const gapQaoa = DISCRETE_STRESS.qaoaExpectedEnergy - DISCRETE_STRESS.groundTruthEnergy
  const spreadDiscrete = DISCRETE_STRESS.worstNonEmptyObjective - DISCRETE_STRESS.bestObjective

  return (
    <section id="stress" className="px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="deck-section-eyebrow text-amber-400">Discrete stress</p>
          <h2 className="deck-section-title">Where the combinatorics bite</h2>
          <p className="deck-section-lead mt-3">
            This slide quantifies structure in the four-qubit formulation: how objectives spread
            across all 16 bitstrings, and how far finite-depth QAOA sits from the classical Ising
            ground energy.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldAlert,
              label: 'Best 4Q objective',
              value: DISCRETE_STRESS.bestObjective.toFixed(4),
              hint: `State ${QUBO_4F4Q_RANKED[0].state}`,
            },
            {
              icon: Layers,
              label: 'Discrete spread (max − min)',
              value: spreadDiscrete.toFixed(4),
              hint: 'All 16 allocations including empty portfolio',
            },
            {
              icon: Activity,
              label: 'QAOA ⟨E⟩ − E_ground',
              value: gapQaoa.toFixed(4),
              hint: `P = 3 · ground ${QAOA_4F1Q_GROUND_TRUTH_ENERGY.toFixed(4)}`,
            },
            {
              icon: ShieldAlert,
              label: '5th-ranked objective',
              value: DISCRETE_STRESS.fifthRankObjective.toFixed(4),
              hint: 'Mid-tail discrete loss',
            },
          ].map(({ icon: Icon, label, value, hint }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="h-full p-4 sm:p-5">
                <Icon className="mb-2 size-4 text-amber-300/90 sm:mb-3 sm:size-5" aria-hidden />
                <p className="text-[10px] font-medium tracking-wide text-mist/80 uppercase sm:text-[11px]">
                  {label}
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold tabular-nums text-frost sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] text-mist/75 sm:text-xs">{hint}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard hover={false} className="p-5 sm:p-6">
          <h3 className="mb-1 font-display text-base font-semibold text-frost sm:text-lg">
            {STRESS_SECTION_FIGURE.title}
          </h3>
          <p className="mb-3 text-xs text-mist sm:text-sm">
            How compute time trades off against closing the gap to the target energy at each depth.
          </p>
          <NotebookFigure
            src={STRESS_SECTION_FIGURE.src}
            alt={STRESS_SECTION_FIGURE.alt}
            title={STRESS_SECTION_FIGURE.title}
          />
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-slate-950/80 p-5 sm:p-7">
            <div className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-violet-500/20 blur-3xl" />
            <h3 className="font-display text-lg font-semibold text-frost sm:text-xl">Takeaway</h3>
            <p className="relative mt-2 max-w-3xl text-xs leading-relaxed text-mist sm:text-sm">
              The discrete ladder exposes how sharply objective deteriorates away from the optimum.
              QAOA at P = 3 remains roughly <strong className="text-frost">{gapQaoa.toFixed(3)}</strong>{' '}
              above the classical ground energy on this run; the results section shows depth and
              overlap curves.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
