import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import {
  MARGINAL_PROBABILITIES_4F4Q,
  MARGINAL_PROBABILITIES_8Q,
  QAOA_4F1Q_GROUND_TRUTH_ENERGY,
} from '../../data/presentationData'
import { RESULTS_NOTEBOOK_FIGURES } from '../../data/notebookFigures'
import { OptimizationComparisonPresentation } from '../charts/OptimizationComparisonPresentation'
import { NotebookFigure } from '../notebook/NotebookFigure'
import { GlassCard } from '../ui/GlassCard'

function MarginalProbabilitiesTable({
  title,
  rows,
}: {
  title: string
  rows: readonly { asset: string; p0: number; p1: number }[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03]">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <caption className="border-b border-white/10 px-4 py-3 text-center font-display text-sm font-semibold text-frost sm:text-base">
          {title}
        </caption>
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.06] text-xs font-semibold uppercase tracking-wide text-mist sm:text-sm">
            <th scope="col" className="px-4 py-2.5 text-frost">
              Asset
            </th>
            <th scope="col" className="px-4 py-2.5 text-frost">
              <span className="font-mono normal-case tracking-normal">P(|0⟩)</span>
            </th>
            <th scope="col" className="px-4 py-2.5 text-frost">
              <span className="font-mono normal-case tracking-normal">P(|1⟩)</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.asset}
              className="border-b border-white/[0.06] last:border-b-0 odd:bg-white/[0.02]"
            >
              <td className="px-4 py-2 font-mono text-xs text-frost sm:text-sm">{row.asset}</td>
              <td className="px-4 py-2 font-mono text-xs tabular-nums text-mist sm:text-sm">
                {row.p0.toFixed(3)}
              </td>
              <td className="px-4 py-2 font-mono text-xs tabular-nums text-mist sm:text-sm">
                {row.p1.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ResultsSection() {
  return (
    <section id="results" className="px-4 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="deck-section-eyebrow text-violet-300">Evidence</p>
          <h2 className="deck-section-title">Optimization results</h2>
          <p className="deck-section-lead mt-3">
            Combined noisy gradient descent and 8Q QAOA ⟨E⟩ first; then summary chips and notebook exports
            for depth sweeps, marginals, circuit, and noise.
          </p>
        </motion.div>

        <motion.div
          id="results-eight-q"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="mb-8 scroll-mt-24"
        >
          <GlassCard className="p-5 sm:p-6">
            <p className="deck-section-eyebrow text-violet-300/90">Eight-qubit extension</p>
            <h3 className="mt-1 font-display text-base font-semibold text-frost sm:text-lg">
              Noisy GD and 8Q QAOA on one figure
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">
              Combined plot: noiseless ⟨E⟩ plus two noisy GD curves (left ⟨E⟩ scale) and three 8Q QAOA ⟨E⟩
              values (right scale, with ground reference). Notebook figures below show depth sweeps, marginals,
              circuit, and noise bars.
            </p>
            <div className="mt-6">
              <OptimizationComparisonPresentation />
            </div>
          </GlassCard>
        </motion.div>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {[
            {
              title: 'Classical discrete optimum',
              body: `Ground state 0011 · objective −0.0074`,
            },
            {
              title: 'Combinatorial coverage',
              body: 'Full enumeration over 2⁴ allocations under the budget',
            },
            {
              title: 'QAOA vs classical ground',
              body: `At P = 3, ⟨E⟩ = 0.0636 vs classical ground ${QAOA_4F1Q_GROUND_TRUTH_ENERGY.toFixed(4)}`,
            },
          ].map((c) => (
            <GlassCard key={c.title} hover={false} className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-violet-300/90 uppercase sm:text-xs">
                <Sparkles className="size-3.5 shrink-0 sm:size-4" aria-hidden />
                {c.title}
              </div>
              <p className="mt-2 font-mono text-xs text-frost sm:text-sm">{c.body}</p>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-8">
          {RESULTS_NOTEBOOK_FIGURES.map((fig, index) => (
            <motion.div
              key={fig.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
            >
              <GlassCard className="p-5 sm:p-6">
                {index === 0 ? (
                  <p className="deck-section-eyebrow text-violet-300/90">Notebook figures</p>
                ) : null}
                <h3
                  className={`font-display text-base font-semibold text-frost sm:text-lg ${index === 0 ? 'mt-1' : ''}`}
                >
                  {fig.title}
                </h3>
                <div className="mt-4">
                  <NotebookFigure src={fig.src} alt={fig.alt} title={fig.title} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="mt-10 space-y-8"
        >
          <GlassCard className="p-5 sm:p-6">
            <p className="deck-section-eyebrow text-violet-300/90">Marginals</p>
            <h3 className="mt-1 font-display text-base font-semibold text-frost sm:text-lg">
              Portfolio marginal probabilities
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mist sm:text-sm">
              Per-asset single-qubit marginals from the QAOA / sampling run: probability mass on{' '}
              <span className="font-mono text-frost/90">|0⟩</span> vs{' '}
              <span className="font-mono text-frost/90">|1⟩</span> for each listed asset.
            </p>
            <div className="mt-6 space-y-8">
              <MarginalProbabilitiesTable
                title="4F / 4Q Portfolio Marginal Probabilities"
                rows={MARGINAL_PROBABILITIES_4F4Q}
              />
              <MarginalProbabilitiesTable
                title="8Q Portfolio Marginal Probabilities"
                rows={MARGINAL_PROBABILITIES_8Q}
              />
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
