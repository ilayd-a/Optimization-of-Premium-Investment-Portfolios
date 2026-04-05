import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { QAOA_4F1Q_GROUND_TRUTH_ENERGY } from '../../data/presentationData'
import { RESULTS_NOTEBOOK_FIGURES } from '../../data/notebookFigures'
import { OptimizationComparisonPresentation } from '../charts/OptimizationComparisonPresentation'
import { NotebookFigure } from '../notebook/NotebookFigure'
import { GlassCard } from '../ui/GlassCard'

export function ResultsSection() {
  const [riskReturn, isingStructure, qaoaEnergy, qaoaMarginal4Q, qaoaMarginal8Q, samplerDiscrete] =
    RESULTS_NOTEBOOK_FIGURES

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
            Sleeve selection, Ising structure, QAOA depth sweep, qubit marginals from the notebooks, and
            discrete allocation statistics.
          </p>
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
              Combined plot: noiseless ⟨E⟩ plus two noisy GD curves (left ⟨E⟩ scale) and three 8Q QAOA
              ⟨E⟩ values (right scale, with ground reference). The four-qubit section below shows the
              depth sweep and return–risk geometry from the notebooks.
            </p>
            <div className="mt-6">
              <OptimizationComparisonPresentation />
            </div>
          </GlassCard>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <p className="deck-section-eyebrow text-violet-300/90">Four-qubit primary run</p>
              <h3 className="mt-1 font-display text-base font-semibold text-frost sm:text-lg">
                {riskReturn.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure src={riskReturn.src} alt={riskReturn.alt} title={riskReturn.title} />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-frost sm:text-lg">
                {isingStructure.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure
                  src={isingStructure.src}
                  alt={isingStructure.alt}
                  title={isingStructure.title}
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-frost sm:text-lg">
                {qaoaEnergy.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure
                  src={qaoaEnergy.src}
                  alt={qaoaEnergy.alt}
                  title={qaoaEnergy.title}
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-frost sm:text-lg">
                {qaoaMarginal4Q.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure
                  src={qaoaMarginal4Q.src}
                  alt={qaoaMarginal4Q.alt}
                  title={qaoaMarginal4Q.title}
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-frost sm:text-lg">
                {qaoaMarginal8Q.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure
                  src={qaoaMarginal8Q.src}
                  alt={qaoaMarginal8Q.alt}
                  title={qaoaMarginal8Q.title}
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <h3 className="font-display text-base font-semibold text-frost sm:text-lg">
                {samplerDiscrete.title}
              </h3>
              <div className="mt-4">
                <NotebookFigure
                  src={samplerDiscrete.src}
                  alt={samplerDiscrete.alt}
                  title={samplerDiscrete.title}
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
